import { getRSSLink } from "../filters/getrsslink.js";

export const getWebIcon = async (link) => {
  const url = new URL(link);
  const siteUrl = url.origin;
  return `<a href="${siteUrl}"><img src="/assets/img/globe.svg" alt="link to author's website" class="social-icon"></a>`;
};

export const getRSSIcon = async (link) => {
  const url = new URL(link);
  const siteUrl = url.origin;
  let rssLink = await getRSSLink(siteUrl);
  return rssLink === ""
    ? ""
    : `<a href="${rssLink}"><img src="/assets/img/rss.svg" alt="link to author's rss feed" class="social-icon"></a>`;
};
