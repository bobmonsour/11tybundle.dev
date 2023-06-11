---
bundleIssue: 9
eleventyComputed:
  title: "Issue {{ bundleIssue }} - Eleventy Clock, grabbing your Goodreads data, and descent into various ratholes"
  description: "Welcome to Issue {{ bundleIssue }} of the 11ty Bundle...ratholes R us."
date: 2023-06-13
tags:
  - 11ty Bundle
keywords: eleventy, 11ty, newsletter, roundup, news
image:
  source: "11tybundle-dev.jpg"
  alt: "an AI-generated image of the number eleven"
draft: true
---

> TL;DR We've got a cool blog post about using pagination to build a clock with Eleventy. [Raymond Camden](/authors/raymond-camden/) shows us how to get our Goodreads data into an Eleventy site. A site that will help you opt out from data brokers, and I am now crawling out of a rathole where I tried to figure out how to do something that I now believe is totally unnecessary. Skip to [the posts and sites](#releases) if that's all you need.

Now, about that rathole...for some reason, I thought it might be cool to have a page on this site that showed the most clicked of all the 500+ blog posts that sit here (just take a look at that [Firehose](/firehose/) and tell me that wouldn't be useful). Kind of a top 10 or 20 or 50, or whatever. I think that the genesis of this idea came from learning how to get the counts of the various category and author posts. And then I added a [sort by count](/authors-by-count/) to the Authors page. Numbers, man...I wanted numbers. Well, it turns out that "cool" isn't all that it's cracked up to be.

If you recall (or even if you don't), the data for this site sits in an Airtable database. I got that crazy "what's getting the most clicks" idea in my head and I just could not let go of it. I pondered over it for a few days, thinkin g about how I might approach it. Then I finally decided to pose the question to the world (small as mine is) and I [wrote a post](https://www.bobmonsour.com/posts/question-how-to-count-outbound-links/) on my personal site about what I was trying to do.

I then pointed the Discord and Mastodon communities to the post and got a couple of ideas to stimulate my thinking. Off I was...down the rathole. First, I got a deep education about Netlify functions...which are very cool. I even got it working. So, to count the outbound links, all I had to do was to add a ping attribute to all the title links that you see in the long list of blog posts. The Netlify function would get invoked with a couple of query parameters whenever a link was clicked. That was easy enough. With the help of a Nunjucks macro, I was even able to have that ping live on a single line in my source, regardless of what templates it was used in.

Ok, I've got the ping being recognized and triggering a Netlify function. Now, all I have to do is rig the function up to a database to increment a count on a record. Sadly, Airtable does not have an atomic increment capability. So I was off to dig into the likes of the Firebase Realtime Database, Firestore, Supabase, MongoDB, or some such other database with a javascript library to do the dirty work.

I went with the Firebase Realtime Database as it looked a little easier to work with than the others. And wouldn't you know it, I was able to get my Netlify function to write data to the database and increment the count on the records.

At this point, it sounds like I'd have the hard part done with. All I would then need to do is read the data from the database at build time and match it up with the Airtable records (the two databases share the same record IDs) which would be relatively straightforward.

But first, I had only gotten the contraption to work in the Netlify dev environment on my local machine. Before I write the code to read back the clicks for use at build time, I should push this to a production branch that I can test to make sure the code works in the wild. Worst case, if it didn't work, no one visiting the site would see any difference. So I pushed the code to a production branch and deployed it to Netlify.

Lo and behold...the Netlify function was being triggered by clicks, but nothing was reaching the database. So I went to the Netlify forums and posed a question...something along the lines of "how the hell am I supposed to debug this?"

About 15 minutes after posting, an answer came. It read:

> @bobmonsour I doubt that you can use the standard Firebase Realtime Database connectivity from a Netlify Function (which is ultimately an AWS Lambda), usually it would be placed directly on the front-end and secured via database security rules. If you did want to run it via functions you could implement with the REST API.

I then realized that I could in fact put the database increment code on the front end (via client-side javascript). I could add the necessary attributes to the links and add an event listener to those. It would do the database increment and then the user off to their ultimate destination.

But...but...but...I really didn't want to start adding client-side javascript to the site. As of now, there is zero. It would be a pretty lightweight thing to add, but I just didn't want to go that route.

What would I do instead? Let me find another rathole (or two). Sure enough, I found the "database security rules" rathole and the "authentication" rathole. I could go on writing about the details...and there are more details, but I'll stop here.

It was at this point, earlier today (Saturday, June 10th), that I made a decision. Rather than using a lantern to prowl around the ratholes, why not just neuter the Netlify function., i.e., keep it in place, doing nothing. But whenever there's a click, it would still trigger the function and I could watch how often through the Netlify site admin page. Then I'd at lease get some idea if this "cool feature I could not let go of" would even be worth the effort.

And here we are. Hopefully, by the next issue, I'll have some insight. That said, I've got a sneaking suspicion that my time is better spent unearthing cool blog posts written about Eleventy and sites built with Eleventy. We'll see.

Until next time...

<div id="releases"></div>

## Recent releases

{% set itemType = "release" %}
{% include 'partials/bundleitems.njk' %}

## Posts from around the web since the last Bundle issue

{% set itemType = "blog post" %}
{% include 'partials/bundleitems.njk' %}

## Built with Eleventy

Just a few of the many sites built with Eleventy. I just share a few that come across my limited-scope radar. If you want to see more, check out the [Eleventy Leaderboards](https://www.11ty.dev/speedlify/).

{% set itemType = "site" %}
{% include 'partials/bundleitems.njk' %}
