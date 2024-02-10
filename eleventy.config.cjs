// environment variable handling
require("dotenv").config();

// Shortcode references
const imageShortcode = require("./config/shortcodes/image.cjs");
// Filter references
const {
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
} = require("./config/filters/index.cjs");

// Plugin references
const postGraph = require("@rknightuk/eleventy-plugin-post-graph");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginRSS = require("@11ty/eleventy-plugin-rss");
const bundlerPlugin = require("@11ty/eleventy-plugin-bundle");
const postcss = require("postcss");
const postcssMinify = require("postcss-minify");
// const { get } = require("lodash");

module.exports = function (eleventyConfig) {
  // Passthrough copy for static assets
  [
    { "src/assets/favicon/*": "/" },
    "src/assets/img/",
    "src/assets/js/",
    "src/robots.txt",
  ].forEach((path) => eleventyConfig.addPassthroughCopy(path));

  // Custom shortcodes
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);

  // Custom filters
  eleventyConfig.addFilter("isCurrentPage", isCurrentPage);
  eleventyConfig.addFilter("formatPostDate", formatPostDate);
  eleventyConfig.addFilter("formatItemDate", formatItemDate);
  eleventyConfig.addFilter("formatFirehoseDate", formatFirehoseDate);
  eleventyConfig.addFilter("getBundleItems", getBundleItems);
  eleventyConfig.addAsyncFilter("getDescription", getDescription);
  eleventyConfig.addFilter("postsInCategory", postsInCategory);
  eleventyConfig.addFilter("postsByAuthor", postsByAuthor);
  eleventyConfig.addFilter("readingTime", readingTime);
  eleventyConfig.addFilter("webmentionsByUrl", webmentionsByUrl);
  eleventyConfig.addFilter("plainDate", plainDate);
  const slugCache = {};
  eleventyConfig.addFilter("cachedSlugify", function (input) {
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
  });

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
