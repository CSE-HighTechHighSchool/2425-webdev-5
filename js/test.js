async function getDriversList(year, round) {
    // const csv = 'Japan,Max Verstappen,Sergio Perez,Carlos Sainz,Charles Leclerc,Lando Norris,Fernando Alonso,George Russell,Oscar Piastri,Lewis Hamilton,Yuki Tsunoda,Nico Hulkenburg,Lance Stroll,Kevin Magnussen,Valtteri Bottas,Esteban Ocon,Pierre Gasly,Logan Sargeant,Zhou Guanyu,Daniel Ricciardo,Alexander Albon';
  
    try {
      const response = await fetch(`data/round_${round}.csv`); // get the csv file
  
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

getDriversList(2024, 4);