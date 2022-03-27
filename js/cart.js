import products from "./data/data.js";
import {checkCart} from "./data/components.js"
checkCart();

const cartItemsContainer = document.querySelector(".cart-items");
const subtotalContainer = document.querySelector(".subtotal");
const deliveryContainer = document.querySelector(".delivery");
const vatContainer = document.querySelector(".vat");
const totalPriceContainer = document.querySelector(".total");
const form = document.querySelector("#delivery-type");
const submitBtn = document.querySelector("#submit-btn");
let cartItems = JSON.parse(localStorage.getItem("cart"));
let deliveryPrice = 0;
let totalPrice = 0;

function createCartHtml(){
  totalPrice = 0;
  cartItemsContainer.innerHTML = "";
  if (cartItems[0] !== undefined){
   for(let i = 0; i < cartItems.length; i++){
      let index = cartItems[i][0];
      let colour = cartItems[i][1];
      let size = cartItems[i][2];
      let quantity = cartItems[i][3];

      let imageSrc = products[index].images[0].src;
      let imageAlt = products[index].images[0].alt;
      let brand = products[index].brand;
      let name = products[index].name;
      let price = products[index].price[0];

      if(products[index].on_sale){
        price = products[index].sale_price[0];
      }

      totalPrice += (price * quantity);

      //create initial container
      let cartItem = document.createElement("div");
      cartItem.classList.add(`cart-product-item-grid`);

      //create image container and images
      let imageContainer = document.createElement("div");
      let imageItem = document.createElement("img");
      imageItem.src=`${imageSrc}`;
      imageItem.alt=`${imageAlt}`;
      imageContainer.appendChild(imageItem);

      //create item details
      let detailsItem = document.createElement("div");
      let h2 = document.createElement("h2");
      let pSize = document.createElement("p");
      let pColour = document.createElement("p");
      let pPrice = document.createElement("p");
      pPrice.classList.add("items-price");
      let pQuantity = document.createElement("p");
      let pQuantityUpdater = document.createElement("p");
      let btnAdd = document.createElement("button");
      btnAdd.textContent = "+";
      btnAdd.classList.add("plus-button");
      let btnMinus = document.createElement("button");
      btnMinus.textContent = "-";
      btnMinus.classList.add("minus-button");
      //pre-disable button if quantity is 1
      if(quantity < 2){
        btnMinus.disabled = true;
      }

      let quantitySpan = document.createElement("span");
      quantitySpan.classList.add("quantity-value");
      quantitySpan.innerText = quantity;
      pQuantityUpdater.appendChild(btnMinus);
      pQuantityUpdater.appendChild(quantitySpan);
      pQuantityUpdater.appendChild(btnAdd);
      let btnRemove = document.createElement("button");
      btnRemove.classList.add("remove-button");

      //if calling a function with parameters create it inside another as it will run automatically.
      btnMinus.addEventListener("click", function(){minusItem(i)});
      btnAdd.addEventListener("click", function(){addItem(i)});
      btnRemove.addEventListener("click", function(){removeItem(i)});

      h2.innerHTML = `<a href="product.html?id=${index+1}">${brand} -${name}</a>`;
      pSize.textContent = `Size: ${size}`;
      pColour.textContent = `Colour: ${colour}`;
      pPrice.textContent = `Price: £${price}`;
      pQuantity.innerHTML = `Quantity:`;
      btnRemove.textContent = "remove";


      cartItemsContainer.appendChild(cartItem);
      cartItem.appendChild(imageContainer);
      cartItem.appendChild(detailsItem);
      detailsItem.appendChild(h2);
      detailsItem.appendChild(pSize);
      detailsItem.appendChild(pColour);
      detailsItem.appendChild(pPrice);
      detailsItem.appendChild(pQuantity);
      detailsItem.appendChild(pQuantityUpdater);
      
      detailsItem.appendChild(btnRemove);
    }
  } else{
    submitBtn.disabled = true;
    cartItemsContainer.innerHTML = "<p>Nothing in cart =(</p>"
  }

function addItem(i){
  const quantityContainer = document.getElementsByClassName("quantity-value");
  const minusButton = document.getElementsByClassName("minus-button");
  let itemQuantity = Number(quantityContainer[i].innerText);
  let newQuantity = itemQuantity + 1;

  if(newQuantity > 1){
    minusButton[i].disabled = false;
  }

  quantityContainer[i].innerText = newQuantity;
  cartItems[i][3] = newQuantity;
  localStorage.setItem("cart", JSON.stringify(cartItems));
}

function minusItem(i){
  const quantityContainer = document.getElementsByClassName("quantity-value");
  const minusButton = document.getElementsByClassName("minus-button");
  let itemQuantity = Number(quantityContainer[i].innerText);
  let newQuantity = itemQuantity - 1;

  if(newQuantity < 2){
    minusButton[i].disabled = true;
  }

  quantityContainer[i].innerText = newQuantity;
  cartItems[i][3] = newQuantity;
  localStorage.setItem("cart", JSON.stringify(cartItems));
}


  let subtotal = totalPrice * 0.875;
  let vat = totalPrice * 0.125;
  //js does some random math some times fixed to 2 dp.
  subtotalContainer.innerHTML = "£" + subtotal.toFixed(2);
  vatContainer.innerHTML = "£" + vat.toFixed(2);
  totalPriceContainer.innerHTML = "£" + totalPrice.toFixed(2);

}
  // function createCartHtml(){
  //   totalPrice = 0;
  //   cartItemsContainer.innerHTML = "";
  //   if (cartItems[0] !== undefined){
  //    for(let i = 0; i < cartItems.length; i++){
  //       let index = cartItems[i][0];
  //       let colour = cartItems[i][1];
  //       let size = cartItems[i][2];
  //       let quantity = cartItems[i][3];
  //       let imageSrc = products[index].images[0].src;
  //       let imageAlt = products[index].images[0].alt;
  //       let brand = products[index].brand;
  //       let name = products[index].name;
  //       let price = products[index].price[0];
  
  //       if(products[index].on_sale){
  //         price = products[index].sale_price[0];
  //       }
  
  //       totalPrice += (price * quantity);
  
  //       //create initial container
  //       let cartItem = document.createElement("div");
  //       cartItem.classList.add(`cart-product-item-grid`);
  
  //       //create image container and images
  //       let imageContainer = document.createElement("div");
  //       let imageItem = document.createElement("img");
  //       imageItem.src=`${imageSrc}`;
  //       imageItem.alt=`${imageAlt}`;
  //       imageContainer.appendChild(imageItem);
  
  //       //create item details
  //       let detailsItem = document.createElement("div");
  //       let h2 = document.createElement("h2");
  //       let pSize = document.createElement("p");
  //       let pColour = document.createElement("p");
  //       let pPrice = document.createElement("p");
  //       pPrice.classList.add("items-price");
  //       let pQuantity = document.createElement("p");
  //       pQuantity.classList.add("quantity-value");
  //       let btnAdd = document.createElement("button");
  //       let btnMinus = document.createElement("button");
  //       btnAdd.classList.add("remove-button");
  //       btnMinus.classList.add("remove-button");
  
  //       let btnRemove = document.createElement("button");
  //       btnRemove.classList.add("remove-button");
  
  //       //if calling a function with parameters create it inside another as it will run automatically.
  //       btnRemove.addEventListener("click", function(){removeItem(i)});
  //       btnRemove.addEventListener("click", function(){addItem(i)});
  //       btnRemove.addEventListener("click", function(){removeItem(i)});
  
  //       h2.textContent = `${brand} -${name}`;
  //       pSize.textContent = `Size: ${size}`;
  //       pColour.textContent = `Colour: ${colour}`;
  //       pPrice.textContent = `Price: £${price}`;
  //       pQuantity.innerHTML = `Quantity: ${quantity}`;
  //       btnRemove.textContent = "remove";
  
  
  //       cartItemsContainer.appendChild(cartItem);
  //       cartItem.appendChild(imageContainer);
  //       cartItem.appendChild(detailsItem);
  //       detailsItem.appendChild(h2);
  //       detailsItem.appendChild(pSize);
  //       detailsItem.appendChild(pColour);
  //       detailsItem.appendChild(pPrice);
  //       detailsItem.appendChild(pQuantity);
        
  //       detailsItem.appendChild(btnRemove);
  //     }
  //   } else{
  //     submitBtn.disabled = true;
  //     cartItemsContainer.innerHTML = "<p>Nothing in cart =(</p>"
  //   }

//   let subtotal = totalPrice * 0.875;
//   let vat = totalPrice * 0.125;
//   //js does some random math some times fixed to 2 dp.
//   subtotalContainer.innerHTML = "£" + subtotal.toFixed(2);
//   vatContainer.innerHTML = "£" + vat.toFixed(2);
//   totalPriceContainer.innerHTML = "£" + totalPrice.toFixed(2);

// }

// delivery options
const standardDeliveryBtn = document.querySelector("#standard-delivery");
const expressDeliveryBtn = document.querySelector("#express-delivery");
const nextDayDeliveryBtn = document.querySelector("#next-day-delivery");
const deliveryRadioBtns = document.querySelectorAll('input[type="radio"]');

deliveryRadioBtns.forEach(function(event){
  event.addEventListener("click", updateDeliveryPrice);
})

let deliveryType = "";
let deliveryDetails = [];

function updateDeliveryPrice(){
  if(standardDeliveryBtn.checked){
    deliveryPrice = 0;
    deliveryType = "Standard delivery";
    totalPriceContainer.innerHTML = "£" + (totalPrice + deliveryPrice).toFixed(2);
  } else if(expressDeliveryBtn.checked){
    deliveryPrice = 5;
    deliveryType = "Express delivery";
    totalPriceContainer.innerHTML = "£" + (totalPrice + deliveryPrice).toFixed(2);
  } else if(nextDayDeliveryBtn.checked){
    deliveryPrice = 10;
    deliveryType = "Next day delivery";
    totalPriceContainer.innerHTML = "£" + (totalPrice + deliveryPrice).toFixed(2);
  }
 console.log(deliveryPrice);
  deliveryContainer.innerHTML = `£${deliveryPrice.toFixed(2)}`
  deliveryDetails = [deliveryType, deliveryPrice];
}

// remove an item from your cart, updates local storage and re-creates html
function removeItem(index){
  cartItems.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cartItems));
  createCartHtml();
  checkCart();
}

createCartHtml()

// add relevant details to a local storage value for use later, and go to next page
function submitAndPay(submit){
  updateDeliveryPrice();
  submit.preventDefault();
  localStorage.setItem("delivery", JSON.stringify(deliveryDetails))
  window.location = "details_checkout.html"
}

form.addEventListener("submit", submitAndPay);