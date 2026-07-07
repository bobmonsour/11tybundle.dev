#!/usr/bin/env bash
# Prints the 11tybundle.dev usage summary at session start (SessionStart hook).
# Output is JSON with a systemMessage field, displayed to the user in the UI.

read -r -d '' MESSAGE <<'EOF'
11tybundle.dev — a community resource for the Eleventy ecosystem

WHAT IT IS
An Eleventy static site showcasing the 11ty community: 1,600+ curated blog
posts from 400+ authors, 1,400+ showcase site screenshots, 50+ categories, and
monthly "Bundle" issues. It builds from a JSON database in the sibling
../11tybundledb repo (written by the Socially Bundled Flask app), uses Pagefind
for search, and deploys to Cloudflare Pages.

WORKFLOW
1. Serve locally: npm start  (or npm run latest for the fast latest-issue set)
2. Edit templates/data under content/; a GITHUB_TOKEN in .env is needed for
   starter metadata.
3. Deploy: npm run deploy  (build, Pagefind index, then wrangler to Cloudflare).
EOF

jq -nc --arg m "$MESSAGE" '{systemMessage: $m}'
