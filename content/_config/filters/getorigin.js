// Extract the origin from a URL
// Examples:
//   "https://bobmonsour.com/posts/my-post/" → "https://bobmonsour.com"
//   "http://localhost:8080/blog/" → "http://localhost:8080"
//   "https://github.com:443/11ty/eleventy" → "https://github.com"
//   "invalid-url" → "" (returns empty string on error)
export const getOrigin = (link) => {
  try {
    const url = new URL(link);
    return url.origin;
  } catch (e) {
    console.error(`Error parsing URL: ${link} - ${e}`);
    return "";
  }
};

// Extract the domain (hostname) from a URL
// Examples:
//   "https://bobmonsour.com/posts/my-post/" → "bobmonsour.com"
//   "http://localhost:8080/blog/" → "localhost"
//   "https://github.com:443/11ty/eleventy" → "github.com"
//   "invalid-url" → "" (returns empty string on error)
export const getHostname = (link) => {
  // console.log("getHostname called with link:", link);
  try {
    const url = new URL(link);
    return url.hostname;
  } catch (e) {
    console.error(`Error parsing URL: ${link} - ${e}`);
    return "";
  }
};
