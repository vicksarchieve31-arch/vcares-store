function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  let cartBadge = document.getElementById('cart-count');
  if (cartBadge) {
    cartBadge.innerText = totalCount;
  }
}

function addToCart(productName, productPrice) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  let existingItem = cart.find(item => item.name === productName);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name: productName,
      price: productPrice,
      quantity: 1
    });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();

  alert(productName + " added to cart!");
}

document.addEventListener('DOMContentLoaded', updateCartCount);