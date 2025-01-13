/*
 File name: data.js
 Purpose: Contains code that interacts with the database to provide an interactive user experience.
 Authors: Akshat Tewari, Aditya Choudhary, and Ange Teng
 */
// ----------------- Data Page --------------------------------------//

// ----------------- Firebase Setup & Initialization ------------------------//
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

import {
  getDatabase,
  ref,
  set,
  update,
  remove,
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
const dbref = ref(db);

// ---------------------// Get reference values -----------------------------
let currentUser = null; //Initialize current user to null

// ----------------------- Get User's Name'Name ------------------------------
function getUserName() {
  console.log("Get User Name");
  if (localStorage.getItem("user") != null) {
    currentUser = JSON.parse(localStorage.getItem("user"));
  } else {
    currentUser = JSON.parse(sessionStorage.getItem("user"));
  }
  console.log();
  if (currentUser) {
    console.log("User retrieved:", currentUser);
    return currentUser.uid;
  } else {
    console.log("No user found in storage");
  }
}
// Once the user makes a guess, set that value in the db
const setData = (userId, year, race, playersData, scoreData) => {
  set(ref(db, "users/" + userId + "/data/" + year + "/" + race), {
    players: playersData,
    score: scoreData,
  })
    .then(() => {
      alert("Success!");
      document.getElementById("goBack").style.display = "block";
    })
    .catch((err) => {
      alert("There was an error. Error: " + err.message);
    });
};
// Get the data for a specific year and round from the db for a user
const getDataScore = async (userId, year, round) => {
  try {
    const snapshot = await get(
      child(dbref, `users/${userId}/data/${year}/${round}/score`)
    );
    if (snapshot.exists()) {
      console.log("Data found:", snapshot.val());
      return snapshot.val(); // Return resolved value
    } else {
      console.log(
        "No players data found at path:",
        `users/${userId}/data/${year}/${round}/score`
      );
      return null; // Explicitly return null if no data exists
    }
  } catch (err) {
    console.error("Error retrieving players data:", err.message);
    throw err; // Rethrow the error to handle upstream
  }
};
// Get the players on a certain year and round
const getDataPlayers = async (userId, year, round) => {
  try {
    const snapshot = await get(
      child(dbref, `users/${userId}/data/${year}/${round}/players`)
    );
    if (snapshot.exists()) {
      console.log("Data found:", snapshot.val());
      return snapshot.val(); // Return resolved value
    } else {
      console.log(
        "No players data found at path:",
        `users/${userId}/data/${year}/${round}/players`
      );
      return null; // Explicitly return null if no data exists
    }
  } catch (err) {
    console.error("Error retrieving players data:", err.message);
    throw err; // Rethrow the error to handle upstream
  }
};

// Deletes the saved player order and score
const deleteData = (userID, year, race) => {
  remove(
    ref(db, "users/" + userID + "/data/" + year + "/" + race + "/" + "players")
  )
    .then(() => {
      alert("Data removed successfully.");
    })
    .catch((err) => {
      console.log(err.message);
    });
  remove(
    ref(db, "users/" + userID + "/data/" + year + "/" + race + "/" + "score")
  )
    .then(() => {
      alert("Data removed successfully.");
    })
    .catch((err) => {
      console.log(err.message);
    });

  getDriversList(2024, 5)
    .then((drivers) => {
      contextArray = drivers;
      renderList(contextArray);
    })
    .catch((error) => {
      console.error("Error fetching drivers:", error);
    });
};
// gets a list of players for a given year and round
const getPlayerList = async (year, round) => {
  try {
    const result = await getDataPlayers(currentUser.uid, year, round);
    console.log("Player list result:", result);
    return result || -1; // Return -1 if no data exists
  } catch (err) {
    console.error("Error in getPlayerList:", err.message);
    return -1; // Handle errors by returning -1
  }
};

// Changes what the list render looks like
const setPlayerList = async (year, round) => {
  let players = getOrderedPlayerNames();
  // const playersString = players.map(player => `${player}`).join(',');
  // console.log('playersString', playersString)
  let score = await compareStandings();
  console.log(players, score);
  setData(currentUser.uid, year, round, players, score);
};

// ----------------- Event Listeners ------------------------//

async function renderInitList() {
  try {
    const value = await getPlayerList(2024, 5);
    console.log("Fetched player list value:", value);

    if (value === -1) {
      console.log("No data found for the specified year and round.");
    } else if (value) {
      console.log("Data found:", value);
      // renderList(value); // Call the rendering function with data

      const transformedData = value.map((player, index) => ({
        number: index + 1, // Assign the player's rank (starting from 1)
        name: player, // Assuming each player has a 'name' property
        wikipedia: `https://en.wikipedia.org/wiki/${player})}`, // Wikipedia URL
      }));

      console.log("Transformed data:", transformedData);

      renderList(transformedData);
    }
  } catch (err) {
    console.error("Error in renderInitList:", err.message);
  }
}
window.addEventListener("DOMContentLoaded", () => {
  let guessButton = document.getElementById("guessButton"); //guessButton is the button that the user clicks to submit their guess
  // /cancelButton is the button that the user clicks to cancel their guess
  let cancelButton = document.getElementById("cancelButton");
  getUserName();
  guessButton.addEventListener("click", () => {
    setPlayerList(2024, 5);
  });

  cancelButton.addEventListener("click", () => {
    deleteData(currentUser.uid, 2024, 5);
  });
  if (currentUser) {
    console.log("User found");
  } else {
    console.log("No user found");
  }
  renderInitList();
});
