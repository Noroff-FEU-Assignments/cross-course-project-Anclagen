import products from "./data/data.js";
import {checkCart} from "./data/components.js"
checkCart();

const productList = document.querySelector(".products-page-grid");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const sex = params.get("sex")
const saleOn = params.get("on_sale")
const h1 = document.querySelector("h1")
const title = document.querySelector("title")
console.log(saleOn)
console.log(sex)


//filters for sex and sale
function filterSexSale(data){
if (saleOn === String(data.on_sale)){ //turn the boolean to a fecking string.
    title.innerText = `Rainydays | Browse Sale Jackets`
    h1.innerText = "Sale Items";
    return true;
  } else if (sex === data.sex){
    const capSex = data.sex.charAt(0).toUpperCase() + data.sex.slice(1);
    title.innerText = `Rainydays | Browse ${capSex}'s Jackets`
    h1.innerText = `${capSex}'s Products`;
    return true;
  }
} 

//initial page list for sale/men/women
let initialFilteredList = [];
if (saleOn === null && sex === null){
  initialFilteredList = products;
  h1.innerText = "All Products";
}else {
  initialFilteredList = products.filter(filterSexSale);
};




const checkboxes = document.querySelectorAll("input[type=checkbox]");
let filterSettings = [];
let filter = {};
let filteredList = [];

checkboxes.forEach(function(checkbox) {
  //assign event listener to all checkboxes
  checkbox.addEventListener('change', function() {
    filterSettings = Array.from(checkboxes).filter(i => i.checked).map(i => [i.getAttribute("key"), i.name]);
    filter = {category:[], brand:[], sizes:[], colours:[], price:[]};
    for (let i = 0; i < filterSettings.length; i++){
      if(filterSettings[i][0] === "category"){
        filter.category.push(filterSettings[i][1]);
      } else if(filterSettings[i][0] === "brand"){
        filter.brand.push(filterSettings[i][1]);
      } else if(filterSettings[i][0] === "sizes"){
        filter.sizes.push(filterSettings[i][1]);
      } else if(filterSettings[i][0] === "colours"){
        filter.colours.push(filterSettings[i][1]);
      } else if(filterSettings[i][0] === "price"){
        filter.price.push(JSON.parse(filterSettings[i][1]));
      }
    }

      filteredList = createFilteredArray(filter, initialFilteredList);
      console.log(filter)
      productList.innerHTML = "";
      getProductList(filteredList, productList);
  })  
  
});

let arrr = [0, 39.99];
console.log(JSON.stringify(arrr))

function createFilteredArray(filter, initialFilteredList){
  let list = [];

  function compareArrays(list, filter) {
    return list.some(property => filter.includes(property));
  }

  //not technically right but needs to be change to inputs with a range between a high and low value
  function checkPriceRange(filter, price){
    let x = filter.length - 1;
    if(price > filter[0][0] && price < filter[x][1]){
      return true;
    } else {
      return false;
    }
  }

  for(let i = 0; i < initialFilteredList.length; i++){
    if (filter.category.length === 0 || compareArrays(initialFilteredList[i].category, filter.category)){
      if (filter.brand.length === 0 || filter.brand.includes(initialFilteredList[i].brand)){
        if (filter.sizes.length === 0 || compareArrays(initialFilteredList[i].sizes, filter.sizes)){
          if (filter.colours.length === 0 || compareArrays(initialFilteredList[i].colours, filter.colours)){
            if (filter.price.length === 0 || checkPriceRange(filter.price, initialFilteredList[i].price[0])){
              list.push(initialFilteredList[i]);
            }
          }
        }
      } 
    } 
  };
  return list
}




//loops through data to get product list and creates html
function getProductList(data, container){
for (let i = 0; i < data.length; i++){
  createProductItem(data[i], container);
  }
}

//function to create product items for lists
function createProductItem(product, container) {
  const colours = product.colours;
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

  container.innerHTML +=`<div class="product-item">
                              <a href="product.html?id=${product.id}">
                                <div class="overlay"></div>
                                <img src="${product.images[0].src}" alt="${product.images[0].alt}" />
                              </a>
                              <h3>${product.name}</h3>
                              <div>
                                <p>${product.brand}</p>
                                <p>${colours}</p>
                                <p>${price}</p>
                              </div>
                            </div>`
}

getProductList(initialFilteredList, productList);
