// Given an array of posts by an author, return the first post
// that is not a YouTube link. This assumes that all authors have
// at least one non-YouTube post in the array.
export const getNonYoutubePost = (posts) => {
  for (const post of posts) {
    // console.log("Checking post link:", post.Link);
    if (!post.Link.includes("youtube.com")) {
      return post;
    }
  }
  return null; // or return undefined if no non-YouTube post is found
};

// Sometimes, we are listing posts on a category page where
// the most recent post by an author is a YouTube link. In that case,
// we want to find the most recent non-YouTube post by that author
// to display instead. This function takes an array of posts and
// an author name, and returns the most recent non-YouTube post
// by that author.
export const getNonYoutubePostByAuthor = (posts, author) => {
  const sortedPosts = posts.sort((a, b) => {
    return new Date(b.Date) - new Date(a.Date);
  });
  for (const post of sortedPosts)
    if (!post.Link.includes("youtube.com") && post.Author === author) {
      return post;
    }
  return null;
};
