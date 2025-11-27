import { getRSSLink } from "../filters/getrsslink.js";

export const getWebIcon = async (link) => {
  const url = new URL(link);
  const siteUrl = url.origin;
  return `<li><a href="${siteUrl}" class="🎈"><svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
  <use xlink:href="#icon-globe"></use>
  </svg><span class="visually-hidden">Website</span></a></li>`;
  // return `<a href="${siteUrl}"><img src="/assets/img/globe.svg" alt="link to author's website" class="social-icon"></a>`;
};

export const getRSSIcon = async (link) => {
  const url = new URL(link);
  const siteUrl = url.origin;
  let rssLink = await getRSSLink(siteUrl);
  return rssLink === ""
    ? ""
    : `<li><a href="${rssLink}" class="🎈"><svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
        <use xlink:href="#icon-rss"></use>
      </svg><span class="visually-hidden">RSS</span></a></li>`;
  // return rssLink === ""
  //   ? ""
  //   : `<a href="${rssLink}"><img src="/assets/img/rss.svg" alt="link to author's rss feed" class="social-icon"></a>`;
};
