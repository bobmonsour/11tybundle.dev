// Create json files for the listed set of categories
// Files are created in the /api folder off the root of the site
// The file name is the category name in kebab case
const _ = require("lodash");
class CategoryJsonFiles {
  data() {
    return {
      pagination: {
        data: "categories",
        size: 1,
        alias: "category",
      },
      // These are the categories that generate json files in the api directory
      // For example, "CMS" in this list causes the file cms.json to be created
      categories: ["Getting Started", "CMS", "Front Matter"],
      permalink: (data) => `/api/${_.kebabCase(data.pagination.items[0])}.json`,
      firehose: firehose,
    };
  }

  render(data) {
    // const bundlePosts = firehose;
    function isCategory(item) {
      return (
        item["Type"] == "blog post" &&
        item["Categories"].includes(data.pagination.items[0])
      );
    }
    const sortedPosts = firehose.filter(isCategory).sort((a, b) => {
      return a.Date > b.Date ? -1 : 1;
    });
    return JSON.stringify(sortedPosts, null, 2);
  }
}

module.exports = CategoryJsonFiles;
