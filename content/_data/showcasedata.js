const localData = await import(
  "/Users/Bob/Dropbox/Docs/Sites/11tybundle/11tybundledb/showcase-data.json",
  {
    with: { type: "json" },
  }
);
export const showcasedata = localData;
