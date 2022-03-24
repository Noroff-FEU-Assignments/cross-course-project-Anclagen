import products from "./data/data.js";
import {firstName, firstNameError, lastName, lastNameError, addressLine1, addressLine1Error, addressLine2, city, cityError, postCode, postCodeError, country, countryError, email, emailError, cardNumber, cardNumberError, nameCard, nameCardError, securityCode, securityCodeError, month, year, dateError, detailsLocalStorage} from "./data/constants.js";
import {checkCart, prefillFormFields, createPaymentDetails, validateEmailInput, validatedInputLength, validatedNumberInputLength, validateDateYY, validateDateMM} from "./data/components.js";
checkCart();

// page containers and inputs
const loginSection = document.querySelector(".login");
const loginForm = document.querySelector("#login-form");
const loginEmail = document.querySelector("#email-login");
const detailsForm = document.querySelector("#details-form");
const itemsContainer = document.querySelector("table");
const passwordInput = document.querySelector("#password");
const confirmPasswordLabel = document.querySelector("#confirm-password-label")
const confirmPasswordInput = document.querySelector("#confirm-password");
const submitBtn = document.querySelector("#submit-btn");
const signUpText = document.querySelector(".paragraph");
const signUpBtn = document.querySelector("#sign-up");
const accountDetailsSection = document.querySelector(".account-details");
const orderHistorySection = document.querySelector(".order-history");

// local storage grabs
const orderHistoryJSON = localStorage.getItem("Order History");

// check if user details exist to fill page on load defaults to session storage for the moment.
if(detailsLocalStorage){
  prefillFormFields(detailsLocalStorage, firstName, lastName, addressLine1, addressLine2, city, postCode, country, email,cardNumber, nameCard, securityCode, month, year);
  loginEmail.value = JSON.parse(detailsLocalStorage).email;
} else {

  itemsContainer.innerHTML = "<p>No Orders Found<p>"
}

// --- Login/Sign Up Form ---
function validateLoginSignUp(submit){
  submit.preventDefault();

  if(submitBtn.value === "Login"){
    console.log("cheese");
    loginSection.classList.toggle("hidden");
    accountDetailsSection.classList.toggle("hidden");
    orderHistorySection.classList.toggle("hidden");
  } else {
    
  }


}

function displaySignUpForm(click){
  click.preventDefault();

  if(signUpBtn.innerText === "Sign Up"){
    signUpBtn.innerText = "Login";
  } else {
    signUpBtn.innerText = "Sign Up"
  }

  if(submitBtn.value === "Sign Up"){
    submitBtn.value = "Login";
  } else {
    submitBtn.value = "Sign Up"
  }

  if(signUpText.innerText === "Don't have an account?"){
    signUpText.innerText = "Already have an account?"
  } else {
    signUpText.innerText = "Don't have an account?"
  }

  confirmPasswordInput.classList.toggle("hidden");
  confirmPasswordLabel.classList.toggle("hidden");

}

// --- Account Logged In Code ---

submitBtn.addEventListener("click", validateLoginSignUp);
signUpBtn.addEventListener("click", displaySignUpForm);

// validate the users updates
function validateUpdatedDetails(submission){
  submission.preventDefault();

  //variables assigned true if they pass, and errors generated on fail.
  const a = validatedInputLength(firstName, 0, firstNameError);
  const b = validatedInputLength(lastName, 0, lastNameError);
  const c = validatedInputLength(addressLine1, 3, addressLine1Error);
  const d = validatedInputLength(city, 0, cityError);
  const e = validatedInputLength(postCode, 3, postCodeError);
  const f = validatedInputLength(country, 1, countryError);
  const g = validateEmailInput(email, emailError);
  const h = validatedNumberInputLength(cardNumber, 16, cardNumberError);
  const i = validatedInputLength(nameCard, 2, nameCardError);
  const j = validatedNumberInputLength(securityCode, 3, securityCodeError);
  const k = validateDateMM(month);
  const l = validateDateYY(year);

  if(!l || !k){
    dateError.innerText = "Please enter valid date";
  } else {
    dateError.innerText = "";
  };

  //if all variables true goes to order summary/confirmation 
  if(a && b && c && d && e && f && g && h && i && j && k && l) {
    const userDetails = createPaymentDetails(firstName, lastName, addressLine1, addressLine2, city, postCode, country, email,cardNumber, nameCard, securityCode, month, year);

    localStorage.setItem("Payment Details", userDetails);
    window.location.reload();
  }
};

detailsForm.addEventListener("submit", validateUpdatedDetails);

function createOrderHistory(){
  let totalPrice = 0;
  const orderHistory = JSON.parse(orderHistoryJSON);
  for(let j = (orderHistory.length - 1); j >= 0; j--){

    totalPrice = 0;
    let productsOrders = orderHistory[j].productsArray;

    for (let i = 0; i < productsOrders.length; i++){
      let id = orderHistory[j].productsArray[i][0];
      let quantity = orderHistory[j].productsArray[i][3];
      let price = (products[id].price[0]) * quantity;

      let orderNumber = "";
      if(i === 0){
        orderNumber = orderHistory[j].orderNumber;
      }

      totalPrice += price;

      //creates a table item for each item in cart
      itemsContainer.innerHTML +=  `<tr>
                                      <td>${orderNumber}</td>
                                      <td class="product-name">
                                        <a href="product.html?id=${products[id].id}"  target="_blank">${products[id].name}</a>
                                      </td>
                                      <td></td>
                                    </tr>`;
    }

    itemsContainer.innerHTML +=`<tr>
                                  <th class="total"colspan="4">£${totalPrice}</th>
                                </tr>`
  }
  
}

if(orderHistoryJSON){
  console.log("hello");
  createOrderHistory();
} 