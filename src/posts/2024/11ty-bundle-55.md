---
bundleIssue: 55
eleventyComputed:
  title: "Issue {{ bundleIssue }} - ...And x posts and y sites to see"
  description: "11ty Bundle Issue {{ bundleIssue }}"
date: 2024-08-06
tags:
  - 11ty Bundle
---

_An email version of this blog is available. **[Subscribe here](#newsletter-subscribe)**._

---

Until next time...

## Recent releases

{% set itemType = "release" %}
{% include 'partials/bundleitems.njk' %}

## Posts from around the web

{% set itemType = "blog post" %}
{% include 'partials/bundleitems.njk' %}

## Built with Eleventy

Here are the new sites to see. If you want to see more sites, check out the [Eleventy Leaderboards](https://www.11ty.dev/speedlify/).

{% set itemType = "site" %}
{% include 'partials/bundleitems.njk' %}
