const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('MongoDB connected');
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

module.exports = connectDB;

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyANL-kv3q6Dr6tSD5IHcUM3hcjow8JD8yU",
//   authDomain: "capstone-project-b06a2.firebaseapp.com",
//   projectId: "capstone-project-b06a2",
//   storageBucket: "capstone-project-b06a2.firebasestorage.app",
//   messagingSenderId: "660094772994",
//   appId: "1:660094772994:web:304def84a73da1dad8041b",
//   measurementId: "G-XFJY752MS5"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);