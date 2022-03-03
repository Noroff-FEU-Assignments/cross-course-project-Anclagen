import products from "./data/data.js";

const cartItemsContainer = document.querySelector(".cart-items");
const subtotalContainer = document.querySelector(".subtotal");
const vatContainer = document.querySelector(".vat");
const totalPriceContainer = document.querySelector(".total");
let cartItems = JSON.parse(localStorage.getItem("cart"));

function removeItem(){
  // let index = this.index;
  // cartItems.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cartItems));
  //createCartHtml();
}

function createCartHtml(){
  cartItemsContainer.innerHTML = "";
  let totalPrice = 0;

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

    cartItemsContainer.innerHTML += `<div class="cart-product-item-grid">
                                      <div><img src=${imageSrc} alt=${imageAlt} /></div>
                                      <div>
                                        <h2>${brand} -${name}</h2>
                                        <p>Size: ${size}</p>
                                        <p>Colour: ${colour}</p>
                                        <p>Price: ${price}</p>
                                        <p>
                                          Quantity:
                                          <input type="number" value="${quantity}" />
                                          <button class="remove-button btn${i}" index="${i}">Remove</button>
                                        </p>
                                      </div>
                                    </div>
                                    <hr />`
    let btn = `btn${i}`
    let removeBtn = document.getElementsByClassName(btn);
    //removeBtn.addEventListener("click", removeItem());
    totalPrice += (price * quantity);
  }
  let subtotal = totalPrice * 0.875;
  let vat = totalPrice * 0.125;

  subtotalContainer.innerHTML = "£" + subtotal.toFixed(2);
  vatContainer.innerHTML = "£" + vat.toFixed(2);
  totalPriceContainer.innerHTML = "£" + totalPrice;

}

createCartHtml();




