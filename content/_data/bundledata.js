// ********************
// All the records stored in bundledb.json are processed, returning
// various subsets and filtered extracts of the data for use in the
// site's templates
// ********************

import Fetch from "@11ty/eleventy-fetch";
import { AssetCache } from "@11ty/eleventy-fetch";
import { filters } from "../_config/filters/index.js";
import slugifyPackage  from "slugify";

// **************
// A TEST SET OF DATA CAN BE LOADED FROM A LOCAL FILE
// FOR FASTER LOCAL BUILDING
// IF THIS "import" is uncommented, COMMENT OUT THE REMOTE
// FETCHING CODE BELOW
// **************
import bundleRecords from './bundledbtest.json' with { type: 'json' };

// for access to starter data from their GitHub repos
import { Octokit } from "@octokit/rest";
import { Buffer } from "buffer";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN, // personal access token
});
import { cacheDuration } from "./cacheconfig.js";

// main function to generate and return the bundle data
export default async function () {

  // **************
  // THE FULL DATASET CAN BE LOADED FROM THE *** REMOTE *** REPO
  // IF THE "const BUNDLEDB_URL" is uncommented, COMMENT OUT THE LOCAL
  // IMPORT ABOVE
  // **************
  // const BUNDLEDB_URL =
  //   "https://raw.githubusercontent.com/bobmonsour/11tybundledb/main/bundledb.json";
  // // Fetch the json db from its remote repo
  // const bundleRecords = await Fetch(BUNDLEDB_URL, {
  //   duration: "0s",
  //   type: "json",
  //   fetchOptions: {
  //     signal: AbortSignal.timeout(3000),
  //   },
  // });
  // **************

  console.log(`Fetched bundleRecords: ${bundleRecords.length} records`);


  // **************
  // firehose is an array of all blog posts in descending date order
  // **************
  // verify the presence of required fields for each blog post
  const requiredFields = ['Title', 'Author', 'Date', 'Link', 'Categories'];
  for (let item of bundleRecords) {
    if (item["Type"] === "blog post" && !item["Skip"]) {
      const missingFields = [];

      // Check each required field
      requiredFields.forEach(field => {
        if (!item[field]) {
          missingFields.push(field);
        }
      });

      // Log error if any fields are missing
      if (missingFields.length > 0) {
        const titleDisplay = item["Title"] || "[No Title]";
        console.error(
          `Error: Blog post "${titleDisplay}" is missing required fields: ${missingFields.join(', ')}`
        );
      }
    }
  };

  // helper function to check if a link is a Youtube link
  const isYoutubeLink = (link) => {
  const origin = filters.getOrigin(link);
  return origin === "https://www.youtube.com" || origin === "https://youtube.com";
  };

  // Pre-compute YouTube status and create rawFirehose
  const rawFirehose = bundleRecords
    .filter((item) => item["Type"] === "blog post" && !item["Skip"])
    .map(item => ({
      ...item,
      isYoutube: isYoutubeLink(item.Link), // Pre-compute YouTube status
    }))
    .sort((a, b) => new Date(b.Date) - new Date(a.Date));

  // enrich each post in the firehose with:
  //  - the slugified title
  //  - the slugified author name
  //  - post description
  //  - formatted date
  //  - author's favicon gets added later, after authors array is built
  const enrichFirehose = async (rawFirehoseData, appliedFilters) => {
    return Promise.all(
      rawFirehoseData.map(async (post) => {
        return {
          ...post,
          slugifiedTitle: slugifyPackage(post.Title, { lower: true, strict: true }),
          slugifiedAuthor: slugifyPackage(post.Author, { lower: true, strict: true }),
          description: await appliedFilters.getDescription(post.Link),
          formattedDate: await appliedFilters.formatItemDate(post.Date),
          // isYoutube is already on the post object from rawFirehose
        };
      })
    );
  };

  const firehose = await enrichFirehose(rawFirehose, filters);
  const postCount = firehose.length;

  // **************
  // generate a list of releases, an array of all releases
  //  in descending date order
  // **************
  const rawReleaseList = bundleRecords
    .filter((item) => item["Type"] === "release")
    .sort((a, b) => {
      return new Date(b.Date) - new Date(a.Date);
    });
  const enrichReleaseList = async (rawReleaseListData, appliedFilters) => {
    return Promise.all(
      rawReleaseListData.map(async (release) => {
        return {
          ...release,
          formattedDate: await appliedFilters.formatItemDate(release.Date),
        };
      })
    );
  };
  const releaseList = await enrichReleaseList(rawReleaseList, filters);
  const releaseCount = releaseList.length;

  // **************
  // generate a list of sites, an array of all sites in
  // descending date order
  // **************
  const rawSiteList = bundleRecords
    .filter((item) => item["Type"] === "site" && !item["Skip"])
    .sort((a, b) => {
      return new Date(b.Date) - new Date(a.Date);
    });

  const enrichSiteList = async (rawSiteListData, appliedFilters) => {
    return Promise.all(
      rawSiteListData.map(async (site) => {
        return {
          ...site,
          description: await appliedFilters.getDescription(site.Link),
          favicon: await appliedFilters.getFavicon(site.Link),
          formattedDate: await appliedFilters.formatItemDate(site.Date),
          socialLinks: await appliedFilters.getSocialLinks(site.Link),
        };
      })
    );
  };

  const siteList = await enrichSiteList(rawSiteList, filters);
  const siteCount = siteList.length;

  // **************
  // generate two lists of starter projects, one ordered by date of
  // most recent update and the second by number of GitHub stars
  // **************
  const rawStarters = bundleRecords.filter((item) => item["Type"] === "starter");

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

    // Process all starters concurrently instead of sequentially
    const enrichedStarters = await Promise.all(
      starters.map(async (starter) => {
        if (!starter.Link) return starter;

        try {
          // Extract owner and repo name from the full GitHub repo URL
          const urlParts = starter.Link.split("/");
          const owner = urlParts[urlParts.length - 2];
          const repo = urlParts[urlParts.length - 1];

          // Fetch all data concurrently for this starter
          const [repoData, commitsData, packageJsonData] = await Promise.all([
            octokit.repos.get({ owner, repo }),
            octokit.repos.listCommits({ owner, repo, per_page: 1 }),
            octokit.repos.getContent({ owner, repo, path: "package.json" })
              .catch(() => null), // Handle missing package.json gracefully
          ]);

          const lastCommitDate = commitsData.data[0].commit.committer.date;
          const date = new Date(lastCommitDate);
          const options = { year: "numeric", month: "long", day: "numeric" };
          const formattedDate = date.toLocaleDateString("en-US", options);

          // Extract 11ty version
          let version = null;
          if (packageJsonData) {
            const content = Buffer.from(packageJsonData.data.content, "base64").toString("utf-8");
            const regex = /"@11ty\/eleventy":\s*"\^?([^"]+)"/;
            const match = content.match(regex);
            if (match) {
              version = match[1];
            }
          }

          // Return enriched starter object
          return {
            ...starter,
            Stars: repoData.data.stargazers_count,
            Date: date.toISOString().split('T')[0],
            LastUpdated: formattedDate,
            Description: repoData.data.description,
            Version: version,
          };
        } catch (error) {
          console.error(`Failed to fetch metadata for ${starter.Link}:`, error);
          return starter; // Return original starter if enrichment fails
        }
      })
    );

    // Cache the results for future requests
    await cache.save(enrichedStarters, "json");
    return enrichedStarters;
  };

  let starters = await enrichStarters(rawStarters);
    starters = starters.sort(
      (a, b) => new Date(b.LastUpdated) - new Date(a.LastUpdated)
    );
  const startersByStars = starters.slice().sort((a, b) => b.Stars - a.Stars);
  const starterCount = starters.length;

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
        // Handle undefined values safely
        const nameA = a.firstLetter || "";
        const nameB = b.firstLetter || "";
        return nameA.localeCompare(nameB); // Sort by first letter of last name/word
      } else {
        return b.count - a.count; // Sort by count descending
      }
    }

    const getFirstLetterOfLastWord = (str) => {
      const words = str.trim().split(' ');
      const lastWord = words[words.length - 1];
      return lastWord.charAt(0).toUpperCase();
    };

    const authorMap = new Map();
    for (let item of posts) {
      // Skip items with missing author names
      if (!item.Author) continue;
      if (item.Skip) continue;

      const existing = authorMap.get(item.Author);
      const origin = filters.getOrigin(item.Link);
      // console.log(`Processing author: ${item.Author}, origin: ${origin}`);
      const isYoutube = item.isYoutube; // Use pre-computed YouTube status

      if (existing) {
        // Author exists, increment count
        existing.count += 1;

        // If we don't have origin data yet (was Youtube before), capture it now
        if (!existing.origin && !isYoutube) {
          existing.origin = origin;
          existing.description = await filters.getDescription(origin);
          existing.favicon = await filters.getFavicon(item.Link);
          existing.rssLink = await filters.getRSSLink(origin);
          existing.socialLinks = await filters.getSocialLinks(item.Link);
          existing.nonYoutubePostLink = item.Link;
        }
      } else {
        // New author - create entry
        authorMap.set(item.Author, {
          name: item.Author,
          slugifiedName: slugifyPackage(item.Author, { lower: true, strict: true }),
          firstLetter: getFirstLetterOfLastWord(item.Author),
          count: 1,
          origin: isYoutube ? null : origin,
          description: isYoutube ? null : await filters.getDescription(origin),
          favicon: isYoutube ? null : await filters.getFavicon(item.Link),
          rssLink: isYoutube ? null : await filters.getRSSLink(origin),
          socialLinks: isYoutube ? null : await filters.getSocialLinks(item.Link),
          nonYoutubePostLink: isYoutube ? null : item.Link,
        });
      }
    }

    // Convert map to array of objects
    const authorArray = await Promise.all(
      Array.from(authorMap).map(async ( [name, data]) => ({
        name,
        slugifiedName: data.slugifiedName,
        firstLetter: data.firstLetter,
        count: data.count,
        origin: data.origin,
        description: data.description,
        favicon: data.favicon,
        rssLink: data.rssLink,
        socialLinks: data.socialLinks,
        nonYoutubePostLink: data.nonYoutubePostLink,
      }))
    );

    return authorArray.sort(authorSort);
  };

  // **************
  // generate two arrays from the authors:
  //   - one sorted by name
  //   - one sorted by post count
  // total author count; firehose contains all blog posts
  // 2nd param of authorList is the field to sort by, name or count
  // also generate an array of first letters of author last names
  // **************
  const authors = await authorList(firehose, "name");
  const authorsByCount = await authorList(firehose, "count");
  const authorCount = authors.length;
  const authorLetters = [...new Set(authors.map(author => author.firstLetter))]

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
    if (post.isYoutube) continue;

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
  const authorsByName = new Map(authorsData.map(author => [author.name, author]));

  return selectedPosts
    .map(post => authorsByName.get(post.Author))
    .filter(author => author !== undefined);
};

  const recentAuthors = getRecentAuthors(firehose, authors);

  // **************
  // Now that the firehose and author arrays are built, we
  // need to add the author's favicon to each post in the
  // firehose. This takes care of the issue of Youtube links
  // not having favicons.
  // **************
// Create Map once before the loop
const authorsByName = new Map(authors.map(author => [author.name, author]));

for (let post of firehose) {
  const authorRecord = authorsByName.get(post.Author);  // O(1) lookup
  if (authorRecord && authorRecord.favicon) {
    post.favicon = authorRecord.favicon;
  }
}

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
          slugifiedCategory: slugifyPackage(category, { lower: true, strict: true }),
          count: 1,
          firstLetter: category.charAt(0),
        });
      }
    };
  }
  return Array.from(categoryMap)
    .map(([name, data]) => ({
      name: name,
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
  const categoryLetters = [...new Set(categories.map(category => category.firstLetter))]
    .sort((a, b) => a.localeCompare(b));

  // **************
  // log the counts of various items
  console.log("postCount: " + postCount);
  console.log("siteCount: " + siteCount);
  console.log("releaseCount: " + releaseCount);
  console.log("starterCount: " + starterCount);
  console.log("authorCount: " + authorCount);
  console.log("categoryCount: " + categoryCount);

  // **************
  // return the full set of records and the counts for use
  // on various pages of the site
  return {
    bundleRecords,
    firehose,
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
