---
bundleIssue: 46
eleventyComputed:
  title: "Issue {{ bundleIssue }} - The 11ty-hundredth Post!!!, A 'From the Source' catgory, A new 'Getting started' post, Max shows us how he updated to v3, Google Sheets ain't my DB no mo...And 9 posts and 4 sites to see"
  description: "11ty Bundle Issue {{ bundleIssue }}"
date: 2024-06-04
tags:
  - 11ty Bundle
---

---

### Highlights

**The 11ty-hundredth Post!!!** For our 11ty-hundredth post, [Lene Saile](https://www.lenesaile.com/en/) has updated the ever-so-excellent Eleventy Excellent starter and in [this post on the starter demo](https://eleventy-excellent.netlify.app/blog/eleventy-excellent-30/), she announces its update to the 3.0 canary release. Included in the new starter is a move to ESM, a new config structure, and a host of other updates. It's a great way to get started with Eleventy or even just to [check out the source code](https://github.com/madrilene/eleventy-excellent) to see what excellent looks like. Great work, Lene!

**A 'From the Source' category.** There's now a [From the Source](/categories/from-the-source/) category. There's not much there yet. The latest is a link to an [interview of Zach on the JS Party podcast](https://www.zachleat.com/web/jsparty-indie-11ty/). I plan to backfill this category with some of the milestone's that Zach has noted in [his site's archive](https://www.zachleat.com/web/). And I'll add new stuff as it comes along.

**A new Getting Started post.** [Sean McPherson](https://www.seanmcp.com/) has written a new [Getting started with Eleventy](https://www.seanmcp.com/gardens/getting-started-with-eleventy/). There have been a lot of these written, but this is the freshest one out there. It recommends the canary release as it's ESM-oriented, which I view as a plus.

**Max shows us how he updated to v3.** [Max Böck](https://mxb.dev/) shows us what he did in [Updating to Eleventy v3](https://mxb.dev/blog/eleventy-v3-update/). He describes migrating to ESM which you may find helpful. He also highlights the new [eleventy-img plugin](https://www.11ty.dev/docs/plugins/image) and how you no longer need a shortcode to get its benefits.

**Google Sheets ain't my DB no mo.** Also noted last week, I took the plunge and created a simple node CLI that lets me create post, site, release, and starter items for the site. It adds the items to a local json file that contains everything needed to build the site. There's no more fetching from Google Sheets which has saved me some build time. It also provided the opportunity to improve my javascript skills. It's working pretty well and adds some functionality that I didn't have with Sheets; a couple of examples: it validates the date format, and it checks to see if a link is already in the file, both of which I can fix on the spot rather than waiting for a build to fail. I have yet to write a post about it. I got sidetracked trying to add some more functionality and broke everything. Fortunately, all the damage is resting silently on a feature branch.

**Make 11ty Fully Independent and Sustainable.** Please consider the appeal I posted last week regarding support for Zach going full-time and independent on the development of Eleventy. As someone who watches the 11ty GitHub repo issues, Zach's been very busy working toward the 3.0 beta and there's some great stuff in the pipeline. To add your financial support, head over to **[11ty Open Collective](https://opencollective.com/11ty)**.

Until next time...
