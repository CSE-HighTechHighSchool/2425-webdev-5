var data = [246, 105, 22, 52, 154, 204, 340, 115, 170, 31, 237, 349, 176, 342, 134, 221, 128, 341, 371, 84, 171, 266, 163, 59]
var races = ['Bahrain', 'Saudi Arabia', 'Australia', 'Japan', 'China', 'Miami', 'Emilia Romagna', 'Monaco', 'Canada', 'Spain', 
    'Austria', 'Britain', 'Hungary', 'Belgium', 'Netherlands', 'Italy', 'Azerbaijan', 'Singapore', 'United States', 'Mexico City',
    'Sao Paulo', 'Las Vegas', 'Qatar', 'Abu Dhabi']
  
  async function createChart() {
    //const data = await getData(); // wait for getData to send formatted data to create chart
    const lineChart = document.getElementById("lineChart");

    Chart.defaults.font.family = "Ubuntu-light";
   
    const myChart = new Chart(lineChart, {
      type: "line",
      data: {
        labels: races, // x-axis labels
        datasets: [
          {
            label: 'Predicted',
            data: data, // y-axis data
            fill: false,
            backgroundColor: "rgba(150, 32, 32, 0.5)",
            borderColor: "rgb(255, 0, 0)",
            borderWidth: 4,
            pointBorderWidth: 1,
            pointRadius:4
          },
        ],
      },
      options: {
        responsive: true, // resize based on screen size
        maintainAspectRatio: true,
        scales: {
          // display options for x & y axes
          x: {
            title: {
              display: true,
              text: "Races", // x-axis title
              font: {
                size: 14

              },
              color: "#fff"
            },
            ticks: {
              callback: function(val, index) {
                return index % 1 === 0 ? this.getLabelForValue(val) : '';
              },
              autoSkip: false,
              font: {
                size: 14,
              },
              color: "#fff"
            },
            grid: {
              color: "rgba(256, 256, 256, 0.4)",
            },
          },
          y: {
            title: {
              display: true,
              text: "Number of points earned", // y-axis title
              font: {
                size: 14,
              },
              color: "#fff"
            },
            
            ticks: {
              callback: function(val, index) {
                return index % 1 === 0 ? this.getLabelForValue(val) : '';
              },
              
              font: {
                size: 12,
              },
              color: "white"
            },
            grid: {
              color: "rgba(256, 256, 256, 0.4)",
            },
          },
        },
        plugins: {
          // display options for title and legend
          title: {
            display: true, // display chart title
            text: "User points scored over the f1 2024 season",
            font: {
              size: 24,
            },
            color: "white",
            padding: {
              top: 10,
              bottom: 30,
            },
          },
          legend: {
            align: "start",
            position: "bottom",
          },
        },
      },
    });
  }

window.onload = function(){
    createChart();
}
