// ===== Product Data =====
const products = [
    {
        id: 1,
        name: 'iosسماعات بلوتوث',
        category: 'electronics',
        price: 299,
        oldPrice: 399,
        description: 'سماعات لاسلكية عالية الجودة',
        icon: '🎧',
        rating: 2.5
    },
    {
        id: 2,
        name: 'شاحن سريع',
        category: 'electronics',
        price: 149,
        oldPrice: 199,
        description: 'شاحن سريع 65W',
        icon: '🔌',
        rating: 4.5
    },
    {
        id: 3,
        name: 'كابل USB-C',
        category: 'electronics',
        price: 49,
        oldPrice: 79,
        description: 'كابل عالي السرعة',
        icon: '🔗',
        rating: 4.3
    },
    {
        id: 4,
        name: 'حقيبة يد',
        category: 'fashion',
        price: 199,
        oldPrice: 299,
        description: 'حقيبة جلدية فاخرة',
        icon: '👜',
        rating: 4.6
    },
    {
        id: 5,
        name: 'ساعة ذكية',
        category: 'electronics',
        price: 599,
        oldPrice: 799,
        description: 'ساعة ذكية بشاشة AMOLED',
        icon: '⌚',
        rating: 4.7
    },
    {
        id: 6,
        name: 'حذاء رياضي',
        category: 'fashion',
        price: 349,
        oldPrice: 499,
        description: 'حذاء رياضي مريح',
        icon: '👟',
        rating: 4.4
    },
    {
        id: 7,
        name: 'مصباح ذكي',
        category: 'home',
        price: 179,
        oldPrice: 249,
        description: 'مصباح LED ذكي',
        icon: '💡',
        rating: 4.5
    },
    {
        id: 8,
        name: 'وسادة',
        category: 'home',
        price: 129,
        oldPrice: 179,
        description: 'وسادة مريحة من الذاكرة',
        icon: '🛏️',
        rating: 4.2
    },
    {
        id: 9,
        name: 'ستارة',
        category: 'home',
        price: 249,
        oldPrice: 349,
        description: 'ستارة عازلة للضوء',
        icon: '🪟',
        rating: 4.3
    },
    {
        id: 10,
        name: 'قميص',
        category: 'fashion',
        price: 99,
        oldPrice: 149,
        description: 'قميص قطني مريح',
        icon: '👕',
        rating: 4.1
    },
    {
        id: 11,
        name: 'بطارية خارجية',
        category: 'electronics',
        price: 199,
        oldPrice: 279,
        description: 'بطارية 20000 mAh',
        icon: '🔋',
        rating: 4.6
    },
    {
        id: 12,
        name: 'سجادة',
        category: 'home',
        price: 399,
        oldPrice: 599,
        description: 'سجادة فارسية',
        icon: '🧶',
        rating: 4.4
    }
];

// ===== Shopping Cart =====
let cart = [];

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartUI();
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// ===== Initialize Page =====
document.addEventListener('DOMContentLoaded', function() {
    loadCart();
    displayProducts('all');
});

// ===== Display Products =====
function displayProducts(category) {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(p => p.category === category);

    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-image">
            ${product.icon}
            <span class="product-badge">-${Math.round((product.oldPrice - product.price) / product.oldPrice * 100)}%</span>
        </div>
        <div class="product-info">
            <div class="product-category">${getCategoryName(product.category)}</div>
            <div class="product-name">${product.name}</div>
            <div class="product-description">${product.description}</div>
            <div class="product-rating">
                ${'⭐'.repeat(Math.floor(product.rating))} (${product.rating})
            </div>
            <div class="product-footer">
                <div class="product-price">
                    <span class="old-price">${product.oldPrice} ر.س</span>
                    ${product.price} ر.س
                </div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    <i class="fas fa-shopping-cart"></i>
                </button>
            </div>
        </div>
    `;
    return card;
}

function getCategoryName(category) {
    const names = {
        'electronics': 'إلكترونيات',
        'fashion': 'ملابس',
        'home': 'منزل'
    };
    return names[category] || category;
}

// ===== Filter Products =====
function filterProducts(category) {
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Display filtered products
    displayProducts(category);
}

// ===== Shopping Cart Functions =====
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCart();
    updateCartUI();
    showNotification(`تم إضافة ${product.name} إلى السلة`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            updateCartUI();
        }
    }
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const subtotal = document.getElementById('subtotal');
    const shipping = document.getElementById('shipping');
    const total = document.getElementById('total');

    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Update cart items display
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>سلتك فارغة</p>
            </div>
        `;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">${item.icon}</div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${item.price} ر.س</div>
                    <div class="cart-item-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        <button class="remove-btn" onclick="removeFromCart(${item.id})">حذف</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Calculate totals
    const subtotalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shippingAmount = subtotalAmount > 0 ? (subtotalAmount > 500 ? 0 : 50) : 0;
    const totalAmount = subtotalAmount + shippingAmount;

    subtotal.textContent = `${subtotalAmount} ر.س`;
    shipping.textContent = shippingAmount === 0 ? 'مجاني' : `${shippingAmount} ر.س`;
    total.textContent = `${totalAmount} ر.س`;
}

function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    
    cartSidebar.classList.toggle('active');
    cartOverlay.classList.toggle('active');
}

function continueShopping() {
    toggleCart();
}

function checkout() {
    if (cart.length === 0) {
        showNotification('السلة فارغة!', 'error');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const message = `أريد شراء المنتجات التالية:\n${cart.map(item => `${item.name} x${item.quantity}`).join('\n')}\nالإجمالي: ${total} ر.س`;
    
    // Open WhatsApp
    const whatsappNumber = '966501234567';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// ===== Contact Form =====
function sendMessage(event) {
    event.preventDefault();
    
    const form = event.target;
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const message = form.querySelector('textarea').value;

    // Create WhatsApp message
    const whatsappMessage = `اسم: ${name}\nبريد: ${email}\nالرسالة: ${message}`;
    const whatsappNumber = '966501234567';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    
    window.open(whatsappUrl, '_blank');
    form.reset();
    showNotification('تم إرسال رسالتك بنجاح!');
}

// ===== Notification =====
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification show`;
    
    if (type === 'error') {
        notification.style.background = '#ef4444';
    } else {
        notification.style.background = '#10b981';
    }

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// ===== Smooth Scroll for Navigation =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});



