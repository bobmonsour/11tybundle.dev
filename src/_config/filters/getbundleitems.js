// Extract items from the database based on the type of item
// and the Issue number of the 11ty Bundle blog post.
// Items are returned in descending date order.
// The accepted values for Type are:
//   "release", "blog post", "site"
export const getBundleItems = (bundleitems, bundleIssue, bundleType) => {
  return bundleitems
    .filter(
      (item) => item["Type"] == bundleType && item["Issue"] == bundleIssue
    )
    .sort((a, b) => {
      return a.Date > b.Date ? -1 : 1;
    });
};
