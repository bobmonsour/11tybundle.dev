module.exports = {
  env: process.env.ELEVENTY_ENV,
  title: "The 11ty Bundle | Home",
  subtitle:
    "Resources for developers using the Eleventy static site generator.",
  description: "A bundle of Eleventy resources, mostly blog posts.",
  url: "https://www.11tybundle.dev",
  language: "en",
  author: {
    name: "Bob Monsour",
    email: "bob.monsour@gmail.com",
    url: "https://bobmonsour.com/",
  },
  mainNavLinks: [
    { url: "/", text: "Home" },
    { url: "/categories/", text: "Categories" },
    { url: "/authors/", text: "Authors" },
    { url: "/starters/", text: "Starters" },
    { url: "/firehose/", text: "Firehose" },
    { url: "/blog/", text: "Blog" },
    { url: "/about/", text: "About" },
  ],
  footerNavLinks: [
    { url: "/", text: "Home" },
    { url: "/categories/", text: "Categories" },
    { url: "/authors/", text: "Authors" },
    { url: "/firehose/", text: "Firehose" },
    { url: "/starters/", text: "Starters" },
    { url: "/blog/", text: "Blog" },
    { url: "/about/", text: "About" },
    { url: "/feed.xml", text: "RSS (Blog)" },
    { url: "/firehosefeed.xml", text: "RSS (Firehose)" },
  ],
};
