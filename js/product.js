import products from "./data/data.js";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const idNumber = Number(id) - 1;
const product = products[idNumber];

console.log(product);

//selectors for page containers
const headingContainer = document.querySelector("h1");
const priceContainer  = document.querySelector(".price-container");
const colourSelector = document.querySelector("#colour");
const imageProduct = document.querySelector(".images-container");
const imageProductThumbnails = document.querySelector(".product-thumbnails");
const sizeSelector = document.querySelector(".size-selection");
const productDetailsContainer = document.querySelector(".product-details-container");
const productSpecificationContainer = document.querySelector(".product-specification-container");
const relatedProductsContainer = document.querySelector(".product-list-grid");

//price variable assignment for sale or not
let price = "";
if (!product.on_sale){
  price = "£" + product.price[0];
} else {
  //get ride of decimal madness
  let savings = Math.round((product.price[0] - product.sale_price[0])* 100 + Number.EPSILON ) / 100;
  price = `<span class="sale-price">£${product.sale_price[0]}</span>
           <span class="previous-price"> £${product.price[0]}</span>
           <span class="save-price"> Save £${savings}</span>`
}

//variable options creation
let colourSelections = ""
for (let i = 0; i < product.colours.length; i++){
  let colour = product.colours[i].charAt(0).toUpperCase() + product.colours[i].slice(1);
  colourSelections += `<option value="${product.colours[i]}">${colour}</option>`;
}

//variables for image and thumbs
let thumbnails = "";
let productImage = "";
let checked = "";
for (let i = 0; i < product.images.length; i++){
  let imageSRC = product.images[i].src
  let imageAlt = product.images[i].alt
  if(i === 0){
    checked = ` checked="checked"`;
  } else{
    checked = "";
  }
  let imageIDLowerCase = product.images[i].alt.replace(/ /g,"-").toLowerCase();
  productImage += `<div>
                    <input type="radio" name="image-selector" id=${imageIDLowerCase} value=${imageIDLowerCase}${checked} />
                    <img src=${imageSRC} alt=${imageAlt} />
                  </div>`;

  thumbnails += `<label for=${imageIDLowerCase} class="checked">
                    <img src=${imageSRC} alt=${imageAlt} />
                 </label>`;       
}

//variable for size selector
let sizeSelection = "<p>Choose Your Size:</p>"
for (let i = 0; i < product.sizes.length; i++){
  let size = product.sizes[i];
  let sizeCapital = size.toLocaleUpperCase();
  sizeSelection += `<input type="radio" name="size" id=${size} value=${size} class="input-checked" />
                    <label for=${size} class="label-checked">${sizeCapital}</label>`;
}

//Product details list
let productDetails = "";
for (let i = 0; i < product.product_details.length; i++){
  let details = product.product_details[i];
  
  productDetails += `<li>${details}</li>`;
}

//Product specification list
let productSpecification = "";
for (let i = 0; i < product.product_details.length; i++){
  let specs = product.Product_Specification[i];
  
  productSpecification += `<li>${specs}</li>`;
}

async function createHTML(data){
  headingContainer.innerHTML = data.name;
  priceContainer.innerHTML = `Price: ${price}`;
  colourSelector.innerHTML = colourSelections;
  imageProduct.innerHTML = productImage;
  imageProductThumbnails.innerHTML = thumbnails;
  sizeSelector.innerHTML = sizeSelection;
  productDetailsContainer.innerHTML = productDetails;
  productSpecificationContainer.innerHTML = productSpecification;
}

createHTML(product);

// related products
function createRelatedProducts() {
let relatedProducts = ""
if(product.sex === "men"){
  let j = 0;
  for (let i=0; i < products.length; i++){
    if(products[i].sex === "men" && products[i].id !== product.id){
      j = j + 1; 
      if(j > 4){break}
      relatedProducts += `<div class="product-item">
                            <a href="product.html?id=${products[i].id}">
                              <div class="overlay"></div>
                              <img src="${products[i].images[0].src}" alt="${products[i].images[0].alt}" />
                            </a>
                            <h3>${products[i].name}</h3>
                            <div>
                              <p>${products[i].brand}</p>
                              <p>${products[i].colours}</p>
                              <p>£${products[i].price[0]}</p>
                            </div>
                          </div>`
    }
  }
} else {
  let j = 0;
  for (let i=0; i < products.length; i++){
    if(products[i].sex === "women" && products[i].id !== product.id){
      j = j + 1; 
      if(j > 4){break}
      relatedProducts += `<div class="product-item">
                            <a href="product.html?id=${products[i].id}">
                              <div class="overlay"></div>
                              <img src="${products[i].images[0].src}" alt="${products[i].images[0].alt}" />
                            </a>
                            <h3>${products[i].name}</h3>
                            <div>
                              <p>${products[i].brand}</p>
                              <p>${products[i].colours}</p>
                              <p>£${products[i].price[0]}</p>
                            </div>
                          </div>`
    }
  }
}
relatedProductsContainer.innerHTML = relatedProducts;
}

createRelatedProducts();

//add product to local storage

function submitItemDetails(submission){
  submission.preventDefault();
  submitProductToLocalStorage();
}

function submitProductToLocalStorage(){

  const colourSelected = document.querySelector("#colour");
  const sizeRadioButtons = document.querySelector(".input-checked:checked");
  const quantityInput = document.querySelector("#quantity");
  const getCart = JSON.parse(localStorage.getItem("cart"));
  let item = [];
  
  if (getCart !== null){
    item = getCart;
  }

  let colour = colourSelected.value;
  let size = sizeRadioButtons.value;
  let quantity = quantityInput.value;
  let currentItem = [idNumber, colour, size, quantity];

  item.push(currentItem);

  localStorage.setItem("cart", JSON.stringify(item));
}


const productForm = document.querySelector(".product-form");
productForm.addEventListener("submit", submitItemDetails)