// Given a category, get the unique years for all of the
// blog posts with that category; return an array in descending
// order.
export const postYearsInAuthor = (bundleItems, author) => {
  const postsInAuthor = bundleItems.filter(
    (item) => item.Type === "blog post" && item.Author === author
  );

  const years = postsInAuthor.map((item) => {
    const year = new Date(item.Date).getFullYear();
    return year;
  });

  const uniqueYears = [...new Set(years)];

  return uniqueYears.sort((a, b) => b - a); // Descending order
};
