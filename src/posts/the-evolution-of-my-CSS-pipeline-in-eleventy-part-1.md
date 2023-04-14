---
title: The evolution of my CSS pipeline in Eleventy (part 1)
date: 2023-03-14
tags:
  - CSS
  - 11ty
description: Handling CSS in Eleventy has been an evolutionary experience.
keywords: CSS, web development, Eleventy, 11ty
image:
  source: "the-evolution-of-my-css-pipeline-in-eleventy-part-1.jpg"
  alt: "a screen with a few lines of CSS"
  creditPerson: "Pankaj Patel"
  creditLink: "https://unsplash.com/@pankajpatel"
pageHasCode: true
---

> _While initially a single post about my evolving use of CSS, there is now a second part which you can [find here](/posts/the-evolution-of-my-CSS-pipeline-in-eleventy-part-2). But you should really read this one first._

## Table of Contents

<div class='toc'>

1. [Introduction](#section1)
2. [My first site with Eleventy](#section2)
3. [A slightly leaner set of scripts](#section3)
4. [A toe in the water with Open Props and PostCSS](#section4)
5. [Time for a new site of my own](#section5)
6. [You didn't think I was done, did you?](#section6)
7. [Conclusion](#section7)
8. [Links to the repos for the sites discussed](#section8)

</div>

---

<div id="section1"></div>

## 1. Introduction

There are many ways for web developers to work with CSS. Practices can vary widely, with everything from structure, framework usage, naming conventions, minifying the result, auto-prefixing, and more. Some considerations that go into these choices include whether the project is a solo effort or that of a team, the size and complexity of the project, site performance goals, and momentum based on the prior experience of the person or team.

I'm writing this piece to show how I've evolved my use of CSS in the context of [Eleventy](https://www.11ty.dev/), the static site generator.

<div id="section2"></div>

## 2. My first site with Eleventy

The first site that I made use of Eleventy was a Jekyll site that I ported to Eleventy. It used a theme that was Sass-based. I was somewhat familiar with Sass, but this port required me to dive a little deeper. The site was built using the Liquid template language and as part of the port, I migrated to Nunjucks.

The Sass theme had a lot of things that I didn't need, so I did some surgery to remove some of the bloat. Here's what my sass directory looks like for this project.

```textile
/sass/
  0-settings/
  1-tools/
  2-base/
  3-modules/
  4-layouts/
  main.scss
```

This structure came from the theme and was not of my choosing. That said, it looks pretty organized and sensible.

Here are the scripts used in my package.json to develop and build the site. They are based directly on this [Sass workflow recipe](https://11ty.recipes/recipes/add-a-sass-workflow/) by [Mike Aparicio](https://www.mikeaparicio.com/).

```js
"scripts": {
  "watch:sass": "sass --watch sass:_site/css",
  "watch:eleventy": "eleventy --serve",
  "build:sass": "sass --no-source-map sass:_site/css",
  "build:eleventy": "eleventy",
  "start": "npm-run-all --parallel watch:*",
  "build": "npm-run-all build:sass build:eleventy",
  "clean": "rimraf ./_site"
  },
```

There's nothing very complicated here. The Sass gets picked up from the sass directory and compiled into the output directory. All the CSS ends up in a single file called main.css that then gets included in the \<head\> as you'd expect, like so:

```html
<link rel="stylesheet" href="/css/main.css" />
```

The site lives on today. I built it for a good friend who is a tennis pro. If you're interested, you can check out [scottmurphytennis.net](https://www.scottmurphytennis.net/).

> _NOTE: The scripts above are generally correct. However, I do make use of the cross-env package to support the ELEVENTY_ENV environment variable in order to distinguish between development and production environments. But for easier reading, I have removed those references. The start and build commands that I actually use look like the following. This is true for all the subsequent versions of my scripts._

```js
  "start": "cross-env ELEVENTY_ENV=dev npm-run-all --parallel watch:*",
  "build": "cross-env ELEVENTY_ENV=prod npm-run-all build:sass build:eleventy",
```

<div id="section3"></div>

## 3. A slightly leaner set of scripts

My wife's grandfather, Fausto Tasca, was a painter from Italy. He has done some really beautiful work. My wife had built a site dedicated to his work. The site was built with an ancient piece of technology from Apple called iWeb. Interestingly, it seems that Apple still has a [web page for it](https://www.apple.com/welcomescreen/ilife/iweb-3/).It was a drag-and-drop website application that, in its time, was a static site generator. You would upload the output files to an inexpensive hosting service via FTP.

Over the years, my wife would ask to change some text and I would download the HTML file for a particular page, change the text and upload it. And that was that...until she asked for some more structural things. I convinced her to let me build a new site with Eleventy, this cool new toy that I was having fun learning about. I also had to do some catching up on CSS and these new things called grid and flexbox, among other things.

So, off I went and I built a new site dedicated to the art of [Fausto Tasca](https://www.faustotasca.com/).

I watched a lot of CSS videos on YouTube and took one of Kevin Powell's [classes on flexbox](https://www.flexboxsimplified.com/) and off I went.

Here's a look at my from-scratch Sass directory structure.

```textile
/sass/
  _base.scss
  _contact.scss
  _mobile.scss
  _navigation.scss
  -variables.scss
  main.scss
```

This was the phase where I was using media breakpoints to accomplish a responsive layout for a range of devices; hence, the \_mobile.scss file.

Here's a look at the resulting scripts used to develop and build the site.

```js
"scripts": {
  "watch:eleventy": "npx @11ty/eleventy --serve --incremental",
  "watch:sass": "npx sass sass:_site/css --watch",
  "start": "npm run watch:eleventy & npm run watch:sass",
  "build": "sass sass:_site/css && eleventy",
  "clean": "rimraf ./_site"
  },
```

It's a bit leaner as I simply combined two commands for each of start and build using &&. The result is the same, a single file in the output directory.

<div id="section4"></div>

## 4. A toe in the water with Open Props and PostCSS

Shortly after building [faustotasca.com](https://www.faustotasca.com/), I had a tennis lesson with Scott and he mentioned that his wife Cynthia, a speech and language therapist, might need a website for her business. I gave her a call and we outlined what might work.

By now, I had started looking at some CSS frameworks. I had used Bootstrap and Foundation in the past, but I was not keen to get into that kind of bulk as this would be a simple site made of a handful of pages.

Around that time, Adam Argyle had introduced a new thing called [Open Props](https://open-props.style/), something he called Supercharges CSS variables. This was a package of pre-built custom properties covering everything from colors, to spacing, fluid type, borders, gradients, and more. It looked and sounded interesting. So I [dipped my toe in](https://www.bobmonsour.com/posts/dipping-my-toes-in-the-open-props-water/).

This gave me the opportunity to work with PostCSS. The idea was that the full set of Open Props was large. Adam had built a PostCSS plugin that would look at your CSS and only include the Open Props that you use. This sounded pretty efficient.

This is what the Sass directory looks like for the project.

```textile
/sass/
  _contact.scss
  _desktop.scss
  _mobile.scss
  _navigation.scss
  _reset.scss
  -variables.scss
  main-dev.scss
  main-prod.scss
```

Pay no attention to the fact that there are two main.css files. This was me contorting myself for unnecessary reasons and is something I will be cleaning up in the future. And I'm still using media querries to support responsiveness on mobile devices.

So now, my scripts looked like the following, with the postbuild command being executed after Eleventy and post-processing my CSS to bring in only the necessary Open Props.

```js
"scripts": {
  "watch:sass": "sass --watch src/sass/main-dev.scss:_site/css/main.css",
  "watch:eleventy": "eleventy --serve",
  "build:sass": "sass --no-source-map src/sass/main-prod.scss:_site/css/main.css",
  "build:eleventy": "eleventy",
  "postbuild": "postcss _site/css/main.css -o _site/css/main.css",
  "start": "npm-run-all --parallel watch:*",
  "build": "npm-run-all build:sass build:eleventy",
  "clean": "rimraf ./_site"
  },
```

And here is the postcss.config.js file that calls for the use of postcss-jit-props, a plugin for Open Props that does the scanning to reduce the final use of open props to only those that are referenced in the main css file.

```js
const postcssJitProps = require("postcss-jit-props");
const OpenProps = require("open-props");

module.exports = {
  plugins: [postcssJitProps(OpenProps)],
};
```

The project still operates this way and you can [check it out here](https://www.cbascaraspeechtherapy.com/).

<div id="section5"></div>

## 5. Time for a new site of my own

By this time, I felt like I was learning a lot about Eleventy, Sass, and CSS. It was time to build a personal site. While I started out using Open Props, I recently decided to eliminate it. This site is incredibly simple and I have learned enough about custom properties to construct my own set of CSS vars, borrowing ideas and snippets from the Open Props project.

While the site does not currently reflect what I'm about to describe, here's a look at how it started. My goal was to incorporate Sass along with something that would also minify the CSS and add auto-prefixing capability.

With a better understanding of what PostCSS could do, I initially embarked on eliminating Open Props and sought to use PostCSS to minify and auto-prefix my final CSS. Doing that resulted in the following scripts and the associated PostCSS config file, postcss.config.js. Note that postcss-logical is a plugin that provides a polyfill for CSS logical properties which were not supported at the time. At the time of this writing, they are more widely supported and I no longer use it (nor do I use PostCSS).

```js
"scripts": {
  "watch:sass": "sass --watch src/sass/main-dev.scss:_site/css/main.css",
  "watch:eleventy": "eleventy --serve",
  "build:sass": "sass --no-source-map src/sass/main-prod.scss:_site/css/main.css",
  "build:eleventy": "eleventy",
  "postbuild": "postcss _site/css/main.css -o _site/css/main.css",
  "start": "npm-run-all --parallel watch:*",
  "build": "npm-run-all build:sass build:eleventy",
  "clean": "rimraf ./_site"
  },
```

```js
const postcssJitProps = require("postcss-jit-props");
const OpenProps = require("open-props");
const cssnano = require("cssnano");
const autoprefixer = require("autoprefixer");
const postcssLogical = require("postcss-logical");
module.exports = {
  plugins: [postcssJitProps(OpenProps), postcssLogical, cssnano, autoprefixer],
};
```

You'll notice that the scripts are identical to those used on the earlier project, but the use of plugins for PostCSS expanded to bring in the extra functionality of minifying and auto-prefixing.

This was working well for me until I found myself intrigued by a new approach that Stephanie Eckles came up with. It uses [Lightning CSS](https://lightningcss.dev/) as a post-processor in place of PostCSS. And, more importantly, the method she devised makes use of Eleventy's custom template language capability to handle Sass as another template language. This sounded oh so cool. So, off I went. Stephanie wrote a plugin called [eleventy-plugin-sass-lightningcss](https://github.com/5t3ph/eleventy-plugin-sass-lightningcss) that made the whole thing very simple. She wrote [a post about it](https://11ty.rocks/posts/process-css-with-lightningcss/) on [11ty.rocks](https://11ty.rocks/) (which I highly recommend). Stephanie is a gem of the Eleventy community.

What I liked about it was that my scripts were reduced to the following:

```js
"scripts": {
  "start": "npx @11ty/eleventy --serve",
  "build": "npx @11ty/eleventy",
  "clean": "rimraf ./_site"
  },
```

No more npm-run-all, and no more sass watch and build scripts. It was all embedded into the plugin. The key thing here is that it did all the minifying and auto-prefixing that my earlier setup did. I eliminated PostCSS and its associated config file. It was all quite painless, until...

After implementing this approach, I took a look at the site in Google Search Console. I noticed that it noted that there were a handful of pages on the site that were not indexed. I was surprised to see several of my css files listed. I was a bit baffled. So I examined my sitemap.xml and sure enough, it had listed several of my css files which were non existent in the output.

As it turns out, this approach resulted in the css files being added to collections.all, which is the basis for creating the sitemap.

I raised this issue on the plugin repo as well as the Eleventy repo. Stephanie quickly identified a graceful workaround. And that is to add a css.json file that includes the following:

```json
{
  "eleventyExcludeFromCollections": true
}
```

This prevents the processed files from being included in collections.all, and thus excluded from the sitemap. Problem solved...yet it feels slightly icky.

<div id="section6"></div>

## 6. You didn't think I was done, did You?

One of the considerations that I referred to in the introduction was performance goals. Recently, I've been spending time examining how my site performs along several dimensions. One of the tools that I've been using is Lighthouse. I have been paying particular attention to image sizes, the number of 3rd party requests, and more.

As I've been watching Eleventy develop over recent months, I've tried to make use of features that improve the site along these dimensions. The [eleventy-img](https://www.11ty.dev/docs/plugins/image/) plugin is an amazing tool that has helped me optimize image sizes.

More recently, I took a look at the [eleventy-plugin-bundle](https://github.com/11ty/eleventy-plugin-bundle). I was inspired by how you could sprinkle CSS and JS around the pages of a site and then gather them for use.

And then, just days ago (or so), Zach added an interesting page to the [eleventy documentation](https://www.11ty.dev/docs/), titled [Adding CSS, Javascript, Fonts](https://www.11ty.dev/docs/assets/). It's all about simple ways to add assets these assets to your site.

And then, just then, I stepped back from my site and asked myself the following questions:

1. Do I really need Sass?

2. Do I really need auto-prefixing?

3. Are there simple ways to minify my CSS file in a more Eleventy-ish way?

4. Wouldn't it be nice to inline my CSS and eliminate another file fetch by the browser?

### Do I really need Sass?

Stephanie did a recent Twitch stream called [Can we ditch Sass?](https://www.twitch.tv/videos/1747696237?filter=archives&sort=time). I was intrigued. It largely played on what can be done with Lightning CSS.

I've been using Sass for a while now. When I first started out, I used it only for variables. It was worth it for that alone. Now that CSS has custom properties, I have moved away from Sass variables completely.

Then I learned about nesting and began to use it and I liked how it simplified both writing and reading my Sass files. I know that nesting is in the works for CSS itself, but that is not what I considered. I looked at my site and how little CSS I was using and thought, how much time would it take me to flatten my CSS to eliminate the nesting? It took about 20 minutes. It would have been faster, but I was trying to be careful.

> \_UPDATE: No sooner had I posted this, this morning I opened my email to find the latest CSS Layout News newsletter from Rachel Andrews. She linked to [a post by Adam Argyle](https://developer.chrome.com/articles/css-nesting/?ref=css-layout-news) that covers the nesting features currently available and those coming in the Chrome browser.

### Do I really need auto-prefixing?

There are two parts to this. First auto-prefixing adds vendor prefixes for those browsers who have put recent features behind a prefix until they're cooked. In this piece from May, 2021, Rob O'Leary asks [Is Vendor Prefixing Dead?](https://css-tricks.com/is-vendor-prefixing-dead/). It's an amazing look at how the need for this has diminished over time.

Second, I've been watching the major browser vendors up their game, seemingly in unison. They all seem to be getting new CSS standard features implemented, but in an interoperable way. Things are changing rapidly on this front. Here's a piece on [Interop 2023](https://web.dev/interop-2023/) that discusses what I think is a relatively recent phenomenon (meaning in recent years). There are so many people behind the scenes making this happen, but I want to give shoutouts to two in particular. Rachel Andrew at Google, the content lead for [web.dev](https://web.dev/) and [developer.chrome.com](https://developer.chrome.com/). She's also got an awesome newsletter called [csslayout news](https://csslayout.news/). And then there is Jen Simmons, now with Apple as an Apple Evangelist for Web Developer Experiences. About 4 years ago, she produced a YouTube channel called [Layout Land](https://www.youtube.com/@LayoutLand/featured) which is where I learned a lot about grid and flexbox. I believe that the experience and credibility that brought them to these roles have had a huge impact on how far and fast CSS has come.

Yes, that was bit of a digression...but it's these observations lead me to the belief that, for my site and my audience (all 3 of you), I do NOT need auto-prefixing. Your mileage may vary.

### Are there simple ways to minify my CSS file in a more Eleventy-ish way?

Yes. In fact, [Quick Tip #001](https://www.11ty.dev/docs/quicktips/inline-css/) in the Eleventy docs show exactly how to do just that by installing the [clean-css package](https://www.npmjs.com/package/clean-css) and then creating a simple filter in Eleventy. It looks like this in my eleventy.config.js.

```js
const CleanCSS = require("clean-css");
eleventyConfig.addFilter("cssmin", function (code) {
  return new CleanCSS({}).minify(code).styles;
});
```

### Wouldn't it be nice to inline my CSS and eliminate another file fetch by the browser?

The answer here is YES too. And it's in that same [Quick Tip #001](https://www.11ty.dev/docs/quicktips/inline-css/#capture-and-minify).

First, let me show you what my CSS setup looks like for this site.

```textile
/css/
  main.css
  prism-okaidia.css
  reset.css
  variables.css
```

Note that none of these files contain any Sass. And the css folder is inside my Eleventy \_include directory. So, all I have to do is concatenate them in the order I want and drop them into the \<head\> of my site layout and run the result through the cssmin filter...like this.

```jinja2 {% raw %}
{% set css %}
  {% include "css/reset.css" %}
  {% include "css/variables.css" %}
  {% include "css/prism-okaidia.css" %}
  {% include "css/main.css" %}
{% endset %}
<style>
  {{ css | cssmin | safe }}
</style>
{% endraw %}
```

And finally, here's what my scripts look like using this technique.

```js
"scripts": {
  "start": "npx @11ty/eleventy --serve",
  "build": "npx @11ty/eleventy",
  "clean": "rimraf ./\_site"
},

```

It doesn't get much simpler than that. Same as before, but only relying on clean-css for minifying in a more Eleventy-ish way via filter.

<div id="section7"></div>

## 7. Conclusion

If you've read this far, thank you! As you can see, I've learned a lot from a lot of great people. And while we can all get easily distracted by new ways to do things, it's important to have some perspective. I am trying my best to strive for simplicity, maintainability, and performance. This site is my test bed. One thing I am asking myself now is whether or not it makes sense to retrofit some of these learnings into those other projects. I'll have to think about that.

And I'd like to send a bit shoutout to the moderators and helpers in the Eleventy Discord community. Just today, they helped me get over my last challenge in getting this post to display correctly. For anyone interested, here's [a link to the Discord discussion we had](https://discord.com/channels/741017160297611315/1085269982096654456). If you ever have an Eleventy question, that's the place to go.

> _It seems that I'm not really done with this. And the site is no longer based on this last approach. If you'd like to continue watching my CSS strategy evolve, here's [the next step in the evolution](/posts/the-evolution-of-my-CSS-pipeline-in-eleventy-part-2)._

<div id="section8"></div>

## 8. Links to the sites and repos for the sites discussed

Here are links to the sites and Github repos for all of these sites. Needless to say, they all contain areas for improvement.

[scottmurphytennis.com](https://www.scottmurphytennis.net/), [repo](https://github.com/bobmonsour/scottmurphytennis)

[faustotasca.com](https://www.faustotasca.com/), [repo](https://github.com/bobmonsour/faustotasca)

[cbascaraspeechtherapy.com](https://www.cbascaraspeechtherapy.com/), [repo](https://github.com/bobmonsour/cbascara)

[bobmonsour.com](https://www.bobmonsour.com/), [repo](https://github.com/bobmonsour/bobmonsour.com)
