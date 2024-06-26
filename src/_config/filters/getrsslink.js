import EleventyFetch from "@11ty/eleventy-fetch";
import * as cheerio from "cheerio";

const rssLinkCache = {};

// getRSSlink - given the origin of a site, attempt to extract a link
// to the site's RSS feed by searching for the appropriate link elements
// in the site's head element. Cache the result to avoid repeated fetches.
export const getRSSlink = async (siteOrigin) => {
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
