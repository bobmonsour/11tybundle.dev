// Fetch webmentions from webmention.io API
import EleventyFetch from "@11ty/eleventy-fetch";

export default async function () {
  const WEBMENTIONS_BOBM = process.env.WEBMENTION_IO_TOKEN;
  const url = `https://webmention.io/api/mentions.jf2?token=${WEBMENTIONS_BOBM}&per-page=1000`;
  const res = EleventyFetch(url, {
    duration: "1h",
    type: "json",
  });
  const webmentions = await res;
  // fs.writeFileSync("webmentions.json", JSON.stringify(webmentions, null, 2));
  // console.log(JSON.stringify(webmentions, null, 2));
  return {
    mentions: webmentions.children,
  };
}
