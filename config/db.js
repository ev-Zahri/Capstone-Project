const admin = require("firebase-admin");
const serviceAccount = require("../firebaseServiceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://capstone-project-7f169.firebaseio.com",
  // storageBucket: "capstone-project-b06a2.firebasestorage.app",
});

const db = admin.firestore();
module.exports = { admin, db };
