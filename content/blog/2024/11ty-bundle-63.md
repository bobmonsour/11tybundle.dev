---
bundleIssue: 63
eleventyComputed:
  title: "Issue {{ bundleIssue }} - Build a centralized RSS feed, An aspirational web, An EmojiStorm on my Lens, Update: autofocus in search, What's on your bookshelf...And 6 releases, 6 posts and 17 sites to see"
  description: "11ty Bundle Issue {{ bundleIssue }}"
date: 2024-12-23
tags:
  - 11ty Bundle
snow: "true"
---

_An email version of this blog is available. **[Subscribe here](#newsletter-subscribe)**._

---

**_A note from Bob:_**

Wishing everyone a very Merry Christmas, Happy Hanukkah, or whatever faith brings you joy during this season!

---

**Build a centralized RSS feed.** Zach released a [eleventy-activity-feed](https://github.com/11ty/eleventy-activity-feed). Here's what it says on the tin: _"Activity Feed lets you build one centralized RSS feed that pulls in new entries from a bunch of different social networking sites. Support for (one or more) YouTube, RSS or Atom for existing blogs, and Bluesky or Mastodon (via RSS)."_ Go forth, and feed!

**An aspirational web.** [Cory Dransfeldt](https://coryd.dev/) wrote a [short post](https://coryd.dev/posts/2024/an-aspirational-web) about the W3C's recent [Statement on Ethical Web Principles](https://www.w3.org/blog/2024/w3c-statement-on-ethical-web-principles-guides-the-community-to-build-a-better-web/). I think Cory nails it when he says, _"As developers, technologists and people it's incumbent upon us to help contribute to the web we'd like to see."_

**An EmojiStorm on my Lens.** I know, that makes no sense at all, unless you've been following [Robb Knight's](https://rknight.me/) work on his silly side project called [EmojiStorm](https://emojistorm.rknight.me/) and his more useful side project called [Lens](https://lens.rknight.me/). Go and check out EmojiStorm as there's not much to say here. On the other hand, [Lens](https://lens.rknight.me/) is a sweet little meta tag checker. Robb [wrote a post about it](https://rknight.me/blog/lens-meta-tag-checker-robbs-version/). In short, you enter your URL, and it checks out the the page. You get a nice little series of green checks...at least I did when I tried it out on one site. I don't know if you have bad meta tags. So, go ahead and put your pages under the [Lens](https://lens.rknight.me/).

**Update: autofocus in search.** I got some excellent feedback on the question that I posed in the [last issue](/blog/11ty-bundle-62/). I've decided to remove the autofocus from the search form that is on every page. [Jan De Wilde](https://jandewil.de/) provided some very thoughtful feedback and educated me on the accessibility that is lost when autofocus is not used in the right circumstances. My apologies to any visitors here where were frustrated by the use of autofocus.

**What's on your bookshelf.** Due to a strange confluence of events, ranging from a question on social media to sitting on a jury with another web dude to an 11ty dev writing up how he built his, it seems that _"bookshelves"_ are appearing on more and more personal sites. Anyway, I've been inspired by several of these bookshelves:

- [Cory Dransfeldt](https://coryd.dev/books)
- [Sean Voisen](https://sean.voisen.org/bookshelf/)
- [Melanie Richards](https://melanie-richards.com/currently/reading/)
- [Chazz Basuta](https://thisguise.wtf/bookshelf/)
- [Dave Rupert](https://daverupert.com/bookshelf)

And in this issue, you'll find [a post about how Chazz built his](https://thisguise.wtf/blog/2024/12/06/building-a-goodreads-bookshelf-for-11ty/). In an earlier issue, we featured a [post by Melanie Richards about how she built hers](https://melanie-richards.com/blog/new-reading-page/).

Having been so inspired, I decided to spin one up over the last few days. I haven't written about it yet, but [here it is](https://bobmonsour.com/books/). I'll write about my approach to it before too long. Suffice it to say that smallish data sets can be messier than you might expect.

Until next time...

---

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
