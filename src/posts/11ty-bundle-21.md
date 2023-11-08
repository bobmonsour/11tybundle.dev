---
bundleIssue: 21
eleventyComputed:
  title: "Issue {{ bundleIssue }} - A new mascot for 11ty...Another free hosting option...A new front matter option...And 10 posts and 6 sites to see."
  description: "Welcome to Issue {{ bundleIssue }} of the 11ty Bundle."
date: 2023-10-29
tags:
  - 11ty Bundle
---

## A new mascot for Eleventy

Say hello to [our new little friend](https://www.11ty.dev/blog/mascot-david/), created by David Neal, a very talented artist and long-time Eleventy enthusiast. If you have ideas for its name, please share them on [Mastodon](https://fosstodon.org/@eleventy).

<img src="/assets/img/11ty-mascot.avif" alt="Eleventy mascot, a possum wearing large glasses" style="width: 50%; margin: 0 auto;">

## Another free hosting option

Kinsta, a hosting platform for web apps and sites has announced a free tier for hosting static sites, including support for Eleventy. According to [the page describing the features](https://kinsta.com/static-site-hosting/), you can have up to 100 sites, 600 build minutes, and 100GB bandwidth per month per account, and automatic deploys based on pushes to your repositories. I have no dog in this fight, but wanted to share this announcement. 

## A new front matter option

In the upcoming 3.0 release, there will be a new feature that will be familar to folks using WebC. You can use arbitrary JavaScript in your front matter. You can read more about it in [this GitHub discussion thread](https://github.com/11ty/eleventy/issues/2819).

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

Here are the new sites to see. If you want to see more sites, check out the [Eleventy Leaderboards](https://www.11ty.dev/speedlify/).

{% set itemType = "site" %}
{% include 'partials/bundleitems.njk' %}
