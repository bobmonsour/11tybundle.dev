// Create json files for the listed set of categories
// Files are created in the /api folder off the root of the site
// The file name is the category name in kebab case
import _ from "lodash";
class CategoryJsonFiles {
  data() {
    return {
      pagination: {
        data: "categories",
        size: 1,
      },
      // These are the categories that generate json files in the api directory
      // For example, "CMS" in this list causes the file cms.json to be created
      categories: [
        "CMS",
        "Collections",
        "Data Cascade",
        "Dates",
        "Deployment",
        "Drafts",
        "Filters",
        "Front Matter",
        "Getting Started",
        "Global Data",
        "Images",
        "Pagination",
        "Permalinks",
        "RSS",
        "Shortcodes",
        "WebC",
      ],
      // Construct the permalink for the json file of the category
      permalink: (data) => `/api/${_.kebabCase(data.pagination.items[0])}.json`,
      eleventyExcludeFromCollections: true,
    };
  }

  render(data) {
    // Filter the firehose posts for the paginated category
    // "Categories" is the key in the json file for the array
    // of categories for the post
    function isCategory(item) {
      return item["Categories"].includes(data.pagination.items[0]);
    }
    // The source data comes from the bundledata.js file that
    // returns the firehose, a json array of all the posts on
    // the site
    const sortedPosts = data.bundledata.firehose
      .filter(isCategory)
      .sort((a, b) => {
        return a.Date > b.Date ? -1 : 1;
      });
    // Return the json string of the posts in this category
    return JSON.stringify(sortedPosts, null, 2);
  }
}

export default CategoryJsonFiles;
