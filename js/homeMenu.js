document.addEventListener("DOMContentLoaded", function() {
  const menuOptions = document.getElementById('home-menuOptions');
  const menuButton = document.querySelector('.home-menuButton');
  const menuSpan = document.querySelector('.home-menuButton span');
  const menuImg = document.querySelector('.home-menuButton');

  console.log(menuButton);
  console.log(menuOptions);
  console.log(menuSpan);
  console.log(menuImg);

  menuButton.addEventListener("click", function(event) {
    if (event.target === menuButton) {
      console.log("Menu button clicked");
      menuOptions.classList.toggle("show");
    }
  });
  menuSpan.addEventListener("click", function(event) {
    if (event.target === menuSpan) {
      console.log("Menu button clicked");
      menuOptions.classList.toggle("show");
    }
  });
  menuImg.addEventListener("click", function(event) {
    if (event.target === menuImg) {
      console.log("Menu button clicked");
      menuOptions.classList.toggle("show");
    }
  });
});