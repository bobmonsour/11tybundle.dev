import { blogTitleToList } from "./blog-title-filter.js";
import {
  countLabel,
  formatItemDate,
  formatPostDate,
  formatFirehoseDate,
  formatNumber,
  formatYMD,
  singleComma,
} from "./datesandnumbers.js";
import { getBundleItems } from "./getbundleitems.js";
import { getBundleTimestamp } from "./getbundletimestamp.js";
import { genFaviconHtml } from "./genfaviconhtml.js";
import { getIssueCounts } from "./getissuecounts.js";
import { getOrigin, getHostname } from "./getorigin.js";
import { getAuthorIcons, getSocialIcons } from "./getauthoricons.js";
import { plainDate } from "./datesandnumbers.js";
import { getAuthorRecord, postsByAuthor } from "./postsbyauthor.js";
import { postsInCategory } from "./postsincategory.js";
import { postYearsInAuthor } from "./postyearsinauthor.js";
import { postYearsInCategory } from "./postyearsincategory.js";
import { postYearsInFirehose } from "./postyearsinfirehose.js";
import { getScreenshotpath } from "./getscreenshotpath.js";

export const filters = {
  blogTitleToList,
  countLabel,
  formatItemDate,
  formatPostDate,
  formatFirehoseDate,
  formatNumber,
  formatYMD,
  getAuthorIcons,
  getSocialIcons,
  getBundleItems,
  getBundleTimestamp,
  genFaviconHtml,
  getIssueCounts,
  getOrigin,
  getHostname,
  getAuthorIcons,
  getAuthorRecord,
  getScreenshotpath,
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
