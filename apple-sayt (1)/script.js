let cart = [];
let selectedColor = "Desert Titanium";
let selectedStorage = "128GB";
let selectedPrice = 999;

// Konfigurator ranglarini tanlash
const swatches = document.querySelectorAll('.swatch');
const colorLabel = document.getElementById('selectedColorName');

swatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
        swatches.forEach(s => s.classList.remove('active'));
        swatch.classList.add('active');
        selectedColor = swatch.dataset.color;
        colorLabel.textContent = `Rang: ${selectedColor}`;
    });
});

// Konfigurator xotira hajmini tanlash
const storageBtns = document.querySelectorAll('.storage-btn');
const configPriceEl = document.getElementById('configPrice');

storageBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        storageBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedStorage = btn.dataset.storage;
        selectedPrice = Number(btn.dataset.price);
        configPriceEl.textContent = `$${selectedPrice.toLocaleString()}`;
    });
});

// Konfiguratordan savatga qo'shish
document.getElementById('addConfigToCart').addEventListener('click', () => {
    const title = `iPhone 16 Pro (${selectedColor}, ${selectedStorage})`;
    const img = "https://images.unsplash.com/photo-1726587912121-ea21fcc57ff8?auto=format&fit=crop&w=600&q=80";
    addToCart(title, selectedPrice, img);
});

// Savatni boshqarish
const cartDrawer = document.getElementById('cartDrawer');
const cartOverlay = document.getElementById('cartOverlay');
const openCartBtn = document.getElementById('openCartBtn');
const closeCartBtn = document.getElementById('closeCartBtn');

function openCart() {
    cartDrawer.classList.add('open');
    cartOverlay.classList.add('open');
}

function closeCart() {
    cartDrawer.classList.remove('open');
    cartOverlay.classList.remove('open');
}

openCartBtn.addEventListener('click', openCart);
closeCartBtn.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

function addToCart(name, price, image) {
    cart.push({ id: Date.now(), name, price, image });
    updateCartUI();
    openCart();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

function updateCartUI() {
    const cartItemsEl = document.getElementById('cartItems');
    const cartCountEl = document.getElementById('cartCount');
    const cartTotalEl = document.getElementById('cartTotal');

    cartCountEl.textContent = cart.length;

    if (cart.length === 0) {
        cartItemsEl.innerHTML = '<p class="empty-msg">Savatingiz hozircha bo\'sh.</p>';
        cartTotalEl.textContent = '$0';
        return;
    }

    let total = 0;
    cartItemsEl.innerHTML = cart.map(item => {
        total += item.price;
        return `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <span>$${item.price.toLocaleString()}</span>
                </div>
                <button class="remove-item" onclick="removeFromCart(${item.id})">O'chirish</button>
            </div>
        `;
    }).join('');

    cartTotalEl.textContent = `$${total.toLocaleString()}`;
}

function scrollToConfig() {
    document.getElementById('configurator').scrollIntoView({ behavior: 'smooth' });
}

document.getElementById('checkoutBtn').addEventListener('click', () => {
    if (cart.length === 0) {
        alert("Avval savatga mahsulot qo'shing!");
        return;
    }
    alert("Buyurtmangiz qabul qilindi! Rahmat.");
    cart = [];
    updateCartUI();
    closeCart();
});
