---
bundleIssue: 61
eleventyComputed:
  title: "Issue {{ bundleIssue }} - Fill out Survey Awesome, Eleventy Import arrives, Jérôme Coupé updated his Eleventy Intro, Robb Knight cooks, New docs for Eleventy Fetch 5, Pagefind v1.2.0, Pack11ty at v3.0.0...And 14 releases, 19 posts and 22 sites to see"
  description: "11ty Bundle Issue {{ bundleIssue }}"
date: 2024-11-26
tags:
  - 11ty Bundle
---

_An email version of this blog is available. **[Subscribe here](#newsletter-subscribe)**._

---

**_Some notes from Bob:_**

_1. We're back from our international travel, so this issue is a big one._

_2. I've decided to do a little housekeeping. I've removed one starter that was on a version of Eleventy less than 1.0. I've also removed a few sites that were no longer available._

_3. For those of you who subscribe to the email version of this, apologies in advance for the "message clipping" that Gmail will likely do._

_4. Enjoy!_

---

**Fill out Survey Awesome.** From the Eleventy blog, Zach is [asking for help by filling out Survey Awesome](https://www.11ty.dev/blog/survey-awesome/). Quote: _"As 11ty joined Font Awesome a few short months ago, our project is again relying on survey results to inform future priorities and focus. Alongside the Font Awesome folks, we’re giving the 11ty Community a first look at [Survey Awesome](https://survey.awesome.me/) — a larger and more comprehensive survey about how folks are building for the web, start to end."_

**Eleventy Import arrives.** [eleventy-import](https://github.com/11ty/eleventy-import#11tyimport) is a small utility (and CLI) to import content files from various content sources. [Check out the features](https://github.com/11ty/eleventy-import#11tyimport).

**Jérôme Coupé updated his Eleventy Intro.** Just heard about this last night, but it's an awesome [intro to Eleventy](https://github.com/jeromecoupe/iad_eleventy_introduction/blob/master/eleventy_introduction_en.md#eleventy-11ty-by-zach-leatherman) that Jérôme uses to teach a workshop.

**Robb Knight cooks.** Robb has spilled (at least) [three](https://rknight.me/blog/thinking-about-recipe-formats-more-than-anyone-should/) [blog](https://rknight.me/blog/why-is-no-one-using-the-recipe-schema/) [posts](https://rknight.me/blog/adding-cooklang-support-to-eleventy-two-ways/) about using [cooklang](https://cooklang.org/), a Recipe Markup Language, culminating in this one, titled [Adding Cooklang Support to Eleventy Three Ways](https://rknight.me/blog/adding-cooklang-support-to-eleventy-two-ways/).

**New docs for Eleventy Fetch 5.** The [docs for the Eleventy Fetch plugin](https://www.11ty.dev/docs/plugins/fetch/) have been updated to reflect the latest version, i.e., v5.0+. I'll leave it to you to discover [the new goodies](https://github.com/11ty/eleventy-fetch/releases/tag/v5.0.0).

**Pagefind v1.2.0.** The popular static site search package, Pagefind has been updated to v1.2.0. [Check out the release notes](https://github.com/CloudCannon/pagefind/releases/tag/v1.2.0). I have not updated here or on my personal site yet.

**Pack11ty at v3.0.0.** Nicolas Hoizey has updated his opinionated Eleventy template to v3.0.0. It's quite feature-rich. [Check out the docs](https://pack11ty.dev/documentation/).

I think that's more than a mouthful for this issue.

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
