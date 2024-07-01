---
bundleIssue: 19
eleventyComputed:
  title: "Issue {{ bundleIssue }} - From Airtable to Google Sheets...Clean up of broken links...And 8 posts and 5 sites to see."
  description: "Welcome to Issue {{ bundleIssue }} of the 11ty Bundle."
date: 2023-10-19
tags:
  - 11ty Bundle
---

I did some work under the hood here, moving the data source for the site from Airtable to Google Sheets. I [wrote it up on my personal site](https://www.bobmonsour.com/posts/from-airtable-to-google-sheets/). While my first cut at this was extract a json form of the Google Sheet data that exactly matched what I was getting from the Airtable API, it has been suggested that I make use of the Google Sheets API to get the data directly at build time, rather than the method I'm now using. I'll be looking into that as it would result in a simpler build workflow.

As is often the case with content heavy sites that are based on the content of other sites, links break for one reason or another. I had been using the npm package [check-html-links](https://www.npmjs.com/package/check-html-links) to check that all of the internal links work properly, but I had not recently done a check of the external links...and there are a lot of them. I did a run of [dead link checker](https://www.deadlinkchecker.com/) and it found a handful. These were mostly to sites that either no longer existed or blog posts that had moved or had been removed. As of right now, things are clean and I should integrate this into my site validation process...or at least do it occasionally.

Until next time...

<div id="releases"></div>

## Recent releases

{% set itemType = "release" %}
{% include 'partials/bundleitems.njk' %}

<div id="newposts"></div>

## Posts from around the web since the last Bundle issue

{% set itemType = "blog post" %}
{% include 'partials/bundleitems.njk' %}

<div id="sites"></div>

## Built with Eleventy

Here are the new sites to see. If you want to see more sites, check out the [Eleventy Leaderboards](https://www.11ty.dev/speedlify/).

{% set itemType = "site" %}
{% include 'partials/bundleitems.njk' %}
