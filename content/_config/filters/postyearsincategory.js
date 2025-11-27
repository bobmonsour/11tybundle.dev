// Given a category, get the unique years for all of the
// blog posts with that category; return an array in descending
// order.
export const postYearsInCategory = (bundleItems, category) => {
  const postsInCategory = bundleItems.filter(
    (item) => item.Type === "blog post" && item.Categories.includes(category)
  );

  const years = postsInCategory.map((item) => {
    const year = new Date(item.Date).getFullYear();
    return year;
  });

  const uniqueYears = [...new Set(years)];

  return uniqueYears.sort((a, b) => b - a); // Descending order
};
