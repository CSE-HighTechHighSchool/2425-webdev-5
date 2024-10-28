window.scrollTo(0, 0);
const wait = async () => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 800);
  });
};
let arr = [];
const jsCode = async () => {
  let historyOneBottom = 0;
  let historyTwoBottom = 0;
  let historyThreeBottom = 0;
  let historyFourBottom = 0;
  let historyFiveBottom = 0;
  let historySixBottom = 0;
  let i = 0;
  let navHistory = document.getElementsByClassName("navHistory");
  navHistory[0].style.borderBottom = "1px solid white";
  navHistory[0].style.fontSize = "18px";
  localStorage.setItem("ScrollPosition", 0);
  window.addEventListener("DOMContentLoaded", async () => {
    // document.getElementById("historyTitle").innerHTML = historyLabelArray[0];
    await wait();
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
    for (const key in historyThreeRect) {
      if (key === "bottom") {
        historyThreeBottom = historyThreeRect[key];
        console.log(historyThreeBottom);
        console.log("historyThreeBottom);");
      }
    }
    for (const key in historyFourRect) {
      if (key === "bottom") {
        historyFourBottom = historyFourRect[key];
        console.log(historyFourBottom);
        console.log("historyFourBottom);");
      }
    }
    for (const key in historyFiveRect) {
      if (key === "bottom") {
        historyFiveBottom = historyFiveRect[key];
        console.log(historyFiveBottom);
        console.log("historyFourBottom);");
      }
    }
    for (const key in historySixRect) {
      if (key === "bottom") {
        historySixBottom = historySixRect[key];
        console.log(historySixBottom);
        console.log("historyFourBottom);");
      }
    }
    arr = [
      historyOneBottom,
      historyTwoBottom,
      historyThreeBottom,
      historyFourBottom,
      historyFiveBottom,
      historySixBottom,
    ];
    for (let x = 0; x < arr.length; x++) {
      navHistory[x].addEventListener("click", () => {
        if (x === 0) {
          window.scrollTo(0, 0);
        } else {
          window.scrollTo(0, arr[x - 1]);
        }
      });
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
    if (window.scrollY + window.innerHeight / 2 > historyFiveBottom) {
      console.log(window.scrollY);
      i = 5;
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
    } else if (window.scrollY + window.innerHeight / 2 > historyFourBottom) {
      i = 4;
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
    } else if (window.scrollY + window.innerHeight / 2 > historyThreeBottom) {
      i = 3;
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
    } else if (window.scrollY + window.innerHeight / 2 > historyTwoBottom) {
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
};
jsCode();
