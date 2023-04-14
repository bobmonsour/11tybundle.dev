---
title: The evolution of my CSS pipeline in Eleventy (part 2)
date: 2023-03-26
tags:
  - CSS
  - 11ty
description: Evolution is a continuous phenomenon.
keywords: CSS, web development, Eleventy, 11ty
image:
  source: "the-evolution-of-my-css-pipeline-in-eleventy-part-2.jpg"
  alt: "a screen containing a jumble of minified CSS"
  caption: A jumble of this site's minified CSS
pageHasCode: true
---

> _Hopefully, you've read [part 1](/posts/the-evolution-of-my-CSS-pipeline-in-Eleventy-part-1). If not, I'll wait here ._

## Table of Contents

<div class='toc'>

1. [Introduction](#section1)
2. [To inline or not to inline](#section2)
3. [Enter the eleventy-plugin-bundle](#section3)
4. [Moving away from inlining toward external CSS](#section4)
5. [Selectively including a CSS bundle](#section5)
6. [A simple attempt at identifying critical CSS](#section6)
7. [What about minifying?](#section7)
8. [Reducing browser file fetches...and the role of fonts](#section8)
9. [Conclusion](#section9)
10. [Related resources](#section9)

</div>

---

<div id="section1"></div>

## 1. Introduction

After further reflecting on the approach that I took at the end of the last post, inlining all of the site's CSS between \<style\> tags in the head of each page, I started to wonder if that made sense. I did some research to find out the pros and cons.

I also wanted to learn more about Zach's [eleventy-plugin-bundle](https://github.com/11ty/eleventy-plugin-bundle) and how I might use it to improve the way I handle CSS across the site. Note that there are many other methods and tools available for structuring CSS; for example, tools and learning resources like [Tailwind](https://tailwindcss.com/), [Bootstrap](https://getbootstrap.com/), [Every Layout](https://every-layout.dev/), and others. For this site, I am writing much of the CSS myself.

<div id="section2"></div>

## 2. To inline or not to inline

Like most approaches to web development there are tradeoffs.

By inlining all of the styles in the head of the document, each page transition results in those styles being reloaded as they are not cached across pages. On the other hand, the browser does not have to fetch an external stylesheet, which has some overhead associated with it and can delay display of the page if the user is on a poor network connection or the hosting provider is overloaded.

By using an external style sheet, there is that fetching overhead, but today's browsers are smart enough to cache the stylesheet so that transitions to another page on the site eliminates loading the same file (assuming that the stylesheet linked on that page is the same...more on that later). And the document that is loaded isn't carrying extra stylesheet weight of an inlined set of styles.

The last approach in the previous post showed how I set up my style files in the site's head, which is the same on all pages of the site.

```jinja2{% raw %}
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

The reset.css file is based on Andy Bell's [Modern CSS Reset](https://piccalil.li/blog/a-modern-css-reset/).

The prism-okaidia.css file is one of the themes in the [PrismJS syntax highlighter](https://prismjs.com/) and is used by the Eleventy [syntax highlight plugin](https://www.11ty.dev/docs/plugins/syntaxhighlight/).

The variables.css and main.css are authored by me and dictate the look of the site.

In the above scenario, all of the files are concatenated and minified and placed inline between \<style\> tags in the head of each page. So every page loads all the styles and the browser is unable to cache the styles between pages.

To me, that didn't feel right. For anyone browsing the site, they have to reload all of the CSS for every page they view. Second, not all of the pages on the site require the prism-okaidia.css file as only a handful use syntax highlighting.

> _NOTE: I realize that this is a very small site and the actual performance changes for the various approaches that I'm taking would likely have no meaningful effect on any of those in my viewing audience (all 5 of them). Much of what I'm writing about is what I'm learing. As a bonus, I'm enjoying learning this stuff._

Another way to improve performance of a site is to quickly load the CSS that supports the first viewable, above the fold, area of the site. This is referred to as critical CSS. There's a good article about it on [web.dev here](https://web.dev/extract-critical-css/). For larger sites and those serving users on slower connections, this can make a significant difference in user experience. Later in this post, I'll show an oversimplified example of how I attempted to do it for this site. Again, there's not likely a performance advantage here, but it's a way for me to highlight the approach.

Lastly on this topic, there's an npm package, [critical](https://github.com/addyosmani/critical), that "extracts & inlines critical-path (above-the-fold) CSS from HTML." It would be nice to see someone from the Eleventy community write a plugin to integrate this functionality into the build process. Having said that, I've also found a [Critical CSS gernerator](https://www.corewebvitals.io/tools/critical-css-generator) that will do the job through a web interface. The only challenge I see with this is knowing what then to exclude from one's CSS files for later loading.

> _UPDATE (4-1-23): As it turns out, someone **did** write an Eleventy plugin called [eleventy-critical-css](https://github.com/gregives/eleventy-critical-css) that uses Addy Osmani's critical npm package. It hasn't been updated since Oct 8, 2021 and I have not tried it._

<div id="section3"></div>

## 3. Enter the eleventy-plugin-bundle

Now that I've filled your head with the good, the bad, and the ugly of inlining CSS, I wanted to take a look at the eleventy-plugin-bundle, or as Zach puts it "Little bundles of code, little bundles of joy. Create minimal per-page or app-level bundles of CSS, JavaScript, or HTML to be included in your Eleventy project."

I was intrigued by the idea of organizing my CSS by what is included on all pages and what is only needed on some pages.

So instead of capturing all of my CSS files into a Nunjucks variable and then minifying and inlining them, I did the following:

- installed the eleventy-plugin-bundle
- decomposed the main.css into a few files, each representing a section of the site
- I sprinkled those sections with inclusions of their respective CSS files

For example, here's what my file list transformed into:

```textile
reset.css
variables.css
prism-okaidia.css
header.css
about.css
main.css
footer.css
```

The header.css contains all of the CSS for header.njk which generates the navigation links and image you see at the top of this page (sounds like a perfect candidate for critical CSS, but I'll cover that later). So, in my header.njk, I add the following:

```jinja2 {% raw %}
{% css %}{% include "css/header.css" %}{% endcss %}
{% endraw %}
```

The about.css contains just a few lines of CSS that are only used on the about page. And in the about.njk, I add:

```jinja2 {% raw %}
{% css %}{% include "css/about.css" %}{% endcss %}
{% endraw %}
```

The footer.css contains just the CSS that styles all of the footer elements. In the footer.njk, I add:

```jinja2 {% raw %}
{% css %}{% include "css/footer.css" %}{% endcss %}
{% endraw %}
```

> _And while I considered putting the CSS directly into the Nunjucks templates instead of using include, the fact that I would lose syntax highlighting in VS Code for the CSS kept me from doing it._

Then, in my \<head\>, I replaced some of the includes in the Nunjucks 'set' setup with the following:

```jinja2 {% raw %}
{% set css %}
  {% include "css/reset.css" %}
  {% include "css/variables.css" %}
  {% include "css/prism-okaidia.css" %}
  {% include "css/main.css" %}
  {% getBundle "css" %}
{% endset %}
<style>
  {{ css | cssmin | safe }}
</style>
{% endraw %}
```

The getBundle gathers all of the bundles that I've sprinkled onto the page -- header, about, and footer -- that Eleventy is building at that moment. The result is that each page has the most relevant CSS for the page.

Seems efficient, but it turns out that it doesn't work, as Zach [highlights in this issue](https://github.com/11ty/eleventy-plugin-bundle/issues/7) on the Github repo for the plugin.

Nice try...

Since I was just dipping my toe in the water with the plugin, I had yet to address the inlining vs external CSS issue. As a result, it seemed to make more sense to shift toward an external CSS approach.

<div id="section4"></div>

## 4. Moving away from inlining toward external CSS

The first step toward external CSS would involve eliminating the use of the Nunjucks variable and simply include the files in a CSS bundle and then use a link to the bundle file in typical link element as follows:

```jinja2 {% raw %}
{% css %}
  {% include "css/reset.css" %}
  {% include "css/variables.css" %}
  {% include "css/header.css" %}
  {% include "css/about.css" %}
  {% include "css/prism-okaidia.css" %}
  {% include "css/main.css" %}
  {% include "css/footer.css" %}
{% endcss %}
<link rel="stylesheet" href="{% getBundleFileUrl "css" %}">
{% endraw %}
```

This results in all of the CSS for all the pages of the site included in the bundle. So, while there is no inlining, there is but a single external file request. But the overhead of every page including the syntax highlighting CSS bothered me. The header.css and footer.css are used every where and the about.css is very small (but is only used on the about page).

This was making less sense to me, so I folded the header, footer, and about css back into main.css.

What I really want is to selectively include the prism-okaidia.css only on the pages that needed it, the pages that contained code examples.

Note that I have also lost the ability to minify the CSS (we'll get to that later).

<div id="section5"></div>

## 5. Selectively including a CSS bundle

There's a capability to create named buckets of CSS with the bundle plugin. So I decided to add a piece of frontmatter to the posts that require syntax highlighting. I called it pageHasCode.

```js
---
pageHasCode: true
---
```

Then in my post layout file, I added the following:

```jinja2 {% raw %}
{% if pageHasCode %}
  {%- css "pageHasCode" %}
  {% include "css/prism-okaidia.css" %}
  {% endcss %}
{% endif %}
{% endraw %}
```

An alternative way to do this would be to insert that css code block that has the include inside just below the frontmatter in each page that has code in it.

Finally, I now had a way to generate two separate CSS files, one that would be used for all the pages of the site and a second that would be linked only if the pageHasCode frontmatter were true for that page. So now my \<head\> looks like this.

```jinja2 {% raw %}
{% css %}
  {% include "css/reset.css" %}
  {% include "css/variables.css" %}
  {% include "css/main.css" %}
{% endcss %}
<link rel="stylesheet" href="{% getBundleFileUrl "css" %}">

{% if pageHasCode %}
<link rel="stylesheet" href="{% getBundleFileUrl "css", "pageHasCode" %}">
{% endif %}
{% endraw %}
```

What's nice about this is that there are only ever two distinct CSS files, one that is loaded for all pages, and a second that is only referenced in the \<head\> on pages where syntax highlighting is required. And since the contents of these files do not vary from page to page, the browser is able to cache them.

Now it was time to consider critical CSS.

<div id="section6"></div>

## 6. A simple attempt at identifying critical CSS

As I considered the question of critical CSS, I was of 2 minds. First, as I'd mentioned earlier, for an incredibly simple multi-page site like this blog and the relatively small size of all of the CSS files in use, there is a very small performance difference among any of these approaches (one that I have not attempted to measure).

When I try to think about what "above the fold" means for a website, I am somewhat confounded by the variability of devices on which our sites are viewed.

The only thing that I am certain of is that the header of the pages on this site include a small number of styled elements. In particular, those are the navigation elements and that small image of my face in the middle.

Those elements are all included in header.njk and if I look at my default layout that provides the overall page layout, here's what I see up to and including the referece to header.njk:

```jinja2 {% raw %}
<!DOCTYPE html>
<html lang="en">
  {% include 'partials/head.njk' %}
<body>
  <a href="#main-content" id="visually-hidden">Skip to main content</a>
  {% include 'partials/header.njk' %}
{% endraw %}
```

So, as a first cut, I imagine that I could take all of the header element CSS styles, along with the styling for #visually-hidden and capture them in their own css bundle bucket called "critical" and inline them in the \<head\>.

Note that as I am writing this, I have not done this and will now attempt it. If I succeed, I expect that my \<head\> will look like the following:

```jinja2 {% raw %}
<style>
{% getBundle "critical" %}
</style>

{% css %}
  {% include "css/reset.css" %}
  {% include "css/variables.css" %}
  {% include "css/main.css" %}
{% endcss %}
<link rel="stylesheet" href="{% getBundleFileUrl "css" %}">

{% if pageHasCode %}
<link rel="stylesheet" href="{% getBundleFileUrl "css", "pageHasCode" %}">
{% endif %}
{% endraw %}
```

So, the critical CSS will be inlined, and one or two style sheets will be loaded, depending on the page.

Ok, I'm back after looking at this closer. It's a rabbit hole. I ran into more questions than answers. For example:

1. Do I have to include some of the styling that is in reset.css? Things like html and body?
2. Does this make my CSS setup more or less manageable as I change page structure or take a different approach to the design of the site?

These 2 questions alone caused me to back away from this and leave the structure as outlined in [section 5](#section5). After all, I do want to finish this blog post.

> _UPDATE (3-29-23): I Just came across [this excellent piece covering critical CSS](https://csswizardry.com/2022/09/critical-css-not-so-fast/) and how challenging it can be to implement correctly and to maintain it once it's implemented. If you're considering implementing it, I highly recommend reading this article._

But one more thing...what about minifying? We lost that when we moved to external files.

<div id="section7"></div>

## 7. What about minifying?

Yet another capability of the eleventy-plugin-bundle is the ability to [modify the bundle output](https://github.com/11ty/eleventy-plugin-bundle#modify-the-bundle-output) by writing an async-friendly callback. As that is not something that I have in my toolset just yet, fortunately Zach provides an example (see that link just above). In his example, he makes use of PostCSS and its postcss-nested plugin. I figured there had to be a postcss-minify plugin, and sure enough, there is.

So I took Zach's example and added the following to my Eleventy.config.js (which could be your .Eleventy.js).

```js
const bundlerPlugin = require("@11ty/eleventy-plugin-bundle");
const postcss = require("postcss");
const postcssMinify = require("postcss-minify");
EleventyConfig.addPlugin(bundlerPlugin, {
  transforms: [
    async function (content) {
      // this.type returns the bundle name.
      if (this.type === "css") {
        // Same as Eleventy transforms, this.page is available here.
        let result = await postcss([postcssMinify]).process(content, {
          from: this.page.inputPath,
          to: null,
        });
        return result.css;
      }
      return content;
    },
  ],
});
```

Note that I had already added the bundlerPlugin to achieve the earlier feats, but this expands on that to add the minifying transform. I also had to install the postcss and postcss-minify packages with npm.

The end result is that each of the two files that are generated from the CSS bundles are minified. If you do a view source on the page that you're now viewing, you can see the links to the two files. Click on those to reveal the minified CSS.

<div id="section8"></div>

## 8. Reducing browser file fetches...and the role of fonts

One of the things that turned up in my research on critical CSS was loading external font files and their impact on layout shift when loading a page.

Up until two weeks ago or so, I was using a font that I had gotten from [Google Fonts](https://fonts.google.com/). They have an expansive and tempting set of fonts to choose from. As part of their setup, they show you exactly what to include in your \<head\> to fetch the fonts.

Rather than using their setup, I had decided to download the font files directly and include them as assets in my source files. As a result, I simply referenced those local font files in my @font-face declaration in my main CSS file.

That was all good until I stumbled upon a fascinating site called [Modern Font Stacks](https://modernfontstacks.com/).

The proposition is that with the evolution of operating systems and the wide range of fonts already stored on many of the devices in use today, they have organized those available fonts into groups of similar-looking styles, with names such as System UI, Transitional, Old Style, Humanist, and more.

If you examine the [Github page](https://github.com/system-fonts/modern-font-stacks) for the site, you can preview the rendering of each of these fonts across operating systems.

To that end, what you are likely looking at right now is from the set of Classical Humanist fonts.

I have defined a CSS custom property for the font declaration as follows:

```css
--brand-font: Optima, Candara, "Noto Sans", source-sans-pro, sans-serif;
```

- Optima covers macOS 10.3+ and iOS 13+
- Candara covers Windows 7+
- Noto Sans covers Linux
- Soure Sans Pro covers Android
- sans-serif provides a fallback if none of the above are available

That, and a simple font-family declaration in my main.css, like this:

```css
font-family: var(--brand-font);
```

And with that, I eliminate any fetching of font files by the browser. And while each of you may get a slightly different looking font, they're likely to be quite similar.

If you ask me, this is yet another win for web performance.

<div id="section9"></div>

## 9. Conclusion

As of now, I think I've learned enough to be dangerous when it comes to developing a CSS organization strategy...for this site. For sites I may develop in the future, things are likely to change depending on the needs and size of the site.

A few key takeaways from these 2 posts for me are:

1. This site no longer has a need for Sass
2. The eleventy-plugin-bundle makes it easier to develop per-page CSS
3. There's a time for inlining and a time for external style sheets
4. I still have a lot to learn about how best to approach handling critical CSS
5. There are many ways to approach CSS processing with Eleventy, choose wisely

And now we're really done. Until next time...

<div id="section10"></div>

## 10. Related resources

Here are links to some of the sites that formed a part of my research.

### How many stylesheets to have?

CSS-Tricks, Jun 14, 2012
[One, Two, or Three](https://css-tricks.com/one-two-three/)

### Inlining vs external CSSs

freeCodeCamp, Aug 12, 2021
[HTML and CSS - Inline Style, External Stylesheet, CSS Code Examples](https://www.freecodecamp.org/news/html-and-css-inline-style-external-stylesheet-css-code-examples/)

ewaycorp, Jul 25, 2020
[Improve Site Performance with Advantages of Inline CSS](https://www.ewaycorp.com/advantages-of-inline-css-boost-site-performance-eway-corp/)

Data Flair
[Best Inline CSS Tricks Everyone Should Know](https://data-flair.training/blogs/inline-css/)

### Critical CSS

web.dev, May 29, 2019
[Extract Critical CSS](https://web.dev/extract-critical-css/)

Smashing Magazine, Aug 13, 2015
[Understanding Critical CSS](https://www.smashingmagazine.com/2015/08/understanding-critical-css/)

Corewebvitals.io
[Critical CSS generator](https://www.corewebvitals.io/tools/critical-css-generator)

### Fonts

[Modern Font Stack](https://modernfontstacks.com/)

web.dev, Oct 4, 2022
[Best practices for fonts](https://web.dev/font-best-practices/)
