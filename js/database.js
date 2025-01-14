/*
 File name: database.js
 Purpose: Contains code that interacts with the database to provide an interactive user experience.
 Authors: Akshat Tewari, Aditya Choudhary, and Ange Teng
 */

 import * as data from "./firebase/data.js"
// Function to fetch driver standings from the Ergast API
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

// Function to fetch drivers from the Ergast API
async function getDriversList(year, round) {
  // const csv = 'Japan,Max Verstappen,Sergio Perez,Carlos Sainz,Charles Leclerc,Lando Norris,Fernando Alonso,George Russell,Oscar Piastri,Lewis Hamilton,Yuki Tsunoda,Nico Hulkenburg,Lance Stroll,Kevin Magnussen,Valtteri Bottas,Esteban Ocon,Pierre Gasly,Logan Sargeant,Zhou Guanyu,Daniel Ricciardo,Alexander Albon';
  console.log("Fetching drivers list");
  try {
    const response = await fetch(`./data/round_${round}.csv`); // get the csv file

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const csvText = await response.text();
    const entries = csvText.split(',');

    // Extract the first entry as the location
    const location = entries[0];

    // Map the remaining entries to create driver details
    const drivers = entries.slice(1).map((driver, index) => ({
      number: index + 1,
      name: driver,
    }));

    console.log(drivers, location);
    console.log("Drivers", drivers);
    return drivers;
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
    return [];
  }


  // const apiUrl = `http://ergast.com/api/f1/${year}/${round}/drivers.json`;

  // try {
  //   const response = await fetch(apiUrl);

  //   if (!response.ok) {
  //     throw new Error(`HTTP error! Status: ${response.status}`);
  //   }

  //   const data = await response.json();
  //   const drivers = data.MRData.DriverTable.Drivers.map((driver, index) => ({
  //     number: index + 1,
  //     name: `${driver.givenName} ${driver.familyName}`,
  //     wikipedia: `https://en.wikipedia.org/wiki/${driver.givenName}_${driver.familyName}`,
  //   }));

  //   return drivers;
  // } catch (error) {
  //   console.error(`Error fetching data: ${error.message}`);
  //   return [];
  // }
}

let contextArray = [];
const list = document.getElementById("contextList");
const guessButton = document.getElementById("guessButton");

let round = 

// Function to render the list
function renderList(dataArrayPlayers) {
  contextArray = dataArrayPlayers;
  const list = document.getElementById("contextList");

  console.log("Rendering list:", dataArrayPlayers);
  list.innerHTML = "";

  dataArrayPlayers.forEach((driver, index) => {
    const li = document.createElement("li");
    li.dataset.index = index;

    const numberSpan = document.createElement("span");
    numberSpan.classList.add("number");
    numberSpan.textContent = `${index + 1}. `;

    const nameSpan = document.createElement("span");
    nameSpan.textContent = driver.name;

    li.appendChild(numberSpan);
    li.appendChild(nameSpan);

    li.addEventListener("click", () => {
      selectItem(li);
    });

    list.appendChild(li);
  });
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

// Fetch and render drivers
getDriversList(2024, 4)
  .then((drivers) => {
    console.log("ContextArray", contextArray);
    contextArray = drivers;
    console.log("Drivers", drivers);
    // getPlayerList();
    // renderList(contextArray);
  })
  .catch((error) => {
    console.error("Error fetching drivers:", error);
  });



// Function to compare user guesses with real standings and calculate scores
async function compareStandings() {
  const realStandings = await getDriverStandings(2024, 4);

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
    const realPosition = realDriver.position;

    if (guessedDriver) {
      const positionDifference = Math.abs(userPosition - realPosition);
      totalDifference += positionDifference;

      console.log(
        `${realPosition}: ${realDriver.name} - Your guess: ${
          userPosition ? userPosition : "No guess"
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



// Add click event for the "Guess" button to compare standings


console.log("Data page loaded");
  const selectCountry = document.getElementById("selectcountry");

  // Add an event listener to update the 'round' variable when the selection changes
  selectCountry.addEventListener("change", () => {
    round = selectCountry.value; // Get the selected value
    console.log(`Selected round: ${round}`);
  });

  // Example: Fetching data dynamically when the round changes
  selectCountry.addEventListener("change", async () => {
    if (round) {
      console.log(`Fetching data for round: ${round}`);
      // Example: Call your `getDriverStandings` or `getDriversList` functions here
      const drivers = await getDriversList(2024, round);
      console.log(`Drivers for round ${round}:`, drivers);
    }
  });


