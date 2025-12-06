export default {
  layout: "post.njk",
  bodyClass: "blog",
  eleventyComputed: {
    permalink: (data) => `blog/${data.page.fileSlug}/`,
  },
  imageDir: "src/assets/img/",
  tags: "post",
  image: {
    source: "11tybundle-dev.png",
    alt: "A cute graphic depicting the 11ty Bundle Dev logo",
  },
};
