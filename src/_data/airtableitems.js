// _data/airtableitems.js - get all the airtable records
const Airtable = require("airtable");
const { AssetCache } = require("@11ty/eleventy-fetch");

// const airtableitems = async function () {
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
  let tabledata = [];

  // setup the cache asset
  const asset = new AssetCache("bundle_items");

  // check if the cache is fresh within the last day
  if (asset.isCacheValid("1d")) {
    // return the cached data
    console.log("Retrieved data from cache");
    tabledata = await asset.getCachedValue();
    // return tabledata;
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
      tabledata = airtableData;
      // return tabledata;
    } catch (err) {
      console.log(err);
      console.log("Retrieved data from cache");
      tabledata = await asset.getCachedValue();
      // return tabledata;
    }
  }
  const postcount = tabledata.filter(
    (item) => item["Type"] == "blog post"
  ).length;
  const categorycount = getCategories(tabledata).length;
  const authorcount = getAuthors(tabledata).length;
  const startercount = tabledata.filter(
    (item) => item["Type"] == "starter"
  ).length;

  console.log("postcount: " + postcount);
  console.log("categorycount: " + categorycount);
  console.log("authorcount: " + authorcount);
  console.log("startercount: " + startercount);

  return {
    tabledata: tabledata,
    postcount: postcount,
    categorycount: categorycount,
    authorcount: authorcount,
    startercount: startercount,
  };
};
