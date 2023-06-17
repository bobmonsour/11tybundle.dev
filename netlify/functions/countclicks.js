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
  console.log("Netlify Function `countclicks` invoked");
  let linkType = event.queryStringParameters.itemtype;
  console.log(`linkType: ${linkType}`);
  switch (linkType) {
    case "posts":
      postID = event.queryStringParameters.itemid;
      postLink = event.queryStringParameters.itemlink;
      console.log(`postID: ${postID}`);
      console.log(`postLink: ${postLink}`);
      dbRef = db.collection("posts").doc(postID);      break;
    case "categories":
      categoryID = event.queryStringParameters.itemid.replace("/", "-");
      console.log(`categoryID: ${categoryID}`);
      dbRef = db.collection("categories").doc(categoryID);
      break;
    default:
      console.log("I don't know that type.");
  };

  try {
    await db.runTransaction(async (t) => {
      const doc = await t.get(dbRef);
      let newCount;
      if (!doc.exists) {
        newCount = 1;
      } else {
        newCount = doc.data().clickCount + 1;
      }

      t.set(
        dbRef,
        { clickCount: newCount },
        { merge: true }
      );
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
