# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**11tybundle.dev** is a community resource website showcasing Eleventy (11ty) blog posts, sites, releases, and starter projects. It features 1,600+ curated blog posts from 400+ authors, 1,400+ showcase site screenshots, 50+ content categories, and monthly "Bundle" issues documenting the Eleventy ecosystem.

The site was redesigned in late 2025/early 2026 with a fresh visual identity, designed collaboratively with [Damian Walsh](https://damianwalsh.co.uk/).

ES modules throughout (`"type": "module"` in package.json). Requires Node.js 22+.

## Tech Stack

- **Static Site Generator:** Eleventy 4.0.0-alpha.6
- **Template Engine:** Nunjucks (.njk)
- **CSS:** PostCSS with cssnano, bundled via Eleventy's bundler plugin
- **Hosting:** Cloudflare Pages (Wrangler deployment)
- **Search:** Pagefind (static search, indexed post-build)
- **Image Optimization:** @11ty/eleventy-img (WebP + JPEG)
- **GitHub Integration:** Octokit REST API for starter repo metadata
- **Caching:** @11ty/eleventy-fetch with configurable durations

## Running

```bash
npm start          # Dev server with incremental builds
npm run latest     # Dev server using latest-issue-only dataset (faster)
npm run build      # Production build
npm run postbuild  # Pagefind indexing (runs automatically after build)
npm run deploy     # Full pipeline: build + Pagefind + upload to Cloudflare
npm run clean      # Remove _site output directory
npm run debug      # Verbose Eleventy debug output
npm run perf       # Performance benchmarking
```

`npm run latest` uses `USE_LATEST_DATA=true` to build from `bundledb-latest-issue.json` instead of the full database — useful for fast iteration on template/CSS changes.

## Environment

Requires a `GITHUB_TOKEN` in `.env` for Octokit (fetching starter repo metadata like stars, last commit, Eleventy version).

## Directory Structure

```
11tybundle.dev/
├── content/                    # Eleventy input directory
│   ├── _config/filters/       # 17 custom Nunjucks filters
│   ├── _data/                 # Data cascade (async JS modules)
│   │   ├── bundledata.js      # Main data processor (builds all derived data)
│   │   ├── showcasedata.js    # Filters showcase JSON from sibling repo
│   │   ├── cacheconfig.js     # Cache duration and timeout settings
│   │   ├── site.js            # Global site metadata
│   │   ├── pfweights.js       # Pagefind search result weights
│   │   └── linkstodocs.json   # Category-to-11ty-docs mapping
│   ├── _includes/partials/    # 12 Nunjucks component partials
│   ├── _layouts/              # base.njk, post.njk, prose.njk
│   ├── blog/{year}/           # Monthly bundle issue posts (markdown)
│   ├── authors/               # Dynamic author pages (pagination)
│   ├── categories/            # Dynamic category pages (pagination)
│   ├── firehose/              # All posts, paginated by year
│   ├── insights/              # Data-driven ecosystem visualizations
│   ├── showcase/              # Site screenshot grid
│   ├── bundles/               # CSS/JS bundle definitions (4 files)
│   ├── starters/              # Starter project listings
│   ├── rssfeeds/              # 5 Atom/RSS feed templates + 1 JSON Feed
│   ├── api/                   # Category JSON API endpoints
│   └── index.njk              # Homepage
├── public/                    # Static assets (pass-through copy)
│   ├── css/                   # 16 CSS files (fonts, variables, reset, etc.)
│   ├── js/                    # 10 JS files (theme, search, UI)
│   └── fonts/                 # Custom fonts (Nimbus Mono, Optima)
├── eleventy.config.js         # Main Eleventy configuration
├── wrangler.toml              # Cloudflare Pages configuration
└── .env                       # GitHub token (gitignored)
```

## Data Flow

**Primary flow:** `../11tybundledb/bundledb.json` → `bundledata.js` → Nunjucks templates → HTML/RSS

The sibling `11tybundledb` repository contains the JSON database, populated by the Socially Bundled editorial app (`~/Dropbox/Docs/Sites/social-posting/`, a local-only Flask app). This site reads from it at build time.

### Files read from `../11tybundledb/`

- `bundledb.json` — Main database (all entries)
- `bundledb-latest-issue.json` — Current issue only (used with `USE_LATEST_DATA=true`)
- `showcase-data.json` — Screenshot metadata for all showcase sites
- `showcase-data-latest-issue.json` — Current issue showcase entries

### bundledata.js (core data processor)

This module does the heavy lifting at build time:

1. Loads and validates all entries from bundledb.json
2. Generates the firehose (all blog posts in descending date order)
3. Builds author list (deduplicated, with post counts)
4. Enriches starters with GitHub metadata (stars, last commit, Eleventy version)
5. Builds category lists with post counts
6. Paginates firehose by year
7. Selects random recent authors for homepage spotlight

Returns: `bundleRecords`, `firehose`, `pagedFirehose`, `firehoseYears`, `releaseList`, `siteList`, `starters`, `startersByStars`, `authors`, `authorsByCount`, `categories`, `categoriesByCount`, and various counts.

## Database Schema

Each entry in bundledb.json has a `Type` field: `"blog post"`, `"site"`, `"release"`, or `"starter"`.

- **All types:** Issue, Type, Title, Link, Date, formattedDate
- **Blog posts add:** Author, slugifiedAuthor, AuthorSite, AuthorSiteDescription, socialLinks, favicon, rssLink, Categories (array), description
- **Sites add:** description, favicon
- **Starters add:** description; enriched at build time with Stars, LastUpdated, Version, Owner, OwnerUrl
- **Optional:** Skip (boolean, excludes from generation), leaderboardLink

Entries with `Skip: true` are excluded from the site build.

### Slugification

Author and title slugs are generated by a Python port of `@sindresorhus/slugify` (v3) in `social-posting/services/slugify.py` when entries are saved through the Socially Bundled editor, and stored as `slugifiedAuthor` and `slugifiedTitle` fields in the database. These slugs must be ASCII-only — the library transliterates accented characters (e.g., `é`→`e`, `ö`→`oe`). Older entries created when the JS library preserved non-ASCII characters caused 404s on Cloudflare Pages and were repaired by a one-time migration.

## Key Patterns

- **Data-driven pages** — Authors, categories, and firehose pages are all generated via Eleventy pagination from bundledata.js output
- **Computed front matter** — Blog posts use `eleventyComputed` for dynamic titles and descriptions
- **CSS/JS bundling** — Defined via Nunjucks `{% css %}` / `{% js %}` blocks in `content/bundles/*.njk`, compiled with PostCSS/cssnano
- **Cache busting** — Bundle URLs include a hash derived from file modification times (`getBundleTimestamp` filter)
- **Icon system** — Inline SVG sprite in `partials/icons.njk`, referenced as `#icon-{name}`
- **Theme toggle** — Dark/light mode; `theme.js` loaded in `<head>` (not as module) to prevent FOUC
- **Conditional loading** — Blog JS bundle only loads when `pageHasCode` or `youtubeId` is set
- **Pagefind attributes** — `data-pagefind-body`, `data-pagefind-ignore`, `data-pagefind-sort` control search indexing

## Filters

17 custom Nunjucks filters in `content/_config/filters/`:

| Filter                                                   | Purpose                                          |
| -------------------------------------------------------- | ------------------------------------------------ |
| `blogTitleToList`                                        | Parse bundle issue title into list of highlights |
| `countLabel`                                             | Pluralized labels ("1 post" vs "5 posts")        |
| `formatPostDate`, `formatItemDate`, `formatFirehoseDate` | Date formatting                                  |
| `getBundleItems`                                         | Extract releases/posts/sites for a bundle issue  |
| `getBundleTimestamp`                                     | Cache-busting hash from file mtimes              |
| `genFaviconHtml`                                         | Generate SVG from favicon data                   |
| `getScreenshotpath`                                      | Map site link to screenshot filename             |
| `getAuthorRecord`                                        | Look up author metadata by name                  |
| `postsByAuthor`                                          | Filter posts for a specific author               |
| `postsInCategory`                                        | Filter posts for a specific category             |
| `getIssueCounts`                                         | Count items in a bundle issue                    |
| `getOrigin`, `getHostname`                               | URL parsing                                      |
| `getAuthorIcons`, `getSocialIcons`                       | Social media icon SVGs                           |
| `singleComma`                                            | Number formatting (1,234)                        |
| `toSocialHandle`                                         | Convert social profile URL to handle format      |

## RSS Feeds

Five Atom/RSS feeds and one JSON Feed in `content/rssfeeds/`:

1. `/feed.xml` — Blog issues (latest 20)
2. `/firehosefeed.xml` — All blog posts
3. `/sitesfeed.xml` — Sites added to showcase
4. `/releasefeed.xml` — Eleventy releases
5. `/showcasefeed.xml` — Recent showcase additions (RSS)
6. `/showcasefeed.json` — Recent showcase additions (JSON Feed v1.1), includes `_mastodon_account` and `_bluesky_account` handles when a showcase site matches a known author

## Deployment

Hosted on Cloudflare Pages. Configuration in `wrangler.toml`.

```bash
npm run deploy    # build → Pagefind index → wrangler deploy
npm run upload    # wrangler deploy only (skip rebuild)
```

## Caching

Configured in `content/_data/cacheconfig.js`:

- `bundleDB: "0s"` — Always fetch fresh database
- `starters: "0s"` — Always refresh starter metadata
- Most HTML fetches: `"1y"` (descriptions, favicons, RSS links, social links)
- Fetch timeouts: 3-5 seconds

Cache stored in `.cache/` directory (gitignored).

## Relationship to Sibling Projects

- **11tybundledb/** — The JSON database repository. This site reads from it at build time; the Socially Bundled app writes to it.
- **social-posting/** — The Socially Bundled Flask app at `~/Dropbox/Docs/Sites/social-posting/`. The editorial interface for managing the bundle: bundle-entry editor, social cross-posting, and database management. It generates `bundledb.json`, `showcase-data.json`, `insightsdata.json`, `issuerecords.json`, the latest-issue filtered data files, the chart CSVs, screenshots (`content/screenshots/`), and og-images (`content/og-images/`). It also drives the Run Latest and Deploy workflows for this site, and auto-commits/pushes `11tybundledb` after successful builds.
- **dbtools/** (`~/Dropbox/Docs/Sites/11tybundle/dbtools/`) — Legacy Node.js tooling; no longer used at runtime. Kept as a reference codebase for behavior the Flask app ports from.
- **Data flow:** Socially Bundled → 11tybundledb (and `content/og-images/`, `content/screenshots/`) → 11tybundle.dev build → Cloudflare Pages.

## Insights Page

The `/insights/` page displays data-driven visualizations about the 11tybundle.dev ecosystem — growth trends, prolific authors, and data completeness.

### Implementation

- **Template:** `content/insights/index.njk` uses the site's `base.njk` layout (set in `insights.11tydata.js` along with `bodyClass: "insights"` and `channelsPage: true`).
- **Page structure:** standard `.section` / `.container` blocks matching the rest of the site — a stats grid (`.directory__statsgrid` with `.directory__card.directory--stats`), two line charts (entry growth, author growth), a "prolific authors" `<details>` list, a data-completeness stats grid, and four collapsible `<details name="insights">` sections listing entries with missing RSS, favicon, author description, or post description data.
- **Styling:** all insights styles live in `public/css/channels.css` (under the `.insights` body class and `.insights-items-list` selectors), not a separate insights stylesheet. Color tokens `--insights-colour-1` through `--insights-colour-7` are defined in `variables.css` (mapped to `--primary-*`, with light/dark variants).
- **Charts:** rendered by the [`eleventy-plugin-uncharted`](https://www.npmjs.com/package/eleventy-plugin-uncharted) plugin via the `{% chart "<name>" %}` shortcode. Plugin configuration is in `eleventy.config.js` (dataDir `content/_data/charts`, cssPath `/css/uncharted.css`). Each chart is declared in the page's front matter `charts:` map, which references CSV files in `content/_data/charts/` (currently `entry-growth.csv` and `author-growth.csv`).
- **Data:** `content/_data/insightsdata.js` re-exports `../11tybundledb/insightsdata.json` (same sibling-repo pattern as `bundledata.js`). That JSON file is generated by `social-posting/services/insights.py` and provides the stat-card numbers, prolific authors list, and missing-data lists. The CSV files in `content/_data/charts/` are also produced by that service.
- **Interaction:** an inline `toggle` event listener scrolls open `.js-scroll-top` `<details>` elements into view. No client-side chart code.

> **Note:** `content/_config/filters/linechart.js` and `barchart.js` exist from an earlier prototype where charts were inline SVGs rendered by custom filters. The current page does not use them — chart rendering is handled entirely by the uncharted plugin. The filters can be removed if no future page needs them.

### Data File Structure (insightsdata.json)

Generated by `social-posting/services/insights.py`, lives at `../11tybundledb/insightsdata.json`. Top-level keys: `generatedDate`, `stats`, `entriesByYear`, `cumulativeGrowth`, `siteJump`, `milestones`, `categoryRanking`, `categoryGrowth`, `authorDistribution`, `prolificAuthors`, `missingData`. The current page consumes `stats`, `prolificAuthors`, `missingData`, and `generatedDate`; the chart series come from the CSV files (not directly from this JSON). Other keys (`categoryRanking`, `categoryGrowth`, `authorDistribution`, `siteJump`, `milestones`, `entriesByYear`) are produced but not currently rendered — they're available for future page additions.

```json
{
  "generatedDate": "2026-01-31T23:58:09.761Z",
  "stats": {
    "totalEntries": 3267,
    "blogPosts": 1638,
    "sites": 1434,
    "releases": 195,
    "totalAuthors": 482,
    "totalShowcase": 1447,
    "prolificAuthorCount": 61
  },
  "cumulativeGrowth": {
    "months": ["2018-07", "2018-08", ...],
    "series": {
      "blogPosts": [1, 1, ...],
      "sites": [0, 0, ...],
      "releases": [0, 0, ...]
    }
  },
  "siteJump": {
    "month": "2026-01",
    "amount": 790
  },
  "milestones": [
    { "month": "2022-01", "label": "v1.0.0", "type": "minor" },
    { "month": "2023-02", "label": "v2.0.0", "type": "minor" },
    { "month": "2023-05", "label": "11tybundle.dev launch", "type": "major" },
    { "month": "2024-10", "label": "v3.0.0", "type": "minor" }
  ],
  "categoryRanking": [
    { "name": "Configuration", "count": 252 },
    ...
  ],
  "categoryGrowth": {
    "months": ["2018-07", ...],
    "series": {
      "Configuration": [0, 0, ...],
      "Blogging": [0, 0, ...],
      ...
    }
  },
  "authorDistribution": [
    { "range": "1-2", "count": 332 },
    { "range": "3-5", "count": 89 },
    { "range": "6-10", "count": 38 },
    { "range": "11-20", "count": 15 },
    { "range": "21+", "count": 8 }
  ],
  "prolificAuthors": [
    { "name": "Raymond Camden", "site": "https://www.raymondcamden.com", "count": 105 },
    { "name": "Zach Leatherman", "site": "https://zachleat.com", "count": 82 },
    ...
  ],
  "missingData": {
    "totalAuthors": 482,
    "totalBlogPosts": 1638,
    "rssLink": {
      "count": 125,
      "percentage": 25.9,
      "authors": [{ "name": "...", "site": "..." }, ...]
    },
    "favicon": {
      "count": 46,
      "percentage": 9.5,
      "authors": [{ "name": "...", "site": "..." }, ...]
    },
    "authorDescription": {
      "count": 54,
      "percentage": 11.2,
      "authors": [{ "name": "...", "site": "..." }, ...]
    },
    "blogDescription": {
      "count": 96,
      "percentage": 5.9,
      "posts": [{ "title": "...", "link": "/categories/{category}/?bundleitem_highlight=#post-{date}-{slugifiedTitle}-{slugifiedAuthor}", "author": "...", "slugifiedAuthor": "..." }, ...]
    }
  }
}
```

Notes on specific fields:

- **`siteJump`** flags a large one-time showcase import (the 2026-01 jump from the 11ty Leaderboards). The current page mentions it in a footnote rather than as a chart annotation.
- **`milestones`** marks Eleventy version releases and the site launch — not currently annotated on the chart.
- **`prolificAuthors`** is a flat sorted array (`name`, `site`, `count`); the page renders authors with 5+ posts.
- **`missingData`** has four sections (`rssLink`, `favicon`, `authorDescription`, `blogDescription`), each with `count`, `percentage`, and an `authors` or `posts` array. `blogDescription.posts` entries include `author` and `slugifiedAuthor`, and `link` points to the post on a category page (using the first category) with a `bundleitem_highlight` query parameter and fragment ID, so the page can scroll and highlight the entry rather than send the visitor to the external site. Posts are sorted by author name, then title.

<!-- worklog:start -->
## Worklog

When wrapping up a session here (I say "done" / "wrap up"), or when I say "log this",
record a worklog entry to the projects registry — run from this directory so the slug
auto-detects:

    projects log-note "<one-sentence summary of what got done>
    Next: <the next step to resume from>"

This writes a dated entry to the project's Notes in the registry; it does not modify
this repo. Keep it to the summary + Next line — detail lives in git history.
<!-- worklog:end -->
