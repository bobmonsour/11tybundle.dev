import "dotenv/config";

export default {
  env: process.env.ELEVENTY_ENV,
  title: "The 11ty Bundle",
  subtitle: "A curated feed of 11ty resources.",
  description: "A curated feed of 11ty resources.",
  url: "https://11tybundle.dev",
  language: "en",
  locale: "en",
  author: {
    name: "Bob Monsour",
    email: "bob.monsour@gmail.com",
    url: "https://bobmonsour.com/",
  },
  headerAnnouncement: "true",
  mainNavLinks: [
    { url: "/categories/", text: "Categories", count: "categoryCount" },
    { url: "/authors/", text: "Authors", count: "authorCount" },
    { url: "/starters/", text: "Starters", count: "starterCount" },
    { url: "/blog/", text: "Blog" },
    { url: "/firehose/", text: "Firehose", count: "postCount" },
  ],
  footerNavLinks: [
    { url: "/categories/", text: "Categories" },
    { url: "/authors/", text: "Authors" },
    { url: "/firehose/", text: "Firehose" },
    { url: "/starters/", text: "Starters" },
    { url: "/blog/", text: "Blog" },
    { url: "/about/", text: "About" },
  ],
};
