// Update the file name display when a file is selected
const fileInput = document.getElementById('imageUpload');
const customLabel = document.querySelector('.imageUploadLabel');

fileInput.addEventListener('change', () => {
  const fileName = fileInput.files[0]?.name;
  customLabel.textContent = fileName ? `Selected File: ${fileName}` : 'Kies Bestand';
});

const imageUpload = document.getElementById('imageUpload');
imageUpload.addEventListener('change', (event) => {
  const file = event.target.files[0];
  // Handle the selected file here
});
