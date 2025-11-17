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
