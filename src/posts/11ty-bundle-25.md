---
bundleIssue: 25
eleventyComputed:
  title: "Issue {{ bundleIssue }} - Where to start? Robb Knight is on fire...Tim Brown arrives...And 1 release, 15 posts, and 10 sites to see."
  description: "Welcome to Issue {{ bundleIssue }} of the 11ty Bundle."
date: 2023-12-29
tags:
  - 11ty Bundle
---

And I thought that [Issue 24](/blog/11ty-bundle-24/) was the last one of the year. Apparently a lot of bloggers and web builders had other ideas as there are 15 new blog posts since the last issue.

Anyway, besides the post, it seems that Robb Knight has been sucessfully influencing people to do things. Namely, to display graphs of blog posts similar to how GitHub shows contribution activity. Not to be left out, I did this on my personal site and [you can see it here](https://www.bobmonsour.com/stats/) (as you'll see, I'm less than prolific). You too can do this. Just check out the [eleventy-post-graph-plugin](https://rknight.me/blog/eleventy-post-graph-plugin/) that Robb built.

Speaking of Robb, he also has been collecting blog posts of people who had joined his call for a list of default apps that they use for a variety of things on an everyday basis. While not Eleventy-specific, it was fun to join in. Here's the [blog post](https://rknight.me/blog/so-many-default-apps/) where he wrote about it. He created a site to house them all. And just the other day, the site crossed the 300 post threshold. [Check it out here](https://defaults.rknight.me/).

Finally, I mention Tim Brown for three reasons. First, [he built his site](https://tbrown.org/) with Eleventy. Second, he's a master of all things typography. And third, while I don't know him well, we first met way back in 2005 at the very first [An Event Apart](https://aneventapart.com/) in Philadelphia. At the time, I had built a site for a private school in New Jersey and didn't really know what I was doing (CSS was beyond hell at the time). The organizers (none other then [Jeffrey Zeldman](https://www.zeldman.com/), [Eric Meyer](https://meyerweb.com/), and [Jason Santa Maria](https://jasonsantamaria.com/)) asked for sites to review at the event. I sheepishly submitted the school site and got some really good feedback. Tim was another attendee at the time and we got a chance to chat. That's my story and I'm sticking to it.

Let me try this again...I'll see you in 2024...for real!

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
