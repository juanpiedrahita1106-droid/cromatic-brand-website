// main.js - Funcionalidad global para Cromatic Brand

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            if (navLinks.classList.contains('active')) {
                menuToggle.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }

    // 2. Premium Features: Loader & Popup
    const loader = document.getElementById('loader');
    const popup = document.getElementById('promo-popup');
    const closePopup = document.getElementById('close-popup');
    const crmForm = document.getElementById('crm-form');

    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                
                // Show popup if not seen in this session
                if (popup && !sessionStorage.getItem('cromatic_popup_seen')) {
                    setTimeout(() => {
                        popup.classList.add('active');
                    }, 500);
                }
            }, 500);
        }, 1000); // 1 second loader
    }

    if (closePopup && popup) {
        closePopup.addEventListener('click', () => {
            popup.classList.remove('active');
            sessionStorage.setItem('cromatic_popup_seen', 'true');
        });
    }

    if (crmForm) {
        crmForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('crm-name').value;
            const email = document.getElementById('crm-email').value;
            const phone = document.getElementById('crm-phone').value;
            
            // Build WhatsApp message for CRM (+61451042706)
            const msg = `¡Hola! Quiero mi 15% de descuento.\n\nNombre: ${name}\nCorreo: ${email}\nTeléfono: ${phone}\n*Acepto recibir información.*`;
            const waUrl = `https://wa.me/61451042706?text=${encodeURIComponent(msg)}`;
            
            sessionStorage.setItem('cromatic_popup_seen', 'true');
            popup.classList.remove('active');
            
            window.open(waUrl, '_blank');
        });
    }

    // 3. Premium Features: Scroll Animations (Fade-in)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(section => {
        observer.observe(section);
    });

    // 4. Size Selection Logic
    const sizeBtns = document.querySelectorAll('.size-btn');
    sizeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // Evitar redirección al hacer clic en talla
            const productCard = e.target.closest('.product-card');
            const cardSizeBtns = productCard.querySelectorAll('.size-btn');
            cardSizeBtns.forEach(b => b.classList.remove('selected'));
            e.target.classList.add('selected');
        });
    });

    // 4.1 Product Details Redirect
    const productLinks = document.querySelectorAll('.product-img-wrapper, .product-title');
    productLinks.forEach(link => {
        link.style.cursor = 'pointer';
        link.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card');
            if(productCard) {
                const productId = productCard.dataset.id;
                window.location.href = `producto-detalles.html?id=${productId}`;
            }
        });
    });

    // 5. Shopping Cart Logic (LocalStorage)
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
            
            // Get selected size
            const selectedSizeBtn = productCard.querySelector('.size-btn.selected');
            if (!selectedSizeBtn) {
                alert('Por favor, selecciona una talla antes de añadir al carrito.');
                return;
            }
            const size = selectedSizeBtn.dataset.size;

            const product = {
                id: productId + '-' + size, // Unique ID per size
                originalId: productId,
                title: productTitle,
                price: productPrice,
                img: productImg,
                size: size,
                quantity: 1
            };

            addToCart(product);
            alert(`${productTitle} (Talla ${size}) añadido al carrito.`);
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
