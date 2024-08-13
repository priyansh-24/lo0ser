// Function to show or hide the additional text textarea based on the user's selection
function showTextArea() {
  var needText = document.getElementById('needText').value;
  if (needText === 'yes') {
    document.getElementById('text').style.display = 'block';
  } else {
    document.getElementById('text').style.display = 'none';
  }
}

// Function to show the order form with the specific item code
function showForm(itemcode) {
  document.getElementById('orderForm').style.display = 'block';
  document.getElementById('overlay').style.display = 'block';
  document.getElementById('orderItem').value = itemcode;
}

// Function to close the order form
function closeForm() {
  document.getElementById('orderForm').style.display = 'none';
  document.getElementById('overlay').style.display = 'none';
}

// Function to send the order details to WhatsApp
function sendToWhatsApp(event) {
  event.preventDefault(); // Prevent form from submitting normally

  var phoneNumber = '7008544921';
  var name = document.getElementById('name').value;
  var userPhoneNumber = document.getElementById('userPhoneNumber').value;
  var itemcode = document.getElementById('orderItem').value;
  var hall = document.getElementById('hall').value;
  var room = document.getElementById('room').value;
  var email = document.getElementById('email').value;
  var rollNumber = document.getElementById('rollNumber').value;
  var needText = document.getElementById('needText').value;
  var text = document.getElementById('text').value;

  var message = `Order Itemcode: ${itemcode}\nName: ${name}\nPhone Number: ${userPhoneNumber}\nHall Name: ${hall}\nEmail: ${email}\nRoll Number: ${rollNumber}`;
  if (room) {
    message += `\nRoom Number: ${room}`;
  }
  if (needText === 'yes' && text.trim() !== '') {
    message += `\nAdditional Text: ${text}`;
  }
  var encodedMessage = encodeURIComponent(message);
  var whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  window.open(whatsappUrl, '_blank');
  closeForm();
}

// Function to switch between tabs
function switchTab(tab) {
  // Hide all sections
  var sections = document.querySelectorAll('.product-section');
  sections.forEach(function(section) {
    section.classList.remove('active');
  });

  // Remove active class from all tabs
  var tabs = document.querySelectorAll('.tab');
  tabs.forEach(function(tabElement) {
    tabElement.classList.remove('active');
  });

  // Show the selected section
  document.getElementById(tab).classList.add('active');
  document.querySelector(`[data-tab="${tab}"]`).classList.add('active');

  // Load the products for the selected tab
  loadProducts(tab);
}

// Function to load products from the JSON file
function loadProducts(category) {
  fetch(`data/${category}.json`)
    .then(response => response.json())
    .then(data => {
      var section = document.getElementById(category);
      section.innerHTML = ''; // Clear previous content
      data.forEach(product => {
        var item = document.createElement('div');
        item.className = 'item';
        item.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <h2>${product.name}</h2>
          <div class="price">Rs-${product.price}</div>
          <button onclick="showForm('${product.id}')">Order Now</button>
        `;
        section.appendChild(item);
      });
    });
}


// Initial load of the first tab
document.addEventListener('DOMContentLoaded', function() {
  switchTab('casual');
});
