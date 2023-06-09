// /functions/hello.js

require("dotenv").config();
const { initializeApp } = require("firebase/app");
const {
  getDatabase,
  increment,
  update,
  ref,
  set,
  runTransaction,
} = require("firebase/database");
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

// Set the value of a specific record ID
// set(ref(dbRef, recordId), {
//   type: "blog post",
// });

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
      console.log("Transaction completed successfully");
    })
    .catch((error) => {
      console.error("Transaction failed: ", error);
    });
  return {
    statusCode: 200,
    body: ``,
  };
};
