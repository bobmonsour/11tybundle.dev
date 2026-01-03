export default async function () {
  const localData = await import(
    "/Users/Bob/Dropbox/Docs/Sites/11tybundle/11tybundledb/showcase-data.json",
    {
      with: { type: "json" },
    }
  );

  const sites = localData.default;
  const siteCount = sites.length;
  console.log(`Showcase site count: ${siteCount}`);
  return { sites, siteCount };
}
