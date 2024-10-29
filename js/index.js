let typingArray = ["Trailblazers", "Innovators", "Speed"];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const clear = (word, x) => {
  return word.slice(0, word.length - 1) + "|";
};
const turnOffAndOn = async () => {
  let off = true;
  for (var i = 0; i < 6; i++) {
    off = !off;
    if (!off) {
      document.getElementById("underscore").style.display = "none";
      // document.getElementById("underscore").style.color = "red";
      console.log("editing style");
    } else {
      document.getElementById("underscore").style.display = "inline";
    }
    await sleep(1500 / 6);
  }
};
const typingInHeader = async () => {
  for (var i = 0; i < 1000; i++) {
    for (let i in typingArray) {
      let isOn = true;
      for (let char in typingArray[i]) {
        document.getElementById("descriptor").innerHTML =
          typingArray[i].slice(0, Number(char) + 1) + "|";
        console.log(typingArray[i].slice(0, char + 1) + "|");
        await sleep(150);
      }
      // turnOffAndOn()

      await sleep(400);
      for (let char in typingArray[i]) {
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
document.getElementById("navbarlogo").addEventListener("mouseenter", (e) => {
  e.preventDefault();
  document.getElementById("plainlogo").src = "img/redlogo.png";
});
document.getElementById("navbarlogo").addEventListener("mouseleave", (e) => {
  e.preventDefault();
  document.getElementById("plainlogo").src = "img/logo.png";
});

typingInHeader();
