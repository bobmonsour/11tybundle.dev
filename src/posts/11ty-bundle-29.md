---
bundleIssue: 29
eleventyComputed:
  title: "Issue {{ bundleIssue }} - Announcing the 11ty International Symposium on Making Web Sites Real Good...And 8 posts, and 8 sites to see. "
  description: "Welcome to Issue {{ bundleIssue }} of the 11ty Bundle."
date: 2024-01-30
tags:
  - 11ty Bundle
image:
  source: 11tysymposium2024.jpg
  alt: "Announcement of the 11ty International Symposium on Making Web Sites Real Good"
---

Well, today Zach announced the [11ty International Symposium on Making Web Sites Real Good](https://conf.11ty.dev/). It's "A brand new exclusively (and extremely) online (virtual) single-day single-track conference dedicated to Web Development and the [Eleventy](https://www.11ty.dev) static site generator."

Be sure to check out [the announcement site](https://conf.11ty.dev/) and [sign up for the related newsletter](https://buttondown.email/11ty/).

<a href="https://conf.11ty.dev/"><img src="/assets/img/11tysymposium2024.webp" alt="Announcement of the 11ty International Symposium on Making Web Sites Real Good" style="width: 100%; margin: 0 auto;"></a>

Enjoy the 8 posts and 8 sites to see this week.

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
