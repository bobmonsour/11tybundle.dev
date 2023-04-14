---
title: The 11ty Bundle - Issue 3
date: 2023-04-11
tags:
  - 11ty
  - 11ty Bundle
description: An occasional bundle of Eleventy releases, blog posts, sites, and resources.
keywords: eleventy, newsletter, roundup, news
image:
  source: "11ty-bundle-3.jpg"
  alt: "an AI-generated image of the number eleven"
  caption: "An AI-generated image of the number eleven"
pageID: bundle
bundleIssue: 3
---

{% include 'partials/bundlehead.md' %}

> _Since there are so manu different topics covered the blog posts, I may start creating bundles that are focused on a particular topic; either that, or organize the list of posts by topic. And maybe, just maybe, I'll move all of this to a dedicated site (yes, I've already purchased a domain)._

## Recent releases

_Newest listed first, click the links to see the release notes_

{% for item in airtableitems | getBundleItems(bundleIssue, "release") %}

- [{{ item.Title }}]({{ item.Link }}), {{ item.Date }}

{% endfor %}

## Blog posts and other resources from around the web

_Newest listed first_

{% for item in airtableitems | getBundleItems(bundleIssue, "blog post") %}

- [{{ item.Title }}]({{ item.Link }}) by [{{ item.Author }}]({{ item.AuthorLink }}), {{ item.Date }}

{% endfor %}

## Built with Eleventy

{% for item in airtableitems | getBundleItems(bundleIssue, "site") %}

- [{{ item.Title }}]({{ item.Link }}), {{ item.Date }} by [{{ item.Author }}]({{ item.AuthorLink }})

{% endfor %}

{% include 'partials/bundlefoot.md' %}
