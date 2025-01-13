/*
 File name: database.js
 Purpose: Renders the chart based on given data.
 Authors: Akshat Tewari, Aditya Choudhary, and Ange Teng
 */

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
const db = getDatabase(app);
const dbref = ref(db);

var data = [
  246, 105, 22, 52, 154, 204, 340, 115, 170, 31, 237, 349, 176, 342, 134, 221,
  128, 341, 371, 84, 171, 266, 163, 59,
];
let currentUser =
  localStorage.getItem("user") != null
    ? localStorage.getItem("user")
    : sessionStorage.getItem("user");

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
// Fetch the chart data for races and scores from Firebase
async function getChartData(userId, year) {
  let chartData = [];
  const chartRaces = [
    "Bahrain",
    "Saudi Arabia",
    "Australia",
    "Japan",
    "China",
    "Miami",
    "Emilia Romagna",
    "Monaco",
    "Canada",
    "Spain",
    "Austria",
    "Britain",
    "Hungary",
    "Belgium",
    "Netherlands",
    "Italy",
    "Azerbaijan",
    "Singapore",
    "United States",
    "Mexico City",
    "Sao Paulo",
    "Las Vegas",
    "Qatar",
    "Abu Dhabi",
  ];
  console.log("Chart data:", chartData);

  // Fetch score data for each race
  for (let i = 0; i < chartRaces.length; i++) {
    try {
      // Fetch the score data for the race
      console.log("user", userId);
      const scoreData = await getDataScore(userId, year, i + 1);
      console.log("Score data:", scoreData);
      if (scoreData !== null) {
        chartData.push(scoreData); // Add the score data for the race
      } else {
        chartData.push(0); // If no data, add 0
      }
      console.log(chartData);
    } catch (err) {
      console.error(
        `Error fetching score data for race ${chartRaces[i]}:`,
        err.message
      );
      chartData.push(0); // If an error occurs, add 0
    }
  }
  console.log("Chart data:", chartData);
  if (chartData != null || chartData.length === 0) {
    console.log("Chart data:", chartData);
    return { chartData, chartRaces };
  }
}
// Modify createChart to fetch and use data from Firebase
async function createChart() {
  const lineChart = document.getElementById("lineChart").getContext("2d");

  let uid = getUserName();
  if (currentUser) {
    console.log("User found");
  } else {
    console.log("No user found");
  }
  // Fetch data from Firebase
  const { chartData, chartRaces } = await getChartData(uid, 2024);
  console.log("my chart data", chartData);
  console.log(Array.isArray(chartData));
  console.log(chartRaces);
  Chart.defaults.font.family = "Ubuntu-light";

  const myChart = new Chart(lineChart, {
    type: "line",
    data: {
      labels: chartRaces, // Use fetched race names as labels (x-axis)
      datasets: [
        {
          label: "Predicted",
          data: chartData, // Use fetched data for the y-axis
          fill: false,
          backgroundColor: "white",
          borderColor: "#f43f5e",
          borderWidth: 4,
          pointBorderWidth: 1,
          pointRadius: 4,
        },
      ],
    },
    options: {
      scales: {
        // display options for x & y axes
        x: {
          title: {
            display: true,
            text: "Races", // x-axis title
            font: {
              size: 14,
            },
            color: "black",
          },
          ticks: {
            callback: function (val, index) {
              return index % 1 === 0 ? this.getLabelForValue(val) : "";
            },
            autoSkip: false,
            font: {
              size: 14,
            },
            color: "#000",
          },
          grid: {
            color: "rgba(0, 0, 0, 0.4)",
          },
        },
        y: {
          title: {
            display: true,
            text: "Number of points earned", // y-axis title
            font: {
              size: 14,
            },
            color: "#000",
          },
          ticks: {
            callback: function (val, index) {
              return index % 1 === 0 ? this.getLabelForValue(val) : "";
            },
            font: {
              size: 12,
            },
            color: "black",
          },
          grid: {
            color: "rgba(0, 0, 0, 0.4)",
          },
        },
      },
      plugins: {
        // display options for title and legend
        title: {
          display: true, // display chart title
          text: "User points scored over the F1 2024 season",
          font: {
            size: 24,
          },
          color: "black ",
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

// Initialize the chart once data is ready
window.onload = function () {
  createChart();
};
