// main.js - UI Interactions

document.addEventListener('DOMContentLoaded', () => {
    // Check if query param 'category' exists
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    
    let initialCategory = 'All';
    if (categoryParam) {
        const validCategories = ['Spices', 'Beverages', 'Staples', 'Fruits and vegetables'];
        if (validCategories.includes(categoryParam)) {
            initialCategory = categoryParam;
        }
    }

    renderProducts(initialCategory);
    setupFilters();
    setupSmoothScroll();
    setupTooltip();
    setupFooterCategoryIntercept();

    // If initialCategory is not 'All', highlight the correct filter button and scroll to products
    if (initialCategory !== 'All') {
        const buttons = document.querySelectorAll('.filter-btn');
        buttons.forEach(btn => {
            if (btn.dataset.category === initialCategory) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        const productsSection = document.getElementById('products');
        if (productsSection) {
            // Delay slightly to allow rendering to complete
            setTimeout(() => {
                productsSection.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }
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
      <div class="product-img-container" data-id="${product.id}">
        <div class="product-img-wrapper">
          <img src="${imgPath}" alt="${product.name}" class="product-img" onerror="this.src='https://placehold.co/400x300?text=No+Image'">
        </div>
      </div>
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

// Mouse-following Tooltip Logic
function setupTooltip() {
    let tooltipEl = document.getElementById('global-tooltip');
    if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.id = 'global-tooltip';
        tooltipEl.className = 'product-tooltip';
        document.body.appendChild(tooltipEl);
    }

    const grid = document.getElementById('productGrid');
    if (!grid) return;

    const positionTooltip = (container) => {
        if (!tooltipEl.classList.contains('visible')) return;

        const rect = container.getBoundingClientRect();
        
        // Tooltip dimensions (default estimates if not yet rendered)
        const tooltipWidth = tooltipEl.offsetWidth || 260;
        const tooltipHeight = tooltipEl.offsetHeight || 100;

        // Center horizontally above the container
        let x = rect.left + rect.width / 2 - tooltipWidth / 2;
        let y = rect.top - tooltipHeight - 15; // 15px gap above the image container

        // Ensure tooltip does not get cut off by screen boundaries
        if (x < 10) x = 10;
        if (x + tooltipWidth > window.innerWidth - 10) {
            x = window.innerWidth - tooltipWidth - 10;
        }

        // Get sticky header height to avoid overlap
        const header = document.querySelector('.main-header');
        const headerHeight = header ? header.offsetHeight : 0;
        const topBoundary = headerHeight + 10;

        if (y < topBoundary) {
            // If not enough space above, position below the container instead
            y = rect.bottom + 15;
        }

        if (y + tooltipHeight > window.innerHeight - 10) {
            y = window.innerHeight - tooltipHeight - 10;
        }

        if (y < topBoundary) {
            y = topBoundary;
        }

        tooltipEl.style.left = `${x}px`;
        tooltipEl.style.top = `${y}px`;
    };

    grid.addEventListener('mouseover', (e) => {
        const container = e.target.closest('.product-img-container');
        if (!container) return;

        const productId = container.dataset.id;
        const product = products.find(p => p.id === productId);
        if (!product) return;

        tooltipEl.innerHTML = `
      <h4>Indian Sourcing</h4>
      <p>${product.sourcingDetails || 'Premium export quality crop, sourced from trusted farms in India.'}</p>
    `;
        tooltipEl.classList.add('visible');
        positionTooltip(container);
    });

    grid.addEventListener('mouseout', (e) => {
        const container = e.target.closest('.product-img-container');
        if (!container) return;

        const related = e.relatedTarget;
        if (related && container.contains(related)) return;

        tooltipEl.classList.remove('visible');
    });
}

// Intercept footer link clicks if we are on the homepage to switch categories dynamically
function setupFooterCategoryIntercept() {
    document.querySelectorAll('.footer-category-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/');
            if (isHomePage) {
                e.preventDefault();
                const category = link.dataset.category;
                
                // Update active tab styling
                const buttons = document.querySelectorAll('.filter-btn');
                buttons.forEach(btn => {
                    if (btn.dataset.category === category) {
                        btn.classList.add('active');
                    } else {
                        btn.classList.remove('active');
                    }
                });
                
                // Render the selected category products
                renderProducts(category);
                
                // Update URL parameter without triggering a reload
                const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?category=${encodeURIComponent(category)}#products`;
                window.history.pushState({ path: newUrl }, '', newUrl);
                
                // Scroll down to products
                const productsSection = document.getElementById('products');
                if (productsSection) {
                    productsSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}
