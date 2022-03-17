import products from "./data/data.js";
import {checkCart} from "./data/components.js"
checkCart();

const cartItemsContainer = document.querySelector(".cart-items");
const subtotalContainer = document.querySelector(".subtotal");
const deliveryContainer = document.querySelector(".delivery");
const vatContainer = document.querySelector(".vat");
const totalPriceContainer = document.querySelector(".total");
const form = document.querySelector("#delivery-type");
let cartItems = JSON.parse(localStorage.getItem("cart"));
let deliveryPrice = 0;
let totalPrice = 0;

function createCartHtml(){
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
      let pQuantity = document.createElement("p");
      let btnRemove = document.createElement("button");
      btnRemove.classList.add("remove-button");

      //if calling a function with parameters create it inside another as it will run automatically.
      btnRemove.addEventListener("click", function(){removeItem(i)});

      h2.textContent = `${brand} -${name}`;
      pSize.textContent = `Size: ${size}`;
      pColour.textContent = `Colour: ${colour}`;
      pPrice.textContent = `Price: £${price}`;
      pQuantity.innerHTML = `Quantity: ${quantity}`;
      btnRemove.textContent = "remove";


      cartItemsContainer.appendChild(cartItem);
      cartItem.appendChild(imageContainer);
      cartItem.appendChild(detailsItem);
      detailsItem.appendChild(h2);
      detailsItem.appendChild(pSize);
      detailsItem.appendChild(pColour);
      detailsItem.appendChild(pPrice);
      detailsItem.appendChild(pQuantity);
      detailsItem.appendChild(btnRemove);
    }
  } else{
    cartItemsContainer.innerHTML = "<p>Nothing in cart</p>"
  }

  let subtotal = totalPrice * 0.875;
  let vat = totalPrice * 0.125;
  //js does some random math some times fixed to 2 dp.
  subtotalContainer.innerHTML = "£" + subtotal.toFixed(2);
  vatContainer.innerHTML = "£" + vat.toFixed(2);
  totalPriceContainer.innerHTML = "£" + totalPrice.toFixed(2);

}

// delivery options
const standardDeliveryBtn = document.querySelector("#standard-delivery");
const expressDeliveryBtn = document.querySelector("#express-delivery");
const nextDayDeliveryBtn = document.querySelector("#next-day-delivery");
const deliveryRadioBtns = document.querySelectorAll('input[type="radio"]');

deliveryRadioBtns.forEach(function(e){
  e.addEventListener("click", updateDeliveryPrice);
  console.log(e)
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

// remove an item from your cart
function removeItem(index){
  cartItems.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cartItems));
  createCartHtml();
  checkCart();
}


createCartHtml()




// add relevant details to a local storage value for use later, and go to next page
form.addEventListener("submit", submitAndPay);

function submitAndPay(submit){
  submit.preventDefault();
  localStorage.setItem("delivery", JSON.stringify(deliveryDetails))
  window.location = "details_checkout.html"
}