---
bundleIssue: 81
eleventyComputed:
  title: "Issue {{ bundleIssue }} - 11ty Meetup recap, Zach secures Eleventy, Another v4 alpha emerges, Zach forks Nunjucks, Quesby arrives...And 9 releases, 15 posts and 18 sites to see"
  description: "11ty Bundle Issue {{ bundleIssue }}"
date: 2025-12-11
tags:
  - 11ty Bundle
---

---

## A note from Bob:

My collaboration with [Damian Walsh](https://damianwalsh.co.uk/) on the redesign of this site has intensified over recent weeks. Working with Damian has been a joy. The site is pretty much a ground up rebuild of the HTML and CSS. And I've continued to do work under the hood to improve how the presented data is prepared and structured prior to templating. It's been a lot of work for both of us, but also a lot of fun.

Enjoy!

---

## Highlights

**11ty Meetup recap.** On ~~December~~ November 18th, [vrugtehagel](https://vrugtehagel.nl/) graced us with a presentation on [the Vento templating language](https://vento.js.org/). [In the video](https://www.youtube.com/watch?v=_854y7c0D-0&t=1s), he shares the what, the why and the how of Vento, and demonstrates how to use it within an Eleventy project. A great watch! While not recorded, I had a chance to preview the site redesign that Damian and I are working on.

Many thanks to all of you who provided valuable feedback via the survey as well as during the meetup. Here's a sneak peek of what awaits you (yes, dark mode is coming!).

![Sneak peek of the new 11ty Bundle design](/assets/img/redesign-sneak-peek.png)

**Zach secures Eleventy.** In light of the reccent [Shai Hulud security incident](https://socket.dev/blog/shai-hulud-strikes-again-v2), Zach has put in the hard work of ensuring Eleventy is secure by hardening its package publishing process. Zach's post is titled [No more tokens! Locking down npm Publish Workflows](https://www.zachleat.com/web/npm-security/). It sure feels good to know that Eleventy is in such capable hands.

**Another v4 alpha emerges.** [Release notes for Pre-release: Eleventy v4.0.0-alpha.5](https://github.com/11ty/eleventy/releases/tag/v4.0.0-alpha.5) are up on GitHub.

**Zach forks Nunjucks.** Two days ago on Mastodon, Zach noted: [_"I don’t know if this is a good decision but it also feels long overdue"_](https://fediverse.zachleat.com/@zachleat/115690869039097995) He was talking about creating a fork of the Nunjucks templating language. And now [v4.0.0-alpha.1](https://github.com/11ty/nunjucks/releases/tag/v4.0.0-alpha.1) has been released. This should be fun to watch.

**Quesby arrives.** [Quesby](https://quesby.dev/), billing itself as a _"A modern boilerplate built on Eleventy and Nunjucks with privacy and performance in mind."_ Their post titled [Why Eleventy Still Matters in 2026 (and Why Quesby Builds on It)](https://quesby.dev/blog/why-eleventy-still-matters-in-2026-and-why-quesby-builds-on-it/) is a good read. Even if you don't wish to consider adopting their boilerplace, they make a compelling case for why Eleventy is still a great choice for static site generation. _Note:_ I have not yet added all of their relevant blog posts to the bundle, so feel free to [review their blog](https://quesby.dev/blog/) for more goodness.

I'm going to end this note here, as I the posts and sites below await your perusal (that, and I'm heads-down on this redesign work).

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
