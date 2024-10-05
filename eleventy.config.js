// environment variable handling
import "dotenv/config";

import filters from "./src/_config/filters/index.js";
import shortcodes from "./src/_config/shortcodes/index.js";
import singlePost from "./src/_config/shortcodes/singlepost.js";

import postGraph from "@rknightuk/eleventy-plugin-post-graph";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import pluginRSS from "@11ty/eleventy-plugin-rss";
import XRayPlugin from "eleventy-plugin-xray";

export default function (eleventyConfig) {
	// Passthrough copy for static assets
	[
		{ "src/assets/favicon/*": "/" },
		"src/assets/img/",
		"src/assets/js/",
		"src/robots.txt",
	].forEach((path) => eleventyConfig.addPassthroughCopy(path));

	// Add local filters and shortcodes
	eleventyConfig.addPlugin(filters);
	eleventyConfig.addPlugin(shortcodes);
	eleventyConfig.addPlugin(singlePost);

	// Add & configure external plugins
	eleventyConfig.addPlugin(postGraph, {
		sort: "desc",
		boxColor: "darkgray",
		highlightColor: "red",
		textColor: "#fff",
	});
	eleventyConfig.addPlugin(syntaxHighlight);
	eleventyConfig.addPlugin(pluginRSS);

	eleventyConfig.addPlugin(XRayPlugin, {
		dir: "_xray",
		onlyEnvName: "ELEVENTY_ENV",
		onlyEnv: "development",
	});

	eleventyConfig.addBundle("css", {
		toFileDirectory: "bundle",
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
}
