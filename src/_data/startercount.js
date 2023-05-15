// Return the number of blog posts in the Airtable data
const airtableitems = require("./airtableitems.js");

module.exports = async function () {
  try {
    tabledata = await airtableitems();
  } catch (err) {
    console.log(err);
  }
  // return tabledata.length;
  const count = tabledata.filter((item) => item["Type"] == "starter").length;
  console.log("startercount.js: " + count);
  return count;
};
