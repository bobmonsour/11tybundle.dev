---
bundleIssue: 33
eleventyComputed:
  title: "Issue {{ bundleIssue }} - 11ty Conference call for proposals...The conference site is open source...Yet another open source CMS for SSGs...A couple of tweaks to this site...And 13 posts, and 3 sites to see."
  description: "Welcome to Issue {{ bundleIssue }} of the 11ty Bundle."
date: 2024-02-28
tags:
  - 11ty Bundle
image:
  source: 11tysymposium2024.jpg
  alt: "Announcement of the 11ty International Symposium on Making Web Sites Real Good"
---

There is an [open call for talk proposals for the 11ty conference](https://docs.google.com/forms/d/e/1FAIpQLScdwhO1zfEBvl8mVAJQLWbK0EylD4yPCBpe3Lanz8SvFPI9Xg/viewform). Here's a brief summary of what they're looking for:

> We’re looking for a mix of 22-minute or 11-minute (lightning) talks on a variety of topics that will interest folks that care about the craft of building for the web: Best Practices That Work (CSS), Development Trends (e.g. Navigating the Great Divide), Jamstack, Front of the front end Development, Design Systems, Accessibility, Open Source, Web Performance (and probably some Eleventy too!).

If that sounds like something you'd be interested in doing, [head on over](https://docs.google.com/forms/d/e/1FAIpQLScdwhO1zfEBvl8mVAJQLWbK0EylD4yPCBpe3Lanz8SvFPI9Xg/viewform).

On two related notes, the [conference site](https://conf.11ty.dev/) is built with Eleventy, and second, it's now an [open source project](https://github.com/11ty/11ty-conf). So you can see how Zach did that cool thing with the tickets. It's really pretty neat. Note that he and Mike from CloudCannon did [a video on how he did it](https://www.youtube.com/watch?v=QPOkigRYYkI).

I came across yet another CMS that works with Eleventy. It's called [Pages CMS](https://pagescms.org/) and it's [open source](https://github.com/pages-cms/pages-cms). I have not tried it, but it might be worth exploring if you've been comparing the various CMS projects that work well with static site generators.

Two more things about this site:

1. Since the last post, I realized that there was another side effect of my including the full, un-truncated, descriptions for each blog post. Search now covers the full description...so there's more there...there. I particularly like the long descriptions that Cory Dransfeldt writes. I'm glad they're now searchable.

2. There's another new category...[permalinks](/categories/permalinks/). I've got ideas for a few more...stay tuned.

That's all for now...until next time...

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
