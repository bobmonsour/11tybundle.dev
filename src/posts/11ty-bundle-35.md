---
bundleIssue: 35
eleventyComputed:
  title: "Issue {{ bundleIssue }} - Some gentle reminders...Speed up your build times...Got contact forms?...11ty Base Blog update...Email or Beer?...And 5 posts, and 7 sites to see."
  description: "Welcome to Issue {{ bundleIssue }} of the 11ty Bundle."
date: 2024-02-28
tags:
  - 11ty Bundle
image:
  source: 11tysymposium2024.jpg
  alt: "Announcement of the 11ty International Symposium on Making Web Sites Real Good"
---

## Some gentle reminders

The [open call for talk proposals for the 11ty conference](https://docs.google.com/forms/d/e/1FAIpQLScdwhO1zfEBvl8mVAJQLWbK0EylD4yPCBpe3Lanz8SvFPI9Xg/viewform) ends on March 22nd. And there's also an open call to companies and individuals to sponsor the conference. Send an email to [sponsor@11ty.dev](mailto:sponsor@11ty.dev) to receive a sponsorship prospectus.

## Speed up your build times

New on the docs: how to persist Eleventy Cache across builds to improve build times, including updated information on CloudCannon, Netlify, and Vercel. [Check it out](https://www.11ty.dev/docs/deployment/#persisting-cache).

## Got contact forms?

If you've ever been looking for options to add forms to your static site, well [this CloudCannon page is for you](https://cloudcannon.com/jamstack-ecosystem/contact-forms/). I'd give you a count of all the options, but it's just too many to eyeball...and I'm in a hurry right now.

## Eleventy Base WebC update

The [Eleventy Base WebC starter](https://github.com/11ty/eleventy-base-webc) has been updated to Eleventy 3.0.0 using ESM. It's a great way to get your blogging started with Eleventy and WebC. It's just sitting there, waiting to be deployed.

## Email or beer?

In case you haven't noticed, I've added a couple of buttons to this site. At the end of each of these blog posts, I invite you to send me an email...in the unlikely event that you want to send me your thoughts about the post. And at the end of every ~~page~~ _post_ ~~of the site~~, you are now presented with the option to buy me a beer. I have plenty of coffee, but not enough beer. I'll leave it at that.

That's all for now...until next time...

<div id="releases"></div>

## Recent releases

{% set itemType = "release" %}
{% include 'partials/bundleitems.njk' %}

<div id="newposts"></div>

## Posts from around the web since the last Bundle issue

{% set itemType = "blog post" %}
{% include 'partials/bundleitems.njk' %}

<div id="sites"></div>

## Built with Eleventy

Here are the new sites to see. If you want to see more sites, check out the [Eleventy Leaderboards](https://www.11ty.dev/speedlify/).

{% set itemType = "site" %}
{% include 'partials/bundleitems.njk' %}
