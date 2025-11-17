import eleventyFetch from "@11ty/eleventy-fetch";
import * as cheerio from "cheerio";
import path from "path";
import { fileURLToPath } from "url";
import { promises as fs } from "fs";

// --- Configuration ---
import { cacheDuration, fetchTimeout } from "../../_data/cacheconfig.js";
const defaultFavicon = "/assets/img/default-favicon.png";
const faviconDir = "/assets/img/favicons";
// ---

// In-memory cache to avoid processing the same origin multiple times during a single build
let faviconCache = {};

const genFaviconImg = async (faviconPath) => {
  const imgElement = `<img src="${faviconPath}" alt="favicon for the site" class="favicon"></img>`;
  // console.log("img element = ", imgElement);
  return imgElement;
};

/**
 * Gets the best available favicon for a given URL and stores it locally.
 * Returns the local path for use in img src attributes.
 */
export const getFavicon = async (link) => {
  // Extract the origin (protocol + hostname + port) from the full URL
  // This ensures we only fetch one favicon per domain, not per page
  const origin = new URL(link).origin;
  const domain = new URL(origin).hostname;

  // Check if we've already processed this origin during this build
  // This prevents redundant work when multiple pages reference the same domain
  if (faviconCache[origin]) {
    return await genFaviconImg(faviconCache[origin]);
  }

  // Check if this origin has previously failed and is cached as a failure
  const failureCacheKey = `failed-favicon-${domain}`;
  try {
    await eleventyFetch(failureCacheKey, {
      directory: ".cache",
      duration: cacheDuration.faviconImage, // Use same duration as successful favicon caches
      type: "text",
      fetchOptions: {
        // This will throw if the cache entry doesn't exist
      },
    });

    // If we reach here, this origin previously failed - use default immediately
    console.log(
      `Using cached failure result for ${origin} - skipping network requests`
    );
    faviconCache[origin] = defaultFavicon;
    return await genFaviconImg(defaultFavicon);
  } catch (cacheError) {
    // Cache entry doesn't exist, proceed with normal favicon fetching
  }

  try {
    // Step 1: Fetch the homepage HTML to find favicon link tags
    // We use the origin (homepage) because that's where favicon links are typically defined
    const html = await eleventyFetch(origin, {
      directory: ".cache", // Store in eleventy's cache directory
      duration: cacheDuration.faviconHtml, // Cache HTML, see cacheconfig.js
      type: "text",
      fetchOptions: {
        signal: AbortSignal.timeout(fetchTimeout.faviconHtml), // 3 second timeout
        headers: {
          "user-agent":
            "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36",
        },
      },
    });

    // Step 2: Parse HTML to find the best favicon link
    const $ = cheerio.load(html);

    // Priority order: apple-touch-icon (highest quality), then icon, then shortcut icon
    // Modern sites often provide multiple sizes; we take the first match for simplicity
    const selectors = [
      'link[rel="apple-touch-icon"]', // Usually high-resolution, preferred
      'link[rel="icon"]', // Standard favicon link
      'link[rel="shortcut icon"]', // Legacy favicon link
    ];
    let faviconUrl = "";

    // Find the first available favicon link in priority order
    for (const selector of selectors) {
      const href = $(selector).attr("href");
      if (href) {
        // Convert relative URLs to absolute URLs using the origin as base
        faviconUrl = new URL(href, origin).href;
        break; // Use the first (highest priority) match
      }
    }

    // Step 3: Fallback if no favicon links found in HTML
    if (!faviconUrl) {
      // Many sites have favicon.ico in the root even without a link tag
      faviconUrl = new URL("/favicon.ico", origin).href;
    }

    // Step 4: Download the actual favicon image
    // eleventyFetch automatically handles caching, so subsequent calls return cached data
    const faviconBuffer = await eleventyFetch(faviconUrl, {
      directory: ".cache", // Store in eleventy's cache directory
      duration: cacheDuration.faviconImage, // see cacheconfig.js for spec
      type: "buffer", // Return as binary buffer for file writing
      fetchOptions: {
        signal: AbortSignal.timeout(fetchTimeout.faviconImage), // 3 second timeout
        headers: {
          "user-agent":
            "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36",
        },
      },
    });

    // Step 5: Generate local filename with proper extension
    // Extract extension from the favicon URL, default to .ico if none found
    const urlPath = new URL(faviconUrl).pathname;
    const extension = path.extname(urlPath) || ".ico";

    // Create filename: domain with dots replaced by dashes + "-favicon" + extension
    // Example: "example.com" becomes "example-com-favicon.png"
    const filename = `${domain.replace(/\./g, "-")}-favicon${extension}`;
    const localPath = `${faviconDir}/${filename}`;

    // Step 6: Write favicon to local assets directory for serving
    // This makes the favicon available at /assets/img/favicons/[filename] in the built site
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const outputPath = path.join(__dirname, "../../../_site", localPath);

    // Ensure the favicons directory exists before writing
    await fs.mkdir(path.dirname(outputPath), { recursive: true });

    // Write the binary favicon data to the local file
    await fs.writeFile(outputPath, faviconBuffer);

    // Step 7: Cache the result and return the img element using localPath as src
    // Store in memory cache to avoid reprocessing during this build
    faviconCache[origin] = localPath;
    return await genFaviconImg(localPath);
  } catch (e) {
    // If anything fails (network error, parsing error, file write error),
    // cache this failure and fall back to the default favicon
    console.error(
      `favicon not found: using default favicon for ${origin}, error: ${e.message}`
    );

    // Cache the failure so we don't retry this origin in future builds
    try {
      await eleventyFetch(failureCacheKey, {
        directory: ".cache",
        duration: cacheDuration.faviconImage,
        type: "text",
        fetchOptions: {
          method: "POST", // Dummy method to create cache entry
          body: `Failed favicon fetch for ${origin} at ${new Date().toISOString()}`,
        },
      });
    } catch (failureCacheError) {
      // If we can't cache the failure, that's okay - we'll just retry next time
      console.warn(
        `Could not cache failure for ${origin}: ${failureCacheError.message}`
      );
    }

    faviconCache[origin] = defaultFavicon;
    return await genFaviconImg(defaultFavicon);
  }
};
