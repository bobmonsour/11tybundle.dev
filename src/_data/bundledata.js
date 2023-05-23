// _data/bundledata.js
//
// get all the Airtable records and return various subsets and
// filtered extracts of the data for use in the site's templates
const Airtable = require("airtable");
const { AssetCache } = require("@11ty/eleventy-fetch");

module.exports = async function () {
  // connect to the Airtable base
  var base = new Airtable({ apiKey: process.env.AIRTABLE_PAT }).base(
    process.env.AIRTABLE_BASE_ID
  );

  // create a place to store the Airtable records
  const airtableData = [];
  let bundleRecords = [];

  // setup the cache asset
  const asset = new AssetCache("bundle_records");

  // check if the cache is fresh within the last day ("1d")
  // use a cache duration of "0s" to force retrieval from Airtable
  if (asset.isCacheValid("1d")) {
    // return the cached data
    console.log("Retrieved data from cache");
    bundleRecords = await asset.getCachedValue();
  } else {
    try {
      await base(process.env.AIRTABLE_TABLE_NAME)
        .select({ view: process.env.AIRTABLE_VIEW })
        .eachPage(function page(records, fetchNextPage) {
          records.forEach((record) => {
            airtableData.push({
              id: record._rawJson.id,
              ...record._rawJson.fields,
            });
          });
          fetchNextPage();
        });
      console.log("Retrieved data via Airtable API, saving data to cache");
      await asset.save(airtableData, "json");
      bundleRecords = airtableData;
    } catch (err) {
      console.log(err);
      console.log("Retrieved data from cache");
      bundleRecords = await asset.getCachedValue();
    }
  }

  // generate the firehose, an array of all posts in descending date order
  const firehose = bundleRecords
    .filter((item) => item["Type"] == "blog post")
    .sort((a, b) => {
      return a.Date > b.Date ? -1 : 1;
    });

  // generate the list of starter projects, an array descending date order
  const starters = bundleRecords
    .filter((item) => item["Type"] == "starter")
    .sort((a, b) => {
      return a.Date > b.Date ? -1 : 1;
    });

  // generate a 2-dimensional array of author names and
  // a count of each of their posts; records comes from
  // the firehose array, which are all blog posts
  const authorList = (records) => {
    const authorMap = new Map();
    for (let item of records) {
      const postCount = authorMap.get(item.Author) || 0;
      authorMap.set(item.Author, postCount + 1);
    }
    return Array.from(authorMap).sort((a, b) => {
      return a[0].localeCompare(b[0]);
    });
  };

  // generate a 2-dimensional array of categories and the
  // count of posts in each category; ; records comes from
  // the firehose array, which are all blog posts
  const categoryList = (records) => {
    let categoryMap = new Map();
    for (let item of records) {
      item.Categories.forEach((category) => {
        const postCount = categoryMap.get(category) || 0;
        categoryMap.set(category, postCount + 1);
      });
    }
    return Array.from(categoryMap).sort((a, b) => {
      return a[0] > b[0] ? 1 : -1;
    });
  };

  // generate counts of posts, starters, authors, and categories
  const postCount = firehose.length;

  const starterCount = starters.length;

  // list of authors and count of their blog posts
  // and the total author count; firehose contains all blog posts
  const authors = authorList(firehose);
  const authorCount = authors.length;

  // list of categories and count of blog posts with the category
  // and the total category count; firehose contains all blog posts
  const categories = categoryList(firehose);
  const categoryCount = categories.length;

  // log the counts of various items
  console.log("postCount: " + postCount);
  console.log("starterCount: " + starterCount);
  console.log("authorCount: " + authorCount);
  console.log("categoryCount: " + categoryCount);

  // verify that all blog posts have:
  //  - an author, a date, and one or more categories
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
    bundleRecords: bundleRecords,
    firehose: firehose,
    postCount: postCount,
    starters: starters,
    starterCount: starterCount,
    authors: authors,
    authorCount: authorCount,
    categories: categories,
    categoryCount: categoryCount,
  };
};
