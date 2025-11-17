import eleventyFetch from "@11ty/eleventy-fetch";
import path from "path";
import { fileURLToPath } from "url";
import { promises as fs } from "fs";

// --- Configuration ---
import { cacheDuration, fetchTimeout } from "../../_data/cacheconfig.js";
import { sign } from "crypto";
const faviconDir = "/assets/img/favicons";
const defaultFavicon = "/assets/img/favicons/default-favicon.png";
// ---

// In-memory cache to avoid processing the same origin multiple times during a single build
let faviconCache = {};

const genFaviconImg = async (faviconPath) => {
  const imgElement = `<img src="${faviconPath}" alt="favicon for the site" class="favicon"></img>`;
  // console.log("img element = ", imgElement);
  return imgElement;
};

/**
 * Gets the best available favicon for a given URL using Google's favicon service
 * and stores it locally. Returns the local path for use in img src attributes.
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

  try {
    // Use Google's favicon service with size fallback
    // Try 64x64 first, then fall back to smaller sizes if needed
    const sizes = [64, 32, 16];
    let faviconBuffer = null;
    let actualSize = null;

    for (const size of sizes) {
      try {
        const googleFaviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`;

        faviconBuffer = await eleventyFetch(googleFaviconUrl, {
          directory: ".cache", // Store in eleventy's cache directory
          duration: cacheDuration.faviconImage, // see cacheconfig.js for spec
          type: "buffer", // Return as binary buffer for file writing
          fetchOptions: {
            signal: AbortSignal.timeout(fetchTimeout.favicon), // 3 second timeout
            headers: {
              "user-agent":
                "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36",
            },
          },
        });

        // Google's service always returns something, so use the first successful fetch
        if (faviconBuffer) {
          actualSize = size;
          break;
        }
      } catch (sizeError) {
        // Continue to next size if this one fails
        continue;
      }
    }

    // If all sizes failed to fetch, use default favicon
    if (!faviconBuffer || !actualSize) {
      console.error(
        `Failed to fetch favicon for ${origin}: using default favicon`
      );
      faviconCache[origin] = defaultFavicon;
      return await genFaviconImg(defaultFavicon);
    }

    // Generate local filename - Google typically returns PNG format
    const filename = `${domain.replace(/\./g, "-")}-favicon.png`;
    const localPath = `${faviconDir}/${filename}`;

    // Write favicon to local assets directory for serving
    // This makes the favicon available at /assets/img/favicons/[filename] in the built site
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const outputPath = path.join(__dirname, "../../../_site", localPath);

    // Ensure the favicons directory exists before writing
    await fs.mkdir(path.dirname(outputPath), { recursive: true });

    // Write the binary favicon data to the local file
    await fs.writeFile(outputPath, faviconBuffer);

    // Cache the result and return the img element using localPath as src
    // Store in memory cache to avoid reprocessing during this build
    faviconCache[origin] = localPath;
    return await genFaviconImg(localPath);
  } catch (e) {
    // If network or file system errors occur, use default favicon and cache the result
    console.error(
      `Error fetching favicon for ${origin}: ${e.message} - using default favicon`
    );
    faviconCache[origin] = defaultFavicon;
    return await genFaviconImg(defaultFavicon);
  }
};
