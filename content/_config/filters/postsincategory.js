// Given a category, get all blog posts with that category
// from the data.
let sliceCount = 0;
export const postsInCategory = (bundleitems, category, count) => {
  function postInCategory(item) {
    if (count == 0 || count == null) {
      sliceCount = 100000;
    } else {
      sliceCount = count;
    }
    console.log("Slice count:", sliceCount);
    return item.Type == "blog post" && item.Categories.includes(category)
      ? true
      : false;
  }
  return bundleitems
    .filter(postInCategory)
    .sort((a, b) => {
      return a.Date > b.Date ? -1 : 1;
    })
    .slice(0, sliceCount);
};
