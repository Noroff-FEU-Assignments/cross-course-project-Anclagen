import {baseUrl, keys, increaseResults, searchForm} from "./data/constants.js";
import {checkCart, addLoader, createFeaturedProducts, errorMessage, callApi, productSearch} from "./data/components.js"
checkCart();
searchForm.addEventListener("submit", productSearch);

const featuredProductsContainer = document.querySelector(".product-list-grid");
//creating url to call
let url = baseUrl + keys + increaseResults + "&featured=true";

//gets featured products from api
async function getFeaturedProducts(url) {
  try{
    addLoader(featuredProductsContainer);
    const data = await callApi(url);
    createFeaturedProducts(data, featuredProductsContainer);
  } catch(error){
    console.log(error);
    errorMessage(featuredProductsContainer);
  }
}

getFeaturedProducts(url);