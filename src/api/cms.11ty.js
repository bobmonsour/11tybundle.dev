// Output only those records from 11bundle.dev that are blog posts
// with the category "CMS"
const sourceData = require("../_data/allrecords.json");

module.exports.data = function() {
  return {
    permalink: "/api/cms.json"
  }
}
module.exports.render = function(data) {
  const bundlePosts = sourceData;
  function isCategoryCMS(item) {
    return item["Type"] == "blog post" && item["Categories"].includes("CMS");
  }
  return JSON.stringify(bundlePosts.filter(isCategoryCMS), null, 2)
};