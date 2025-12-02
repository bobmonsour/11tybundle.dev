// Given an author, get all blog posts written by that author
// from the bundle data.
let sliceCount = 0;
export const postsByAuthor = (bundleitems, author, count) => {
  if (count == 0) {
    sliceCount = 100000;
  } else {
    sliceCount = count;
  }
  return bundleitems
    .filter((item) => item.Type === "blog post" && item.Author === author)
    .sort((a, b) => {
      return a.Date > b.Date ? -1 : 1;
    })
    .slice(0, sliceCount);
};

// Given an author, get the number of blog posts written by that author
// from the authors array.
export const postCountByAuthor = (authors, author) => {
  return authors.filter((item) => item.Author === author).count;
};
