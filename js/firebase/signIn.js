// ----------------- User Sign-In Page --------------------------------------//

// ----------------- Firebase Setup & Initialization ------------------------//
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
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
// ---------------------- Sign-In User ---------------------------------------//
window.addEventListener("DOMContentLoaded", () => {
  if (
    localStorage.getItem("user") != null ||
    sessionStorage.getItem("user") != null
  ) {
    window.location.href = "/index.html";
  } else {
    console.log("auth");
  }
  document.getElementById("signInButton").onclick = function () {
    // Get suer's email and password for sign in

    if (document.getElementById("loginEmail").value.length === 0) {
      alert("Please enter your email");
      return;
    }
    if (document.getElementById("loginPassword").length === 0) {
      alert("Please enter your password");
      return;
    }
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Log sign-in in db
        // Update will only add the last_login and won't overwrite anything
        let logDate = new Date().toISOString();
        alert("fail");

        update(ref(db, "users/" + user.uid), {
          last_login: logDate, // Add or update the last_login field
        })
          .then(() => {
            // Successfully updated
            get(ref(db, "users/" + user.uid))
              .then((snapshot) => {
                console.log(snapshot.val());
                if (snapshot.exists()) {
                  logIn(snapshot.val());
                  window.location.href = "/index.html";
                } else {
                  console.log("No data available");
                }
              })
              .catch((error) => {
                console.error(error);
              });
          })
          .catch((error) => {
            alert("Not Logged In");
            console.error("Error updating data:", error);
          });
      })
      .catch((error) => {
        alert("fail");

        console.error("Sign-in error:", error);
      });
  };
});

// ---------------- Keep User Logged In ----------------------------------//

function logIn(user) {
  // Store user data in local storage

  let keepLoggedIn = document.getElementById("keepLoggedInSwitch").checked;
  console.log(keepLoggedIn);
  if (keepLoggedIn) {
    console.log("local store");

    localStorage.setItem(
      "user",
      JSON.stringify({
        firstname: user.accountInfo.firstname,
        lastname: user.accountInfo.lastname,
        email: user.accountInfo.email,
        password: encryptPass(user.accountInfo.password),
        uid: user.accountInfo.uid,
        last_login: new Date().toISOString(), // Add or update the last_login field
      })
    );
  } else {
    console.log("session store");
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        firstname: user.accountInfo.firstname,
        lastname: user.accountInfo.lastname,
        email: user.accountInfo.email,
        password: encryptPass(user.accountInfo.password),
        uid: user.accountInfo.uid,
        last_login: new Date().toISOString(), // Add or update the last_login field
      })
    );
  }
}

function encryptPass(password) {
  let encrypted = CryptoJS.AES.encrypt(password, password);
  console.log("Encrypted Password: " + encrypted);
  return encrypted.toString();
}
