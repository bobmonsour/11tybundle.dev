---
bundleIssue: 57
eleventyComputed:
  title: "Issue {{ bundleIssue }} - Eleventy joins forces with Font Awesome, Eleventy v3.0.0-alpha.20 has landed, Aleksandr shows us a better way to image, Rob O'Leary does charts with zero JS, An update to pagefind...And 5 releases, 9 posts and 6 sites to see"
  description: "11ty Bundle Issue {{ bundleIssue }}"
date: 2024-09-13
tags:
  - 11ty Bundle
---

_An email version of this blog is available. **[Subscribe here](#newsletter-subscribe)**._

---

_This issue is a bit early as I'm flying to the Garden State (New Jersey for those unfamiliar) to see some old friends. I'll be spending time with guys that I went to grade school and high school with as well as some cousins that I haven't seen in a long time. I'm looking forward to the time away and the chance to catch up with everyone. I'm writing this one at the airport; apologies in advance for typos and errors._

**Eleventy joins forces with Font Awesome.** Looks like Eleventy has found a new home with the incredible team at Font Awesome. This is a great move for Eleventy and I look forward to hearing more about what this will mean going forward. [Check out the announcement.](https://www.11ty.dev/blog/eleventy-font-awesome/)

**Eleventy v3.0.0-alpha.20 has landed.** We're inching our way to the full release of v3. Here are [the release notes for the latest alpha](https://github.com/11ty/eleventy/releases/tag/v3.0.0-alpha.20).

**Aleksandr shows us a better way to image.** [Aleksandr Hovhannisyan](https://www.aleksandrhovhannisyan.com/) shows us how to use the new way to handle images in Eleventy. Note that this new capability requires v3 of Eleventy, but as [Aleksandr shows us](https://www.aleksandrhovhannisyan.com/blog/eleventy-image-transform/), it makes life so much simpler...bye bye shortcodes.

**Rob O'Leary does charts with zero JS.** [Rob O'Leary](https://roboleary.net/) has a post showing us how to do simple charts with zero JS...and from what I've heard, less JS is good (like Eleventy). [Check out the post](https://www.roboleary.net/blog/eleventy-charts/).

**An update to pagefind.** While not tied to Eleventy directly, the folks at CloudCannon have released an update to a search tool that many of us use. [Check out the release notes.](https://github.com/CloudCannon/pagefind/releases/tag/v1.1.1)

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
