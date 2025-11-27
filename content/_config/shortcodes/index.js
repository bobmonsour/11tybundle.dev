import { image } from "./image.js";
// import { singlePost } from "./singlepost.js";

const shortcodes = {
	image,
};

export default (eleventyConfig) => {
	return Object.keys(shortcodes).forEach((shortcode) => {
		eleventyConfig.addShortcode(shortcode, shortcodes[shortcode]);
	});
};
