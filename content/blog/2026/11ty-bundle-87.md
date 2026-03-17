---
bundleIssue: 87
eleventyComputed:
  title: "Little content helpers, An AMA where we AZE (Asked Zach Everything), Lots of building, A community solution, CSS and HTML timelines"
  description: "11ty Bundle Issue {{ bundleIssue }}"
date: 2026-03-17
tags:
  - 11ty Bundle
youtubeId: lA-wD89m6jM
---

---

## A note from Bob:

First off, Happy St. Patrick's Day to all!

Well, we had the final Eleventy Meetup under Sia's great leadership. For all who attended this most recent (and maybe not final) episode, many thanks for being there. I think we peeked at around 42 attendees. Tyler Sticka gave a great talk and Zach treated us to an AMA about Build Awesome and the future of Eleventy. More on both of those below.

Separately, I've decided to put out these issues whenever it seems that there's enough content to justify one. As a result, I hope you'll find them a bit more digestable and less overwhelming. I've built a new local-only CMS that makes it clear how much content is ready for the next issue so it's easier for me to see on a regular basis.

---

## Highlights

**Little content helpers.** [Tyler Sticka](https://tylersticka.com) gave a great talk, titled [Little Dummies: Simple FPO Content Helpers](https://cloudfour.com/thinks/little-dummies-simple-fpo-content-helpers/), sharing some simple shortcodes and filters for quickly generating dummy content, including text, images, and icons. Tyler embeds the video in that post and it's also on the [Eleventy Meetup YouTube channel](https://www.youtube.com/@THEEleventyMeetup).

**An AMA where we AZE (Asked Zach Everything).** [Zach Leatherman](https://www.zachleat.com/) did an [AMA about Build Awesome](https://www.youtube.com/watch?v=lA-wD89m6jM). It too is on the [Eleventy Meetup YouTube channel](https://www.youtube.com/@THEEleventyMeetup). But I'll embed it here in case you want to watch it inline.

{% set videoTitle = "AMA about Build Awesome" %}
{% set videoId = youtubeId %}
{% include 'partials/youtube.njk' %}

**Lots of building.** [Brennan Kenneth Brown](https://brennan.day) rips through a ton of things that he's done in [Building brennan.day Part Two: IndieWeb, New Features, and Three Months of Iterations](https://brennan.day/building-brennan-day-part-two-indieweb-new-features-and-three-months-of-iterations/), including IndieWeb features, performance optimizations, and more.

**A community solution.** I love how [a Mastodon query](https://fediscience.org/@tlohde/116217614055899048) by [tlohde](https://tlohde.com/) results in blog post solutions like this. [Juha-Matti Santala](https://hamatti.org), in [Markdown content split to sections in Eleventy and Nunjucks](https://hamatti.org/posts/markdown-content-split-to-sections-in-eleventy-and-nunjucks/), explains how to split Markdown content into multiple sections in Eleventy using a Nunjucks filter with a custom keyword separator for flexible layout rendering.

**CSS and HTML Timelines.** [Micah Torcellini](https://micah.torcellini.org) gives us [Simple Pure CSS/HTML Timeline (with Extra Eleventy Integration)](https://micah.torcellini.org/2026/03/17/simple-timeline/). This is a pretty cool way to use CSS to generate timelines using pure CSS and HTML, and no javascript.

{% include "partials/rss-item-links.njk" %}

Until next time...
