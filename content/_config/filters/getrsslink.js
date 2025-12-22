import fetchHtml from "./fetchhtml.js";
import * as cheerio from "cheerio";

//***************
// given the origin of a site, attempt to extract a link
// to the site's RSS feed by searching for the appropriate
// link elements in the site's head element.
//***************

export async function getRSSLink(siteOrigin) {
  // fetch the html of the site's origin and attempt to extract the RSS link
  // from the site's head element
  try {
    let htmlcontent = await fetchHtml(siteOrigin, "rssLinkHtml");
    let $ = cheerio.load(htmlcontent);
    let rssLink =
      $('link[type="application/rss+xml"]').attr("href") ||
      $('link[type="application/atom+xml"]').attr("href");
    if (rssLink == undefined) {
      return "";
    } else if (rssLink.startsWith("http")) {
      return rssLink;
    } else {
      if (rssLink.charAt(0) === "/") {
        return siteOrigin + rssLink;
      } else {
        return siteOrigin + "/" + rssLink;
      }
    }
  } catch (e) {
    console.log("Error fetching RSS link for " + siteOrigin + " " + e.message);
    return "";
  }
}
