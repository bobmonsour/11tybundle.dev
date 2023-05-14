// _data/airtableitems.js - get all the airtable records
const Airtable = require("airtable");
const { AssetCache } = require("@11ty/eleventy-fetch");

const airtableitems = async function () {
  // module.exports = async function () {
  console.log("Getting Airtable items: from Airtable or cache");

  // connect to the airtable base
  var base = new Airtable({ apiKey: process.env.AIRTABLE_PAT }).base(
    process.env.AIRTABLE_BASE_ID
  );

  // create a place to store the Airtable records
  const airtableData = [];

  // setup the cache asset
  const asset = new AssetCache("bundle_items");

  // check if the cache is fresh within the last day
  if (asset.isCacheValid("1d")) {
    // return the cached data
    console.log("Returning data from cache");
    return asset.getCachedValue();
  }

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
    console.log("Retrieved data from Airtable, saving data to cache");
    await asset.save(airtableData, "json");
    return airtableData;
  } catch (err) {
    console.log(err);
    console.log("Returning data from cache");
    return asset.getCachedValue();
  }
};

module.exports = airtableitems;
