import { getSocialLinks } from "../filters/getsociallinks.js";

export async function getSocialIcons(link) {
  let socialLinks = await getSocialLinks(link);
  // console.log("socialLinks:", socialLinks);

  // Generate social media img elements from the socialLinks object
  let socialIcons = "";
  const socialPlatforms = ["mastodon", "bluesky", "github", "linkedin"];
  socialPlatforms.forEach((platform) => {
    if (socialLinks[platform]) {
      socialIcons += `<a href="${socialLinks[platform]}"><img src="/assets/img/${platform}.svg" alt="${platform}" class="social-icon"></a>`;
    }
  });
  return socialIcons;
}
