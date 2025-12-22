import { AssetCache } from "@11ty/eleventy-fetch";
import * as cheerio from "cheerio";
import { fetchHtml } from "./fetchhtml.js";

import { cacheDuration } from "../../_data/cacheconfig.js";

// Track origins that have failed to return social links in this session
const failedOriginsThisSession = new Set();

// Determine if a URL is a LinkedIn profile or company page
const isLinkedIn = (u) =>
  u.hostname.endsWith("linkedin.com") &&
  (u.pathname.startsWith("/in/") ||
    u.pathname.startsWith("/company/") ||
    u.pathname.startsWith("/pub/"));

// Determine if a URL is a Bluesky profile
const isBluesky = (u) => u.hostname.includes("bsky");

// Determine if a URL is a YouTube profile (only accept specific channel path forms)
const isYouTube = (u) => {
  if (!u || !u.hostname) return false;
  const host = u.hostname.toLowerCase();
  if (host !== "youtube.com" && host !== "www.youtube.com") return false;
  const p = (u.pathname || "").toLowerCase();
  return (
    p.startsWith("/@") ||
    p.startsWith("/channel/") ||
    p.startsWith("/c/") ||
    p.startsWith("/user/")
  );
};

// Heuristic for Mastodon-like profile URLs on any instance
const isMastodon = (u) =>
  // common paths on Mastodon instances
  (u.pathname.startsWith("/@") || u.pathname.startsWith("/users/")) &&
  // exclude Bluesky, LinkedIn, and common non-fedi hosts
  !u.hostname.endsWith("linkedin.com") &&
  !u.hostname.includes("bsky") &&
  !u.hostname.includes("youtube") &&
  !u.hostname.includes("discord") &&
  !u.hostname.includes("roblox") &&
  !u.hostname.includes("stackoverflow") &&
  !u.hostname.includes("vimeo") &&
  !u.hostname.includes("discourse") &&
  !u.hostname.includes("x") &&
  !u.hostname.includes("twitter");

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

//***************
// Extract social links from HTML content using multiple
// detection strategies
//
//  @param {string} html - HTML content to parse
//  @param {string} origin - origin URL for resolving relative links
//  @returns {object} Object with arrays of social links by platform
//***************

function extractSocialLinksFromHtml(html, origin) {
  // Parse HTML with Cheerio for jQuery-like DOM manipulation
  const $ = cheerio.load(html);

  // Initialize arrays to collect found social links by platform
  const found = {
    mastodon: [],
    linkedin: [],
    bluesky: [],
    github: [],
    youtube: [],
  };

  //***************
  // Strategy 1: Look for structured data (JSON-LD) with
  // sameAs properties
  // This is the most reliable method as it's semantic and intentional
  //***************

  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const json = JSON.parse($(el).text());
      // Handle both single objects and arrays of structured data
      const graph = Array.isArray(json) ? json : [json];

      for (const node of graph) {
        const sameAs = node?.sameAs;
        if (!sameAs) continue;

        // sameAs can be a string or array of strings
        const links = Array.isArray(sameAs) ? sameAs : [sameAs];

        for (const href of links) {
          const absoluteUrl = toAbsolute(href, origin);
          if (!absoluteUrl) continue;

          const url = new URL(absoluteUrl);
          // Categorize links by platform using detection functions
          if (isLinkedIn(url)) found.linkedin.push(absoluteUrl);
          else if (isBluesky(url)) found.bluesky.push(absoluteUrl);
          else if (isYouTube(url)) found.youtube.push(absoluteUrl);
          else if (isMastodon(url)) found.mastodon.push(absoluteUrl);
          else if (isGitHub(url)) {
            const profile = normalizeGitHubProfile(url);
            if (profile) found.github.push(profile);
          }
        }
      }
    } catch {
      // Ignore invalid JSON-LD - some sites have malformed structured data
    }
  });

  //***************
  // Strategy 2: Scan all anchor tags for social links
  // This catches links that aren't in structured data
  //***************

  $("a[href]").each((_, a) => {
    const href = $(a).attr("href");
    const absoluteUrl = toAbsolute(href, origin);
    if (!absoluteUrl) return;

    const url = new URL(absoluteUrl);
    const rel = ($(a).attr("rel") || "").toLowerCase();

    //***************
    // Strategy 2a: Prioritize links with explicit rel="me" attribute
    // This is a semantic indicator that the link represents the
    // same entity
    //***************

    if (rel.split(/\s+/).includes("me")) {
      if (isLinkedIn(url)) found.linkedin.push(absoluteUrl);
      else if (isBluesky(url)) found.bluesky.push(absoluteUrl);
      else if (isMastodon(url)) found.mastodon.push(absoluteUrl);
      else if (isYouTube(url)) found.youtube.push(absoluteUrl);
      else if (isGitHub(url)) {
        const profile = normalizeGitHubProfile(url);
        if (profile) found.github.push(profile);
      }
      return; // Skip further processing for rel="me" links
    }

    //***************
    // Strategy 2b: Use domain and path pattern matching
    // Detect social platform links based on URL structure
    //***************

    if (isLinkedIn(url)) found.linkedin.push(absoluteUrl);
    else if (isBluesky(url)) found.bluesky.push(absoluteUrl);
    else if (isMastodon(url)) found.mastodon.push(absoluteUrl);
    else if (isYouTube(url)) found.youtube.push(absoluteUrl);
    else if (isGitHub(url)) {
      const profile = normalizeGitHubProfile(url);
      if (profile) found.github.push(profile);
    }

    //***************
    // Strategy 2c: Use CSS classes and text content as
    // additional hints
    // This catches links that might be styled or labeled
    // as social links
    //***************

    const cssClass = ($(a).attr("class") || "").toLowerCase();
    const label = (
      $(a).attr("aria-label") ||
      $(a).attr("title") ||
      $(a).text() ||
      ""
    ).toLowerCase();

    // Check for platform-specific keywords in classes and labels
    const hintMastodon =
      cssClass.includes("mastodon") || label.includes("mastodon");
    const hintYouTube =
      cssClass.includes("youtube") || label.includes("youtube");
    const hintLinkedIn =
      cssClass.includes("linkedin") || label.includes("linkedin");
    const hintBluesky =
      cssClass.includes("bluesky") ||
      cssClass.includes("bsky") ||
      label.includes("bluesky");
    const hintGitHub = cssClass.includes("github") || label.includes("github");

    // Only add links if both URL pattern AND hint match
    // This reduces false positives
    if (hintLinkedIn && isLinkedIn(url)) found.linkedin.push(absoluteUrl);
    if (hintBluesky && isBluesky(url)) found.bluesky.push(absoluteUrl);
    if (hintMastodon && isMastodon(url)) found.mastodon.push(absoluteUrl);
    if (hintYouTube && isYouTube(url)) found.youtube.push(absoluteUrl);
    if (hintGitHub && isGitHub(url)) {
      const profile = normalizeGitHubProfile(url);
      if (profile) found.github.push(profile);
    }
  });

  return found;
}

//***************
// Main function to get social links from a given webpage and
// common subpages
// Checks the origin URL, /about/, and /en/ pages for social
// media links
// @param {string} link - The URL to extract social links from
// @returns {object} Object containing the best social link
// for each platform
//***************

export async function getSocialLinks(link) {
  // Validate that link is a valid HTTP/HTTPS URL in 2 steps
  if (!link || typeof link !== "string") {
    console.log(`getSocialLinks - Invalid link: ${link}`);
    return {
      mastodon: "",
      bluesky: "",
      youtube: "",
      github: "",
      linkedin: "",
    };
  }
  if (!link.startsWith("http://") && !link.startsWith("https://")) {
    console.log(`Not a valid HTTP URL: ${link}`);
    return {
      mastodon: "",
      bluesky: "",
      youtube: "",
      github: "",
      linkedin: "",
    };
  }

  const origin = new URL(link).origin;

  // Create cache for social links using AssetCache
  // Cache in .cache directory with a key based on the origin
  const cacheKey = `social-links-${origin}`;
  const cache = new AssetCache(cacheKey);

  // Check if we have cached social links for this origin
  if (cache.isCacheValid(cacheDuration.socialLinks)) {
    const cachedLinks = await cache.getCachedValue();
    if (cachedLinks) {
      // console.log(`Using cached social links for ${origin}`);
      // console.log("Cached links:", cachedLinks);
      return cachedLinks;
    }
  }

  // Skip if we've already checked all pages for this origin and found nothing
  if (failedOriginsThisSession.has(origin)) {
    // console.log(
    //   `Already checked all pages for ${origin} in this session with no results, skipping`
    // );
    return {
      mastodon: "",
      bluesky: "",
      youtube: "",
      github: "",
      linkedin: "",
    };
  }

  // Define pages to check for social links
  // Many sites put social links on their about pages
  const pagesToCheck = [
    origin, // Homepage - most common location
    `${origin}/about/`, // About page - common for personal sites
    `${origin}/en/`, // For international sites with English pages
  ];

  // Initialize combined results from all pages
  const combinedFound = {
    mastodon: [],
    linkedin: [],
    youtube: [],
    bluesky: [],
    github: [],
  };

  // Fetch and process each page for social links
  for (const pageUrl of pagesToCheck) {
    try {
      // Fetch the HTML content with persistent failure caching
      const html = await fetchHtml(pageUrl, "socialHtml");

      // Extract social links from this page's HTML
      const pageResults = extractSocialLinksFromHtml(html, origin);

      // Merge results from this page into combined results
      // Prepend pageResults so later-checked pages (eg. /about/) can overwrite earlier ones (eg. origin)
      combinedFound.mastodon = pageResults.mastodon.concat(
        combinedFound.mastodon
      );
      combinedFound.linkedin = pageResults.linkedin.concat(
        combinedFound.linkedin
      );
      combinedFound.bluesky = pageResults.bluesky.concat(combinedFound.bluesky);
      combinedFound.youtube = pageResults.youtube.concat(combinedFound.youtube);
      combinedFound.github = pageResults.github.concat(combinedFound.github);

      // If we've just processed the /about/ page and found any links, stop early.
      // This ensures /about/ can overwrite origin results, but avoids fetching additional pages afterward.
      const justProcessedAbout =
        pageUrl.endsWith("/about/") || pageUrl === `${origin}/about/`;
      const foundAnyLinksNow =
        combinedFound.mastodon.length > 0 ||
        combinedFound.linkedin.length > 0 ||
        combinedFound.bluesky.length > 0 ||
        combinedFound.youtube.length > 0 ||
        combinedFound.github.length > 0;

      if (justProcessedAbout && foundAnyLinksNow) {
        break;
      }
    } catch (error) {
      //***************
      // Silently continue if a page doesn't exist (404) or
      // fails to fetch
      // This allows the function to work even if /about/ or
      // /about don't exist
      // console.log(`Could not fetch ${pageUrl}:`, error.message);
      //***************
    }
  }

  // Remove duplicate URLs within each platform
  // Some sites might link to the same profile multiple times
  // across pages
  combinedFound.mastodon = unique(combinedFound.mastodon);
  combinedFound.bluesky = unique(combinedFound.bluesky);
  combinedFound.youtube = unique(combinedFound.youtube);
  combinedFound.github = unique(combinedFound.github);
  combinedFound.linkedin = unique(combinedFound.linkedin);

  // Check if we found any social links across all pages
  const foundAnyLinks =
    combinedFound.mastodon.length > 0 ||
    combinedFound.linkedin.length > 0 ||
    combinedFound.youtube.length > 0 ||
    combinedFound.bluesky.length > 0 ||
    combinedFound.github.length > 0;

  // If no links found after checking all pages, mark this
  // origin as failed
  if (!foundAnyLinks) {
    failedOriginsThisSession.add(origin);
  }

  // Return only the first (best) link for each platform
  // If no link found for a platform, return empty string
  // First result is prioritized since homepage links are
  // checked first
  const socialLinks = {
    mastodon: combinedFound.mastodon[0] || "",
    bluesky: combinedFound.bluesky[0] || "",
    youtube: combinedFound.youtube[0] || "",
    github: combinedFound.github[0] || "",
    linkedin: combinedFound.linkedin[0] || "",
  };

  // Cache the results for future requests
  await cache.save(socialLinks, "json");
  // console.log(`Cached social links for ${origin}`, socialLinks);

  return socialLinks;
}
