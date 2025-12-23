import { fetchHtml } from "./fetchhtml.js";
import { AssetCache } from "@11ty/eleventy-fetch";
import * as cheerio from "cheerio";
import path from "path";
import { fileURLToPath } from "url";
import { promises as fs } from "fs";
import { cacheDuration } from "../../_data/cacheconfig.js";

// Persistent failure cache across builds
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const failureCachePath = path.join(
  __dirname,
  "../../../.cache/errorlogs/rss-fetch-failures.json"
);
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
    console.error("Failed to save RSS failure cache:", error.message);
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

//***************
// given the origin of a site, attempt to extract a link
// to the site's RSS feed by searching for the appropriate
// link elements in the site's head element.
//***************

export async function getRSSLink(siteOrigin) {
  // Check persistent failure cache first
  if (failureCache[siteOrigin]) {
    const failureDate = failureCache[siteOrigin];
    // If failure is less than 30 days old, skip fetch
    if (!isFailureExpired(failureDate)) {
      return "";
    }
    // If 30+ days old, we'll retry (continue to fetch below)
  }

  // Check AssetCache for previously extracted RSS link
  const cacheKey = `rss-link-${siteOrigin}`;
  const cache = new AssetCache(cacheKey, ".cache");

  if (cache.isCacheValid(cacheDuration.rssLinkHtml)) {
    const cachedRssLink = await cache.getCachedValue();
    if (cachedRssLink !== undefined) {
      return cachedRssLink;
    }
  }

  // fetch the html of the site's origin and attempt to extract the RSS link
  // from the site's head element
  try {
    let htmlcontent = await fetchHtml(siteOrigin, "rssLinkHtml");
    let $ = cheerio.load(htmlcontent);
    let rssLink =
      $('link[type="application/rss+xml"]').attr("href") ||
      $('link[type="application/atom+xml"]').attr("href");

    let result = "";
    if (rssLink == undefined) {
      result = "";
    } else if (rssLink.startsWith("http")) {
      result = rssLink;
    } else {
      if (rssLink.charAt(0) === "/") {
        result = siteOrigin + rssLink;
      } else {
        result = siteOrigin + "/" + rssLink;
      }
    }

    // Success! Remove from failure cache if it was there
    if (failureCache[siteOrigin]) {
      delete failureCache[siteOrigin];
      await saveFailureCache();
    }

    // Cache the extracted RSS link
    await cache.save(result, "text");
    return result;
  } catch (e) {
    console.log("Error fetching RSS link for " + siteOrigin + " " + e.message);

    // Add to persistent failure cache with current date
    failureCache[siteOrigin] = getCurrentDate();
    await saveFailureCache();

    // Cache empty result on error
    await cache.save("", "text");
    return "";
  }
}
