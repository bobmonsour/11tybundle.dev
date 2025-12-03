import { isCurrentPage } from "./iscurrentpage.js";
import {
  formatItemDate,
  formatPostDate,
  formatFirehoseDate,
  formatNumber,
} from "./datesandnumbers.js";
import { getBundleItems } from "./getbundleitems.js";
import { getDescription } from "./getdescription.js";
import { getFavicon } from "./getfavicon.js";
import { getOrigin, getHostname } from "./getorigin.js";
import { getRSSLink } from "./getrsslink.js";
import { getSocialLinks } from "./getsociallinks.js";
import {
  getAuthorIcons,
  getWebIcon,
  getRSSIcon,
  getSocialIcons,
} from "./getauthoricons.js";
import { plainDate } from "./datesandnumbers.js";
import { postCountLabel } from "./postcountlabel.js";
import { getAuthorRecord, postsByAuthor } from "./postsbyauthor.js";
import { postsInCategory } from "./postsincategory.js";
import { postYearsInAuthor } from "./postyearsinauthor.js";
import { postYearsInCategory } from "./postyearsincategory.js";
import { readingTime } from "./readingtime.js";

export const filters = {
  isCurrentPage,
  formatItemDate,
  formatPostDate,
  formatFirehoseDate,
  formatNumber,
  getAuthorIcons,
  getWebIcon,
  getRSSIcon,
  getSocialIcons,
  getBundleItems,
  getDescription,
  getFavicon,
  getOrigin,
  getHostname,
  getRSSLink,
  getSocialLinks,
  getAuthorIcons,
  plainDate,
  getAuthorRecord,
  postCountLabel,
  postsByAuthor,
  postsInCategory,
  postYearsInAuthor,
  postYearsInCategory,
  readingTime,
};

export default (eleventyConfig) => {
  return Object.keys(filters).forEach((filter) => {
    eleventyConfig.addFilter(filter, filters[filter]);
  });
};
