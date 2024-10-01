// Get the array of exceptions, meaning the array of URLs that will
// not have their RSS links fetched due to errors.
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const exceptionList = require("../../_data/exception-list.json");

import EleventyFetch from "@11ty/eleventy-fetch";
import * as cheerio from "cheerio";

const rssLinkCache = {};

// getRSSlink - given the origin of a site, attempt to extract a link
// to the site's RSS feed by searching for the appropriate link elements
// in the site's head element. Cache the result to avoid repeated fetches.
// Skip this determination of the url is in the exception list.
export const getRSSlink = async (siteOrigin) => {
	const exceptionItem = exceptionList.find((item) => item.url === siteOrigin);
	// console.log("RSS exception: " + siteOrigin);
	if (exceptionItem) {
		rssLinkCache[siteOrigin] = exceptionItem.rssFeed || "";
		// console.log("RSS exception: " + exceptionItem.rssFeed);
		return rssLinkCache[siteOrigin];
	}
	// Check if the RSS link is in the cache
	if (rssLinkCache[siteOrigin]) {
		return rssLinkCache[siteOrigin];
	} else {
		// fetch the html of the site's origin and attempt to extract the RSS link
		// from the site's head element
		try {
			let htmlcontent = await EleventyFetch(siteOrigin, {
				directory: ".cache",
				duration: "*",
				type: "buffer",
			});
			let $ = cheerio.load(htmlcontent);
			let rssLink =
				$('link[type="application/rss+xml"]').attr("href") ||
				$('link[type="application/atom+xml"]').attr("href");
			if (rssLink == undefined) {
				rssLink = "";
				rssLinkCache[siteOrigin] = "";
			} else if (rssLink.startsWith("http")) {
				rssLinkCache[siteOrigin] = rssLink;
			} else {
				if (rssLink.charAt(0) === "/") {
					rssLink = siteOrigin + rssLink;
					rssLinkCache[siteOrigin] = rssLink;
				} else {
					rssLink = siteOrigin + "/" + rssLink;
					rssLinkCache[siteOrigin] = rssLink;
				}
				// console.log("RSS link for " + siteOrigin + " is " + rssLink);
			}
			return rssLink;
		} catch (e) {
			console.log(
				"Error fetching RSS link for " + siteOrigin + " " + e.message
			);
			// console.log("Error fetching site origin for " + siteOrigin);
			return "";
		}
	}
};
