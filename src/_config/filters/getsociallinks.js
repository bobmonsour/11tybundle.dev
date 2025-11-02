import eleventyFetch from "@11ty/eleventy-fetch";
import * as cheerio from "cheerio";

const isLinkedIn = (u) =>
  u.hostname.endsWith("linkedin.com") &&
  (u.pathname.startsWith("/in/") ||
    u.pathname.startsWith("/company/") ||
    u.pathname.startsWith("/pub/"));

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

function toAbsolute(href, base) {
  try {
    return new URL(href, base).href;
  } catch {
    return null;
  }
}

function unique(list) {
  return Array.from(new Set(list));
}

export async function getSocialLinks(link) {
  const origin = new URL(link).origin;

  const html = await eleventyFetch(origin, {
    duration: "1d",
    type: "text",
    fetchOptions: {
      headers: { "user-agent": "Mozilla/5.0 (compatible; 11tybundle.dev/1.0)" },
    },
  });

  const $ = cheerio.load(html);

  const found = {
    mastodon: [],
    linkedin: [],
    bluesky: [],
    github: [],
  };

  // 1) JSON-LD sameAs
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
      // ignore invalid JSON-LD
    }
  });

  // 2) Anchor tags (rel="me", known domains, heuristic paths)
  $("a[href]").each((_, a) => {
    const href = $(a).attr("href");
    const abs = toAbsolute(href, origin);
    if (!abs) return;

    const u = new URL(abs);
    const rel = ($(a).attr("rel") || "").toLowerCase();

    // First, prefer explicit rel="me"
    if (rel.split(/\s+/).includes("me")) {
      if (isLinkedIn(u)) found.linkedin.push(abs);
      else if (isBluesky(u)) found.bluesky.push(abs);
      else if (isMastodon(u)) found.mastodon.push(abs);
      else if (isGitHub(u)) {
        const profile = normalizeGitHubProfile(u);
        if (profile) found.github.push(profile);
      }
      return;
    }

    // Then domain/path heuristics
    if (isLinkedIn(u)) found.linkedin.push(abs);
    else if (isBluesky(u)) found.bluesky.push(abs);
    else if (isMastodon(u)) found.mastodon.push(abs);
    else if (isGitHub(u)) {
      const profile = normalizeGitHubProfile(u);
      if (profile) found.github.push(profile);
    }

    // Class/name hints (loose)
    const cls = ($(a).attr("class") || "").toLowerCase();
    const label = (
      $(a).attr("aria-label") ||
      $(a).attr("title") ||
      $(a).text() ||
      ""
    ).toLowerCase();

    const hintMasto = cls.includes("mastodon") || label.includes("mastodon");
    const hintLinkedIn = cls.includes("linkedin") || label.includes("linkedin");
    const hintBsky =
      cls.includes("bluesky") ||
      cls.includes("bsky") ||
      label.includes("bluesky");
    const hintGitHub = cls.includes("github") || label.includes("github");

    if (hintLinkedIn && isLinkedIn(u)) found.linkedin.push(abs);
    if (hintBsky && isBluesky(u)) found.bluesky.push(abs);
    if (hintMasto && isMastodon(u)) found.mastodon.push(abs);
    if (hintGitHub && isGitHub(u)) {
      const profile = normalizeGitHubProfile(u);
      if (profile) found.github.push(profile);
    }
  });

  // 3) Optional: scan visible text for @user@instance and resolve via WebFinger
  // Skipped here for brevity; suggested next step if you need higher recall.

  // Dedupe
  found.mastodon = unique(found.mastodon);
  found.linkedin = unique(found.linkedin);
  found.bluesky = unique(found.bluesky);
  found.github = unique(found.github);

  return found;
}
