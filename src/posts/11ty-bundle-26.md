---
bundleIssue: 26
eleventyComputed:
  title: "Issue {{ bundleIssue }} - 2024 BOOM! Alpha-4 arrives...search this blog...a beautiful resume starter...And 1 release, 18 posts, and 8 sites to see. "
  description: "Welcome to Issue {{ bundleIssue }} of the 11ty Bundle."
date: 2024-01-08
tags:
  - 11ty Bundle
---

2024 is off to a booming start with 18 new posts since the last issue. We're closing in on 900 posts in the Bundle.

I've started using [Inoreader](https://www.inoreader.com/) as my feed reader and it has some features that make it a lot easier to scour my eleventy billion feeds to find new Eleventy-related content. It's not free, but I was able to take advantage of a year-end promo they had going to get the first year at a discount.

Zach has cranked out the [alpha.4 release](https://github.com/11ty/eleventy/releases/tag/v3.0.0-alpha.4) of Eleventy 3.0.

Last week, I added [search functionality to this blog](/blog/search/) along with Robb Knight's post-graph plugin to [see the frequency of these posts](/blog/post-graph/). Like I did with [my personal site](https://www.bobmonsour.com/), I used [pagefind](https://pagefind.app/), an awesome plugin from [Liam Bigelow](https://techhub.social/@bglw@fosstodon.org) at Cloud Cannon. If you've got a blog, you should consider adding search...especially if it has enough posts that require pagination. It's incredibly simple and lightweight. And you can find [a bunch of posts](/categories/search/) right here on this site that show how others have done it.

I don't come across a lot of new starters. But last week, I found a really nice one for building a resume page. Here's the [repo](https://github.com/learnwithgurpreet/11ty-resume-template). Better yet, [here's the demo](https://www.gurpreet-singh.in/) and [the post about it](https://www.learnwithgurpreet.com/posts/eleventy-resume-builder/). The author, Gurpreet Singh also joins the list with [his own site](https://www.learnwithgurpreet.com/), now built with Eleventy.

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
