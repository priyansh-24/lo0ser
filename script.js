function openCloseMenu() {
  var menuBar = document.getElementById("menu-bar");
  var content = document.getElementById("content");

  if (menuBar.style.width === "250px") {
    menuBar.style.width = "0";
    content.style.marginLeft = "0";
  } else {
    menuBar.style.width = "250px";
    content.style.marginLeft = "250px";
  }
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};


document.addEventListener('DOMContentLoaded', () => {
  fetch('products.json')
      .then(response => response.json())
      .then(data => {
          const productSlider = document.getElementById('product-slider');
          data.forEach(product => {
              const productElement = document.createElement('div');
              productElement.classList.add('product');
              productElement.innerHTML = `
                  <img src="${product.image}" alt="${product.name}">
                  <h3>${product.name}</h3>
                  <p>${product.price}</p>
                  <button>Order Now !</button>
              `;
              productSlider.appendChild(productElement);
          });
      })
      .catch(error => console.error('Error fetching products:', error));
});
