---
bundleIssue: 41
eleventyComputed:
  title: "Issue {{ bundleIssue }} - This site's 1st birthday, the 11ty conference is next week, Generate robots.txt, Two more starters, Some radar sightings...And 1 release, 3 posts, and 3 sites to see"
  description: "11ty Bundle Issue {{ bundleIssue }}"
date: 2024-05-01
tags:
  - 11ty Bundle
image:
  source: 11tysymposium2024.jpg
  alt: "Announcement of the 11ty International Symposium on Making Web Sites Real Good"
confetti: "true"
---

The email version of this blog is dangerously close to a whopping 30 subscribers. You, yes you, can be that 30th subscriber. [Subscribe here](#newsletter-subscribe).

**This site's first birthday** One year ago today, I posted [Issue 5 of the 11ty Bundle](https://11tybundle.dev/blog/11ty-bundle-5/). I called it _**LAUNCH DAY**_ as that is when this site went live. The first 4 issues were published on [my personal site](https://www.bobmonsour.com/) (but have since been relocated here). At that time, the site featured _"more than 300 blog posts across more than 25 categories written by more than 100 authors."_ As of today, we're at 1,054 blog posts, across 42 categories, written by 330 authors...as well as 30 starter projects. Most recently, I've added a [newsletter version](#newsletter-subscribe) of the blog. I honestly don't know how long I'll keep this up, but I'm still having fun with it. I hope that you find it useful. I've written up a [year in review post](https://www.bobmonsour.com/posts/the-11ty-bundle-continues/) on my personal site.

Here's an early design sketch from April of last year:

{% image "src/assets/img/early-design-sketch.avif", "The journey is on.", "(min-width: 1000px) 1000px, 100vw" %}

**11ty conference is next week, May 9th!** Here's the [list of speakers](https://conf.11ty.dev/#speakers) so far. It's **FREE**, single-track, and virtual. If you've waited until the last minute, now's the time to [register](https://conf.11ty.dev/#register).

**Generate robots.txt** [Aleksandr Hovhannisyan](https://www.aleksandrhovhannisyan.com/) has developed [eleventy-plugin-robotstxt](https://github.com/AleksandrHovhannisyan/eleventy-plugin-robotstxt), an experimental plugin that is only compatible with elevetny v3.0.0-alpha.6 or later. It's purpose is to _"Automatically generate a robotx.txt file for your Eleventy site using front matter."_ He provides lots of examples. [Check it out](https://github.com/AleksandrHovhannisyan/eleventy-plugin-robotstxt).

**Two new starters** There's a [resume template](https://github.com/devon-wolf/resume-template) by [Devon Wolf](https://github.com/devon-wolf) and an [image portfolio website template named halide](https://github.com/danurbanowicz/halide) that uses Tina CMS by [
Dan Urbanowicz](https://github.com/danurbanowicz). Respective demos are [here](https://devon-wolf.github.io/resume-template/) and [here](https://halide.netlify.app).

**Some radar sightings** These are just a couple of 11ty-related things that caught my eye.

- [Lucide](https://lucide.dev/icons/) is a set of SVG icons. And the [eleventy-plugin-lucide-icons](https://github.com/GrimLink/eleventy-plugin-lucide-icons/blob/main/README.md) by [Sean van Zuidam](https://github.com/GrimLink) _"...enables the inclusion of lucide-icons as inline SVG elements."_ It lets you use shortcodes like this {% raw %}{% lucide "shopping-cart" %}{% endraw %}.

- In [Copy my Copywork](https://photogabble.co.uk/noteworthy/copy-my-copywork/), [Simon Dann](/authors/simon-dann/) writes about why he publishes the source for his site _"for all to see"_. He recounts how learned from others who published theirs and shares the [site of Aram Zucker-Scharff](https://aramzs.xyz/), who based his site on Simon's source. It's one of the wonderful things about the web and open source.

**One more thing...** A lot of people have been building "now" pages, highlighting what they're up to at the moment. They've all be inspired by [The Now Page Movement](https://sive.rs/nowff) from [Derek Sivers](https://sive.rs/). Did you know that there's a category on this site called [Now Page](/categories/now-page/)? It has (as of this writing) 11 posts. If you've thought of making your own, [these might inspire you](/categories/now-page/).

**Ok, two more things** This blog might have a dry spell for the rest of May and part of June as we're traveling a bit before my wife has her other hip replaced...and I have a hearing test to see if my profoundly deaf left ear qualifies for a cochlear implant. That said, while I might not publishing Issue 42, any new posts from the [authors](/authors/) that I find will show up on the [Firehose page](/firehose/) thanks to a nightly rebuild. Note also that the Firehose has [its own RSS feed](https://11tybundle.dev/firehosefeed.xml).

Until next time...

## Recent releases

{% set itemType = "release" %}
{%- include 'partials/bundleitems.njk' %}

## Posts from around the web since the last Bundle issue

{% set itemType = "blog post" %}
{% include 'partials/bundleitems.njk' %}

## Built with Eleventy

Here are the new sites to see. If you want to see more sites, check out the [Eleventy Leaderboards](https://www.11ty.dev/speedlify/).

{% set itemType = "site" %}
{% include 'partials/bundleitems.njk' %}
