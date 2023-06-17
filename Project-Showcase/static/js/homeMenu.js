const menuButton = document.getElementById('menuButton');
const menuOptions = document.getElementById('menuOptions');

menuButton.addEventListener('click', () => {
  menuOptions.style.display = menuOptions.style.display === 'none' ? 'block' : 'none';
});