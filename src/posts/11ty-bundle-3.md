---
title: Issue 3
date: 2023-04-11
tags:
  - 11ty Bundle
description: Welcome to Issue 3 of The 11ty Bundle, an occasional bundle of Eleventy releases, blog posts, sites, and resources.
keywords: eleventy, newsletter, roundup, news
image:
  source: "11ty-bundle-3.jpg"
  alt: "an AI-generated image of the number eleven"
  caption: "An AI-generated image of the number eleven"
pageId: bundle
bundleIssue: 3
---

> _UPDATED: 2023-04-18 - I have added descriptions to each of the blog post entries. These are extracted from the blog post page itself as provided by the post's author._

> _Since there are so many different topics covered the blog posts, I may start creating bundles that are focused on a particular topic; either that, or organize the list of posts by topic. And maybe, just maybe, I'll move all of this to a dedicated site (yes, I've already purchased a domain)._

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
