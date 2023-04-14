// _data/getpostcategories.js

require("dotenv").config();

var Airtable = require("airtable");
var base = new Airtable({ apiKey: process.env.AIRTABLE }).base(
  "appFlsGzwzaMZDADf"
);

module.exports = function () {
  return new Promise((resolve, reject) => {
    const bundlePostCategories = [];

    base("11tyBundleArchive")
      .select({ fields: ["Categories"] })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach((record) => {
            bundlePostCategories.push({
              id: record._rawJson.id,
              ...record._rawJson.fields,
            });
          });
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            reject(err);
          } else {
            resolve(bundlePostCategories);
          }
        }
      );
  });
};
