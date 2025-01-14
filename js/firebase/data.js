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
let guessButton = document.getElementById("guessButton"); //guessButton is the button that the user clicks to submit their guess
let cancelButton = document.getElementById("cancelButton"); //cancelButton is the button that the user clicks to cancel their guess
const list = document.getElementById("contextList");

let currentUser = null; //Initialize current user to null
let round = 4;
// ----------------------- Get User's Name'Name ------------------------------
function getUserName() {
  if (localStorage.getItem("user") != null) {
    currentUser = JSON.parse(localStorage.getItem("user"));
  } else {
    currentUser = JSON.parse(sessionStorage.getItem("user"));
  }
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
      alert("Guess Saved");
    })
    .catch((err) => {
      alert("There was an error. Error: " + err.message);
    });

    // Select the goBackElement element by its ID
const goBackLink = document.getElementById('goBack');

// Change the display style to make it visible
if (goBackLink) {
  goBackLink.style.display = 'inline-block';
}
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
      return null; // return null if no data exists
    }
  } catch (err) {
    console.error("Error retrieving players data:", err.message);
    throw err; // throw the error
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
      return null; // return null if no data exists
    }
  } catch (err) {
    console.error("Error retrieving players data:", err.message);
    throw err; // throw the error to handle upstream
  }
};

// Deletes the saved player order and score
const deleteData = (userID, year, race) => {
  remove(
    ref(db, "users/" + userID + "/data/" + year + "/" + race + "/" + "players")
  )
    .then(() => {
      alert("Guess removed successfully.");
    })
    .catch((err) => {
      console.log(err.message);
    });
  remove(
    ref(db, "users/" + userID + "/data/" + year + "/" + race + "/" + "score")
  )
    .then(() => {
      alert("Guess removed successfully.");
    })
    .catch((err) => {
      console.log(err.message);
    });

  getDriversList(2024, round)
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
    let uid = getUserName();
    const result = await getDataPlayers(uid, year, round);
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
  let uid = getUserName();

  setData(uid, year, round, players, score);
};




//do the intial render of the list
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

function getOrderedPlayerNames() {
  const listItems = list.querySelectorAll("li"); // Select all list elements in the list
  const playerNames = Array.from(listItems)
    .map((item) => {
      const nameSpan = item.querySelector("span:last-child"); // Select the span elements containing the name
      return nameSpan ? nameSpan.textContent : null;
    })
    .filter((name) => name !== null); // Remove null values
  return playerNames;
}

// Function to compare user guesses with real standings and calculate scores
async function compareStandings() {
  const race = getRound();
  const realStandings = await getDriversList(2024, race);

  if (!realStandings || !contextArray) {
    console.error("Failed to fetch standings or driver list.");
    return;
  }

  console.log("Comparing User Guesses with Real Standings:");
  let totalDifference = 0;

  realStandings.forEach((realDriver, index) => {
    const guessedDriver = contextArray.find(
      (driver) => driver.name === realDriver.name
    );
    const userPosition = guessedDriver
      ? contextArray.indexOf(guessedDriver) + 1
      : null;
    const realPosition = realDriver.number;

    if (guessedDriver) {
      const positionDifference = Math.abs(userPosition - realPosition);
      totalDifference += positionDifference;

      console.log(
        `${realPosition}: ${realDriver.name} - Your guess: ${userPosition ? userPosition : "No guess"
        } - Difference: ${positionDifference}`
      );
    } else {
      console.log(
        `${realPosition}: ${realDriver.name} - No guess - Difference: Not included`
      );
    }
  });

  // Final score calculation
  const finalScore = 400 - totalDifference;
  console.log(`Total Difference: ${totalDifference}`);
  console.log(`Final Score: ${finalScore}`);
  return finalScore;
}

async function getDriverStandings(year, round) {
  const apiUrl = `http://ergast.com/api/f1/${year}/${round}/driverStandings.json`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const standings =
      data.MRData.StandingsTable.StandingsLists[0].DriverStandings.map(
        (driver) => ({
          position: parseInt(driver.position, 10),
          name: `${driver.Driver.givenName} ${driver.Driver.familyName}`,
          points: driver.points,
        })
      );

    return standings;
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
    return null;
  }
}
// ----------------- Event Listeners ------------------------//
// window.addEventListener("DOMContentLoaded", () => {
//   getUserName();
//   if (currentUser) {
//     console.log("User found");
//   } else {
//     console.log("No user found");
//   }
//   renderInitList();
// });

// guessButton.addEventListener("click", () => {
//     setPlayerList(2024, 5);
//   });

cancelButton.addEventListener("click", () => {
  let uid = getUserName();
  let race = getRound();
  deleteData(uid, 2024, race);
});

function getRound() {
  var urlParams = new URLSearchParams(window.location.search);
  var race = urlParams.get('race');
  return race;
}

window.addEventListener("DOMContentLoaded", () => {
  const selectCountry = document.getElementById("selectcountry");
  const showCountryImage = document.getElementById("showCountry");

  // Add an event listener to the select element
  if (selectCountry) {
    selectCountry.addEventListener("change", () => {
      const selectedCountry = selectCountry.value; // Get the selected value
      showCountryImage.src = `/img/countries/${selectedCountry}.png`; // Update the image source
    });
  }
});

console.log("Data page loaded");
const selectCountry = document.getElementById("selectcountry");
if(selectCountry) {
  // Add an event listener to update the 'round' variable when the selection changes
// selectCountry.addEventListener("change", () => {
//   round = selectCountry.value; // Get the selected value
//   console.log(`Selected round: ${round}`);
// });

// Example: Fetching data dynamically when the round changes
selectCountry.addEventListener("change", async () => {
  if (round) {
    console.log(`Fetching data for round: ${round}`);
    // Example: Call your `getDriverStandings` or `getDriversList` functions here
    const drivers = await getDriversList(2024, round);
    console.log(`Drivers for round ${round}:`, drivers);
  }
});

}


//   const guessButton = document.getElementById("guessButton");

guessButton.addEventListener("click", () => {
  getOrderedPlayerNames();
  compareStandings();
  var urlParams = new URLSearchParams(window.location.search);
  var race = urlParams.get('race');
  setPlayerList("2024", race);
});

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Get the 'race' query parameter from the URL
const race = getQueryParam('race');

console.log('race', race);

getPlayerList(2024, race).then((drivers) => {
  var playersPromise;
  if (drivers && drivers.length > 0) {
    playersPromise = new Promise((resolve, reject) => {
      resolve(drivers.map((driver, index) => ({
        number: index + 1,
        name: driver,
      })));
    });

  } else {
    playersPromise = getDriversList("2024", race)
  }

  playersPromise.then((players) => {
    console.log('Drivers:', players);
    renderList(players);
  });
  // console.log('Drivers:', players);
  // renderList(players);
});

