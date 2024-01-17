---
bundleIssue: 27
eleventyComputed:
  title: "Issue {{ bundleIssue }} - Now serving over 900 posts...A new intro making the rounds...And 17 posts, and 3 sites to see. "
  description: "Welcome to Issue {{ bundleIssue }} of the 11ty Bundle."
date: 2024-01-16
tags:
  - 11ty Bundle
---

> [UPDATE January 17, 2024]: I forgot to mention the upcoming [TheJam.dev](https://cfe.dev/events/the-jam-2024/) conference. It's a FREE, online conference on January 24th and 25th. [Check it out](https://cfe.dev/events/the-jam-2024/). Zach is one of the speakers along with several of more members of the Eleventy community.

Well, we've crossed the 900 post threshold! I've got some ideas for what to do when we cross 1,000, so stay tuned.

A new [Introduction to Eleventy](https://thenewstack.io/introduction-to-eleventy-a-modern-static-website-generator/) has been making the rounds. If you're brand new to Eleventy, it's not a bad place to start. There's not a lot of depth to it, but as it says..."This should be enough to stir some enthusiasm in you to write your own site, or perhaps be enough to put you off." David plans to write some deeper posts and I'll keep my eye out for them.

For those interested, I added webmentions to my personal site and [wrote about it](https://www.bobmonsour.com/posts/adding-webmentions-to-my-site/). I had shied away from it as many were adding them to their Eleventy sites last year. It looked complicated. Once again, I was wrong...it's quite doable. If you're so inclined, we've got a [bunch of posts about them here](https://11tybundle.dev/categories/webmentions/).

Enjoy the 17 posts and 3 sites to see this week.

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
