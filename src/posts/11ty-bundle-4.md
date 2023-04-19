---
title: The 11ty Bundle - Issue 4
date: 2023-04-18
tags:
  - 11ty
  - 11ty Bundle
description: An occasional bundle of Eleventy releases, blog posts, sites, and resources.
keywords: eleventy, newsletter, roundup, news
image:
  source: "11ty-bundle-4.jpg"
  alt: "an AI-generated image of the number eleven"
  caption: "An AI-generated image of the number eleven"
pageID: bundle
bundleIssue: 4
---

{% include 'partials/bundlehead.md' %}

> _Sneak peek: The next issue will be a SPECIAL issue focused on posts that discuss migration from another static site generator or platform to Eleventy._

> _AND...now for an unpaid promo: [Bryan Robinson](https://bryanlrobinson.com/) has written a new book called "Eleventy by Example: Learn to create powerful, performant websites with a static-first mentality." It's available for pre-order now and will be released on June 9th. [Check it out!](https://www.amazon.com/Eleventy-Example-performant-static-first-mentality-ebook/dp/B0BTPQW42M)_

## Recent releases

{% for item in airtableitems | getBundleItems(bundleIssue, "release") %}

- [{{ item.Title }}]({{ item.Link }}), {{ item.Date }}

{% endfor %}

## Blog posts and other resources from around the web

_Newest listed first_

{% for item in airtableitems | getBundleItems(bundleIssue, "blog post") %}

- [{{ item.Title }}]({{ item.Link }}) by [{{ item.Author }}]({{ item.AuthorLink }}){% if item.Date %}, {{ item.Date }}{% endif %} - {{ item.Link | getDescription }}

{% endfor %}

## Built with Eleventy

{% for item in airtableitems | getBundleItems(bundleIssue, "site") %}

- [{{ item.Title }}]({{ item.Link }}){% if item.Author %} by [{{ item.Author }}]({{ item.AuthorLink }}) {% endif %}

{% endfor %}

{% include 'partials/bundlefoot.md' %}
