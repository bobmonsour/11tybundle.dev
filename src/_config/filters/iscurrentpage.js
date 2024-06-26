// Determine whether or not to highlight current page in the nav
// if the link text appears within the page url, then do highlight
export const isCurrentPage = (linkText, pageUrl) => {
  lcLinkText = linkText.toLowerCase();
  if (pageUrl.includes(lcLinkText)) {
    return 'aria-current="page"';
  }
};
