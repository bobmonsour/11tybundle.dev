---
bundleIssue: 1
eleventyComputed:
  title: "Issue {{ bundleIssue }}"
  description: "This is the first of an occasional roundup of Eleventy releases, related blog posts, and resources."
date: 2023-03-28
tags:
  - 11ty Bundle
pageId: bundle
draft: false
---

Why?, you ask.

I felt that there was so much happening in the world of Eleventy as I watch the Discord Server, Mastodon, and my RSS reader, it seemed appropriate to step back and put together a curated version of what I'm seeing in the hopes that others might find this useful.

Who knows, perhaps this belongs in an Eleventy newsletter of some sort. If you think so, feel free to drop me a line at bob dot monsour at gmail.

> _UPDATED: 2023-04-18 - I have added descriptions to each of the blog post entries. These are extracted from the blog post page itself as provided by the post's author._

> _UPDATED: 2023-04-07 - Releases and Blog posts are now sorted in reverse chronological order. I've updated this and subsequent posts to use Airtable as a data source to ease the process of preparing new issues. This will also make it easier to support user-supplied content down the road._

## Recent releases

{% set itemType = "release" %}
{% include 'partials/bundleitems.njk' %}

## Posts from around the web

{% set itemType = "blog post" %}
{% include 'partials/bundleitems.njk' %}

## Built with Eleventy

{% set itemType = "site" %}
{% include 'partials/bundleitems.njk' %}
