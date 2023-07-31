const formElementsContainer = document.getElementById('formElements');
const addElementButtons = document.querySelectorAll('.addElementBtn');
const submitBtn = document.getElementById('submitBtn');

let elements = []; // Array to store form elements

// Function to create and add a new element to the form
function addElement(type, content) {
  const element = document.createElement(type);
  element.textContent = content;
  formElementsContainer.appendChild(element);
  elements.push({ type, content });
}

// Event listener for "Add Element" buttons
addElementButtons.forEach(button => {
  button.addEventListener('click', () => {
    const elementType = button.getAttribute('data-type');
    const content = ''; // You can get user input for content if needed
    addElement(elementType, content);
  });
});

// Event listener for "Submit Form" button
submitBtn.addEventListener('click', () => {
  console.log(JSON.stringify(elements)); // You can send this data to the server or use it as needed
});

// Optional: Implement reordering and delete functionality using libraries like jQuery UI's Sortable or HTML5's Drag and Drop API.
