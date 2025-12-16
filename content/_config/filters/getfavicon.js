import Fetch from "@11ty/eleventy-fetch";
import * as cheerio from "cheerio";
import path from "path";
import { fileURLToPath } from "url";
import { promises as fs } from "fs";
import slugifyPackage from "slugify";
import sharp from "sharp";

// --- Configuration ---
import { cacheDuration, fetchTimeout } from "../../_data/cacheconfig.js";
const defaultFaviconPath = "default - no favicon found";
const faviconDir = "/img/favicons";
const fetchSize = 128; // Size to request from Google
const targetSize = 64; // Target size for all favicons
// ---

// Helper function to get file extension from content type
function getExtensionFromContentType(contentType) {
  const types = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
    "image/gif": "gif",
    "image/x-icon": "ico",
    "image/vnd.microsoft.icon": "ico",
    "image/svg+xml": "svg",
    "image/webp": "webp",
  };
  return types[contentType] || "png";
}

// cache avoids processing the same origin multiple times during a single build
let faviconCache = {};

// Persistent failure cache across builds
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const failureCachePath = path.join(
  __dirname,
  "../../../.cache/favicons/favicon-failures.json"
);
const resizeLogPath = path.join(__dirname, "../../../log/resized-files.md");
let failureCache = {};

// Load failure cache from disk
try {
  const data = await fs.readFile(failureCachePath, "utf-8");
  failureCache = JSON.parse(data);
} catch {
  // File doesn't exist yet or is invalid, start with empty cache
  failureCache = {};
}

// Helper to save failure cache to disk
const saveFailureCache = async () => {
  try {
    await fs.mkdir(path.dirname(failureCachePath), { recursive: true });
    await fs.writeFile(failureCachePath, JSON.stringify(failureCache, null, 2));
  } catch (error) {
    console.error("Failed to save favicon failure cache:", error.message);
  }
};

// Helper to get current date as YYYY-MM-DD
const getCurrentDate = () => {
  const now = new Date();
  return now.toISOString().split("T")[0];
};

// Helper to check if a failure is older than 30 days
const isFailureExpired = (failureDate) => {
  const stored = new Date(failureDate);
  const now = new Date();
  const daysDiff = (now - stored) / (1000 * 60 * 60 * 24);
  return daysDiff >= 30;
};

// Helper to log resized files
const logResize = async (origin, originalWidth, originalHeight, operation) => {
  try {
    await fs.mkdir(path.dirname(resizeLogPath), { recursive: true });
    const logEntry = `- [${operation}] ${origin}: ${originalWidth}x${originalHeight} → ${targetSize}x${targetSize}\n`;
    await fs.appendFile(resizeLogPath, logEntry);
  } catch (error) {
    console.error("Failed to log resize:", error.message);
  }
};

//***************
// Given the path to the favicon as saved in the output directory, generate and
// return the html img element to use in the site.
//***************
const genFaviconImg = async (faviconPath, type) => {
  let imgElement;

  // use person favicon svg for default favicon
  if (faviconPath === defaultFaviconPath) {
    const whichIcon = type === "site" ? "icon-globe" : "icon-person-circle";
    imgElement = `<svg viewBox="0 0 24 24" aria-hidden="true" class="favicon"><use xlink:href="#${whichIcon}"></use></svg>`;

    // use the resolved favicon path for the site/user
  } else {
    imgElement = `<img src="${faviconPath}" alt="favicon for the site" class="favicon" width="${targetSize}" height="${targetSize}" eleventy:ignore></img>`;
  }
  return imgElement;
};

//***************
// Fetch favicon from Google's API, save it locally, and return the local path.
// Uses eleventy-fetch for caching between builds.
//***************
const fetchAndSaveFavicon = async (origin, domain) => {
  // Check persistent failure cache first
  if (failureCache[origin]) {
    const failureDate = failureCache[origin];
    // If failure is less than 30 days old, skip fetch
    if (!isFailureExpired(failureDate)) {
      return defaultFaviconPath;
    }
    // If 30+ days old, we'll retry (continue to fetch below)
  }

  const faviconUrl = `https://www.google.com/s2/favicons?domain=${origin}&sz=${fetchSize}`;

  try {
    // Fetch favicon from Google's API with caching
    // eleventy-fetch returns both the buffer and response metadata
    const faviconBuffer = await Fetch(faviconUrl, {
      directory: ".cache",
      duration: cacheDuration.faviconImage,
      type: "buffer",
      fetchOptions: {
        signal: AbortSignal.timeout(fetchTimeout.faviconImage),
      },
    });

    // Make a quick fetch to get content-type header for extension detection
    // This will be cached by the browser/node, so it's essentially free
    const response = await fetch(faviconUrl, {
      signal: AbortSignal.timeout(fetchTimeout.faviconExtension),
    });
    const contentType = response.headers.get("content-type");
    const extension = "." + getExtensionFromContentType(contentType);

    // Generate filename: slugified domain + "-favicon" + extension
    const filename = `${slugifyPackage(domain, {
      lower: true,
      strict: true,
    })}-favicon${extension}`;
    const localPath = `${faviconDir}/${filename}`;

    // Write favicon to _site/img/favicons/ directory
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const outputPath = path.join(__dirname, "../../../_site", localPath);

    // Ensure directory exists
    await fs.mkdir(path.dirname(outputPath), { recursive: true });

    // Process image with Sharp to ensure consistent dimensions
    let finalBuffer = faviconBuffer;

    // Skip processing for ICO and SVG formats
    if (extension !== ".ico" && extension !== ".svg") {
      try {
        const image = sharp(faviconBuffer);
        const metadata = await image.metadata();

        // Resize to targetSize if dimensions don't match
        if (metadata.width !== targetSize || metadata.height !== targetSize) {
          // Determine if upscaling or downscaling
          const operation =
            metadata.width < targetSize || metadata.height < targetSize
              ? "UPSCALE"
              : "DOWNSCALE";

          // Log the resize operation
          await logResize(origin, metadata.width, metadata.height, operation);

          // Resize to target size using high-quality algorithm
          finalBuffer = await image
            .resize(targetSize, targetSize, {
              kernel: sharp.kernel.lanczos3, // Best quality for both up and down scaling
              fit: "fill", // Ensure exact dimensions
            })
            .toBuffer();
        }
      } catch (sharpError) {
        // If Sharp processing fails, use original buffer
        console.error(
          `Sharp processing failed for ${origin}:`,
          sharpError.message
        );
      }
    }

    // Write the processed (or original) favicon data
    await fs.writeFile(outputPath, finalBuffer);

    // Verify file exists and is not empty
    const stats = await fs.stat(outputPath);
    if (stats.size === 0) {
      await fs.unlink(outputPath).catch(() => {});

      // Update failure cache with current date
      failureCache[origin] = getCurrentDate();
      await saveFailureCache();

      return defaultFaviconPath;
    }

    // Success! Remove from failure cache if it was there
    if (failureCache[origin]) {
      delete failureCache[origin];
      await saveFailureCache();
    }

    return localPath;
  } catch (error) {
    // Any failure (network, timeout, write error) falls back to default
    console.error(
      `fetchAndSaveFavicon: using default favicon for ${origin}, error: ${error.message}`
    );

    // Add to persistent failure cache with current date
    failureCache[origin] = getCurrentDate();
    await saveFailureCache();

    faviconCache[origin] = defaultFaviconPath;
    return defaultFaviconPath;
  }
};
//***************
// Gets the favicon for a given URL using Google's API
// and caches it locally.
// Returns the local path for use in img src attributes.
//***************
export const getFavicon = async (link, type) => {
  // Special case for when author has only 1 post and
  // it's a YouTube link, resulting in input 'link' being null
  if (link && link.includes("youtube.com")) {
    return `<svg viewBox="0 0 24 24" class="favicon" aria-hidden="true">
            <use xlink:href="#icon-youtube"></use>
            </svg>`;
  }

  // Extract the origin from the full URL
  // This ensures we only fetch one favicon per domain, not per page
  const url = new URL(link);
  const origin = url.origin;
  const domain = url.hostname;

  // check if the favicon for this origin is already cached
  if (faviconCache[origin]) {
    return await genFaviconImg(faviconCache[origin], type);
  }

  // Fetch favicon from Google and save it locally
  const faviconPath = await fetchAndSaveFavicon(origin, domain);

  // Cache the local path to the favicon image
  faviconCache[origin] = faviconPath;

  // return the html img element using the local favicon path
  return await genFaviconImg(faviconPath, type);
};
