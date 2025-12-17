// environment variable handling
import "dotenv/config";

import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import { InputPathToUrlTransformPlugin } from "@11ty/eleventy";

import { minify } from "terser";
import postcss from "postcss";
import cssnanoPlugin from "cssnano";

import filters from "./content/_config/filters/index.js";

import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import pluginRSS from "@11ty/eleventy-plugin-rss";

// ********************************************************
export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    "./public/": "/",
    "./content/img/": "img",
    "./content/showcase/img": "img/showcase",
  });

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

  eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);

  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ["webp", "jpeg"],
    svgShortCircuit: true,
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

  eleventyConfig.addBundle("css", {
    toFileDirectory: "bundle",
  });

  // Adds posts collection to blog section
  eleventyConfig.addCollection("post", function (collectionApi) {
    return collectionApi.getFilteredByGlob("content/blog/**/*.md");
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
