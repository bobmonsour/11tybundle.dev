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
import { getNonYoutubePost } from "./getnonyoutubepost.js";
import { getOrigin } from "./getorigin.js";
import { getRSSLink } from "./getrsslink.js";
import { getSocialIcons } from "./getsocialicons.js";
import { getWebIcon, getRSSIcon } from "./getwebandrssicons.js";
import { plainDate } from "./datesandnumbers.js";
import { postCountLabel } from "./postcountlabel.js";
import { postCountByAuthor, postsByAuthor } from "./postsbyauthor.js";
import { postsInCategory } from "./postsincategory.js";
import { readingTime } from "./readingtime.js";

const filters = {
  isCurrentPage,
  formatItemDate,
  formatPostDate,
  formatFirehoseDate,
  formatNumber,
  getBundleItems,
  getDescription,
  getFavicon,
  getNonYoutubePost,
  getOrigin,
  getRSSIcon,
  getRSSLink,
  getSocialIcons,
  getWebIcon,
  plainDate,
  postCountByAuthor,
  postCountLabel,
  postsByAuthor,
  postsInCategory,
  readingTime,
};

export default (eleventyConfig) => {
  return Object.keys(filters).forEach((filter) => {
    eleventyConfig.addFilter(filter, filters[filter]);
  });
};
