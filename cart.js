
function openCloseMenu() {
    var menuBar = document.getElementById('menu-bar');
    var content = document.getElementById('content');

    if (menuBar.style.width === '250px') {
      menuBar.style.width = '0';
      content.style.marginLeft = '0';
    } else {
      menuBar.style.width = '250px';
      content.style.marginLeft = '250px';
    }
  }


//cart
let listProductHTML = document.querySelector('.listProduct');
let products = [];
let cart = [];

    const addDataToHTML = () => {
    // remove datas default from HTML

        // add new datas
        if(products.length > 0) // if has data
        {
            products.forEach(product => {
                let newProduct = document.createElement('div');
                newProduct.dataset.id = product.id;
                newProduct.classList.add('item');
                newProduct.innerHTML = 
                `<img src="${product.image}" alt="">
                <h2>${product.name}</h2>
                <div class="price">Rs-${product.price}/-</div>
                <button class="addCart" onclick="showForm(${product.id})">Order Now !</button>`;
                listProductHTML.appendChild(newProduct);
            });
        }
    }
const initApp = () => {
    // get data product
    fetch('product.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        addDataToHTML();

        // get data cart from memory
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
        }
    })
}
initApp();