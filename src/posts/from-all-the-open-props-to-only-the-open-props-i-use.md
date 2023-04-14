---
title: From all Open Props to only Open Props I use
date: 2022-03-08
tags:
  - CSS
  - 11ty
description: Got Open Props working on my site, but wanted to reduce the size of my CSS in production.
keywords: postcss-jit-props, smaller CSS, adam argyle
image:
  source: "only-the-open-props-i-use.jpg"
  alt: "essential love drawn in color on a chalkboard"
  creditPerson: "Sharon McCutcheon"
  creditLink: "https://unsplash.com/@sharonmccutcheon"
pageHasCode: true
---

> Note: I am no longer using Open Props as I've decided to reduce the number of levels of abstraction that I use to maintain the CSS for this site. I still find it a fascinating tool, but for the size and scope of this project, I am finding it easier to maintain my own set of custom properties for the few things I need them for.

[UPDATE: July 19, 2022]

The original post (below) represents what I believed was true at the time...before I learned better. If you're new to this post, you might want read that first. The new learning is that I did not need to maintain separate main.scss files for production and development. In fact, including the @import statement in the production version of the main.scss file is totally fine as the postcss-jit-props plugin will still work as intended.

What I have also since learned is how to add other plugins (for example, cssnano, autoprefixer, and postcss-logical) to the postcss.config.js file. The [Github repo for this site](https://github.com/bobmonsour/bobmonsour.com) reflects this new learning.

[START OF ORIGINAL POST]

As I wrote in [my last post](/posts/dipping-my-toes-in-the-open-props-water), I started using Open Props to define the colors, fonts, and font sizes for this site. I also used Open Props to define the radius and animation you see when you hover over the site's links.

There are a lot of available props and my site's use of them only scratches the surface, using less than 20 of them as of this writing.

So, the question is: How can I have the 100s of Open Props available during development, yet have my production CSS file only contain the ones I use?

Here's how I incorporate Open Props in my CSS (I'm using Sass) during development:

```css
@use "variables";
@use "reset";
@use "desktop";
@use "mobile";
@import "https://unpkg.com/open-props/open-props.min.css";
```

Enter [postcss-jit-props](https://github.com/GoogleChromeLabs/postcss-jit-props). It's a plugin for [PostCSS](https://postcss.org/) that takes your CSS file, scans it for the Open Props you actually use and adds them to your CSS file.

But wait, I wondered how can I have that @import line in my CSS file, but not have it present in production. If I left it in during production, the process of adding only the props I use would not help in file size reduction at all.

I'm using Sass for my CSS and there's no apparent way to conditionally import a file. If you know of some way, I'm all ears. Let me know on [Twitter](https://twitter.com/bobmonsour).

So I posed this question to [Adam Argyle](https://twitter.com/adamargyle) on the [Open Props Discord](https://discord.com/channels/896960631322849340/915345792166928415/949465191282798602). He was equally stumped, but suggested that I consider having two Sass files, one for dev and one for production. The dev version would have the import and the production version would not (and would use postcss-jit-props to bring in the props I used).

Since this is a small, personal project, that seemed the way to go. And since I'm building the site with [11ty](https://www.11ty.dev/), it would be relatively straightforward to have separate scripts in my package.json, one for dev and one for production (which I already had). Each would simply invoke the Sass build from different main Sass files that did all the importing.

Backing up a little bit here, PostCSS has a CLI and can use a config file, i.e., postcss.config.js, to specify the plugins and options that it should use. Here's a look at mine, as suggested on the [Open Props site](https://open-props.style/):

```js
// postcss.config.js
const postcssJitProps = require("postcss-jit-props");
const OpenProps = require("open-props");

module.exports = {
  plugins: [postcssJitProps(OpenProps)],
};
```

With that in place, here's what my 11ty package.json file looks like with the relevant build scripts to handle dev and production. Note that one is called main-dev.scss and the other is called main-prod.scss (oddly enough).

```js
  "scripts": {
    "watch:sass": "sass --no-source-map --watch src/sass/main-dev.scss:_site/css/main.css",
    "watch:eleventy": "eleventy --serve",
    "build:sass": "sass --no-source-map src/sass/main-prod.scss:_site/css/main.css",
    "build:eleventy": "eleventy",
    "postbuild": "postcss _site/css/main.css -o _site/css/main.css",
    "start": "npm-run-all --parallel watch:*",
    "build": "npm-run-all build:sass build:eleventy",
    "clean": "rimraf ./_site"
  },
```

This works great.

I have to point out one thing that took me a while to figure out and maybe others wonder about this too. One of the people I find most inspirational as I learn more about 11ty and all it is capable of is [Stephanie Eckles](https://github.com/5t3ph). She has produced so very many useful posts and resources all about 11ty. As I looked at [this particular repository](https://github.com/5t3ph/11ty-sass-skeleton) of her 11ty-sass-skeleton and examined the [package.json file](https://github.com/5t3ph/11ty-sass-skeleton/blob/main/package.json), I could not for the life of me figure out how the "postbuild" script would ever be invoked. Clearly it seems that it would be run after a "build." But how? It took a while, thinking and googling, to finally find that a script named "postbuild" was the one that would be invoked after the "build" script. While intuitive, I took me more time than I expected to learn [this little tidbit](https://docs.npmjs.com/cli/v8/using-npm/scripts/). In short, if you name a script as "post" followed by the name of another script, it runs after it. Similarly, if you name a script as "pre" followed by the name of another script, it runs before it.

Anyway, that's all for now as I continue my journey into the world of 11ty, CSS, and other stuff.
