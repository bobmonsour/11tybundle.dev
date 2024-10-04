// import UpgradeHelper from "@11ty/eleventy-upgrade-help";

// environment variable handling
import "dotenv/config";

// Import filters, shortcodes, and plugins
import filters from "./src/_config/filters.js";
import shortcodes from "./src/_config/shortcodes.js";
import postGraph from "@rknightuk/eleventy-plugin-post-graph";
import singlePost from "./src/_config/plugins/singlepost.js";
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

	// Add filters
	eleventyConfig.addFilter("cachedSlugify", filters.cachedSlugify);
	eleventyConfig.addFilter("formatFirehoseDate", filters.formatFirehoseDate);
	eleventyConfig.addFilter("formatItemDate", filters.formatItemDate);
	eleventyConfig.addFilter("formatNumber", filters.formatNumber);
	eleventyConfig.addFilter("formatPostDate", filters.formatPostDate);
	eleventyConfig.addFilter("getBundleItems", filters.getBundleItems);
	eleventyConfig.addAsyncFilter("getDescription", filters.getDescription);
	eleventyConfig.addAsyncFilter("getRSSlink", filters.getRSSlink);
	eleventyConfig.addFilter("isCurrentPage", filters.isCurrentPage);
	eleventyConfig.addFilter("plainDate", filters.plainDate);
	eleventyConfig.addFilter("postCountByAuthor", filters.postCountByAuthor);
	eleventyConfig.addFilter("postCountLabel", filters.postCountLabel);
	eleventyConfig.addFilter("postsByAuthor", filters.postsByAuthor);
	eleventyConfig.addFilter("postsInCategory", filters.postsInCategory);
	eleventyConfig.addFilter("readingTime", filters.readingTime);
	eleventyConfig.addFilter("webmentionsByUrl", filters.webmentionsByUrl);

	// Add shortcodes
	eleventyConfig.addNunjucksAsyncShortcode("image", shortcodes.imageShortcode);
	eleventyConfig.addPlugin(singlePost);

	// Add Plugins
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

	// Configure the 11ty plugin bundle
	eleventyConfig.addBundle("css", {
		toFileDirectory: "bundle",
	});

	// Install the upgrade helper
	// eleventyConfig.addPlugin(UpgradeHelper);

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
