---
bundleIssue: 13
eleventyComputed:
  title: "Issue {{ bundleIssue }} - Self-inflicted debugging, a boatload of Raymond Camden, a backend for your forms, and a couple of sites"
  description: "Welcome to Issue {{ bundleIssue }} of the 11ty Bundle."
date: 2023-07-17
tags:
  - 11ty Bundle
---

After a major episode of cockpit error, today I bring you Issue 13. Note to self, do NOT add a filter the views of the Airtable database that is used as the view from which you fetch your content. The filtered content will be incomplete. Instead, create a different view. This avoids needless Nunjucks and Javascript debugging of code that has worked for months. A good night's sleep is the best debugging tool.

We've got 7 new posts since the last issue...and apparently, I've managed to miss the vast majority of Eleventy-related posts by Raymond Camden. His blog now boasts [97 posts tagged Eleventy](https://www.raymondcamden.com/tags/eleventy) (you can feast on them at that link). Of those, I have only captured [a mere 30](/authors/raymond-camden/). I have some work to do, but I'll be adding most, if not all, of the rest of them over the coming weeks.

Note that even without Ray's treasure trove, we've crossed the 600 post milestone.

There are just two new sites to share. Regrettably, neither of them contain a meta description tag to share.

Lastly, [Geoffrey Calaghan](/authors/geoffrey-callaghan/) and his team have built a [form backend service](https://fabform.io/for/Eleventy) to support your Eleventy sites. It's called [fabform.io](https://fabform.io/for/Eleventy). They also support a wide variety of other platforms. I have not had a chance to use it, but if your site needs form support, you should check it out.

<div id="releases"></div>

## Recent releases

{% set itemType = "release" %}
{% include 'partials/bundleitems.njk' %}

## Posts from around the web since the last Bundle issue

{% set itemType = "blog post" %}
{% include 'partials/bundleitems.njk' %}

<div id="sites"></div>

## Built with Eleventy

Two new sites this week. If you want to see more, check out the [Eleventy Leaderboards](https://www.11ty.dev/speedlify/).

{% set itemType = "site" %}
{% include 'partials/bundleitems.njk' %}
