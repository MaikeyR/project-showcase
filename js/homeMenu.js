document.addEventListener("DOMContentLoaded", function() {
  const menuOptions = document.getElementById('home-menuOptions');
  const menuButton = document.querySelector('.home-menuButton');

  console.log(menuButton);
  console.log(menuOptions);

  menuButton.addEventListener("click", function(event) {
    if (event.target === menuButton || menuButton.contains(event.target) && !event.target.matches("span, img")) {
      console.log("Menu button clicked");
      menuOptions.classList.toggle("show");
      if (menuOptions.classList.contains("show")) {
        menuButton.textContent = "Close";
      } else {
        menuButton.textContent = "Menu";
      }
    }
  });

  document.addEventListener("click", function (event) {
    const target = event.target;
    if (
      !target.classList.contains("home-menuButton") &&
      !target.classList.contains("home-menuOptions")
    ) {
      menuOptions.classList.remove("show");
      menuButton.textContent = "Menu";
    }
  });
});