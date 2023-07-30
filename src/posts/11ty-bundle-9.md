---
bundleIssue: 9
eleventyComputed:
  title: "Issue {{ bundleIssue }} - Eleventy Clock, grabbing your Goodreads data, descent into various ratholes...and AI helped me write the code"
  description: "Welcome to Issue {{ bundleIssue }} of the 11ty Bundle...a cool site, some great posts, and ratholes R us."
date: 2023-06-12
tags:
  - 11ty Bundle
pageHasCode: true
---

> UPDATE 2023-07-30: I've abandoned this effort as the data was less than satisfying. The wide range of categories and posts does not lend itself to me creating my own bespoke analytics package. I am currently investigating the use of various third-party analytics packages. I'll report back when I have something to share.

> TL;DR We've got a cool blog post in [this issue's list](#releases) about using pagination to build a clock with Eleventy (it's the last one in the list as it's from 2020). [Raymond Camden](/authors/raymond-camden/) shows us how to get our Goodreads data into an Eleventy site. We've got a site that will help you opt out from data brokers. And, finally, I am now crawling out of a rathole where I tried to figure out how to do something that might or might not be useful. Skip to [the posts and sites](#releases) if that's all you need.

Warning...this is a long-ish one. [Skip it](#releases) if you want.

Now, about that rathole...I thought it might be cool to have a page on this site that showed the most clicked of all the 500+ blog posts that sit here (just take a look at that [Firehose](/firehose/) and tell me that wouldn't be cool). Kind of a top 10 or 20 or 50, or whatever. I think that the genesis of this idea came from learning how to get the counts of the various category and author posts. And then I added a [sort by count](/authors-by-count/) to the Authors page. Numbers, man...I wanted numbers. Well, it turns out that "cool" isn't all that it's cracked up to be.

Another reason to want to know this is that I've been watching the simple analytics of the site as provided by Netlify (for $9/mo). The site appears to getting some minor traction, with a couple of hundred unique visitors per day (on weekdays). According to Netlify, there have been a total of 5,103 unique visitors to the site with 18,379 page views. Traffic to the site spikes whenever I share one of these blog posts. But while I can see some of the top pages visited (a specific category or author), I have no idea how often visitors are clicking on the listed blog posts as those clicks take them directly to the post author's site. Curious minds want to know. On to the rathole...

If you recall, the data for this site sits in an Airtable database. I got that crazy "what's getting the most clicks" idea in my head and I just could not let go of it. I pondered over it for a few days, thinking about how I might approach it. Then I finally decided to pose the question to the world (small as mine is) and I [wrote a post on my personal site](https://www.bobmonsour.com/posts/question-how-to-count-outbound-links/) about what I was trying to do.

I then pointed the Discord and Mastodon communities to the post and got a couple of ideas to stimulate my thinking. Off I was...down the rathole. First, I got a deep education about Netlify functions...which are very cool. I got a simple one working and it wasn't that difficult (I need to learn that mysterious new things, like serverless, are not as difficult as I think; they're just mysterious because I haven't studied them).

So, to count the outbound links, all I had to do was to add a ping attribute to all the anchor links (the titles) that you see in the long list of blog posts. The Netlify function would get invoked with a couple of query parameters whenever a link was clicked. That was easy enough. With the help of a Nunjucks macro, I was even able to have that ping live on a single line in my source, regardless of what templates it was used in.

Ok, I've got the ping being recognized and triggering a Netlify function. Now, all I have to do is rig the function up to a database to increment a count on a record. Sadly, Airtable does not have an atomic increment capability. So I was off to dig into the likes of the Firebase Realtime Database, Firestore, Supabase, MongoDB, or some such other database with a javascript library to do the dirty work.

I went with the Firebase Realtime Database as it looked a little easier to work with than the others. And wouldn't you know it, I was able to get my Netlify function to write a record to the database and increment the count for that record.

At this point, it sounds like the hard part is done. All I would then need to do is read the data from the database at build time and match it up with the Airtable records (the two databases share the same record IDs) which would be relatively straightforward.

But first, I had just gotten this capability to work in the Netlify dev environment on my local machine. Before I write the code to read back the clicks for use at build time, I should push this to a production branch that I can test to make sure the code works in the wild. Worst case, if it didn't work, no one visiting the site would see any difference. So I pushed the code to a production branch and deployed it to Netlify.

Lo and behold...the Netlify function was being triggered by clicks, no errors were generated, but nothing was reaching the database. So I went to the Netlify forums and posed a question...something along the lines of "how the hell am I supposed to debug this?"

About 15 minutes after posting, an answer came. It read:

> @bobmonsour I doubt that you can use the standard Firebase Realtime Database connectivity from a Netlify Function (which is ultimately an AWS Lambda), usually it would be placed directly on the front-end and secured via database security rules. If you did want to run it via functions you could implement with the REST API.

I realized that I could put the database increment code on the front end (via client-side javascript). I could add the necessary attributes to the links and add an event listener to those. It would do the database increment and then the user off to their ultimate destination.

But...but...but...I really didn't want to start adding client-side javascript to the site. As of now, there is zero. As a result, the site is quite speedy to load. It would be a pretty lightweight thing to add, but I just didn't want to go that route. Having said that, I did write some of that code and then bailed on it.

What would I do instead? Let me find another rathole (or two). Sure enough, I found the "database security rules" rathole and the "authentication" rathole. I could go on writing about the details...and there are more details, but I'll stop here.

It was at this point, early on Saturday, June 10th, that I made a decision. Rather than using a lantern to prowl around the ratholes, why not just neuter the Netlify function., i.e., keep it in place, doing nothing. But whenever there's a click, it would still trigger the function and I could watch how often through the Netlify site admin page. Then I'd at least get some idea if this "cool feature I could not let go of" would even be worth the effort.

But no...in the interest of "I can't let this freakin' thing go," after my wife went off to bed (on Sunday night), I returned here to continue prowling the ratholes. I have to say that the Google Firebase docs are massive and somewhat overwhelming, at least to me. Well I managed to learn 2 things. First, The Firebase Realtime Database was Google's first instance of a noSQL database. Their newer version is called Firestore. I decided to make a switch to Firestore.

And as I dug into the docs, I also learned that there's this thing called Service Accounts. In short, it's an account type that you can use to authenticate access to the database without being a traditional "logged in" user (which for these databases seems to be end users on websites or mobile apps). What I needed was a Service Account so that I could use that to authenticate access to the database from a Netlify function.

As before, I was able to get this working locally in a Netlify dev environment. But when I pushed a branch with the new function, it failed. It was triggering the function, but the function failed with an error and my eyes were getting weary.

As sleep can sometimes do, on Monday morning (today) I realized that I had not uploaded the new set of environment variables to Netlify before trying to run the new function. So, here I sit having uploaded all of the new Firestore API-related environment variables. I did a redeploy so that the function would be re-uploaded. I opened the functions console on Netlify. I opened the Firebase database view. I launched the site in a new browser tab. I clicked on a link. I watched the function get triggered. There were no errors. I watched the database...and it caught what I was writing. In short, this thing works!

For anyone interested in the code for the Netlify function, here it is. You can also [find it on the GitHub repo](https://github.com/bobmonsour/11tybundle.dev/blob/main/netlify/functions/countclicks.js) for this site.

```js
// /functions/countclicks.js - A Netlify function to count outbound link clicks

// Using a Firebase Firestore Database to store the click counts.
//
// The Firestore database has a collection called posts. In each post document
// there is a recordID (same as the Airtable recordID). Each record also has a
// count that will be incremented by 1 on each invocation of this function.
//
// Two query parameters are passed to this function:
//   1. itemid - the recordID of the post (required)
//   2. itemlink - the link to the post (for my viewing pleasure)

require("dotenv").config();
const admin = require("firebase-admin");

// setup firebase admin
const serviceAccount = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

exports.handler = async function (event, context) {
  // get the post ID and link from the query string parameters
  postID = event.queryStringParameters.itemid;
  postLink = event.queryStringParameters.itemlink;

  // announce that we're counting the click and which one
  console.log("Netlify Function `countclicks` invoked");
  console.log(`postID: ${postID}`);
  console.log(`postLink: ${postLink}`);

  const postRef = db.collection("posts").doc(postID);

  try {
    await db.runTransaction(async (t) => {
      const doc = await t.get(postRef);

      let newCount;
      if (!doc.exists) {
        newCount = 1;
      } else {
        newCount = doc.data().postCount + 1;
      }

      t.set(postRef, { postCount: newCount }, { merge: true });
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Transaction success" }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: `Transaction failure: ${err.message}` }),
    };
  }
};
```

Next up, I need to build the code to read the data from the database and match it up with the Airtable records and create a "most clicked posts" page. I'm hoping that this will be relatively straightforward. I'll be back with an update when I get that done.

Yes, this is fun. And I'm continuing to learn a lot.

Finally, if you're wondering if I had any help with this from the GitHub Co-Pilot extension and ChatGPT, the answer is yes. I used both of them to help me write the code for the function. And I studied the code and the Firestore docs to make sure that I understood it. And...it works!

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
