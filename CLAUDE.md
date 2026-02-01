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

The sibling `11tybundledb` repository contains the JSON database, populated by the `dbtools` sibling project. This site reads from it at build time.

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

| Filter | Purpose |
|--------|---------|
| `blogTitleToList` | Parse bundle issue title into list of highlights |
| `countLabel` | Pluralized labels ("1 post" vs "5 posts") |
| `formatPostDate`, `formatItemDate`, `formatFirehoseDate` | Date formatting |
| `getBundleItems` | Extract releases/posts/sites for a bundle issue |
| `getBundleTimestamp` | Cache-busting hash from file mtimes |
| `genFaviconHtml` | Generate SVG from favicon data |
| `getScreenshotpath` | Map site link to screenshot filename |
| `getAuthorRecord` | Look up author metadata by name |
| `postsByAuthor` | Filter posts for a specific author |
| `postsInCategory` | Filter posts for a specific category |
| `getIssueCounts` | Count items in a bundle issue |
| `getOrigin`, `getHostname` | URL parsing |
| `getAuthorIcons`, `getSocialIcons` | Social media icon SVGs |
| `singleComma` | Number formatting (1,234) |
| `toSocialHandle` | Convert social profile URL to handle format |

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

- **11tybundledb/** — The JSON database repository. This site reads from it; dbtools writes to it.
- **dbtools/** — CLI scripts for managing the database (adding entries, screenshots, validation).
- **Data flows one way:** dbtools → 11tybundledb → 11tybundle.dev

## Insights Page (Planned)

A new `/insights/` page will display data-driven visualizations about the 11tybundle.dev ecosystem — growth trends, category popularity, author contributions, and data quality. This section documents the architecture decisions and implementation plan so a future Claude Code session can build it.

### Architecture Decisions

- **Pre-computed data:** A refactored version of `generate-insights.js` (in the sibling `dbtools/` repo) computes all metrics from `bundledb.json` and `showcase-data.json`, then writes a single JSON file to `content/_data/insightsdata.json` in this repo.
- **Eleventy rendering:** An `content/insights/index.njk` template reads `insightsdata` from the data cascade and renders the page using the site's existing `base.njk` layout, design tokens, and CSS patterns.
- **Build-time SVG charts:** Charts are inline SVGs generated at build time via Eleventy filters or shortcodes. SVG fills and strokes reference CSS custom properties so they automatically adapt to light/dark mode. No client-side JavaScript for charts.
- **Periodic generation:** The data script runs on demand (not on every Eleventy build). The JSON file is committed to the repo and updated whenever the database changes significantly.

### What Exists Today (in dbtools)

The `dbtools/generate-insights.js` script currently produces 4 chart visualizations:

1. **Cumulative entry growth** — line chart showing blog posts, sites, and releases over time
2. **Category growth** — line chart of the top categories growing over time
3. **Top 15 categories** — horizontal bar chart ranking categories by post count
4. **Author contribution ranges** — vertical bar chart showing distribution of author post counts (1 post, 2–5 posts, 6–10 posts, etc.)

It also produces:

- **Stat cards** — total entries, authors, categories, showcase sites, etc.
- **Prolific author lists** — authors grouped by contribution tier
- **Missing data sections** — entries with missing descriptions, RSS links, favicons, etc. (these will be included on the public page with collapsible `<details>` elements so developers can see how to improve their sites)

Currently outputs standalone HTML + CSS to `dbtools/insights/`. The refactoring will change this to structured JSON output.

### Implementation Phases

1. **Refactor data generation** *(complete)* — `generate-insights.js` in dbtools outputs structured JSON to `content/_data/insightsdata.json`. See "Data File Structure" below for the actual schema.

2. **Create the template** — Add `content/insights/index.njk` using `base.njk` layout. Structure: stat cards section, growth charts section, category charts section, author charts section, missing data section (collapsible).

3. **Create chart filters** — Add Eleventy filters (in `content/_config/filters/`) for SVG chart generation:
   - `lineChart` — renders a multi-series line chart SVG from data points
   - `barChart` — renders horizontal or vertical bar chart SVG
   - All SVGs use CSS custom properties for colors, not hardcoded values

4. **Create insights CSS** — Add `insights.css` using the site's design tokens (see integration points below). Include it via the CSS bundler in a `content/bundles/` file or inline in the template.

5. **Add accessibility** — SVG `role="img"` with `aria-label` and inner `<title>`/`<desc>` elements, visually hidden data tables as screen reader alternatives, dash/pattern differentiation for color-blind users, proper heading hierarchy.

6. **Add navigation** — Link to `/insights/` from the site footer (and optionally the header nav).

### Design Token Integration

The insights page must use the site's existing design system, not hardcoded values.

**Colors (OKLch system):** The site defines 7 hues (primary through septenary) each with 9 lightness/chroma steps. Map chart data series to existing section hues:

| Data Series | Hue | Rationale |
|-------------|-----|-----------|
| Blog posts (line chart) | `--senary-*` | Blog section uses senary hue |
| Showcase sites | `--quaternary-*` | Showcase section uses quaternary hue |
| Releases | `--secondary-*` | Releases section uses secondary hue |
| Categories (bars) | `--categories-colour-*` | Existing semantic tokens |
| Authors | `--authors-colour-*` | Existing semantic tokens |

Use step-5 variants (e.g., `--senary-5`) for standard weight and step-7/step-8 for emphasis. In SVGs:

```css
/* Example: SVG elements reference custom properties */
.chart-line-blog { stroke: var(--senary-5); }
.chart-line-showcase { stroke: var(--quaternary-5); }
.chart-line-releases { stroke: var(--secondary-5); }
```

**Typography:** Use the site's fluid type scale (`--step-0` through `--step-5`) with `--font-display-bold` (Optima) for chart titles and `--font-default` (Candara/Noto Sans) for labels and body text.

**Spacing:** Use Utopia fluid tokens (`--space-s`, `--space-m`, `--space-l`, etc.) and paired tokens (`--space-s-m`, `--space-m-l`) for responsive rhythm.

**Layout:** Use `.container` wrapper class and CSS Grid, matching the site's body grid structure (header/main/footer). `--grid-max-width: 85.25rem` and `--grid-gutter` for consistent alignment.

**Theming:** The site uses `data-theme="light"` / `data-theme="dark"` on `<html>` (not `prefers-color-scheme` media queries). All color references in SVGs and CSS must use the CSS custom properties so they respond to the theme toggle. The current standalone insights page uses `@media (prefers-color-scheme: dark)` which must be converted to the `[data-theme="dark"]` selector pattern.

### Accessibility Requirements

- Every SVG chart: `role="img"`, `aria-label` with a meaningful summary, `<title>` and `<desc>` child elements
- Hidden data tables (using the site's `.visually-hidden` class) after each chart, containing the same data in tabular form for screen readers
- Don't rely on color alone — add dash patterns (`stroke-dasharray`) or direct labels to differentiate data series
- Ensure all text in SVGs meets WCAG AA contrast ratios against both light and dark theme backgrounds
- Use the site's existing focus styles (`outline: 2px dotted var(--primary-5)`) for any interactive elements (collapsible sections)
- Proper heading hierarchy within the page (h1 for page title, h2 for sections, h3 for individual charts)

### Data File Structure (insightsdata.json)

This file is generated by `dbtools/generate-insights.js` and committed to the repo. It contains pre-computed data points organized by visualization:

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
      "posts": [{ "title": "...", "link": "..." }, ...]
    }
  }
}
```

Key differences from the original plan:

- **`stats`** has breakdown fields (`blogPosts`, `sites`, `releases`, `prolificAuthorCount`) instead of `totalCategories`/`totalStarters`
- **`cumulativeGrowth`/`categoryGrowth`** use `months` key (not `labels`), and data starts from 2018-07
- **`siteJump`** flags a large one-time showcase import (for annotation on the growth chart)
- **`milestones`** marks Eleventy version releases and site launch for chart annotations
- **`prolificAuthors`** is a flat sorted array with `name`, `site`, `count` (not tiered)
- **`missingData`** has four sections (`rssLink`, `favicon`, `authorDescription`, `blogDescription`), each with `count`, `percentage`, and an `authors` or `posts` array

### Responsive Considerations

- Charts should be fluid width (100% of container) with a reasonable `viewBox` aspect ratio
- On mobile (`< 768px`): stack everything vertically, consider simplifying axis labels or rotating them
- Bar chart labels may need truncation or wrapping on narrow viewports
- Stat cards should reflow from a grid to a single column on mobile
