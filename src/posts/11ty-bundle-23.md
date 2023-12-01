---
bundleIssue: 23
eleventyComputed:
  title: "Issue {{ bundleIssue }} - The future of JAMstack...Some other cool stuff...And 2 releases, 1 starter, 14 posts, and 8 sites to see."
  description: "Welcome to Issue {{ bundleIssue }}ty of the 11ty Bundle."
date: 2023-12-01
tags:
  - 11ty Bundle
---

Happy December to those who celebrate!

There's a lot going on these days.

First off, Zach put out a post on the [Tension and Future of JAMstack](https://www.zachleat.com/web/jamstack-future/). It's a great read and I highly recommend it. I'm not going to say much more about it because I think it's worth reading and thinking about. I will say that I'm excited to see what the future holds for the JAMstack and I'm excited to be a part of it. In the post, you'll find [a survey](https://thefutureofjamstack.org/). I encourage you to take it. It's a great way to share your thoughts and help shape the future of the JAMstack.

Second, Zach was interviewed by Mike Neumegen, the CEO of CloudCannon...and it's [All about Eleventy](https://www.youtube.com/watch?v=mZUTXX13X-I). This site gets a shout out, which I felt was pretty cool.

<iframe style="display:block; margin:0 auto 1em auto;" width="560" height="315" src="https://www.youtube.com/embed/mZUTXX13X-I?si=_jc43SX9Sv3Sn39C" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Of the two releases, one is for the [IndieWeb Avatar](https://www.11ty.dev/docs/services/indieweb-avatar/), one of several [API Services](https://www.11ty.dev/docs/api-services/) that Zach has built. I'd guess that these largely go un-noticed, so I wanted to highlight them here.

Lastly, and I don't know how new this is, but CloudCannon has a thing called Bookshop, which they describe as a "collection of tooling that provides a component development workflow for static websites, and aids in the creation of a page-building interface in the CloudCannon CMS." They've got a guide on [how to use Bookshop with Eleventy](https://cloudcannon.com/documentation/guides/bookshop-eleventy-guide/). And Zach recently [did a video](https://www.youtube.com/watch?v=AsWt6BTjzyk) to showcase it's use.

<iframe style="display:block; margin:0 auto 1em auto;" width="560" height="315" src="https://www.youtube.com/embed/AsWt6BTjzyk?si=3dsVT3N9G55zWdQ6" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

That's it for this issue. Until next time...

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
