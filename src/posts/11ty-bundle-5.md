---
title: The 11ty Bundle - Issue 5
date: 2023-04-25
tags:
  - 11ty Bundle
description: An occasional bundle of Eleventy releases, blog posts, sites, and resources.
specialNote: In this issue, we highlight stories of Eleventy adopters who have migrated from other static site generators, tools, and platforms.
keywords: eleventy, 11ty, newsletter, roundup, news
image:
  source: "11ty-bundle-5.jpg"
  alt: "an AI-generated image of the number eleven"
  caption: "An AI-generated image of the number eleven"
pageId: bundle
bundleIssue: 5
---

## Recent releases

{% for item in airtableitems | getBundleItems(bundleIssue, "release") %}

- [{{ item.Title }}]({{ item.Link }}), {{ item.Date }}

{% endfor %}

## Blog posts and other resources from around the web

_Newest first, post links open in a new tab, category links stay here_

{% include 'partials/bundleposts.njk' %}

## Built with Eleventy

This list is a little light this week, but not really...since all of the above blog posts are about migrating to Eleventy, all of them _should_ be sites that are "Built with Eleventy."

{% for item in airtableitems | getBundleItems(bundleIssue, "site") %}

- [{{ item.Title }}]({{ item.Link }}){% if item.Author %} by [{{ item.Author }}]({{ item.AuthorLink }}) {% endif %}

{% endfor %}

{% include 'partials/bundlefoot.md' %}
