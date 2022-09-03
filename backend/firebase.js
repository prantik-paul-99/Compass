// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getStorage } = require ("firebase/storage");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "compass-app-16057.firebaseapp.com",
  projectId: "compass-app-16057",
  storageBucket: "compass-app-16057.appspot.com",
  messagingSenderId: "158042473927",
  appId: "1:158042473927:web:a23d875e06e918f3f105e2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

module.exports = {
  storage
}
