/*
 File name: history.js
 Purpose: makes the scroll navigation work on the history page work
 Authors: Akshat Tewari, Aditya Choudhary, and Ange Teng
 */

// Scroll to the beginning of the page when the page loads
window.scrollTo(0, 0);

/*
The words "page" and "slide" are used to talk about the same thing
Declare an array that will be used to stop the bottom positions of 
each navigator "slide"
*/
let arr = [];
// This gets all the bottoms of all of the pages/slides in history.html
let historyOneBottom = 0;
let historyTwoBottom = 0;
let historyThreeBottom = 0;
let historyFourBottom = 0;
let historyFiveBottom = 0;
let historySixBottom = 0;

// This is an iterator that will
let i = 0;

// This is the navigator elements on the right side of the sccreen
let navHistory = document.getElementsByClassName("navHistory");

//This sets the stle of the first navigator element text
navHistory[0].style.borderBottom = "1px solid white";
navHistory[0].style.fontSize = "18px";

//Wait unit the page is loaded to begin this code
window.addEventListener("DOMContentLoaded", async () => {
  // Get all of the bounding rects of all of the "slides"/events in the history page
  const historyOneRect = document
    .getElementById("historyOne")
    .getBoundingClientRect();
  const historyTwoRect = document
    .getElementById("historyTwoPage")
    .getBoundingClientRect();
  const historyThreeRect = document
    .getElementById("historyThreePage")
    .getBoundingClientRect();
  const historyFourRect = document
    .getElementById("historyFourPage")
    .getBoundingClientRect();
  const historyFiveRect = document
    .getElementById("historyFivePage")
    .getBoundingClientRect();
  const historySixRect = document
    .getElementById("historySixPage")
    .getBoundingClientRect();

  // Get the bottom margin/position of each of the slides/events page elements
  for (const key in historyOneRect) {
    // Get each element in each rectangle
    if (key === "bottom") {
      // If it is the bottom key, then run thid code
      // Store the bottom position of the event/"slide" to a variable
      historyOneBottom = historyOneRect[key];
    }
  }
  // Repeat the same process with all of the other slides
  for (const key in historyTwoRect) {
    if (key === "bottom") {
      historyTwoBottom = historyTwoRect[key];
    }
  }
  for (const key in historyThreeRect) {
    if (key === "bottom") {
      historyThreeBottom = historyThreeRect[key];
    }
  }
  for (const key in historyFourRect) {
    if (key === "bottom") {
      historyFourBottom = historyFourRect[key];
    }
  }
  for (const key in historyFiveRect) {
    if (key === "bottom") {
      historyFiveBottom = historyFiveRect[key];
    }
  }
  for (const key in historySixRect) {
    if (key === "bottom") {
      historySixBottom = historySixRect[key];
    }
  }

  // Declare an array of values with all of the bottom margin values for each slide
  arr = [
    historyOneBottom,
    historyTwoBottom,
    historyThreeBottom,
    historyFourBottom,
    historyFiveBottom,
    historySixBottom,
  ];
  /*
    Overall Logic: 
    - There is an arr of bottom values for each of the slides, this is called arr
    - There is another array of each of the elements in the navigator
    - These arrays correspond to each other
    */
  // Add an event listener to each of the elemnts within the navigator on the right
  for (let x = 0; x < arr.length; x++) {
    navHistory[x].addEventListener("click", () => {
      // Add an event listener to each of the elements
      if (x === 0) {
        window.scrollTo(0, 0);
        /*
          Scroll to the stop if the first element 
          within the navigator is clicked
          */
      } else {
        /*
          If another element is clicked, scroll to the corresponding page in the arr
           */
        window.scrollTo(0, arr[x - 1]);
      }
    });
  }
});

// Add a scroll event listener that tells the user when they have reached a certain page
window.addEventListener("scroll", () => {
  /*
    If the vertical midpoint of the position is greater than the bottom position of a page, 
    Run that corresponding if statment
    */

  if (window.scrollY + window.innerHeight / 2 > historyFiveBottom) {
    // In this if statement, set i to the approriate value
    i = 5;
    /*
        Go through each element in the navigator, and if they aren't equal to i, 
        then set their text size to be normal
      */
    for (var z = 0; z < navHistory.length; z++) {
      if (z === i) {
        // Make the appropriate element increase in size and get a border
        navHistory[i].style.borderBottom = "1px solid white";
        navHistory[i].style.fontSize = "18px";
        continue; // Continue on to the next iteration of the loop
      }
      // Make the element have a normal border and fotn size
      navHistory[z].style.borderBottom = "0px";
      navHistory[z].style.fontSize = "14px";
    }
    /*
        All of the other conditional statements run in similar ways, with the only difference 
        being the value of i
      */
  } else if (window.scrollY + window.innerHeight / 2 > historyFourBottom) {
    i = 4;
    for (var z = 0; z < navHistory.length; z++) {
      if (z === i) {
        navHistory[i].style.borderBottom = "1px solid white";
        navHistory[i].style.fontSize = "18px";
        continue;
      }
      navHistory[z].style.borderBottom = "0px";
      navHistory[z].style.fontSize = "14px";
    }
  } else if (window.scrollY + window.innerHeight / 2 > historyThreeBottom) {
    i = 3;
    for (var z = 0; z < navHistory.length; z++) {
      if (z === i) {
        navHistory[i].style.borderBottom = "1px solid white";
        navHistory[i].style.fontSize = "18px";
        continue;
      }
      navHistory[z].style.borderBottom = "0px";
      navHistory[z].style.fontSize = "14px";
    }
  } else if (window.scrollY + window.innerHeight / 2 > historyTwoBottom) {
    i = 2;
    for (var z = 0; z < navHistory.length; z++) {
      if (z === i) {
        navHistory[i].style.borderBottom = "1px solid white";
        navHistory[i].style.fontSize = "18px";
        continue;
      }
      navHistory[z].style.borderBottom = "0px";
      navHistory[z].style.fontSize = "14px";
    }
  } else if (window.scrollY + window.innerHeight / 2 > historyOneBottom) {
    i = 1;
    for (var z = 0; z < navHistory.length; z++) {
      if (z === i) {
        navHistory[i].style.borderBottom = "1px solid white";
        navHistory[i].style.fontSize = "18px";
        continue;
      }
      navHistory[z].style.borderBottom = "0px";
      navHistory[z].style.fontSize = "14px";
    }
  } else {
    i = 0;
    for (var z = 0; z < navHistory.length; z++) {
      if (z === i) {
        navHistory[i].style.borderBottom = "1px solid white";
        navHistory[i].style.fontSize = "18px";
        continue;
      }
      navHistory[z].style.borderBottom = "0px";
      navHistory[z].style.fontSize = "14px";
    }
  }
});
