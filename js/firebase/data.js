// ----------------- Data Page --------------------------------------//

// ----------------- Firebase Setup & Initialization ------------------------//
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {
  getAuth,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

import {
  getDatabase,
  ref,
  set,
  update,
  child,
  get,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCE3R_tL3q9s2lD04U2BILi00-B3hH1FFw",
  authDomain: "webdev-5-98096.firebaseapp.com",
  databaseURL: "https://webdev-5-98096-default-rtdb.firebaseio.com",
  projectId: "webdev-5-98096",
  storageBucket: "webdev-5-98096.firebasestorage.app",
  messagingSenderId: "500589583214",
  appId: "1:500589583214:web:e040e8d1835f4667d93f7f",
};
const app = initializeApp(firebaseConfig);

// Initialize Firebase authentication
const auth = getAuth();

const db = getDatabase(app);

// ---------------------// Get reference values -----------------------------
let guessButton = document.getElementById("guessButton");  //guessButton is the button that the user clicks to submit their guess
let currentUser = null;  //Initialize current user to null

// ----------------------- Get User's Name'Name ------------------------------
function getUserName() {
    let keepLoggedIn = localStorage.getItem('keepLoggedIn');
    console.log(keepLoggedIn);
    if (keepLoggedIn === 'yes') {
        currentUser = JSON.parse(localStorage.getItem('user'));
    } else {
        currentUser = JSON.parse(sessionStorage.getItem('user'));
    }
    if (currentUser) {
        console.log("User retrieved:", currentUser);
    } else {
        console.log("No user found in storage");
    }
}

const setData = (userId, year, race, scoreData) => {
    set(ref(db, "users/" + userId + "/data/" + year + "/" + race), {
      [score]: scoreData,
    })
      .then(() => {
        alert("Data stored successfully");
      })
      .catch((err) => {
        alert("There was an error. Error: " + err.message);
      });
};

const getData = (userId, year, round) => {
    get(child(db, "users/" + userId + "/data/" + year + "/" + round))
    .then((snap) => {
      if (snap.exists()) {
        // yearVal.textContent = year;
        console.log(snap.val());

        // Adi forgot his passowrd so he has to work on the desktop
        // And he didn't push
        // To get specific value from a key: snapshot.value()[key]
        // tempVal.textContent = snap.val()[day];
      } else {
        console.log(snap);
        console.log("users/" + userId + "/data/" + year + "/" + round);
      }
    })
    .catch((err) => {
      alert("Unsuccessful");
      console.error(err.message);
    });
};

const getPlayerList = (year, round) => {
    getData(currentUser.uid, year, round)
}

guessButton.addEventListener('click', () => {
    getPlayerList();
});

window.addEventListener("DOMContentLoaded", () => {
    getUserName();
    if (currentUser) {
        console.log("User found");
    } else {
        console.log("No user found");
    }
});