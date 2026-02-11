export default {
  layout: "post.njk",
  bodyClass: "blog",
  eleventyComputed: {
    permalink: (data) => `/blog/${data.page.fileSlug}/`,
  },
  tags: "post",
  image: {
    source: "opengraph-image.jpg",
    alt: "A cute graphic depicting the 11ty Bundle Dev logo",
  },
};
