import {checkCart, validateEmailInput, validatedInputLength, validatedNumberInputLength, validateDateYY, validateDateMM} from "./data/components.js"
checkCart();

// Page containers and inputs
const paymentForm = document.querySelector("#details-form");
const firstName = document.querySelector("#first-name");
const firstNameError = document.querySelector("#error-first-name");
const lastName = document.querySelector("#last-name");
const lastNameError = document.querySelector("#error-last-name");
const addressLine1 = document.querySelector("#address-1");
const addressLine1Error = document.querySelector("#error-address-1");
const addressLine2 = document.querySelector("#address-2");
// const addressLine2Error = document.querySelector("#error=address-2");
const city = document.querySelector("#town-city");
const cityError = document.querySelector("#error-town-city");
const postCode = document.querySelector("#post-code");
const postCodeError = document.querySelector("#error-post-code");
const country = document.querySelector("#country");
const countryError = document.querySelector("#error-country");
const email = document.querySelector("#email");
const emailError = document.querySelector("#error-email");
const cardNumber = document.querySelector("#card-number");
const cardNumberError = document.querySelector("#error-card-number");
const nameCard = document.querySelector("#name-card");
const nameCardError = document.querySelector("#error-name-card");
const securityCode = document.querySelector("#security-code");
const securityCodeError = document.querySelector("#error-security-code");
const month = document.querySelector("#expiration-date-month");
const year = document.querySelector("#expiration-date-year");
const dateError = document.querySelector("#error-date");
const rememberDetails = document.querySelector("#remember-me");


// creates payment details for next page as well as to save for user
function createPaymentDetails(){
  let details = {
    firstName: "",
    lastName: "",
    addressLine1: "",
    addressLine2: "",
    townCity: "",
    postCode: "",
    country: "",
    email: "",
    cardNumber: "",
    nameCard: "",
    securityCode: "",
    expirationDate:[],
  };

  details.firstName = firstName.value;
  details.lastName = lastName.value;
  details.addressLine1 = addressLine1.value;
  details.addressLine2 = addressLine2.value;
  details.townCity = city.value;
  details.postCode = postCode.value;
  details.country = country.value;
  details.email = email.value;
  details.cardNumber = cardNumber.value;
  details.nameCard = nameCard.value;
  details.securityCode = securityCode.value;
  details.expirationDate = [month.value, year.value];

  return JSON.stringify(details);
}


//---- validating the whole form -----

function validatePaymentDetails(submission){
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
  }else {
    dateError.innerText = "";
  }

  //if all variables true goes to order summary/confirmation 
  if(a && b && c && d && e && f && g && h && i && j && k && l) {
    const paymentDetails = createPaymentDetails();

    if(rememberDetails.checked){
      localStorage.setItem("Payment Details", paymentDetails);
    } else {
      window.sessionStorage.setItem("Payment Details", paymentDetails);
    }

    window.location.href="order_confirmation.html";
  }
};

//on submit run form validation
paymentForm.addEventListener("submit", validatePaymentDetails);