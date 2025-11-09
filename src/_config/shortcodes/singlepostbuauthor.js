import { getDescription } from "../filters/getdescription.js";
import { formatItemDate } from "../filters/datesandnumbers.js";

// Create a single post item for the author pages
// Inputs are:
//	- post: object representing a post (see below)
//	- type: usage of the post (see below) - fixed as "author" for calls to this
//	- value: used to create a CSS ID for the post when it is displayed;
//    it can be either one for the firehose page as the ID is not used.
//
// The post object includes the following properties (all strings):
//	Title: Title of the post
//	Link: URL of the post
//	Author: Author of the post
//	Date: Date of the post
//	Categories: array of categories for the post
//
// The type is "author" as all calls to this are for pages for each author.
// The shortcode singlepost.js is used for category and firehose pages.
//
// The pagefind-weight for "author" pages is 5.
// which is used to sort the search results:
//	- category: 10 (highest priority)
//	- author: 5
//	- firehose: 0 (lowest priority)
//	- blog: 0
//
// A weight of 0 should result in those posts items being ignored by the pagefind app
// as they are duplicates of those already present in the category and author pages.
//
// On the author page, the CSS id is created by concatenating the slugified
// author name, the slugified title, and the date of the post.
//
// These CSS IDs are used to create a landing place for the links in the search
// results.
//
export default function (eleventyConfig) {
  eleventyConfig.addNunjucksAsyncShortcode(
    "singlePostByAuthor",
    async function (post, type, idKey, postCount) {
      const slugify = eleventyConfig.getFilter("slugify");
      const title = post.Title.replace(/[<>]/g, "");
      const titleSlug = slugify(title);
      const description = await getDescription(post.Link);
      const authorSlug = slugify(post.Author);
      const date = formatItemDate(post.Date);
      const id = '"' + slugify(idKey) + "-" + titleSlug + "-" + post.Date + '"';
      const pageWeightorIgnore = "data-pagefind-weight = 5";
      // let moreString = "";
      // if (postCount > 4) {
      //   moreString = `<p class="bundleitem-dateline">More by <a href="/authors/${authorSlug}/">${post.Author}</a></p>`;
      // }
      let categories = "";
      post.Categories.forEach((category) => {
        let slugifiedCategory = slugify(category);
        categories += `<a href="/categories/${slugifiedCategory}/">${category}</a>`;
      });
      return `
				<div class="bundleitem">
          <a href="${post.Link}" class="bundleitem-title" ID=${id} ${pageWeightorIgnore} data-link-type="external">${post.Title}</a>
					<p class="bundleitem-description">${description}</p>
					<p class="bundleitem-date">${date}</p>
          <p class="bundleitem-categories" data-pagefind-ignore>Categories: ${categories}</p>
				</div>`;
    }
  );
}
