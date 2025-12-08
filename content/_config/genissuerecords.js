// called as an eleventy.before event so that
// issueRecords.json is generated before the site build starts
// and is available to templates and filters

import Fetch from "@11ty/eleventy-fetch";
//***** FOR WRITING ISSUE RECORDS ARRAY TO A FILE *****
import path from "path";
import { fileURLToPath } from "url";
import { promises as fs } from "fs";
//*****

// **************
//   *** FULL DATASET, FETCHED FROM REMOTE REPO ***
// **************
const BUNDLEDB_URL =
  "https://raw.githubusercontent.com/bobmonsour/11tybundledb/main/bundledb.json";
// Fetch the json db from its remote repo
const bundleRecords = await Fetch(BUNDLEDB_URL, {
  duration: "1w", // 1 week cache duration
  type: "json",
  fetchOptions: {
    signal: AbortSignal.timeout(3000), // 3 seconds
  },
});
// **************

// generate issueRecords array from the bundleRecords
// with each record containing the issue number and counts of
// blog posts, releases, and sites for that issue
const buildIssueRecords = (bundleRecords) => {
  const countsByIssue = new Map();

  for (const item of bundleRecords) {
    // Ignore records explicitly marked to be skipped
    if (item?.Skip) continue;

    const issueNum = Number(item?.Issue);
    if (!Number.isFinite(issueNum) || issueNum < 1) continue;

    if (!countsByIssue.has(issueNum)) {
      countsByIssue.set(issueNum, { blogPosts: 0, releases: 0, sites: 0 });
    }
    const bucket = countsByIssue.get(issueNum);

    switch (item.Type) {
      case "blog post":
        bucket.blogPosts += 1;
        break;
      case "release":
        bucket.releases += 1;
        break;
      case "site":
        bucket.sites += 1;
        break;
      default:
        break;
    }
  }

  const maxIssue = Math.max(0, ...countsByIssue.keys());
  const issueRecords = [];
  for (let i = 1; i <= maxIssue; i++) {
    const c = countsByIssue.get(i) || { blogPosts: 0, releases: 0, sites: 0 };
    issueRecords.push({
      issue: i,
      blogPosts: c.blogPosts,
      releases: c.releases,
      sites: c.sites,
    });
  }

  return issueRecords;
};

/**
 * Write the issueRecords array to a fixed _data directory that is parallel
 * to this file's location (i.e. ../_data relative to this module).
 * @param {Array} issueRecords
 * @param {string} [filename="issueRecords.json"]
 * @returns {string} output file path
 */
const writeIssueRecordsToFile = async (
  issueRecords,
  filename = "issueRecords.json"
) => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  // fixed directory: a folder named "_data" located alongside this module's parent
  const outDir = path.join(__dirname, "..", "_data");
  const outPath = path.join(outDir, filename);

  try {
    await fs.mkdir(outDir, { recursive: true });
    await fs.writeFile(outPath, JSON.stringify(issueRecords, null, 2), "utf8");
    console.log(`Wrote ${issueRecords.length} issue records to ${outPath}`);
    return outPath;
  } catch (err) {
    console.error(
      "Failed to write issue records:",
      err && err.message ? err.message : err
    );
    throw err;
  }
};

export async function genIssueRecords({ directories } = {}) {
  const issueRecords = await buildIssueRecords(bundleRecords);
  await writeIssueRecordsToFile(issueRecords, directories);
}
