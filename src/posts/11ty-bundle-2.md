---
title: Issue 2
date: 2023-04-03
tags:
  - 11ty Bundle
description: Welcome to Issue 2 of The 11ty Bundle, an occasional bundle of Eleventy releases, blog posts, sites, and resources.
keywords: eleventy, newsletter, roundup, news
image:
  source: "11ty-bundle-2.jpg"
  alt: "an AI-generated image of the number eleven"
  caption: "An AI-generated image of the number eleven"
pageId: bundle
bundleIssue: 2
---

> _UPDATED: 2023-04-18 - I have added descriptions to each of the release and blog post entries. These are extracted from the release or blog post page itself as provided by the author._

> _UPDATED: 2023-04-07 - Releases and Blog posts are now sorted in reverse chronological order. I've updated this and subsequent posts to use Airtable as a data source to ease the process of preparing new issues. This will also make it easier to support user-supplied content down the road._

## Recent releases

{% for item in airtableitems | getBundleItems(bundleIssue, "release") %}

<div class="bundleitem">
<p class="bundleitem-title"><a href="{{ item.Link }}" target="_blank">{{ item.Title }}</a></p>
<p class="bundleitem-description">{{ item.Link | getDescription | truncate(100) }}</p>
<p class="bundleitem-dateline">{% if item.AuthorLink %}<a href="/authors/{{ item.Author | slugify }}/">{{ item.Author }}</a> &middot; {% endif %}{% if item.Date %}{{ item.Date | formatItemDate }}{% endif %}</p>
</div>
{% endfor %}

## Blog posts from around the web

{% include 'partials/bundleposts.njk' %}

## Some nice art and photography sites using Eleventy

{% for item in airtableitems | getBundleItems(bundleIssue, "site") %}

- [{{ item.Title }}]({{ item.Link }}){% if item.Author %} by [{{ item.Author }}]({{ item.AuthorLink }}) {% endif %}

{% endfor %}

{% include 'partials/bundlefoot.njk' %}
