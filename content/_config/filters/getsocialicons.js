import { getSocialLinks } from "../filters/getsociallinks.js";

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
