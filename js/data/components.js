export function checkCart(){
  const cart = JSON.parse(localStorage.cart);
  console.log(cart)
  if(localStorage.cart !== null && cart.length !== 0){
    document.querySelector("#cart").innerHTML = `<img src="images/interface_and_logo/full_cart.png" alt="Full Cart" class="navigation-icons" /> <span class="desktop-nav">Cart</span>`
  } else {
    document.querySelector("#cart").innerHTML = `<img src="images/interface_and_logo/empty_cart_icon_1@2x.png" alt="Cart Empty" class="navigation-icons" /> <span class="desktop-nav">Cart</span>`
  }
}