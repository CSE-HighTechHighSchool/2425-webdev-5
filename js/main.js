/*
 File name: main.js
 Purpose: Contains code that runs on each page of the website.
 Authors: Akshat Tewari, Aditya Choudhary, and Ange Teng
 */

document.getElementById("navbarlogo").addEventListener("mouseenter", (e) => {
  // When you mouse enters the navbarlogo, turn the logo into a red version of the logo
  e.preventDefault();
  document.getElementById("plainlogo").src = "img/redlogo.png";
});
document.getElementById("navbarlogo").addEventListener("mouseleave", (e) => {
  // When you mouse leaves the navbarlogo, turn the logo into a plain version of the logo

  e.preventDefault();
  document.getElementById("plainlogo").src = "img/logo.png";
});

window.addEventListener("DOMContentLoaded", () => {
  const resizeBtn = document.querySelector("[data-resize-btn]");
  // Add the event listener for the navbar toggler
  resizeBtn.addEventListener("click", function (e) {
    e.preventDefault();
    document.body.classList.toggle("sb-expanded");
  });
  const userString =
    localStorage.getItem("user") != null
      ? localStorage.getItem("user")
      : sessionStorage.getItem("user");
  // Get the user data
  const user = userString != null ? JSON.parse(userString) : null;


  if (user != null) {
    // alert("user not null");
    // If there is a user, the navbar is updated accordingly with all the tabs changing what is displayed

    document.getElementById("register").style.setProperty("display", "none", "important"); // Set the display property as important
    console.log(document.getElementById("register"));
    document.getElementById("signIn").style.display = "none";
    document.getElementById("user").style.display = "block";
    document.getElementById("username").innerText = user.firstname;
    document.getElementById("signOut").style.display = "block";
    document.getElementById("signOut").onclick = function () {
      localStorage.removeItem("user");
      sessionStorage.removeItem("user");
      window.location.href = "/";
    };
  } else {
    // If there isn't a user, the navbar is updated accordingly
    document.getElementById("user").style.display = "none";
    document.getElementById("signOut").style.display = "none";
    document.getElementById("predict").style.display = "none";
  }
  document.getElementById("navbarlogo").addEventListener("mouseenter", (e) => {
    e.preventDefault();
    document.getElementById("plainlogo").src = "img/redlogo.png";
  });
  document.getElementById("navbarlogo").addEventListener("mouseleave", (e) => {
    e.preventDefault();
    document.getElementById("plainlogo").src = "img/logo.png";
  });
  document.getElementById("XMarkOut")?.addEventListener("click", () => {
    // When you click on the X in the alert, make it invisible by adding it to a class
    document.getElementById("startingAlert").classList.add("invisible");
  });
});
