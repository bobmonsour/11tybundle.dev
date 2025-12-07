import { countLabel } from "./countlabel.js";
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
import { readingTime } from "./readingtime.js";
import { singleComma } from "./singlecomma.js";

export const filters = {
  countLabel,
  isCurrentPage,
  formatItemDate,
  formatPostDate,
  formatFirehoseDate,
  formatNumber,
  getAuthorIcons,
  getSocialIcons,
  getBundleItems,
  getDescription,
  getFavicon,
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
  readingTime,
  singleComma,
};

export default (eleventyConfig) => {
  return Object.keys(filters).forEach((filter) => {
    eleventyConfig.addFilter(filter, filters[filter]);
  });
};
