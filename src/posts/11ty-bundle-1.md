---
title: The 11ty Bundle - Issue 1
date: 2023-03-28
tags:
  - 11ty
  - 11ty Bundle
description: An occasional bundle of Eleventy releases, blog posts, sites, and resources.
keywords: eleventy, newsletter, roundup, news
image:
  source: "11ty-bundle-1.jpg"
  alt: "an AI-generated image of the number eleven"
  caption: "An AI-generated image of the number eleven"
pageID: bundle
bundleIssue: 1
---

This is the first of an occasional roundup of Eleventy releases, related blog posts, and resources.

Why, you ask?

I felt that there was so much happening in the world of Eleventy as I watch the Discord Server, Mastodon, and my RSS reader, it seemed appropriate to step back and put together a curated version of what I'm seeing in the hopes that others might find this useful.

Who knows, perhaps this belongs in an Eleventy newsletter of some sort. If you think so, feel free to drop me a line at bob dot monsour at gmail.

> _UPDATED: 2023-04-07 - Releases and Blog posts are now sorted in reverse chronological order. I've also added links to the sites of the home (or about) pages of the blog writers. I've updated this and subsequent posts to use Airtable as a data source to ease the process of preparing new issues. This will also make it easier to support user-supplied content down the road._

## Recent releases

_Newest listed first_

{% for item in airtableitems | getBundleItems(bundleIssue, "release") %}

- [{{ item.Title }}]({{ item.Link }}), {{ item.Date }}

{% endfor %}

## Blog posts: from Discord, Mastodon, and around the web

_Newest listed first_

{% for item in airtableitems | getBundleItems(bundleIssue, "blog post") %}

- [{{ item.Title }}]({{ item.Link }}) by [{{ item.Author }}]({{ item.AuthorLink }}), {{ item.Date }}

{% endfor %}

## Recent sites being built or redesigned with Eleventy

- [Keith J. Grant](https://keithjgrant.com/posts/2023/03/redesign-2023/)
- [pie design system](https://www.pie.design/)
- [Nicholas Hoizey Photography](https://nicolas-hoizey.photo/)
- [CloudCannon](https://cloudcannon.com/blog/cloudcannon-com-is-now-built-with-eleventy/)
- [Jerome Stephan](https://jeromestephan.de/sites/Home/)
- [Molly White](https://www.mollywhite.net/)
- [Delete Twitter](https://deletetwitter.com/)
- [Václav Eliáš](https://www.vaclavelias.com/)
- [Naz Hamid](https://nazhamid.com/)
- [Vadim Makeev](https://pepelsbey.dev/)
- [Gabrielle Wee](https://gabriellew.ee/)
- [Javan](https://javan.us/)
- [CSS In Real Life](https://css-irl.info/)
- [Rafael Conde](https://rafa.design/ "this one is very cool")
- [Web Components Today](https://webcomponents.today/)
- [Anil Dash](https://anildash.com//)

## [Here's a very long list of sites built with Eleventy.](https://www.11ty.dev/speedlify/)

## [Add yours to the list.](https://github.com/11ty/11ty-community/issues/new/choose)

## Here's a list of general resources for Eleventy

- [11ty docs](https://www.11ty.dev/docs/)
- [11ty Rocks!](https://11ty.rocks/)
- [The Eleventy Meetup](https://11tymeetup.dev/)
- [The Discord Server](https://www.11ty.dev/blog/discord/)
- [Github discussion on the Eleventy repo](https://github.com/11ty/eleventy/discussions)
- [YouTube channel](https://www.youtube.com/@EleventyVideo)
- [Eleventy Hub](https://11tyhub.dev/)

## A note on getting help or support

I can say that, without a doubt, if you have any questions or run into problems with Eleventy, the community on the [Discord Server](<(https://www.11ty.dev/blog/discord/)>) is amazing. In the forum-help channel, you can get any question answered, regardless of how simple or complex.

Keep on bundlin...
