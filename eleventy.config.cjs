// environment variable handling
require("dotenv").config();
const slugCache = {};

// Shortcode references
const imageShortcode = require("./config/shortcodes/image.cjs");
// Filter references
const {
  isCurrentPage,
  formatPostDate,
  formatItemDate,
  formatFirehoseDate,
  formatNumber,
  getBundleItems,
  getDescription,
  getRSSlink,
  postsInCategory,
  postsByAuthor,
  postCountByAuthor,
  readingTime,
  webmentionsByUrl,
  plainDate,
} = require("./config/filters/filters.cjs");

// Plugin references
const postGraph = require("@rknightuk/eleventy-plugin-post-graph");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginRSS = require("@11ty/eleventy-plugin-rss");
const bundlerPlugin = require("@11ty/eleventy-plugin-bundle");
const postcss = require("postcss");
const postcssMinify = require("postcss-minify");
const { auth } = require("googleapis/build/src/apis/abusiveexperiencereport");
const { concat } = require("lodash");
// const { get } = require("lodash");

module.exports = function (eleventyConfig) {
  // Passthrough copy for static assets
  [
    { "src/assets/favicon/*": "/" },
    "src/assets/img/",
    "src/assets/js/",
    "src/robots.txt",
  ].forEach((path) => eleventyConfig.addPassthroughCopy(path));

  // Custom filters
  eleventyConfig.addFilter("isCurrentPage", isCurrentPage);
  eleventyConfig.addFilter("formatPostDate", formatPostDate);
  eleventyConfig.addFilter("formatItemDate", formatItemDate);
  eleventyConfig.addFilter("formatFirehoseDate", formatFirehoseDate);
  eleventyConfig.addFilter("formatNumber", formatNumber);
  eleventyConfig.addFilter("getBundleItems", getBundleItems);
  eleventyConfig.addAsyncFilter("getDescription", getDescription);
  eleventyConfig.addFilter("postsInCategory", postsInCategory);
  eleventyConfig.addFilter("postsByAuthor", postsByAuthor);
  eleventyConfig.addFilter("postCountByAuthor", postCountByAuthor);
  eleventyConfig.addFilter("readingTime", readingTime);
  eleventyConfig.addFilter("webmentionsByUrl", webmentionsByUrl);
  eleventyConfig.addFilter("plainDate", plainDate);
  eleventyConfig.addFilter(
    "cachedSlugify",
    (cachedSlugify = (input) => {
      // Check if the slug is in the cache
      if (slugCache[input]) {
        return slugCache[input];
      }
      // If not, generate the slug and store it in the cache
      const slug = eleventyConfig.getFilter("slugify")(input, {
        customReplacements: [["'", "-"]],
      });
      slugCache[input] = slug;
      return slug;
    })
  );

  // Custom shortcodes
  // Eleventy image shortcode for image optimization
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);

  // Create a single post item for the category, author, and firehose pages
  // Inputs are:
  //	- post: object representing a post (see below)
  //	- type: usage of the post (see below)
  //	- value: used to create a CSS ID for the post when it is displayed (either an author or a category; it can be either one for the firehose page as the ID is not used.
  //
  // The post object includes the following properties (all strings):
  //  Title: Title of the post
  //  Link: URL of the post
  //  Author: Author of the post
  //  Date: Date of the post
  //  Categories: array of categories for the post
  //
  // The type is one of the following 3 strings:
  //  "category": for the category page
  //  "author": for the author page
  //  "firehose": for the firehose page
  //
  //
  // Each of these has an implied pagefind-weight,
  // which is used to sort the search results:
  //	- category: 10 (highest priority)
  //	- author: 5
  //	- firehose: 0 (lowest priority)
  //	- blog: 0
  //
  // A weight of 0 should result in those posts items being ignored by the pagefind app as they are duplicates of those already present in the category and author pages.
  //
  // For usage on the category page, the CSS id is created by concatenating the slugified category name, the slugified title, and the date of the post.
  // For usage on the author page, the CSS id is created by concatenating the slugified author name, the slugified title, and the date of the post.
  // For usage on the firehose page, the CSS id is an empty string.
  //
  // These CSS IDs are used to create a landing place for the links in the pagefind results.
  eleventyConfig.addNunjucksAsyncShortcode(
    "singlePost",
    async function (post, type, idKey, postCount) {
      const title = post.Title.replace(/[<>]/g, "");
      const titleSlug = cachedSlugify(title);
      const description = await getDescription(post.Link);
      const authorSlug = cachedSlugify(post.Author);
      const url = new URL(post.Link);
      const siteUrl = url.origin;
      let siteUrlString = "";
      let rssLinkString = "";
      switch (siteUrl) {
        case "https://www.youtube.com":
        case "https://medium.com":
          break;
        default:
          siteUrlString = ` &middot; <a href="${siteUrl}">Source website</a>`;
          const rssLink = await getRSSlink(siteUrl);
          if (rssLink === "") {
            rssLinkString = "";
          } else {
            rssLinkString = ` & <a href="${rssLink}">RSS feed</a>`;
          }
          break;
      }
      // if (
      //   siteUrl === "https://www.youtube.com" ||
      //   siteUrl === "https://medium.com"
      // ) {
      //   siteUrlString = "";
      // } else {
      //   siteUrlString = ` &middot; <a href="${siteUrl}">Source website</a>`;
      // } else {
      //   const rssLink = await getRSSlink(siteUrl);
      //   if (rssLink === "") {
      //     rssLinkString = "";
      //   } else {
      //     rssLinkString = ` & <a href="${rssLink}">RSS feed</a>`;
      //   }
      // }
      const date = formatItemDate(post.Date);
      const id =
        '"' + cachedSlugify(idKey) + "-" + titleSlug + "-" + post.Date + '"';
      switch (type) {
        case "category": // for category pages
          pageWeightorIgnore = "data-pagefind-weight = 10";
          break;
        case "author": // for author pages
          pageWeightorIgnore = "data-pagefind-weight = 5";
          break;
        case "firehose": // for the firehose page
        case "blog": // for the Bundle blog posts
          pageWeightorIgnore = "data-pagefind-ignore";
      }
      let categories = "";
      post.Categories.forEach((category) => {
        let slugifiedCategory = cachedSlugify(category);
        categories += `<a href="/categories/${slugifiedCategory}/">${category}</a>`;
      });
      return `
			<div class="bundleitem">
      	<h2 class="bundleitem-title" ID=${id} ${pageWeightorIgnore}><a href="${post.Link}" data-link-type="external">${post.Title}</a></h2>
        <p class="bundleitem-description">${description}</p>
        <p class="bundleitem-date">${date}</p>
        <p class="bundleitem-dateline"><a href="/authors/${authorSlug}/">by ${post.Author} (${postCount})</a>${siteUrlString}${rssLinkString}</p>
				<p class="bundleitem-categories" data-pagefind-ignore>Categories: ${categories}</p>
      </div>`;
    }
  );

  // Plugins
  eleventyConfig.addPlugin(postGraph, {
    sort: "desc",
    boxColor: "darkgray",
    highlightColor: "red",
    textColor: "#fff",
  });
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginRSS);
  // eleventyConfig.setQuietMode(true);
  // eleventyConfig.addPlugin(directoryOutputPlugin, {
  //   columns: {
  //     filesize: true,
  //     benchmark: true,
  //   },
  // });
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

  eleventyConfig.setQuietMode(true);

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
