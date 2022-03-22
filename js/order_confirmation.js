import products from "./data/data.js";
import {checkCart} from "./data/components.js";
checkCart();

//  containers and elements
const addressContainer = document.querySelector("address");
const paymentTypeContainer = document.querySelector("#payment-type");
const itemsContainer = document.querySelector("table");
const emailContainer = document.querySelector(".email-container");
const deliveryContainer = document.querySelector("#delivery-type");
const priceContainer = document.querySelector("#total-price");
const btn = document.querySelector("button")

//  local, and session storage
const cartItems = JSON.parse(localStorage.getItem("cart"));
const deliveryDetails = JSON.parse(localStorage.getItem("delivery"));
let paymentDetails = JSON.parse(localStorage.getItem("Payment Details"));
//check if temp storage is being used
if(window.sessionStorage.getItem("Payment Details")){
  paymentDetails = JSON.parse(window.sessionStorage.getItem("Payment Details"));
  console.log("yes");
}
//if undefined will cause error on some browsers when parsed so check for undefined first
const orderHistoryJSON = localStorage.getItem("Order History");


// order summary details
const address= `${paymentDetails.firstName} ${paymentDetails.lastName}<br />
${paymentDetails.addressLine1}<br />
${paymentDetails.addressLine2}<br />
${paymentDetails.townCity}<br />
${paymentDetails.postCode}<br />
${paymentDetails.country}`;

const email = paymentDetails.email;
const delivery = `${deliveryDetails[0]} £${deliveryDetails[1]}.00 `;

let totalPrice = deliveryDetails[1];




//  creates order summary based on stored info from cart, delivery, and payment details.
function createOrderSummary(){
  //add address

  addressContainer.innerHTML = address;
  emailContainer.innerText = email;
  //add payment type
  paymentTypeContainer.innerText = `Visa/Credit Card ending in: ${String(paymentDetails.cardNumber).slice(-4)}`;

  //define total price, added to in for loop
  

  for (let i = 0; i < cartItems.length; i++){
    let id = cartItems[i][0];
    let price = products[id].price[0];

    totalPrice += products[id].price[0];

    //creates a table item for each item in cart
    itemsContainer.innerHTML +=  `<td class="product-name">
                                    <a href="product.html?id=${products[id].id}"  target="_blank">${products[id].name}</a>
                                  </td>
                                  <td>${cartItems[i][3]}</td>
                                  <td>£${price}</td>`;
  }

  // delivery and total price values
  deliveryContainer.innerText = delivery;
  priceContainer.innerText = `£${totalPrice}`;


}

createOrderSummary()

//order
  let orderItem = {
    orderNumber: Math.floor(100000000000 + Math.random() * 900000000000),
    productsArray: cartItems,
    deliveryText: delivery,
    deliveryAddressHTML: address,
    totalText: totalPrice,
    email: email,
  }

//create a random order and clear cart
function createOrderHistory(){
  let orderHistory = [];

  if(orderHistoryJSON !== null){
    orderHistory = JSON.parse(orderHistoryJSON);
  }
  console.log(orderHistoryJSON);
  console.log(orderHistory);
  console.log(orderItem);
  orderHistory.push(orderItem);
  let orderHistoryStringy = JSON.stringify(orderHistory);

  localStorage.setItem("cart", "[]");
  window.sessionStorage.removeItem("Payment Details");
  localStorage.setItem("Order History", orderHistoryStringy);

  window.location.href="order_success.html";
}

btn.addEventListener("click", createOrderHistory);
