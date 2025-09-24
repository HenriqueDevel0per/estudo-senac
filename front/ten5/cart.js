// cart.js

const validCoupons = { "PRIMEIRA10": 10, "SENAC5": 5 };

document.addEventListener('DOMContentLoaded', () => {
    updateCartIcon();
    loadCartPage();
});

// --- FUNÇÕES DE GERENCIAMENTO DO CARRINHO ---

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cart.findIndex(item => item.id === product.id && item.size === product.size);

    if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        product.quantity = 1;
        cart.push(product);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartIcon();
}

/**
 * NOVO: Altera a quantidade de um item no carrinho.
 * @param {number} index - O índice do item.
 * @param {number} change - A mudança na quantidade (+1 ou -1).
 */
function updateQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart[index]) {
        cart[index].quantity += change;
        if (cart[index].quantity <= 0) {
            // Se a quantidade for 0 ou menos, remove o item
            cart.splice(index, 1);
        }
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

// --- FUNÇÕES DE EXIBIÇÃO E ATUALIZAÇÃO ---

function updateCartIcon() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector('#cart-count').textContent = totalItems;
}

function loadCartPage() {
    const cartItemsContainer = document.getElementById('cart-items');
    if (!cartItemsContainer) return;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        document.body.innerHTML = '<div class="container my-5 text-center text-light"><h1>Seu carrinho está vazio.</h1><a href="index_ten5.html" class="btn btn-warning mt-3">Voltar à loja</a></div>';
        return;
    }

    cartItemsContainer.innerHTML = '';
    let subtotal = 0;
    cart.forEach((item, index) => {
        subtotal += item.price * item.quantity;
        cartItemsContainer.innerHTML += `
            <div class="row cart-item mb-3 align-items-center">
                <div class="col-2"><img src="${item.image}" class="img-fluid rounded"></div>
                <div class="col-3">
                    <h5 class="mb-0 text-light">${item.name}</h5>
                    <small class="text-muted">Tamanho: ${item.size}</small>
                </div>
                <div class="col-2 text-light">R$ ${item.price.toFixed(2)}</div>
                <div class="col-3 text-light">
                    <div class="input-group input-group-sm">
                        <button class="btn btn-outline-secondary" type="button" onclick="updateQuantity(${index}, -1)">-</button>
                        <input type="text" class="form-control text-center" value="${item.quantity}" readonly>
                        <button class="btn btn-outline-secondary" type="button" onclick="updateQuantity(${index}, 1)">+</button>
                    </div>
                </div>
                <div class="col-2"><button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})"><i class="bi bi-trash"></i></button></div>
            </div>`;
    });

    // Recalcula totais
    calculateTotals(subtotal);
    // Se um CEP já foi calculado, exibe as opções novamente
    if(localStorage.getItem('cep')){
        calculateShipping(false);
    }
}

function calculateTotals(subtotal) {
    const cartTotalContainer = document.getElementById('cart-total');
    const discountInfo = JSON.parse(localStorage.getItem('discount'));
    const shippingInfo = JSON.parse(localStorage.getItem('shipping'));

    let discountAmount = 0;
    let shippingCost = shippingInfo ? shippingInfo.price : 0;
    
    let totalHTML = `<h4 class="text-light">Subtotal: R$ ${subtotal.toFixed(2)}</h4>`;

    if (discountInfo && validCoupons[discountInfo.code]) {
        discountAmount = (subtotal * discountInfo.percentage) / 100;
        totalHTML += `<h5 class="text-success">Desconto (${discountInfo.percentage}%): - R$ ${discountAmount.toFixed(2)}</h5>`;
    }

    if (shippingInfo) {
        totalHTML += `<h5 class="text-light">Frete: R$ ${shippingCost.toFixed(2)}</h5>`;
    }

    const finalTotal = subtotal - discountAmount + shippingCost;
    totalHTML += `<hr class="text-light"><h2 class="text-light mt-2">Total: <span class="text-warning">R$ ${finalTotal.toFixed(2)}</span></h2>`;

    cartTotalContainer.innerHTML = totalHTML;
}

// --- LÓGICA DE CUPOM ---

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

// --- NOVO: LÓGICA DE FRETE ---

/**
 * Identifica a região com base no CEP.
 * As faixas de CEP foram obtidas de fontes públicas dos Correios.
 * @param {string} cep - O CEP a ser verificado.
 * @returns {string} - O nome da região.
 */
function getRegionByCep(cep) {
    const cepNum = parseInt(cep.substring(0, 5));
    if (cepNum >= 1000 && cepNum <= 39999) return 'sudeste';
    if (cepNum >= 40000 && cepNum <= 65999) return 'nordeste';
    if (cepNum >= 80000 && cepNum <= 99999) return 'sul';
    if ((cepNum >= 66000 && cepNum <= 69999) || (cepNum >= 76800 && cepNum <= 77999)) return 'norte';
    if ((cepNum >= 70000 && cepNum <= 76799) || (cepNum >= 78000 && cepNum <= 79999)) return 'centro-oeste';
    return 'desconhecida';
}

/**
 * Calcula e exibe as opções de frete.
 * @param {boolean} showAlert - Se deve mostrar um alerta para CEP inválido.
 */
function calculateShipping(showAlert = true) {
    const cep = document.getElementById('cep-code').value.replace(/\D/g, '');
    const shippingOptionsDiv = document.getElementById('shipping-options');

    if (cep.length !== 8) {
        if (showAlert) alert('CEP inválido. Digite 8 números.');
        return;
    }
    
    // Salva o CEP para recarregar a página
    localStorage.setItem('cep', cep);

    const region = getRegionByCep(cep);
    let options = [];

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Regra de frete grátis
    if (subtotal > 1000) {
        options.push({ name: 'Frete Grátis', price: 0, days: 'Até 10 dias úteis' });
    } else {
        switch (region) {
            case 'sul':
                options.push({ name: 'SEDEX', price: 39.90, days: 'Até 5 dias úteis' });
                options.push({ name: 'TX Courrier', price: 23.90, days: 'Até 5 dias úteis' });
                break;
            case 'sudeste':
                options.push({ name: 'SEDEX', price: 20.00, days: 'Até 3 dias úteis' });
                options.push({ name: 'TX Courrier', price: 17.35, days: 'Até 3 dias úteis' });
                break;
            case 'norte':
            case 'nordeste':
                options.push({ name: 'SEDEX', price: 48.00, days: 'Até 10 dias úteis' });
                options.push({ name: 'TX Courrier', price: 32.31, days: 'Até 10 dias úteis' });
                break;
            case 'centro-oeste':
                options.push({ name: 'SEDEX', price: 24.99, days: 'Até 5 dias úteis' });
                options.push({ name: 'TX Courrier', price: 18.43, days: 'Até 5 dias úteis' });
                break;
            default:
                shippingOptionsDiv.innerHTML = '<p class="text-danger">Região não atendida ou CEP inválido.</p>';
                return;
        }
    }

    let html = '<h5 class="text-light">Escolha o frete:</h5>';
    const selectedShipping = JSON.parse(localStorage.getItem('shipping'));

    options.forEach(opt => {
        const isChecked = selectedShipping && selectedShipping.name === opt.name ? 'checked' : '';
        html += `
            <div class="form-check">
                <input class="form-check-input" type="radio" name="shippingOption" id="${opt.name}" onclick="selectShipping(${opt.price}, '${opt.name}')" ${isChecked}>
                <label class="form-check-label text-light" for="${opt.name}">
                    ${opt.name} - R$ ${opt.price.toFixed(2)} (${opt.days})
                </label>
            </div>`;
    });
    shippingOptionsDiv.innerHTML = html;
}

/**
 * Salva a opção de frete escolhida e recarrega os totais.
 * @param {number} price - Preço do frete.
 * @param {string} name - Nome do serviço de frete.
 */
function selectShipping(price, name) {
    localStorage.setItem('shipping', JSON.stringify({ name, price }));
    loadCartPage();
}