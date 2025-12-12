# Project Overview

11tybundle.dev is an Eleventy-based static site aggregating 1500+ blog posts from 350+ authors about Eleventy, organized into categories, author pages, and a searchable "firehose". Data is fetched from a GitHub-hosted JSON file and heavily processed at build time.

## Architecture & Data Flow

**Data Pipeline**: GitHub JSON → bundledata.js → Nunjucks templates → Static HTML

- Source: `bundledb.json` hosted at `bobmonsour/11tybundledb` (fetched via @11ty/eleventy-fetch with 1-day cache)
- Processing: [content/\_data/bundledata.js](content/_data/bundledata.js) transforms raw data into structured arrays (firehose, authorList, categoryList, siteList, releaseList, startersList)
- Each item type (blog posts, sites, releases, starters) gets enriched with favicons, descriptions, RSS links, social links using async filters
- Templates consume processed data from `bundledata` global data object

**Key Design Decisions**:

- **Sequential enrichment**: Enrichment functions (enrichFirehose, enrichSiteList, etc.) use sequential `for` loops instead of `Promise.all` to avoid timeout cascades when cache is empty
- **Map-based lookups**: Authors and categories use `Map<name, object>` for O(1) lookups vs O(n) array.find()
- **Pre-computed flags**: `isYoutube` flag computed once during rawFirehose creation to avoid repeated URL parsing
- **Negative caching**: Failed favicon/description/RSS fetches are cached as `null` to prevent retry storms

## Critical Workflows

**Development Build**:

```bash
npm run rs  # Clean build with Pagefind search indexing and live server
```

**Production Build**:

```bash
npm run build      # Build site to _site/
npm run postbuild  # Run Pagefind indexing (happens automatically in 'deploy')
npm run deploy     # Clean, build, index, deploy to Cloudflare Pages
```

**Quick Development** (no search):

```bash
npm run startns  # Build and serve without cleaning cache
```

**Local Testing with Subset**:
Comment out remote fetch in [bundledata.js](content/_data/bundledata.js#L50-62), uncomment local import to use `bundledbtest2.json`

## Project-Specific Patterns

**Async Filters in Nunjucks**:
Filters that fetch external data (getFavicon, getDescription, getRSSLink, getSocialLinks) are registered as async. In Nunjucks templates, use them with `await`:

```njk
{{ post.Link | getFavicon | await }}
```

Filter definitions use callback pattern: `(input, callback) => { callback(null, result) }`

**Directory Data Cascade**:

- [content/content.11tydata.js](content/content.11tydata.js): Applies `base.njk` layout to all content
- [content/rssfeeds/rssfeeds.11tydata.js](content/rssfeeds/rssfeeds.11tydata.js): Overrides with `layout: false` for RSS XML output
- Use directory data files to override parent settings when needed

**Pagefind Search Integration**:

- Search UI initialized in [base.njk](content/_layouts/base.njk) with keyboard shortcut handler ('/' key)
- Indexing runs post-build via `npx pagefind --site _site`
- Use `data-pagefind-body` on main content containers and `data-pagefind-ignore` on navigation/metadata sections
- Post titles in firehose use id attributes for anchor linking from search results

**Bundle System for Assets**:
CSS/JS bundled via Eleventy's `{% css %}`, `{% js %}` paired shortcodes with Terser (JS) and cssnano (CSS) transforms. CSS preloaded with async loading pattern in head.

## Coding Standards

**JavaScript**: camelCase for variables/functions. ES modules (import/export). Use strict equality (===). Async/await for promises.

**CSS**: Modern techniques only - Grid/Flexbox layout, logical properties (`margin-inline-start` not `margin-left`), CSS nesting supported.

**Accessibility**: Semantic HTML, skip links, proper heading hierarchy, alt text on images.

## Key Files & Directories

- [eleventy.config.js](eleventy.config.js): Main Eleventy config, plugin setup, bundle definitions
- [content/\_data/bundledata.js](content/_data/bundledata.js): Core data processing logic (592 lines)
- [content/\_config/filters/](content/_config/filters/): 16 filter modules, centrally exported via index.js
- [content/\_layouts/base.njk](content/_layouts/base.njk): HTML wrapper with font preloading, CSS bundling, Pagefind setup
- [public/css/](public/css/): Source CSS files (bundled at build time)
- [package.json](package.json): Scripts reference (Node 22.15.0 required)

## External Dependencies & APIs

- **@11ty/eleventy-fetch**: HTTP caching layer (1-day for bundleDB, 30-day for favicons)
- **Octokit**: GitHub API access for starter repo metadata (requires GITHUB_TOKEN env var)
- **Cheerio**: HTML/XML parsing for favicon/social link extraction
- **Pagefind**: Client-side search indexing (post-build step)
- **Cloudflare Pages**: Deployment target (via wrangler)

## Common Pitfalls

- Don't use `Promise.all` for enrichment functions - causes timeouts with empty cache
- Always use `await` in templates when calling async filters
- Don't forget `crossorigin` attribute on font preloads
- RSS feeds need `layout: false` via directory data file
- Cache files in `.cache/` and `_site/` should be in .gitignore
