import products from "./data/data.js";
import {checkCart, createProductItemHTML, getProductPriceHTML} from "./data/components.js"
checkCart();

const bestSellersContainer = document.querySelector(".product-list-grid")

var currentDate = new Date();
var offerExpiryDate = new Date();
offerExpiryDate.setMonth(offerExpiryDate.getMonth() + 1);
console.log(currentDate);
console.log(offerExpiryDate);

// related products

function createBestSellers() {
  let bestSellers = ""
  let j = 0
    for (let i=0; i < products.length; i++){
      //price variable assignment for sale or not
      
      let price = getProductPriceHTML(products[i].price[0], products[i].on_sale, products[i].sale_price[0]);

      if(products[i].on_sale){
        j = j + 1; 
        console.log(j);
        if(j > 4){break}
        bestSellers += createProductItemHTML(products[i].id, products[i].images[0].src, products[i].images[0].alt, products[i].name, products[i].brand, products[i].colours, price); 
      }
    }
    bestSellersContainer.innerHTML = bestSellers;
  }

createBestSellers();