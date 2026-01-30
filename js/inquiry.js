// inqury.js - Logic for Inquiry Page

document.addEventListener('DOMContentLoaded', () => {
    renderBasket();
});

// Listen for cart logic updates (removed items from another tab/action)
window.addEventListener('cartUpdated', () => {
    renderBasket();
});

function renderBasket() {
    const container = document.getElementById('basketItems');
    const items = Cart.getItems();

    if (items.length === 0) {
        container.innerHTML = '<p style="color: #6c757d; font-style: italic;">Your quote basket is empty.</p>';
        return;
    }

    container.innerHTML = '';
    items.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.className = 'basket-item';

        itemEl.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="item-img" onerror="this.src='https://placehold.co/60x60'">
            <div class="item-details" style="flex-grow: 1;">
                <h4>${item.name}</h4>
                <p style="font-size: 0.8rem; color: #6c757d;">MOQ: ${item.moq}</p>
                <div style="margin-top: 0.5rem;">
                    <label style="font-size: 0.75rem; font-weight: bold; display: block; margin-bottom: 2px;">Est. Volume</label>
                    <input type="text" 
                           class="form-control" 
                           style="padding: 0.25rem 0.5rem; font-size: 0.85rem; width: 100px;" 
                           placeholder="e.g. 5 MT"
                           value="${item.volume || ''}"
                           onchange="updateVolume('${item.id}', this.value)"
                    >
                </div>
            </div>
            <button class="item-remove" onclick="Cart.removeItem('${item.id}')">Remove</button>
        `;
        container.appendChild(itemEl);
    });
}

function updateVolume(id, value) {
    Cart.updateVolume(id, value);
}

// Form Submission
document.getElementById('inquiryForm').addEventListener('submit', (e) => {
    e.preventDefault();

    // Check if basket is empty
    const items = Cart.getItems();
    if (items.length === 0) {
        alert('Please add products to your quote basket before submitting.');
        return;
    }

    // Collect Data
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    const payload = {
        buyer: data,
        products: items.map(i => ({ id: i.id, name: i.name, volume: i.volume }))
    };

    console.log('Submission Payload:', payload);

    // Simulate API call
    const originalText = e.submitter.innerText;
    e.submitter.innerText = 'Sending...';
    e.submitter.disabled = true;

    setTimeout(() => {
        alert('Thank you! Your inquiry has been sent successfully.');
        Cart.clear();
        e.target.reset();
        e.submitter.innerText = originalText;
        e.submitter.disabled = false;
        renderBasket();
    }, 1000);
});
