---
bundleIssue: 20
eleventyComputed:
  title: "Issue {{ bundleIssue }} - A safe landing on Google Sheets...7 million npm downloads...11tybundle site posts arrive in the docs...And 10 posts and 7 sites to see."
  description: "Welcome to Issue {{ bundleIssue }} of the 11ty Bundle."
date: 2023-10-29
tags:
  - 11ty Bundle
---

## A safe landing on Google Sheets

If you recall from the last issue, I had moved the data that drives the site from Airtable to Google Sheets. Since that time, with the help of @Aankhen, a prolific helper on the Discord server, I successfully moved the site to use the Google Sheets API to get the data directly at build time, rather than the method I was using. This is a much cleaner solution and I'm very happy with it. The workflow is better than what I had with Airtable and I'm back to having nightly builds of the site.

_[UPDATE: 10-31-2023]: I wrote about how I got this working [here](https://www.bobmonsour.com/posts/scratch-that-use-google-sheets-api/)._

## 7 million npm downloads

[Zach announced](https://www.11ty.dev/blog/seven-million/) yet another major milestone of Eleventy usage. Eleventy passed seven million lifetime downloads!

## 11tybundle site posts arrive in the docs

And if that wasn't enough news, Zach reached out to me and asked if I'd be willing to generate a json file of the posts in the [CMS category](/categories/cms/) for use on the new CMS page in the docs. I was happy to do so and you can see [the results here](https://www.11ty.dev/docs/cms/#from-the-community). We hope to be adding more of these for selected other pages in the docs. So now you have two places where you'll find the posts that are included here on the site.

## 10 posts and 7 sites to see

Well, I guess the heading says it all for this section.

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
