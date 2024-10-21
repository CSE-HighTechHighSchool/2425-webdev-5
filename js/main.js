document.getElementById("navbarlogo").addEventListener("mouseenter", (e) => {
  e.preventDefault();
  document.getElementById("plainlogo").src = "img/redlogo.png";
});
document.getElementById("navbarlogo").addEventListener("mouseleave", (e) => {
  e.preventDefault();
  document.getElementById("plainlogo").src = "img/logo.png";
});

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("XMarkOut").addEventListener("click", () => {
    document.getElementById("startingAlert").style.opacity = 0;
  });
});
