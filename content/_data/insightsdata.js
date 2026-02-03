export default async function () {
  const localData = await import(
    "/Users/Bob/Dropbox/Docs/Sites/11tybundle/11tybundledb/insightsdata.json",
    {
      with: { type: "json" },
    }
  );

  return localData.default;
}
