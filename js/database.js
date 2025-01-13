// Function to fetch driver standings from the Ergast API
async function getDriverStandings(year, round) {
    const apiUrl = `http://ergast.com/api/f1/${year}/${round}/driverStandings.json`;
  
    try {
      const response = await fetch(apiUrl);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      const standings = data.MRData.StandingsTable.StandingsLists[0].DriverStandings.map((driver) => ({
        position: parseInt(driver.position, 10),
        name: `${driver.Driver.givenName} ${driver.Driver.familyName}`,
        points: driver.points,
      }));
  
      console.log(`Fetched Driver Standings for ${year} Round ${round}:`);
      standings.forEach((driver) => {
        console.log(`${driver.position}: ${driver.name} - ${driver.points} points`);
      });
  
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
  const list = document.getElementById('contextList');
  const guessButton = document.getElementById('guessButton');
  let selectedItem = null;
  
  // Function to render the list
  function renderList() {
    list.innerHTML = '';
  
    contextArray.forEach((driver, index) => {
      const li = document.createElement('li');
      li.dataset.index = index;
  
      const numberSpan = document.createElement('span');
      numberSpan.classList.add('number');
      numberSpan.textContent = `${index + 1}. `;
  
      const nameSpan = document.createElement('span');
      nameSpan.textContent = driver.name;
  
      li.appendChild(numberSpan);
      li.appendChild(nameSpan);
  
      li.addEventListener('click', () => {
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
      console.error('Error fetching drivers:', error);
    });
  
  // Highlight selected item
  function selectItem(item) {
    if (selectedItem) {
      selectedItem.classList.remove('selected');
    }
    selectedItem = item;
    selectedItem.classList.add('selected');
  }
  
  // Function to compare user guesses with real standings
  async function compareStandings() {
    const realStandings = await getDriverStandings(2024, 1);
  
    if (!realStandings || !contextArray) {
      console.error('Failed to fetch standings or driver list.');
      return;
    }
  
    console.log('Comparing User Guesses with Real Standings:');
    realStandings.forEach((realDriver, index) => {
      const guessedDriver = contextArray[index];
  
      if (guessedDriver && realDriver.name === guessedDriver.name) {
        console.log(`${realDriver.position}: ${realDriver.name} - Correct!`);
      } else {
        console.log(
          `${realDriver.position}: ${realDriver.name} - Incorrect! Your guess: ${
            guessedDriver ? guessedDriver.name : 'No guess'
          }`
        );
      }
    });
  }
  
  // Add click event for the "Guess" button to compare standings
  guessButton.addEventListener('click', () => {
    compareStandings();
  });
  