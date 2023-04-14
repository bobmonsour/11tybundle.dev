// --- START, eleventy-img ---
const Image = require("@11ty/eleventy-img");
// Related to custom filenames (see below)
// const path = require("path");

async function imageShortcode(src, alt, sizes = "100vw", loading = "lazy") {
  let metadata = await Image(src, {
    widths: [300, 600, 900, 1200],
    formats: ["webp", "jpeg"],
    urlPath: "/assets/img/generated/",
    outputDir: "./_site/assets/img/generated/",
  });

  let lowsrc = metadata.jpeg[0];
  let highsrc = metadata.jpeg[metadata.jpeg.length - 1];

  return `<picture>
    ${Object.values(metadata)
      .map((imageFormat) => {
        return `  <source type="${
          imageFormat[0].sourceType
        }" srcset="${imageFormat
          .map((entry) => entry.srcset)
          .join(", ")}" sizes="${sizes}">`;
      })
      .join("\n")}
      <img
        src="${lowsrc.url}"
        width="${highsrc.width}"
        height="${highsrc.height}"
        alt="${alt}"
        loading="${loading}"
        decoding="async">
    </picture>`;
}
module.exports = imageShortcode;
