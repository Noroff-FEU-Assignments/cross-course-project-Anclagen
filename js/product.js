import {baseUrl, keys, searchForm, increaseResults} from "./data/constants.js";
import {checkCart, callApi, addLoader, createSuccessLightbox, createToggleContent, errorMessage, getBrand, getProductPriceHTML, createColourSelector, createSizeSelector, productSearch} from "./data/components.js"
checkCart();
searchForm.addEventListener("submit", productSearch);

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const idNumber = Number(id);

//selectors for page containers
const title = document.querySelector("title");
const headingContainer = document.querySelector("h1");
const priceContainer  = document.querySelector(".price-container");
const colourSelector = document.querySelector("#colour");
const imageProduct = document.querySelector(".images-container");
const imageProductThumbnails = document.querySelector(".product-thumbnails");
const sizeSelector = document.querySelector("#size");
const productDetailsContainer = document.querySelector(".product-details-container");
const productSpecificationContainer = document.querySelector(".product-specification-container");
const relatedProductsContainer = document.querySelector(".product-list-grid");
const lightboxPageContainer = document.querySelector("#lightbox-container");
const sectionHeading = document.querySelectorAll(".product-section-heading");
const sectionContainer = document.querySelectorAll(".product-section");
const stockLevelContainer = document.querySelector(".stock-container");

const url = baseUrl + "/" + id + keys;
const variantUrl = baseUrl + "/" + id + "/variations" + keys + increaseResults;
let itemData = {};
let variantItemData = {};
let currentVariant = {};
let stockLevel = 0;

createToggleContent(sectionHeading, sectionContainer, "collapsed-section-product");

async function buildPageContent(url) {
  try{
    addLoader(imageProduct);
    const data = await callApi(url)
    itemData = data;
    createHTML(data);
    title.innerText = `${data.name} || Rainydays`
    
    //get variants for stock levels of each
    const variantResponse = await fetch(variantUrl);
    variantItemData = await variantResponse.json();
    getStockNumber();

  } catch(error){
    console.log(error);
    errorMessage(imageProduct);
  }
}

buildPageContent(url);

function createHTML(data){
  //price
  let currentPrice = data.price;
  let onSale = data.on_sale
  let regularPrice = (data.price_html).match(/[\d\.]+/);
  let price = getProductPriceHTML(regularPrice, onSale, currentPrice);

  //colours
  let colourSelections = createColourSelector(data.attributes);

  //variables for image and thumbs.
  let thumbnails = "";
  let productImage = "";
  let checked = "";

  //creating product images
  for (let i = 0; i < data.images.length; i++){
    let imageSRC = data.images[i].src
    let imageAlt = data.images[i].alt
    if(i === 0){
      checked = `checked="checked"`;
    } else{
      checked = "";
    }

    let imageIDLowerCase = data.images[i].alt.replace(/ /g,"-").toLowerCase();
    productImage += `<div>
                      <input type="radio" name="image-selector" id=${imageIDLowerCase} value=${imageIDLowerCase} ${checked} />
                      <img src="${imageSRC}" alt="${imageAlt}" />
                    </div>`;

    thumbnails += `<label for=${imageIDLowerCase} class="checked">
                      <img src="${imageSRC}" alt="${imageAlt}" />
                  </label>`;       
  }

  let sizeSelection = createSizeSelector(data.attributes);

  let productDetails = data.description;
  let productSpecification = createProductSpec(data);
  //Product specification list

  //filling the page
  headingContainer.innerHTML = data.name;
  priceContainer.innerHTML = `Price: ${price}`;
  colourSelector.innerHTML = colourSelections;
  imageProduct.innerHTML = productImage;
  imageProductThumbnails.innerHTML = thumbnails;
  sizeSelector.innerHTML = sizeSelection;
  productDetailsContainer.innerHTML = productDetails;
  productSpecificationContainer.innerHTML = productSpecification;

}

function createProductSpec(data){
  let productSpecification = "";
  for (let i = 0; i < data.attributes.length; i++){
    if(data.attributes[i].name === "Specification"){
      for (let j = 0; j < data.attributes[i].options.length; j++){
        let specs = data.attributes[i].options[j];
        productSpecification += `<li>${specs}</li>`;
      }
    }
  }

  return productSpecification
}




//add product to local storage/cart
function submitProductToLocalStorage(){

  const colourSelected = document.querySelector("#colour");
  const sizeSelected = document.querySelector("#size");
  const quantityInput = document.querySelector("#quantity");
  const getCart = JSON.parse(localStorage.getItem("cart"));
  const errorSelectSize = document.querySelector(".select-size-error");

  let item = [];


  let colour = colourSelected.value;
  let size = sizeSelected.value;
  let quantity = quantityInput.value;
  //no idea if I want this yet
  let currentItem = [idNumber, colour, size, quantity, currentVariant.stock_quantity];
  let duplicateCheck = false;

  //check if existing cart contains same item and updates quantity if true
  if (getCart !== null){
    item = getCart;
    for (let i = 0; i < item.length; i++)
      if(idNumber === item[i][0] && colour === item[i][1] && size === item[i][2]){
        item[i][3] = Number(item[i][3]) + Number(quantity);
        duplicateCheck = true;
      }
  }

  //if not a duplicate pushes to current item
  if(!duplicateCheck){
    item.push(currentItem);
  }

  localStorage.setItem("cart", JSON.stringify(item));
  errorSelectSize.innerText = "";
  createSuccessLightbox (lightboxPageContainer, colour, size, quantity, itemData.name, itemData.images[0].src, itemData.images[0].alt)

}

// quantity and stock functions

function getStockNumber(){
  for(let i = 0; i < variantItemData.length; i++){
    if(variantItemData[i].attributes[1].option === sizeSelector.value && variantItemData[i].attributes[0].option === colourSelector.value){
      currentVariant = variantItemData[i];
    }
  }
  stockLevel = currentVariant.stock_quantity;
  stockLevelContainer.innerText = stockLevel;
}

sizeSelector.addEventListener("change", getStockNumber);
colourSelector.addEventListener("change", getStockNumber);

const quantityContainer = document.querySelector("#quantity");
const minusButton = document.querySelector(".minus-button");
const plusButton = document.querySelector(".plus-button");
minusButton.addEventListener("click", minusItem);
plusButton.addEventListener("click", addItem);

function addItem() {
  quantityContainer.valueAsNumber = quantityContainer.valueAsNumber + 1;

  //enables minus button
  if (quantityContainer.valueAsNumber > 1) {
    minusButton.disabled = false;
  }
  if (quantityContainer.valueAsNumber >= currentVariant.stock_quantity) {
    plusButton.disabled = true;
  }

}

//minus quantity
function minusItem() {
  quantityContainer.valueAsNumber = quantityContainer.valueAsNumber - 1;
  
  //disables minus button at 1 quantity
  if (quantityContainer.valueAsNumber < 2) {
    minusButton.disabled = true;
  }
  if (quantityContainer.valueAsNumber < currentVariant.stock_quantity) {
    plusButton.disabled = false;
  }
}

function submitItemDetails(submission){
  submission.preventDefault();
  submitProductToLocalStorage();
}

const productForm = document.querySelector(".product-form");
productForm.addEventListener("submit", submitItemDetails);