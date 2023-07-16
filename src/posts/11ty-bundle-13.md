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

This issue has 6 new blog posts that came out since the [last issue](/blog/11ty-bundle-{{bundleIssue-1}}/). We're flirting with the magic 600 number, but not quite there yet...we're at 597 blog posts.

There's also a relatively new starter that looks pretty cool, it's called [Eleventy Notes](https://eleventy-notes.sandroroth.com/), created by [Sandro Roth](https://github.com/rothsandro). It's described as _"A simple, lightweight, and flexible note-taking template for Eleventy."_ You'll find listed among the other [Starters](/starters/). We're up to a baker's dozen of starters (13 for those of you who are counting).

And here's what I said last week about the sites section:

> I've got just two new sites for this issue. And I'm thinking that the [Eleventy Leaderboards](https://www.11ty.dev/speedlify/) site is a much better source of sites built with Eleventy. As a result, unless I come across one or more compelling new sites, the [Built with Eleventy](#sites) section will not be included.

I spoke too soon, 3 new sites showed up on my radar. Among the most interesting is the TC39 site that is now built with Eleventy. TC39 is the committee that manages the development of ECMAScript, the standard upon which JavaScript is based. Too bad that it doesn't have a meta description tag to display, but it's still a cool site.

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
