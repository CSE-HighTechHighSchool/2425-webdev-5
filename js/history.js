let historyOneBottom = 0;
let i = 0;
let navHistory = document.getElementsByClassName("navHistory");
navHistory[0].style.borderBottom = "1px solid white";
navHistory[0].style.fontSize = "18px";

const historyLabelArray = ["The First Race", "Into the Billions"];
window.addEventListener("DOMContentLoaded", () => {
  // document.getElementById("historyTitle").innerHTML = historyLabelArray[0];
  const historyOneRect = document
    .getElementById("historyOne")
    .getBoundingClientRect();
  for (const key in historyOneRect) {
    if (key === "bottom") {
      historyOneBottom = historyOneRect[key];
      console.log(historyOneBottom);
      console.log("historyOneBottom");
    }
  }
});
window.addEventListener("scroll", () => {
  if (window.scrollY + window.innerHeight / 2 > historyOneBottom) {
    console.log("success");
    i = 1;
    navHistory[0].style.borderBottom = "0px";
    navHistory[0].style.fontSize = "14px";

    navHistory[i].style.fontSize = "18px";

    navHistory[i].style.borderBottom = "1px solid white";
    // alert("success");
    // document.getElementById("historyTitle").innerHTML = historyLabelArray[i];
  } else {
    i = 0;
    navHistory[1].style.borderBottom = "0px";
    navHistory[1].style.fontSize = "14px";

    navHistory[i].style.borderBottom = "1px solid white";
    navHistory[i].style.fontSize = "18px";

    // document.getElementById("historyTitle").innerHTML = historyLabelArray[i];
  }
  //   console.log(document.getElementById("circleOutline"));
  //   } else {
  //     i = 0;
  //     document.getElementById("historyTitle").innerHTML = historyLabelArray[i];
  //   }
});
