---
bundleIssue: 50
eleventyComputed:
  title: "Issue {{ bundleIssue }} - Zach's Eleventy Weekly Report №5, A couple of v3 upgrade posts, Not Eleventy-related but fun...And 7 posts, 2 releases, and 9 sites to see"
  description: "11ty Bundle Issue {{ bundleIssue }}"
date: 2024-07-02
tags:
	- 11ty Bundle
---

An email version of this blog is available. **[Subscribe here](#newsletter-subscribe)**.

**Zach's Eleventy Weekly Report №5.** First, we're up to alpha.14 (and this site is running on it).Rather than put the rest of it into my own words, I'll share [Zach's Mastodon post](https://fosstodon.org/@eleventy/112711796611167140) where he's been outlining his weekly progress on all things Eleventy.

<img src="/assets/img/zachs-eleventy-progress-5.jpg" alt="Zach's weekly eleventy update number 4" style="width: 70%; margin: 0 auto;">

**A couple of v3 upgrade posts.** [Alex Zappa](https://alex.zappa.dev) and I each wrote posts about upgrading to version 3. [Here is Alex's](https://alex.zappa.dev/blog/upgrading-to-eleventy-v3/) and [here is mine](https://www.bobmonsour.com/posts/upgrade-and-debug/). You can also find these, along with others in the [Upggrading category](/categories/upgrading/).

**Not Eleventy-related, but fun.** I subscribe to [Cassidy Williams'](https://cassidoo.co/) newsletter. Today's issue had a link to a [20-minute-ish talk](https://www.youtube.com/watch?v=eMhcL2yL7RI&list=PLXDU_eVOJTx402DljIPagaDKLibF-qfF0&index=27) given by [Josh Wardle](https://www.powerlanguage.co.uk/), the author of the popular word game, Wordle. He spoke about how he developed the game. But, what struck me was how he described the way the game has become a way for people to stay connected. I play it every day and I share my result with 3 close friends on the east coast. Two of them are guys I went to high school with more than 50 years ago and the other is the widow of another high school friend. They all share theirs too and we give each other shit from time to time, like the time I went 2 days in a row, failing to solve the game. It's a small, fun, and powerful way to stay connected. And the path that the game took from his developing it for his partner to selling it to the New York Times is fascinating.

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
