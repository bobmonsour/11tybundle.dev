// Convert a social media profile URL to a handle
// Mastodon: "https://mastodon.social/@johnwargo" → "@johnwargo@mastodon.social"
// Bluesky:  "https://bsky.app/profile/brennanbrown.ca" → "@brennanbrown.ca"
export const toSocialHandle = (url, platform) => {
  if (!url || url.trim() === "") return "";
  try {
    if (platform === "mastodon") {
      const parsed = new URL(url);
      const username = parsed.pathname.split("@").pop();
      return `@${username}@${parsed.hostname}`;
    } else if (platform === "bluesky") {
      const handle = url.split("/profile/").pop();
      return `@${handle}`;
    }
  } catch {
    return "";
  }
  return "";
};
