export default async function () {
  let localData;
  // Use limited dataset for latest issue testing; faster builds
  if (process.env.USE_LATEST_DATA === "true") {
    localData = await import(
      "/Users/Bob/Dropbox/Docs/Sites/11tybundle/11tybundledb/showcase-data-latest-issue.json",
      {
        with: { type: "json" },
      }
    );
  } else {
    localData = await import(
      "/Users/Bob/Dropbox/Docs/Sites/11tybundle/11tybundledb/showcase-data.json",
      {
        with: { type: "json" },
      }
    );
  }

  const sites = localData.default.filter((site) => site.skip !== true);
  const siteCount = sites.length;
  console.log(`Showcase site count: ${siteCount}`);
  return { sites, siteCount };
}
