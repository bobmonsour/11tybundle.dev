---
bundleIssue: 13
eleventyComputed:
  title: "Issue {{ bundleIssue }} - Some new stuff, a boatload of Raymond Camden, a backend for your forms, and a couple of sites"
  description: "Welcome to Issue {{ bundleIssue }} of the 11ty Bundle."
date: 2023-07-17
tags:
  - 11ty Bundle
draft: true
---

<div id="releases"></div>

## Recent releases

{% set itemType = "release" %}
{% include 'partials/bundleitems.njk' %}

## Posts from around the web since the last Bundle issue

{% set itemType = "blog post" %}
{% include 'partials/bundleitems.njk' %}

<div id="sites"></div>

## Built with Eleventy

Three new sites this week. If you want to see more, check out the [Eleventy Leaderboards](https://www.11ty.dev/speedlify/).

{% set itemType = "site" %}
{% include 'partials/bundleitems.njk' %}
