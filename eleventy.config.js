module.exports = function (eleventyConfig) {
  //
  // Set up file and directory passthroughs
  //
  [
    { "src/assets/favicon/*": "/" },
    "src/assets/img/",
    "src/robots.txt",
  ].forEach((path) => eleventyConfig.addPassthroughCopy(path));

  // Add shortcodes
  //
  //  - eleventy image
  //  - current year
  //
  eleventyConfig.addNunjucksAsyncShortcode(
    "image",
    require("./src/eleventy.config.image.js")
  );

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  // Add filters
  //
  //  - generate reading time for a post
  //  - format the post date
  //  - return all the tags used in a collection
  //  - filter the post tag list to exclude a few collections
  //  - minify css for inline use
  //  - node inspection utility for debugging
  //  - extract items from the Airtable data that forms the basis of the 11ty Bundle
  //
  eleventyConfig.addFilter(
    "readingTime",
    require("./src/_includes/filters/readingtime.js")
  );

  // This filter formats the date of blog posts for the site
  eleventyConfig.addFilter("formatPostDate", function formatPostDate(date) {
    const { DateTime } = require("luxon");
    return DateTime.fromJSDate(date, { zone: "utc" }).toLocaleString(
      DateTime.DATE_MED
    );
  });

  // This filter formats the date of the items that come from the Airtable
  // database, which arrive as strings, not dates; for use in the Bundle posts
  eleventyConfig.addFilter("formatItemDate", function formatItemDate(date) {
    const { DateTime } = require("luxon");
    const itemDate = Date.parse(date);
    return DateTime.fromMillis(itemDate, { zone: "utc" }).toLocaleString(
      DateTime.DATE_MED
    );
  });

  // This filter formats the date of the items that come from the Airtable
  // database, which arrive as strings, not dates; for use in the firehose RSS feed
  eleventyConfig.addFilter("formatFirehoseDate", function formatItemDate(date) {
    const { DateTime } = require("luxon");
    const newDate = DateTime.fromISO(date);
    return newDate.toRFC2822();
  });

  // Extract releases, blog posts, and site items from Airtable data.
  // Data is returned in descending date order.
  // Data is extracted by Issue and Type.
  // The accepted values for Issue are:
  //             0 - items of the specified type from all issues
  //  issue number - items of the specified type from a specific issue
  // The accepted values for Type are:
  //   "release", "blog post", and "site"
  // eleventyConfig.addFilter(
  //   "getBundleItems",
  //   function getBundleItems(bundleitems, bundleIssue, itemType) {
  //     return bundleitems
  //       .filter(
  //         (item) =>
  //           (bundleIssue == item["Issue"] && itemType == item["Type"]) ||
  //           (bundleIssue === 0 && itemType == item["Type"])
  //       )
  //       .sort((a, b) => {
  //         return a.Date > b.Date ? -1 : 1;
  //       });
  //   }
  // );

  // Extract a list of the categories assigned to the selected link (blog post).
  // These are appended to each blog post item in the Bundle.
  eleventyConfig.addFilter("getItemCategories", (bundleitems, link) => {
    return bundleitems.filter((item) => item.Link == link);
  });

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
  //
  const EleventyFetch = require("@11ty/eleventy-fetch");
  const cheerio = require("cheerio");
  eleventyConfig.addFilter(
    "getDescription",
    async function getDescription(link) {
      try {
        let htmlcontent = await EleventyFetch(link, {
          duration: "*",
          type: "buffer",
        });
        const $ = cheerio.load(htmlcontent);
        // console.log(
        //   "description: " + $("meta[name=description]").attr("content")
        // );
        const description = $("meta[name=description]").attr("content");
        // console.log("link: " + link);
        // console.log("type of link: " + typeof link);
        if (link.includes("youtube.com")) {
          return "YouTube video";
        } else if (description == undefined) {
          return "";
        } else {
          return description;
        }
      } catch (e) {
        console.log(
          "Error fetching description for " + link + ": " + e.message
        );
        return "";
      }
    }
  );

  // Extract a list of the unique categories used in all of the issues
  // of The 11ty Bundle from Airtable data. Items are sorted alphabetically.
  eleventyConfig.addFilter("getBundleCategories", (collection) => {
    let categorySet = new Set();
    for (let item of collection) {
      (item.Categories || []).forEach((category) => categorySet.add(category));
    }
    return Array.from(categorySet).sort((a, b) => {
      return a > b ? 1 : -1;
    });
  });

  eleventyConfig.addFilter(
    "getBundlePosts",
    function getBundlePosts(bundleitems, bundleIssue) {
      return bundleitems
        .filter(
          (item) =>
            (bundleIssue == item["Issue"] && item["Type"] == "blog post") ||
            (bundleIssue == 0 && item["Type" == "blog post"])
        )
        .sort((a, b) => {
          return a.Date > b.Date ? -1 : 1;
        });
    }
  );

  eleventyConfig.addFilter(
    "getBundleFirehose",
    function getBundleFirehose(bundleitems) {
      function validateFirehose(item) {
        if (item["Type"] == "blog post") {
          return true;
        }
      }
      return bundleitems.filter(validateFirehose).sort((a, b) => {
        return a.Date > b.Date ? -1 : 1;
      });
    }
  );

  eleventyConfig.addFilter(
    "getBundleReleases",
    function getBundleReleases(bundleitems, bundleIssue) {
      function validateRelease(item) {
        if (item["Issue"] == bundleIssue && item["Type"] == "release") {
          // console.log("item[Type]: " + item["Type"]);
          return true;
        }
      }
      return bundleitems.filter(validateRelease).sort((a, b) => {
        return a.Date > b.Date ? -1 : 1;
      });
    }
  );

  eleventyConfig.addFilter(
    "getBundleSites",
    function getBundleSites(bundleitems, bundleIssue) {
      return bundleitems
        .filter(
          (item) => bundleIssue == item["Issue"] && item["Type"] == "site"
        )
        .sort((a, b) => {
          return a.Date > b.Date ? -1 : 1;
        });
    }
  );

  // Generate a list of the unique categories and the number of items in
  // each category in all of the issues of The 11ty Bundle from Airtable data.
  // Category names are sorted alphabetically.
  eleventyConfig.addFilter("getCategoriesAndCounts", (collection) => {
    let categoryMap = new Map();
    for (let item of collection) {
      (item.Categories || []).forEach((category) =>
        categoryMap.set(category, categoryMap.get(category) + 1 || 1)
      );
    }
    return Array.from(categoryMap).sort((a, b) => {
      return a[0] > b[0] ? 1 : -1;
    });
  });

  // Extract a list of the unique blog post authors used in all of the issues
  // of The 11ty Bundle from Airtable data along with a count of their posts.
  // Authors are sorted alphabetically by first name.
  eleventyConfig.addFilter("getAuthorsAndCounts", (collection) => {
    const authorMap = new Map();
    for (let item of collection) {
      if (item.Author && item.Type == "blog post") {
        authorMap.set(item.Author, authorMap.get(item.Author) + 1 || 1);
      }
    }
    return Array.from(authorMap).sort((a, b) => {
      return a[0] > b[0] ? 1 : -1;
    });
  });

  // Given a category, get all blog posts with that category from the Airtable data.
  eleventyConfig.addFilter(
    "postsInCategory",
    function postsInCategory(bundleitems, category) {
      function postInCategory(item) {
        if (item.Categories) {
          return item.Type == "blog post" && item.Categories.includes(category)
            ? true
            : false;
        } else {
          if (item.Type == "blog post") {
            console.log(
              "Error: blog post entry has no categories: " + item.Link
            );
            return false;
          }
        }
      }
      return bundleitems.filter(postInCategory).sort((a, b) => {
        return a.Date > b.Date ? -1 : 1;
      });
    }
  );

  // Get all blog posts by a specific author from the Airtable data.
  eleventyConfig.addFilter(
    "postsByAuthor",
    function postsbyAuthor(bundleitems, author) {
      return bundleitems
        .filter((item) => item.Type === "blog post" && item.Author === author)
        .sort((a, b) => {
          return a.Date > b.Date ? -1 : 1;
        });
    }
  );

  // sitemap.xml hack - It seems that the first of paginated pages is the only
  // link that is included in the sitemap. What I really need for this site is
  // for the main page to be in the sitemap, not any of the paginated pages.
  // Specifically, I need for /categories/ and /authors/ to be in the sitemap.
  // So this filter takes the page.url in sitemap.njk and ensures that those
  // pages are included, rather than including the first of the paginated pages.
  eleventyConfig.addFilter("sitemapUrl", function sitemapUrl(url) {
    if (url.includes("/categories/")) {
      return "/categories/";
    } else if (url.includes("/authors/")) {
      return "/authors/";
    } else {
      return url;
    }
  });

  const inspect = require("node:util").inspect;
  eleventyConfig.addFilter("inspect", function (obj = {}) {
    return inspect(obj, { sorted: true });
  });

  eleventyConfig.setQuietMode(true);

  // Add plugins
  //
  //  - syntax highlighting
  //  - RSS feed generation
  //  - have eleventy process sass and post-process with lightning
  //  - support for 'draft: true' in template frontmatter
  //  - directory output to show at build time
  //  - eleventy bundle plugin for CSS (and JS and more)
  //
  const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
  eleventyConfig.addPlugin(syntaxHighlight);

  const pluginRss = require("@11ty/eleventy-plugin-rss");
  eleventyConfig.addPlugin(pluginRss);

  const eleventyDrafts = require("./src/eleventy.config.drafts.js");
  eleventyConfig.addPlugin(eleventyDrafts);

  const bundlerPlugin = require("@11ty/eleventy-plugin-bundle");
  const postcss = require("postcss");
  const postcssMinify = require("postcss-minify");
  eleventyConfig.addPlugin(bundlerPlugin, {
    transforms: [
      async function (content) {
        // this.type returns the bundle name.
        if (this.type === "css") {
          // Same as Eleventy transforms, this.page is available here.
          let result = await postcss([postcssMinify]).process(content, {
            from: this.page.inputPath,
            to: null,
          });
          return result.css;
        }

        return content;
      },
    ],
  });

  return {
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data",
    },
  };
};
