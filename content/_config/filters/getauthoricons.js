// get the web icon HTML for an aothor's web origin
const getWebIcon = (author) => {
  // console.log("Getting web icon for origin:", origin);
  return `<li><a href="${author.origin}" class="🎈" aria-label="Author's website"><svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
  <use xlink:href="#icon-globe"></use>
  </svg><span class="visually-hidden">Website</span></a></li>`;
};

// get the rss icon HTML for an aothor's web origin
const getRSSIcon = async (author) => {
  let rssLink = author.rssLink;
  return rssLink === ""
    ? ""
    : `<li><a href="${rssLink}" class="🎈" aria-label="Author's RSS feed"><svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
        <use xlink:href="#icon-rss"></use>
      </svg><span class="visually-hidden">RSS</span></a></li>`;
};

// get the social media icons HTML for an aothor's web origin
export async function getSocialIcons(author) {
  const socialLinks = author.socialLinks;
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

export async function getAuthorIcons(author) {
  // authorIconCallCount++;
  // console.log(`getAuthorIcons called ${authorIconCallCount} times`);
  const webIcon = await getWebIcon(author);
  const rssIcon = await getRSSIcon(author);
  const socialIcons = await getSocialIcons(author);

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
