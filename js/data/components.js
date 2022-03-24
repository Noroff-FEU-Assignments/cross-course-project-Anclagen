// --- Icon Status Updates (cart, account) ---

// updates cart status on pages
export function checkCart(){
  const cartContainer = document.querySelector("#cart");

  //checks if cart exists in local storage, error on parsing undefined on phone/tablet
  if(localStorage.cart === undefined){
    cartContainer.innerHTML = `<img src="images/interface_and_logo/empty_cart_icon_1@2x.png" alt="Cart Empty" class="navigation-icons" /> <span class="desktop-nav">Cart</span>`;
  } else {
    const cart = JSON.parse(localStorage.cart);
    if(localStorage.cart !== null && cart.length !== 0){
      cartContainer.innerHTML = `<img src="images/interface_and_logo/full_cart.png" alt="Full Cart" class="navigation-icons" /> <span class="desktop-nav">Cart</span>`;
    } else {
      cartContainer.innerHTML = `<img src="images/interface_and_logo/empty_cart_icon_1@2x.png" alt="Cart Empty" class="navigation-icons" /> <span class="desktop-nav">Cart</span>`;
    }
  }
}

// --- Input Validations ---

//validates text inputs
export function validatedInputLength(input, length, errorContainer) {
  if (input.value.trim().length > length) {
    errorContainer.innerText = "";
    input.style.border ="2px solid green";
    return true;
  } else {
    input.style.border ="2px solid red";
    errorContainer.innerText = `Your ${input.name} must have a minimum of ${length + 1} characters.`;
  }
}

//validates number only inputs
export function validatedNumberInputLength(input, length, errorContainer){
  const numberRegEx = /^\d+$/;
  const validInput = numberRegEx.test(input.value);
  if(validInput && input.value.trim().length === length){
    errorContainer.innerText = "";
    input.style.border ="2px solid green";
    return true;
  } else {
    errorContainer.innerText = `Please enter a ${length} digit number.`
    input.style.border ="2px solid red";
  }
}

// validate date input

export function validateDateMM(mm){
    if(mm.value.length === 2 && mm.value > 0 && mm.value < 13){
      mm.style.border ="2px solid green";
      return true;
    } else {
      mm.style.border ="2px solid red";
      return false;
    }
}

export function validateDateYY(yy){
  if(yy.value.length === 2 && yy.value > 21){
    yy.style.border ="2px solid green";
    return true;
  } else {
    yy.style.border ="2px solid red";
    return false;
  }
}

//validate emails
export function validateEmailInput(email, errorContainer) {
  const emailRegEx = /^([a-z0-9_\.\+-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  const validateEmail = emailRegEx.test(email.value);
  if (validateEmail){ 
    errorContainer.innerText = "";
    email.style.border ="2px solid green";
    return true;
  } else {
    errorContainer.innerText = `Please enter a valid email address`;
    email.style.border ="2px solid red";
  }
}

// --- Payment details and account details page ---

//function to prefill form with existing user data, probably a tidier way to do this.
export function prefillFormFields(storage, firstName, lastName, addressLine1, addressLine2, city, postCode, country, email,cardNumber, nameCard, securityCode, month, year){
  const userDetails = JSON.parse(storage)
  firstName.value = userDetails.firstName;
  lastName.value = userDetails.lastName;
  addressLine1.value = userDetails.addressLine1;
  addressLine2.value = userDetails.addressLine2;
  city.value = userDetails.townCity;
  postCode.value = userDetails.postCode;
  country.value = userDetails.country;
  email.value = userDetails.email;
  //probably not good security to store card info in local storage
  cardNumber.value = userDetails.cardNumber;
  nameCard.value = userDetails.nameCard;
  securityCode.value = userDetails.securityCode;
  month.value = userDetails.expirationDate[0];
  year.value = userDetails.expirationDate[1];
};

// creates payment details for next page as well as to save for user
export function createPaymentDetails(firstName, lastName, addressLine1, addressLine2, city, postCode, country, email,cardNumber, nameCard, securityCode, month, year){
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
};

// --- Content Creators ---

export function createAddressText(){
  
}