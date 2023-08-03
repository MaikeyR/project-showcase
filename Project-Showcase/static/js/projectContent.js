// Function to create and add an input element
function addInputElement(placeholder, required) {
  const inputElement = document.createElement('input');
  inputElement.type = 'text';
  inputElement.className = 'inputBox';
  inputElement.placeholder = placeholder;
  inputElement.required = required;
  return inputElement;
}

// Function to create and add a textarea element
function addTextareaElement(placeholder, required) {
  const textareaElement = document.createElement('textarea');
  textareaElement.className = 'inputBox';
  textareaElement.placeholder = placeholder;
  textareaElement.required = required;
  return textareaElement;
}

// Function to create and add an uploaded element (image or audio)
function addUploadedElement(accept, text) {
  const uploadedElement = document.createElement('div');
  uploadedElement.className = 'selectBox uploaded';
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.id = 'fileUpload';
  fileInput.name = 'fileUpload';
  fileInput.accept = accept;
  const label = document.createElement('label');
  label.htmlFor = 'fileUpload';
  label.className = 'imageUploadLabel';
  label.textContent = text;
  uploadedElement.appendChild(fileInput);
  uploadedElement.appendChild(label);
  return uploadedElement;
}

// Function to create and add an input text element for video embed
function addVideoInputElement(placeholder) {
  const inputElement = document.createElement('input');
  inputElement.type = 'text';
  inputElement.className = 'inputBox';
  inputElement.placeholder = placeholder;
  return inputElement;
}

// Get the container element that holds the buttons
const buttonContainer = document.querySelector('.dynamicForm');

// Function to add a new element to the form
function addElement(type, content) {
  const formElementsContainer = document.getElementById('formElements');
  const addButtonContainer = formElementsContainer.querySelector('span');

  if (type === 'title') {
    formElementsContainer.insertBefore(addInputElement('Typ hier de titel van jouw alinea...', true), addButtonContainer);
  } else if (type === 'paragraph') {
    formElementsContainer.insertBefore(addTextareaElement('Typ hier de tekst van jouw alinea...', true), addButtonContainer);
  } else if (type === 'image') {
    formElementsContainer.insertBefore(addUploadedElement('image/*', '+ Afbeelding'), addButtonContainer);
  } else if (type === 'video') {
    formElementsContainer.insertBefore(addVideoInputElement('Typ hierEmbed video code here...'), addButtonContainer);
  } else if (type === 'audio') {
    formElementsContainer.insertBefore(addUploadedElement('audio/*', '+ Audio'), addButtonContainer);
  } else {
    const element = document.createElement(type);
    element.textContent = content;
    formElementsContainer.appendChild(element);
  }
}

// Event listener for all buttons inside the container
buttonContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('dynamicForm')) {
    const elementType = event.target.getAttribute('data-type');
    const content = ''; // You can get user input for content if needed
    addElement(elementType, content);
  }
});

// Optional: Implement reordering and delete functionality using libraries like jQuery UI's Sortable or HTML5's Drag and Drop API.
