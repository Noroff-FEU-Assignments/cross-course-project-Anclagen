import products from "./data/data.js";
import {checkCart, createProductItemHTML, getProductPriceHTML, createSuccessLightbox, createColourSelector, createSizeSelector, createToggleContent} from "./data/components.js"
checkCart();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const idNumber = Number(id) - 1;
const product = products[idNumber];

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
const lightboxPageContainer = document.querySelector("#lightbox-container");
const sectionHeading = document.querySelectorAll(".product-section-heading");
const sectionContainer = document.querySelectorAll(".product-section");

//creating price html, colour selector, and size selector.
let price =  getProductPriceHTML(product.price[0], product.on_sale, product.sale_price[0]);
let colourSelections = createColourSelector(product.colours);
let sizeSelection = createSizeSelector(product.sizes);


//variables for image and thumbs.
let thumbnails = "";
let productImage = "";
let checked = "";
//creating product images
for (let i = 0; i < product.images.length; i++){
  let imageSRC = product.images[i].src
  let imageAlt = product.images[i].alt
  if(i === 0){
    checked = `checked="checked"`;
  } else{
    checked = "";
  }
  let imageIDLowerCase = product.images[i].alt.replace(/ /g,"-").toLowerCase();
  productImage += `<div>
                    <input type="radio" name="image-selector" id=${imageIDLowerCase} value=${imageIDLowerCase} ${checked} />
                    <img src=${imageSRC} alt=${imageAlt} />
                  </div>`;

  thumbnails += `<label for=${imageIDLowerCase} class="checked">
                    <img src=${imageSRC} alt=${imageAlt} />
                 </label>`;       
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

createToggleContent(sectionHeading, sectionContainer, "collapsed-section-product");

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

//add product to local storage/cart
function submitProductToLocalStorage(){

  const colourSelected = document.querySelector("#colour");
  const sizeRadioButtons = document.querySelector(".input-checked:checked");
  const quantityInput = document.querySelector("#quantity");
  const getCart = JSON.parse(localStorage.getItem("cart"));
  const errorSelectSize = document.querySelector(".select-size-error");

  let item = [];

  if(sizeRadioButtons){
 
    let colour = colourSelected.value;
    let size = sizeRadioButtons.value;
    let quantity = quantityInput.value;
    let currentItem = [idNumber, colour, size, quantity];
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
    createSuccessLightbox (lightboxPageContainer, colour, size, quantity, product.name, product.images[0].src, product.images[0].alt);
  } else {
    errorSelectSize.innerText = "Please select a size.";
  }
}

function submitItemDetails(submission){
  submission.preventDefault();
  submitProductToLocalStorage();
}

const productForm = document.querySelector(".product-form");
productForm.addEventListener("submit", submitItemDetails);



// related products
function createRelatedProducts() {
  let relatedProducts = "";
  //gets 4 products matching sex and not the id of the current product, and slices them into an array.
  let related = products.filter(products => products.id !== product.id && products.sex === product.sex).slice(0, 4);
  for (let i=0; i < related.length; i++){
    let price = getProductPriceHTML(related[i].price[0], related[i].on_sale, related[i].sale_price[0]);
    relatedProducts += createProductItemHTML(related[i].id, related[i].images[0].src, products[i].images[0].alt, related[i].name, related[i].brand, related[i].colours, price);
  }
  relatedProductsContainer.innerHTML = relatedProducts;
}

// createRelatedProducts();