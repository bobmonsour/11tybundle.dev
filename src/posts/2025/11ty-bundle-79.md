---
bundleIssue: 79
eleventyComputed:
  title: "Issue {{ bundleIssue }} - 11ty Meetup videos, 11ty logo as Font Awesome icon, 11ty FA plugin hits 1.0, Add a CMS to ZeroPoint, Peter deHaan and Nunjucks loops, Kyle brings us Brewventy, Zach on Podcast Awesome, Hire Shiv J.M.,Dwkns debugs with a shortcode, Alex Russell performs hacks, Simon redirects on Cloudflare, Build your own Subspace...And 1 releases, 27 posts, and 11 sites to see"
  description: "11ty Bundle Issue {{ bundleIssue }}"
date: 2025-10-11
tags:
  - 11ty Bundle
---

_An email version of this blog is available. **[Subscribe here](#newsletter-subscribe)**._

---

**_A note from Bob:_**

For a long time, I'd been in the habit of adding posts to the database as I found them. But due to travel and a couple of other life stressors, I just started adding links to the posts in an Obsidian doc. Well, they just kept piling up and not getting added to the bundle. A few of days ago, I finally sat down and added them all. For those of you who subscribe to the [RSS feed](/firehosefeed.xml) of the [Firehose](/firehose/), on the evening of October 8th, you likely saw a flood of posts (about 15 of them) land in your feed readers. My apologies for the deluge.

One of the reasons I've been busy is that we're searching for a new home in Southern California. Over our 32 years of marriage, we've lived in 10 different houses across 3 states (CA, NJ, and WA). So, yes, this next one will be our **11th** house. 11th time's a charm! And with that, it will hopefully be our last. We're looking forward to being closer to family and old friends.

If you want to skip the preliminaries and get right to [the releases](#releases) or [the posts](#posts), or [the sites](#sites), have at it.

Enjoy!

---

**11ty Meetup Videos.** The video playlist of Episode 26 of the 11ty Meetup [is here](https://www.youtube.com/playlist?list=PLJy3jyeGVYUpctxAkrtoj-L3CvXRzwDE9).

**11ty logo as Font Awesome icon.** [Fontawesome now has an 11ty icon](https://fediverse.zachleat.com/@zachleat/115226453311879904).

**11ty FA plugin hits 1.0.** [Check it out](https://github.com/11ty/eleventy-plugin-font-awesome/releases/tag/v1.0.0).

**Add a CMS to ZeroPoint.** Michael Delaney shows how to [add a CMS to ZeroPoint](https://getzeropoint.com/adding-a-cms/), his [starter project](https://getzeropoint.com/).

**Peter deHaan and Nunjucks loops.** This isn't new, but I came across it and found it to be a useful resource as Peter shows how to loop over various different data structures in Nunjucks. [Check it out](https://github.com/pdehaan/11ty-nunjucks-for-loop/tree/main).

**Kyle brings us Brewventy.** [Kyle Reddoch](https://www.kylereddoch.me/) has created a nice new starter project called [Brewventy](https://github.com/kylereddoch/brewventy).

**Zach on Podcast Awesome.** Zach did a [video podcast](https://www.zachleat.com/web/web-awesome-11ty/) with Matt of [Font Awesome](https://fontawesome.com/) and shared how they built [Web Awesome](https://webawesome.com/) with Eleventy.

**Hire Shiv J.M.** Shiv Jha-Mathur, aka, aankhen on the [11ty Discord server](https://www.11ty.dev/blog/discord/), has built a very cool single page website as a means to showcase his skills as he seeks to be hired. [Check it out](https://hire.shivjm.in/). He also wrote [a great blog post](https://shivjm.blog/hire-shivjm-in/) about the process he went through while developing it.

**Dwkns debugs with a shortcode.** With [eleventy-plugin-console-plus](https://www.npmjs.com/package/eleventy-plugin-console-plus/v/2.0.0), dwkns created a _"plugin that adds a shortcode for debugging your templates, objects, and data. It logs to your HTML output, your terminal, and your browser console—all at once, with beautiful formatting and deep customization options."_

**Alex Russell performs hacks.** [Alex Russell](https://infrequently.org/) shows us some fun hacks to improve performance with Eleventy. [Check it out](https://infrequently.org/2025/10/11ty-hacks-for-fun-and-performance/).

**Simon redirects on Cloudflare.** If you're hosting with Cloudflare and changing your urls from time to time, you should probably prepping some redirects so those old links don't break. Simon Cox [shows you how](https://www.simoncox.com/short-articles/2025-10-08-creating-cloudflare-redirects/).

**Build your own Subspace.** Nicholas Clooney brings us a new starter project called [11ty Subspace Builder](https://github.com/TheClooneyCollection/11ty-subspace-builder). It looks to have some nice features.

Until next time...

---

<div id="releases"></div>

## Recent releases

{% set itemType = "release" %}
{% include 'partials/bundleitems.njk' %}

<div id="posts"></div>

## Posts from around the web

{% set itemType = "blog post" %}
{% include 'partials/bundleitems.njk' %}

<div id="sites"></div>

## Built with Eleventy

Here are the new sites to see. If you want to see more sites, check out the [Eleventy Leaderboards](https://www.11ty.dev/speedlify/).

{% set itemType = "site" %}
{% include 'partials/bundleitems.njk' %}
