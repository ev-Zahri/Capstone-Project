const admin = require("firebase-admin");
// const serviceAccount = require("../firebaseServiceAccountKey.json");
require('dotenv').config();
const serviceAccount = JSON.parse(
  Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_KEY, 'base64').toString('utf8')
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://capstone-project-7f169.firebaseio.com",
  // storageBucket: "capstone-project-b06a2.firebasestorage.app",
});

const db = admin.firestore();
module.exports = { admin, db };
