---
bundleIssue: 5
eleventyComputed:
  title: "Issue {{ bundleIssue }} - LAUNCH DAY!"
  description: "Welcome to Issue {{ bundleIssue }} of the 11ty Bundle. It's LAUNCH DAY! The site includes resources for all things Eleventy. Read on to learn more."
date: 2023-05-01
tags:
  - 11ty Bundle
keywords: eleventy, 11ty, newsletter, roundup, news
image:
  source: "11tybundle-dev.jpg"
  alt: "the number 11 as photographed by David Monje on Unsplash"
draft: false
---

The 11ty Bundle started out as a series of blog posts on [my personal site](https://www.bobmonsour.com/). The first 4 issues of the 11ty Bundle were published there and they have been migrated to this site. This is the first issue to be published here. You can learn more about how the 11ty Bundle came to be on the [About page](/about/).

Each issue will contain the following sections: recent releases of official Eleventy repos, links to blog posts from around the web highlighting their use of Eleventy or a feature of Eleventy, a list of selected sites that are built with Eleventy, and a list of official and community resources for learning more about Eleventy.

Some issues will focus on a particular topic (or category). In this issue, we highlight posts from Eleventy adopters who have migrated from other static site generators, tools, and platforms. Other issues might add useful tips or code snippets or selected quotes commenting on Eleventy.

I hope you find this to be a useful resource to help you get the most out of Eleventy. There are more than 300 blog posts across more than 25 [categories](/categories/) written by more than 100 [authors](/authors/).

_Don't miss an issue. There are two RSS feeds, one is the [Blog RSS](/feed.xml) for posts like the one you're reading now and those in the [Blog](/blog/) and a second one, [Firehose RSS](/firehosefeed.xml), which includes all of the [categorized](/categories/) posts written by numerous [authors](/authors/)._

Feedback is welcome; drop me a line at bob dot monsour at gmail.com.

## Recent releases

{% set itemType = "release" %}
{% include 'partials/bundleitems.njk' %}

## Posts from around the web

{% set itemType = "blog post" %}
{% include 'partials/bundleitems.njk' %}

## Built with Eleventy

This list is a little light this week, but not really...since all of the above blog posts are about migrating to Eleventy, all of them _should_ be sites that are "Built with Eleventy."

{% set itemType = "site" %}
{% include 'partials/bundleitems.njk' %}
