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
  const apiUrl = `http://ergast.com/api/f1/${year}/${round}/drivers.json`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const drivers = data.MRData.DriverTable.Drivers.map((driver, index) => ({
      number: index + 1,
      name: `${driver.givenName} ${driver.familyName}`,
      wikipedia: `https://en.wikipedia.org/wiki/${driver.givenName}_${driver.familyName}`,
    }));

    return drivers;
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
    return [];
  }
}

let contextArray = [];
const list = document.getElementById("contextList");
const guessButton = document.getElementById("guessButton");
let selectedItem = null;

// Function to render the list
function renderList() {
  list.innerHTML = "";

  contextArray.forEach((driver, index) => {
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

// Fetch and render drivers
getDriversList(2024, 1)
  .then((drivers) => {
    contextArray = drivers;
    renderList();
  })
  .catch((error) => {
    console.error("Error fetching drivers:", error);
  });

// Highlight selected item
function selectItem(item) {
  if (selectedItem) {
    selectedItem.classList.remove("selected");
  }
  selectedItem = item;
  selectedItem.classList.add("selected");

  // Scroll the selected item into view
  selectedItem.scrollIntoView({
    behavior: "smooth",
    block: "nearest", // 'nearest' ensures the item is scrolled into the least disruptive position
  });
}

// Function to compare user guesses with real standings and calculate scores
async function compareStandings() {
  const realStandings = await getDriverStandings(2024, 1);

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
}

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp") {
    moveUp();
  } else if (event.key === "ArrowDown") {
    moveDown();
  }
});

// Function to move the selected item up in the list
function moveUp() {
  if (selectedItem) {
    // Get the index of the selected item
    const index = parseInt(selectedItem.dataset.index, 10);

    if (index > 0) {
      // Swap the current item with the one above it in the array
      [contextArray[index - 1], contextArray[index]] = [
        contextArray[index],
        contextArray[index - 1],
      ];

      renderList();

      selectItem(list.children[index - 1]);
    }
  }
}

// Function to move the selected item down in the list
function moveDown() {
  // Check if an item is selected
  if (selectedItem) {
    // Get the index of the selected item
    const index = parseInt(selectedItem.dataset.index, 10);

    if (index < contextArray.length - 1) {
      // Swap the current item with the one below it in the contextArray
      [contextArray[index], contextArray[index + 1]] = [
        contextArray[index + 1],
        contextArray[index],
      ];

      // Call the function
      renderList();

      // Select the new item
      selectItem(list.children[index + 1]);
    }
  }
}

// Add click event for the "Guess" button to compare standings
guessButton.addEventListener("click", () => {
  compareStandings();
});
