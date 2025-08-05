---
bundleIssue: 76
eleventyComputed:
  title: "Issue {{ bundleIssue }} - Veronica Explains, Eleventy Meetup July 23rd, An emerging CMS, Not using Wordpress, Switching to WebC, Performance gains, This title is too long...And 9 releases, 23 posts, and 25 sites to see"
  description: "11ty Bundle Issue {{ bundleIssue }}"
date: 2025-07-22
tags:
  - 11ty Bundle
youtubeId: 4_bYUVGgQQo
---

_An email version of this blog is available. **[Subscribe here](#newsletter-subscribe)**._

---

**_A note from Bob:_**

Oh boy, what a few weeks it's been. Life issues are settling down and I'm back with this **HUGE** issue of 11ty posts, releases, and sites to see. I've missed doing this.

These 11ty Bundle blog posts and newsletter will now be published monthly, rather than the every-other-week schedule I was on. I've just got too much on my plate right now to do it every two weeks.

Enjoy!

---

**Veronica Explains.** In [this video](https://www.youtube.com/watch?v=4_bYUVGgQQo), Veronica explains why she likes static sites, and in particular, Eleventy. It's a great watch and she does a fantastic job explaining the benefits of static sites.

{% set videoTitle = "The modern web sucks. My band's website doesn't." %}
{% set videoId = youtubeId %}
{% include 'partials/youtube.njk' %}

**Eleventy Meetup July 23rd.** [Kaj Kandler](https://kajkandler.com/) talks about adding structured data to his personal website, and [Michael Delaney](https://mwdelaney.me/) shows how to deploy 11ty automatically. [Event details here](https://11tymeetup.dev/events/ep-25-structured-data-and-deploying-11ty/). I'll be there too.

**An emerging CMS.** [Thinkymeat](https://thinkymeat.neocities.org/) has been cranking away since April on a CMS targeted for use with Eleventy. It's called 11tyCMS. Here are the blog posts she's written about it so far:

- Apr 14: [11tyCMS](https://thinkymeat.neocities.org/posts/11tycms/)
- Apr 17: [11tyCMS: Electron Prototype](https://thinkymeat.neocities.org/posts/11tycms-electron-prototype/)
- Apr 22: [11tyCMS: First design & file management](https://thinkymeat.neocities.org/posts/11tycms-redesign/)
- Jun 1: [11tyCMS: Improved File Management and Posts List](https://thinkymeat.neocities.org/posts/11tycms-improved-file-management-and-posts-list/)
- Jun 4: [11tyCMS: Trapped in image and markdown hell.](https://thinkymeat.neocities.org/posts/11tycms-trapped-in-image-hell/)
- Jul 3: [11tyCMS: Image uploads and design enhancements](https://thinkymeat.neocities.org/posts/11tycms-image-uploads-and-design-enhancements/)
- Jul 11: [11tyCMS: Metadata Editor, 11ty Build Integration & Design Refinements](https://thinkymeat.neocities.org/posts/11tycms-metadata-editor-11ty-build-integration/)

And, of course, you can also find these on [their author page](https://11tybundle.dev/authors/thinkymeat/) on this site.

**Not using Wordpress.** [Ryan Gittings](/authors/ryan-gittings/) did a really [nice write up](https://www.ryangittings.co.uk/blog/why-i-dont-use-wordpress/) on why he doesn't use Wordpress...and why he does use Eleventy.

**Switching to WebC.** [Harris Lapiroff](https://chromamine.com/) has a couple of posts about [switching to WebC](https://chromamine.com/2025/07/switching-to-webc/) and some of the [quirks he has run into](https://chromamine.com/2025/07/webc-quirks/).

**Performance gains.** The guys over at [Etch](https://etch.co/) describe how they achieved a 24% performance improvement when they migrated their site to Eleventy. [Read about it here](https://etch.co/blog/we-migrated-our-site-to-eleventy-and-increased-performance-by-24-percent/).

**This title is too long.** BUT...there were several other things that I felt were worthy of coverage. Here they are:

- [Work has started on Eleventy v4](https://github.com/11ty/eleventy/pull/3858)
- [Marcello's Place](https://marcellosplace.com/) is a very beautiful and content-rich recipe site built with Eleventy. And the recipes are presented really well. Check out this [Chicken and Rice Casserole](https://marcellosplace.com/recipes/chicken-and-rice-casserole/).
- [Eleventy for Neocities Users](https://github.com/nycki93/eleventy-for-neocities-users?tab=readme-ov-file#eleventy-for-neocities-users)
- The Eleventy docs now contain the project's [full release history](https://www.11ty.dev/docs/versions/), including pre-releases.
- We've crossed the [1,500 post mark here](/firehose).

## One more thing...

**Sticker price reduction.** The **[11ty Bundle stickers](https://bobmonsour.com/shop/)** are still available! Designed by [Andy Carolan](https://andycarolan.com), it's 4" x 2" with a matte-finish. They're ~~$5~~ **now only** $3 each. Tax & shipping are included in the price. Shipping them to anywhere in the world seems to be working. They've made it to the UK and Portugal so far, as well as both the east and west coasts of the US. [Get 'em while they're hot](https://bobmonsour.com/shop/)! If you order this week, I will be shipping them out next week.

![The new 11ty Bundle OG image](/assets/img/11tybundle-dev.png)

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
