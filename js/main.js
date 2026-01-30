// main.js - UI Interactions

document.addEventListener('DOMContentLoaded', () => {
    renderProducts('All');
    setupFilters();
    setupSmoothScroll();
});

// Render Products
function renderProducts(category) {
    const grid = document.getElementById('productGrid');
    if (!grid) return;

    grid.innerHTML = '';

    const filtered = category === 'All'
        ? products
        : products.filter(p => p.category === category);

    filtered.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';

        // Check if image handles loading error
        const imgPath = product.image;

        card.innerHTML = `
      <img src="${imgPath}" alt="${product.name}" class="product-img" onerror="this.src='https://placehold.co/400x300?text=No+Image'">
      <div class="product-info">
        <h3 class="product-title">${product.name}</h3>
        <p class="product-meta">${product.category} • ${product.origin}</p>
        <p class="product-desc">${product.description}</p>
        <p class="product-meta" style="font-size: 0.8rem;">MOQ: ${product.moq} | Pack: ${product.packaging[0]}</p>
        
        <div class="card-footer">
          <button class="btn btn-primary" onclick="addToCart('${product.id}')" style="width: 100%">
            Add to Quote
          </button>
        </div>
      </div>
    `;
        grid.appendChild(card);
    });
}

// Add to Cart Wrapper
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        Cart.addItem(product);
    }
}

// Filter Setup
function setupFilters() {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active class
            buttons.forEach(b => b.classList.remove('active'));
            // Add active class
            e.target.classList.add('active');
            // Render
            renderProducts(e.target.dataset.category);
        });
    });
}

// Smooth Scroll for Anchors
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}
