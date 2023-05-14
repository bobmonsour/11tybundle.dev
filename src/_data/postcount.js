// Return the number of blog posts in the Airtable data
const airtableitems = require("./airtableitems.js");

module.exports = async function () {
  try {
    tabledata = await airtableitems();
  } catch (err) {
    console.log(err);
  }
  // return tabledata.length;
  return tabledata.filter((item) => item["Type"] == "blog post").length;
};
