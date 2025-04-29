---
bundleIssue: 72
eleventyComputed:
  title: "Issue {{ bundleIssue }} - We Met-Up, Eleventy v3.1.0-beta.1, Ethan brings the Magick, Chris hits a double...And 7 releases, 17 posts, and 21 sites to see"
  description: "11ty Bundle Issue {{ bundleIssue }}"
date: 2025-04-29
tags:
  - 11ty Bundle
---

_An email version of this blog is available. **[Subscribe here](#newsletter-subscribe)**._

---

**_A note from Bob:_**

I've been spending so much time preparing a post for [my personal site](https://bobmonsour.com/) about the coming (May 1st) 2nd anniversary of the launch of the 11ty Bundle site that I completely forgot that I had to get this issue out. Fortunately, I remembered in time and...here we are.

---

**We Met Up.** Check out the [Eleventy Meetup event details](https://11tymeetup.dev/events/ep-23-notion-as-a-cms-and-component-prototyping/) for the most recent meetup videos. [Michael Delaney](https://mwdelaney.me/) shared "Rapidly(?) Developing Front-End Components with 11ty" and [vrugtehagel](https://vrugtehagel.nl/) shared "Using Notion as CMS with your Eleventy site."

**Eleventy v3.1.0-beta.1.** It's smaller! It's faster! Check out the [release notes](https://github.com/11ty/eleventy/releases/tag/v3.1.0-beta.1).

**Ethan brings the Magick.** [Ethan Marcotte](https://ethanmarcotte.com/) shows us how he [uses ImageMagick to generate his open graph images](https://ethanmarcotte.com/wrote/magick-images/).

**Chris hits a double.** [Christopher Kirk-Nielsen](https://chriskirknielsen.com/), [doubles your pagination](https://chriskirknielsen.com/blog/double-pagination-in-eleventy/) fun and [test drives VentoJS](https://chriskirknielsen.com/blog/taking-vento-js-for-a-spin-in-eleventy/), yet another template language

Until next time...

---

<div id="issue69-releases"></div>

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
