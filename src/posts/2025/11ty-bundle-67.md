---
bundleIssue: 67
eleventyComputed:
  title: "Issue {{ bundleIssue }} - We Meetup'd...And 4 releases, 23 posts and 10 sites to see"
  description: "11ty Bundle Issue {{ bundleIssue }}"
date: 2025-02-18
tags:
  - 11ty Bundle
---

_An email version of this blog is available. **[Subscribe here](#newsletter-subscribe)**._

---

**_A note from Bob:_**

Family health matters are keeping my summary below rather short this week. There's a lot in this issue, so scan on down below for the goodies.

---

**We Meetup'd.** The Eleventy Meetup was a success. [Sia Karamalegos](https://sia.codes/) showed us how to use 11ty to [build a data and chart analytics website](https://www.youtube.com/watch?v=o13Yfgzne88). And I showed [how I built my Books page](https://bobmonsour.com/notes/11ty-meetup-how-i-built-my-books-page/). Those links go to the recording of Sia's talk and my blog post, respectively. You can see all of the meetup's recordings on the [Eleventy Meetup YouTube channel](https://www.youtube.com/@THEEleventyMeetup).

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
