// main.js - Funcionalidad global para Cromatic Brand

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Toggle icon between bars and times (using FontAwesome or similar, here simple text or emoji)
            if (navLinks.classList.contains('active')) {
                menuToggle.innerHTML = '<i class="fas fa-times"></i>'; // Ensure fontawesome is loaded
            } else {
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }

    // 2. Shopping Cart Basic Logic (LocalStorage)
    updateCartCount();

    // Add to cart functionality
    const addToCartBtns = document.querySelectorAll('.btn-add-cart');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card');
            const productId = productCard.dataset.id;
            const productTitle = productCard.querySelector('.product-title').innerText;
            const productPriceText = productCard.querySelector('.product-price').innerText;
            const productPrice = parseFloat(productPriceText.replace(/[^\d]/g, ''));
            const productImg = productCard.querySelector('.product-img').src;

            const product = {
                id: productId,
                title: productTitle,
                price: productPrice,
                img: productImg,
                quantity: 1
            };

            addToCart(product);
            alert(`${productTitle} añadido al carrito.`);
        });
    });
});

function getCart() {
    return JSON.parse(localStorage.getItem('cromatic_cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('cromatic_cart', JSON.stringify(cart));
}

function addToCart(product) {
    let cart = getCart();
    
    // Check if product already exists
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push(product);
    }
    
    saveCart(cart);
    updateCartCount();
}

function updateCartCount() {
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        const cart = getCart();
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.innerText = totalItems;
    }
}
