---
bundleIssue: 58
eleventyComputed:
  title: "Issue {{ bundleIssue }} - Eleventy v3-beta.2: The Final Countdown, v3 docs ready to roll, The Eleventy Meetup happened, Template syntax plugins hit 1.0.0, Migrating from Wordpress to Eleventy, How real Shopify sites perform, Connecting Notion to Eleventy, Fursuiting is a thing...And 4 releases, 12 posts and 12 sites to see"
  description: "11ty Bundle Issue {{ bundleIssue }}"
date: 2024-10-01
tags:
  - 11ty Bundle
---

_An email version of this blog is available. **[Subscribe here](#newsletter-subscribe)**._

---

_Had a great time in New Jersey with friends and family...still recovering from excess food and drink. But...I'm back! And with v3 at our doorstep, I may have to go back to a weekly schedule...we'll see._

**Eleventy v3-beta.2: The Final Countdown.** [Eleventy v3.0.0-beta.2](https://github.com/11ty/eleventy/releases/tag/v3.0.0-beta.2) has hit the streets. This could be the final beta before the stable release. Click that link to see the release notes.

**v3 docs ready to roll.** Zach has been very busy adding v3 docs for various features. They include the following (and more):

- use of memoize with several built-in filters
- an update on content dates
- validating data
- ESM shown as default, with CJS alongside
- plugins can be async
- exposing universal filters and shortcodes in the config API
- better error messaging for permalinks lacking a trailing slash

There were links in the GitHub posts about these, but they'll be short-lived, so I won't provide them here. I can't wait to see v3 hit and the docs enter production. I just can't tell you when that's gonna happen. But it's coming.

This just in (Sep 30, 2024, 2:14pm Pacific Time): a massive pull request titled [v3.0.0 Stable Release Documentation](https://github.com/11ty/11ty-website/pull/1733) has been sighted.

**The Eleventy Meetup happened.** There were two great talks at the recent [Eleventy Meetup](https://11tymeetup.dev/events/ep-19-migrating-to-3-0-and-blogging-with-storyblok/). [Helen Chong](https://11tybundle.dev/authors/helen-chong/) described how she upgraded her site from v2 to v3. And [Estela Franco](https://11tybundle.dev/authors/estela-franco/) showed us how to use Storyblok with Eleventy. Be sure to sign up for [the newsletter](https://11tymeetup.dev/#newsletter) to be notified of upcoming events.

**Template syntax plugins released.** The [official template syntax plugins](https://github.com/11ty/eleventy-plugin-template-languages) recently reached v1.0.0 status:

- EJS
- HAML
- Handlebars
- Mustache
- Pug

**Migrating from Wordpress to Eleventy.** For some reason, people might be looking for ways to migrate their Wordpress sites to Eleventy. I won't get into these "[reasons](https://css-tricks.com/catching-up-on-the-wordpress-wp-engine-sitch/)," but for those interested, [Will Boyd](https://github.com/lonekorean) has a utility called [wordpress-export-to-markdown](https://github.com/lonekorean/wordpress-export-to-markdown) that might be of interest.

**How real Shopify sites perform.** [Sia Karamalegos](https://sia.codes/) built an Eleventy site showing how real Shopify sites perform. The site is called [Shopify Theme Vitals](https://themevitals.com/). If you or your clients run a Shopify site, there might be some good learnings here.

**Connecting Notion to Eleventy.** [Stefan Brechbühl](https://stebre.ch/), who I just came across, has a plugin and blog post on [connecting Notion to Eleventy](https://11tybundle.dev/authors/stefan-brechbuhl/). They're from earlier this year, but I've just uncovered them.

**Fursuiting is a thing.** [BristolFurs](https://bristolfurs.co.uk/) is one of the recent sites built with Eleventy. I was not aware that Fursuiting was a thing. But it is. And this site is a thing. And it's built with Eleventy.

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
