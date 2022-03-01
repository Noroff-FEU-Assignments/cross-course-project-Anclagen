import products from "./data/data.js";

const productList = document.querySelector(".products-page-grid");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const sex = params.get("sex")
const saleOn = params.get("on_sale")
console.log(saleOn)
console.log(sex)

//filters for sex and sale
function filterSexSale(data){
if (saleOn === String(data.on_sale)){ //turn the boolean to a fecking string.
    return true;
  } else if (sex === data.sex){
    return true;
  }
} 

//initial page list for sale/men/women
const initialFilteredList = products.filter(filterSexSale);


//trying to assign event listener to all checkboxes
//https://stackoverflow.com/questions/14544104/checkbox-check-event-listener
const checkboxes = document.querySelectorAll("input[type=checkbox]");
let filterSettings = [];
let filteredList = [];

function filterCategories(initialFilteredList){
  //loop through settings to compare to item in filtered list
  let failedCheck = false;
  for (let j = 0; j < filterSettings.length; j++){
    //check which key to compare to in item

    if(filterSettings[j][1] === "brand"){
      if(initialFilteredList.brand.includes(filterSettings[j][0])){
        return failedCheck = true;
      }
    } else if(filterSettings[j][1] === "sizes"){
      if(initialFilteredList.sizes.includes(filterSettings[j][0])){
        failedCheck = true;
      }
    } else if(filterSettings[j][1] === "colours"){
      if(initialFilteredList.colours.includes(filterSettings[j][0])){
        failedCheck = true;
      }
    } else if(filterSettings[j][1] === "price"){
      if(initialFilteredList.price.includes(filterSettings[j][0])){
        failedCheck = true;
      }
    } else if(filterSettings[j][1] === null){
      continue
    };
  }
  if(failedCheck){
    return true;
  }
}

checkboxes.forEach(function(checkbox) {
  checkbox.addEventListener('change', function() {
    filterSettings = Array.from(checkboxes).filter(i => i.checked).map(i => [i.name, i.getAttribute("key")]);
      console.log("Filter Settings:", filterSettings)
      filteredList = initialFilteredList.filter(filterCategories);
      console.log("Filtered List:", filteredList)
  })  
});


// function arrayToObject(arr = []){
//   let result = {};
//   for(let i = 0; i < arr.length; i++){
//      result[arr[i][1]] = arr[i][0];
//   };
//   return result;
// };



console.log(filteredList);

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
