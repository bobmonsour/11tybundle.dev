import Fetch from "@11ty/eleventy-fetch";
import * as cheerio from "cheerio";
import path from "path";
import { fileURLToPath } from "url";
import { promises as fs } from "fs";
import slugifyPackage from "slugify";

// --- Configuration ---
import { cacheDuration, fetchTimeout } from "../../_data/cacheconfig.js";
const defaultFaviconPath = "default - no favicon found";
const youtubeFaviconPath = "/img/favicons/youtube-favicon.ico";
const faviconDir = "/img/favicons";
// ---

// cache avoids processing the same origin multiple times during a single build
let faviconCache = {};

//***************
// Given the path to the favicon as saved in the output directory, generate and
// return the html img element to use in the site.
//***************
const genFaviconImg = async (faviconPath) => {
  let imgElement;

  // use person favicon svg for default favicon
  if (faviconPath === defaultFaviconPath) {
    imgElement = `<svg width="40" height="40" viewBox="0 0 24 24" aria-hidden="true" class="favicon"><use xlink:href="#icon-person-circle"></use></svg><span class="visually-hidden">Website</span>`;

    // use the resolved favicon path for the site/user
  } else {
    imgElement = `<img src="${faviconPath}" alt="favicon for the site" class="favicon" eleventy:ignore></img>`;
  }
  return imgElement;
};

//***************
// Given an origin, attempt to locate the favicon file on the site.
// Use several methods to find it.
// Return the path to the site's favicon image.
//***************
const getFaviconUrl = async (origin) => {
  try {
    // Step 1: Fetch the homepage HTML to find favicon link tags
    // We use the origin (homepage) where favicon links are typically defined
    const html = await Fetch(origin, {
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

    // Priority search order:
    //  - apple-touch-icon (highest quality)
    //  - icon
    //  - shortcut icon
    // Modern sites often provide multiple sizes
    // we take the first match for simplicity
    const selectors = [
      'link[rel="apple-touch-icon"]', // Usually high-resolution, preferred
      'link[rel="icon"]', // Standard favicon link
      'link[rel="shortcut icon"]', // Legacy favicon link
    ];

    // Find the first available favicon link in priority order
    for (const selector of selectors) {
      const href = $(selector).attr("href");
      if (href) {
        try {
          // Convert relative URLs to absolute URLs using the origin as base
          const faviconUrl = new URL(href, origin).href;

          // Verify the favicon URL is accessible before returning it
          await Fetch(faviconUrl, {
            directory: ".cache",
            duration: cacheDuration.faviconImage,
            type: "buffer", // We don't need the actual data, just want to verify it exists
            fetchOptions: {
              signal: AbortSignal.timeout(fetchTimeout.faviconImage),
              headers: {
                "user-agent":
                  "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36",
              },
            },
          });

          // If we reach this point, the favicon URL is accessible
          return faviconUrl;
        } catch (fetchError) {
          console.log(
            `getFaviconUrl for ${faviconUrl} failed: ${fetchError.message}`
          );
          continue;
        }
      }
    }
    // Step 3: If no favicon link found in HTML, try common favicon file locations
    const faviconExtensions = ["ico", "png", "svg"];

    for (const extension of faviconExtensions) {
      const faviconUrl = `${origin}/favicon.${extension}`;

      try {
        // Try to fetch the favicon file to see if it exists
        await Fetch(faviconUrl, {
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
    faviconCache[origin] = defaultFaviconPath;
    return "use default favicon";
  } catch (error) {
    // STAY SILENT ON ERRORS HERE AND RETURN THE DEFAULT FAVICON
    // console.error(
    //   "getFaviconUrl: Error fetching/parsing favicon URL from ",
    //   origin,
    //   ": ",
    //   error
    // );
    faviconCache[origin] = defaultFaviconPath;
    return "use default favicon";
  }
};

//***************
// Given an origin, favicon URL and domain, download the favicon image and
// save it to the output directory of the site. Use the domain as the basis
// for the filename. Return the local path to the saved favicon image.
//***************
const genFaviconFile = async (origin, faviconUrl, domain) => {
  // Download the actual favicon image
  // Fetch automatically handles caching; subsequent calls return cached data
  // console.log("generate favicon for ", origin);

  try {
    const faviconBuffer = await Fetch(faviconUrl, {
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
    const filename = `${slugifyPackage(domain, {
      lower: true,
      strict: true,
    })}-favicon${extension}`;
    const localPath = `${faviconDir}/${filename}`;

    // Step 6: Write favicon to local favicons directory for serving
    // This makes the favicon available at /img/favicons/[filename] in the built site
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const outputPath = path.join(__dirname, "../../../_site", localPath);

    // Ensure the favicons directory exists before writing
    await fs.mkdir(path.dirname(outputPath), { recursive: true });

    // Write the binary favicon data to the local file
    await fs.writeFile(outputPath, faviconBuffer);

    // Verify file exists and is not empty
    try {
      await fs.access(outputPath); // throws if not present
      const stats = await fs.stat(outputPath); // get size
      if (stats.size === 0) {
        // file is empty — remove and fall back
        await fs.unlink(outputPath).catch(() => {});
        return defaultFaviconPath;
      }
      // OK: file exists and has content
      return localPath;
    } catch (err) {
      if (err.code === "ENOENT") {
        // file missing
        return defaultFaviconPath;
      }
      // rethrow unexpected errors
      throw err;
    }
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
//***************
// Gets the best available favicon for a given URL and
// stores it locally.
// Returns the local path for use in img src attributes.
//***************
export const getFavicon = async (link) => {
  // Extract the origin (protocol + hostname + port) from the full URL
  // This ensures we only fetch one favicon per domain, not per page
  const url = new URL(link);
  const origin = url.origin;
  const domain = url.hostname;

  // Special cases for GitHub & YouTube based on domain of the link
  if (domain === "github.com") {
    return `<svg viewBox="0 0 24 24" class="favicon" aria-hidden="true">
            <use xlink:href="#icon-github"></use>
            </svg>`;
  }
  // TODO: Replace with YouTube icon when available
  if (domain.includes("youtube.com")) {
    return `<svg viewBox="0 0 24 24" class="favicon" aria-hidden="true">
            <use xlink:href="#icon-github"></use>
            </svg>`;
  }

  //******************************
  //
  // SPECIAL HANDLING OF CERTAIN DOMAINS THAT HAVE FAILED
  // DUE TO APPEARING TO HAVE A FAVICON, BUT THE FILE
  // RETURNED IS NOT USABLE AS AN IMAGE.
  //
  // TODO: CREATE A JSON LIST OF EXCEPTIONS TO HANDLE THESE CASES
  //
  //******************************

  if (
    domain.includes("martin-haehnel") ||
    domain.includes("nicholas.clooney") ||
    domain.includes("michaelengen") ||
    domain.includes("piperhaywood") ||
    domain.includes("nathan-smith")
  ) {
    return `<svg viewBox="0 0 24 24" class="favicon" aria-hidden="true">
    <use xlink:href="#icon-person-circle"></use>
    </svg>`;
  }
  //******************************

  // check if the favicon for this origin is already cached
  if (faviconCache[origin]) {
    return await genFaviconImg(faviconCache[origin]);
  }

  // console.log("Favicon not in cache for ", origin);
  const faviconUrl = await getFaviconUrl(origin);

  // if we haven't found a favicon URL
  //  - set the path to the default favicon
  // else
  //   - download the favicon image
  //   - generate the local path using the domain name
  //   - store the favicon image in _site/img/favicons
  // cache the resulting path to the favicon file
  // return the html img element using the favicon path
  //
  let faviconPath = "";
  if (faviconUrl === "use default favicon") {
    faviconPath = defaultFaviconPath;
  } else {
    // download the site's favicon image & store it in _site/img/favicons
    faviconPath = await genFaviconFile(origin, faviconUrl, domain);
  }
  // cache the local path to the favicon image
  faviconCache[origin] = faviconPath;

  // return the html img element using the local favicon path
  return await genFaviconImg(faviconPath);
};
