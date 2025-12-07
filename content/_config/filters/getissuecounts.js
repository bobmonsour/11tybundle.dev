// Return counts for a given issue from an issueRecords array
export const getIssueCounts = (issue, issueRecords) => {
  const issueNum = Number(issue);
  if (!Number.isFinite(issueNum) || issueNum < 1) {
    return { postCount: 0, releaseCount: 0, siteCount: 0 };
  }

  if (!Array.isArray(issueRecords)) {
    return { postCount: 0, releaseCount: 0, siteCount: 0 };
  }

  const rec = issueRecords.find((r) => Number(r.issue) === issueNum);
  if (!rec) {
    return { postCount: 0, releaseCount: 0, siteCount: 0 };
  }

  return {
    postCount: Number(rec.blogPosts) || 0,
    releaseCount: Number(rec.releases) || 0,
    siteCount: Number(rec.sites) || 0,
  };
};
