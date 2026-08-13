const Cart = {
    key: 'sneha_spices_cart',

    getItems: function () {
        const stored = localStorage.getItem(this.key);
        return stored ? JSON.parse(stored) : [];
    },

    addItem: function (product) {
        const items = this.getItems();
        const existing = items.find(item => item.id === product.id);

        if (!existing) {
            items.push({ ...product, volume: '' }); // Add volume field
            localStorage.setItem(this.key, JSON.stringify(items));
            this.updateCounter();
            alert(`Added ${product.name} to Quote Basket`);
        } else {
            alert(`${product.name} is already in your basket`);
        }
    },

    removeItem: function (productId) {
        let items = this.getItems();
        items = items.filter(item => item.id !== productId);
        localStorage.setItem(this.key, JSON.stringify(items));
        this.updateCounter();
        // Dispatch event for UI updates if on inquiry page
        window.dispatchEvent(new Event('cartUpdated'));
    },

    updateVolume: function (productId, volume) {
        const items = this.getItems();
        const item = items.find(i => i.id === productId);
        if (item) {
            item.volume = volume;
            localStorage.setItem(this.key, JSON.stringify(items));
        }
    },

    clear: function () {
        localStorage.removeItem(this.key);
        this.updateCounter();
        window.dispatchEvent(new Event('cartUpdated'));
    },

    updateCounter: function () {
        const items = this.getItems();
        // Update the badge
        const badges = document.querySelectorAll('.cart-badge');
        badges.forEach(el => {
            el.textContent = items.length;
            // Show badge if items > 0, else hide (or stick to flex/none)
            el.style.display = items.length > 0 ? 'flex' : 'none';
        });
    }
};

// Initialize counter and mobile menu on load
document.addEventListener('DOMContentLoaded', () => {
    Cart.updateCounter();
    setupMobileMenu();
});

function setupMobileMenu() {
    const headerActions = document.querySelector('.header-actions');
    const navArea = document.querySelector('.nav-area');
    if (!headerActions || !navArea) return;

    // Create mobile menu toggle button
    const button = document.createElement('button');
    button.className = 'menu-toggle';
    button.setAttribute('aria-label', 'Toggle menu');
    button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-menu">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
    `;
    headerActions.appendChild(button);

    // Toggle menu state on click
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        navArea.classList.toggle('open');
        
        const isOpen = navArea.classList.contains('open');
        if (isOpen) {
            button.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            `;
        } else {
            button.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-menu">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
            `;
        }
    });

    // Close menu when clicking anywhere else
    document.addEventListener('click', (e) => {
        if (!navArea.contains(e.target) && !button.contains(e.target)) {
            navArea.classList.remove('open');
            button.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-menu">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
            `;
        }
    });

    // Close menu when clicking on any menu link
    navArea.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navArea.classList.remove('open');
            button.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-menu">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
            `;
        });
    });
}
