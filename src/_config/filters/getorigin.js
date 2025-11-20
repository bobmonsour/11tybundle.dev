export const getOrigin = (link) => {
  try {
    const url = new URL(link);
    return url.origin;
  } catch (e) {
    console.error(`Error parsing URL: ${link} - ${e}`);
    return "";
  }
};
