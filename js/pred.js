let selectedItem = null;
const list = document.getElementById("contextList");

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      // Pick a random index
      const j = Math.floor(Math.random() * (i + 1));
      // Swap elements at i and j
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

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
        let drivers = entries.slice(1).map((driver, index) => ({
            number: index + 1,
            name: driver,
        }));

        console.log(drivers, location);
        console.log("Drivers", drivers);
        drivers = shuffleArray(drivers);        
        return drivers;
    } catch (error) {
        console.error(`Error fetching data: ${error.message}`);
        return [];
    }
}

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

// Function to render the list
function renderList(dataArrayPlayers) {
    contextArray = dataArrayPlayers;

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

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Get the 'race' query parameter from the URL
// const race = getQueryParam('race');


// if (race) {
//     console.log(`Race query parameter: ${race}`);
//     // You can add additional logic here to handle the 'race' parameter
// } else {
//     console.log('No race query parameter found');
// }

// getDriversList(2024, race).then((drivers) => {
//     renderList(drivers);
// });


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
        [contextArray[index - 1], contextArray[index]] = [
          contextArray[index],
          contextArray[index - 1],
        ];
        renderList(contextArray);
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
        [contextArray[index], contextArray[index + 1]] = [
          contextArray[index + 1],
          contextArray[index],
        ];
        renderList(contextArray);
        selectItem(list.children[index + 1]);
      }
    }
  }