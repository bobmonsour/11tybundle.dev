---
bundleIssue: 7
eleventyComputed:
  title: "Issue {{ bundleIssue }} - Where does it all come from?"
  description: "Welcome to Issue {{ bundleIssue }} of the 11ty Bundle...sausage making, described."
date: 2023-05-09
tags:
  - 11ty Bundle
keywords: eleventy, 11ty, newsletter, roundup, news
image:
  source: "11tybundle-dev.jpg"
  alt: "an AI-generated image of the number eleven"
draft: true
---

Since the number of [new releases and posts](#releases) since the last issue is on the light side, I thought I'd describe where I'm finding all of these blog posts and other resources and my process for ingesting all this data.

When I created the first few issues of the 11ty Bundle blog, every item was hand-coded in markdown. After a few issues, I knew that would get old. So I started looking for ways to streamline the content creation process.

By Issue 4, I had created an [Airtable](https://airtable.com/) database to store the info about the posts, releases, and sites (links, authors, pub dates, etc.). First, I had to copy and paste all of the items from the first 3 issues into the database. Each record in the database is either an eleventy-related release, a blog post, a site built with Eleventy, or a starter project.

It took me a while to figure out how to get the Airtable data into Eleventy and I relied on a couple of helpful blog posts to get that working. Javascript global data files are a wonderful thing!

After getting that to work, I realized that each post could "include" a few partials that would extract the data for each of the main sections: releases, posts, and sites. That would make creating each post a lot simpler. The key would be to keep populating the Airtable database with new content.

When I decided that I would announce the launch of the site with Issue 5, I knew that I had to flesh out the categories so that none of them felt too light. My first effort was a massive amount of googling on the topics that needed topping off. It seemed that every time I turned around, there was a vein of new Eleventy gold to mine. My first attempt at categorizing was pretty weak, so I went back and reworked it, considering the kinds of issues showing up on Discord, the Eleventy Github repo discussions, and reviewing the main topics of the Eleventy docs.

Things were feeling better, but the process of copying and pasting titles, links, authors, and pub dates for blog posts was getting pretty tedious. After intense googling sessions, I would end up with literally dozens of open browser tabs, each waiting to be reviewed for possible entry. So, I created a simple Airtable form to capture the data. And since I use [Alfred](https://www.alfredapp.com/) (a Mac launch/search tool with a lot of other stuff), I found that it had a multi-level clipboard. So, I could land on a blog post, do a bunch of copying, then switch over to the form and paste, paste, paste. This sped up the process considerably. I use [Magnet](https://magnet.crowdcafe.com/) as a window manager and learned the right hotkeys to arrange browser windows side by side and back again.

I also realized that me googling was not a real long-term solution (though I will still be doing some of that). So, as a [NetNewsWire](https://netnewswire.com/) (RSS reader) user, I began to subscribe to the RSS feeds of all of the blogs from which I was capturing content. I added a couple of Google alerts and some permanently pinned browser tabs with multi-column pages on Mastodon and Tweetdeck with searches for 11ty and Eleventy hashtags as well as the profile of the main Eleventy accounts. Then there are a couple of pinned tabs of the dev.to site with the Eleventy and 11ty hashtags selected. I also keep the Eleventy Discord nearby for breaking info as well as to occasionally answer a question.

Recently, I learned a much better way to ingest the data from the Airtable database into Eleventy. Cassey Lottman wrote an [immensely helpful blog post](https://www.cassey.dev/posts/2023-05-09-airtable-data-fetch/) as she had just gone down this path. The method I learned from Cassey caches the data using eleventy-fetch so that I wouldn't be hitting the Airtable API on every build (I'm on their generous free tier).

Well, that's pretty much where things stand at the moment. The most recent addition to the site is the list of [starter projects](/starters/). Next up...I think...will be a form to allow community members to submit blog posts or other ideas. We'll see. In the meantime, I've been doing some refactoring and organizing the code to make it easier to maintain. Lastly, I hope to write a coding blog post or two to showcase what's under the hood here.

<div id="releases"></div>

## Recent releases

{% include 'partials/bundlereleases.njk' %}

## Posts from around the web since the last Bundle issue

{% include 'partials/bundleposts.njk' %}

## Built with Eleventy

Listed below are just a handful of the many sites built with Eleventy. One site on the list has already shown up in the blog post section of an earlier issue. But it's worth a second look because it's so awesome. That would be Grease. It's a beautifully built open-source website starter. I plan to add a set of links to some of the more recent starters in coming issues.

{% include 'partials/bundlesites.njk' %}
