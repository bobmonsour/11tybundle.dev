import { getDescription } from "../filters/getdescription.js";
import { getRSSlink } from "../filters/getrsslink.js";
import { formatItemDate } from "../filters/datesandnumbers.js";
import { getSocialIcons } from "../filters/getsocialicons.js";
import { getFavicon } from "../filters/getfavicon.js";

// Create a single post item for the category, author, and firehose pages
// Inputs are:
//	- post: object representing a post (see below)
//	- type: usage of the post (see below)
//	- value: used to create a CSS ID for the post when it is displayed (either an author or a category; it can be either one for the firehose page as the ID is not used.
//
// The post object includes the following properties (all strings):
//	Title: Title of the post
//	Link: URL of the post
//	Author: Author of the post
//	Date: Date of the post
//	Categories: array of categories for the post
//
// The type is one of the following 3 strings:
//	"category": for the category page
//	"author": for the author page
//	"firehose": for the firehose page
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
//
export default function (eleventyConfig) {
  eleventyConfig.addNunjucksAsyncShortcode(
    "singlePost",
    async function (post, type, idKey, postCount) {
      const slugify = eleventyConfig.getFilter("slugify");
      const title = post.Title.replace(/[<>]/g, "");
      const titleSlug = slugify(title);
      const description = await getDescription(post.Link);
      const authorSlug = slugify(post.Author);
      const url = new URL(post.Link);
      const siteUrl = url.origin;
      const faviconSource = await getFavicon(siteUrl);
      const postCountLabel = postCount == 1 ? "post" : "posts";
      let siteUrlString = "";
      let rssLinkString = "";
      let webIcon = "";
      let rssIcon = "";
      let pageWeightorIgnore = "";
      switch (siteUrl) {
        case "https://www.youtube.com":
        case "https://medium.com":
          break;
        default:
          siteUrlString = ` &middot; <a href="${siteUrl}">Website</a>`;
          let rssLink = await getRSSlink(siteUrl);
          webIcon = `<a href="${siteUrl}"><img src="/assets/img/globe.svg" alt="link to author's website" class="social-icon"></a>`;
          rssLinkString =
            rssLink === "" ? "" : ` &amp; <a href="${rssLink}">RSS feed</a>`;
          rssIcon = `<a href="${rssLink}"><img src="/assets/img/rss.svg" alt="link to author's rss feed" class="social-icon"></a>`;
          break;
      }
      const date = formatItemDate(post.Date);
      const id = '"' + slugify(idKey) + "-" + titleSlug + "-" + post.Date + '"';
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
      const socialImages = await getSocialIcons(post.Link);

      let categories = "";
      post.Categories.forEach((category) => {
        let slugifiedCategory = slugify(category);
        categories += `<a href="/categories/${slugifiedCategory}/">${category}</a>`;
      });
      return `
				<div class="bundleitem">
          <div class="bundleitem-header">
            <img src="${faviconSource}" alt="favicon for the author's site" class="favicon">
            <a href="${post.Link}" class="bundleitem-title" ID=${id} ${pageWeightorIgnore} data-link-type="external">${post.Title}</a>
          </div>
					<p class="bundleitem-description">${description}</p>
					<p class="bundleitem-date">${date}</p>
					<p class="bundleitem-dateline">by <a href="/authors/${authorSlug}/">${post.Author}</a> (${postCount} ${postCountLabel})</p>
					${webIcon}${rssIcon}${socialImages}
          <p class="bundleitem-categories" data-pagefind-ignore>Categories: ${categories}</p>
				</div>`;
    }
  );
}
