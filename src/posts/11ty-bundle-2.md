---
title: The 11ty Bundle - Issue 2
date: 2023-04-03
tags:
  - 11ty
  - 11ty Bundle
description: An occasional bundle of Eleventy releases, blog posts, sites, and resources.
keywords: eleventy, newsletter, roundup, news
image:
  source: "11ty-bundle-2.jpg"
  alt: "an AI-generated image of the number eleven"
  caption: "An AI-generated image of the number eleven"
pageID: bundle
bundleIssue: 2
---

{% include 'partials/bundlehead.md' %}

> _UPDATED: 2023-04-07 - Releases and Blog posts are now sorted in reverse chronological order. I've also added links to the sites of the home (or about) pages of the blog writers. I've updated this and subsequent posts to use Airtable as a data source to ease the process of preparing new issues. This will also make it easier to support user-supplied content down the road._

## Recent releases

_Newest listed first_

{% for item in airtableitems | getBundleItems(bundleIssue, "release") %}

- [{{ item.Title }}]({{ item.Link }}), {{ item.Date }}

{% endfor %}

## Blog posts: from Discord, Mastodon, and around the web

_Newest listed first_

{% for item in airtableitems | getBundleItems(bundleIssue, "blog post") %}

- [{{ item.Title }}]({{ item.Link }}) by [{{ item.Author }}]({{ item.AuthorLink }}), {{ item.Date }}

{% endfor %}

## Some nice art and photography sites using Eleventy

{% for item in airtableitems | getBundleItems(bundleIssue, "site") %}

- [{{ item.Title }}]({{ item.Link }}), {{ item.Date }} by [{{ item.Author }}]({{ item.AuthorLink }})

{% endfor %}

{% include 'partials/bundlefoot.md' %}
