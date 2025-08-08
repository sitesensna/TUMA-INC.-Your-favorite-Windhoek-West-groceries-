// INDEX script  INDEX scriptINDEX scriptINDEX scriptINDEX scriptINDEX scriptINDEX scriptINDEX scriptINDEX script
// INDEX script  INDEX scriptINDEX scriptINDEX scriptINDEX scriptINDEX scriptINDEX scriptINDEX scriptINDEX script
// INDEX script  INDEX scriptINDEX scriptINDEX scriptINDEX scriptINDEX scriptINDEX scriptINDEX scriptINDEX  script
// INDEX script  INDEX scriptINDEX scriptINDEX scriptINDEX scriptINDEX scriptINDEX scriptINDEX scriptINDEX


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



// CART script  CART scriptCART scriptCART scriptCART scriptCART scriptCART scriptCART scriptCART scr
// CART script  CART scriptCART scriptCART scriptCART scriptCART scriptCART scriptCART scriptCART scr
// CART script  CART scriptCART scriptCART scriptCART scriptCART scriptCART scriptCART scriptCART scr
// CART script  CART scriptCART scriptCART scriptCART scriptCART scriptCART scriptCART scriptCART scr
// CART script  CART scriptCART scriptCART scriptCART scriptCART scriptCART scriptCART scriptCART scr

    // Cart data
    let cart = JSON.parse(localStorage.getItem('tumaCart')) || [];
    let deliveryOption = 'standard';
    let deliveryFee = 15;
    let paymentMethod = 'cod';

    // DOM elements
    const cartItemsList = document.getElementById('cartItemsList');
    const emptyCartDiv = document.getElementById('emptyCart');
    const cartItemsDiv = document.getElementById('cartItems');
    const itemCountSpan = document.getElementById('itemCount');
    const subtotalSpan = document.getElementById('subtotal');
    const deliveryFeeSpan = document.getElementById('deliveryFee');
    const totalSpan = document.getElementById('total');
    const placeOrderBtn = document.getElementById('placeOrderBtn');
    const deliveryAddressInput = document.getElementById('deliveryAddress');
    const phoneNumberInput = document.getElementById('phoneNumber');
    const deliveryInstructionsInput = document.getElementById('deliveryInstructions');

    // Initialize the cart page
    function initCartPage() {
        renderCartItems();
        updateOrderSummary();
        selectDeliveryOption('standard');
        selectPaymentMethod('cod');
        checkOrderButton();
        
        // Load saved address and phone if available
        const savedAddress = localStorage.getItem('tumaDeliveryAddress');
        const savedPhone = localStorage.getItem('tumaPhoneNumber');
        if (savedAddress) deliveryAddressInput.value = savedAddress;
        if (savedPhone) phoneNumberInput.value = savedPhone;
        
        // Add event listeners
        deliveryAddressInput.addEventListener('input', checkOrderButton);
        phoneNumberInput.addEventListener('input', checkOrderButton);
    }

    // Render cart items
    function renderCartItems() {
        if (cart.length === 0) {
            emptyCartDiv.classList.remove('hidden');
            cartItemsDiv.classList.add('hidden');
            return;
        }

        emptyCartDiv.classList.add('hidden');
        cartItemsDiv.classList.remove('hidden');
        cartItemsList.innerHTML = '';

        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.className = 'py-4 cart-item transition duration-200';
            li.innerHTML = `
                <div class="flex items-start justify-between">
                    <div class="flex items-start gap-4">
                        <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-lg">
                        <div>
                            <h3 class="font-semibold">${item.name}</h3>
                            <p class="text-green-600 font-bold">N$ ${item.price.toFixed(2)}</p>
                            <div class="flex items-center mt-2">
                                <button onclick="updateQuantity(${index}, ${item.quantity - 1})" class="quantity-btn bg-gray-100 hover:bg-gray-200">
                                    <i class="fas fa-minus text-xs"></i>
                                </button>
                                <span class="mx-3 w-8 text-center">${item.quantity}</span>
                                <button onclick="updateQuantity(${index}, ${item.quantity + 1})" class="quantity-btn bg-gray-100 hover:bg-gray-200">
                                    <i class="fas fa-plus text-xs"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="text-right">
                        <p class="font-semibold">N$ ${(item.price * item.quantity).toFixed(2)}</p>
                        <button onclick="removeItem(${index})" class="text-red-500 hover:text-red-700 mt-2">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
            `;
            cartItemsList.appendChild(li);
        });
    }

    // Update item quantity
    function updateQuantity(index, newQuantity) {
        if (newQuantity < 1) {
            removeItem(index);
            return;
        }
        
        cart[index].quantity = newQuantity;
        saveCart();
        renderCartItems();
        updateOrderSummary();
    }

    // Remove item from cart
    function removeItem(index) {
        cart.splice(index, 1);
        saveCart();
        renderCartItems();
        updateOrderSummary();
    }

    // Clear entire cart
    function clearCart() {
        if (confirm('Are you sure you want to clear your cart?')) {
            cart = [];
            saveCart();
            renderCartItems();
            updateOrderSummary();
        }
    }


    function updateQuantity(index, newQuantity) {
  if (newQuantity < 1) {
    removeItem(index);
    return;
  }
  cart[index].quantity = newQuantity;
  saveCart();
  renderCartItems();
  updateOrderSummary();
  updateCartCount();    // <-- Add this
}

function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  renderCartItems();
  updateOrderSummary();
  updateCartCount();    // <-- Add this
}

function clearCart() {
  if (confirm('Are you sure you want to clear your cart?')) {
    cart = [];
    saveCart();
    renderCartItems();
    updateOrderSummary();
    updateCartCount();   // <-- Add this
  }
}


    // Select delivery option
    function selectDeliveryOption(option) {
        deliveryOption = option;
        deliveryFee = option === 'standard' ? 15 : 25;
        
        // Update UI
        document.querySelectorAll('.delivery-option').forEach(el => {
            el.classList.remove('selected');
            el.querySelector('.bg-green-500').classList.add('hidden');
        });
        
        const selectedOption = document.querySelector(`.delivery-option[onclick="selectDeliveryOption('${option}')"]`);
        selectedOption.classList.add('selected');
        selectedOption.querySelector('.bg-green-500').classList.remove('hidden');
        
        // Update order summary
        deliveryFeeSpan.textContent = deliveryFee.toFixed(2);
        updateOrderSummary();
    }

    // Select payment method
    function selectPaymentMethod(method) {
        paymentMethod = method;
        
        // Update UI
        document.querySelectorAll('.payment-option').forEach(el => {
            el.classList.remove('selected');
            el.querySelector('.bg-green-500').classList.add('hidden');
        });
        
        const selectedOption = document.querySelector(`.payment-option[onclick="selectPaymentMethod('${method}')"]`);
        selectedOption.classList.add('selected');
        selectedOption.querySelector('.bg-green-500').classList.remove('hidden');
    }

    // Update order summary
    function updateOrderSummary() {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const total = subtotal + deliveryFee;
        
        itemCountSpan.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        subtotalSpan.textContent = subtotal.toFixed(2);
        totalSpan.textContent = total.toFixed(2);
        
        checkOrderButton();
    }

    // Check if order button should be enabled
  function checkOrderButton() {
  const hasItems = cart.length > 0;
  const hasAddress = deliveryAddressInput.value.trim() !== '';
  const hasPhone = phoneNumberInput.value.trim() !== '';
  
  const checkoutBtn = document.getElementById('checkoutBtn');
  checkoutBtn.disabled = !(hasItems && hasAddress && hasPhone);
}


    // Place order via WhatsApp
   function goToCheckout() {
  // Save address and phone to localStorage before going
  localStorage.setItem('tumaDeliveryAddress', deliveryAddressInput.value.trim());
  localStorage.setItem('tumaPhoneNumber', phoneNumberInput.value.trim());
  localStorage.setItem('tumaDeliveryInstructions', deliveryInstructionsInput.value.trim() || '');
  localStorage.setItem('tumaPaymentMethod', paymentMethod);
  localStorage.setItem('tumaDeliveryOption', deliveryOption);

  // Navigate to checkout page
  window.location.href = 'checkout.html';
}

        // Prepare order details
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const total = subtotal + deliveryFee;
        
        // Format items list
        const itemsList = cart.map(item => 
            `➡ ${item.name} (${item.quantity}x) - N$${(item.price * item.quantity).toFixed(2)}`
        ).join('\n');
        
        // Prepare WhatsApp message
        const message = `*TUMA Grocery Order*\n\n` +
            `*Items:*\n${itemsList}\n\n` +
            `*Subtotal:* N$${subtotal.toFixed(2)}\n` +
            `*Delivery Fee (${deliveryOption === 'standard' ? 'Standard' : 'Express'}):* N$${deliveryFee.toFixed(2)}\n` +
            `*Total:* N$${total.toFixed(2)}\n\n` +
            `*Delivery Address:*\n${deliveryAddressInput.value.trim()}\n\n` +
            `*Contact Number:* ${phoneNumberInput.value.trim()}\n\n` +
            `*Delivery Instructions:*\n${deliveryInstructionsInput.value.trim() || 'None'}\n\n` +
            `*Payment Method:* ${paymentMethod === 'cod' ? 'Cash on Delivery' : 'Mobile Payment'}`;
        
        // Encode and open WhatsApp
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/264816501070?text=${encodedMessage}`, '_blank');
    

    // Save cart to localStorage
    function saveCart() {
        localStorage.setItem('tumaCart', JSON.stringify(cart));
    }

    // Initialize the page
    initCartPage();




//CHECKOUT script  CHECKOUT scriptCHECKOUT scriptCHECKOUT scriptCHECKOUT scriptCHECKOUT scriptCHECKOUT script
// CHECKOUT script  CHECKOUT scriptCHECKOUT scriptCHECKOUT scriptCHECKOUT scriptCHECKOUT                        
// CHECKOUT script  CHECKOUT scriptCHECKOUT scriptCHECKOUT scriptCHECKOUT scriptCHECKOUT scriptCHECKOUT script
// CHECKOUT script  CHECKOUT scriptCHECKOUT scriptCHECKOUT scriptCHECKOUT scriptCHECKOUT


    

