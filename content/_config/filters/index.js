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
import {
  getNonYoutubePost,
  getNonYoutubePostByAuthor,
} from "./getnonyoutubepost.js";
import { getOrigin, getHostname } from "./getorigin.js";
import { getRSSLink } from "./getrsslink.js";
import { getSocialIcons } from "./getsocialicons.js";
import { getSocialLinks } from "./getsociallinks.js";
import { getAuthorIcons } from "./getauthoricons.js";
import { plainDate } from "./datesandnumbers.js";
import { postCountLabel } from "./postcountlabel.js";
import { postCountByAuthor, postsByAuthor } from "./postsbyauthor.js";
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
  getBundleItems,
  getDescription,
  getFavicon,
  getNonYoutubePost,
  getNonYoutubePostByAuthor,
  getOrigin,
  getHostname,
  getRSSLink,
  getSocialIcons,
  getSocialLinks,
  getAuthorIcons,
  plainDate,
  postCountByAuthor,
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
