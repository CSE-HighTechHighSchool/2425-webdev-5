// Function to fetch driver standings from the Ergast API
async function getDriverStandings(year, round) {
    const apiUrl = `http://ergast.com/api/f1/${year}/${round}/driverStandings.json`;
  
    try {
      // Fetch data from the API
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Parse the JSON response
      const data = await response.json();
  
      // Extract relevant information
      const standings = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
  
      // Log the standings
      console.log(`Driver Standings for ${year} Round ${round}:`);
      standings.forEach((driver) => {
        console.log(
          `${driver.position}: ${driver.Driver.givenName} ${driver.Driver.familyName} - ${driver.points} points`
        );
      });
  
      return standings;
    } catch (error) {
      console.error(`Error fetching data: ${error.message}`);
      return null;
    }
  }
  
  // Example usage
  const year = 2024;
  const round = 6;
  
  getDriverStandings(year, round);
  