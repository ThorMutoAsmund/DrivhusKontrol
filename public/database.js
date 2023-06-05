// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-analytics.js";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcTrF2KVkK6VVlmXrzcOJ50nDjRR1twS4",
  authDomain: "drivhusstyring.firebaseapp.com",
  databaseURL: "https://drivhusstyring-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "drivhusstyring",
  storageBucket: "drivhusstyring.appspot.com",
  messagingSenderId: "488073281250",
  appId: "1:488073281250:web:06d4552ce98736099c68bb",
  measurementId: "G-VXJT3XKY58"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

alert("Website started");