import { createRequire } from "module";
import eleventyFetch from "@11ty/eleventy-fetch";
import * as cheerio from "cheerio";
import fs from "fs";
import path from "path";

const require = createRequire(import.meta.url);
const exceptionList = require("../../_data/exception-list.json");

// --- Configuration ---
const CACHE_DIR = "_site/assets/favicons/";
const WEB_PATH = "/assets/favicons/";
const defaultFavicon = "/assets/images/generic-favicon.svg";
// ---

let faviconCache = {};

// Helper to create a filename from a URL origin, e.g., "bobmonsour-com-favicon.ico"
const createFileNameFromOrigin = (origin, extension) => {
  const hostname = new URL(origin).hostname;
  const baseName = hostname.replace(/\./g, "-");
  return `${baseName}-favicon${extension}`;
};

export const getFavicon = async (link) => {
  const origin = new URL(link).origin;

  if (faviconCache[origin]) {
    return faviconCache[origin];
  }

  if (exceptionList.includes(origin)) {
    faviconCache[origin] = defaultFavicon;
    return defaultFavicon;
  }

  try {
    // 1. Fetch the HTML of the site's origin page
    const html = await eleventyFetch(origin, {
      duration: "1w", // Cache the HTML for a week
      type: "text",
      fetchOptions: {
        headers: {
          "user-agent": "Mozilla/5.0 (compatible; 11tybundle.dev/1.0)",
        },
      },
    });

    const $ = cheerio.load(html);
    const selectors = [
      'link[rel="apple-touch-icon"]',
      'link[rel="icon"]',
      'link[rel="shortcut icon"]',
    ];
    let faviconUrl = "";

    for (const selector of selectors) {
      const href = $(selector).attr("href");
      if (href) {
        faviconUrl = new URL(href, origin).href;
        break; // Use the first, highest-priority icon found
      }
    }

    if (!faviconUrl) {
      // Fallback to the default /favicon.ico path if no <link> tag is found
      faviconUrl = new URL("/favicon.ico", origin).href;
    }

    // 2. Generate a local path for the cached image
    const extension = path.extname(new URL(faviconUrl).pathname) || ".ico";
    const fileName = createFileNameFromOrigin(origin, extension);
    const localFilePath = path.join(CACHE_DIR, fileName);
    const webFilePath = path.join(WEB_PATH, fileName);

    // If the file is already cached on disk, return its path
    if (fs.existsSync(localFilePath)) {
      faviconCache[origin] = webFilePath;
      return webFilePath;
    }

    // 3. Fetch the favicon image itself
    const imageBuffer = await eleventyFetch(faviconUrl, {
      duration: "1w", // Cache the image file for a week
      type: "buffer",
    });

    // 4. Save the image to the local cache directory
    fs.mkdirSync(CACHE_DIR, { recursive: true });
    fs.writeFileSync(localFilePath, imageBuffer);

    faviconCache[origin] = webFilePath;
    return webFilePath;
  } catch (e) {
    console.error(`Error processing favicon for ${origin}: ${e.message}`);
    faviconCache[origin] = defaultFavicon;
    return defaultFavicon;
  }
};
