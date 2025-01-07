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
  const userString = localStorage.getItem("user");
  const user = userString != null ? JSON.parse(userString) : null;
  if (user != null) {
    document.getElementById("signIn").style.display = "none";
    document.getElementById("register").style.display = "none";
    document.getElementById("user").style.display = "block";
    document.getElementById(
      "user"
    ).innerHTML = `<b><i class="bi bi-people">${user.firstname}</i></b>`;
  }

  document.getElementById("XMarkOut").addEventListener("click", () => {
    // When you click on the X in the alert, make it invisible by adding it to a class
    document.getElementById("startingAlert").classList.add("invisible");
  });
});
