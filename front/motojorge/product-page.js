// product-page.js

document.addEventListener('DOMContentLoaded', () => {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

    const toastLiveExample = document.getElementById('liveToast');
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    const addToCartBtn = document.getElementById('addToCartBtn');
    
    if(addToCartBtn){
        addToCartBtn.addEventListener('click', () => {
            const productDetails = document.getElementById('product-details');
            const product = {
                id: productDetails.dataset.productId,
                name: productDetails.dataset.productName,
                price: parseFloat(productDetails.dataset.productPrice),
                image: document.querySelector('#mainImage, .main-image-container iframe').src
            };
            
            const spinner = addToCartBtn.querySelector('.spinner-border');
            const btnText = addToCartBtn.querySelector('.btn-text');
            spinner.classList.remove('d-none');
            btnText.textContent = 'Adicionando...';
            addToCartBtn.disabled = true;

            setTimeout(() => {
                addToCart(product);
                toastBootstrap.show();
                spinner.classList.add('d-none');
                btnText.textContent = 'Adicionar ao Orçamento';
                addToCartBtn.disabled = false;
            }, 1000);
        });
    }
    
    if(document.getElementById('installments-select')) {
        simulateInstallments();
    }
});

function changeImage(src) {
    document.getElementById('mainImage').src = src;
    document.querySelectorAll('.thumbnail-container .img-thumbnail').forEach(img => img.classList.remove('active'));
    document.querySelector(`img[src="${src}"]`).classList.add('active');
}

function changeMedia(element, type) {
    const mainContainer = document.querySelector('.main-image-container');
    document.querySelectorAll('.thumbnail-container .img-thumbnail').forEach(el => el.classList.remove('active'));
    element.classList.add('active');
    if (type === 'image') {
        mainContainer.innerHTML = `<img src="${element.src}" class="img-fluid rounded-4 shadow" id="mainImage">`;
    } else if (type === 'video') {
        const videoId = element.getAttribute('data-video-id');
        mainContainer.innerHTML = `<div class="ratio ratio-16x9"><iframe class="rounded-4 shadow" src="https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1" allowfullscreen></iframe></div>`;
    }
}

function simulateInstallments() {
    const productDetails = document.getElementById('product-details');
    const price = parseFloat(productDetails.dataset.productPrice);
    const select = document.getElementById('installments-select');
    const installments = parseInt(select.value);
    const resultDiv = document.getElementById('simulation-result');
    let resultHTML = '';

    if (installments === 1) {
        const discountedPrice = price * 0.95;
        resultHTML = `<p class="mb-1 fs-5">Pagando no <strong>PIX / à vista</strong>:</p><h4 class="text-success fw-bold">R$ ${discountedPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h4><small class="text-success">Você economiza R$ ${(price - discountedPrice).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}!</small>`;
    } else if (installments <= 18) {
        const installmentValue = price / installments;
        resultHTML = `<p class="mb-1 fs-5">No <strong>Cartão de Crédito</strong>:</p><h4>${installments}x de <span class="text-primary fw-bold">R$ ${installmentValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span></h4><small>Total: R$ ${price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} (sem juros)</small>`;
    } else {
        const annualInterestRate = 0.199; // 19.9% a.a.
        const monthlyInterestRate = Math.pow(1 + annualInterestRate, 1/12) - 1;
        const installmentValue = price * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, installments)) / (Math.pow(1 + monthlyInterestRate, installments) - 1);
        const totalAmount = installmentValue * installments;
        resultHTML = `<p class="mb-1 fs-5">No <strong>Cartão de Crédito</strong>:</p><h4>${installments}x de <span class="text-primary fw-bold">R$ ${installmentValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span></h4><small>Total: R$ ${totalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} (com juros)</small>`;
    }
    resultDiv.innerHTML = resultHTML;
}