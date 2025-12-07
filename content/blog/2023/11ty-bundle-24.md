---
bundleIssue: 24
eleventyComputed:
  title: "Issue {{ bundleIssue }} - Snowfall edition...Can you say 3.0 alpha?"
  description: "Welcome to Issue {{ bundleIssue }} of the 11ty Bundle."
date: 2023-12-17
tags:
  - 11ty Bundle
snow: "true"
---

To end the year, we've got some exciting stuff.

First off, Zach has released [Eleventy v3.0.0-alpha.2](https://github.com/11ty/eleventy/releases/tag/v3.0.0-alpha.2) to the world. And he's actively [seeking courageous canary testers](https://www.11ty.dev/blog/canary-eleventy-v3/). Yes, we're looking at you. Zach kicked off the testing and the Eleventy website is running on 3.0.0-alpha.2, AND it's all been converted to ESM.

I just jumped on the bandwagon this evening and now this very 11tybundle site is running on it! Note that Eleventy v3.0 requires Node 18 or newer. Since this site is built and deployed by Netlify, I had to set an environment variable, NODE_VERSION, to 18 to eliminate a build error. Other than that, all I had to do locally was install the alpha version of Eleventy, like this...

```bash
npm install @11ty/eleventy@canary --save-exact
```

Read the instructions carefully as there are some other caveats that depend on certain plugins you may be using. This site runs pretty vanilla, so that was all I had to do to get the alpha of 3.0 running.

Check out [Zach's blog post](https://www.11ty.dev/blog/canary-eleventy-v3/) and give it a try on one or a few of your side projects or other non-critical projects. It's incredibly easy to do. Let's help shake the bugs out of it.

Earlier in the week Zach released some fun in the form of a [snow-fall web component](https://www.zachleat.com/web/snow-fall/). You're seeing it now on this blog post. I also have it running on my personal site. There, it's on every page. But for this site, I've set it up as a front matter setting so I can control where it appears. Right now, it's only on this post.

One other new item of note is one of the [starters](/starters/). Named Niépce, it's a feature-rich photography portfolio site. It's named for Nicéphore Niépce, a French inventor and one of the earliest pioneers of photography. [Check it out on GitHub](https://github.com/GoOz/Niepce). It's also the basis of the [author's own photography site](https://www.bloogart.com/).

I hope that you all enjoy your holiday season and have a wonderful New Year!

I'll see you in 2024...
