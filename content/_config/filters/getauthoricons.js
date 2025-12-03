import { getRSSLink } from "../filters/getrsslink.js";
import { getSocialLinks } from "../filters/getsociallinks.js";

export const getWebIcon = async (link) => {
  // console.log("Getting web icon for link:", link);
  const url = new URL(link);
  const siteUrl = url.origin;
  return `<li><a href="${siteUrl}" class="🎈"><svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
  <use xlink:href="#icon-globe"></use>
  </svg><span class="visually-hidden">Website</span></a></li>`;
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
};

export async function getSocialIcons(link) {
  const socialLinks = await getSocialLinks(link);
  // console.log("Social links: ", socialLinks);

  // Generate social media img elements from the socialLinks object
  let socialIcons = "";
  const socialPlatforms = ["mastodon", "bluesky", "github", "linkedin"];
  socialPlatforms.forEach((platform) => {
    const platformLink = socialLinks[platform];
    // console.log(
    //   `Checking ${platform}: "${platformLink}" (length: ${platformLink?.length})`
    // );

    if (platformLink && platformLink.trim() !== "") {
      // console.log(`Adding icon for ${platform}`);
      socialIcons += `<li><a href="${platformLink}" class="🎈"><svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
        <use xlink:href="#icon-${platform}"></use>
      </svg><span class="visually-hidden">${platform}</span></a></li>`;

      // socialIcons += `<a href="${platformLink}"><img src="/assets/img/${platform}.svg" alt="${platform}" class="social-icon"></a>`;
    }
  });

  // console.log("Final socialIcons:", socialIcons);
  return socialIcons;
}

export async function getAuthorIcons(link) {
  const webIcon = await getWebIcon(link);
  const rssIcon = await getRSSIcon(link);
  const socialIcons = await getSocialIcons(link);

  let allIcons = "";
  if (webIcon !== "") {
    allIcons += webIcon;
  }
  if (rssIcon !== "") {
    allIcons += rssIcon;
  }
  if (socialIcons !== "") {
    allIcons += socialIcons;
  }

  return allIcons;
}
