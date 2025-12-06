---
bundleIssue: 51
eleventyComputed:
  title: "Issue {{ bundleIssue }} - Zach's Eleventy Weekly Report №6, Memoization, JS front matter, WebC is having a moment, Raymond gets Squirrelly and does Basic, Keenan concise and hinged, 11 weeks x 11ty, 💩-ier...And 12 posts and 7 sites to see"
  description: "11ty Bundle Issue {{ bundleIssue }}"
date: 2024-07-09
tags:
  - 11ty Bundle
---

_An email version of this blog is available. **[Subscribe here](#newsletter-subscribe)**._

---

I thought this was going to be a short one, with summer and all, but it grew hair as the week progressed. I hope you enjoy it.

**Zach's Eleventy Weekly Report №6.** Here's [Zach's Mastodon post](https://fosstodon.org/@eleventy/112751345586792134) where he's been outlining his weekly progress on all things Eleventy, some of which I recap below.

<img src="/assets/img/zachs-eleventy-progress-6.jpg" alt="Zach's weekly eleventy update number 5" style="width: 70%; margin: 1rem auto;">

**Memoization.** On tap with the upcoming alpha.15 is a memoization layer around the slug, [slugify](https://www.11ty.dev/docs/filters/slugify/), and [inputPathToUrl](https://www.11ty.dev/docs/filters/inputpath-to-url/) filters. You can read more about it in [Zach's GitHub issue comment](https://github.com/11ty/eleventy/issues/840#issuecomment-2204179631). I had to take a little time to learn about memoization. [Memoize](https://github.com/sindresorhus/memoize#readme) is "an optimization used to speed up consecutive function calls by caching the result of calls with identical input." It reminds me of some of the performance gains that I wrote about in my [Slashing by Caching post](https://www.bobmonsour.com/posts/slashing-by-caching/). Looks like some of that will be built into Eleventy now. Sweet!

**JS front matter.** Also arriving soon in alpha.15 are two forms of Javascript front matter. Prior to alpha.15, javascript front matter was Object-based. Going forward, you can use either Object-based or what I'll call Function-based front matter. Check out Zach's description in this [GitHub issue comment](https://github.com/11ty/eleventy/issues/2819#issuecomment-2207387635).

**WebC is having a moment.** [Fynn Becker](/authors/fynn-becker/) has developed a VS Code extension called [WebC for VS Code](https://marketplace.visualstudio.com/items?itemName=fynn.vscode-webc). It just came out so it doesn't have many installs, but still...it's a thing. Here's [what he said on Mastodon](https://mastodon.social/@mvsde/112741141102135853): _"It’s super basic for now, providing just the `.webc` to HTML file association and suggestions for WebC-specific HTML attributes including links on hover to the documentation."_ And [Miriam Suzanne](/authors/miriam-suzanne/) is reworking [her site](https://www.miriamsuzanne.com/) from scratch and _"sticking with Eleventy, but moving from [Nunjucks templates/macros](/categories/nunjucks-macros/) to [WebC](/categories/webc/) and web components."_ She's got a [great post showing us how](https://www.miriamsuzanne.com/2024/07/06/buckets-layers/).

**Raymond gets Squirrelly _and_ does Basic.** As he sometimes does, [Raymond Camden](/authors/raymond-camden/) writes code while on vacation. This time, he's built a small demo with Eleventy that makes use of [Squirrelly](https://squirrelly.js.org/), yet another Javascript template language. According to the docs, Squirrelly _"drew inspiration from template engines like Nunjucks, Handlebars, EJS, and Pug to create a template engine with the best parts of each."_ Here's [Raymond's post about it](https://www.raymondcamden.com/2024/07/06/add-squirrelly-support-to-eleventy) and [the GitHub repo](https://github.com/cfjedimaster/eleventy-demos/tree/master/squirrelly). As if Raymond hadn't written enough code on vacation, on Sunday, he blessed us with this gem: [(Don't) Add BASIC Support to Eleventy](https://www.raymondcamden.com/2024/07/07/dont-add-basic-support-to-eleventy). I didn't know how to categorize this one, so I put it in [How to...](/categories/how-to/). And as Raymond was [sharing this on Mastodon](https://mastodon.social/@raymondcamden/112742055922941396), I told him that it reminded me of when co-authored a Basic interpreter when I was in grad school back in 1979 (we called it Basick). Ray noted that my comment made him feel young, as he was only 6 at the time. I replied that I was soon to turn 24, so I was old enough to be his father. 😂 That said, I don't know what it would be like to feel old...and I'm not about to start. P.S. Raymond now tops the [post count leaderboard](/authors-by-count/), reaching the 100 post mark! In other words, he's written 8.6% of the posts on this site. Hats off!

**Keenan concise and hinged.** Those of you on Mastodon may have been following the excellent writings of [Keenan](https://gkeenan.co/) for some time. I am a relatively new reader. Anyway, they bit the bullet and undertook the task of learning Eleventy and building their site from scratch with help from some of our awesome community members. In one of this week's posts, they wrote about the experience -- the ups, the downs, the stubbornness, the everything. It's not chock full of technical details, but it's a fun and motivating read. And I feel compelled to link to it here by using the full title as the link text, just because. Here it is...[An alarmingly concise and very hinged summary of what it was like to build this site from scratch](https://gkeenan.co/avgb/an-alarmingly-concise-and-very-hinged-summary-of-what-it-was-like-to-build-this-site-from-scratch/). Enjoy!

**11 weeks x 11ty.** A developer that goes by the GitHub handle [rascode](https://github.com/rascode) has started what he calls _"An 11 week journey of learning 11ty by building together in public."_ You can follow along at [this site](https://www.11weeks.xyz/). I shared [the "bundle"](https://11tybundle.dev) and the [Discord server](https://www.11ty.dev/blog/discord/) with him on X (yeah, I went back to dip my toe in; it's still hellish). I'll be keeping my eye on it. Here was his announcement on X:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">I&#39;m doing a thing. <br><br>Today is Day 1 of my 11 Weeks of <a href="https://twitter.com/eleven_ty?ref_src=twsrc%5Etfw">@eleven_ty</a> challenge. The objectives are simple: <br><br>- Build 11 separate 11ty sites in 11 weeks <br>- Become proficient in 11ty along the way<br>- Build in Public <br>- Share as I learn/grow<br>- Learn from others on a similar journey <a href="https://t.co/Zbh25V8qNs">pic.twitter.com/Zbh25V8qNs</a></p>&mdash; rascøde.eth (@rascodev) <a href="https://twitter.com/rascodev/status/1809044548762677367?ref_src=twsrc%5Etfw">July 5, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

**💩-ier.** I will leave you with this humorous and satirical project that I came across via [Stefan Judis' Web Weekly newsletter](https://www.stefanjudis.com/blog/web-weekly-137/). It's called [Shittier](https://www.npmjs.com/package/shittier). _"Shittier is a code formatting tool that aims to make your code look as terrible as possible."_

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
