---
bundleIssue: 28
eleventyComputed:
  title: "Issue {{ bundleIssue }} - TheJam.dev 2024 starts tomorrow! Exploring the Bounds of Jamstack (video)..A site with Eleventy themes...And 13 posts, and 4 sites to see. "
  description: "Welcome to Issue {{ bundleIssue }} of the 11ty Bundle."
date: 2024-01-16
tags:
  - 11ty Bundle
---

> Don't miss [TheJam.dev](https://cfe.dev/events/the-jam-2024/) conference. It's a FREE, online conference on January 24th and 25th. [Check it out](https://cfe.dev/events/the-jam-2024/). Zach is one of the speakers along with several of more members of the Eleventy community.

And this just in today. Zach is interviewed by Mike Neumegen, the CEO of CloudCannon. Here, they "Explore the Bounds of Jamstack."

<div class="iframe-wrapper">
<iframe style="display:block; margin:0 auto 1em auto;" src="https://www.youtube.com/embed/BPKIU9Ow_ZU?si=cWpgoROXoFfBQ6l8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

Lastly, I don't know how long this site has been around, but it's new to me. It's a site that showcases Eleventy themes. It's called [Eleventy Themes](https://www.eleventythemes.com/). I have not tried any of the themes here, but it sure looks interesting.

Enjoy the 13 posts and 4 sites to see this week.

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
