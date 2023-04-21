---
layout: post.njk
title: The 11ty Bundle - Issue 5
date: 2021-04-25
description: An occasional bundle of Eleventy releases, blog posts, sites, and resources.
keywords: eleventy, 11ty, newsletter, roundup, news
image:
  source: "11ty-bundle-dev.jpg"
  alt: "an address plate for house number 11"
permalink: /index.html
imageDir: src/assets/img/
tags: posts
pageId: bundle
bundleIssue: 5
---

<article class="post">

{% include 'partials/bundlehead.md' %}

## Recent releases

{% for item in airtableitems | getBundleItems(bundleIssue, "release") %}

- [{{ item.Title }}]({{ item.Link }}), {{ item.Date }}

{% endfor %}

## Blog posts and other resources from around the web

_Newest listed first_

{% for item in airtableitems | getBundleItems(bundleIssue, "blog post") %}

<div class="bundleitem">
<p class="bundleitem-link"><a href="{{ item.Link }}" target="_blank">{{ item.Title }}</a></p>
<p class="bundleitem-dateline">{% if item.Date %}{{ item.Date | formatItemDate }}{% endif %}{% if item.Categories %}, Categories: {% for item in airtableitems | getItemCategories(item.Link) | sort %}{% for category in item.Categories | sort %}<a href="/categories/{{category | slugify }}/">{{ category }}</a>&nbsp;&nbsp;{% endfor %}{% endfor %}{% endif %}</p>
<p class="bundleitem-description">{{ item.Link | getDescription | truncate(100) }}</p>{% endfor %}

## Built with Eleventy

This list is a little light this week, but not really...since all of the above blog posts are about migrating to Eleventy, all of them _should_ be sites that are "Built with Eleventy."

{% for item in airtableitems | getBundleItems(bundleIssue, "site") %}

- [{{ item.Title }}]({{ item.Link }}){% if item.Author %} by [{{ item.Author }}]({{ item.AuthorLink }}) {% endif %}

{% endfor %}

{% include 'partials/bundlefoot.md' %}

</article>
