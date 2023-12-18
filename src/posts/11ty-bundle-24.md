---
bundleIssue: 24
eleventyComputed:
  title: "Issue {{ bundleIssue }} - Snowfall edition...Can you say 3.0 alpha? And 2 releases, 2 starters, 7 posts, and 10 sites to see."
  description: "Welcome to Issue {{ bundleIssue }} of the 11ty Bundle."
date: 2023-12-17
tags:
  - 11ty Bundle
snow: "true"
---

To end the year, we've got some exciting stuff.

First off, Zach has released [Eleventy v3.0.0-alpha.2](https://github.com/11ty/eleventy/releases/tag/v3.0.0-alpha.2) to the world. And he's actively [seeking courageous canary testers](https://www.11ty.dev/blog/canary-eleventy-v3/). Yes, we're looking at you. Zach kicked off the testing and the Eleventy website is running on 3.0.0-alpha.2, AND it's all been converted to ESM.

I just jumped on the bandwagon this evening and now this very 11tybundle site is running on it! 

Check out [Zach's blog post](https://www.11ty.dev/blog/canary-eleventy-v3/) and give it a try on one or a few of your side projects or other non-critical projects. It's incredibly easy to do. Let's help shake the bugs out of it. 

Earlier in the week Zach released some fun in the form of a [snow-fall web component](https://www.zachleat.com/web/snow-fall/). You're seeing it now on this blog post. I also have it running on my personal site. There, it's on every page. But for this site, I've set it up as a front matter setting so I can control where it appears. Right now, it's only on this post.

One other new item of note is one of the [starters](/starters/). Named Niépce, it's a feature-rich photography portfolio site. It's named for Nicéphore Niépce, a French inventor and one of the earliest pioneers of photography. [Check it out on GitHub](https://github.com/GoOz/Niepce). It's also the basis of the [author's own photography site](https://www.bloogart.com/).

I hope that you all enjoy your holiday season and have a wonderful New Year!

I'll see you in 2024...

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

Here are the new sites to see. If you want to see more sites, check out the [Eleventy Leaderboards](https://www.11ty.dev/speedlify/).

{% set itemType = "site" %}
{% include 'partials/bundleitems.njk' %}
