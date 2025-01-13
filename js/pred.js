window.addEventListener("DOMContentLoaded", () => {
  const selectCountry = document.getElementById("selectcountry");
  const showCountryImage = document.getElementById("showCountry");

  // Add an event listener to the select element
  selectCountry.addEventListener("change", () => {
    const selectedCountry = selectCountry.value; // Get the selected value
    showCountryImage.src = `/img/countries/${selectedCountry}.png`; // Update the image source
  });
});
