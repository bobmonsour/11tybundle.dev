// _data/bundledata.js - get all the airtable records
const Airtable = require("airtable");
const { AssetCache } = require("@11ty/eleventy-fetch");

module.exports = async function () {
  // define functions to extract categories and authors from the data
  const getCategories = function (data) {
    // create a unique set of categories from the data
    let categorySet = new Set();
    for (let item of data) {
      (item.Categories || []).forEach((category) => categorySet.add(category));
    }
    return Array.from(categorySet);
  };

  const getAuthors = function (data) {
    // create a unique set of authors from the data
    let authorSet = new Set();
    for (let item of data) {
      if (item.Type == "blog post" && item.Author) authorSet.add(item.Author);
    }
    return Array.from(authorSet);
  };

  // connect to the airtable base
  var base = new Airtable({ apiKey: process.env.AIRTABLE_PAT }).base(
    process.env.AIRTABLE_BASE_ID
  );

  // create a place to store the Airtable records
  const airtableData = [];
  let bundleRecords = [];

  // setup the cache asset
  const asset = new AssetCache("bundle_records");

  // check if the cache is fresh within the last day
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
  // generate counts of posts, categories, authors, and starters
  // from the records in the Airtable database
  const postCount = bundleRecords.filter(
    (item) => item["Type"] == "blog post"
  ).length;
  const categoryCount = getCategories(bundleRecords).length;
  const authorCount = getAuthors(bundleRecords).length;
  const starterCount = bundleRecords.filter(
    (item) => item["Type"] == "starter"
  ).length;

  console.log("postCount: " + postCount);
  console.log("categoryCount: " + categoryCount);
  console.log("authorCount: " + authorCount);
  console.log("starterCount: " + starterCount);

  // return the full set of records and the counts for use
  // on various pages of the site
  return {
    bundleRecords: bundleRecords,
    postCount: postCount,
    categoryCount: categoryCount,
    authorCount: authorCount,
    starterCount: starterCount,
  };
};
