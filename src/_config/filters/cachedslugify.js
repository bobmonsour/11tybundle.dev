import slugify from "slugify";

const slugCache = {};

export const cachedSlugify = (input) => {
  // Check if the slug is in the cache
  if (slugCache[input]) {
    return slugCache[input];
  }
  // If not, generate the slug and store it in the cache
  const slug = slugify(input, {
    replacement: "-",
    remove: /[#,&,+()$~%.'":*¿?¡!<>{}]/g,
    lower: true,
  });
  slugCache[input] = slug;
  return slug;
};
