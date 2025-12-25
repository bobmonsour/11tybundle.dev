import issueRecords from "/Users/Bob/Dropbox/Docs/Sites/11tybundle/11tybundledb/issuerecords.json" with { type: 'json' };

/**
 * Return counts for a given issue number.
 * @param {number|string} issue
 * @returns {{postCount:number, releaseCount:number, siteCount:number}}
 */
export const getIssueCounts = (issue) => {
  const issueNum = Number(issue);
  if (!Number.isFinite(issueNum) || issueNum < 1) {
    return { postCount: 0, releaseCount: 0, siteCount: 0 };
  }

  const rec = Array.isArray(issueRecords)
    ? issueRecords.find((r) => Number(r.issue) === issueNum)
    : null;

  return {
    postCount: Number(rec?.blogPosts || 0),
    releaseCount: Number(rec?.releases || 0),
    siteCount: Number(rec?.sites || 0),
  };
};
