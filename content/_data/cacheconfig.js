// Aggregate cache duration config here. According to the
// 11ty.dev docs, durations can be expressed as follows:
//    s is seconds (e.g. duration: "43s")
//    m is minutes (e.g. duration: "2m")
//    h is hours (e.g. duration: "99h")
//    d is days (The default is duration: "1d")
//    w is weeks, or shorthand for 7 days (e.g. duration: 2w is 14 days)
//    y is years, or shorthand for 365 days (not exactly one year) (e.g. duration: 2y is 730 days)
// Special values:
//    duration: "*" will never fetch new data (after the first success).
//    duration: "0s" will always fetch new data (works with any unit, e.g. "0m", "0h").

export const cacheDuration = {
  aiSummaryHtml: "1y",
  bundleDB: "0s",
  descHtml: "1y",
  faviconHtml: "1y",
  faviconImage: "1y",
  rssLinkHtml: "1y",
  socialHtml: "1y",
  socialLinks: "1y",
  starters: "1y",
};

// Timeout settings for fetch operations, in milliseconds
export const fetchTimeout = {
  bundleDB: 5000, // 5 seconds
  descHtml: 5000, // 5 seconds
  faviconHtml: 3000, // 3 seconds
  faviconImage: 3000, // 3 seconds
  faviconExtension: 1000, // 1 second
  rssLinkHtml: 3000, // 3 seconds
  socialHtml: 3000, // 3 seconds
  socialLinks: 3000, // 3 seconds
};
