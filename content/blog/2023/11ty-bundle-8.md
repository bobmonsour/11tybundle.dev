---
bundleIssue: 8
eleventyComputed:
  title: "A new author, a scroll-to-top button, and some refactoring"
  description: "Welcome to Issue {{ bundleIssue }} of the 11ty Bundle...a smattering of stuff."
date: 2023-05-31
tags:
  - 11ty Bundle
---

> TL;DR We've got a new author with a bunch of posts, I did some refactoring under the hood here, added a scroll-to-top button to the site, and we've lost some blog posts.

While I was traveling over the Memorial Day weekend, I happened upon a new blog post about Eleventy. And once I looked at the site, I was pleased to find 10 posts about Eleventy. These are by [John M. Wargo](/authors/john-m-wargo/) and several of them are listed below. I expect that he'll be writing more about Eleventy in the future.

There are a couple of other posts to highlight. First, There's an excellent review of Bryan Robinson's book Eleventy by Example, by Raymond Camden. And second, speaking of Raymond Camden...I had not seen this before, but he wrote an excellent piece called "A Complete Guide to Building a Blog with Eleventy," which he updated in March of this year. If you're just getting started with Eleventy, this would be yet another great place to start.

I also spent some time worrying about some of the code under the hood of the site. I'll be brief...I had placed much of the filtering of the database records throughout various templates. It turned out that some filters were being used more often than needed and there was way too much duplication...refactor time. So I decided to collect a lot of that filtering and added it to the javascript where I ingest the data from either Airtable or the cache. Now that code returns many of the item counts that you see as well as selected sets of records. It resulted in both simpler error handling and much simpler templates...both good things.

You may (or may not) notice that there's now a scroll-to-top button in the lower right-hand corner of your display. In the event you go way down into the [Firehose](/firehose/) or a long list of category posts and want to come up for air, it floats you to the top.

Lastly, the total post count has dropped a tad. The site of one of our authors has gone 404 and a few other blog posts seem to no longer exist. Now I need to figure out how to instrument the site to detect this automatically and prevent bad links from being published.

Until next time...
