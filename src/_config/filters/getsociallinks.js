import eleventyFetch from "@11ty/eleventy-fetch";
import { AssetCache } from "@11ty/eleventy-fetch";
import * as cheerio from "cheerio";

// Determine if a URL is a LinkedIn profile or company page
const isLinkedIn = (u) =>
  u.hostname.endsWith("linkedin.com") &&
  (u.pathname.startsWith("/in/") ||
    u.pathname.startsWith("/company/") ||
    u.pathname.startsWith("/pub/"));

// Determine if a URL is a Bluesky profile
const isBluesky = (u) =>
  u.hostname === "bsky.app" && u.pathname.startsWith("/profile/");

// Heuristic for Mastodon-like profile URLs on any instance
const isMastodon = (u) =>
  // common paths on Mastodon instances
  (u.pathname.startsWith("/@") || u.pathname.startsWith("/users/")) &&
  // exclude Bluesky, LinkedIn, and common non-fedi hosts
  !u.hostname.endsWith("linkedin.com") &&
  u.hostname !== "bsky.app";

// GitHub detection and normalization to profile (repo -> owner)
const isGitHub = (u) => u.hostname.endsWith("github.com");
const normalizeGitHubProfile = (u) => {
  if (!isGitHub(u)) return null;
  const parts = u.pathname.split("/").filter(Boolean);
  if (parts.length === 0) return null; // no profile
  // orgs/<org> -> <org>
  if (parts[0].toLowerCase() === "orgs" && parts[1]) {
    return `https://github.com/${parts[1]}`;
  }
  // user/org[/repo...] -> user/org
  return `https://github.com/${parts[0]}`;
};

// Convert a relative URL to an absolute URL based on a base URL
function toAbsolute(href, base) {
  try {
    return new URL(href, base).href;
  } catch {
    return null;
  }
}

// Return a unique array of values
function unique(list) {
  return Array.from(new Set(list));
}

// Main function to get social links from a given webpage
export async function getSocialLinks(link) {
  const origin = new URL(link).origin;

  // Create cache for social links using AssetCache directly
  const cacheKey = `social-links-${origin}`;
  const cache = new AssetCache(cacheKey, ".cache");

  // Check if we have cached social links for this origin
  if (cache.isCacheValid("1d")) {
    const cachedLinks = await cache.getCachedValue();
    if (cachedLinks) {
      console.log(`Using cached social links for ${origin}`);
      return cachedLinks;
    }
  }

  // Step 1: Fetch the homepage HTML of the origin domain
  // We use the origin because social links are typically in the site header/footer
  const html = await eleventyFetch(origin, {
    duration: "1d", // Cache HTML for 1 day
    type: "text",
    fetchOptions: {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36",
      },
    },
  });

  // Step 2: Parse HTML with Cheerio for jQuery-like DOM manipulation
  const $ = cheerio.load(html);

  // Initialize arrays to collect found social links by platform
  const found = {
    mastodon: [],
    linkedin: [],
    bluesky: [],
    github: [],
  };

  // Step 3: Look for structured data (JSON-LD) with sameAs properties
  // This is the most reliable method as it's semantic and intentional
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const json = JSON.parse($(el).text());
      const graph = Array.isArray(json) ? json : [json];
      for (const node of graph) {
        const sameAs = node?.sameAs;
        if (!sameAs) continue;
        const links = Array.isArray(sameAs) ? sameAs : [sameAs];
        for (const href of links) {
          const abs = toAbsolute(href, origin);
          if (!abs) continue;
          const u = new URL(abs);
          // Categorize links by platform using detection functions
          if (isLinkedIn(u)) found.linkedin.push(abs);
          else if (isBluesky(u)) found.bluesky.push(abs);
          else if (isMastodon(u)) found.mastodon.push(abs);
          else if (isGitHub(u)) {
            const profile = normalizeGitHubProfile(u);
            if (profile) found.github.push(profile);
          }
        }
      }
    } catch {
      // ignore invalid JSON-LD - some sites have malformed structured data
    }
  });

  // Step 4: Scan all anchor tags for social links
  // This catches links that aren't in structured data
  $("a[href]").each((_, a) => {
    const href = $(a).attr("href");
    const abs = toAbsolute(href, origin);
    if (!abs) return;

    const u = new URL(abs);
    const rel = ($(a).attr("rel") || "").toLowerCase();

    // Step 4a: Prioritize links with explicit rel="me" attribute
    // This is a semantic indicator that the link represents the same entity
    if (rel.split(/\s+/).includes("me")) {
      if (isLinkedIn(u)) found.linkedin.push(abs);
      else if (isBluesky(u)) found.bluesky.push(abs);
      else if (isMastodon(u)) found.mastodon.push(abs);
      else if (isGitHub(u)) {
        const profile = normalizeGitHubProfile(u);
        if (profile) found.github.push(profile);
      }
      return; // Skip further processing for rel="me" links
    }

    // Step 4b: Use domain and path pattern matching
    // Detect social platform links based on URL structure
    if (isLinkedIn(u)) found.linkedin.push(abs);
    else if (isBluesky(u)) found.bluesky.push(abs);
    else if (isMastodon(u)) found.mastodon.push(abs);
    else if (isGitHub(u)) {
      const profile = normalizeGitHubProfile(u);
      if (profile) found.github.push(profile);
    }

    // Step 4c: Use CSS classes and text content as additional hints
    // This catches links that might be styled or labeled as social links
    const cls = ($(a).attr("class") || "").toLowerCase();
    const label = (
      $(a).attr("aria-label") ||
      $(a).attr("title") ||
      $(a).text() ||
      ""
    ).toLowerCase();

    // Check for platform-specific keywords in classes and labels
    const hintMasto = cls.includes("mastodon") || label.includes("mastodon");
    const hintLinkedIn = cls.includes("linkedin") || label.includes("linkedin");
    const hintBsky =
      cls.includes("bluesky") ||
      cls.includes("bsky") ||
      label.includes("bluesky");
    const hintGitHub = cls.includes("github") || label.includes("github");

    // Only add links if both URL pattern AND hint match
    // This reduces false positives
    if (hintLinkedIn && isLinkedIn(u)) found.linkedin.push(abs);
    if (hintBsky && isBluesky(u)) found.bluesky.push(abs);
    if (hintMasto && isMastodon(u)) found.mastodon.push(abs);
    if (hintGitHub && isGitHub(u)) {
      const profile = normalizeGitHubProfile(u);
      if (profile) found.github.push(profile);
    }
  });

  // Step 5: Remove duplicate URLs within each platform
  // Some sites might link to the same profile multiple times
  found.mastodon = unique(found.mastodon);
  found.bluesky = unique(found.bluesky);
  found.github = unique(found.github);
  found.linkedin = unique(found.linkedin);

  // Step 6: Return only the first (best) link for each platform
  // If no link found for a platform, return empty string
  const socialLinks = {
    mastodon: found.mastodon[0] || "",
    bluesky: found.bluesky[0] || "",
    github: found.github[0] || "",
    linkedin: found.linkedin[0] || "",
  };

  // Cache the results
  await cache.save(socialLinks, "json");
  console.log(`Cached social links for ${origin}`);

  return socialLinks;
}
