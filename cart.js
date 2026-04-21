// wwwroot/js/cart.js
const CART_KEY = 'cartItems';

function getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartBadge();
}

function updateCartBadge() {
    const badge = document.querySelector('.badge');
    if (badge) {
        const count = getCart().reduce((sum, item) => sum + item.quantity, 0);
        badge.textContent = count;
    }
}

function addToCart(id, name, price, image) {
    let cart = getCart();
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ id, name, price: parseFloat(price), image, quantity: 1 });
    }

    saveCart(cart);
    alert(`${name} a fost adăugat în coș!`);
}

function updateQuantity(index, change) {
    let cart = getCart();
    if (index < 0 || index >= cart.length) return;

    cart[index].quantity = Math.max(1, cart[index].quantity + change);
    saveCart(cart);
    renderCart();
}

function removeItem(index) {
    let cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    renderCart();
}

function renderCart() {
    const container = document.getElementById('cart-items');
    if (!container) return;

    const cart = getCart();
    container.innerHTML = '';

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="text-center py-5">
                <i class="fas fa-shopping-cart fa-5x text-muted mb-4"></i>
                <h3 id="empty-cart-msg">Coșul tău este gol</h3>
                <a href="index.html" class="btn btn-primary mt-3">Începe cumpărăturile</a>
            </div>`;
        updateTotal(0);
        return;
    }

    let subtotal = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        container.innerHTML += `
            <div class="cart-item p-3 mb-3 d-flex align-items-center">
                <img src="${item.image}" class="me-3" style="width:90px;height:90px;object-fit:cover;border-radius:8px;">
                <div class="flex-grow-1">
                    <h5>${item.name}</h5>
                    <p class="text-primary fw-bold">${item.price.toFixed(2)} lei</p>
                </div>
                <div class="d-flex align-items-center mx-4">
                    <button class="btn btn-outline-secondary btn-sm" onclick="updateQuantity(${index}, -1)">–</button>
                    <span class="mx-3 fw-bold">${item.quantity}</span>
                    <button class="btn btn-outline-secondary btn-sm" onclick="updateQuantity(${index}, 1)">+</button>
                </div>
                <div class="text-end">
                    <p class="fw-bold">${itemTotal.toFixed(2)} lei</p>
                    <a href="#" class="text-danger" onclick="removeItem(${index}); return false;">
                        <i class="fas fa-trash-alt"></i>
                    </a>
                </div>
            </div>`;
    });

    updateTotal(subtotal);  
}

function updateTotal(subtotal) {
    const cart = getCart();

    // === Actualizează numărul de produse ===
    const itemCountEl = document.getElementById('item-count');
    if (itemCountEl) {
        itemCountEl.textContent = cart.length;
    }

    // === Actualizează subtotal ===
    const subtotalEl = document.getElementById('subtotal');
    if (subtotalEl) {
        subtotalEl.textContent = subtotal.toFixed(2) + ' lei';
    }

    // === Actualizează totalul final ===
    const totalEl = document.getElementById('total');
    if (totalEl) {
        totalEl.textContent = subtotal.toFixed(2) + ' lei';
    }
}

// Inițializare
document.addEventListener('DOMContentLoaded', () => {
    renderCart();
    updateCartBadge();
});