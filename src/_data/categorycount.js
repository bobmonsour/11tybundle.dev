// Return the number of unique categories across all the blog posts
// in the Airtable data
const airtableitems = require("./airtableitems.js");

module.exports = async function () {
  try {
    tabledata = await airtableitems();
  } catch (err) {
    console.log(err);
  }
  const getCategories = function (data) {
    // create a unique set of categories from the data, sorted alphabetically
    let categorySet = new Set();
    for (let item of data) {
      (item.Categories || []).forEach((category) => categorySet.add(category));
    }
    return Array.from(categorySet);
  };
  console.log("categorycount.js: " + getCategories(tabledata).length);
  const count = getCategories(tabledata).length;
  return count;
};
