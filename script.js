// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-button');
const mobileMenu = document.getElementById('mobileMenu');

// Ensure mobile menu is hidden on load
document.addEventListener('DOMContentLoaded', () => {
  mobileMenu.style.display = 'none';
  mobileMenu.setAttribute('aria-hidden', 'true');
  mobileMenuBtn.setAttribute('aria-expanded', 'false');
});

mobileMenuBtn.addEventListener('click', () => {
  const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
  if (isExpanded) {
    mobileMenu.style.display = 'none';
  } else {
    mobileMenu.style.display = 'flex';
  }
  mobileMenuBtn.setAttribute('aria-expanded', (!isExpanded).toString());
  mobileMenu.setAttribute('aria-hidden', isExpanded.toString());
});

// Cart count from localStorage
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('tumaCart')) || [];
  const count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const cartCountElem = document.getElementById('navbarCartCount');
  cartCountElem.textContent = count;
}

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', updateCartCount);

// Sample products data
const sampleProducts = [
  { id: 1, name: "Tomatoes", category: "Fresh Produce", price: 25.00, unit: "kg", image: "https://images.unsplash.com/photo-1594282418426-62d3e2cb5f3b" },
  { id: 2, name: "Chicken Breast", category: "Meat & Proteins", price: 85.00, unit: "kg", image: "https://images.unsplash.com/photo-1604977046800-87efac5d1ff7" },
  { id: 3, name: "White Bread", category: "Staples & Dry Goods", price: 12.50, unit: "loaf", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff" },
  { id: 4, name: "Coca-Cola 2L", category: "Drinks & Snacks", price: 22.00, unit: "bottle", image: "https://images.unsplash.com/photo-1554866585-cd94860890b7" },
  { id: 5, name: "Toilet Paper", category: "Household Essentials", price: 45.00, unit: "4-pack", image: "https://images.unsplash.com/photo-1583947581924-a6d4a5e63e67" }
];

// Add to cart function
function addToCart(productId, quantity = 1) {
  const cart = JSON.parse(localStorage.getItem('tumaCart')) || [];
  const product = sampleProducts.find(p => p.id === productId);
  if (!product) return;
  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, quantity, image: product.image });
  }
  localStorage.setItem('tumaCart', JSON.stringify(cart));
  updateCartCount();

  // Show added to cart notification
  const notification = document.createElement('div');
  notification.className = 'cart-notification';
  notification.textContent = `${product.name} added to cart!`;
  document.body.appendChild(notification);
  setTimeout(() => notification.classList.add('show'), 10);
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => document.body.removeChild(notification), 300);
  }, 3000);
}
