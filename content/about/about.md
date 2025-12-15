---
layout: "prose.njk"
---

# About the 11ty Bundle

## What is the 11ty Bundle?

Put simply, it's a curated collection of links to [Eleventy](https://11ty.dev) resources created by {{ bundledata.authorCount }} [Authors](/authors/) across the community. Articles are [categorised by feature](/categories/), and the [Firehose](/firehose/) shows everything added to the website across all categories in reverse date order—most recent first. Each issue of the [Blog](/blog/) features the latest Eleventy releases, posts, sites, and resources added to the website. If you're new to Eleventy, you'll find posts about [Getting Started](/categories/getting-started) and {{ bundledata.starterCount }} [Starter projects](/starters/), which take an opinionated approach, adding extra tools to a basic Eleventy install to help you find your feet. Stay updated via our [blog feed](/feed.xml), the [firehose feed](/firehosefeed.xml), or [subscribe to the newsletter](#newsletter) for email updates.

![An open laptop sits on a table with a cup of coffee beside it, suggesting a comfortable reading and working environment.](opengraph-image.jpg)

## Why does the 11ty Bundle exist?

### Mar 2023

While working on my personal website, I had an incredible rush of energy. I'd been reading a lot of Eleventy documentation and blog posts, and following questions and answers on the Eleventy Discord server. I was learning a lot and excited about it—but also feeling a little overwhelmed by all the information I was taking in. I was trying to figure out how to organise it all and make it useful to me, and thinking about how I could share what I was learning with others. The opening lines of [Issue 1](/blog/11ty-bundle-1/) captured it best:

> “I felt that there was so much happening in the world of Eleventy as I watch the Discord Server, Mastodon, and my RSS reader, it seemed appropriate to step back and put together a curated version of what I'm seeing in the hopes that others might find this useful."

I initially planned to create a newsletter, but instead started with a blog post called "The 11ty Bundler." After sharing it on Mastodon and Discord, I renamed it "The 11ty Bundle" by the second issue, as each post bundled useful tidbits including official Eleventy releases, links to blog posts, and new sites from the Built with Eleventy repo.

### Apr 2023

By the fourth issue, I'd automated the process by subscribing to RSS feeds and creating an Airtable database to organise content by issue and category. I then duplicated my blog repo to create a dedicated site for the Eleventy community. Along the way, I learned how to pull data from Airtable, use JavaScript front matter for pagination, and organise content by category and author. I launched without search functionality, relying instead on category and author navigation.

### Oct 2023

I migrated the data source from Airtable to Google Sheets. I wrote about this transition in a [blog post on my personal site](https://bobmonsour.com/blog/from-airtable-to-google-sheets/).

### Jun 2024

I migrated the data source again from Google Sheets to a local JSON file. I wrote about this transition in a [blog post on my personal site](https://bobmonsour.com/blog/node-cli-of-my-dreams/).

### Nov 2025

Redesigned the website to make it even easier to discover how the community is using Eleventy to solve problems and build cool, imaginative stuff. While I have been the initial creator and maintainer of the site to this point, I've had the pleasure to enlist the incredible help of [Damian Walsh](https://damianwalsh.co.uk/) to do the heavy lifting on the design front. My role has been more under the hood, and wrangling the data that you see presented on the site.

Here's what we've done:

- A new Showcase section featuring screenshots of sites built with Eleventy, and an Author spotlight on the homepage highlighting voices from across the community.
- Dates appear alongside external links to show how recent the content is—especially on pages we know from feedback are used for reference and learning.
- More detailed author profiles include descriptions, favicons, and social links.
- Refreshed look and feel reinforcing the almanac/reference nature of the site while staying true to the original familiar design. A new logo featuring [Andy Carolan's](https://www.andycarolan.com/) wonderful illustration. Improved layout—especially for small screens—added dark and light mode support, and introduced colour-coding across the main sections.

I'm very happy with the result and hope you find it useful. I don't know if this thing will continue to have legs or how long I'll be able to sustain it. If you want to know more about me, your best bet is to check out the [about page](https://bobmonsour.com/about/) of my personal site.

The website was (mostly!) designed in-browser using fluid type/space scales and tokens generated at [Utopia.fyi](https://utopia.fyi/). It's built with Eleventy, hosted on Cloudflare, and the source code is available on GitHub.
