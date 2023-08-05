const fileInput = document.getElementById('imageUpload');
const customLabel = document.querySelector('.imageUploadLabel');
const imagePreview = document.querySelector('.imagePreview');
const selectBoxUploaded = document.querySelector('.selectBox.uploaded');

selectBoxUploaded.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const fileName = file.name;
    customLabel.textContent = fileName;

    const reader = new FileReader();

    reader.onload = (e) => {
      const img = document.createElement('img');
      img.src = e.target.result;
      img.style.maxWidth = '140px'; // Set the maximum width for the preview image
      imagePreview.innerHTML = ''; // Clear previous preview
      imagePreview.appendChild(img); // Add the new preview image
    };

    reader.readAsDataURL(file);
  } else {
    customLabel.textContent = '+ Afbeelding';
    imagePreview.innerHTML = ''; // Clear the preview when no image is selected
  }
});

const imageUpload = document.getElementById('imageUpload');
imageUpload.addEventListener('change', (event) => {
  const file = event.target.files[0];
  // Handle the selected file here
});
