let cart = document.querySelectorAll(".add-to-cart")

let cartItem = [];

cart.forEach((button) => {
    button.addEventListener('click', () => {
        console.log("updating cart")
    })
})