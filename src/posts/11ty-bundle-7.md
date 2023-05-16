---
bundleIssue: 7
eleventyComputed:
  title: "Issue {{ bundleIssue }} - Where does it all come from?"
  description: "Welcome to Issue {{ bundleIssue }} of the 11ty Bundle...sausage making, described."
date: 2023-05-16
tags:
  - 11ty Bundle
keywords: eleventy, 11ty, newsletter, roundup, news
image:
  source: "11tybundle-dev.jpg"
  alt: "an AI-generated image of the number eleven"
draft: false
---

> TL;DR With no new releases, just a few blog posts, and a handful of sites, I took the opportunity to dive into the process of gathering content for this site. You can [skip all that to get to the posts and sites](#releases).

Since the number of new releases and posts since the last issue is rather light, I thought I'd describe where I'm finding all of the content for the site and the process that has evolved for ingesting it all.

When the 11ty Bundle blog posts were hosted on [my personal site](https://www.bobmonsour.com/), the guts of the first few issues were hand-coded in markdown. I knew that would get old with the amount of content I was discovering. So I started looking for ways to streamline the content collection process.

By Issue 4, I had created an [Airtable](https://airtable.com/) database to store metadata for each post, release, and site (links, authors, categories, pub dates, etc.). First, I had to copy and paste all the items from the first few issues into the database. As of now, each record in the database is either an official Eleventy-related release, a blog post, a site built with Eleventy, or a starter project.

It took me a while to figure out how to get the Airtable data into Eleventy and I relied on a couple of helpful blog posts to get that working. Javascript global data files are a wonderful thing!

After getting that to work, I realized that each post could "include" a few partials that would extract the data for each of the main sections: releases, posts, and sites...in essence, unique filters of the complete set of records. That would make creating each 11ty Bundle blog post a lot simpler. The key would be to populate the Airtable database with enough content for the site to have utility for Eleventy adopters.

When I decided that I would announce the launch of the site with Issue 5, I knew that I had to flesh out the content in each of the categories so that none of them felt too light. My first effort was a massive amount of googling for the relevant categories. It seemed that every time I turned around, there was a vein of new Eleventy gold to mine. My first attempt at categorizing each item was pretty weak, so I went back and reworked it, considering the kinds of issues showing up on Discord, the Eleventy Github repo discussions, and reviewing the main topics of the Eleventy docs. Some items are tagged with multiple categories, with the "[How To](/categories/how-to/)" category becoming quite large. It's not optimal, but it seems workable.

Things were feeling better, but the process of copying and pasting titles, links, authors, and pub dates for blog posts was tedious. After each intense googling session, I'd end up with dozens of open browser tabs, each waiting to be reviewed for possible inclusion. So I created a simple Airtable form to capture the data. I also made use of [Alfred's](https://www.alfredapp.com/) clipboard history feature. So I could land on a blog post, do a bunch of copying, then switch over to the form and paste, paste, paste. This sped up the process considerably. I use [Magnet](https://magnet.crowdcafe.com/) as a window manager and learned the right hotkeys to arrange browser windows side by side and back again.

I also realized that panning for this gold, i.e., googling, was not a sustainable solution on its own. RSS to the rescue. I'm a [NetNewsWire](https://netnewswire.com/) user. I began to subscribe to the RSS feeds of all of the blogs from which I was capturing content. I also added a couple of Google alerts and mixed in some pinned browser tabs with multi-column setups on Mastodon and Tweetdeck with searches for 11ty and Eleventy hashtags as well as the profile of the main Eleventy accounts (though I'm rethinking the use of Twitter as it's been low yield). Then there are a couple of pinned tabs of [dev.to](https://dev.to) with the [Eleventy](https://dev.to/t/eleventy/latest) and [11ty](https://dev.to/t/11ty/latest) hashtags. I also keep the Eleventy Discord nearby for breaking info as well as to answer an occasion question (if I'm able).

Recently, I learned a much better way to ingest the data from the Airtable database. Cassey Lottman wrote an [immensely helpful blog post](https://www.cassey.dev/posts/2023-05-09-airtable-data-fetch/) as she had just gone down this path. The method I learned from Cassey caches the data using the [eleventy-fetch plugin](https://www.11ty.dev/docs/plugins/fetch/) so that I wouldn't be hitting the Airtable API on every build. Thank you, Cassey!

Well, that's pretty much where things stand at the moment. The most recent addition to the site is the list of [starter projects](/starters/). Next up...I think...will be a submission form to allow community members to suggest blog posts or other ideas. We'll see. In the meantime, I've been doing some refactoring and organizing the code to make it easier to maintain. Lastly, I hope to write a coding blog post or two to showcase what's under the hood.

But wait...based on one of the latest blog posts from Simon Cox (see below), I feel compelled to add a "Debugging" category. A quick panning exercise has unearthed a treasure trove of blog posts (some of which may already be in the database). Stay tuned...

<div id="releases"></div>

## Recent releases

{% include 'partials/bundlereleases.njk' %}

## Posts from around the web since the last Bundle issue

{% include 'partials/bundleposts.njk' %}

## Built with Eleventy

Listed below are just a handful of the many sites built with Eleventy. All of this week's sites are from web developers and designers. Aleksandr has been particularly prolific and writes some of the best in-depth tutorials that I've come across. He covers a wide range of web development topics and he's always worth a read.

{% include 'partials/bundlesites.njk' %}
