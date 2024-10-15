let historyOneBottom = 0;
let hasRan = false;
let i = 0;
const historyLabelArray = ["The First Race", "Into the Billions"];
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("historyTitle").innerHTML = historyLabelArray[0];
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
  if (window.scrollY + window.innerHeight / 2 > historyOneBottom && !hasRan) {
    console.log("success");
    hasRan = true;
    i++;
    document.getElementById("historyTitle").innerHTML = historyLabelArray[i];
  }
  console.log(document.getElementById("circleOutline"));
  //   } else {
  //     i = 0;
  //     document.getElementById("historyTitle").innerHTML = historyLabelArray[i];
  //   }
});
