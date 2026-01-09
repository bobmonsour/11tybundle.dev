import "dotenv/config";

export default {
  env: process.env.ELEVENTY_ENV,
  title: "The 11ty Bundle",
  subtitle: "Bundles of 11ty know-how",
  description:
    "Welcome to the 11ty Bundle—your curated source for discovering how the community is using 11ty, a simple, flexible, open-source static site generator.",
  url: "https://11tybundle.dev",
  language: "en",
  locale: "en",
  author: {
    name: "Bob Monsour",
    email: "bob.monsour@gmail.com",
    url: "https://bobmonsour.com/",
  },
  headerAnnouncement: false,
};
