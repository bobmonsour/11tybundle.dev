import {
  countLabel,
  formatItemDate,
  formatPostDate,
  formatFirehoseDate,
  formatNumber,
  formatYMD,
  singleComma,
} from "./datesandnumbers.js";
import { fetchHtml } from "./fetchhtml.js";
import { getBundleItems } from "./getbundleitems.js";
import { getDescription } from "./getdescription.js";
import { genFaviconHtml } from "./genfaviconhtml.js";
import { getFavicon } from "./getfavicon.js";
import { getIssueCounts } from "./getissuecounts.js";
import { getOrigin, getHostname } from "./getorigin.js";
import { getRSSLink } from "./getrsslink.js";
import { getSocialLinks } from "./getsociallinks.js";
import { getAuthorIcons, getSocialIcons } from "./getauthoricons.js";
import { plainDate } from "./datesandnumbers.js";
import { getAuthorRecord, postsByAuthor } from "./postsbyauthor.js";
import { postsInCategory } from "./postsincategory.js";
import { postYearsInAuthor } from "./postyearsinauthor.js";
import { postYearsInCategory } from "./postyearsincategory.js";
import { postYearsInFirehose } from "./postyearsinfirehose.js";

export const filters = {
  countLabel,
  formatItemDate,
  formatPostDate,
  formatFirehoseDate,
  formatNumber,
  formatYMD,
  fetchHtml,
  getAuthorIcons,
  getSocialIcons,
  getBundleItems,
  getDescription,
  getFavicon,
  genFaviconHtml,
  getIssueCounts,
  getOrigin,
  getHostname,
  getRSSLink,
  getSocialLinks,
  getAuthorIcons,
  getAuthorRecord,
  plainDate,
  postsByAuthor,
  postsInCategory,
  postYearsInAuthor,
  postYearsInCategory,
  postYearsInFirehose,
  singleComma,
};

export default (eleventyConfig) => {
  return Object.keys(filters).forEach((filter) => {
    eleventyConfig.addFilter(filter, filters[filter]);
  });
};
