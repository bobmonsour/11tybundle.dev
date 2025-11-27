import { minify } from "terser";
import postcss from "postcss";
import cssnanoPlugin from "cssnano";

// environment variable handling
import "dotenv/config";

import filters from "./content/_config/filters/index.js";
import shortcodes from "./content/_config/shortcodes/index.js";
import singlePost from "./content/_config/shortcodes/singlepost.js";
import singlePostByAuthor from "./content/_config/shortcodes/singlepostbyauthor.js";

// import postGraph from "@rknightuk/eleventy-plugin-post-graph";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import pluginRSS from "@11ty/eleventy-plugin-rss";

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "./public/": "/" });
  eleventyConfig.addBundle("js", {
    transforms: [
      async function (content) {
        let { type, page } = this;
        let result = await minify(content);
        return result.code;
      },
    ],
    toFileDirectory: "dist",
  });

  // Adds the {% svg %} paired shortcode
  eleventyConfig.addBundle("svg", {
    toFileDirectory: "dist",
  });

  //adds the {% css %} paired shortcode
  eleventyConfig.addBundle("css", {
    transforms: [
      async function (content) {
        let { type, page } = this;
        let result = await postcss([cssnanoPlugin]).process(content, {
          from: page.inputPath,
          to: null,
        });
        return result.css;
      },
    ],
    toFileDirectory: "dist",
  });

  // // Passthrough copy for static assets
  // [
  //   { "src/assets/favicon/*": "/" },
  //   "src/assets/css/",
  //   "src/assets/img/",
  //   "src/assets/img/favicons/",
  //   "src/assets/js/",
  //   "src/robots.txt",
  // ].forEach((path) => eleventyConfig.addPassthroughCopy(path));

  // Add local filters and shortcodes
  eleventyConfig.addPlugin(filters);
  eleventyConfig.addPlugin(shortcodes);
  // While a shortcode, the singlePost andsinglePostByAythor uses getFilter
  // to allow re-use of eleventy's built-in slugify filter, and
  // as a result requires their own additions as shortcodes
  eleventyConfig.addPlugin(singlePost);
  eleventyConfig.addPlugin(singlePostByAuthor);

  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginRSS);

  eleventyConfig.addBundle("css", {
    toFileDirectory: "bundle",
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
