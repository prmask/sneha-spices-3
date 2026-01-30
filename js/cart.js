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

// Initialize counter on load
document.addEventListener('DOMContentLoaded', () => {
    Cart.updateCounter();
});
