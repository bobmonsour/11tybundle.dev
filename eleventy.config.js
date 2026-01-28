// environment variable handling
import "dotenv/config";

import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import { InputPathToUrlTransformPlugin } from "@11ty/eleventy";

import filters from "./content/_config/filters/index.js";

import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import pluginRSS from "@11ty/eleventy-plugin-rss";

// ********************************************************
export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    "./public/fonts/": "/fonts/",
    "./public/css/feed.xsl": "/",
    "./public/js/theme.js": "/js/theme.js",
    "./public/_redirects": "/",
    "./public/robots.txt": "/",
    "./content/img/": "img",
    "./content/screenshots/": "screenshots",
  });

  //adds the css and js bundles
  eleventyConfig.addBundle("css");

  eleventyConfig.addBundle("js");

  // Adds the {% svg %} paired shortcode
  eleventyConfig.addBundle("svg", {
    toFileDirectory: "dist",
  });

  eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);

  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ["webp", "jpeg"],
    svgShortCircuit: true,
    transformOnRequest: false,
    widths: [640, 1280, 1920],
    htmlOptions: {
      imgAttributes: {
        decoding: "async",
        loading: "lazy",
        sizes: "100vw",
      },
    },
  });

  // Add local filters and shortcodes
  eleventyConfig.addPlugin(filters);

  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginRSS);

  // Adds posts collection to blog section
  eleventyConfig.addCollection("post", function (collectionApi) {
    return collectionApi.getFilteredByGlob("content/blog/**/*.md");
  });

  eleventyConfig.addWatchTarget("./public/css/");

  // Prevent drafts from being published using front matter
  eleventyConfig.addPreprocessor("drafts", "*", (data, content) => {
    if (data.draft && process.env.ELEVENTY_RUN_MODE === "build") {
      return false;
    }
  });

  eleventyConfig.setQuietMode(true);

  return {
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dir: {
      input: "content",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data",
    },
  };
}
