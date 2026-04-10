---
bundleIssue: 88
eleventyComputed:
  title: "The final canary, Sharing is caring, The sky is blue, Possum-ania, Pages to workers, Now charted, Careful with those blades, Got comments"
  description: "11ty Bundle Issue {{ bundleIssue }}"
date: 2026-04-10
tags:
  - 11ty Bundle
---

---

## A note from Bob:

What a world! These are crazy times, and I am writing this to be distracted from the news. I hope you are all doing well, and that you find some joy in this issue.

Also, I'm giving a talk at [North Bay Python](https://northbaypython.org/) on April 25th. Check out the list of speakers at this 2-day event in Petaluma, CA. The title of my talk (seems to be the longest title in the bunch) is: _While I've changed gears every 4-5 years, in retirement, I've managed to find my web development tribe_. The talk will be recorded and I'll share it once it's available.

Oh, and there's a new category: [Liquid](/catgories/liquid/). Hat tip to [Anton Staroverov](https://any.digital/), who goes by _anydigital_, for the suggestion.

---

## Highlights

**The final canary.** [Pre-release: Eleventy v4.0.0-alpha.7](https://github.com/11ty/eleventy/releases/tag/v4.0.0-alpha.7) is out. As noted in the release notes, _Fair warning: this may be one of the last canary releases before you see some names start to change to Build Awesome._ I'm running it for this site.

**Sharing is caring.** [Kyle Reddoch](https://www.kylereddoch.me) built an [Eleventy Plugin for Sharing Posts to Mastodon](https://www.kylereddoch.me/blog/i-built-an-eleventy-plugin-for-sharing-posts-to-mastodon/). Kyle also released a new starter project, [Retro Garden](https://github.com/kylereddoch/retro-garden-eleventy-theme), with a very cool [demo site](https://retro-garden-eleventy-theme.vercel.app/).

**The sky is blue.** [Steven Woodson](https://stevenwoodson.com) shows us how to [Add Bluesky Activity to an Eleventy Blog](https://stevenwoodson.com/blog/adding-bluesky-activity-to-an-eleventy-blog/).

**Possum-ania.** Zach shared [The Possum Mascot, now with additional Awesome](https://www.11ty.dev/blog/awesome-possum/).

**Pages to workers.** [Rick Cogley](https://cogley.jp) gives us [Cloudflare Pages vs Workers in 2026: Migration Guide](https://cogley.jp/articles/cloudflare-pages-to-workers-migration). I still have a few sites on Netlify that I want to migrate. This might be the ticket. That said, I've been using Cloudflare Workers for several new sites and using Wrangler to push them to production rather than triggering builds via GitHub pushes. I need to write that up and share it with you all.

**Now charted.** [Sean Lunsford](https://seanlunsford.com) shared [Charting New Territory](https://seanlunsford.com/2026/uncharted/), where he releases version 1.0 of Uncharted, an Eleventy plugin that generates static HTML and CSS charts from various data sources without requiring client-side JavaScript. This is what I use for the charts on the [insights page](/insights/) if this site.

**Careful with those blades.** [Anton Staroverov](https://any.digital/) brings us [Eleventy blades](https://blades.ninja/build-awesome-11ty/), with a variety of tools to add to your Eleventy toolkit.

**Got comments.** [EchoThread](https://echothread.io/), in beta, brings comments to static sites. I just came across their [guide for adding comments to an Eleventy site](https://echothread.io/docs/guides/eleventy). It looks pretty interesting. Note: According to their FAQ, _"EchoThread is completely free during the beta period...Pricing for post-beta plans will be announced later."_

{% include "partials/rss-item-links.njk" %}

Until next time...
