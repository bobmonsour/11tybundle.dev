---
bundleIssue: 36
eleventyComputed:
  title: "Issue {{ bundleIssue }} - A less gentle reminder...Why Eleventy, you ask?...Using AI to generate your post descriptions...And 10 posts, and 7 sites to see."
  description: "11ty Bundle Issue {{ bundleIssue }}"
date: 2024-03-19
tags:
  - 11ty Bundle
image:
  source: 11tysymposium2024.jpg
  alt: "Announcement of the 11ty International Symposium on Making Web Sites Real Good"
---

## A less gentle reminder

The [open call for talk proposals for the 11ty conference](https://docs.google.com/forms/d/e/1FAIpQLScdwhO1zfEBvl8mVAJQLWbK0EylD4yPCBpe3Lanz8SvFPI9Xg/viewform) ends THIS FRIDAY!!!. If you've been thinking about giving a talk, NOW IS THE TIME!!!

## Why Eleventy, you ask?

There's a great new post from Ryan Gittings about what makes static site generators so great, especially Eleventy. Check it out at [10 Reasons Why Static Site Generators Are Perfect for Modern Web Development](https://gittings.studio/blog/10-reasons-why-static-site-generators-are-perfect-for-modern-web-development/).

## Using AI to generate your post descriptions

First, please don't shoot the messenger. But John Wargo has an interesting post to do just that. Find it at: [Generating Eleventy Post Descriptions Using Generative AI: John M. Wargo](https://johnwargo.com/posts/2024/generating-post-descriptions/).

That's all for now...but wait...tomorrow is my wife's birthday. She's an artist and you can find her at [tascafineart.com](https://www.tascafineart.com/).

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
