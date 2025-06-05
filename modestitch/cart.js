const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// ✅ Define updateCart globally
function updateCart() {
  cart = JSON.parse(localStorage.getItem('cart')) || [];
  cartItemsContainer.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img src="${item.image}" />
      <div class="item-info">
        <h3>${item.name}</h3>
        <p>₹${item.price} x ${item.quantity}</p>
      </div>
      <div class="item-actions">
        <input type="number" value="${item.quantity}" min="1" data-index="${index}" />
        <br/><br/>
        <button class="remove-btn" data-index="${index}">Remove</button>
      </div>
    `;
    cartItemsContainer.appendChild(div);
  });

  cartTotal.textContent = `Total: ₹${total}`;
}

// ✅ Define remove function globally
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCart();
}

// ✅ Run on load
window.onload = updateCart;

// ✅ Update quantity
document.addEventListener('change', function (e) {
  if (e.target.type === 'number') {
    const index = e.target.dataset.index;
    const value = parseInt(e.target.value);
    if (value > 0) {
      cart[index].quantity = value;
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCart();
    }
  }
});

// ✅ Event delegation for remove button
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('remove-btn')) {
    const index = e.target.dataset.index;
    removeItem(index);
  }
});
