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
});

function changeImage(src) {
    document.getElementById('mainImage').src = src;
    document.querySelectorAll('.img-thumbnail').forEach(img => img.classList.remove('active'));
    document.querySelector(`img[src="${src}"]`).classList.add('active');
}

// ATUALIZADO: Função agora cria um iframe para vídeos do YouTube
function changeMedia(element, type) {
    const mainContainer = document.querySelector('.main-image-container');
    document.querySelectorAll('.thumbnail-container .img-thumbnail').forEach(el => el.classList.remove('active'));
    element.classList.add('active');

    if (type === 'image') {
        mainContainer.innerHTML = `<img src="${element.src}" class="img-fluid rounded-4 shadow" id="mainImage">`;
    } else if (type === 'video') {
        const videoId = element.getAttribute('data-video-id');
        mainContainer.innerHTML = `<div class="ratio ratio-16x9"><iframe class="rounded-4 shadow" src="https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
    }
}