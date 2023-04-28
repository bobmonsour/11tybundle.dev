---
title: Issue 4
date: 2023-04-18
tags:
  - 11ty Bundle
description: Welcome to Issue 4 of The 11ty Bundle, an occasional bundle of Eleventy releases, blog posts, sites, and resources.
keywords: eleventy, newsletter, roundup, news
image:
  source: "11ty-bundle-4.jpg"
  alt: "an AI-generated image of the number eleven"
  caption: "An AI-generated image of the number eleven"
pageId: bundle
bundleIssue: 4
---

> _Sneak peek: The next issue will be a SPECIAL issue focused on posts that discuss migration from another static site generator or platform to Eleventy._

> _AND...now for an unpaid promo: [Bryan Robinson](/authors/bryan-robinson/) has written a new book called "Eleventy by Example: Learn to create powerful, performant websites with a static-first mentality." It's available for pre-order now and will be released on June 9th. [Check it out!](https://www.amazon.com/Eleventy-Example-performant-static-first-mentality-ebook/dp/B0BTPQW42M)_

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
