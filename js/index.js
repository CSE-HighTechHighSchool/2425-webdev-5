/*
 File name: main.js
 Purpose: Contains code that runs on the landing page (specifically the typing in header).
 Authors: Akshat Tewari, Aditya Choudhary, and Ange Teng
 */
let typingArray = ["Trailblazers", "Innovators", "Speed"];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const clear = (word, x) => {
  return word.slice(0, word.length - 1) + "|";
};
const typingInHeader = async () => {
  for (var i = 0; i < 1000; i++) {
    for (let i in typingArray) {
      for (let char in typingArray[i]) {
        // Add another char
        document.getElementById("descriptor").innerHTML =
          typingArray[i].slice(0, Number(char) + 1) + "|";
        // console.log(typingArray[i].slice(0, char + 1) + "|");
        await sleep(150);
      }
      // turnOffAndOn()
      // Delay the code for .4 seconds
      await sleep(400);
      for (let char in typingArray[i]) {
        // Return the string with one less char than before
        document.getElementById("descriptor").innerHTML = clear(
          document.getElementById("descriptor").innerHTML.slice(0, -1),
          i
        );
        await sleep(30);
      }
      // turnOffAndOn()
      await sleep(400);
    }
  }
};

window.addEventListener("DOMContentLoaded", () => {
  //Swap the logos on hover

  typingInHeader();
});
