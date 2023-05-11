const { DateTime } = require("luxon");
const EleventyFetch = require("@11ty/eleventy-fetch");
const cheerio = require("cheerio");

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

// Extract releases, blog posts, and site items from Airtable data.
// Data is returned in descending date order.
// Data is extracted by Issue and Type.
// The accepted values for Issue are:
//  issue number - items of the specified type from a specific issue
//             0 - all blog posts
// The accepted values for Type are:
//   "release", "blog post", and "site"
const getBundleItems = (bundleitems, bundleIssue, bundleType) => {
  console.log("bundleType = " + bundleType + " bundleIssue = " + bundleIssue);
  if (bundleIssue == 0) {
    let postCount = 0;
    for (let i = 0; i < bundleitems.length; i++) {
      if (bundleitems[i]["Type"] == "blog post") {
        postCount++;
      }
    }
    console.log("Post count is: " + postCount);
  }
  return bundleitems
    .filter(
      (item) =>
        (item["Type"] == bundleType && item["Issue"] == bundleIssue) ||
        (item["Type"] == "blog post" && bundleIssue === 0)
    )
    .sort((a, b) => {
      return a.Date > b.Date ? -1 : 1;
    });
};

// Extract a list of the categories assigned to the selected link (blog post).
// These are appended to each blog post item in the Bundle.
const getItemCategories = (bundleitems, link) => {
  return bundleitems.filter((item) => item.Link == link);
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
    if (link.includes("youtube.com")) {
      return "YouTube video";
    } else if (description == undefined) {
      return "";
    } else {
      return description;
    }
  } catch (e) {
    console.log("Error fetching description for " + link + ": " + e.message);
    return "";
  }
};

// Generate a list of the unique categories and the number of items in
// each category in all of the issues of The 11ty Bundle from Airtable data.
// Category names are sorted alphabetically.
const getCategoriesAndCounts = (collection) => {
  let categoryMap = new Map();
  for (let item of collection) {
    (item.Categories || []).forEach((category) =>
      categoryMap.set(category, categoryMap.get(category) + 1 || 1)
    );
  }
  let categoryList = Array.from(categoryMap).sort((a, b) => {
    return a[0] > b[0] ? 1 : -1;
  });
  console.log("Category count is: " + categoryList.length);
  return categoryList;
};

// Extract a list of the unique blog post authors used in all of the issues
// of The 11ty Bundle from Airtable data along with a count of their posts.
// Authors are sorted alphabetically by first name.
const getAuthorsAndCounts = (collection) => {
  const authorMap = new Map();
  for (let item of collection) {
    if (item.Author && item.Type == "blog post") {
      authorMap.set(item.Author, authorMap.get(item.Author) + 1 || 1);
    }
  }
  let authorList = Array.from(authorMap).sort((a, b) => {
    return a[0] > b[0] ? 1 : -1;
  });
  console.log("Author count is: " + authorList.length);
  return authorList;
};

// Given a category, get all blog posts with that category
// from the Airtable data.
const postsInCategory = (bundleitems, category) => {
  function postInCategory(item) {
    if (item.Categories) {
      return item.Type == "blog post" && item.Categories.includes(category)
        ? true
        : false;
    } else {
      if (item.Type == "blog post") {
        console.log("Error: blog post entry has no categories: " + item.Link);
        return false;
      }
    }
  }
  return bundleitems.filter(postInCategory).sort((a, b) => {
    return a.Date > b.Date ? -1 : 1;
  });
};

// Get all blog posts by a specific author from the Airtable data.
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
  formatPostDate,
  formatItemDate,
  formatFirehoseDate,
  getBundleItems,
  getItemCategories,
  getDescription,
  getCategoriesAndCounts,
  getAuthorsAndCounts,
  postsInCategory,
  postsByAuthor,
  readingTime,
};
