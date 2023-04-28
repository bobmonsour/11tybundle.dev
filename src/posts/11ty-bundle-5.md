---
title: Issue 5
date: 2023-04-25
tags:
  - 11ty Bundle
description: Welcome to Issue 5 of The 11ty Bundle, an occasional bundle of Eleventy releases, blog posts, sites, and resources. In this issue, we highlight stories of Eleventy adopters who have migrated from other static site generators, tools, and platforms.
keywords: eleventy, 11ty, newsletter, roundup, news
image:
  source: "11ty-bundle-5.jpg"
  alt: "an AI-generated image of the number eleven"
  caption: "An AI-generated image of the number eleven"
bundleIssue: 5
---

## Recent releases

{% for item in airtableitems | getBundleItems(bundleIssue, "release") %}

<div class="bundleitem">
<p class="bundleitem-title"><a href="{{ item.Link }}" target="_blank">{{ item.Title }}</a></p>
<p class="bundleitem-description">{{ item.Link | getDescription | truncate(100) }}</p>
<p class="bundleitem-dateline">{% if item.Author %}<a href="/authors/{{ item.Author | slugify }}/">{{ item.Author }}</a> &middot; {% endif %}{% if item.Date %}{{ item.Date | formatItemDate }}{% endif %}</p>
</div>
{% endfor %}

## Blog posts from around the web

{% include 'partials/bundleposts.njk' %}

## Built with Eleventy

This list is a little light this week, but not really...since all of the above blog posts are about migrating to Eleventy, all of them _should_ be sites that are "Built with Eleventy."

{% for item in airtableitems | getBundleItems(bundleIssue, "site") %}

- [{{ item.Title }}]({{ item.Link }}){% if item.Author and item.AuthorLink %} by [{{ item.Author }}]({{ item.AuthorLink }}){% elif item.Author %} by {{ item.Author }} {% endif %}
  {% endfor %}

{% include 'partials/bundlefoot.njk' %}
