---
bundleIssue: 60
eleventyComputed:
  title: "Issue {{ bundleIssue }} - We Meetup'd, Migrate from WP to 11ty, A fetch refresh, 11ty arrives in Wikipedia, Clayton's GitHub action, Adding steroids to Eleventy's log filter...And 4 releases, 16 posts and 14 sites to see"
  description: "11ty Bundle Issue {{ bundleIssue }}"
date: 2024-10-29
tags:
  - 11ty Bundle
---

_An email version of this blog is available. **[Subscribe here](#newsletter-subscribe)**._

---

**_A note from Bob:_**

_We're heading out of the country for a few weeks. We depart on US Election Day. As a result, the next issue will most likely appear in early December. Keep your eye on [the firehose](/firehose/) for mid-issue posts and the [home page](/) for new releases and sites._

---

**We Meetup'd.** At the recent [Eleventy Meetup](https://11tymeetup.dev/), [Cory Dransfeldt](https://coryd.dev/) showed us [how he built his self-hosted music tracker](https://www.youtube.com/watch?v=owhVOLYqNpw), and [Sia Karamalegos](https://sia.codes/) showed us [how she generates social share images using Cloudinary](https://www.youtube.com/watch?v=0pvqLW09D38) for her site. Those titly links will take you to their respective recordings. [Sign up for the newsletter](https://11tymeetup.dev/#newsletter) to get notified of the next meetup.

**Migrate from WP to 11ty.** New in the 11ty docs is a page on [Migrating from WordPress to Eleventy](https://www.11ty.dev/docs/migrate/wordpress/). If you're looking to make the switch, this can get you started.

**A fetch refresh.** There's a new [eleventy-fetch plugin](https://github.com/11ty/eleventy-fetch/releases). That links to release notes for all the recent releases. beta.2 has most of the changes, but we're up to beta.4 as some bugs were found and fixed.

**11ty arrives in Wikipedia.** Just when you thought Wikipedia had everything it could possibly have, [Eleventy has entered the chat](<https://en.wikipedia.org/wiki/Eleventy_(software)>).

**Clayton's GitHub action.** [Clayton Errington](https://claytonerrington.com/) has created [a nice GitHub action](https://github.com/cjerrington/actions-eleventy) for deploying your Eleventy site to GitHub Pages.

**Adding steroids to Eleventy's log filter.** [dwkns](https://github.com/dwkns) (I don't know his real name) has released [eleventy-plugin-console-plus](https://github.com/dwkns/eleventy-plugin-console-plus#eleventy-plugin-console-plus). Billed as "Eleventy's log filter on steroids," this looks like a great tool to aid in your debugging efforts.

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
