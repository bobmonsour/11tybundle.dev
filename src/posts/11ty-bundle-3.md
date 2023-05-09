---
bundleIssue: 3
eleventyComputed:
  title: "Issue {{ bundleIssue }}"
  description: "Welcome to Issue {{ bundleIssue }} of the 11ty Bundle, an occasional bundle of Eleventy releases, blog posts, sites, and resources."
date: 2023-04-11
tags:
  - 11ty Bundle
keywords: eleventy, 11ty, newsletter, roundup, news
image:
  source: "11tybundle-dev.jpg"
  alt: "an AI-generated image of the number eleven"
pageId: bundle
draft: false
---

> _UPDATED: 2023-04-18 - I have added descriptions to each of the blog post entries. These are extracted from the blog post page itself as provided by the post's author._

> _Since there are so many different topics covered the blog posts, I may start creating bundles that are focused on a particular topic; either that, or organize the list of posts by topic. And maybe, just maybe, I'll move all of this to a dedicated site (yes, I've already purchased a domain)._

## Recent releases

{% include 'partials/bundlereleases.njk' %}

## Posts from around the web

{% include 'partials/bundleposts.njk' %}

## Built with Eleventy

{% include 'partials/bundlesites.njk' %}

{% include 'partials/bundleresources.njk' %}
