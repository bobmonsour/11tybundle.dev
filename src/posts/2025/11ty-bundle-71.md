---
bundleIssue: 71
eleventyComputed:
  title: "Issue {{ bundleIssue }} - 11ty Meetup Apr 23, CMS developments in progress, Drafts are simpler, QR code curious?, Eleventy v3.1.0-alpha.1...And 4 releases, 19 posts, and 6 sites to see"
  description: "11ty Bundle Issue {{ bundleIssue }}"
date: 2025-04-01
tags:
  - 11ty Bundle
---

_An email version of this blog is available. **[Subscribe here](#newsletter-subscribe)**._

---

**_A note from Bob:_**

Writing this following the first week of our month-long stay in Burbank. I continue rehab from knee replacement surgery and my wife has completed 5 of her 20 radiation treatments. So far, we're both doing well and staying positive. We lucked out with a nice Airbnb in a nice walkable neighborhood. Our dog, Soda, is loving it.

---

**11ty meetup Apr 23.** The date is set for the next [Eleventy Meetup](https://11tymeetup.dev/events/ep-23-notion-as-a-cms-and-component-prototyping/). Hear from vrugtehagel (their handle on the [Discord server](https://www.11ty.dev/blog/discord/)) on how he uses Notion as a CMS, and [Michael Delaney](https://mwdelaney.me/) will walk through component prototyping with 11ty.

**CMS developments in progress.** I noticed two distinct CMS efforts to support 11ty. One was noted in [this Reddit thread](https://www.reddit.com/r/eleventy/comments/1jtis3i/i_built_a_visual_markdown_editor_for_11ty/). Known at the moment as [JekyllPad](https://www.jekyllpad.com/), the Reddit thread claims that it now will support 11ty. The second is a coming Electron-based app that I discovered via this [Mastodon post](https://mstdn.social/@QueerMatters/114337351259091474). Here's the [related blog post](https://thinkymeat.neocities.org/posts/11tycms/). I love to see developments like this.

**Drafts are simpler.** Someone, I can't recall who, cited [this section of the 11ty docs](<(https://www.11ty.dev/docs/config-preprocessors/#example-drafts)>) showing how incredibly simple it is to set up a draft system. I recall a far more complex method required in earlier times.

**QR code curious?** [Al Power](https://www.alpower.com/) shows how to [dynamically create QR codes in Eleventy](https://www.alpower.com/blog/2025-04-13-dynamically-creating-QR-codes-for-eleventy-posts/).

**Eleventy v3.1.0-alpha.1.** Check out the [release notes](https://github.com/11ty/eleventy/releases/tag/v3.1.0-alpha.1) and get yourself to testing.

Until next time...

---

<div id="issue69-releases"></div>

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
