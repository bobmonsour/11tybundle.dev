// _data/airtableitems.js

require("dotenv").config();

var Airtable = require("airtable");
var base = new Airtable({ apiKey: process.env.AIRTABLE }).base(
  "appFlsGzwzaMZDADf"
);

module.exports = function () {
  return new Promise((resolve, reject) => {
    const airtableData = [];

    base("11tyBundleArchive")
      .select({ view: "Database" })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach((record) => {
            airtableData.push({
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
            resolve(airtableData);
          }
        }
      );
  });
};
