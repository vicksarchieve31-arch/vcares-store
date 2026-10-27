// Sample catalog database of tech products
const products = [
  {
    id: 1,
    name: 'Apple iPhone 15 Pro',
    category: 'phones',
    price: 1250000,
    icon: '📱',
    desc: 'Titanium design, A17 Pro chip, Pro camera system.'
  },
  {
    id: 2,
    name: 'Wireless Noise-Canceling Headphones',
    category: 'audio',
    price: 45000,
    icon: '🎧',
    desc: 'High-fidelity audio with active noise cancellation.'
  },
  {
    id: 3,
    name: 'Smartwatch Series X',
    category: 'wearables',
    price: 35000,
    icon: '⌚',
    desc: 'Fitness tracking, heart monitoring, AMOLED display.'
  },
  {
    id: 4,
    name: 'Mechanical Gaming Keyboard',
    category: 'accessories',
    price: 28000,
    icon: '⌨️',
    desc: 'RGB backlit mechanical keys with fast response times.'
  },
  {
    id: 5,
    name: '4K Ultra HD Action Camera',
    category: 'cameras',
    price: 85000,
    icon: '📷',
    desc: 'Waterproof 4K recording with image stabilization.'
  },
  {
    id: 6,
    name: 'Wireless Earbuds Pro',
    category: 'audio',
    price: 22000,
    icon: '🎙️',
    desc: 'Crystal clear calls, deep bass, 24hr battery life.'
  }
];

// Render products into the HTML grid
function displayProducts(items) {
  const grid = document.getElementById('catalog-grid');
  if (!grid) return;

  grid.innerHTML = '';

  if (items.length === 0) {
    grid.innerHTML = '<p class="no-products">No products found matching your search.</p>';
    return;
  }

  items.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="product-image">${product.icon}</div>
      <h3>${product.name}</h3>
      <p class="desc">${product.desc}</p>
      <p class="price">₦${product.price.toLocaleString()}</p>
      <button onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
    `;
    grid.appendChild(card);
  });
}

// Filter products by category tab
function filterCategory(categoryName, element) {
  // Update active status on filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  if (element) element.classList.add('active');

  if (categoryName === 'all') {
    displayProducts(products);
  } else {
    const filtered = products.filter(p => p.category === categoryName);
    displayProducts(filtered);
  }
}

// Search bar filter function
function searchProducts() {
  const query = document.getElementById('search-input').value.toLowerCase();
  const matched = products.filter(p => 
    p.name.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query)
  );
  displayProducts(matched);
}

// Load all products when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  displayProducts(products);
});