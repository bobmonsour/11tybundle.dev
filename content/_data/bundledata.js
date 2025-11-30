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
// IF THIS "import" is uncommented, COMMENT OUT THE REMOTE FETCHING CODE BELOW
// **************
import bundleRecords from './bundledbtest.json' with { type: 'json' };
// **************


// for access to starter data from their GitHub repos
import { Octokit } from "@octokit/rest";
import { Buffer } from "buffer";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN, // personal access token
});
import { cacheDuration, fetchTimeout } from "./cacheconfig.js";
import { getSocialLinks } from "../_config/filters/getsociallinks.js";

export default async function () {
  // **************
  // THE FULL DATASET CAN BE LOADED FROM THE *** REMOTE *** REPO
  // IF THE "const BUNDLEDB_URL" is uncommented, COMMENT OUT THE LOCAL IMPORT ABOVE

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


  //**************************************************************************/
  // firehose is an array of all blog posts in descending date order
  const rawFirehose = bundleRecords
    .filter((item) => item["Type"] == "blog post" && !item["Skip"])
    .sort((a, b) => {
      return new Date(b.Date) - new Date(a.Date);
    });

  // enrich each post in the firehose with description, favicon, and formatted date
  const enrichFirehose = async (rawFirehoseData, appliedFilters) => {
  return Promise.all(
    rawFirehoseData.map(async (post) => {
      return {
        ...post,
        slugifiedAuthor: slugifyPackage(post.Author, { lower: true, strict: true }),
        description: await appliedFilters.getDescription(post.Link),
        favicon: await appliedFilters.getFavicon(post.Link),
        formattedDate: await appliedFilters.formatItemDate(post.Date),
      };
    })
  );
  };

  const firehose = await enrichFirehose(rawFirehose, filters);
  const postCount = firehose.length;

  //**************************************************************************/
  // generate a list of releases, an array of all releases in descending date order
  const rawReleaseList = bundleRecords
    .filter((item) => item["Type"] == "release")
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

  //**************************************************************************/
  // generate a list of sites, an array of all sites in descending date order
  const rawSiteList = bundleRecords
    .filter((item) => item["Type"] == "site" && !item["Skip"])
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

  //**************************************************************************/
  // generate the list of starter projects, ordered by date of most recent update
  // fetch metadata from the GitHub repo and update starter objects
  async function updateStartersWithMetadata(starters) {
    const cacheKey = `starter-projects`;
    const cache = new AssetCache(cacheKey, ".cache");
    if (cache.isCacheValid(cacheDuration.starters)) {
      const cachedStarters = await cache.getCachedValue();
      if (cachedStarters) {
        console.log(`Using cached starter project metadata`);
        return cachedStarters;
      }
    }
    for (let starter of starters) {
      if (starter.Link) {
        try {
          // Extract owner and repo name from the full GitHub repo URL
          const urlParts = starter.Link.split("/");
          const owner = urlParts[urlParts.length - 2];
          const repo = urlParts[urlParts.length - 1];

          // Fetch repository metadata
          const { data: repoData } = await octokit.repos.get({
            owner,
            repo,
          });

          // Fetch the date of the last commit
          const { data } = await octokit.repos.listCommits({
            owner,
            repo,
            per_page: 1,
          });
          const lastCommitDate = data[0].commit.committer.date;

          // Format the date
          const date = new Date(lastCommitDate);
          const options = { year: "numeric", month: "long", day: "numeric" };
          const formattedDate = date.toLocaleDateString("en-US", options);

          // Get 11ty version from package.json
          let version = null;
          try {
            const { data } = await octokit.repos.getContent({
              owner,
              repo,
              path: "package.json",
            });
            // Decode the base64 encoded content
            const content = Buffer.from(data.content, "base64").toString(
              "utf-8"
            );
            // Define the regular expression
            const regex = /"@11ty\/eleventy":\s*"\^?([^"]+)"/;
            // Extract the version number
            const match = content.match(regex);
            if (match) {
              version = match[1];
              // console.log("11ty version:", version);
            }
          } catch (error) {
            console.error(`Error fetching 11ty version: ${error}`);
          }

          // Add metadata as top-level properties to the starter object
          starter.Stars = repoData.stargazers_count;
          starter.LastUpdated = formattedDate;
          starter.Description = repoData.description;
          starter.Version = version;
          // console.log("stars: ", starter.Stars);
          // console.log("last updated: ", starter.LastUpdated);
          // console.log("description: ", starter.Description);
          // console.log("version: ", starter.Version);
        } catch (error) {
          console.error(`Failed to fetch metadata for ${starter.Link}:`, error);
        }
      }
    }
      // Cache the results for future requests
      await cache.save(starters, "json");
      // console.log(`Cached starter projects`);
      return starters;
  };

  const genStarters = async (bundleRecords) => {
    function extractStarters(bundleRecords) {
      return bundleRecords.filter((item) => item["Type"] == "starter");
    }
    let starters = extractStarters(bundleRecords);
    // console.log(`Extracted starters: ${starters.length} records`);
    starters = await updateStartersWithMetadata(starters);
    // console.log(`Extracted starters: ${starters.length} records`);

    // Sort starters by the date of the last commit in descending order
    return starters.sort(
      (a, b) => new Date(b.LastUpdated) - new Date(a.LastUpdated)
    );
  };

  //**************************************************************************/
  // generate a 2-dimensional array of author names and
  // a count of each of their posts; records comes from
  // the firehose array, which are all blog posts
  // the sortField is the field to sort by:
  //	  author name in element 0
  //	  count in element 1
  const authorList = async (posts, sortField) => {

    // element 2 of each author array is the first letter
    // of the last name/word in the author's name
    function authorSort(a, b) {
      if (sortField === "name") {
        // Handle undefined values safely
        const nameA = a[2] || "";
        const nameB = b[2] || "";
        return nameA.localeCompare(nameB); // Sort by first letter of last name/word
      } else {
        return a[1] < b[1] ? 1 : -1; // Sort by count descending
      }
    }

    const getFirstLetterOfLastWord = (str) => {
      const words = str.trim().split(' ');
      const lastWord = words[words.length - 1];
      return lastWord.charAt(0).toUpperCase();
    };

  const authorMap = new Map();
    for (let item of posts) {
      // Skip items with missing authors
      if (!item.Author) continue;

      const existing = authorMap.get(item.Author);
      const origin = filters.getOrigin(item.Link);
      const isYouTube = origin === "https://youtube.com";

      if (existing) {
        // Author exists, increment count
        existing.count += 1;

        // If we don't have origin data yet (was YouTube before), capture it now
        if (!existing.origin && !isYouTube) {
          existing.origin = origin;
          existing.favicon = await filters.getFavicon(item.Link);
          existing.rssLink = await filters.getRSSLink(item.Link);
          existing.socialLinks = await filters.getSocialLinks(item.Link);
        }
      } else {
        // New author - create entry
        authorMap.set(item.Author, {
          slugifiedName: slugifyPackage(item.Author, { lower: true, strict: true }),
          firstLetter: getFirstLetterOfLastWord(item.Author),
          count: 1,
          origin: isYouTube ? null : origin,
          favicon: isYouTube ? null : await filters.getFavicon(item.Link),
          rssLink: isYouTube ? null : await filters.getRSSLink(origin),
          socialLinks: isYouTube ? null : await filters.getSocialLinks(item.Link),
        });
      }
    }
      // Convert map to array with all properties in specified order
    const authorArray = await Promise.all(
      Array.from(authorMap).map(async ([name, data]) => [
        name,                    // [0] author name
        data.slugifiedName,      // [1] slugified author name
        data.firstLetter,        // [2] first letter of last name/word
        data.count,              // [3] total post count
        data.origin,             // [4] origin (captured from first non-YouTube post)
        data.favicon,            // [5] favicon
        data.rssLink,            // [6] RSS link
        data.socialLinks,        // [7] social links
      ])
    );

    return authorArray.sort(authorSort);
  };

  // generate two arrays from the authors:
  //   - one sorted by name
  //   - one sorted by post count
  // total author count; firehose contains all blog posts
  // 2nd param of authorList is the field to sort by, name or count
  // also generate an array of first letters of author last names
  const authors = await authorList(firehose, "name");
  // console.log("3rd author in array: ", authors[2]);
  const authorsByCount = await authorList(firehose, "count");
  const authorCount = authors.length;
  const authorLetters = [...new Set(authors.map(author => author[2]))]


  // get the most recent 3 posts by unique authors
  // add postCount property to each post
  // TODO: SELECT 3 AUTHORS AT RANDOM FROM THE 3 MOST RECENT POSTS
  //       EACH BUILD SHOULD RESULT IN A DIFFERENT SET OF 3 AUTHORS
  //       currently it just picks the first 3 unique authors
  const recentAuthors = [];
  const seenAuthors = new Set();
  for (const post of firehose) {
    if (!seenAuthors.has(post.Author)) {
      // Count total posts by this author
      const postCount = firehose.filter(
        (item) => item.Author === post.Author
      ).length;

      // Add postCount property to the post object
      post.postCount = postCount;

      recentAuthors.push(post);
      seenAuthors.add(post.Author);
      if (recentAuthors.length === 3) break;
    }
  };

  //**************************************************************************/
  // generate a 2-dimensional array of categories and the
  // count of posts in each category; ; posts comes from
  // the firehose array, which are all blog posts
  // the sortField is the field to sort by:
  //	 category name in column 0
  //	 count in column 1
  // first letter of the category is added as column 2

  const categoryList = (posts, sortField) => {
    function categorySort(a, b) {
      if (sortField == "category") {
        // Handle undefined values safely
        const catA = a[0] || "";
        const catB = b[0] || "";
        return catA.localeCompare(catB);
      } else {
        return a[1] < b[1] ? 1 : -1;
      }
    }
    let categoryMap = new Map();
    for (let item of posts) {
      // Skip items with missing categories
      if (!item.Categories || !Array.isArray(item.Categories)) continue;

      item.Categories.forEach((category) => {
        const existing = categoryMap.get(category);
        const postCount = existing ? existing.count : 0;
        categoryMap.set(category, {
          count: postCount + 1,
          firstLetter: category.charAt(0),
        });
      });
    }
    return Array.from(categoryMap)
      .map(([name, data]) => [name, data.count, data.firstLetter])
      .sort(categorySort);
  };

  // generate two arrays from the categories:
  //   - one sorted by category name
  //   - one sorted by post count
  // total category count; firehose contains all blog posts
  // 2nd param of categoryList is the field to sort by, name or count
  // also generate an array of unique first letters of categories
  const categories = categoryList(firehose, "category");
  const categoriesByCount = categoryList(firehose, "count");
  const categoryCount = categories.length;
  const categoryLetters = [...new Set(categories.map(category => category[2]))]
  .sort((a, b) => a.localeCompare(b[0]));

  // generate the count of posts in the Getting Started category
  let cat = "Getting Started";
  let gettingStartedCount = 0;
  let row = categories.find((row) => row[0] === cat);
  if (row) {
    gettingStartedCount = row[1];
  } else {
    gettingStartedCount = "more than 40";
  };

  //**************************************************************************/
  // generate two arrays from the starter projects
  //   - one sorted by date
  //   - one sorted by GitHub star count
  const starters = await genStarters(bundleRecords);
  const startersByStars = starters.slice().sort((a, b) => b.Stars - a.Stars);
  const starterCount = starters.length;

  //**************************************************************************/
  // log the counts of various items
  console.log("postCount: " + postCount);
  console.log("siteCount: " + siteCount);
  console.log("releaseCount: " + releaseCount);
  console.log("starterCount: " + starterCount);
  console.log("authorCount: " + authorCount);
  console.log("categoryCount: " + categoryCount);

  //**************************************************************************/
  // verify that all blog posts have:
  //	- title, author, date, link, and one or more categories
  for (let item of bundleRecords) {
    if (item["Type"] == "blog post") {
      if (!item["Title"]) console.log(item["Link"] + " is missing a title");
      if (!item["Author"]) console.log(item["Title"] + " is missing an author");
      if (!item["Date"]) console.log(item["Title"] + " is missing a date");
      if (!item["Link"]) console.log(item["Title"] + " is missing a link");
      if (!item["Categories"])
        console.log(item["Title"] + " is missing one or more categories");
    }
  }

  //**************************************************************************/
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
    gettingStartedCount,
  };
}
