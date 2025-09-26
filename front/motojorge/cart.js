// cart.js

const freeGiftThreshold = 60000;

const productsDB = {
    "001": { id: "001", name: "Yamaha MT-09 2024", price: 59990.00, images: ["https://cdn2.yamaha-motor.eu/prod/product-assets/2025/MT09AS/2025-Yamaha-MT09AS-EU-Icon_Blue-Studio-002-03.jpg", "https://cdn2.yamaha-motor.eu/prod/product-assets/2025/MT09AS/2025-Yamaha-MT09AS-EU-Icon_Blue-360-Degrees-001-03.jpg", "https://cdn2.yamaha-motor.eu/prod/product-assets/2025/MT09AS/2025-Yamaha-MT09AS-EU-Icon_Blue-Studio-005-03.jpg"], video: "TswsBnwUOz8", description: "O mestre da escuridão...", specs: "114 cv, 193 kg" },
    "002": { id: "002", name: "Triumph Street Triple RS 765 2025", price: 69990.00, images: ["https://production.autoforce.com/uploads/picture/image/263965528/main_webp_comprar-street-triple-765-rs-2023_4f2ca28276.png.webp", "https://production.autoforce.com/uploads/picture/image/263965529/main_webp_comprar-street-triple-765-rs-2023_fa6d9df21d.png.webp", "https://production.autoforce.com/uploads/picture/image/263965527/main_webp_comprar-street-triple-765-rs-2023_e005c79735.png.webp", "https://production.autoforce.com/uploads/picture/image/263965525/main_webp_comprar-street-triple-765-rs-2023_2b7b2af3dc.png.webp"], description: "A referência definitiva...", specs: "130 cv, 188 kg" },
    "003": { id: "003", name: "Suzuki GSX-S1000 2025", price: 79600.00, images: ["https://suzukimotos.com.br/storage/images/uploads/modelos/cores/2025-07-14-12-13-12-prata-site.png", "https://suzukimotos.com.br/storage/images/uploads/modelos/cores/2025-07-14-12-14-20-preta-site.png", "https://suzukicycles.com/-/media/project/cycles/images/products/motorcycles/gsx-s1000a/2025/gallery/gsx-s1000m5_csx_diagonal_2400x1600.png"], description: "O coração de uma superesportiva...", specs: "152 cv, 214 kg" }
};

document.addEventListener('DOMContentLoaded', () => {
    updateCartIcon();
    if (document.getElementById('cart-content')) loadCartPage();
    setupQuickViewModal();
    // Ativa os tooltips (como o do botão WhatsApp)
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
});

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    if (existingProductIndex === -1) { product.quantity = 1; cart.push(product); }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartIcon();
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartPage();
    updateCartIcon();
}

function updateCartIcon() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.querySelector('#cart-count').textContent = cart.length;
}

function loadCartPage() {
    const cartContent = document.getElementById('cart-content');
    if (!cartContent) return;
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        cartContent.innerHTML = '<div class="text-center text-light"><h1>Seu orçamento está vazio.</h1><a href="index.html" class="btn btn-primary mt-3">Ver Motos</a></div>';
        return;
    }
    cartContent.innerHTML = `<h1 class="display-4 text-light mb-4">Seu Orçamento</h1><div id="free-shipping-progress" class="mb-4"><p class="text-light text-center mb-1" id="progress-text"></p><div class="progress" style="height: 20px;"><div id="progress-bar" class="progress-bar bg-primary" role="progressbar"></div></div></div><div id="cart-items"></div><div class="row mt-5 justify-content-end"><div class="col-md-6"><div id="shipping-section"><label for="cep-code" class="form-label text-light">Simular Frete e Prazo:</label><div class="input-group"><input type="text" class="form-control" id="cep-code" placeholder="Digite seu CEP"><button class="btn btn-primary" type="button" onclick="calculateShipping()">Simular</button></div><div id="shipping-options" class="mt-3"></div></div></div><div class="col-md-6"><div id="cart-total" class="text-end"></div></div></div><div id="checkout-button-container" class="text-end mt-4"></div>`;
    const cartItemsContainer = document.getElementById('cart-items');
    let subtotal = 0;
    cart.forEach((item, index) => {
        subtotal += item.price;
        cartItemsContainer.innerHTML += `<div class="row cart-item mb-3 align-items-center"><div class="col-2"><img src="${productsDB[item.id].images[0]}" class="img-fluid rounded"></div><div class="col-6"><h5 class="mb-0 text-light">${item.name}</h5></div><div class="col-2 text-light">R$ ${item.price.toFixed(2)}</div><div class="col-2"><button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})"><i class="bi bi-trash"></i></button></div></div>`;
    });
    document.getElementById('checkout-button-container').innerHTML = `<a href="checkout.html" class="btn btn-primary btn-lg">Finalizar Compra</a>`;
    calculateTotals(subtotal);
    updateProgressBar(subtotal);
    if(localStorage.getItem('cep')) calculateShipping(false);
}

function calculateTotals(subtotal) {
    let shippingInfo = JSON.parse(localStorage.getItem('shipping'));
    let shippingCost = shippingInfo ? shippingInfo.price : 0;
    let totalHTML = `<h4 class="text-light">Subtotal: R$ ${subtotal.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</h4>`;
    if (shippingInfo) totalHTML += `<h5 class="text-light">Frete: R$ ${shippingCost.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</h5>`;
    const finalTotal = subtotal + shippingCost;
    totalHTML += `<hr class="text-light"><h2 class="text-light mt-2">Total: <span class="text-primary">R$ ${finalTotal.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span></h2>`;
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
        progressText.textContent = `Faltam R$ ${remaining.toLocaleString('pt-BR', {minimumFractionDigits: 2})} para ganhar um capacete!`;
        progressBar.classList.remove('bg-success');
    }
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
    if (document.getElementById('progress-bar').classList.contains('bg-success')) { options.push({ name: 'Frete Grátis (Brinde)', price: 0, days: 'Até 10 dias' }); }
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
            let thumbnailsHTML = product.images.map(img => `<img src="${img}" class="img-thumbnail" onclick="changeModalImage('${img}')">`).join('');
            if(product.video){
                thumbnailsHTML += `<div class="img-thumbnail d-flex align-items-center justify-content-center" onclick="changeModalToVideo('${product.video}')"><i class="bi bi-play-circle-fill" style="font-size: 2rem; color: var(--primary-color);"></i></div>`;
            }
            const modalBody = document.getElementById('quickViewModalBody');
            modalBody.innerHTML = `<div class="row"><div class="col-md-7"><div id="modal-main-media" class="main-image-container mb-2"><img src="${product.images[0]}" class="img-fluid rounded" id="modalMainImage"></div><div class="thumbnail-container d-flex gap-2 flex-wrap">${thumbnailsHTML}</div></div><div class="col-md-5"><h3>${product.name}</h3><p>${product.description}</p><p><strong>Destaques:</strong> ${product.specs}</p><h2 class="text-success">R$ ${product.price.toFixed(2)}</h2><div class="d-grid"><a href="produto-${productId === '001' ? 'yamaha-mt09' : (productId === '002' ? 'triumph-street-triple' : 'suzuki-gsx')}.html" class="btn btn-primary">Ver Página Completa</a></div></div></div>`;
        });
    }
}

function changeModalImage(src) {
    document.getElementById('modal-main-media').innerHTML = `<img src="${src}" class="img-fluid rounded" id="modalMainImage">`;
}

function changeModalToVideo(videoId) {
    document.getElementById('modal-main-media').innerHTML = `<div class="ratio ratio-16x9"><iframe class="rounded" src="https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe></div>`;
}