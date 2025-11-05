import { createRequire } from "module";
import eleventyFetch from "@11ty/eleventy-fetch";
import * as cheerio from "cheerio";
import path from "path";
import { fileURLToPath } from "url";
import { promises as fs } from "fs";

const require = createRequire(import.meta.url);

// --- Configuration ---
const defaultFavicon = "/assets/img/default-favicon.ico";
const faviconDir = "/assets/img/favicons";
const persistentCacheFile = ".cache/favicon-cache.json";
// ---

let faviconCache = {};
let persistentCache = {};

// Load persistent cache on module initialization
const loadPersistentCache = async () => {
  try {
    const cacheData = await fs.readFile(persistentCacheFile, "utf8");
    persistentCache = JSON.parse(cacheData);
  } catch (e) {
    // Cache file doesn't exist or is corrupted, start with empty cache
    persistentCache = {};
  }
};

// Save persistent cache
const savePersistentCache = async () => {
  try {
    await fs.mkdir(path.dirname(persistentCacheFile), { recursive: true });
    await fs.writeFile(
      persistentCacheFile,
      JSON.stringify(persistentCache, null, 2)
    );
  } catch (e) {
    console.error(`Error saving favicon cache: ${e.message}`);
  }
};

// Check if local favicon file exists
const checkLocalFileExists = async (localPath) => {
  try {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const outputPath = path.join(__dirname, "../../../_site", localPath);
    await fs.access(outputPath);
    return true;
  } catch (e) {
    return false;
  }
};

// Initialize persistent cache
await loadPersistentCache();

export const getFavicon = async (link) => {
  const origin = new URL(link).origin;
  const domain = new URL(origin).hostname;

  // Check in-memory cache first
  if (faviconCache[origin]) {
    return faviconCache[origin];
  }

  // Check persistent cache and verify file exists
  if (persistentCache[origin]) {
    const cachedPath = persistentCache[origin];
    if (await checkLocalFileExists(cachedPath)) {
      faviconCache[origin] = cachedPath;
      return cachedPath;
    } else {
      // File was deleted, remove from persistent cache
      delete persistentCache[origin];
    }
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

    // Check if file already exists before processing
    if (await checkLocalFileExists(localPath)) {
      faviconCache[origin] = localPath;
      persistentCache[origin] = localPath;
      await savePersistentCache();
      return localPath;
    }

    // Store the favicon in the assets directory
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const outputPath = path.join(__dirname, "../../../_site", localPath);

    await import("fs").then((fs) =>
      fs.promises.mkdir(path.dirname(outputPath), { recursive: true })
    );
    await import("fs").then((fs) =>
      fs.promises.writeFile(outputPath, faviconBuffer)
    );

    // Update both caches
    faviconCache[origin] = localPath;
    persistentCache[origin] = localPath;
    await savePersistentCache();

    return localPath;
  } catch (e) {
    console.error(`Error processing favicon for ${origin}: ${e.message}`);
    faviconCache[origin] = defaultFavicon;
    persistentCache[origin] = defaultFavicon;
    await savePersistentCache();
    return defaultFavicon;
  }
};
