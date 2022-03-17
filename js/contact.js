
const contactForm = document.querySelector("#contact-form");
const fullname = document.querySelector("#fullname");
const fullnameError = document.querySelector(".error-name");
const email = document.querySelector("#email");
const emailError = document.querySelector(".error-email");
const message = document.querySelector("#message");
const messageError = document.querySelector(".error-message");
const orderNumber = document.querySelector("#order-number");
const orderNumberError = document.querySelector(".order-number-message");
const successContainer = document.querySelector(".success");

//check length without spaces, and generate error if validation fails
function validatedInputLength(input, length) {
  if (input.value.trim().length > length) {
    // error.innerHTML = "";
    input.style.border ="2px solid green";
    return true;
  } else {
    // error.innerHTML = `Your ${input.name} must have a minium of ${length + 1} characters.`;
    input.style.border ="2px solid red";
  }
}

function validatedNumberInputLength(input, length){
  const numberRegEx = /^\d+$/;
  const validInput = numberRegEx.test(input.value);
  if(validInput && input.value.trim().length === length){
    input.style.border ="2px solid green";
    return true;
  } else {
    input.style.border ="2px solid red";
  }
}

//validate email, generate errors if validation fails, novalidated added to form, email input cause problems with the js
function validateEmailInput(email) {
  const emailRegEx = /^([a-z0-9_\.\+-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  const validateEmail = emailRegEx.test(email.value);
  if (validateEmail){ 
    // emailError.innerHTML = "";
    email.style.border ="2px solid green";
    return true;
  } else {
    // emailError.innerHTML = `Please enter a valid email address`;
    email.style.border ="2px solid red";
  }
}

//validate form
function validateContactForm(submission){
  submission.preventDefault();

  //clear success container if resubmitted wrong, remove main class to avoid green box
  successContainer.innerHTML = "";
  successContainer.classList.remove("main-item");

  //variables assigned true if they pass, and errors generated on fail.
  const a = validatedInputLength(fullname, 0);
  const b = validatedInputLength(message, 29);
  const c = validateEmailInput(email);
  const d = validatedNumberInputLength(orderNumber, 12);

  //if all variables true form submitted and success div displayed 
  if(a && b && c && d) {
    successContainer.classList.add("main-item");
    successContainer.innerHTML = "<p>Success, your query has been submitted.</p>"
    //scrolls to success container on submit.
    successContainer.scrollIntoView();
    contactForm.reset();
  }
}

//on submit run form validation
contactForm.addEventListener("submit", validateContactForm);