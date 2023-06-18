document.addEventListener("DOMContentLoaded", function() {
  const menuOptions = document.getElementById('home-menuOptions');
  const menuButton = document.querySelector('.home-menuButton');

  console.log(menuButton);
  console.log(menuOptions);

  menuButton.addEventListener("click", function(event) {
    if (event.target === menuButton || menuButton.contains(event.target) && !event.target.matches("span, img")) {
      console.log("Menu button clicked");
      menuOptions.classList.toggle("show");
    }
  });
});