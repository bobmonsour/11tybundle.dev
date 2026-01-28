import fs from "fs";
import path from "path";

// Map bundle types to their source directories
const BUNDLE_DIRS = {
  css: "./public/css",
  js: "./public/js",
};

// Export the function for use in front matter and as a filter
export function getBundleTimestamp(bundleType = "css") {
  const dir = BUNDLE_DIRS[bundleType] || bundleType; // Allows custom paths too

  if (!fs.existsSync(dir)) {
    console.warn(`Directory not found: ${dir}`);
    return Date.now().toString(36).slice(-8); // Fallback
  }

  const files = fs.readdirSync(dir);
  let latestMtime = 0;

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    try {
      const stats = fs.statSync(filePath);
      if (stats.isFile() && stats.mtimeMs > latestMtime) {
        latestMtime = stats.mtimeMs;
      }
    } catch (err) {
      // Skip files that can't be stat'd
    }
  });

  // Return as base36 for 7-8 character hash
  return Math.floor(latestMtime / 1000).toString(36);
}
