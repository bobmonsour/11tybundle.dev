// Get the array of exceptions, meaning the array of URLs that will
// not have their descriptions fetched due to errors.
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const exceptionList = require("../../_data/exception-list.json");
import { cacheDuration, fetchTimeout } from "../../_data/cacheconfig.js";

import Fetch from "@11ty/eleventy-fetch";
import * as cheerio from "cheerio";

let descriptionCache = {};

// getDescription - given a url, this Eleventy filter extracts the meta
// description from within the <head> element of a web page using the cheerio
// library.
//
// The full html content of the page is fetched using the eleventy-fetch plugin.
// If you have a lot of links from which you want to extract descriptions, the
// initial build time will be slow. However, the plugin will cache the content
// for a duration of your choosing (in this case, it's set to *, which will
// never fetch new data after the first success).
//
// The description is extracted from the <meta> element with the name attribute
// of "description".
//
// If no description is found, the filter returns an empty string. In the event
// of an error, the filter logs an error to the console and returns the string
// "(no description available)"
//
// Note that I have a .cache folder in my project root and added .cache to my
// .gitignore file. See https://www.11ty.dev/docs/plugins/fetch/#installation
export const getDescription = async (link) => {
  // Check if the description is in the cache
  if (descriptionCache[link]) {
    return descriptionCache[link];
  }
  if (link.includes("youtube.com")) {
    descriptionCache[link] = "YouTube video";
    return descriptionCache[link];
  }

  // Check for known urls that have issues when fetching
  // the description (as seen in the build logs).
  // See _data/exception-list.json for the list of exceptions.
  const url = new URL(link);
  const siteUrl = url.origin;
  if (
    exceptionList.some(
      (item) => item.url === siteUrl && item.descriptionFail === "true"
    )
  ) {
    // console.log("Description exception: " + siteUrl);
    descriptionCache[link] = "";
    return descriptionCache[link];
  }

  try {
    let htmlcontent = await Fetch(link, {
      directory: ".cache",
      duration: cacheDuration.descHtml,
      type: "buffer",
      fetchOptions: {
        signal: AbortSignal.timeout(fetchTimeout.descHtml),
        headers: {
          "user-agent":
            "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36",
        },
      },
    });
    const $ = cheerio.load(htmlcontent);
    const description = $("meta[name=description]").attr("content");
    if (description == undefined) {
      descriptionCache[link] = "";
    } else {
      descriptionCache[link] = description
        .replace(/[<>]/g, "") // Remove angle brackets
        .replace(/&(?!(?:[a-z\d]+|#\d+|#x[a-f\d]+);)/gi, "&amp;") // Escape unencoded ampersands
        .replace(/"/g, "&quot;") // Escape quotes
        .replace(/'/g, "&#39;") // Escape apostrophes
        .replace(/\s+/g, " ") // Normalize whitespace
        .replace(/[\u0000-\u001F\u007F-\u009F]/g, "") // Remove control characters
        .replace(/[\u200B-\u200D\uFEFF]/g, "") // Remove zero-width characters
        .replace(/[\u202A-\u202E]/g, "") // Remove directional text markers
        .replace(/\u00AD/g, "") // Remove soft hyphens
        .replace(/[\u00A0]/g, " ") // Convert non-breaking spaces to regular spaces
        .replace(/[\u2000-\u200A]/g, " ") // Convert various unicode spaces to regular spaces
        .replace(/[\u2028\u2029]/g, " ") // Remove line/paragraph separators
        .replace(/[\u2060]/g, "") // Remove word joiners
        .replace(/[\uFFF9-\uFFFB]/g, "") // Remove interlinear annotation characters
        .trim()
        .substring(0, 300); // Reasonable length limit for descriptions
    }
    return descriptionCache[link];
  } catch (e) {
    // console.log("Error fetching description for " + link + " " + e.message);
    console.log("Error fetching description for " + link);
    return "";
  }
};
