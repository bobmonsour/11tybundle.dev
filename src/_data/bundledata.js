// get all the records (JSON exported from a Google Sheet) and return
// various subsets and filtered extracts of the data for use in the
// site's templates
const fetchSheetData = require("./allrecords");

module.exports = async function () {
  const bundleRecords = await fetchSheetData();

  // generate the firehose, an array of all posts in descending date order
  const firehose = bundleRecords
    .filter((item) => item["Type"] == "blog post")
    .sort((a, b) => {
      return a.Date > b.Date ? -1 : 1;
    });

  // generate the list of starter projects, an array descending date order
  const starters = bundleRecords
    .filter((item) => item["Type"] == "starter")
    .sort((a, b) => {
      return a.Date > b.Date ? -1 : 1;
    });

  // generate a 2-dimensional array of author names and
  // a count of each of their posts; records comes from
  // the firehose array, which are all blog posts
  // the sortField is the field to sort by:
  //   name in column 0
  //   count in column 1
  const authorList = (records, sortField) => {
    function authorSort(a, b) {
      if (sortField == "name") {
        return a[0].localeCompare(b[0]);
      } else {
        return a[1] < b[1] ? 1 : -1;
      }
    }
    const authorMap = new Map();
    for (let item of records) {
      const postCount = authorMap.get(item.Author) || 0;
      authorMap.set(item.Author, postCount + 1);
    }
    return Array.from(authorMap).sort(authorSort);
  };

  // generate a 2-dimensional array of categories and the
  // count of posts in each category; ; records comes from
  // the firehose array, which are all blog posts
  const categoryList = (records) => {
    let categoryMap = new Map();
    for (let item of records) {
      item.Categories.forEach((category) => {
        const postCount = categoryMap.get(category) || 0;
        categoryMap.set(category, postCount + 1);
      });
    }
    return Array.from(categoryMap).sort((a, b) => {
      return a[0] > b[0] ? 1 : -1;
    });
  };

  // generate counts of posts, starters, authors, and categories
  const postCount = firehose.length;

  const starterCount = starters.length;

  // list of authors and count of their blog posts
  // and the total author count; firehose contains all blog posts
  // 2nd param of authorList is the field to sort by
  const authors = authorList(firehose, "name");
  const authorsByCount = authorList(firehose, "count");
  const authorCount = authors.length;

  // list of categories and count of blog posts with the category
  // and the total category count; firehose contains all blog posts
  const categories = categoryList(firehose);
  const categoryCount = categories.length;

  // get the count of the number of posts in the Getting Started category
  let cat = "Getting Started";
  let row = categories.find((row) => row[0] === cat);
  if (row) {
    gettingStartedCount = row[1];
  } else {
    gettingStartedCount = "more than 40";
  }
  // log the counts of various items
  console.log("postCount: " + postCount);
  console.log("starterCount: " + starterCount);
  console.log("authorCount: " + authorCount);
  console.log("categoryCount: " + categoryCount);

  // verify that all blog posts have:
  //  - an author, a date, and one or more categories
  for (let item of bundleRecords) {
    if (item["Type"] == "blog post") {
      if (!item["Author"]) console.log(item["Title"] + " is missing an author");
      if (!item["Date"]) console.log(item["Title"] + " is missing a date");
      if (!item["Categories"])
        console.log(item["Title"] + " is missing categories");
    }
  }

  // return the full set of records and the counts for use
  // on various pages of the site
  return {
    bundleRecords: bundleRecords,
    firehose: firehose,
    postCount: postCount,
    starters: starters,
    starterCount: starterCount,
    authors: authors,
    authorsByCount: authorsByCount,
    authorCount: authorCount,
    categories: categories,
    categoryCount: categoryCount,
    gettingStartedCount: gettingStartedCount,
  };
};
