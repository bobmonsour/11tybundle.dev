---
bundleIssue: 11
eleventyComputed:
  title: "Issue {{ bundleIssue }} - Take the survey, a few new posts, a handful of oldies, and a couple of sites"
  description: "Welcome to Issue {{ bundleIssue }} of the 11ty Bundle."
date: 2023-06-30
tags:
  - 11ty Bundle
---

If you haven't already taken the Eleventy Community Survey, please do so (if you have, thank you). It's important to show your support for the project and to help Zach make decisions about its future. [Take the survey](https://forms.gle/zFA4Jno1cfT8nt9J8). For more details, see [Zach's post](https://www.zachleat.com/web/eleventy-side-project/).

This issue has 4 new blog posts that came out since the last issue. I also found a handful of older ones for this issue.

I've got just two new sites for this issue. And I'm thinking that the [Eleventy Leaderboards](https://www.11ty.dev/speedlify/) site is a much better source of sites built with Eleventy. As a result, unless I come across one or more compelling new sites, the [Built with Eleventy](#sites) section will not be included.

I will continue to list releases when they occur, though there are no new ones to report this issue.

Funny things...since adding a [contact form](/contact/) to this site, I've received two inputs, both asking that I integrate a 3rd party service, one for using audio to read the blog posts aloud, and the second to replace Netlify forms with another service. I respectfully declined both.

Thanks for reading...and for taking [the survey](https://forms.gle/zFA4Jno1cfT8nt9J8).

<div id="releases"></div>

## Recent releases

{% set itemType = "release" %}
{% include 'partials/bundleitems.njk' %}

## Posts from around the web since the last Bundle issue

{% set itemType = "blog post" %}
{% include 'partials/bundleitems.njk' %}

<div id="sites"></div>

## Built with Eleventy

Just a couple sites this week. If you want to see more, check out the [Eleventy Leaderboards](https://www.11ty.dev/speedlify/).

{% set itemType = "site" %}
{% include 'partials/bundleitems.njk' %}
