import sanitizeHTML from "sanitize-html";

// get the webmentions for a particular post by the post's url
// Usage: {{ webmentionsByUrl(webmentions, url) }}
// An eleventy filter function that takes in an array of web mentions and a url.
// It returns an object with the following properties:
// - like-of: an array of likes
// - like-of.count: the number of likes
// - repost-of: an array of reposts
// - repost-of.count: the number of reposts
// - in-reply-to: an array of replies
// - in-reply-to.count: the number of replies
//
// Each webmention object is structured as follows:
//  {
//    "type": "entry",
//    "author": {
//      "type": "card",
//      "name": "Sara Soueidan",
//      "photo": "https://webmention.io/avatar/pbs.twimg.com/579a474c9b858845a9e64693067e12858642fa71059d542dce6285aed5e10767.jpg",
//      "url": "https://sarasoueidan.com"
//    },
//    "url": "https://twitter.com/SaraSoueidan/status/1022009419926839296",
//    "published": "2018-07-25T06:43:28+00:00",
//    "wm-received": "2018-07-25T07:01:17Z",
//    "wm-id": 537028,
//    "wm-source": "https://brid-gy.appspot.com/comment/twitter/mxbck/1022001729389383680/1022009419926839296",
//    "wm-target": "https://mxb.dev/blog/layouts-of-tomorrow/",
//    "content": {
//      "content-type": "text/plain",
//      "value": "This looks great!",
//      "text": "This looks great!"
//    },
//    "in-reply-to": "https://mxb.dev/blog/layouts-of-tomorrow/",
//    "wm-property": "in-reply-to",
//    "wm-private": false
//  }
export const webmentionsByUrl = (webmentions, url) => {
  const allowedTypes = {
    likes: ["like-of"],
    reposts: ["repost-of"],
    comments: ["mention-of", "in-reply-to"],
  };

  const sanitize = (entry) => {
    if (entry.content && entry.content.html) {
      entry.content = sanitizeHTML(entry.content.html, {
        allowedTags: ["b", "i", "em", "strong", "a"],
      });
    }
    return entry;
  };

  const pageWebmentions = webmentions
    .filter(
      (mention) => mention["wm-target"] === "https://11tybundle.dev" + url
    )
    .sort((a, b) => new Date(b.published) - new Date(a.published))
    .map(sanitize);
  // console.log("pageWebmentions: ", pageWebmentions);

  const likes = pageWebmentions
    .filter((mention) => allowedTypes.likes.includes(mention["wm-property"]))
    .filter((like) => like.author)
    .map((like) => like.author);
  // console.log(JSON.stringify(likes, null, 2));

  const reposts = pageWebmentions
    .filter((mention) => allowedTypes.reposts.includes(mention["wm-property"]))
    .filter((repost) => repost.author)
    .map((repost) => repost.author);

  const comments = pageWebmentions
    .filter((mention) => allowedTypes.comments.includes(mention["wm-property"]))
    .filter((comment) => {
      const { author, published, content } = comment;
      return author && author.name && published && content;
    });
  // console.log(JSON.stringify(comments, null, 2));

  const mentionCount = likes.length + reposts.length + comments.length;
  // console.log("mentionCount: ", mentionCount);
  const data = { likes, reposts, comments, mentionCount };
  return data;
};
