// /functions/countclicks.js - A Netlify function to count outbound link clicks

// Using a Firebase Firestore Database to store the click counts
// The Firestore database has a collection called posts. In each post document
// there is a recordID (same as the Airtable record ID). Each record also has a
// count that will be incremented by 1 on each invocation of this function.

require("dotenv").config();
const admin = require("firebase-admin");

// setup firebase admin
const serviceAccount = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY,
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
