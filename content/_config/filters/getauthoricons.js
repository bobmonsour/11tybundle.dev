// import { getRSSLink } from "../filters/getrsslink.js";
import { getRSSLink } from "../filters/getrsslink.js";
import { getSocialLinks } from "../filters/getsociallinks.js";

let authorIconCallCount = 0;

// get the web icon HTML for an aothor's web origin
const getWebIcon = (origin) => {
  if (!origin) {
    return "";
  }
  // console.log("Getting web icon for origin:", origin);
  return `<li><a href="${origin}" class="🎈" aria-label="Author's website"><svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
  <use xlink:href="#icon-globe"></use>
  </svg><span class="visually-hidden">Website</span></a></li>`;
};

// get the rss icon HTML for an aothor's web origin
const getRSSIcon = async (origin) => {
  if (!origin) {
    return "";
  }
  let rssLink = await getRSSLink(origin);
  return rssLink === ""
    ? ""
    : `<li><a href="${rssLink}" class="🎈" aria-label="Author's RSS feed"><svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
        <use xlink:href="#icon-rss"></use>
      </svg><span class="visually-hidden">RSS</span></a></li>`;
};

// get the social media icons HTML for an aothor's web origin
export async function getSocialIcons(origin) {
  if (!origin) {
    return "";
  }
  const socialLinks = await getSocialLinks(origin);
  // console.log("Social links: ", socialLinks);

  // Generate social media img elements from the socialLinks object
  let socialIcons = "";
  const socialPlatforms = [
    "github",
    "mastodon",
    "bluesky",
    "youtube",
    "linkedin",
  ];
  socialPlatforms.forEach((platform) => {
    const platformLink = socialLinks[platform];
    // console.log(
    //   `Checking ${platform}: "${platformLink}" (length: ${platformLink?.length})`
    // );

    if (platformLink && platformLink.trim() !== "") {
      // console.log(`Adding icon for ${platform}`);
      socialIcons += `<li><a href="${platformLink}" class="🎈" aria-label="Author's ${platform} profile"><svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
        <use xlink:href="#icon-${platform}"></use>
      </svg><span class="visually-hidden">${platform}</span></a></li>`;
    }
  });

  // console.log("Final socialIcons:", socialIcons);
  return socialIcons;
}

export async function getAuthorIcons(origin) {
  if (!origin) {
    return "";
  }
  // authorIconCallCount++;
  // console.log(`getAuthorIcons called ${authorIconCallCount} times`);
  const webIcon = await getWebIcon(origin);
  const rssIcon = await getRSSIcon(origin);
  const socialIcons = await getSocialIcons(origin);

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
