import { DateTime } from "luxon";

export default {
  eleventyComputed: {
    month: () => DateTime.now().toFormat("LLL").toUpperCase(),
    day: () => DateTime.now().toFormat("dd"),
  },
};
