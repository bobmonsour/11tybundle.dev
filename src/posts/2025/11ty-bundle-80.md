---
bundleIssue: 80
eleventyComputed:
  title: "Issue {{ bundleIssue }} - Redesign in progress, 11ty Meetup videos, 11ty GitHub Issues are a changing, Kyle embeds Mastodon posts, Stefan makes a free image gallery, A facepile for all, Hitchens theme for 11ty, Kaj Kander dives into schema markup...And 23 posts and 16 sites to see"
  description: "11ty Bundle Issue {{ bundleIssue }}"
date: 2025-11-11
tags:
  - 11ty Bundle
---

_An email version of this blog is available. **[Subscribe here](#newsletter-subscribe)**._

---

**_A note from Bob:_**

I'm excited to announce that I am collaborating with [Damian Walsh](https://damianwalsh.co.uk/) on a redesign of the 11ty Bundle website. We have some ideas and even some mockups, but before we get too far ahead of ourselves, we thought it best to do some good old user research. That's where you come in.

I've created [a survey](https://docs.google.com/forms/d/e/1FAIpQLSfef-ekQaPHSRnIQY8iUn-fmR79P1BXep-j2jPM3RKCDEcDnw/viewform?usp=sharing&ouid=116404147894481708789) to capture some data, and more importantly, to give you an opportunity to share your thoughts about the site and how it could be more useful to you and the rest of the Eleventy community. It's short and sweet and your input would be greatly apprecaiated. [Take the survey here](https://docs.google.com/forms/d/e/1FAIpQLSfef-ekQaPHSRnIQY8iUn-fmR79P1BXep-j2jPM3RKCDEcDnw/viewform?usp=sharing&ouid=116404147894481708789). If you run into any issues with the survey link, please let me know by [email here](mailto:bob.monsour@gmail.com?subject=11ty%20Bundle%20survey%20comments).

If you want to skip the preliminaries and get right to [the releases](#releases) or [the posts](#posts), or [the sites](#sites), have at it.

Enjoy!

---

> NOTE: While I tend to open with highlights of a handful of things that caught my eye, there is so much more in the [list of posts](#posts) down below. Please be sure to check them all out.

**Redesign in progress.** A quick reminder (yes, already), please do fill out [the survey](https://docs.google.com/forms/d/e/1FAIpQLSfef-ekQaPHSRnIQY8iUn-fmR79P1BXep-j2jPM3RKCDEcDnw/viewform?usp=sharing&ouid=116404147894481708789). Go ahead and open it in a new tab so you can fill it out after reading the rest of this issue.

**11ty Meetup videos.** Feast your eyes on [the playlist of Episode 27](https://www.youtube.com/playlist?list=PLJy3jyeGVYUqx2NkWM_LatM2g2FbLNxPM) of THE Eleventy Meettup, featuring [Helen Chong](https://helenchong.dev/), showing us how to build a multilingual blog with Eleventy; and [Nic Chan](https://www.nicchan.me/) on powering a world-class museum's digital infrastructure with Eleventy.

**11ty GitHub Issues are a changing.** Zach has updated how he handles GitHub Issues for Eleventy and he [wrote about it here](https://www.11ty.dev/blog/github-issues/). It makes a lot of sense and should help Zach manage things better. And from what I can tell, he's been working hard to reduce the Issue backlog, with many of them being converted to Discussions.

**Kyle embeds Mastodon posts.** [Kyle Reddoch](https://www.kylereddoch.me/) has developed a shortcode for embedding Mastodon posts in Eleventy sites. [Check it out](https://www.kylereddoch.me/blog/embedding-mastodon-posts-in-eleventy-my-journey/).

**Stefan makes a free image gallery.** [Stefan Bohacek](https://stefanbohacek.com/) shows how to create an image gallery and host it for fee on Neocities. [Check it out](https://stefanbohacek.com/blog/making-a-free-image-gallery-with-11ty-and-neocities-org/).

**A facepile for all.** Zach has updated the Facepile that is shown on every page of the 11ty docs. He's [recently described](https://www.zachleat.com/web/permanent-eleventy-facepile/) how he has updated it to include everyone who has ever [supported Eleventy via Open Collective](https://opencollective.com/11ty).

**Hitchens theme for 11ty.** [Jason Shellen](https://www.shellen.com/) has adapted Pat Dryburgh's [Hitchens theme](https://github.com/patdryburgh/hitchens/#readme), what Pat had dubbed _"An inarguably well-designed Jekkyll theme."_ Jason has recreated it for Eleventy. [Check it out](https://github.com/shellen/hitchens-eleventy?tab=readme-ov-file#hitchens-for-eleventy).

**Kaj Kander dives into schema markup.** [Kaj Kander](https://kajkandler.com/) has provided a couple of resources to show how you can add schema markup (and [why you would want to](https://kajkandler.github.io/eleventy-base-blog-with-schema/blog/importance_of_schema_markup/)) to your sites. He's [done it for the Eleventy base blog](https://kajkandler.github.io/eleventy-base-blog-with-schema/blog/). He presented all of this on Episode 25 of the 11ty Meetup; check out [the video](https://www.youtube.com/watch?v=Z-83f8qa0_c). And after the meetup, [Simon Cox](https://www.simoncox.com/) dove right in and developed a "modular and automated" [workflow](https://www.simoncox.com/post/2025-10-28-creating-a-modular-approach-to-json-schema-in-an-eleventy-website/) that works for him.

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
