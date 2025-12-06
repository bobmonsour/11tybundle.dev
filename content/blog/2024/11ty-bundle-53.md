---
bundleIssue: 53
eleventyComputed:
  title: "Issue {{ bundleIssue }} - Zach's Eleventy Weekly Report №8, v3 updates continue, Practical SVG book via 11ty, I removed webmentions, Speaking of webmentions...And 1 release, 4 posts, and 9 sites to see"
  description: "11ty Bundle Issue {{ bundleIssue }}"
date: 2024-07-23
tags:
  - 11ty Bundle
---

_An email version of this blog is available. **[Subscribe here](#newsletter-subscribe)**._

---

_**Vacation note**: We're heading out of town for a week or so. I will continue to add content to the site, but publication of the 11ty Bundle will likely be 2 weeks out, rather than the typical weekly cadence. If you want to keep up, there's an [RSS feed for the Firehose](https://11tybundle.dev/firehosefeed.xml) and one for the [Releases](https://11tybundle.dev/releasefeed.xml)._

**Zach's Eleventy Weekly Report №8.** Here's [Zach's Mastodon post](https://fosstodon.org/@eleventy/112832336309586780) where he's been outlining his weekly progress on all things Eleventy, some of which I recap below.

<img src="/assets/img/zachs-eleventy-progress-8.jpg" alt="Zach's weekly eleventy update number 5" style="width: 70%; margin: 1rem auto;">

- First and foremost, we've got alpha.17. [Check out the release notes](https://github.com/11ty/eleventy/releases/tag/v3.0.0-alpha.17).
- While the pug template language has been removed, [there's a plugin for it](https://github.com/11ty/eleventy-plugin-template-languages/pull/13) _(or would that be a pug-in?)_.
- Eleventy's [API Services](https://www.11ty.dev/docs/api-services/) have been moved to Vercel.
- A couple of the other items listed will be addressed in the yet-to-be-released alpha.18

**v3 updates continue.** [Helen Chong](/authors/helen-chong/) has hopped aboard the Eleventy 3.0 train. [Here's how she went about it](https://helenchong.dev/blog/posts/2024-07-19-eleventy-3-0-upgrade/).

**Practical SVG book via 11ty.** Back in 2016, [Chris Coyier](https://chriscoyier.net/) wrote a book called Practical SVG. It was published by [A Book Apart](https://abookapart.com/products/practical-svg), which no longer sells or distributes books. Chris has built an [Eleventy site](https://practical-svg.chriscoyier.net/) for the book, but also built an [Eleventy "starter" of sorts](https://github.com/chriscoyier/practical-svg#a-book-depart) that converts the epub book format into an Eleventy site of the book. I have not yet tried it, but it looks very cool.

**I removed webmentions.** I had added the display of webmentions to these blog posts at the time when it seemed all the rage. In the interest of simplifying the site and weighing the utility of displaying them, I decided to remove them. I don't expect that they'll be missed. Please feel free to correct me ([via email](mailto:bob.monsour@gmail.com)) if you think this was a bad move.

**Speaking of webmentions.** [Chris Burnell](/authors/chris-burnell/) has a new post that, while titled "[July Project Updates](https://chrisburnell.com/article/july-2024-project-updates/)", covers an update he made to his own webmentions plugin, [now in beta](https://github.com/chrisburnell/eleventy-cache-webmentions/releases/tag/v2.1.0-beta.2).

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
