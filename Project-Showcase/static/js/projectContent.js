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
const elementLabelText = '';

// Function to create a wrapper div with the added element
function createWrapperDiv(element, elementType, elementLabelText) {
  const outerWrapperDiv = document.createElement('div');
  outerWrapperDiv.className = `outerElementWrapper`;
    
  const labelElement = document.createElement('label');
  labelElement.textContent = elementLabelText;
  labelElement.className = 'labelStyles';
  
  const closeButton = document.createElement('img');
  closeButton.src = 'img/AddProject/cross.svg';
  closeButton.className = 'closeButton';
  closeButton.addEventListener('click', () => {
    outerWrapperDiv.remove();
  });

  const handle = document.createElement('span');
  handle.textContent = '☰';
  handle.className = 'move-handle';

  const labelAndCloseButtonSpan = document.createElement('span');
  labelAndCloseButtonSpan.className = 'labelAndCloseButtonSpan';
  labelAndCloseButtonSpan.appendChild(labelElement);
  labelAndCloseButtonSpan.appendChild(closeButton);
  
  const wrapperDiv = document.createElement('div');
  wrapperDiv.className = `elementWrapper ${elementType}`;
  wrapperDiv.appendChild(element);

  const handleWrapperDiv = document.createElement('div');
  handleWrapperDiv.className = 'handle-wrapper';
  handleWrapperDiv.appendChild(handle);
  handleWrapperDiv.appendChild(wrapperDiv);

  outerWrapperDiv.appendChild(labelAndCloseButtonSpan);
  outerWrapperDiv.appendChild(handleWrapperDiv);
  return outerWrapperDiv;
}
  
// Function to add a new element to the form
function addElement(type) {
  const formElementsContainer = document.querySelector('.formElements');

  if (type === 'title') {
    formElementsContainer.appendChild(createWrapperDiv(addInputElement('Typ hier de titel van jouw alinea...', true), type, 'Titel'));
  } else if (type === 'paragraph') {
    formElementsContainer.appendChild(createWrapperDiv(addTextareaElement('Typ hier de tekst van jouw alinea...', true), type, 'Alinea'));
  } else if (type === 'image') {
    formElementsContainer.appendChild(createWrapperDiv(addUploadedElement('image/*', '+ Afbeelding'), type, 'Afbeelding'));
  } else if (type === 'video') {
    formElementsContainer.appendChild(createWrapperDiv(addVideoInputElement('Typ hier de youtube video code ...'), type, 'Video'));
  } else if (type === 'audio') {
    formElementsContainer.appendChild(createWrapperDiv(addUploadedElement('audio/*', '+ Audio'), type, 'Audio'));
  }
  makeElementsDraggable();

  const elements = document.querySelectorAll('.outerElementWrapper');
  elements[elements.length - 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
}
  
// Event listener for all buttons inside the container
buttonContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('dynamicForm')) {
    const elementType = event.target.getAttribute('data-type');
    addElement(elementType);
  }
});
  
// Function to make the added elements draggable
function makeElementsDraggable() {
  const elements = document.querySelectorAll('.outerElementWrapper');

  elements.forEach((element) => {
    element.setAttribute('draggable', 'true');

    element.addEventListener('dragstart', (e) => {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', null);
      e.target.classList.add('dragging');
    });

    element.addEventListener('dragend', (e) => {
      e.target.classList.remove('dragging');
    });
  });

  // Add the event listener to the formElementsContainer for handling the drop event
  const formElementsContainer = document.querySelector('.formElements');
  formElementsContainer.addEventListener('dragover', (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(formElementsContainer, e.clientY);
    const draggingElement = document.querySelector('.dragging');
    if (afterElement == null) {
      formElementsContainer.appendChild(draggingElement);
    } else {
      formElementsContainer.insertBefore(draggingElement, afterElement);
    }
  });
}

// Function to find the element after which the dragged element should be placed
function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.outerElementWrapper:not(.dragging)')];
  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}


// Function to compile the content of dynamic elements into a single string
function compileProjectContent() {
  const formElementsContainer = document.querySelector('.formElements');
  const elements = formElementsContainer.querySelectorAll('.outerElementWrapper');

  let projectContent = '';

  elements.forEach((element) => {
    const elementType = element.classList[1]; // Get the type of dynamic element (e.g., title, paragraph, image, video, audio)
    const inputElement = element.querySelector('.inputBox'); // Get the input element inside the dynamic element
    let content;

    // Get the content of the dynamic element based on its type
    if (elementType === 'title' || elementType === 'paragraph' || elementType === 'video') {
      content = inputElement.value; // For title, paragraph, and video, get the value of the input element
    } else if (elementType === 'image' || elementType === 'audio') {
      const fileInput = inputElement.querySelector('input[type="file"]');
      if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        content = file.name; // For image and audio, get the name of the uploaded file
      }
    }

    // Append the content to the projectContent string
    if (content) {
      projectContent += `{{${elementType}}}${content}{{/${elementType}}}\n`; // Use placeholders to mark the start and end of each dynamic element's content
    }
  });

  return projectContent;
}
