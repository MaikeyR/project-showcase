document.addEventListener("DOMContentLoaded", function() {
  const menuOptions = document.getElementById('home-menuOptions');
  const menuButton = document.querySelector('.home-menuButton');

  menuButton.addEventListener("click", function(event) {
    if (event.target.matches(".home-menuButton, .home-menuButton span, .home-menuButton img")) {
      console.log("Menu button clicked");
      menuOptions.classList.toggle("show");
    }
  });

  menuOptions.addEventListener("click", function(event) {
    if (event.target.matches(".cross")) {
      console.log("Cross button clicked");
      menuOptions.classList.toggle("show");
    }
  });
  
});