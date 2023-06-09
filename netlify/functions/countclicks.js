// /functions/countclicks.js - A Netlify function to count outbound link clicks

// Using a Firebase Realtime Database to store the click counts
// Each record in the database has an id that is identical to the record id
// used in the Airtable base. In fact, the Airtable record id is used as the
// key in the Firebase database. The record has two fields: count and type.
// Each time a blog post link is clicked, the count is incremented and the
// type is set to "blog post".

require("dotenv").config();
const { initializeApp } = require("firebase/app");
const { getDatabase, ref, runTransaction } = require("firebase/database");
var firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
const dbRef = getDatabase(app);

exports.handler = async (event, context) => {
  console.log("netlify function triggered");
  const querystring = event.queryStringParameters;
  const recordId = querystring.itemid;
  const type = querystring.itemtype;
  const recordRef = ref(dbRef, recordId);
  // Run a transaction on the record to increment the count and set the type value
  runTransaction(recordRef, (currentData) => {
    if (!currentData) {
      // If the record doesn't exist, create it with a count of 1 and the type value
      return { count: 1, type: type };
    } else {
      // If the record exists, increment the count and set the type value
      currentData.count = (currentData.count || 0) + 1;
      currentData.type = type;
      return currentData;
    }
  })
    .then(() => {
      console.log("Transaction successful");
    })
    .catch((error) => {
      console.error("Transaction failed: ", error);
    });
  return {
    statusCode: 200,
    body: ``,
  };
};
