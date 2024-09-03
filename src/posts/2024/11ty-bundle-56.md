---
bundleIssue: 56
eleventyComputed:
  title: "Issue {{ bundleIssue }} - Trevor Morris on fire, Max does live CMS previews, Harris reveals his source, Zach talks web components with Oddbird, Metadata for the starters...And 1 release, 10 posts and 11 sites to see"
  description: "11ty Bundle Issue {{ bundleIssue }}"
date: 2024-09-03
tags:
  - 11ty Bundle
---

_An email version of this blog is available. **[Subscribe here](#newsletter-subscribe)**._

---

**Trevor Morris on fire.** Since the last issue, [Trevor Morris](/authors/trevor-morris/) has been on a tear with four interesting and useful posts. Go to that link or see them below. I found his post on _[Organising Eleventy Filters, Shortcodes and more…](https://www.trovster.com/blog/2024/08/organising-eleventy-filters-shortcodes-and-more)_ to be particularly useful and I think I will be adopting some of the techniques he describes.

**Max does live CMS previews.** [Max Böck](https://mxb.dev/) has a very in-depth post on "_How to set up on-demand building in Eleventy to allow live content previews with Sanity CMS._" If you're using [Sanity](https://www.sanity.io/) as your CMS, [this is a must-read](https://mxb.dev/blog/live-cms-previews-with-sanity-and-eleventy/).

**Harris reveals his source.** [Harris Lapiroff](https://chromamine.com/) shows us how we can see the underlying source code for his blog posts by simply adding a file extension to the post link. Unlike the browser's view source feature, with Harris' method you can see the front matter and post content as written. [Check it out](https://chromamine.com/2024/08/making-blog-post-source-files-available-with-11ty/). I think it's pretty cool.

**Zach talks web components with Oddbird.** Zach participated in a wide-ranging discussion with Miriam Suzanne and James Stuckey Weber of [Oddbird](https://www.oddbird.net/) around all aspects of web components. While I don't recall much of any mention of WebC, it was a fascinating conversation. [Check it out](https://www.zachleat.com/web/winging-it/).

**Metadata for the Starters.** Well, I did some of the work that I mentioned last time, i.e., adding some metadata to each of the [Starters](/starters/). I used the GitHub API to gather much of this.

Each starter in the list now includes the following metadata:

- date of the last commit to the repo
- number of GitHub stars
- Eleventy version as listed in package.json file
- link to a demo site (if one exists)

The main page lists the starters in order of the last commit date. This will help you identify the most active starters. You can also [sort the list by the number of GitHub stars](/starters-by-stars) using the link next to the main page title.

_A note to starter authors_: I'd encourage you to provide a demo site for your starter. I had to go to each starter repo to locate the demo link, but was disappointed to see that a few don't have one. It's a great way to show off your work! If you add one, please [send me an email](mailto:bob.monsour@gmail.com) as there's no way for me to detect this automatically.

Speaking of starters...while they have not been merged into their respective mains just yet, my sources (meaning some GitHub notifications) indicate that there are new versions of [Adam Stoddard's Grease starter](https://github.com/adamstddrd/grease/tree/v3) and the [eleventy-base-blog](https://github.com/11ty/eleventy-base-blog/tree/v9) in the works. I'm looking forward to seeing them go live.

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
