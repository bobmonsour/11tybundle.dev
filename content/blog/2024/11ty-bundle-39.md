---
bundleIssue: 39
eleventyComputed:
  title: "Issue {{ bundleIssue }} - Another canary, Netlify redirects in your front matter, a speedlify question, just an index.md...And 5 posts and 4 sites to see."
  description: "11ty Bundle Issue {{ bundleIssue }}"
date: 2024-04-16
tags:
  - 11ty Bundle
image:
  source: 11tysymposium2024.jpg
  alt: "Announcement of the 11ty International Symposium on Making Web Sites Real Good"
---

The email version of this blog is rocking the house! The subscriber count has reached double digits (yes, more than 10)...exceeding expectations. [You can subscribe here](#newsletter-subscribe).

**There's a new canary among us** Eleventy canary v3.0.0-alpha.6 was released last week. It incorporates the Virtual Templates that I mentioned last week. And there's [an update to how directory references work](https://github.com/11ty/eleventy/pull/3244) in the context of Virtual Templates. If you have not yet tested your site with the canary releases of 3.0, [here's how you can](https://www.11ty.dev/blog/canary-eleventy-v3/).

**Define Netlify redirect rules in your templates' front matter** Using the new Virtual Templates in 3.0.0-alpha.6, [Aleksandr Hovhannisyan](https://www.aleksandrhovhannisyan.com/) created [eleventy-plugin-netlify-redirects](https://github.com/AleksandrHovhannisyan/eleventy-plugin-netlify-redirects/) to do just that. In the README, he notes his motivation: _"You can define Netlify redirect rules by hand, but this requires keeping the new/current URL up to date and in sync with your template files' slugs/permalinks. If you change a template file name multiple times, that becomes a headache to manage. This plugin allows you to define your redirect rules right inside your templates' front matter; the new/current URL is always page.url."_ I expect that there will be more interesting use cases for this new capability.

**Speedlify and the Leaderboards** A comment came up on the Discord server recently noting that there had been no mention of how often the [Eleventy Leaderboards](https://www.11ty.dev/speedlify/) are updated. I have no specific facts, but from what I've heard, I believe that they get updated every few months, perhaps once per quarter. Did you know that you can run your own instance of [speedlify](https://github.com/zachleat/speedlify) to run these tests on your own set of websites?

**Start an Eleventy site with just index.md** As [Juha-Matti Santala](https://hamatti.org/) so eloquently put it _"[index.md is a valid Eleventy project](https://hamatti.org/posts/index-md-is-valid-eleventy-project/)."_ In this brief post, he highlights how, with Eleventy, _"You can start so simple and keep enhancing it. You can pick the parts you want to bring in and skip the ones you don’t like or need."_ This tracks with the [Quick Start in 2 Steps](https://www.11ty.dev/) that Zach shows on the Eleventy home page. **index.md** for the win!

**Register for 11ty conference** Once again, there's still time to [register for the 11ty conference](https://conf.11ty.dev/), a free, single-day, single-track, and completely virtual conference scheduled for May 9th.

Until next time...

<div id="releases"></div>

## Recent releases

While I know that v3.0.0-alpha.6 was released, it does not appear to have been [tagged on GitHub](https://github.com/11ty/eleventy/tags) as of this writing. That said, I know that Zach and the team have been cranking through issues over the past week as evidenced by the quantity of email landing in my GitHub Gmail folder.

<!-- {% set itemType = "release" %}
{% include 'partials/bundleitems.njk' %} -->

<div id="newposts"></div>

## Posts from around the web since the last Bundle issue

{% set itemType = "blog post" %}
{% include 'partials/bundleitems.njk' %}

<div id="sites"></div>

## Built with Eleventy

Here are the new sites to see. If you want to see more sites, check out the [Eleventy Leaderboards](https://www.11ty.dev/speedlify/).

{% set itemType = "site" %}
{% include 'partials/bundleitems.njk' %}
