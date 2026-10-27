// Display order summary and calculate totals on checkout page
function loadCheckoutSummary() {
  const checkoutItemsContainer = document.getElementById('checkout-items-summary');
  const subtotalElement = document.getElementById('checkout-subtotal');
  const grandTotalElement = document.getElementById('checkout-grand-total');

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (!checkoutItemsContainer) return;

  if (cart.length === 0) {
    checkoutItemsContainer.innerHTML = '<p class="empty-msg">Your cart is empty. <a href="products.html">Browse products</a></p>';
    if (subtotalElement) subtotalElement.innerText = '₦0';
    if (grandTotalElement) grandTotalElement.innerText = '₦0';
    return;
  }

  checkoutItemsContainer.innerHTML = '';
  let subtotal = 0;

  cart.forEach(item => {
    let itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    const row = document.createElement('div');
    row.className = 'checkout-item-row';
    row.innerHTML = `
      <span>${item.name} <strong>x${item.quantity}</strong></span>
      <span>₦${itemTotal.toLocaleString()}</span>
    `;
    checkoutItemsContainer.appendChild(row);
  });

  if (subtotalElement) subtotalElement.innerText = `₦${subtotal.toLocaleString()}`;
  if (grandTotalElement) grandTotalElement.innerText = `₦${subtotal.toLocaleString()}`;
}

// Handle form submission and place order
function handleCheckout(event) {
  event.preventDefault();

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart.length === 0) {
    alert('Your cart is empty! Add products before checking out.');
    return;
  }

  const fullName = document.getElementById('full-name').value;
  const phone = document.getElementById('phone-number').value;
  const address = document.getElementById('delivery-address').value;
  const paymentMethod = document.querySelector('input[name="payment"]:checked').value;

  if (!fullName || !phone || !address) {
    alert('Please fill out all delivery details.');
    return;
  }

  // Clear cart after successful order placement
  localStorage.removeItem('cart');
  
  alert(`Thank you for your order, ${fullName}! Your order has been placed successfully via ${paymentMethod}.We will contact you shortly on ${phone}.`);
  
  // Redirect back to home page
  window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', loadCheckoutSummary);