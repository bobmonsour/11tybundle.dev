// Fetch an html page and return the full html content
// used for fetching post and author page descriptions
// and extracting social media links and rss feed links
import Fetch from "@11ty/eleventy-fetch";
import path from "path";
import { fileURLToPath } from "url";
import { promises as fs } from "fs";

import { cacheDuration, fetchTimeout } from "../../_data/cacheconfig.js";

// Persistent failure cache across builds
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const failureCachePath = path.join(
  __dirname,
  "../../../.cache/errorlogs/html-fetch-failures.json"
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
    console.error("Failed to save HTML fetch failure cache:", error.message);
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

export const fetchHtml = async (link, cacheSpec) => {
  // Check persistent failure cache first
  if (failureCache[link]) {
    const failureDate = failureCache[link];
    // If failure is less than 30 days old, throw cached error
    if (!isFailureExpired(failureDate)) {
      throw new Error(`Skipping fetch (cached failure from ${failureDate})`);
    }
    // If 30+ days old, we'll retry (continue to fetch below)
  }

  try {
    const htmlcontent = await Fetch(link, {
      directory: ".cache",
      duration: cacheDuration[cacheSpec],
      type: "buffer",
      fetchOptions: {
        signal: AbortSignal.timeout(fetchTimeout[cacheSpec]),
        headers: {
          "user-agent":
            "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36",
        },
      },
    });

    // Success! Remove from failure cache if it was there
    if (failureCache[link]) {
      delete failureCache[link];
      await saveFailureCache();
    }

    return htmlcontent;
  } catch (error) {
    // Add/update persistent failure cache with current date
    failureCache[link] = getCurrentDate();
    await saveFailureCache();

    // Re-throw the error for caller to handle
    throw error;
  }
};
