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
    { url: "/firehose/", text: "Firehose" },
    { url: "/archive/", text: "Archive" },
    { url: "/about/", text: "About" },
    { url: "/feed.xml", text: "Blog RSS" },
    { url: "/firehosefeed.xml", text: "Firehose RSS" },
  ],
};
