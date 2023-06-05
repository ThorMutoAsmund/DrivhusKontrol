import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-analytics.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";
//import { moment } from "https://momentjs.com/downloads/moment-with-locales.js";

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
const dataHeader = "<tr><th>Time</th><th>Temp. inside</th><th>Temp. outside</th><th>Humi. inside</th><th>Humi. outside</th></tr>";

var currentValuesTable = document.getElementById("currentValuesTable");  
var resultsTable = document.getElementById("resultsTable");  
var resultHeader = document.getElementById("resultHeader");
var yearSelect = document.getElementById("yearSelect");
var monthSelect = document.getElementById("monthSelect");
var daySelect = document.getElementById("daySelect");

var today = new Date();

var thisYear = today.getUTCFullYear();  
daySelect.value = today.getUTCDate();
monthSelect.value = today.getUTCMonth()+1;
yearSelect.value = thisYear;

var year = yearSelect.options[yearSelect.selectedIndex].text;
var month = monthSelect.options[monthSelect.selectedIndex].text;
var day = daySelect.options[daySelect.selectedIndex].text;

var dailyRef = ref(db, 'greenhouse/elmevej/'+year+'/'+month+'/'+day);

onValue(dailyRef, (snapshot) => {
  resultHeader.innerHTML = 'All results for ' + today.getDate()  + '/' + (today.getMonth()+1) + '/' + today.getFullYear();
  var debug = "";
  var oneDebug = "";
  snapshot.forEach((childSnapshot) => {
    var utcTimestamp = childSnapshot.key;
    var values = childSnapshot.val();

    var date = new Date(day+'/'+month+'/'+year+' '+utcTimestamp +' UTC');
    var localDate = date.toString();

    var localHours = date.getHours();    
    localHours = localHours < 10 ? '0'+localHours : ''+localHours;
    var localMinutes = date.getMinutes();
    localMinutes = localMinutes < 10 ? '0'+localMinutes : ''+localMinutes;
    var localSeconds = date.getSeconds();
    localSeconds = localSeconds < 10 ? '0'+localSeconds : ''+localSeconds;

    oneDebug = '<tr><td><b>'+localHours+':'+localMinutes+':'+localSeconds+'</b></td>';
    oneDebug += '<td>'+values.tIn+'</td>';
    oneDebug += '<td>'+values.tOut+'</td>';
    oneDebug += '<td>'+values.hIn+'</td>';
    oneDebug += '<td>'+values.hOut+'</td></tr>';
    debug = debug + oneDebug;
  });
  resultsTable.innerHTML = dataHeader + debug;
  currentValuesTable.innerHTML = dataHeader + oneDebug;
}, {
  onlyOnce: false
} );

// var year = yearSelect.options[yearSelect.selectedIndex].text;
// var month = monthSelect.options[monthSelect.selectedIndex].text;
// var day = daySelect.options[daySelect.selectedIndex].text;


//alert("Website started");