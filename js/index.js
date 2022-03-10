import products from "./data/data.js";
import {checkCart} from "./data/components.js"
checkCart();

const bestSellersContainer = document.querySelector(".product-list-grid")

// related products
function createBestSellers() {
  let bestSellers = ""
  let j = 0
    for (let i=0; i < products.length; i++){
      //price variable assignment for sale or not
      let price = "";
      if (!products[i].on_sale){
        price = "£" + products[i].price[0];
      } else {
        //get ride of decimal madness
        let savings = Math.round((products[i].price[0] - products[i].sale_price[0])* 100 + Number.EPSILON ) / 100;
        price = `<span class="sale-price">£${products[i].sale_price[0]}</span> 
                <span class="previous-price"> £${products[i].price[0]}</span> 
                <span class="save-price"> Save £${savings}</span>`
      }
      if(products[i].on_sale){
        j = j + 1; 
        console.log(j);
        if(j > 4){break}
        bestSellers += `<div class="product-item">
                              <a href="product.html?id=${products[i].id}">
                                <div class="overlay"></div>
                                <img src="${products[i].images[0].src}" alt="${products[i].images[0].alt}" />
                              </a>
                              <h3>${products[i].name}</h3>
                              <div>
                                <p>${products[i].brand}</p>
                                <p>${products[i].colours}</p>
                                <p>${price}</p>
                              </div>
                            </div>`
      }
    }
    bestSellersContainer.innerHTML = bestSellers;
  }
  
  createBestSellers();