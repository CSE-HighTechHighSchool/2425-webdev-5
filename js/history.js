const historyPages = document.getElementsByClassName("historyPages");
/*
Titles, imageSources, and texts of all the cards of the pages
This was done with historyPages was reordering the cards when I set the currentTitle 
to the appropriate index of historyPages, the array kept reordering the cards
*/
const cardTitle = [
  "First Race",
  "The Golden Age",
  "Into the Billions",
  "McLaren",
  "Tragedy Strikes",
  "A Champion",
];
const imageSources = [
  "url('img/higherGradientBackground.png')",
  "url('img/goldenAgePic.png')",
  "url('img/bernieFounder.png')",
  "url('img/tragedy.png')",
  "url('img/mcLaren.png')",
  "url('img/LewisHamilton.png')",
];
const cardText = [
  `This was known as the "Grand Prix of Europe" and it was held on May
          13, 1953. The winner of this race was Giuseppe Farina, who was 43 at
          the time. 120, 000 viewers from around the world tuned in to witness
          history. Racing wasn't a huge industry at the time, but would soon
          change...`,
  `The 1960's and 1970's were considered the "Golden Age" of Formula
          Racing. Charismatic racers like James Hunt and Niki Lauda had a
          blazing rivalry that drawed in many fans of the sport. This time
          periodic is also known for its eccentric car designs. Finally, there
          were vast improvements on the engine at this time.`,
  `Born in Britain in 1930, Bernie Ecclestone was a huge figure in
          Formula One as he made the sport televised in the 80's. He negotiated
          sponsorships with companies which led to the accelerated development
          of the sport. Without him, who knows what F1 would look like today?`,
  `McLaren's dominance was very apparent at this time as they won 15 out
          of 16 championships, which Ayrton Senna claiming their first
          championship victory. From 1988-1991, McLaren was a huge name in
          Formula One as the company claimed victory in the Driver's
          Championship.`,
  `The tragic deaths of Ayrton Senna and Roland Ratzenberger at Imola,
          changing F1's approach to safety. With the advent of carbon fiber
          helmets and fire-resistant suits, deaths in this sport have decreased
          dramatically every since the early 90's.`,
  `This English-born racing sensation 
  was born in 1985 and debuted in F1 in 2007 in the Australian Grand Prix.
  He has a record for most career victories in Formula One Racing. 
  When he was in his teens, he raced Karts competitively, 
  and he won the world karting championship in 2000.`,
];
for (var i = 0; i < historyPages.length; i++) {
  console.log(i);
  if (i != 0) {
    historyPages[i].style.display = "none"; // Make all the other pages invisible
  }
}
const getPos = (title) => {
  // When one of the arrows is clicked,
  // get the position in the array
  // that the current card title corersponds to
  for (let i = 0; i < cardTitle.length; i++) {
    console.log(cardTitle[i]);
    console.log(title);
    if (cardTitle[i] === title) {
      // Return the index of the array
      // where the title of the current card is corresponding to the
      // index of the cardTitle array
      return i;
    }
  }
};
document.getElementById("upArrow").style.display = "none";

document.getElementById("downArrow").addEventListener("click", async (e) => {
  document.getElementById("currentPage").classList.remove("otherPage"); // Remove it from the
  // animation class from styles.css
  e.preventDefault();
  let idx = getPos(document.getElementById("currentTitle").innerText);
  idx++;
  // Increase the index of the cardTitle array to get the next card

  document.getElementById("currentPage").classList.add("otherPage");
  // Transition the array
  setTimeout(() => {
    // Set the Up Arrow icon to be visible
    document.getElementById("upArrow").style.display = "block";
    // Set the current page's title, text, and background to the next index of
    // Each represective array
    document.getElementById("currentText").innerHTML = `${cardText[idx]}`;
    document.getElementById("currentTitle").innerHTML = `${cardTitle[idx]}`;
    if (idx === cardTitle.length - 1) {
      // Make this disappear if you are on the last page
      document.getElementById("downArrow").style.display = "none";
    }
    document.getElementById(
      "currentPage"
    ).style.backgroundImage = `${imageSources[idx]}`;
  }, 1500);
});
document.getElementById("upArrow").addEventListener("click", (e) => {
  document.getElementById("currentPage").classList.remove("otherPage");
  e.preventDefault();
  let idx = getPos(document.getElementById("currentTitle").innerText);
  idx--;
  console.log(`${document.getElementById("currentText").innerHTMl}`);
  console.log(`idx: ${idx}`);
  document.getElementById("currentPage").classList.add("otherPage");

  setTimeout(() => {
    if (idx === 0) {
      document.getElementById("upArrow").style.display = "none";
    }
    document.getElementById("downArrow").style.display = "block";
    document.getElementById("currentText").innerHTML = `${cardText[idx]}`;
    document.getElementById("currentTitle").innerHTML = `${cardTitle[idx]}`;
    if (idx === cardTitle.length - 1) {
      document.getElementById("downArrow").style.display = "none";
    }
    document.getElementById(
      "currentPage"
    ).style.backgroundImage = `${imageSources[idx]}`;
  }, 1500);
});
