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
    document.getElementById("signOut").style.display = "block";
    document.getElementById(
      "user"
    ).innerHTML = `<b><i class="bi bi-people"></i>  ${user.firstname}</b>`;
    document.getElementById(
      "signOut"
    ).innerHTML = `<b><i class="bi bi-box-arrow-left"></i>  Sign Out</b>`;
    document.getElementById("signOut").onclick = function () {
      localStorage.removeItem("user");
      window.location.href = "/";
    };
  } else {
  }

  document.getElementById("XMarkOut").addEventListener("click", () => {
    // When you click on the X in the alert, make it invisible by adding it to a class
    document.getElementById("startingAlert").classList.add("invisible");
  });
});
