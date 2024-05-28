---
bundleIssue: 45
eleventyComputed:
  title: "Issue {{ bundleIssue }} - Make 11ty Fully Independent and Sustainable, 2024 XOXO Fest, Slash Pages, Nearing the magic 1,100, Tinkering under the hood...And 5 posts and 9 sites to see"
  description: "11ty Bundle Issue {{ bundleIssue }}"
date: 2024-05-28
tags:
  - 11ty Bundle
---

An email version of this blog is available. **[Subscribe here](#newsletter-subscribe)**.

**Make 11ty Fully Independent and Sustainable.** Well, Zach is making the leap to **_[work independtly on 11ty full time](https://www.zachleat.com/web/independent-sustainable-11ty/)_**! He is asking for your and/or your company's support to make this happen. Click on that preceding link to read the details straight from Zach. If this blurb is all you need, head on over to the **[11ty Open Collective](https://opencollective.com/11ty)** to contribute. I raised my monthly contribution from $5 to $11. If you are able to help in any way, I'm encouraging you to do so. (NOTE: I do not benefit financially from this fundraising effort.)

On a related note, I'm thinking that we need a new category for the kind of post linked above. I'm thinking of calling it **_From the Source_**. [Drop me an email](mailto:bob.monsour@gmail.com) if you have an alternative idea. As I write this, perhaps a [link to Zach's blog](https://www.zachleat.com/) and/or the [Eleventy blog](https://www.11ty.dev/blog/). Those two links probably belong in the Official category of links down in the footer..._zzzzzooosh...and [there they are](#resources)!_ The new category would be limited to items related to the development or status of the project. </ ramble >

**2024 XOXO Fest.** One of the sites listed below is quite stunning, on desktop _and_ mobile. It's the site for the [2024 XOXO Fest](https://2024.xoxofest.com/). The event is billed as _"An experimental festival for independent artists and creators who work on the internet."_ While the event looks awesome, the site is gorgeous. It was created by [Ashur Cabrera](https://ashur.cab/rera/) & Emily Cabrera.

**Slash Pages.** It seems that Robb Knight is at it again. As [he put it](https://rknight.me/blog/slash-pages/): _"While putting Baby Knight to bed I had an idea for a project: a website that acts as a guide to the different slash pages you can add to your website._" Enter [slashpages.net](https://slashpages.net/). The source is [on GitHub](https://github.com/rknightuk/slashpages). I've seen some ripples of this, indicating that it might be catching on.

**Nearing the magic 1,100.** As you can see, we're nearing the magic number of posts, i.e., **_11ty hundred_** blog posts, each covering some aspect of Eleventy. As of this writing, we're at 1,093 posts. Whoever writes the 1,100th post will get called out in the next issue. I'm not sure what that means, but I think of something. Now start writing.

**Tinkering under the hood.** I'd been playing with the idea of abandoning Google Sheets as the database for this site. While it works, it's got several shortcomings. Don't get me wrong, Google Forms works as a basic data entry mechanism and I have some Google Apps Scripts to help. I currently have a global data file that uses the Google Sheets API to fetch the data and generate an array of json objects. That got me thinking...this array is not large (a little more than 300KB when written to a file). Is there any reason it should not be a json file start to finish? Not really. I reached out to a couple of trusted people in the community to bounce some ideas around about creating some tooling on my local system for this and got some excellent feedback. I had written a lot more about this journey here, but then thought I should write a post on [my own site](https://www.bobmonsour.com/). I will. The sausage is not quite fully implemented, tested, or cooked yet. Stay tuned.

Until next time...

## Recent releases

{% set itemType = "release" %}
{%- include 'partials/bundleitems.njk' %}

## Posts from around the web since the last Bundle issue

{% set itemType = "blog post" %}
{% include 'partials/bundleitems.njk' %}

## Built with Eleventy

Here are the new sites to see. If you want to see more sites, check out the [Eleventy Leaderboards](https://www.11ty.dev/speedlify/).

{% set itemType = "site" %}
{% include 'partials/bundleitems.njk' %}
