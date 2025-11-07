// All the records stored in bundledb.json are processed, returning
// various subsets and filtered extracts of the data for use in the
// site's templates
// import bundleRecords from './bundledb.json' with { type: 'json' };

// Changing from a local file to a remote db stored in a separate repo
import Fetch from "@11ty/eleventy-fetch";

// for access to starter data from their GitHub repos
import { Octokit } from "@octokit/rest";
import { Buffer } from "buffer";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN, // personal access token
});

const BUNDLEDB_URL =
  "https://raw.githubusercontent.com/bobmonsour/11tybundledb/main/bundledb.json";

export default async function () {
  // Fetch the json db from its remote repo
  const bundleRecords = await Fetch(BUNDLEDB_URL, {
    duration: "0s", // always fetch new data
    type: "json",
  });

  // generate the firehose, an array of all posts in descending date order
  const firehose = bundleRecords
    .filter((item) => item["Type"] == "blog post")
    .sort((a, b) => {
      return new Date(b.Date) - new Date(a.Date);
    });

  // generate a list of releases, an array of all releases in descending date order
  const releaseList = bundleRecords
    .filter((item) => item["Type"] == "release")
    .sort((a, b) => {
      return new Date(b.Date) - new Date(a.Date);
    });

  // generate a list of sites, an array of all sites in descending date order
  const siteList = bundleRecords
    .filter((item) => item["Type"] == "site")
    .sort((a, b) => {
      return new Date(b.Date) - new Date(a.Date);
    });
  const siteCount = siteList.length;

  // generate the list of starter projects, ordered by date of most recent update

  // Function to fetch metadata and update starters array
  async function updateStartersWithMetadata(starters) {
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
  }
  const genStarters = async (bundleRecords) => {
    function extractStarters(bundleRecords) {
      return bundleRecords.filter((item) => item["Type"] == "starter");
    }
    const starters = extractStarters(bundleRecords);
    await updateStartersWithMetadata(starters);

    // Sort starters by the date of the last commit in descending order
    return starters.sort(
      (a, b) => new Date(b.LastUpdated) - new Date(a.LastUpdated)
    );
  };
  // generate a 2-dimensional array of author names and
  // a count of each of their posts; records comes from
  // the firehose array, which are all blog posts
  // the sortField is the field to sort by:
  //	 author name in column 0
  //	 count in column 1
  const authorList = (records, sortField) => {
    function authorSort(a, b) {
      if (sortField == "name") {
        return a[0].localeCompare(b[0]);
      } else {
        return a[1] < b[1] ? 1 : -1;
      }
    }
    const authorMap = new Map();
    for (let item of records) {
      const postCount = authorMap.get(item.Author) || 0;
      authorMap.set(item.Author, postCount + 1);
    }
    return Array.from(authorMap).sort(authorSort);
  };

  // generate a 2-dimensional array of categories and the
  // count of posts in each category; ; records comes from
  // the firehose array, which are all blog posts
  // the sortField is the field to sort by:
  //	 category name in column 0
  //	 count in column 1

  const categoryList = (records, sortField) => {
    function categorySort(a, b) {
      if (sortField == "category") {
        return a[0].localeCompare(b[0]);
      } else {
        return a[1] < b[1] ? 1 : -1;
      }
    }
    let categoryMap = new Map();
    for (let item of records) {
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

  // generate counts of posts, starters, authors, and categories
  const postCount = firehose.length;

  // generate the set of starter projects and the count of them
  const starters = await genStarters(bundleRecords);
  const startersByStars = starters.slice().sort((a, b) => b.Stars - a.Stars);
  const starterCount = starters.length;

  // list of authors and count of their blog posts
  // and the total author count; firehose contains all blog posts
  // 2nd param of authorList is the field to sort by
  const authors = authorList(firehose, "name");
  const authorsByCount = authorList(firehose, "count");
  const authorCount = authors.length;

  // list of categories and count of blog posts with the category
  // and the total category count; firehose contains all blog posts
  // 2nd param of categoryList is the field to sort by
  const categories = categoryList(firehose, "category");
  const categoriesByCount = categoryList(firehose, "count");
  const categoryCount = categories.length;

  // Log the count of categories for each unique first letter
  // const firstLetterCounts = new Map();
  // categories.forEach((category) => {
  //   const firstLetter = category[2]; // Third column contains the first letter
  //   const count = firstLetterCounts.get(firstLetter) || 0;
  //   firstLetterCounts.set(firstLetter, count + 1);
  // });

  // console.log("Categories by first letter:");
  // Array.from(firstLetterCounts)
  //   .sort((a, b) => a[0].localeCompare(b[0])) // Sort alphabetically by letter
  //   .forEach(([letter, count]) => {
  //     console.log(`${letter}: ${count} categories`);
  //   });

  // get the count of the number of posts in the Getting Started category
  let cat = "Getting Started";
  let gettingStartedCount = 0;
  let row = categories.find((row) => row[0] === cat);
  if (row) {
    gettingStartedCount = row[1];
  } else {
    gettingStartedCount = "more than 40";
  }
  // log the counts of various items
  console.log("postCount: " + postCount);
  console.log("starterCount: " + starterCount);
  console.log("siteCount: " + siteCount);
  console.log("authorCount: " + authorCount);
  console.log("categoryCount: " + categoryCount);

  // verify that all blog posts have:
  //	- an author, a date, and one or more categories
  for (let item of bundleRecords) {
    if (item["Type"] == "blog post") {
      if (!item["Author"]) console.log(item["Title"] + " is missing an author");
      if (!item["Date"]) console.log(item["Title"] + " is missing a date");
      if (!item["Categories"])
        console.log(item["Title"] + " is missing categories");
    }
  }

  // return the full set of records and the counts for use
  // on various pages of the site
  return {
    bundleRecords,
    firehose,
    postCount,
    releaseList,
    siteList,
    siteCount,
    starters,
    startersByStars,
    starterCount,
    authors,
    authorsByCount,
    authorCount,
    categories,
    categoriesByCount,
    categoryCount,
    gettingStartedCount,
  };
}
