import products from "./data/data.js";
import {checkCart, createProductItemHTML, getProductPriceHTML, createToggleContent} from "./data/components.js"
checkCart();

//query string grabs
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const sex = params.get("sex");
const saleOn = params.get("on_sale");

//containers and elements
const h1 = document.querySelector("h1");
const title = document.querySelector("title");
const productList = document.querySelector(".products-page-grid");
const saleLink = document.querySelector(".sale-products");
const mensLink = document.querySelector(".mens-products");
const womensLink = document.querySelector(".womens-products");
const filterCategoriesLiHeading = document.querySelectorAll(".filter-items");
const filterCategoriesUl = document.querySelectorAll(".filter-container");
const checkboxes = document.querySelectorAll("input[type=checkbox]");

//set the current page on navigation
if(sex === "women"){
  womensLink.setAttribute("id","current");
} else if(sex === "men"){
  mensLink.setAttribute("id", "current");
} else if(saleOn === "true"){
  saleLink.setAttribute("id","current");
}

//filters products for sex or on-sale
function filterSexSale(data){
if (saleOn === String(data.on_sale)){ //turn the boolean to a fecking string.
    title.innerText = `Browse Sale Jackets | Rainydays`
    h1.innerText = "Sale Items";
    return true;
  } else if (sex === data.sex){
    const capSex = data.sex.charAt(0).toUpperCase() + data.sex.slice(1);
    title.innerText = `Browse ${capSex}'s Jackets | Rainydays`
    h1.innerText = `${capSex}'s Products`;
    return true;
  }
} 

//initial page list for sale/men/women/all
let initialFilteredList = [];
if (saleOn === null && sex === null){
  initialFilteredList = products;
  h1.innerText = "All Products";
}else {
  initialFilteredList = products.filter(filterSexSale);
};

// collapsable filter categories, toggles a class
createToggleContent(filterCategoriesLiHeading, filterCategoriesUl, "collapsed-section");

//defining filter variables
let filterSettings = [];
let filter = {};
let filteredList = [];

//looping through all the checkboxes, to push the values for the filter settings
checkboxes.forEach(function(checkbox) {
  //assign event listener to all checkboxes
  checkbox.addEventListener('change', function() {
    //create an array with category(key) and name from each checked checkbox when any check box is checked
    filterSettings = Array.from(checkboxes).filter(i => i.checked).map(i => [i.getAttribute("key"), i.name]);

    //sorts the array into an object with keys for all categories, and arrays of the values
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
      } //else if required in case other checkboxes checked.

    }

    //filters initial product list with current filter setting and updates the html
      filteredList = createFilteredArray(filter, initialFilteredList);
      console.log(filter)
      productList.innerHTML = "";
      getProductList(filteredList, productList);
  })  
});


// creates a new list of products based on the initial list and the filter settings
function createFilteredArray(filter, initialFilteredList){
  let list = [];

  //function for comparing Arrays from filter object to initial product list array
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

  // used to filter out results based on filter object settings
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
  let price = getProductPriceHTML(product.price[0], product.on_sale, product.sale_price[0]);
  container.innerHTML += createProductItemHTML(product.id, product.images[0].src, product.images[0].alt, product.name, product.brand, colours, price);
}


getProductList(initialFilteredList, productList);
