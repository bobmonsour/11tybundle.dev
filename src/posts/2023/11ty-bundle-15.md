---
bundleIssue: 15
eleventyComputed:
  title: "Issue {{ bundleIssue }} - Crossing the 700 post mark, adding giscus commenting, Fathom Analytics, and the Eleventy Meetup"
  description: "Welcome to Issue {{ bundleIssue }} of the 11ty Bundle."
date: 2023-08-11
tags:
  - 11ty Bundle
---

We've got 7 new posts since the last issue. We're over 700 posts now.

I've added [giscus](https://giscus.app/) commenting to these blog posts. So if you have a GitHub account, you can comment here. Hat tip to [Bryce Wray](/authors/bryce-wray/) for the [inspiration](https://www.brycewray.com/posts/2023/08/making-giscus-less-gabby/). Though I have not used his details/summary approach to reduce javascript loading until necessary. I may change my mind later. Baby steps. In the mean time, please leave a comment if you're moved to do so.

_[UPDATE: 11-01-2023]: I have removed the giscus comments on the blog posts. Since adding them back in August, I have received one single comment (thanks Bryce) on any of the blog posts. In the interest of less javascript, they are hereby vanquished._

I've also added [Fathom Analytics](https://usefathom.com/ref/ANNPIR) to the site (heads up, that's a referral link that I could potentially benefit from). Hat tip to [Simon Cox](/authors/simon-cox/) for the recommendation. I had previously enabled Netlify analytics (for $9/mo...per site) to see how the site was doing. Since moving to Fathom, and digging a little deeper into Netlify analytics, it seems that the Netlify numbers were dramatically overstating actual user visits. I'll write up my findings in a future post. But for now, I'm happy with Fathom. While it's $14/mo, I can add it to up to 50 sites...I've already put it on 5 of my sites. And they have a pretty cool "all sites" dashboard view.

And last, but far from least, the next [Eleventy Meetup is scheduled for August 17th](https://11tymeetup.dev/events/ep-15-intelligent-indexing-and-now-pages/). The two talks will cover Intelligent Indexing using the [Pagefind search library](https://pagefind.app/), and How Raymond Camden built [his Now page](https://www.raymondcamden.com/now/).

Until next time...which, with more summer travel in store, might be a little while.

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

Four new sites to see. If you want to see more sites, check out the [Eleventy Leaderboards](https://www.11ty.dev/speedlify/).

{% set itemType = "site" %}
{% include 'partials/bundleitems.njk' %}
