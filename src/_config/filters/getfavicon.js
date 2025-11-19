import eleventyFetch from "@11ty/eleventy-fetch";
import * as cheerio from "cheerio";
import path from "path";
import { fileURLToPath } from "url";
import { promises as fs } from "fs";

// --- Configuration ---
import { cacheDuration, fetchTimeout } from "../../_data/cacheconfig.js";
const defaultFaviconPath = "/assets/img/favicons/default-favicon.png";
const youtubeFaviconPath = "/assets/img/favicons/youtube-favicon.ico";
const faviconDir = "/assets/img/favicons";
// ---

// In-memory cache to avoid processing the same origin multiple times during a single build
let faviconCache = {};

const genFaviconImg = async (faviconPath) => {
  const imgElement = `<img src="${faviconPath}" alt="favicon for the site" class="favicon"></img>`;
  // console.log("img element = ", imgElement);
  return imgElement;
};

const getFaviconUrl = async (origin) => {
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

    // Find the first available favicon link in priority order
    for (const selector of selectors) {
      const href = $(selector).attr("href");
      if (href) {
        // Convert relative URLs to absolute URLs using the origin as base
        const url = new URL(href, origin).href;
        return url;
      }
    }

    // Step 3: If no favicon link found in HTML, try common favicon file locations
    const faviconExtensions = ["ico", "png", "svg"];

    for (const extension of faviconExtensions) {
      const faviconUrl = `${origin}/favicon.${extension}`;

      try {
        // Try to fetch the favicon file to see if it exists
        await eleventyFetch(faviconUrl, {
          directory: ".cache",
          duration: cacheDuration.faviconImage,
          type: "buffer",
          fetchOptions: {
            signal: AbortSignal.timeout(fetchTimeout.faviconImage),
            headers: {
              "user-agent":
                "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36",
            },
          },
        });

        // If we reach this point, the favicon file exists
        return faviconUrl;
      } catch (fetchError) {
        // Favicon with this extension doesn't exist, continue to next extension
        continue;
      }
    }

    // No favicon found in HTML or common file locations
    return "";
  } catch (error) {
    console.error(
      "getFaviconUrl: Error fetching/parsing favicon URL from ",
      origin,
      ": ",
      error
    );
    return "";
  }
};

const genFaviconFile = async (origin, faviconUrl, domain) => {
  // Download the actual favicon image
  // eleventyFetch automatically handles caching, so subsequent calls return cached data
  try {
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

    // Cache the result and return the local path
    // Store in memory cache to avoid reprocessing during this build
    faviconCache[origin] = localPath;
    return localPath;
  } catch (e) {
    // If anything fails (network error, parsing error, file write error),
    // cache this failure and fall back to the default favicon
    console.error(
      `getFaviconFile: favicon not found: using default favicon for ${origin}, error: ${e.message}`
    );
    faviconCache[origin] = defaultFaviconPath;
    return defaultFaviconPath;
  }
};

// if favicon filename already cached with origin as key
//    return img element using cached filename
// else
//    fetch HTML of origin (homepage)
//    parse HTML for favicon link tags
//    if found
//      download favicon image
//      cache favicon image in cache directory
//      generate favicon filename based on hostname
//      write image to _site directory
//      store filename in cache using origin as key
//      return img element using filename
//    else
//      store filename of default favicon in cache using origin as key
//      return img element with filename of default favicon
// if any step fails
//      store filename of default favicon in cache using origin as key
//      return img element with filename of default favicon

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

  const faviconUrl = await getFaviconUrl(origin);

  if (faviconUrl) {
    const faviconPath = await genFaviconFile(origin, faviconUrl, domain);
    return await genFaviconImg(faviconPath);
  } else {
    if (origin.includes("youtube")) {
      faviconCache[origin] = youtubeFaviconPath;
    } else {
      faviconCache[origin] = defaultFaviconPath;
    }
    return await genFaviconImg(faviconCache[origin]);
  }
};
