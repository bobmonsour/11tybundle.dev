module.exports = {
  env: process.env.ELEVENTY_ENV,
  title: "The 11ty Bundle | Home",
  description: "A bundle of Eleventy resources, mostly blog posts.",
  url: "https://www.11tybundle.dev",
  language: "en",
  author: {
    name: "Bob Monsour",
    email: "bob.monsour@gmail.com",
    url: "https://bobmonsour.com/",
  },
  mainNavLinks: [
    { url: "/categories/", text: "Categories" },
    { url: "/authors/", text: "Authors" },
    { url: "/archive/", text: "Archive" },
    { url: "/about/", text: "About" },
  ],
};
