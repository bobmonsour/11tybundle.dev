---
title: About 11tybundle.dev
description: About the 11tybundle.dev website and the person behind it.
permalink: /about/
---

# About 11tybundle.dev

Why?, you ask.

It was in late March 2023 when I was sitting down to work on [my personal website](https://www.bobmonsour.com/) that I had this incredible rush of energy come over me. I had been doing a lot of googling and reading Eleventy documentation and blog posts. I had also been reading a lot of questions and answers on the [Eleventy Discord server](https://www.11ty.dev/blog/discord/). I was learning a lot and I was excited about it. I was also feeling a little overwhelmed by all of the information that I was taking in. I was trying to figure out how to organize it all and make it useful to me. I was also thinking about how I could share what I was learning with others.

The opening lines of [Issue 1](/blog/11ty-bundle-1/) of the 11ty Bundle said it best: _"I felt that there was so much happening in the world of Eleventy as I watch the Discord Server, Mastodon, and my RSS reader, it seemed appropriate to step back and put together a curated version of what I'm seeing in the hopes that others might find this useful."_

My initial idea was to create a newsletter. But I didn't want to deal with all the setup required to get started. After about a week, I decided that I would write a blog post site and call the post "The 11ty Bundler." I shared the post on Mastodon and the Discord server and got what I'd call minor traction. I didn't know how often I'd put these posts together, so I called them "occasional."

By the second post, a week after the first, I had already changed the name to "The 11ty Bundle" as each post was a bundle of useful tidbits. Those tidbits were a list of recent official releases of Eleventy and other offical Eleventy maintained open source projects, like WebC. The meat of it was the links to various blog posts that I was finding in a lot of different ways. I subscribed to updates on the Github repos for various official Eleventy projects. Lastly, I subscribed to the Built with Eleventy repo so I would be alerted to any new site that wished to be listed on the [Eleventy Leaderboards](https://www.11ty.dev/speedlify/). In short, I had created what I hoped would be a firehose of content.

By the fourth issue, I had had enough of manually creating all of these links in markdown. It was time to get more efficient as there seemed to be a lot of available content to keep the publication going for many weeks.

First, I scoured all of the posts that I had previously gathered and subscribed to the RSS feeds of many of those blogs. Second, I created an Airtable database to house each tidbit of content. There, I could identify which issue each would appear in and I could categorize each post according to the topics I thought made sense based on the Eleventy documentation as well as the nature of the discussions on the Discord server.

Lastly, it seemed that this effort would of best use to the Eleventy community if it were on its own website with its own RSS feed.

So I duplicated my blog repo and began the transformation that would result in the site you are reading now.

There were several learning challenges along the way, including figuring out how to get data from an Airtable database and using Javascript front matter to pre-process data for pagination. I also had to decide how to organize the data by category and author. I have learned a ton in the process and there is still more to do. I launched the site without any search capability, but with the size of the site at launch and the navigation by category and author, I don't see that as a critical shortcoming.

> [UPDATE] As of October 2023, I have migrated the data source to Google Sheets. I wrote about this transition in a [blog post on my personal site](https://www.bobmonsour.com/posts/scratch-that-use-google-sheets-api/).

I'm very happy with the result and I hope that you find it useful. I don't know if this thing will continue to have any legs or how long I will be able to sustain it. Down the road, I plan to add functionality that will allow other community members to submit content as I am sure that I am not finding everything that could be here.

If you want to know more about me, your best bet is to take a look at the [about page of my personal site](https://www.bobmonsour.com/about/).

Oddly enough, this site is **Built with [Eleventy](https://www.11ty.dev/)**. The CSS is written by hand and uses no media queries. Rather it makes use of fluid type and some of the amazing work done by Stephanie Eckles on her [Modern CSS Solutions](https://moderncss.dev/) site. For fonts, it makes use of system fonts as defined on [Modern Font Stacks](https://modernfontstacks.com/). Two fonts are used, the site name at the top is [Monospace Slab Serif](https://github.com/system-fonts/modern-font-stacks#monospace-slab-serif) and all of the remaining text is in [Classical Humanist](https://github.com/system-fonts/modern-font-stacks#classical-humanist). The site is hosted on [Netlify](https://www.netlify.com/) and the source code is available on [Github](https://github.com/bobmonsour/11tybundle.dev).

_Finally, there are two RSS feeds, one is the [Blog RSS](/feed.xml) for posts like the ones you'll find in the [Blog](/blog/) and a second one, [Firehose RSS](/firehosefeed.xml), which includes all of the [categorized](/categories/) posts written by numerous [authors](/authors/)._
