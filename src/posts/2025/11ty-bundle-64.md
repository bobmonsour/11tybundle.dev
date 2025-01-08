---
bundleIssue: 64
eleventyComputed:
  title: "Issue {{ bundleIssue }} - New eleventy-img plugin, Magnify your images, Free as in 11ty-beer, A new category, The US gov using 11ty, Make a podcast site & feed, Henry's new home, Feed styling...And 3 releases, 15 posts and 22 sites to see"
  description: "11ty Bundle Issue {{ bundleIssue }}"
date: 2025-01-07
tags:
  - 11ty Bundle
---

_An email version of this blog is available. **[Subscribe here](#newsletter-subscribe)**._

---

**_A note from Bob:_**

Life got in the way of my usual Tuesday publish date. My wife and I have family & friends directly affected by the Eaton fire near Pasadena. It's pretty rough for everyone in Southern California right now. I hope you're all safe and sound.

Let's get into this issue...

---

**New eleventy-img plugin.** v6.0.0 of the Eleventy Image plugin came out today. [Read all about it](https://github.com/11ty/eleventy-img/releases/tag/v6.0.0). There's some breakage involved.

**Magnify your images.** Speaking of images...if you ever wanted to zoom an image to full screen, this new plugin, [eleventy-plugin-img-magnifier](https://github.com/teotimepacreau/eleventy-plugin-img-magnifier#eleventy-plugin-img-magnifier--zoom-image-to-fullscreen) has you covered.

**Free as in 11ty-beer.** There's a new starter in town, called [11ty-beer](https://github.com/LIGMATV/11ty-beer#11ty-beer). It looks pretty cool and there's [a demo site here](https://11ty-beer.vercel.app/).

**A New category.** From time to time, I pick up on a vibe of the posts that I find. A recent one triggered the thought that _"maybe there should be an Analytics category on this site."_ [So be it](/categories/analytics/). On a directly related note, there's this new plugin titled [eleventy-plugin-umami](https://github.com/Akashic101/eleventy-plugin-umami/#eleventy-plugin-umami) for those of you using or considering using [umami](https://umami.is/).

**The US gov using 11ty.** It turns out that the US Government General Services Administration has created [an 11ty template](https://github.com/GSA/datagov-11ty#11ty-uswds-template) using the [U.S. Web Design System v2.0](https://designsystem.digital.gov/), which is _"A design system for the federal government."_ Will wonders never cease?

**Make a podcast site & feed.** Joining with the other new plugins is the [eleventy-plugin-podcaster](https://github.com/nathan-bottomley/eleventy-plugin-podcaster#eleventy-plugin-podcaster-%EF%B8%8F). It's a plugin to help you create a podcast site and feed. [Full docs are here](https://eleventy-plugin-podcaster.com/).

**Henry's new home.** Among the most awesome of new sites comes from Henry Desroches. It's not just built with Eleventy, it's an amazing feat of design creativity. [A **MUST** see](https://henry.codes/).

**Feed styling.** And speaking of style, many rungs down on the creativity front, the feed of the blog here has now become human readable, via a simple XSL style sheet. [A _maybe_ see](/feed.xml).

Oh, and by the way, we've crossed the 1,300 mark on posts here. Yay!

Oh wait, one more thing. I am going to start removing the alpha and beta releases once the final version of a plugin is released. Less clutter is, well, less clutter.

Until next time...

---

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
