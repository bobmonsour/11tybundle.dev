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
      socialIcons += `<a href="${platformLink}"><img src="/assets/img/${platform}.svg" alt="${platform}" class="social-icon"></a>`;
    }
  });

  // console.log("Final socialIcons:", socialIcons);
  return socialIcons;
}
