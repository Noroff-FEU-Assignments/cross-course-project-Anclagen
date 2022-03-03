export function checkCart(){
  if(localStorage.cart !== null){
    document.querySelector("#cart").innerHTML = `<img src="images/interface_and_logo/full_cart.png" alt="Full Cart" class="navigation-icons" /> <span class="desktop-nav">Cart</span>`
  }
}