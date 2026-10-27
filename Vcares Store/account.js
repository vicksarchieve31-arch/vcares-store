// Check auth status on DOM load
document.addEventListener('DOMContentLoaded', () => {
  checkAuthStatus();

  // Attach submit listeners directly to forms
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');

  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }

  if (registerForm) {
    registerForm.addEventListener('submit', handleRegister);
  }
});

// Check auth status
function checkAuthStatus() {
  const authContainer = document.getElementById('auth-container');
  const dashboardContainer = document.getElementById('dashboard-container');
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  if (currentUser) {
    if (authContainer) authContainer.style.display = 'none';
    if (dashboardContainer) dashboardContainer.style.display = 'block';
    renderDashboard(currentUser);
  } else {
    if (authContainer) authContainer.style.display = 'block';
    if (dashboardContainer) dashboardContainer.style.display = 'none';
    switchAuthTab('login'); // Default to login tab
  }
}

// Switch between Sign In and Register tabs
function switchAuthTab(tab) {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const tabLogin = document.getElementById('tab-login');
  const tabRegister = document.getElementById('tab-register');

  if (tab === 'login') {
    if (loginForm) loginForm.style.display = 'block';
    if (registerForm) registerForm.style.display = 'none';
    if (tabLogin) tabLogin.classList.add('active');
    if (tabRegister) tabRegister.classList.remove('active');
  } else {
    if (loginForm) loginForm.style.display = 'none';
    if (registerForm) registerForm.style.display = 'block';
    if (tabLogin) tabLogin.classList.remove('active');
    if (tabRegister) tabRegister.classList.add('active');
  }
}

// Handle Registration
function handleRegister(event) {
  event.preventDefault();

  const nameInput = document.getElementById('reg-name');
  const emailInput = document.getElementById('reg-email');
  const phoneInput = document.getElementById('reg-phone');
  const passwordInput = document.getElementById('reg-password');

  if (!nameInput || !emailInput || !passwordInput) return;

  const name = nameInput.value.trim();
  const email = emailInput.value.trim().toLowerCase();
  const phone = phoneInput ? phoneInput.value.trim() : '';
  const password = passwordInput.value;

  let users = JSON.parse(localStorage.getItem('registeredUsers')) || [];

  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    alert('An account with this email already exists. Switching to Sign In.');
    switchAuthTab('login');
    return;
  }

  const newUser = { name, email, phone, password };
  users.push(newUser);

  localStorage.setItem('registeredUsers', JSON.stringify(users));
  localStorage.setItem('currentUser', JSON.stringify(newUser));

  alert(`Account created successfully! Welcome to VCares, ${name}.`);
  checkAuthStatus();
}

// Handle Sign In
function handleLogin(event) {
  event.preventDefault();

  const emailInput = document.getElementById('login-email');
  const passwordInput = document.getElementById('login-password');

  if (!emailInput || !passwordInput) return;

  const email = emailInput.value.trim().toLowerCase();
  const password = passwordInput.value;

  let users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
  const foundUser = users.find(u => u.email === email && u.password === password);

  if (foundUser) {
    localStorage.setItem('currentUser', JSON.stringify(foundUser));
    checkAuthStatus();
  } else {
    alert('Invalid email or password. If you do not have an account yet, click "Create Account" to register first.');
  }
}

// Handle Sign Out
function handleLogout() {
  localStorage.removeItem('currentUser');
  checkAuthStatus();
}

// Render Dashboard Data
function renderDashboard(user) {
  const accountInfoContainer = document.getElementById('account-info');
  const orderHistoryContainer = document.getElementById('order-history');

  if (accountInfoContainer) {
    accountInfoContainer.innerHTML = `
      <p><strong>Name:</strong> ${user.name}</p>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Phone:</strong> ${user.phone || 'N/A'}</p>
    `;
  }

  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  if (orderHistoryContainer) {
    if (orders.length === 0) {
      orderHistoryContainer.innerHTML = `
        <p class="empty-msg">You have no orders yet.</p>
        <a href="products.html" class="shop-now-btn">Start Shopping</a>
      `;
    } else {
      orderHistoryContainer.innerHTML = '';
      orders.forEach((order, index) => {
        const orderCard = document.createElement('div');
        orderCard.className = 'order-item-card';
        orderCard.innerHTML = `
          <div class="order-header">
            <strong>Order #${index + 1001}</strong>
            <span class="order-date">${order.date}</span>
          </div>
          <p class="order-total">Total: <strong>₦${order.total.toLocaleString()}</strong> (${order.paymentMethod})</p>
          <ul class="order-products-list">
            ${`order.items.map(item => <li>${'item.name'} x${'item.quantity'} </li>).join('')`}
          </ul>
        `;
        orderHistoryContainer.appendChild(orderCard);
      });
    }
  }
}