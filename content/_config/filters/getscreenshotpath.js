// Get the screenshot path for a given showcase site URL
// Examples:
//   "https://example.com" → "/img/screenshots/example-com.png" (if found in showcase-data.json)
//   "https://unknown.com" → "" (returns empty string if no match)
export const getScreenshotpath = async (link) => {
  try {
    const showcaseData = await import(
      "/Users/Bob/Dropbox/Docs/Sites/11tybundle/11tybundledb/showcase-data.json",
      {
        with: { type: "json" },
      }
    );

    const site = showcaseData.default.find((site) => site.link === link);
    return site?.screenshotpath || "";
  } catch (e) {
    console.error(`Error loading showcase data: ${e}`);
    return "";
  }
};
