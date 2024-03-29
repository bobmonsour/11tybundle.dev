---
bundleIssue: 6
eleventyComputed:
  title: "Issue {{ bundleIssue }} - Stats, a book, and a bit more"
  description: "Welcome to Issue {{ bundleIssue }} of the 11ty Bundle. We've now got over 500 posts from more than 200 authors."
date: 2023-05-09
tags:
  - 11ty Bundle
---

Since the last issue (May 1st) I've added 158 posts to the site. There are 114 posts just from this year. We've now got over 500 posts from more than 200 authors. Each post is categorized, and [each category](/categories/) is listed with the newest posts firsts. I've added a couple of new categories too. One is "Search." As of this writing, there are [5 good posts](/categories/search/) on adding search functionality to your Eleventy site.

New to the site, you'll find that for categories that have a direct relation to the Eleventy docs, the first "post" is a link to the relevant doc section, for example the [Data Cascade](/categories/data-cascade/).

**THIS JUST IN:** On Friday, I received my copy of Bryan Robinson's new book, **_"Eleventy by Example: Create powerful, performant websites with a static-first strategy_**." I've only given it a skim so far, but it covers everything from getting started to deployment, illustrating example projects along the way. The book is published by Packt Publishing. [Check it out!](https://www.packtpub.com/product/eleventy-by-example/) There's even a free chapter available on the Packt site, all about adding data to your Eleventy site. Finally, Bryan's own blog post about the book release is included in the blog post section below.

## Recent releases

{% set itemType = "release" %}
{% include 'partials/bundleitems.njk' %}

## Posts from around the web since the last Bundle issue

{% set itemType = "blog post" %}
{% include 'partials/bundleitems.njk' %}

## Built with Eleventy

Listed below are just a handful of the many sites built with Eleventy. One site on the list has already shown up in the blog post section of an earlier issue. But it's worth a second look because it's so awesome. That would be Grease. It's a beautifully built open-source website starter. I plan to add a set of links to some of the more recent starters in coming issues.

{% set itemType = "site" %}
{% include 'partials/bundleitems.njk' %}
