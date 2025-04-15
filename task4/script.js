// script.js

// DOM Elements
const productList = document.getElementById('product-list');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const checkoutForm = document.getElementById('checkout-form');
const receiptSection = document.getElementById('receipt');
const receiptContent = document.getElementById('receipt-content');
const printReceiptBtn = document.getElementById('print-receipt');
const themeToggle = document.getElementById('theme-toggle');

// Initialize cart from LocalStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Render cart items
function renderCart() {
  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
    cartItems.appendChild(li);

    total += item.price * item.quantity;
  });

  cartTotal.textContent = total.toFixed(2);
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Add product to cart
productList.addEventListener('click', (e) => {
  if (e.target.classList.contains('add-to-cart')) {
    const product = e.target.parentElement;
    const name = product.dataset.name;
    const price = parseFloat(product.dataset.price);

    const existingItem = cart.find((item) => item.name === name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ name, price, quantity: 1 });
    }

    renderCart();
  }
});

// Show checkout form
checkoutBtn.addEventListener('click', () => {
  checkoutForm.classList.remove('hidden');
});

// Handle checkout submission
document.getElementById('checkout').addEventListener('submit', (e) => {
  e.preventDefault();

  const customerName = document.getElementById('customer-name').value;
  if (!customerName) {
    alert('Please enter customer name.');
    return;
  }

  // Generate receipt
  const receipt = `Customer: ${customerName}\n\nItems:\n${cart
    .map((item) => `${item.name} - $${item.price} x ${item.quantity}`)
    .join('\n')}\n\nTotal: $${cartTotal.textContent}`;

  receiptContent.textContent = receipt;
  checkoutForm.classList.add('hidden');
  receiptSection.classList.remove('hidden');

  // Clear cart
  cart = [];
  renderCart();
});

// Print receipt
printReceiptBtn.addEventListener('click', () => {
  window.print();
});

// Toggle dark/light mode
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// Initial render
renderCart();