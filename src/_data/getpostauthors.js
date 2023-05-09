// _data/getpostauthors.js

require("dotenv").config();

var Airtable = require("airtable");
var base = new Airtable({ apiKey: process.env.AIRTABLE_PAT }).base(
  process.env.AIRTABLE_BASE_ID
);

module.exports = function () {
  return new Promise((resolve, reject) => {
    console.log("running getpostauthors.js");
    const bundlePostAuthors = [];

    base(process.env.AIRTABLE_TABLE_NAME)
      .select({ fields: ["Author"] })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach((record) => {
            bundlePostAuthors.push({
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
            resolve(bundlePostAuthors);
          }
        }
      );
  });
};
