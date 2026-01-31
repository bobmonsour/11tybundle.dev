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
│   ├── _config/filters/       # 16 custom Nunjucks filters
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
│   ├── rssfeeds/              # 5 Atom feed templates
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

16 custom Nunjucks filters in `content/_config/filters/`:

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

## RSS Feeds

Five Atom feeds in `content/rssfeeds/`:

1. `/feed.xml` — Blog issues (latest 20)
2. `/firehosefeed.xml` — All blog posts
3. `/sitesfeed.xml` — Sites added to showcase
4. `/releasefeed.xml` — Eleventy releases
5. `/showcasefeed.xml` — Recent showcase additions

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
