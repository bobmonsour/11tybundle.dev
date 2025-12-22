import { fetchHtml } from "./fetchhtml.js";
import * as cheerio from "cheerio";

//***************
// given a url, this filter extracts the meta
// description from within the <head> element of a web page
// using the cheerio library.
//***************

export const getDescription = async (link) => {
  if (link.includes("youtube.com")) {
    return "YouTube video";
  }

  try {
    let htmlcontent = await fetchHtml(link, "descHtml");
    const $ = cheerio.load(htmlcontent);
    let description = $("meta[name=description]").attr("content");
    if (description == undefined) {
      return "";
    } else {
      let text = description
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

      // looking for markdown links
      // fast bail-out if no opening bracket present
      if (!text.includes("[")) {
        description = text;
      } else {
        // Regex: [link text](url) → <a href="url">link text</a>
        description = text.replace(
          /\[([^\]]+)\]\(([^)]+)\)/g,
          '<a href="$2">$1</a>'
        );
      }
    }
    return description;
  } catch (e) {
    // console.log("Error fetching description for " + link + " " + e.message);
    console.log("Error fetching description for " + link + " " + e.message);
    return "";
  }
};
