const { DateTime } = require("luxon");
const EleventyFetch = require("@11ty/eleventy-fetch");
const cheerio = require("cheerio");

// Determine whether or not to highlight current page in the nav
// if the link text appears within the page url, then do highlight
const isCurrentPage = (linkText, pageUrl) => {
  lcLinkText = linkText.toLowerCase();
  if (pageUrl.includes(lcLinkText)) {
    return 'aria-current="page"';
  }
};

// Format the date of blog posts for the site
const formatPostDate = (date) => {
  return DateTime.fromJSDate(date, { zone: "utc" }).toLocaleString(
    DateTime.DATE_MED
  );
};

// Format the date of the items that come from the Airtable
// database, which arrive as strings, not dates; for use in
// the Bundle posts
const formatItemDate = (date) => {
  const itemDate = Date.parse(date);
  return DateTime.fromMillis(itemDate, { zone: "utc" }).toLocaleString(
    DateTime.DATE_MED
  );
};

// This filter formats the date of the items that come from
// the Airtable database, which arrive as strings, not dates; for
// use in the firehose RSS feed
const formatFirehoseDate = (date) => {
  const newDate = DateTime.fromISO(date);
  return newDate.toRFC2822();
};

// Extract releases, blog posts, and sites from the Airtable data for
// the occasional 11ty Bundle blog post. Data is returned in descending date order.
// For releases, blog posts, and sites, data is extracted by Issue and Type.
// bundleIssue is the Issue number and is specified in the front matter of the
// calling blog template.
// The accepted values for Type are:
//   "release", "blog post", "site"
const getBundleItems = (bundleitems, bundleIssue, bundleType) => {
  return bundleitems
    .filter(
      (item) => item["Type"] == bundleType && item["Issue"] == bundleIssue
    )
    .sort((a, b) => {
      return a.Date > b.Date ? -1 : 1;
    });
};

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
const getDescription = async (link) => {
  try {
    let htmlcontent = await EleventyFetch(link, {
      duration: "*",
      type: "buffer",
    });
    const $ = cheerio.load(htmlcontent);
    const description = $("meta[name=description]").attr("content");

    // const site1string = "childcare-vouchers";
    // const site2string = "samhermes";
    // const site3string = "time2hack";
    // if (
    //   link.includes(site1string) ||
    //   link.includes(site2string) ||
    //   link.includes(site3string)
    // ) {
    //   console.log("Link: " + link);
    //   console.log("Description: " + description);
    // }
    if (link.includes("youtube.com")) {
      return "YouTube video";
    } else if (description == undefined) {
      return "";
    } else {
      return description;
    }
  } catch (e) {
    console.log("Error fetching description for " + link + " " + e.message);
    return "";
  }
};

// Given a category, get all blog posts with that category
// from the Airtable data.
const postsInCategory = (bundleitems, category) => {
  function postInCategory(item) {
    return item.Type == "blog post" && item.Categories.includes(category)
      ? true
      : false;
  }
  return bundleitems.filter(postInCategory).sort((a, b) => {
    return a.Date > b.Date ? -1 : 1;
  });
};

// Given an author, get all blog posts written by that author
// from the Airtable data.
const postsByAuthor = (bundleitems, author) => {
  return bundleitems
    .filter((item) => item.Type === "blog post" && item.Author === author)
    .sort((a, b) => {
      return a.Date > b.Date ? -1 : 1;
    });
};

// Calculate the reading time, in minutes, of a post
//
// Assumptions:
// - average reading time is 240 words per minute
//   source: https://bit.ly/3HCogSr, "Most Comprehensive
//   Review To Date Finds The Average Person’s Reading
//   Speed Is Slower Than Previously Thought"
//
// Output:
// - reading time is rounded to the nearest minute
// - in the case of less than 1 minute, reading time is
//   displayed as "less than a minute"
//
// @param {String} text
const readingTime = (text) => {
  var content = new String(text);
  const speed = 240; // reading speed in words per minute

  // remove all html elements
  var re = /(&lt;.*?&gt;)|(<[^>]+>)/gi;
  var plain = content.replace(re, "");

  // replace all newlines and 's with spaces
  var plain = plain.replace(/\s+|'s/g, " ");

  // create array of all the words in the post & count them
  var words = plain.split(" ");
  var count = words.length;

  // calculate the reading time
  var readingTime = Math.round(count / speed);
  if (readingTime === 0) {
    return "Less than 1 minute to read";
  } else if (readingTime === 1) {
    return "1 minute to read";
  } else {
    return readingTime + " minutes to read";
  }
};

module.exports = {
  isCurrentPage,
  formatPostDate,
  formatItemDate,
  formatFirehoseDate,
  getBundleItems,
  getDescription,
  postsInCategory,
  postsByAuthor,
  readingTime,
};
