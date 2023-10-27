// Output only those records from 11bundle.dev that are blog posts
// with the specified category
const _ = require("lodash");

const thisCategory = "Getting Started";
const sourceData = require("../_data/allrecords.json");

module.exports.data = function () {
  return {
    permalink: "/api/" + _.kebabCase(thisCategory) + ".json",
  };
};
module.exports.render = function (data) {
  const bundlePosts = sourceData;
  function isCategory(item) {
    return (
      item["Type"] == "blog post" && item["Categories"].includes(thisCategory)
    );
  }
  return JSON.stringify(bundlePosts.filter(isCategory), null, 2);
};
