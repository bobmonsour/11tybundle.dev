---
bundleIssue: 17
eleventyComputed:
  title: "Issue {{ bundleIssue }} - We're back from Italy. Zach did a video panel on Jamstack. Oh, and 10 posts and 5 sites for you to check out."
  description: "Welcome to Issue {{ bundleIssue }} of the 11ty Bundle."
date: 2023-09-21
tags:
  - 11ty Bundle
youtubeId: xVmKdCi-Gpo
---

Just back from a wonderful 2 weeks in Italy. Still not over the jet lag, but I'm coping. I'm headed to San Diego tomorrow to reunite with some other old-timers to commemorate the 40th anniversary of the founding of [Stac Electronics](https://en.wikipedia.org/wiki/Stac_Electronics). It's hard to believe it's been that long. I'm looking forward to seeing everyone.

First up, Zach did a 1-hour-ish video on the topic of Jamstack and what it means and what it could mean. It's a great watch.

{% set videoTitle = "Jamstack ZHUZH Community Round-table Discussion" %}
{% set videoId = youtubeId %}
{% include 'partials/youtube.njk' %}

And there are 10 new posts and 5 new sites to check out below.

Until next time...

<div id="releases"></div>

## Recent releases

{% set itemType = "release" %}
{% include 'partials/bundleitems.njk' %}

<div id="newposts"></div>

## Posts from around the web since the last Bundle issue

{% set itemType = "blog post" %}
{% include 'partials/bundleitems.njk' %}

<div id="sites"></div>

## Built with Eleventy

Four new sites to see. If you want to see more sites, check out the [Eleventy Leaderboards](https://www.11ty.dev/speedlify/).

{% set itemType = "site" %}
{% include 'partials/bundleitems.njk' %}
