// checkout.js

document.addEventListener('DOMContentLoaded', () => {
    loadOrderSummary();
    setupCepSearch();
    setupPaymentMethodSelector();
});

let orderSubtotal = 0;

function loadOrderSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const summaryDiv = document.getElementById('order-summary');
    if (cart.length === 0) {
        window.location.href = 'carrinho.html';
        return;
    }
    summaryDiv.innerHTML = '';
    orderSubtotal = cart.reduce((sum, item) => sum + item.price, 0);
    cart.forEach(item => {
        summaryDiv.innerHTML += `<div class="d-flex justify-content-between text-light"><span>${item.name}</span><span>R$ ${item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span></div>`;
    });
    updatePaymentView();
}

function setupCepSearch() {
    const cepInput = document.getElementById('cep');
    const searchBtn = document.getElementById('search-cep-btn');
    searchBtn.addEventListener('click', () => fetchAddress(cepInput.value));
    cepInput.addEventListener('blur', () => fetchAddress(cepInput.value));
}

async function fetchAddress(cep) {
    const cleanCep = cep.replace(/\D/g, '');
    if (cleanCep.length !== 8) return;
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
        const data = await response.json();
        if (data.erro) { alert('CEP não encontrado.'); return; }
        document.getElementById('rua').value = data.logradouro;
        document.getElementById('bairro').value = data.bairro;
        document.getElementById('cidade').value = data.localidade;
        document.getElementById('uf').value = data.uf;
        document.getElementById('numero').focus();
    } catch (error) { console.error('Erro ao buscar CEP:', error); alert('Não foi possível buscar o CEP.'); }
}

function setupPaymentMethodSelector() {
    document.getElementById('payment-method').addEventListener('change', updatePaymentView);
}

function updatePaymentView() {
    const paymentSelect = document.getElementById('payment-method');
    const paymentDetailsDiv = document.getElementById('payment-details');
    const totalAmountSpan = document.getElementById('total-amount');
    const selectedMethod = paymentSelect.value;
    let finalTotal = orderSubtotal;
    let detailsHTML = '';

    if (selectedMethod === 'pix') {
        finalTotal = orderSubtotal * 0.95;
        detailsHTML = `<div class="text-center bg-light text-dark p-3 rounded"><p class="mb-2">Escaneie o QR Code para pagar com PIX:</p><img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=pagamento-motoperformance" alt="QR Code PIX"><p class="mt-2 mb-0 text-success fw-bold">Desconto de 5% aplicado!</p></div>`;
    } else if (selectedMethod === 'credit1') {
        detailsHTML = generateCreditCardForm(1, orderSubtotal, true);
    } else if (selectedMethod === 'credit2') {
        detailsHTML = generateCreditCardForm(1, orderSubtotal / 2) + generateCreditCardForm(2, orderSubtotal / 2);
    } else if (selectedMethod === 'pix_credit') {
        detailsHTML = `<div class="mb-3"><label class="form-label">Valor no PIX</label><input type="number" id="pix-amount" class="form-control" placeholder="Ex: 10000" oninput="updateSplitPayment()"></div>` + generateCreditCardForm(1, orderSubtotal, false, 'Valor restante no Cartão');
    }
    paymentDetailsDiv.innerHTML = detailsHTML;
    totalAmountSpan.textContent = `R$ ${finalTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
}

function generateCreditCardForm(cardNumber, amount = 0, isReadOnly = false, label = 'Valor a cobrar') {
    let installmentOptions = '';
    for (let i = 1; i <= 18; i++) {
        const installmentValue = amount / i;
        installmentOptions += `<option value="${i}">${i}x de R$ ${installmentValue.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</option>`;
    }
    return `
        <div class="border p-3 rounded mb-3">
            <h6 class="text-light">Dados do Cartão ${cardNumber}</h6>
            <div class="mb-2">
                <label class="form-label">${label}</label>
                <input type="number" id="card-amount-${cardNumber}" class="form-control" value="${amount.toFixed(2)}" ${isReadOnly ? 'readonly' : `oninput="updateSplitPayment()"`}>
            </div>
            <div class="mb-2"><input type="text" class="form-control" placeholder="Número do Cartão"></div>
            <div class="mb-2"><input type="text" class="form-control" placeholder="Nome no Cartão"></div>
            <div class="row g-2">
                <div class="col-7"><input type="text" class="form-control" placeholder="Validade (MM/AA)"></div>
                <div class="col-5"><input type="text" class="form-control" placeholder="CVV"></div>
                <div class="col-12 mt-2">
                    <select id="installments-card-${cardNumber}" class="form-select">${installmentOptions}</select>
                </div>
            </div>
        </div>`;
}

function updateSplitPayment() {
    const selectedMethod = document.getElementById('payment-method').value;
    
    if (selectedMethod === 'credit2') {
        const card1Input = document.getElementById('card-amount-1');
        const card2Input = document.getElementById('card-amount-2');
        if (!card1Input || !card2Input) return;

        let amount1 = parseFloat(card1Input.value) || 0;
        if (amount1 > orderSubtotal) amount1 = orderSubtotal;
        
        const remaining = orderSubtotal - amount1;
        card2Input.value = remaining.toFixed(2);
        
        // Recalcula parcelas para ambos os cartões
        updateInstallmentOptions(1, amount1);
        updateInstallmentOptions(2, remaining);

    } else if (selectedMethod === 'pix_credit') {
        const pixInput = document.getElementById('pix-amount');
        const card1Input = document.getElementById('card-amount-1');
        if (!pixInput || !card1Input) return;

        let amountPix = parseFloat(pixInput.value) || 0;
        if (amountPix > orderSubtotal) amountPix = orderSubtotal;

        const remaining = orderSubtotal - amountPix;
        card1Input.value = remaining.toFixed(2);
        
        // Recalcula parcelas para o cartão
        updateInstallmentOptions(1, remaining);
    }
}

function updateInstallmentOptions(cardNumber, amount) {
    const select = document.getElementById(`installments-card-${cardNumber}`);
    if (!select) return;

    let options = '';
    for (let i = 1; i <= 18; i++) {
        const installmentValue = amount / i;
        options += `<option value="${i}">${i}x de R$ ${installmentValue.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</option>`;
    }
    select.innerHTML = options;
}