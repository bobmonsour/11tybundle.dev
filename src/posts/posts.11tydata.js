module.exports = {
  layout: "post.njk",
  permalink: "blog/{{ page.fileSlug }}/",
  imageDir: "src/assets/img/",
  tags: "posts",
  draft: "true",
  image: {
    source: "11tybundle-dev.jpg",
    alt: "the number 11 as photographed by David Monje on Unsplash",
  },
};
