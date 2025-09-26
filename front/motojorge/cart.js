// cart.js

const validCoupons = { "PRIMEIRA10": 10, "SENAC5": 5 };
const freeGiftThreshold = 80000;

const productsDB = {
    "001": {
        id: "001", name: "Yamaha MT-09 2024", price: 59990.00,
        images: [
            "https://cdn2.yamaha-motor.eu/prod/product-assets/2025/MT09AS/2025-Yamaha-MT09AS-EU-Icon_Blue-Studio-002-03.jpg",
            "https://cdn2.yamaha-motor.eu/prod/product-assets/2025/MT09AS/2025-Yamaha-MT09AS-EU-Icon_Blue-360-Degrees-001-03.jpg",
            "https://cdn2.yamaha-motor.eu/prod/product-assets/2025/MT09AS/2025-Yamaha-MT09AS-EU-Icon_Blue-Studio-005-03.jpg"
        ],
        video: "TswsBnwUOz8",
        description: "O mestre da escuridão, com um motor Crossplane de 3 cilindros que oferece torque brutal e agilidade incomparável.",
        specs: "114 cv, 193 kg, Quick Shifter"
    },
    "002": {
        id: "002", name: "Triumph Street Triple RS 765 2025", price: 69990.00,
        images: [
            "https://production.autoforce.com/uploads/picture/image/263965528/main_webp_comprar-street-triple-765-rs-2023_4f2ca28276.png.webp",
            "https://production.autoforce.com/uploads/picture/image/263965529/main_webp_comprar-street-triple-765-rs-2023_fa6d9df21d.png.webp",
            "https://production.autoforce.com/uploads/picture/image/263965527/main_webp_comprar-street-triple-765-rs-2023_e005c79735.png.webp",
            "https://production.autoforce.com/uploads/picture/image/263965525/main_webp_comprar-street-triple-765-rs-2023_2b7b2af3dc.png.webp"
        ],
        description: "A referência definitiva em performance, com tecnologia de ponta derivada da Moto2™ e um design agressivo.",
        specs: "130 cv, 188 kg, Freios Brembo"
    },
    "003": {
        id: "003", name: "Suzuki GSX-S1000 2025", price: 79600.00,
        images: [
            "https://suzukimotos.com.br/storage/images/uploads/modelos/cores/2025-07-14-12-13-12-prata-site.png",
            "https://suzukimotos.com.br/storage/images/uploads/modelos/cores/2025-07-14-12-14-20-preta-site.png",
            "https://suzukicycles.com/-/media/project/cycles/images/products/motorcycles/gsx-s1000a/2025/gallery/gsx-s1000m5_csx_diagonal_2400x1600.png?mh=500&mw=768&hash=241FFF2ABA0ADBEB2075F28073713EAB"
        ],
        description: "O coração de uma superesportiva em um corpo de uma street fighter. Desempenho lendário com um visual intimidador.",
        specs: "152 cv, 214 kg, Controle de Tração"
    }
};

document.addEventListener('DOMContentLoaded', () => {
    updateCartIcon();
    if (document.getElementById('cart-items')) loadCartPage();
    setupQuickViewModal();
});

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    if (existingProductIndex > -1) {
        console.log("Moto já está no orçamento.");
        return;
    } else {
        product.quantity = 1;
        cart.push(product);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartIcon();
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    if (cart.length === 0) localStorage.removeItem('discount');
    loadCartPage();
    updateCartIcon();
}

function updateCartIcon() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.length;
    const cartCount = document.querySelector('#cart-count');
    if (cartCount) cartCount.textContent = totalItems;
}

function loadCartPage() {
    const cartItemsContainer = document.getElementById('cart-items');
    if (!cartItemsContainer) return;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        document.querySelector('main.container').innerHTML = '<div class="text-center text-light"><h1>Seu orçamento está vazio.</h1><a href="index.html" class="btn btn-primary mt-3">Ver Motos</a></div>';
        return;
    }

    cartItemsContainer.innerHTML = '';
    let subtotal = 0;
    cart.forEach((item, index) => {
        subtotal += item.price;
        cartItemsContainer.innerHTML += `<div class="row cart-item mb-3 align-items-center"><div class="col-2"><img src="${item.images[0]}" class="img-fluid rounded"></div><div class="col-6"><h5 class="mb-0 text-light">${item.name}</h5></div><div class="col-2 text-light">R$ ${item.price.toFixed(2)}</div><div class="col-2"><button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})"><i class="bi bi-trash"></i></button></div></div>`;
    });

    calculateTotals(subtotal);
    updateProgressBar(subtotal);
}

function calculateTotals(subtotal) {
    const discountInfo = JSON.parse(localStorage.getItem('discount'));
    let discountAmount = 0;
    
    let totalHTML = `<h4 class="text-light">Subtotal: R$ ${subtotal.toFixed(2)}</h4>`;
    if (discountInfo && validCoupons[discountInfo.code]) {
        discountAmount = (subtotal * discountInfo.percentage) / 100;
        totalHTML += `<h5 class="text-success">Desconto (${discountInfo.percentage}%): - R$ ${discountAmount.toFixed(2)}</h5>`;
    }

    const finalTotal = subtotal - discountAmount;
    totalHTML += `<hr class="text-light"><h2 class="text-light mt-2">Total: <span class="text-primary">R$ ${finalTotal.toFixed(2)}</span></h2>`;
    document.getElementById('cart-total').innerHTML = totalHTML;
}

function updateProgressBar(subtotal) {
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    if (!progressBar || !progressText) return;

    const percentage = Math.min((subtotal / freeGiftThreshold) * 100, 100);
    progressBar.style.width = `${percentage}%`;
    
    if (subtotal >= freeGiftThreshold) {
        progressText.textContent = "Parabéns! Você ganhou um capacete exclusivo!";
        progressBar.classList.add('bg-success');
    } else {
        const remaining = freeGiftThreshold - subtotal;
        progressText.textContent = `Faltam R$ ${remaining.toFixed(2)} para ganhar um capacete!`;
        progressBar.classList.remove('bg-success');
    }
}

function applyCoupon() {
    const couponCode = document.getElementById('coupon-code').value.toUpperCase();
    const messageDiv = document.getElementById('coupon-message');
    if (validCoupons[couponCode]) {
        localStorage.setItem('discount', JSON.stringify({ code: couponCode, percentage: validCoupons[couponCode] }));
        messageDiv.innerHTML = `<span class="text-success">Cupom aplicado!</span>`;
    } else {
        localStorage.removeItem('discount');
        messageDiv.innerHTML = `<span class="text-danger">Cupom inválido.</span>`;
    }
    loadCartPage();
}

function setupQuickViewModal() {
    const quickViewModal = document.getElementById('quickViewModal');
    if (quickViewModal) {
        quickViewModal.addEventListener('show.bs.modal', function (event) {
            const button = event.relatedTarget;
            const productId = button.getAttribute('data-product-id');
            const product = productsDB[productId];
            
            // Cria os thumbnails
            let thumbnailsHTML = product.images.map(img => `<img src="${img}" class="img-thumbnail" onclick="changeModalImage('${img}')">`).join('');
            if(product.video){
                thumbnailsHTML += `<div class="img-thumbnail d-flex align-items-center justify-content-center" onclick="changeModalToVideo('${product.video}')"><i class="bi bi-play-circle-fill" style="font-size: 2rem;"></i></div>`;
            }

            const modalBody = document.getElementById('quickViewModalBody');
            modalBody.innerHTML = `
                <div class="row">
                    <div class="col-md-7">
                        <div id="modal-main-media" class="main-image-container mb-2">
                           <img src="${product.images[0]}" class="img-fluid rounded" id="modalMainImage">
                        </div>
                        <div class="thumbnail-container d-flex gap-2">
                           ${thumbnailsHTML}
                        </div>
                    </div>
                    <div class="col-md-5">
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <p><strong>Destaques:</strong> ${product.specs}</p>
                        <h2 class="text-success">R$ ${product.price.toFixed(2)}</h2>
                        <div class="d-grid"><a href="produto-${productId === '001' ? 'yamaha-mt09' : (productId === '002' ? 'triumph-street-triple' : 'suzuki-gsx')}.html" class="btn btn-primary">Ver Página Completa</a></div>
                    </div>
                </div>`;
        });
    }
}

// Funções para a galeria do modal
function changeModalImage(src) {
    document.getElementById('modal-main-media').innerHTML = `<img src="${src}" class="img-fluid rounded" id="modalMainImage">`;
}

function changeModalToVideo(videoId) {
    document.getElementById('modal-main-media').innerHTML = `<div class="ratio ratio-16x9"><iframe class="rounded" src="https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe></div>`;
}