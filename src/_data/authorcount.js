// Return the number of unique authors across all the blog posts
// in the Airtable data
const airtableitems = require("./airtableitems.js");

module.exports = async function () {
  try {
    tabledata = await airtableitems();
  } catch (err) {
    console.log(err);
  }
  const getAuthors = function (data) {
    // create a unique set of authors from the data, sorted alphabetically
    let authorSet = new Set();
    for (let item of data) {
      if (item.Type == "blog post" && item.Author) authorSet.add(item.Author);
    }
    return Array.from(authorSet).sort((a, b) => {
      return a > b ? 1 : -1;
    });
  };
  console.log("authorcount.js: " + getAuthors(tabledata).length);
  return getAuthors(tabledata).length;
};
