// Filter the Airtable data, returning an oject containing:
// - the number of blog posts
// - the number of categories
// - the number of authors
// - the number of starters
const airtableitems = require("./airtableitems.js");

module.exports = async function () {
  try {
    tabledata = await airtableitems();
  } catch (err) {
    console.log(err);
  }

  const getCategories = function (data) {
    // create a unique set of categories from the data
    let categorySet = new Set();
    for (let item of data) {
      (item.Categories || []).forEach((category) => categorySet.add(category));
    }
    return Array.from(categorySet);
  };

  const getAuthors = function (data) {
    // create a unique set of authors from the data
    let authorSet = new Set();
    for (let item of data) {
      if (item.Type == "blog post" && item.Author) authorSet.add(item.Author);
    }
    return Array.from(authorSet);
  };

  const postcount = tabledata.filter(
    (item) => item["Type"] == "blog post"
  ).length;
  const categorycount = getCategories(tabledata).length;
  const authorcount = getAuthors(tabledata).length;
  const startercount = tabledata.filter(
    (item) => item["Type"] == "starter"
  ).length;

  console.log("postcount: " + postcount);
  console.log("categorycount: " + categorycount);
  console.log("authorcount: " + authorcount);
  console.log("startercount: " + startercount);

  return {
    postcount: postcount,
    categorycount: categorycount,
    authorcount: authorcount,
    startercount: startercount,
  };
};
