---
bundleIssue: 30
eleventyComputed:
  title: "Issue {{ bundleIssue }} - Two new categories...Eleventy Meetup...11ty site for a 7 year-old's art...Designing in public...Search on every page...And 5 posts, and 4 sites to see. "
  description: "Welcome to Issue {{ bundleIssue }} of the 11ty Bundle."
date: 2024-02-06
tags:
  - 11ty Bundle
image:
  source: 11tysymposium2024.jpg
  alt: "Announcement of the 11ty International Symposium on Making Web Sites Real Good"
---

First off, don't forget to [sign up for news about the upcoming (May 2024) 11ty conference](https://conf.11ty.dev/). See that button at the tippy-top of every page of this site? That takes you there too.

Next up, we've added to new categories to the Bundle. As I've been scouring the planet for 11ty blog posts, I noticed two things. One is that many bloggers want to know how to make drafts of their posts that don't get published until deemed ready by their author. Well, now there's [a category for that](/categories/drafts/). And we've all had our struggles with getting our RSS feeds just so. So, now there's [a category for that](/categories/rss/) too. As part of getting your RSS feed going, I'd encourage you to take advantage of the [W3C's feed validator](https://validator.w3.org/feed/).

Earlier today, the next [Eleventy Meetup](https://11tymeetup.dev/) was been announced. It will be held on February 20th at 10am CST. The site has a cool "convert to local" time link to help you figure out when that is for you. The two speakers on tap are:

- [Juha-Matti Santala](https://hamatti.org/) with a talk titled "Building a meetup community site using Global Data Files"
- [Robb Knight](https://rknight.me/) with a talk titled "Using Eleventy to Gobble Up Everything I Do Online"

In what I'll call the "site of the week" is one built by a dad, [Saneef Ansari](https://saneef.com/), for his 7 year-old son Shiro. I came across Saneef's "conversation" with his Shiro and it went like this:

```plaintext
7-year-old: Can I put my drawing videos on YouTube?
Me: No.

7-year-old: Can I put my drawings on Instagram?
Me: No way.

7-year-old: Can you make me a website for my drawings?
Me: (after thinking for a moment) Okay. That I can do!
```

Here's [Shiro's site](https://shiro.ws/). It's even got [an RSS feed](https://shiro.ws/feed.xml). You'll see a link in the footer of each page that says "Email me (My mom or dad will read it to me.)" I sent a short email to Shiro and got a nice reply from him via his dad. I love encouraging kids to be creative. I'm sure Shiro would love to hear from you too.

In the interest of "designing in public," I've been inspired by several people aggregating feeds for various blogs ([just one example](https://rs.sjoy.lol/), thanks, [Sara](https://sarajoy.dev/)), and showing the source and their most recent few links. It drove me to create a new version of the Categories page. <span class="strikethrough">You can see it here, but it's also accessible from the primary Categories page; and you can flip back and forth between them with the "new design" and "old design" links there.</span> **It's live now on the main [Categories](/categories/) page.** I think this is an improvement, and I want to do this for the Authors page too. Before making it the default, I have some other redesign ideas in progress and hope to have most of that done before the next issue.

And in case you hadn't noticed, the search box now appears on every page. It not only searches these blog posts, it now searches all {{ bundledata.categoryCount }} categories which contain all {{ bundledata.postCount }} posts on the site. Search results will show a category and the posts in that category where the title or description matches your search term. Give it a whirl. It's even helping me find posts that I have incorrectly or insufficiently categorized. And it helped me figure out that we needed the Drafts and RSS categories. Shout out to [Clayton Errington](https://claytonerrington.com/) for ingniting the spark in [a Mastodon post](https://indieweb.social/deck/@cjerrington@mstdn.social/111859601642151307).

One more thing about this site...I was able to reduce the build time from about 30 seconds to around 10 seconds. I wrote about how I did it, calling it [Slashing by caching](https://www.bobmonsour.com/posts/slashing-by-caching/).

One more thing...a cool thing I came across this week is:

- [Using Rmarkdown with Eleventy](https://www.schmidtynotes.com/blog/r/2023-02-03-test-rmd/) - R is a language and environment for statistical computing and graphics. R Markdown provides a plaintext authoring framework for data science. If you're into creating visualizations, this might be of interest to you.

Until next time...

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
