---
bundleIssue: 23
eleventyComputed:
  title: "Issue {{ bundleIssue }} - The future of JAMstack...Some other cool stuff..."
  description: "Welcome to Issue {{ bundleIssue }}ty of the 11ty Bundle."
date: 2023-12-01
tags:
  - 11ty Bundle
youtubeId: mZUTXX13X-I
---

Happy December to those who celebrate!

There's a lot going on these days.

First off, Zach put out a post on the [Tension and Future of JAMstack](https://www.zachleat.com/web/jamstack-future/). It's a great read and I highly recommend it. I'm not going to say much more about it because I think it's worth reading and thinking about. I will say that I'm excited to see what the future holds for the JAMstack and I'm excited to be a part of it. In the post, you'll find [a survey](https://thefutureofjamstack.org/). I encourage you to take it. It's a great way to share your thoughts and help shape the future of the JAMstack.

Second, Zach was interviewed by Mike Neumegen, the CEO of CloudCannon...and it's [All about Eleventy](https://www.youtube.com/watch?v=mZUTXX13X-I). This site gets a shout out, which I felt was pretty cool.

{% set videoTitle = "All about Eleventy (11ty) - Static Feedback #11" %}
{% set videoId = youtubeId %}
{% include 'partials/youtube.njk' %}

Of the two releases, one is for the [IndieWeb Avatar](https://www.11ty.dev/docs/services/indieweb-avatar/), one of several [API Services](https://www.11ty.dev/docs/api-services/) that Zach has built. I'd guess that these largely go un-noticed, so I wanted to highlight them here.

Lastly, and I don't know how new this is, but CloudCannon has a thing called Bookshop, which they describe as a "collection of tooling that provides a component development workflow for static websites, and aids in the creation of a page-building interface in the CloudCannon CMS." They've got a guide on [how to use Bookshop with Eleventy](https://cloudcannon.com/documentation/guides/bookshop-eleventy-guide/). And Zach recently [did a video](https://www.youtube.com/watch?v=AsWt6BTjzyk) to showcase it's use.

{% set videoTitle = "Live Editing an Eleventy Project in CloudCannon with Bookshop" %}
{% set videoId = "AsWt6BTjzyk" %}
{% include 'partials/youtube.njk' %}

That's it for this issue. Until next time...
