---
bundleIssue: 38
eleventyComputed:
  title: "Issue {{ bundleIssue }} - Plugins, Virtual templates, Register for the 11ty conf, eleventeen starter update, 11feed, the Static Site Fan Club show, a redesign, a cool site...And 3 posts and 8 sites to see."
  description: "11ty Bundle Issue {{ bundleIssue }}"
date: 2024-04-09
tags:
  - 11ty Bundle
image:
  source: 11tysymposium2024.jpg
  alt: "Announcement of the 11ty International Symposium on Making Web Sites Real Good"
---

While I'd been posting just about weekly so far this year, other priorities came up and there wasn't a lot of blog activity that I could detect around 11ty. That said, there's been plenty going on in 11ty-land. And here we go...

**Plugins, Plugins, everywhere** I track a lot of GitHub activity related to Eleventy and that includes the docs. There have been a lot of updates and improvements to the docs recently. There are too many to cover here, but I did see an update to two pages of the docs related to plugins. One is the page listing all of the [official Eleventy plugins](https://www.11ty.dev/docs/plugins/official/) and the second is the page listing [Community plugins](https://www.11ty.dev/docs/plugins/community/). And if you've written a plugin and it's not listed, you can [add yours to the list](https://github.com/11ty/11ty-website/tree/main/src/_data/plugins#readme).

**Virtual templates?** Shipping with 3.0.0-canary.6: [Configuration API method to create a content template (aka Virtual Templates)](https://github.com/11ty/eleventy/issues/1612). _"This would allow automatic content creation in plugins (sitemap.xml, rss feeds, etc)."_

**Register for 11ty conference** There's still time to [register for the 11ty conference](https://conf.11ty.dev/), a free, single-day, single-track, and completely virtual conference scheduled for May 9th.

**Update to Ricky de Laveaga's eleventeen starter** For those of you familiar with [Ricky de Laveaga's eleventeen starter (code)](https://github.com/rdela/eleventeen), he's done [some updating](https://github.com/rdela/eleventeen/releases/tag/v9.2.2-alpha.5). Here's what the [demo site looks like](https://eleventeen.blog/).

**CloudCannon's 11feed** CloudCannon, has released [11feed](https://github.com/CloudCannon/11feed), an open-source, self-hosted, minimal RSS reader built with the static site generator 11ty. It was written by Mike Neumegen, their CEO (and maybe others...I just don't know).

**The Static Site Fan Club show** On a related note, Mike and Zach have been doing a weekly show on Twitch called the [Static Site Fan Club](https://www.twitch.tv/cloudcannoncms). The 11feed project was conceived of on show. They talk about static site generators, web components, and more. It airs live on Wednesdays, with recordings available afterwards. [Check it out](https://www.twitch.tv/cloudcannoncms).

**Christopher Kirk Nielsen's redesign** Chris did a redesign of [his personal site](https://chriskirknielsen.com/) and shares some of what he did under the hood. He covers using the canary release, the Eleventy plugin bundle, and a wide variety of other things. [Check it out](https://chriskirknielsen.com/blog/2024-redesign/).

**A cool site built with 11ty** One of this week's sites is pretty cool with some nice animations on the home page. It's called [Antithesis](https://antithesis.com/). They describe themselves as: _"Antithesis is a continuous reliability platform that autonomously searches for problems in your software within a simulated environment. Every problem we find can be perfectly reproduced, allowing for efficient debugging of even the most complex problems."_

**And finally...** Don't forget that you can get these posts delivered directly [to your email inbox, or via RSS](#newsletter-subscribe). I also put out a notification on [my Mastodon account](https://indieweb.social/@bobmonsour) and on the [Eleventy Discord server](https://www.11ty.dev/blog/discord/). To those of you who have already subscribed, thank you!

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
