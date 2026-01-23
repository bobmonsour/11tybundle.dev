// ********************
// All the records stored in bundledb.json are processed, returning
// various subsets and filtered extracts of the data for use in the
// site's templates
// ********************

import { AssetCache } from "@11ty/eleventy-fetch";
import slugify from "@sindresorhus/slugify";

import { cacheDuration } from "./cacheconfig.js";

// for access to starter data from their GitHub repos
import { Octokit } from "@octokit/rest";
import { Buffer } from "buffer";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN, // personal access token
});

// main function to generate and return the bundle data
export default async function () {
  const functionStartTime = performance.now();

  let bundleRecords;
  let localData;

  // Use limited dataset for latest issue testing; faster builds
  if (process.env.USE_LATEST_DATA === "true") {
    localData = await import(
      "/Users/Bob/Dropbox/Docs/Sites/11tybundle/11tybundledb/bundledb-latest-issue.json",
      {
        with: { type: "json" },
      }
    );
  } else {
    localData = await import(
      "/Users/Bob/Dropbox/Docs/Sites/11tybundle/11tybundledb/bundledb.json",
      {
        with: { type: "json" },
      }
    );
  }

  bundleRecords = localData.default;
  console.log("Loaded local bundleDB");

  console.log(`Fetched bundleRecords: ${bundleRecords.length} records`);

  // **************
  // Verify presence of required fields for each type
  // **************

  // Blog post required fields
  const blogPostFields = [
    "Issue",
    "Type",
    "Title",
    "slugifiedTitle",
    "Link",
    "Date",
    "formattedDate",
    "description",
    "Author",
    "slugifiedAuthor",
    "AuthorSite",
    "AuthorSiteDescription",
    "socialLinks",
    "favicon",
    "rssLink",
    "Categories",
  ];

  // Release required fields
  const releaseFields = [
    "Issue",
    "Type",
    "Title",
    "description",
    "Link",
    "Date",
    "formattedDate",
  ];

  // Site required fields
  const siteFields = [
    "Issue",
    "Type",
    "Title",
    "description",
    "Link",
    "Date",
    "formattedDate",
    "favicon",
  ];

  // Validate blog posts
  for (let item of bundleRecords) {
    if (item["Type"] === "blog post" && !item["Skip"]) {
      const missingFields = blogPostFields.filter((field) => !(field in item));

      if (missingFields.length > 0) {
        const titleDisplay = item["Title"] || "[No Title]";
        console.error(
          `Error: Blog post "${titleDisplay}" is missing properties: ${missingFields.join(
            ", ",
          )}`,
        );
      }
    }
  }

  // Validate releases
  for (let item of bundleRecords) {
    if (item["Type"] === "release") {
      const missingFields = releaseFields.filter((field) => !(field in item));

      if (missingFields.length > 0) {
        const titleDisplay = item["Title"] || "[No Title]";
        console.error(
          `Error: Release "${titleDisplay}" is missing properties: ${missingFields.join(
            ", ",
          )}`,
        );
      }
    }
  }

  // Validate sites
  for (let item of bundleRecords) {
    if (item["Type"] === "site" && !item["Skip"]) {
      const missingFields = siteFields.filter((field) => !(field in item));

      if (missingFields.length > 0) {
        const titleDisplay = item["Title"] || "[No Title]";
        console.error(
          `Error: Site "${titleDisplay}" is missing properties: ${missingFields.join(
            ", ",
          )}`,
        );
      }
    }
  }

  // **************
  // firehose is an array of all blog posts in descending date order
  // **************

  // Create Firehose with all blog posts
  const firehose = bundleRecords
    .filter((item) => item["Type"] === "blog post" && !item["Skip"])
    .sort((a, b) => new Date(b.Date) - new Date(a.Date));
  const postCount = firehose.length;

  // **************
  // generate a sorted array of author objects, sorted either
  // by name or by post count, with each author object having
  // the following properties:
  //  - author name
  //  - slugified author name
  //  - first letter of the author's last name/word
  //  - count of posts by that author
  //  - origin site of the author's posts
  //  - origin site info, including:
  //    - description
  //    - favicon
  //    - rss link
  //    - social links
  // **************
  const authorList = async (posts, sortField) => {
    function authorSort(a, b) {
      if (sortField === "name") {
        const getLastWord = (str) => {
          const words = str.trim().split(" ");
          return words[words.length - 1];
        };
        const lastA = getLastWord(a.name).toLowerCase() || "";
        const lastB = getLastWord(b.name).toLowerCase() || "";
        return lastA.localeCompare(lastB); // Sort by last name/word
      } else {
        return b.count - a.count; // Sort by count descending
      }
    }

    const getFirstLetterOfLastWord = (str) => {
      const words = str.trim().split(" ");
      const lastWord = words[words.length - 1];
      return lastWord.charAt(0).toUpperCase();
    };

    const authorMap = new Map();

    for (let item of posts) {
      // Skip items with missing author names
      if (!item.Author) continue;
      if (item.Skip) continue;

      const existing = authorMap.get(item.Author);

      if (existing) {
        // Author exists, increment count
        existing.count += 1;
      } else {
        // New author, add to map
        authorMap.set(item.Author, {
          name: item.Author,
          slugifiedAuthor: item.slugifiedAuthor,
          firstLetter: getFirstLetterOfLastWord(item.Author),
          count: 1,
          origin: item.AuthorSite,
          description: item.AuthorSiteDescription,
          favicon: item.favicon,
          rssLink: item.rssLink,
          socialLinks: item.socialLinks,
        });
      }
    }

    // Convert map to array of objects
    const authorArray = Array.from(authorMap).map(([name, data]) => ({
      name,
      slugifiedAuthor: data.slugifiedAuthor,
      firstLetter: data.firstLetter,
      count: data.count,
      origin: data.origin,
      description: data.description,
      favicon: data.favicon,
      rssLink: data.rssLink,
      socialLinks: data.socialLinks,
    }));

    return authorArray.sort(authorSort);
  };

  // **************
  // Build author data FIRST so we can reuse slugified names and favicons
  // when enriching posts (avoiding ~1,600 duplicate operations)
  // **************
  const authorsBaseData = await authorList(firehose, "name");
  const authors = authorsBaseData;
  const authorsByCount = [...authorsBaseData].sort((a, b) => b.count - a.count);
  const authorCount = authors.length;
  const authorLetters = [
    ...new Set(authors.map((author) => author.firstLetter)),
  ];

  // **************
  // generate an array of the most recent 11 releases
  // in descending date order; used on the home page
  // **************
  const releaseList = bundleRecords
    .filter((item) => item["Type"] === "release")
    .sort((a, b) => {
      return new Date(b.Date) - new Date(a.Date);
    });
  const releaseCount = releaseList.length;

  // **************
  // generate a list of sites, an array of all sites in
  // descending date order
  // **************
  const siteList = bundleRecords
    .filter((item) => item["Type"] === "site" && !item["Skip"])
    .sort((a, b) => {
      return new Date(b.Date) - new Date(a.Date);
    });
  const siteCount = siteList.length;

  // **************
  // generate two lists of starter projects, one ordered by date of
  // most recent update and the second by number of GitHub stars
  // **************
  const rawStarters = bundleRecords.filter(
    (item) => item["Type"] === "starter" && !item["Skip"],
  );

  const enrichStarters = async (starters) => {
    const cacheKey = `starter-projects`;
    const cache = new AssetCache(cacheKey, ".cache");
    if (cache.isCacheValid(cacheDuration.starters)) {
      const cachedStarters = await cache.getCachedValue();
      if (cachedStarters) {
        console.log(`Using cached starter project metadata`);
        return cachedStarters;
      }
    }

    const enrichedStarters = [];
    for (const starter of starters) {
      if (!starter.Link) {
        enrichedStarters.push(starter);
        continue;
      }

      try {
        const urlParts = starter.Link.split("/");
        const owner = urlParts[urlParts.length - 2];
        const repo = urlParts[urlParts.length - 1];

        // fetch repo metadata for this starter (per-starter concurrent calls)
        const [repoData, commitsData, packageJsonData] = await Promise.all([
          octokit.repos.get({ owner, repo }),
          octokit.repos.listCommits({ owner, repo, per_page: 1 }),
          octokit.repos
            .getContent({ owner, repo, path: "package.json" })
            .catch(() => null),
        ]);

        const lastCommitDate = commitsData.data[0].commit.committer.date;
        const date = new Date(lastCommitDate);
        const options = { year: "numeric", month: "long", day: "numeric" };
        const formattedDate = date.toLocaleDateString("en-US", options);

        let version = null;
        if (packageJsonData) {
          const content = Buffer.from(
            packageJsonData.data.content,
            "base64",
          ).toString("utf-8");
          const regex = /"@11ty\/eleventy":\s*"\^?([^"]+)"/;
          const match = content.match(regex);
          if (match) version = match[1];
        }

        enrichedStarters.push({
          ...starter,
          Stars: repoData.data.stargazers_count,
          Date: date.toISOString().split("T")[0],
          LastUpdated: formattedDate,
          description: starter.description || repoData.data.description,
          Version: version,
          Owner: repoData.data.owner.login,
          OwnerUrl: repoData.data.owner.html_url,
        });
      } catch (error) {
        console.error(`Failed to fetch metadata for ${starter.Link}:`, error);
        enrichedStarters.push(starter);
      }
    }

    await cache.save(enrichedStarters, "json");
    return enrichedStarters;
  };

  let starters = await enrichStarters(rawStarters);
  starters = starters.sort(
    (a, b) => new Date(b.LastUpdated) - new Date(a.LastUpdated),
  );
  const startersByStars = starters.slice().sort((a, b) => b.Stars - a.Stars);
  const starterCount = starters.length;

  // **************
  // get the most recent 3 unique authors from the top 50 posts
  // randomly select 3 posts with unique authors from the most recent 50 posts
  // then extract those author records from the authors array
  // **************
  const getRecentAuthors = (firehoseData, authorsData) => {
    // Single pass through firehose, stops at 50 unique authors
    const uniqueAuthorPosts = [];
    const seenAuthors = new Set();

    for (const post of firehoseData) {
      if (!seenAuthors.has(post.Author)) {
        uniqueAuthorPosts.push(post);
        seenAuthors.add(post.Author);
        if (uniqueAuthorPosts.length === 50) break;
      }
    }

    // Shuffle and select 3
    const shuffledPosts = uniqueAuthorPosts.sort(() => Math.random() - 0.5);
    const selectedPosts = shuffledPosts.slice(0, 3);

    // Use Map for O(1) lookups
    const authorsByName = new Map(
      authorsData.map((author) => [author.name, author]),
    );

    return selectedPosts
      .map((post) => authorsByName.get(post.Author))
      .filter((author) => author !== undefined);
  };

  let recentAuthors = getRecentAuthors(firehose, authors);

  // generate pagedFirehose, an array of arrays, each inner array
  // this is for paginating the firehose page by year
  const pagedFirehose = Object.values(
    firehose.reduce((acc, post) => {
      const year = new Date(post.Date).getUTCFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(post);
      return acc;
    }, {}),
  ).sort((a, b) => {
    // Sort by year descending (most recent first)
    const yearA = new Date(a[0].Date).getUTCFullYear();
    const yearB = new Date(b[0].Date).getUTCFullYear();
    return yearB - yearA;
  });

  // generate firehoseYears, a descending array of years for navigation
  const firehoseYears = pagedFirehose.map((yearPosts) =>
    new Date(yearPosts[0].Date).getUTCFullYear(),
  );
  console.log(`firehoseYears: ${firehoseYears.length} years`);

  // **************
  // generate a sorted array of categories, sorted either by name or by
  // post count, with each category having the following properties:
  //  - slugified category name
  //  - count of posts in each category
  //  - first letter of the category
  // **************
  const categoryList = (posts, sortField) => {
    function categorySort(a, b) {
      if (sortField === "category") {
        // Handle undefined values safely
        const catA = a.name || "";
        const catB = b.name || "";
        return catA.localeCompare(catB);
      } else {
        return b.count - a.count; // Sort by count descending
      }
    }
    let categoryMap = new Map();
    for (let item of posts) {
      // Skip items with missing categories
      if (!item.Categories || !Array.isArray(item.Categories)) continue;
      if (item.Skip) continue;

      for (const category of item.Categories) {
        const existing = categoryMap.get(category);
        if (existing) {
          existing.count += 1;
        } else {
          categoryMap.set(category, {
            slugifiedCategory: slugify(category.replace(/[.,;:!?]+$/, ""), {
              lower: true,
            }),
            count: 1,
            firstLetter: category.charAt(0),
          });
        }
      }
    }
    return Array.from(categoryMap)
      .map(([name, data]) => ({
        name,
        slugifiedCategory: data.slugifiedCategory,
        count: data.count,
        firstLetter: data.firstLetter,
      }))
      .sort(categorySort);
  };

  // **************
  // generate two arrays from the categories:
  //   - one sorted by category name
  //   - one sorted by post count
  // total category count; firehose contains all blog posts
  // 2nd param of categoryList is the field to sort by, name or count
  // also generate an array of unique first letters of categories
  // **************
  const categories = categoryList(firehose, "category");
  const categoriesByCount = categoryList(firehose, "count");
  const categoryCount = categories.length;
  const categoryLetters = [
    ...new Set(categories.map((category) => category.firstLetter)),
  ].sort((a, b) => a.localeCompare(b));

  // **************
  // log the counts of various items
  console.log("postCount: " + postCount);
  console.log("siteCount: " + siteCount);
  console.log("releaseCount: " + releaseCount);
  console.log("starterCount: " + starterCount);
  console.log("authorCount: " + authorCount);
  console.log("categoryCount: " + categoryCount);

  const functionEndTime = performance.now();
  const totalTime = ((functionEndTime - functionStartTime) / 1000).toFixed(2);
  console.log(`\n========================================`);
  console.log(`TOTAL BUNDLEDATA EXECUTION TIME: ${totalTime} seconds`);
  console.log(`========================================\n`);

  // **************
  // return the full set of records and the counts for use
  // on various pages of the site
  return {
    bundleRecords,
    firehose,
    pagedFirehose,
    firehoseYears,
    postCount,
    releaseList,
    releaseCount,
    siteList,
    siteCount,
    starters,
    startersByStars,
    starterCount,
    authors,
    authorsByCount,
    authorCount,
    authorLetters,
    recentAuthors,
    categories,
    categoriesByCount,
    categoryCount,
    categoryLetters,
  };
}
