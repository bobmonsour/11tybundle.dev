export default {
  layout: "post.njk",
  permalink: "blog/{{ page.fileSlug }}/",
  imageDir: "src/assets/img/",
  tags: "posts",
  image: {
    source: "11tybundle-dev.png",
    alt: "A cute graphic depicting the 11ty Bundle Dev logo",
  },
  snow: "false",
  confetti: "false",
};
