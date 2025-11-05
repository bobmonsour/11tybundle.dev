import { createRequire } from "module";
import eleventyFetch from "@11ty/eleventy-fetch";
import * as cheerio from "cheerio";
import path from "path";
import { fileURLToPath } from "url";

const require = createRequire(import.meta.url);

// --- Configuration ---
const defaultFavicon = "/assets/img/default-favicon.ico";
const faviconDir = "/assets/img/favicons";
// ---

let faviconCache = {};

export const getFavicon = async (link) => {
  const origin = new URL(link).origin;
  const domain = new URL(origin).hostname;

  if (faviconCache[origin]) {
    return faviconCache[origin];
  }

  try {
    // Fetch the HTML of the site's origin page
    const html = await eleventyFetch(origin, {
      duration: "1w",
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
        break;
      }
    }

    if (!faviconUrl) {
      faviconUrl = new URL("/favicon.ico", origin).href;
    }

    // Fetch and cache the favicon image
    const faviconBuffer = await eleventyFetch(faviconUrl, {
      duration: "1w",
      type: "buffer",
      directory: ".cache/favicons",
      fetchOptions: {
        headers: {
          "user-agent": "Mozilla/5.0 (compatible; 11tybundle.dev/1.0)",
        },
      },
    });

    // Determine file extension from URL or default to .ico
    const urlPath = new URL(faviconUrl).pathname;
    const extension = path.extname(urlPath) || ".ico";
    const filename = `${domain.replace(/\./g, "-")}-favicon${extension}`;
    const localPath = `${faviconDir}/${filename}`;

    // Store the favicon in the assets directory
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const outputPath = path.join(__dirname, "../../../_site", localPath);

    await import("fs").then((fs) =>
      fs.promises.mkdir(path.dirname(outputPath), { recursive: true })
    );
    await import("fs").then((fs) =>
      fs.promises.writeFile(outputPath, faviconBuffer)
    );

    faviconCache[origin] = localPath;
    return localPath;
  } catch (e) {
    console.error(`Error processing favicon for ${origin}: ${e.message}`);
    faviconCache[origin] = defaultFavicon;
    return defaultFavicon;
  }
};
