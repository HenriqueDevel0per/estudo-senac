// product-page.js

document.addEventListener('DOMContentLoaded', () => {
    // Inicializa Tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

    // Lógica do botão Adicionar ao Carrinho
    const toastLiveExample = document.getElementById('liveToast');
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    const addToCartBtn = document.getElementById('addToCartBtn');
    
    addToCartBtn.addEventListener('click', () => {
        const productDetails = document.getElementById('product-details');
        const selectedSizeEl = document.querySelector('#size-options .size-btn.active');

        if (!selectedSizeEl) {
            alert('Por favor, selecione um tamanho.');
            return;
        }

        const product = {
            id: productDetails.dataset.productId,
            name: productDetails.dataset.productName,
            price: parseFloat(productDetails.dataset.productPrice),
            size: selectedSizeEl.textContent.trim(),
            image: document.getElementById('mainImage').src
        };
        
        // Lógica do Spinner
        const spinner = addToCartBtn.querySelector('.spinner-border');
        const btnText = addToCartBtn.querySelector('.btn-text');
        spinner.classList.remove('d-none');
        btnText.textContent = 'Adicionando...';
        addToCartBtn.disabled = true;

        setTimeout(() => {
            addToCart(product);
            toastBootstrap.show();
            spinner.classList.add('d-none');
            btnText.textContent = 'Adicionar ao Carrinho';
            addToCartBtn.disabled = false;
        }, 1000);
    });

    // Lógica para selecionar tamanho
    document.querySelectorAll('.size-btn').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
});

// Lógica para trocar imagem/mídia
function changeImage(src) {
    document.getElementById('mainImage').src = src;
    document.querySelectorAll('.img-thumbnail').forEach(img => img.classList.remove('active'));
    document.querySelector(`img[src="${src}"]`).classList.add('active');
}

function changeMedia(element, type) {
    const mainContainer = document.querySelector('.main-image-container');
    if (type === 'image') {
        mainContainer.innerHTML = `<img src="${element.src}" class="img-fluid rounded-4 shadow" id="mainImage">`;
    } else {
        const videoSource = element.querySelector('source').src;
        mainContainer.innerHTML = `<video class="img-fluid rounded-4 shadow" id="mainImage" autoplay muted loop><source src="${videoSource}" type="video/mp4"></video>`;
    }
    document.querySelectorAll('.img-thumbnail').forEach(el => el.classList.remove('active'));
    element.classList.add('active');
}