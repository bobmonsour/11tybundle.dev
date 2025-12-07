---
bundleIssue: 68
eleventyComputed:
  title: "Issue {{ bundleIssue }} - Color from images, Cache optimized images, A post to match the Meetup, New categories, Nice new sites..."
  description: "11ty Bundle Issue {{ bundleIssue }}"
date: 2025-03-04
tags:
  - 11ty Bundle
---

---

### A note from Bob:

I'm in a slightly elevated state of anxiety at the moment. I'm having my second knee replacement on March 6th and my wife just received a breast cancer diagnosis, which thankfully, was caught early. We're coping well and doing our best to keep our spirits up (notwithstanding the _total clusterfuck_ that is the US presidency). I'm not sure how much I'll be able to do in the next few weeks. I'll do my best to keep adding posts, releases and sites, but I may take a break from these blog posts. I'll keep you posted. The best way to keep up with the posts is by subscribing to the [Firehose RSS feed](/firehosefeed.xml). There's also an [RSS feed for releases](/releasefeed.xml).

---

### Highlights

**Color from images.** Zach created a new plugin, called [image-color](https://github.com/11ty/image-color?tab=readme-ov-file#11tyimage-color) that extracts color information from images. Here's [his blog post](https://www.zachleat.com/web/extract-colors/) about it. It looks pretty cool and it's got me thinking of an idea on how I might use it.

**Cache optimized images.** And while this is something that I thought happened automagically when using the image transform, it turns out that you can have your optimized images placed into the `.cache` folder which is great, particularly when using a deployment host like Netlify or Cloudflare (and perhaps others) that respect the `.cache` folder between builds. Those optimied images can then be automatically copied to your output folder post-build. This should shave significant time off your builds, particularly for image heavy sites. Here's a Gitub issue that [explains it](https://github.com/11ty/eleventy-img/issues/285).

**A post to match the Meetup.** At our recent Eleventy meetup, [Sia](https://sia.codes/) had presented [Using 11ty to build a data and chart analytics website](https://www.youtube.com/watch?v=o13Yfgzne88) (video). She has since followed that up with a blog post covering similar ground, titled [How I built Shopify Theme Vitals using 11ty and CrUX](https://sia.codes/posts/how-i-built-theme-vitals/). If you want to build a rich, data-driven site, there are learnings here.

**New categories.** I've created two new categories on this site, one for [Notion](/categories/notion/) and one for [Obsidian](/categories/obsidian/). There seemed to be enough content to make these useful. So now when you do a search on either of these terms, you get right to the category, rather than get a rather repetitive list of posts. I hope you find this useful.

**Nice new sites.** Among the new sites in this issue, I wanted hightlight a few that caught my eye: [Oregon Symphony Association](https://www.orsymphony.org/), [Green Web Tracker](https://tracker.greenweb.org/), and [State of California Design System](https://designsystem.webstandards.ca.gov/), and [Damian Walsh's personal site](https://damianwalsh.co.uk/).

Until next time...
