---
bundleIssue: 2
eleventyComputed:
  title: "Issue {{ bundleIssue }}"
  description: "Welcome to Issue {{ bundleIssue }} of the 11ty Bundle, an occasional bundle of Eleventy releases, blog posts, sites, and resources."
date: 2023-04-03
tags:
  - 11ty Bundle
keywords: eleventy, 11ty, newsletter, roundup, news
image:
  source: "11tybundle-dev.jpg"
  alt: "the number 11 as photographed by David Monje on Unsplash"
pageId: bundle
draft: false
---

> _UPDATED: 2023-04-18 - I have added descriptions to each of the release and blog post entries. These are extracted from the release or blog post page itself as provided by the author._

> _UPDATED: 2023-04-07 - Releases and Blog posts are now sorted in reverse chronological order. I've updated this and subsequent posts to use Airtable as a data source to ease the process of preparing new issues. This will also make it easier to support user-supplied content down the road._

## Recent releases

{% set itemType = "release" %}
{% include 'partials/bundleitems.njk' %}

## Posts from around the web

{% set itemType = "blog post" %}
{% include 'partials/bundleitems.njk' %}

## Some nice art and photography sites using Eleventy

{% set itemType = "site" %}
{% include 'partials/bundleitems.njk' %}
