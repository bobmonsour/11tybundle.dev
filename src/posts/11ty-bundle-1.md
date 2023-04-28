---
title: Issue 1
date: 2023-03-28
tags:
  - 11ty Bundle
description: This is the first of an occasional roundup of Eleventy releases, related blog posts, and resources.
keywords: eleventy, newsletter, roundup, news
image:
  source: "11ty-bundle-1.jpg"
  alt: "an AI-generated image of the number eleven"
  caption: "An AI-generated image of the number eleven"
pageId: bundle
bundleIssue: 1
---

Why, you ask?

I felt that there was so much happening in the world of Eleventy as I watch the Discord Server, Mastodon, and my RSS reader, it seemed appropriate to step back and put together a curated version of what I'm seeing in the hopes that others might find this useful.

Who knows, perhaps this belongs in an Eleventy newsletter of some sort. If you think so, feel free to drop me a line at bob dot monsour at gmail.

> _UPDATED: 2023-04-18 - I have added descriptions to each of the blog post entries. These are extracted from the blog post page itself as provided by the post's author._

> _UPDATED: 2023-04-07 - Releases and Blog posts are now sorted in reverse chronological order. I've also added links to the sites of the home (or about) pages of the blog writers. I've updated this and subsequent posts to use Airtable as a data source to ease the process of preparing new issues. This will also make it easier to support user-supplied content down the road._

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

## Built with Eleventy

{% for item in airtableitems | getBundleItems(bundleIssue, "site") %}

- [{{ item.Title }}]({{ item.Link }}){% if item.Author %} by [{{ item.Author }}]({{ item.AuthorLink }}) {% endif %}

{% endfor %}

{% include 'partials/bundlefoot.njk' %}
