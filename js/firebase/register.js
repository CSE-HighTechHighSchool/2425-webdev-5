// This JS file is for registering a new app user ---------------------------//
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getDatabase,
  ref,
  set,
  update,
  child,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";
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
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize firebase auth

const auth = getAuth();

// Return an instance of the database
const db = getDatabase(app);
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("user") != null) {
    window.location.href = "/index.html";
  }
});
document.getElementById("submitData").onclick = () => {
  console.log("running 38");
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("userEmail").value;
  const pw = document.getElementById("userPass").value;
  if (!validation(firstName, lastName, email, pw)) {
    alert("Bad data ");
    return;
  } else {
    alert("here");
    createUserWithEmailAndPassword(auth, email, pw)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;

        // Add user info to realtime db
        // set will create a new ref or completely replace an existing one
        // each new user will be placed under the "users" node
        // update will just update an existing doc
        // ...

        console.log(user);
        set(ref(db, "users/" + user.uid + "/accountInfo"), {
          uid: user.uid, // Once logged in, pass user id to registration page
          firstname: firstName,
          lastname: lastName,
          email: email,
          password: encryptPass(pw),
        });

        // Update the user object with the new firstname

        // Store updated user object in localStorage
        localStorage.setItem(
          "user",
          JSON.stringify({
            firstname: firstName,
            lastname: lastName,
            email: email,
            password: encryptPass(pw),
            uid: user.uid,
            last_login: new Date().toISOString(), // Add or update the last_login field
          })
        );

        // Log localStorage content to verify the update
        console.log("We're on");
        console.log(localStorage.getItem("user"));
        console.log(JSON.parse(localStorage.getItem("user")));
        console.log(JSON.parse(localStorage.getItem("user")).firstname);
      })
      .then(() => {
        console.log("New account made!");
        window.location.href = "/index.html";
      })
      .catch((err) => {
        console.error(err.message);
      });
  }
  // Create new app user using email.password auth
};

// ----------------- Firebase Setup & Initialization ------------------------//

// ---------------- Register New Uswer --------------------------------//

// --------------- Check for null, empty ("") or all spaces only ------------//
function isEmptyorSpaces(str) {
  return str === null || str.match(/^ *$/) !== null;
}

// ---------------------- Validate Registration Data -----------------------//
const validation = (firstName, lastName, email, pw) => {
  let fNameRegex = /^\w+$/;
  let lNameRegex = /^\w+$/;
  let emailRegex = /^[a-zA-Z]+@(ctemc|gmail|yahoo)\.(org|com|net)$/;
  if (
    isEmptyorSpaces(lastName) ||
    isEmptyorSpaces(firstName) ||
    isEmptyorSpaces(email) ||
    isEmptyorSpaces(pw)
  ) {
    alert("Please complete all field");
    return false;
  }
  if (!fNameRegex.test(firstName)) {
    alert("First name should only contain letters");
    return false;
  }
  if (!lNameRegex.test(lastName)) {
    alert("Last name should only contain letters");
    return false;
  }
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address: letters + ctemc.org");
    return false;
  }
  return true;
};

// --------------- Password Encryption -------------------------------------//
function encryptPass(password) {
  let encrypted = CryptoJS.AES.encrypt(password, password);
  console.log("Encrypted Password: " + encrypted);
  return encrypted.toString();
}
