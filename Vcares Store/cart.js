// Load and display cart items from LocalStorage
function renderCart() {
  const cartListContainer = document.getElementById('cart-items-list');
  const subtotalElement = document.getElementById('cart-subtotal');
  const grandTotalElement = document.getElementById('cart-grand-total');

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (!cartListContainer) return;

  if (cart.length === 0) {
    cartListContainer.innerHTML = `
      <div class="empty-cart">
        <p>Your cart is empty.</p>
        <a href="products.html" class="shop-now-btn">Start Shopping</a>
      </div>
    `;
    if (subtotalElement) subtotalElement.innerText = '₦0';
    if (grandTotalElement) grandTotalElement.innerText = '₦0';
    return;
  }

  cartListContainer.innerHTML = '';
  let subtotal = 0;

  cart.forEach((item, index) => {
    let itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    const row = document.createElement('div');
    row.className = 'cart-item';
    row.innerHTML = `
      <div class="cart-item-info">
        <h3>${item.name}</h3>
        <p class="unit-price">₦${item.price.toLocaleString()} each</p>
      </div>
      <div class="cart-item-qty">
        <button onclick="changeQuantity(${index}, -1)">-</button>
        <span>${item.quantity}</span>
        <button onclick="changeQuantity(${index}, 1)">+</button>
      </div>
      <div class="cart-item-total">
        ₦${itemTotal.toLocaleString()}
      </div>
      <button class="remove-btn" onclick="removeItem(${index})">✕</button>
    `;
    cartListContainer.appendChild(row);
  });

  if (subtotalElement) subtotalElement.innerText = `₦${subtotal.toLocaleString()}`;
  if (grandTotalElement) grandTotalElement.innerText = `₦${subtotal.toLocaleString()}`;
}

// Update quantity of an item
function changeQuantity(index, amount) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart[index]) {
    cart[index].quantity += amount;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
  updateCartCount();
}

// Remove an item from cart
function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
  updateCartCount();
}

document.addEventListener('DOMContentLoaded', renderCart);