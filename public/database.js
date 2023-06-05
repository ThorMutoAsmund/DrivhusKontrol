 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-analytics.js";
 import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

//import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";

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
const db = getDatabase();
const year = '2023';
const month = '06';
const day = '05';
const dailyRef = (db, 'greenhouse/elmevej/'+year+'/'+month+'/'+day);

onValue(dailyRef, (snapshot) => {
  //const data = snapshot.val();
  snapshot.forEach((childSnapshot) => {
    childKey = childSnapshot.key;
    childVal = childSnapshot.val();

    var id1 = document.getElementById("id1");
    var id2 = document.getElementById("id2");
    id1.value = childKey;
    id2.value = 'test';
  });
}, {
  onlyOnce: true
} );

alert("Website started");