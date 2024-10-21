let historyOneBottom = 0;
let historyTwoBottom = 0;
let i = 0;
let navHistory = document.getElementsByClassName("navHistory");
navHistory[0].style.borderBottom = "1px solid white";
navHistory[0].style.fontSize = "18px";

localStorage.setItem("ScrollPosition", 0);
const historyLabelArray = ["The First Race", "Into the Billions"];
window.addEventListener("DOMContentLoaded", () => {
  // document.getElementById("historyTitle").innerHTML = historyLabelArray[0];
  const historyOneRect = document
    .getElementById("historyOne")
    .getBoundingClientRect();
  const historyTwoRect = document
    .getElementById("historyTwoPage")
    .getBoundingClientRect();
  for (const key in historyOneRect) {
    if (key === "bottom") {
      historyOneBottom = historyOneRect[key];
      console.log(historyOneBottom);
      console.log("historyOneBottom");
    }
  }
  for (const key in historyTwoRect) {
    if (key === "bottom") {
      historyTwoBottom = historyTwoRect[key];
      console.log(historyTwoBottom);
      console.log("historyTwoBottom");
    }
  }
});
let lastScrollPosition = 0;

// Add a scroll event listener
window.addEventListener("scroll", () => {
  let currentScrollPosition = window.scrollY;

  // Compare current scroll position with the previous position
  if (currentScrollPosition > lastScrollPosition) {
    console.log("You are scrolling down!");
  } else if (currentScrollPosition < lastScrollPosition) {
    console.log("You are scrolling up!");
  }

  // Update the last scroll position with the current one
  lastScrollPosition = currentScrollPosition;
  console.log(window.scrollY);
  if (window.scrollY + window.innerHeight / 2 > historyTwoBottom) {
    i = 2;
    for (var z = 0; z < navHistory.length; z++) {
      if (z === i) {
        navHistory[i].style.borderBottom = "1px solid white";
        navHistory[i].style.fontSize = "18px";
        continue;
      }
      console.log(navHistory[z].innerHTML);
      navHistory[z].style.borderBottom = "0px";
      navHistory[z].style.fontSize = "14px";
    }
  } else if (window.scrollY + window.innerHeight / 2 > historyOneBottom) {
    console.log("success");
    i = 1;
    for (var z = 0; z < navHistory.length; z++) {
      if (z === i) {
        navHistory[i].style.borderBottom = "1px solid white";
        navHistory[i].style.fontSize = "18px";
        continue;
      }
      console.log(navHistory[z].innerHTML);
      navHistory[z].style.borderBottom = "0px";
      navHistory[z].style.fontSize = "14px";
    }
    // document.getElementById("historyTitle").innerHTML = historyLabelArray[i];
  } else {
    i = 0;
    for (var z = 0; z < navHistory.length; z++) {
      if (z === i) {
        navHistory[i].style.borderBottom = "1px solid white";
        navHistory[i].style.fontSize = "18px";
        continue;
      }
      console.log(navHistory[z].innerHTML);
      navHistory[z].style.borderBottom = "0px";
      navHistory[z].style.fontSize = "14px";
    }

    // document.getElementById("historyTitle").innerHTML = historyLabelArray[i];
  }
  //   console.log(document.getElementById("circleOutline"));
  //   } else {
  //     i = 0;
  //     document.getElementById("historyTitle").innerHTML = historyLabelArray[i];
  //   }
});
