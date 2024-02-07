const { DateTime } = require("luxon");
const EleventyFetch = require("@11ty/eleventy-fetch");
const cheerio = require("cheerio");
const sanitizeHTML = require("sanitize-html");

const descriptionCache = {};

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
  // Check if the description is in the cache
  if (descriptionCache[link]) {
    return descriptionCache[link];
  }
  try {
    let htmlcontent = await EleventyFetch(link, {
      directory: ".cache",
      duration: "*",
      type: "buffer",
    });
    const $ = cheerio.load(htmlcontent);
    const description = $("meta[name=description]").attr("content");
    if (link.includes("youtube.com")) {
      descriptionCache[link] = "YouTube video";
    } else if (description == undefined) {
      descriptionCache[link] = "";
    } else {
      descriptionCache[link] = description.trim();
    }
    return descriptionCache[link];
  } catch (e) {
    console.log("Error fetching description for " + link + " " + e.message);
    return "";
  }
};

// Given a category, get all blog posts with that category
// from the data.
const postsInCategory = (bundleitems, category, count) => {
  function postInCategory(item) {
    if (count == 0) {
      sliceCount = 100000;
    } else {
      sliceCount = count;
    }
    return item.Type == "blog post" && item.Categories.includes(category)
      ? true
      : false;
  }
  return bundleitems
    .filter(postInCategory)
    .sort((a, b) => {
      return a.Date > b.Date ? -1 : 1;
    })
    .slice(0, sliceCount);
};

// Given an author, get all blog posts written by that author
// from the Airtable data.
const postsByAuthor = (bundleitems, author, count) => {
  if (count == 0) {
    sliceCount = 100000;
  } else {
    sliceCount = count;
  }
  return bundleitems
    .filter((item) => item.Type === "blog post" && item.Author === author)
    .sort((a, b) => {
      return a.Date > b.Date ? -1 : 1;
    })
    .slice(0, sliceCount);
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

// get the webmentions for a particular post by the post's url
// Usage: {{ webmentionsByUrl(webmentions, url) }}
// An eleventy filter function that takes in an array of web mentions and a url.
// It returns an object with the following properties:
// - like-of: an array of likes
// - like-of.count: the number of likes
// - repost-of: an array of reposts
// - repost-of.count: the number of reposts
// - in-reply-to: an array of replies
// - in-reply-to.count: the number of replies
//
// Each webmention object is structured as follows:
//  {
//    "type": "entry",
//    "author": {
//      "type": "card",
//      "name": "Sara Soueidan",
//      "photo": "https://webmention.io/avatar/pbs.twimg.com/579a474c9b858845a9e64693067e12858642fa71059d542dce6285aed5e10767.jpg",
//      "url": "https://sarasoueidan.com"
//    },
//    "url": "https://twitter.com/SaraSoueidan/status/1022009419926839296",
//    "published": "2018-07-25T06:43:28+00:00",
//    "wm-received": "2018-07-25T07:01:17Z",
//    "wm-id": 537028,
//    "wm-source": "https://brid-gy.appspot.com/comment/twitter/mxbck/1022001729389383680/1022009419926839296",
//    "wm-target": "https://mxb.dev/blog/layouts-of-tomorrow/",
//    "content": {
//      "content-type": "text/plain",
//      "value": "This looks great!",
//      "text": "This looks great!"
//    },
//    "in-reply-to": "https://mxb.dev/blog/layouts-of-tomorrow/",
//    "wm-property": "in-reply-to",
//    "wm-private": false
//  }
const webmentionsByUrl = (webmentions, url) => {
  const allowedTypes = {
    likes: ["like-of"],
    reposts: ["repost-of"],
    comments: ["mention-of", "in-reply-to"],
  };

  const sanitize = (entry) => {
    if (entry.content && entry.content.html) {
      entry.content = sanitizeHTML(entry.content.html, {
        allowedTags: ["b", "i", "em", "strong", "a"],
      });
    }
    return entry;
  };

  const pageWebmentions = webmentions
    .filter(
      (mention) => mention["wm-target"] === "https://11tybundle.dev" + url
    )
    .sort((a, b) => new Date(b.published) - new Date(a.published))
    .map(sanitize);
  // console.log("pageWebmentions: ", pageWebmentions);

  const likes = pageWebmentions
    .filter((mention) => allowedTypes.likes.includes(mention["wm-property"]))
    .filter((like) => like.author)
    .map((like) => like.author);
  // console.log(JSON.stringify(likes, null, 2));

  const reposts = pageWebmentions
    .filter((mention) => allowedTypes.reposts.includes(mention["wm-property"]))
    .filter((repost) => repost.author)
    .map((repost) => repost.author);

  const comments = pageWebmentions
    .filter((mention) => allowedTypes.comments.includes(mention["wm-property"]))
    .filter((comment) => {
      const { author, published, content } = comment;
      return author && author.name && published && content;
    });
  // console.log(JSON.stringify(comments, null, 2));

  const mentionCount = likes.length + reposts.length + comments.length;
  // console.log("mentionCount: ", mentionCount);
  const data = { likes, reposts, comments, mentionCount };
  return data;
};

// create a plain date from an ISO date (for webmentions)
const plainDate = (isoDate) => {
  let date = new Date(isoDate);
  let options = { year: "numeric", month: "long", day: "numeric" };
  let formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
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
  webmentionsByUrl,
  plainDate,
};
