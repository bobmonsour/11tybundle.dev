---
bundleIssue: 55
eleventyComputed:
  title: "Issue {{ bundleIssue }} - An Xray vision plugin, A refactored RSS aggregator, Another starter gets an upgrade to v3, Simple Eleventy 3 Excerpts, Sia gets protection from AI bots at Cloudflare...And 7 posts and 9 sites to see"
  description: "11ty Bundle Issue {{ bundleIssue }}"
date: 2024-08-06
tags:
  - 11ty Bundle
---

_An email version of this blog is available. **[Subscribe here](#newsletter-subscribe)**._

---

_NOTE: I think I'll keep with the every-other-week schedule for a bit longer. I hope you're enjoying the summer and getting some time to relax._

**An Xray vision plugin.** Walter, aka [VividVisions](https://github.com/VividVisions), has released an alpha version of what he calls [Xray plugin for Eleventy](https://github.com/VividVisions/eleventy-plugin-xray#xray-plugin-for-eleventy). With a simple shortcode, "_Xray is a plugin for Eleventy which visualizes the complete data hierarchy and build information of every rendered page directly in the browser._" It requires Node.js => 18.2 and Eleventy v3.0.0-beta.1 to run. [Here's a look at the information it displays](https://github.com/VividVisions/eleventy-plugin-xray#displayed-information).

**A refactored RSS aggregator.** [Łukasz Wójcik](https://blog.lukaszwojcik.net/) has refactored his RSS aggregator starter that goes by the name of [Multiplicity](https://github.com/lwojcik/eleventy-template-multiplicity#multiplicity---rss-aggregator-starter-based-on-eleventy). It "_Allows you to create an RSS aggregator site._" And it comes with an GitHub action that keeps the site up to date. [Here's a demo](https://eleventy-m10y.lkmt.us/).

**Another starter gets an upgrade to v3.**
[Matthias Ott](https://matthiasott.com/) has updated his [eleventy-plus-vite starter](https://github.com/matthiasott/eleventy-plus-vite#eleventy-plus-vite-). Using Eleventy v3 and Vite v5, it's "_A clean and fast Eleventy Starter Project with Vite._"

**Simple Eleventy 3 Excerpts.** [Tyler Sticka](https://tylersticka.com/) wrote about how he goes about creating post excerpts with Eleventy v3. [It's nice and simple.](https://tylersticka.com/journal/simple-eleventy-3-excerpts/).

**Sia gets protection from AI bots at Cloudflare.** [Sia Karamalegos](https://sia.codes/) migrated her Eleventy site from Netlify to Cloudflare, taking advantage of the protection from AI bots that Cloudflare recently launched. [Here's how she did it](https://sia.codes/posts/migrating-netlify-to-cloudflare/).

**A note on the starters I list on this site.** Lastly, I'm seeing more newcomers looking for a good starter. While some encourage newcomers to get started from scratch, that's not for everyone. Based on some input from the Discord Server, I've given some thought to enhancing the listing of each of the starters on the [Starters page](/starters/). As of now, all of the links are to GitHub repos. So I'd like to add some more metadata, including things like: GitHub stars, date of last update, the description that is provided in the repo, and a link to a demo if one is available. And a huge thanks to [Ben White](https://benwhite.com.au/) for going as far as writing some code to get some of this info from GitHub. Stay tuned for more on this as I've got some work to do.

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
