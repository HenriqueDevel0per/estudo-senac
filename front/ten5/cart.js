// cart.js

const validCoupons = { "PRIMEIRA10": 10, "SENAC5": 5 };
const freeShippingThreshold = 1000;

// Dados dos produtos (simulando um banco de dados)
const productsDB = {
    "001": { id: "001", name: "Tênis Nike Air Max 97", price: 899.99, image: "ten5/airmax.jpg", description: "O Nike Air Max 97 mantém o design de ondulação do original, inspirado nos trens-bala japoneses.", specs: "Unidade Nike Air de comprimento total." },
    "002": { id: "002", name: "Tênis Nike Air Zoom Alphafly 3", price: 2500.99, image: "https://imgnike-a.akamaihd.net/1920x1920/074463NXA5.jpg", description: "Aprimorado para velocidade de maratona, o Alphafly 3 potencializa sua corrida.", specs: "Entressola de espuma ZoomX e placa de fibra de carbono." }
};

document.addEventListener('DOMContentLoaded', () => {
    updateCartIcon();
    if (document.getElementById('cart-items')) loadCartPage();
    setupQuickViewModal();
});

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cart.findIndex(item => item.id === product.id && item.size === product.size);
    if (existingProductIndex > -1) cart[existingProductIndex].quantity += 1;
    else { product.quantity = 1; cart.push(product); }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartIcon();
}

function updateQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart[index]) {
        cart[index].quantity += change;
        if (cart[index].quantity <= 0) cart.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartPage();
    updateCartIcon();
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    if (cart.length === 0) {
        localStorage.removeItem('discount');
        localStorage.removeItem('shipping');
    }
    loadCartPage();
    updateCartIcon();
}

function updateCartIcon() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCount = document.querySelector('#cart-count');
    if (cartCount) cartCount.textContent = totalItems;
}

function loadCartPage() {
    const cartItemsContainer = document.getElementById('cart-items');
    if (!cartItemsContainer) return;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        document.querySelector('main.container').innerHTML = '<div class="text-center text-light"><h1>Seu carrinho está vazio.</h1><a href="index_ten5.html" class="btn btn-warning mt-3">Voltar à loja</a></div>';
        return;
    }

    cartItemsContainer.innerHTML = '';
    let subtotal = 0;
    cart.forEach((item, index) => {
        subtotal += item.price * item.quantity;
        cartItemsContainer.innerHTML += `<div class="row cart-item mb-3 align-items-center"><div class="col-2"><img src="${item.image}" class="img-fluid rounded"></div><div class="col-3"><h5 class="mb-0 text-light">${item.name}</h5><small class="text-muted">Tamanho: ${item.size}</small></div><div class="col-2 text-light">R$ ${item.price.toFixed(2)}</div><div class="col-3 text-light"><div class="input-group input-group-sm"><button class="btn btn-outline-secondary" type="button" onclick="updateQuantity(${index}, -1)">-</button><input type="text" class="form-control text-center" value="${item.quantity}" readonly><button class="btn btn-outline-secondary" type="button" onclick="updateQuantity(${index}, 1)">+</button></div></div><div class="col-2"><button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})"><i class="bi bi-trash"></i></button></div></div>`;
    });

    calculateTotals(subtotal);
    updateProgressBar(subtotal);
    if(localStorage.getItem('cep')) calculateShipping(false);
}

function calculateTotals(subtotal) {
    const discountInfo = JSON.parse(localStorage.getItem('discount'));
    const shippingInfo = JSON.parse(localStorage.getItem('shipping'));
    let discountAmount = 0;
    let shippingCost = shippingInfo ? shippingInfo.price : 0;
    
    let totalHTML = `<h4 class="text-light">Subtotal: R$ ${subtotal.toFixed(2)}</h4>`;
    if (discountInfo && validCoupons[discountInfo.code]) {
        discountAmount = (subtotal * discountInfo.percentage) / 100;
        totalHTML += `<h5 class="text-success">Desconto (${discountInfo.percentage}%): - R$ ${discountAmount.toFixed(2)}</h5>`;
    }
    if (shippingInfo) totalHTML += `<h5 class="text-light">Frete (${shippingInfo.name}): R$ ${shippingCost.toFixed(2)}</h5>`;

    const finalTotal = subtotal - discountAmount + shippingCost;
    totalHTML += `<hr class="text-light"><h2 class="text-light mt-2">Total: <span class="text-warning">R$ ${finalTotal.toFixed(2)}</span></h2>`;
    document.getElementById('cart-total').innerHTML = totalHTML;
}

function updateProgressBar(subtotal) {
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    if (!progressBar || !progressText) return;

    const percentage = Math.min((subtotal / freeShippingThreshold) * 100, 100);
    progressBar.style.width = `${percentage}%`;
    progressBar.setAttribute('aria-valuenow', subtotal);

    if (subtotal >= freeShippingThreshold) {
        progressText.textContent = "Parabéns! Você ganhou Frete Grátis!";
        progressBar.classList.add('bg-success');
        progressBar.classList.remove('bg-warning');
    } else {
        const remaining = freeShippingThreshold - subtotal;
        progressText.textContent = `Faltam R$ ${remaining.toFixed(2)} para Frete Grátis!`;
        progressBar.classList.remove('bg-success');
        progressBar.classList.add('bg-warning');
    }
}

function applyCoupon() {
    const couponCode = document.getElementById('coupon-code').value.toUpperCase();
    const messageDiv = document.getElementById('coupon-message');
    if (validCoupons[couponCode]) {
        localStorage.setItem('discount', JSON.stringify({ code: couponCode, percentage: validCoupons[couponCode] }));
        messageDiv.innerHTML = `<span class="text-success">Cupom "${couponCode}" aplicado!</span>`;
    } else {
        localStorage.removeItem('discount');
        messageDiv.innerHTML = `<span class="text-danger">Cupom inválido.</span>`;
    }
    loadCartPage();
}

function getRegionByCep(cep) {
    const cepNum = parseInt(cep.substring(0, 5));
    if (cepNum >= 1000 && cepNum <= 39999) return 'sudeste';
    if (cepNum >= 40000 && cepNum <= 65999) return 'nordeste';
    if (cepNum >= 80000 && cepNum <= 99999) return 'sul';
    if ((cepNum >= 66000 && cepNum <= 69999) || (cepNum >= 76800 && cepNum <= 77999)) return 'norte';
    if ((cepNum >= 70000 && cepNum <= 76799) || (cepNum >= 78000 && cepNum <= 79999)) return 'centro-oeste';
    return 'desconhecida';
}

function calculateShipping(showAlert = true) {
    const cep = document.getElementById('cep-code').value.replace(/\D/g, '');
    const shippingOptionsDiv = document.getElementById('shipping-options');
    if (cep.length !== 8) { if (showAlert) alert('CEP inválido.'); return; }
    
    localStorage.setItem('cep', cep);
    const region = getRegionByCep(cep);
    let options = [];
    const subtotal = (JSON.parse(localStorage.getItem('cart')) || []).reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    if (subtotal >= freeShippingThreshold) options.push({ name: 'Frete Grátis', price: 0, days: 'Até 10 dias úteis' });
    else {
        switch (region) {
            case 'sul': options.push({ name: 'SEDEX', price: 39.90, days: 'Até 5 dias' }, { name: 'TX Courrier', price: 23.90, days: 'Até 5 dias' }); break;
            case 'sudeste': options.push({ name: 'SEDEX', price: 20.00, days: 'Até 3 dias' }, { name: 'TX Courrier', price: 17.35, days: 'Até 3 dias' }); break;
            case 'norte': case 'nordeste': options.push({ name: 'SEDEX', price: 48.00, days: 'Até 10 dias' }, { name: 'TX Courrier', price: 32.31, days: 'Até 10 dias' }); break;
            case 'centro-oeste': options.push({ name: 'SEDEX', price: 24.99, days: 'Até 5 dias' }, { name: 'TX Courrier', price: 18.43, days: 'Até 5 dias' }); break;
            default: shippingOptionsDiv.innerHTML = '<p class="text-danger">Região não atendida.</p>'; return;
        }
    }

    let html = '<h5 class="text-light mt-2">Escolha o frete:</h5>';
    const selectedShipping = JSON.parse(localStorage.getItem('shipping'));
    options.forEach(opt => {
        const isChecked = selectedShipping && selectedShipping.name === opt.name ? 'checked' : '';
        html += `<div class="form-check"><input class="form-check-input" type="radio" name="shippingOption" id="${opt.name}" onclick="selectShipping(${opt.price}, '${opt.name}')" ${isChecked}><label class="form-check-label text-light" for="${opt.name}">${opt.name} - R$ ${opt.price.toFixed(2)} (${opt.days})</label></div>`;
    });
    shippingOptionsDiv.innerHTML = html;
}

function selectShipping(price, name) {
    localStorage.setItem('shipping', JSON.stringify({ name, price }));
    loadCartPage();
}

function setupQuickViewModal() {
    const quickViewModal = document.getElementById('quickViewModal');
    if (quickViewModal) {
        quickViewModal.addEventListener('show.bs.modal', function (event) {
            const button = event.relatedTarget;
            const productId = button.getAttribute('data-product-id');
            const product = productsDB[productId];
            
            const modalBody = document.getElementById('quickViewModalBody');
            modalBody.innerHTML = `
                <div class="row">
                    <div class="col-md-6"><img src="${product.image}" class="img-fluid rounded"></div>
                    <div class="col-md-6">
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <h4>${product.specs}</h4>
                        <h2 class="text-success">R$ ${product.price.toFixed(2)}</h2>
                        <div class="d-grid"><a href="${productId === '001' ? 'produto-airmax.html' : 'produto.html'}" class="btn btn-warning">Ver página completa</a></div>
                    </div>
                </div>`;
        });
    }
}