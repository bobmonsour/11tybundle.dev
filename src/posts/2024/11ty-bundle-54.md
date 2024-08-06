---
bundleIssue: 54
eleventyComputed:
  title: "Issue {{ bundleIssue }} - v3.0.0-beta.1 has arrived!  🎉, More releases, A docs refresh discussion, Apple shortcuts for Netlify deployment, A minimal WebC starter, Some reminders...And 5 releases, 9 posts, 1 starter, and 7 sites to see"
  description: "11ty Bundle Issue {{ bundleIssue }}"
date: 2024-08-06
tags:
  - 11ty Bundle
---

_An email version of this blog is available. **[Subscribe here](#newsletter-subscribe)**._

---

**v3.0.0-beta.1 has arrived! 🎉** Welcome to beta-land! As [Zach writes](https://github.com/11ty/eleventy/releases/tag/v3.0.0-beta.1): _"After 18 alpha pre-releases and over a year of work, our very first beta release of Eleventy 3.0 is available."_ It's smaller, it's got fewer dependencies, and installs faster. Check out [the release notes to read all 20 flagship features](https://github.com/11ty/eleventy/releases/tag/v3.0.0-beta.1) .

There's also an [Upgrade Help plugin](https://github.com/11ty/eleventy-upgrade-help) to help you upgrade your Eleventy projects. There's even a [demo project that demonstrates use of the plugin](https://github.com/11ty/demo-eleventy-upgrade-help/).

And if you just can't wait and don't want to read any of that, then jump right in. Here's all you need to try it out on your project:

```
npm install @11ty/eleventy@beta
```

> This site is built with v3.0.0-beta-1! I made use of the [Upgrade Help plugin](https://github.com/11ty/eleventy-upgrade-help). I had to replace some errant tabs with spaces in a few posts' yaml front matter, but that was it. If you see any issues, please [let me know](mailto:bob.monsour@gmail.com).

Lastly, here's the [list of breaking changes](https://github.com/11ty/eleventy/issues?q=milestone%3A%22Eleventy+3.0.0%22+is%3Aclosed+label%3Abreaking-change).

**More releases.** As if that weren't enough in the flowing train of releases, here are just a few more things that have come out, including:

- [Eleventy Upgrade Help v3.0.1](https://github.com/11ty/eleventy-upgrade-help/releases/tag/v3.0.1)
- [Eleventy Image v5.0.0-beta.10](https://github.com/11ty/demo-eleventy-upgrade-help/)
- [Eleventy Dev Server v2.0.2](https://github.com/11ty/eleventy-dev-server/releases/tag/v2.0.2)

**A docs refresh discussion.** A GitHub discussion is underway among several active community members about refreshing the Eleventy documentation. The goal is to make it more accessible and easier to navigate. If you have thoughts or ideas, [join the conversation](https://github.com/11ty/eleventy/issues/3388).

**Apple shortcuts for Netlify deployment.** Among this week's posts is one from [Jim Nielsen](https://11tybundle.dev/authors/jim-nielsen/) showing how to create an Apple Shortcut to trigger a deploy of your site on Netlify. While not eleventy-specific, it's a neat way to automate a common task. [Check it out](https://blog.jim-nielsen.com/2024/deploying-with-netlify-shortcuts/).

**A minimal WebC starter.** [Ricky de Laveaga](https://11tybundle.dev/authors/ricky-de-laveaga/) brings to life a minimal WebC starter that he calls [WebC bed 🪸](https://github.com/rdela/webcbed#webc-bed-), with a coral emoji...get it? C bed...sea bed...never mind. I've added it to our [Starters page](/starters/).

**Some reminders.**

- You've probably been tuning out that large banner at the top of the page, asking you to help [Make 11ty Fully Independent and Sustainable](https://www.zachleat.com/web/independent-sustainable-11ty/). I get it. I tune out repeat banners all the time. Anyway, if you've considered supporting Eleventy financially but haven't done so yet, now's a great time to [do it](https://www.zachleat.com/web/independent-sustainable-11ty/). _[NOTE: I do not benefit in any way from this financial support.]_

- Now that I have added an [RSS feed for releases](https://11tybundle.dev/releasefeed.xml), you can now subscribe to feeds for both [the authored blog posts, aka the Firehose](https://11tybundle.dev/firehosefeed.xml) and releases as they are added between these blog posts.

- Lastly, if you've got a blog and write about Eleventy, my RSS reader, [Inoreader](https://www.inoreader.com/), can sometimes find them as it looks beyond my list of subscriptions for certain search terms like "eleventy" and "11ty." But it doesn't always find them. If you don't have an RSS feed for your blog, I'd encourage you to [add one](https://11tybundle.dev/categories/rss/). And if you do, you can make it more easily discoverable by following [this advice from Jim Nielsen](https://blog.jim-nielsen.com/2021/automatically-discoverable-rss-feeds/). And if you can make it discoverable, I'll discover it when building this site and I'll link to it. For example, like I do on this [author page](/authors/bob-monsour/).

Until next time...

## Recent releases

{% set itemType = "release" %}
{% include 'partials/bundleitems.njk' %}

## Posts from around the web

{% set itemType = "blog post" %}
{% include 'partials/bundleitems.njk' %}

## Built with Eleventy

Here are the new sites to see. If you want to see more sites, check out the [Eleventy Leaderboards](https://www.11ty.dev/speedlify/).

{% set itemType = "site" %}
{% include 'partials/bundleitems.njk' %}
