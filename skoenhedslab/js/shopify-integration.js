/**
 * Shopify Integration Script for Skønheds-Laboratoriet
 * This script handles the integration with the Shopify webshop at 37skinlab.dk
 */

// Configuration
const SHOPIFY_DOMAIN = 'www.37skinlab.dk';
const SHOPIFY_API_URL = `https://${SHOPIFY_DOMAIN}/api/2023-01/graphql.json`;
const FEATURED_PRODUCT_ID = 'gid://shopify/Product/1234567890'; // Replace with actual product ID for PrecisionX5

// Initialize Shopify integration
document.addEventListener('DOMContentLoaded', function() {
    initShopifyIntegration();
});

/**
 * Initialize Shopify integration features
 */
function initShopifyIntegration() {
    // Add cart count indicator to webshop link if available
    updateCartIndicator();
    
    // Initialize product quick view buttons
    initQuickViewButtons();
    
    // Initialize add to cart buttons
    initAddToCartButtons();
    
    // Load featured products if on homepage
    if (document.querySelector('.featured-products')) {
        loadFeaturedProducts();
    }
    
    // Load product recommendations if on product page
    if (document.querySelector('.product-recommendations')) {
        loadProductRecommendations();
    }
}

/**
 * Update cart indicator with current cart count
 */
function updateCartIndicator() {
    // This would typically use Shopify's AJAX API to get the cart count
    // For demonstration, we'll just simulate this
    
    const webshopLinks = document.querySelectorAll('a[href*="37skinlab.dk"]');
    
    // Fetch cart data from Shopify (simulated)
    fetchCartData()
        .then(cartData => {
            const cartCount = cartData.item_count || 0;
            
            // Update all webshop links with cart count
            if (cartCount > 0) {
                webshopLinks.forEach(link => {
                    // Only add indicator if it doesn't already exist
                    if (!link.querySelector('.cart-indicator')) {
                        const indicator = document.createElement('span');
                        indicator.className = 'cart-indicator';
                        indicator.textContent = cartCount;
                        link.appendChild(indicator);
                    }
                });
            }
        })
        .catch(error => {
            console.error('Error fetching cart data:', error);
        });
}

/**
 * Simulate fetching cart data from Shopify
 * In a real implementation, this would use Shopify's AJAX API
 */
function fetchCartData() {
    return new Promise((resolve) => {
        // Simulate API call
        setTimeout(() => {
            resolve({
                item_count: 0,
                items: [],
                total_price: 0
            });
        }, 300);
    });
}

/**
 * Initialize quick view buttons for products
 */
function initQuickViewButtons() {
    const quickViewButtons = document.querySelectorAll('.quick-view-btn');
    
    quickViewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const productId = this.dataset.productId;
            if (productId) {
                openQuickView(productId);
            }
        });
    });
}

/**
 * Open quick view modal for a product
 */
function openQuickView(productId) {
    // This would typically fetch product details from Shopify and display in a modal
    // For demonstration, we'll just redirect to the product page
    window.location.href = `https://${SHOPIFY_DOMAIN}/products/${productId}`;
}

/**
 * Initialize add to cart buttons
 */
function initAddToCartButtons() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const productId = this.dataset.productId;
            const quantity = parseInt(this.dataset.quantity || 1);
            
            if (productId) {
                addToCart(productId, quantity);
            }
        });
    });
}

/**
 * Add a product to the Shopify cart
 */
function addToCart(productId, quantity) {
    // This would typically use Shopify's AJAX API to add to cart
    // For demonstration, we'll just redirect to the cart page with the product
    window.location.href = `https://${SHOPIFY_DOMAIN}/cart/add?id=${productId}&quantity=${quantity}`;
}

/**
 * Load featured products from Shopify
 */
function loadFeaturedProducts() {
    // This would typically fetch featured products from Shopify
    // For demonstration, we'll just show a console message
    console.log('Loading featured products from Shopify...');
    
    // In a real implementation, this would fetch products and update the DOM
    const featuredProductsContainer = document.querySelector('.featured-products');
    if (featuredProductsContainer) {
        // Placeholder for actual API call
        console.log('Featured products container found, would update with real products');
    }
}

/**
 * Load product recommendations based on current product
 */
function loadProductRecommendations() {
    // This would typically fetch product recommendations from Shopify
    // For demonstration, we'll just show a console message
    console.log('Loading product recommendations from Shopify...');
    
    // In a real implementation, this would fetch recommendations and update the DOM
    const recommendationsContainer = document.querySelector('.product-recommendations');
    if (recommendationsContainer) {
        // Placeholder for actual API call
        console.log('Recommendations container found, would update with real recommendations');
    }
}

/**
 * Format price in Danish currency format
 */
function formatPrice(price) {
    return new Intl.NumberFormat('da-DK', {
        style: 'currency',
        currency: 'DKK',
        minimumFractionDigits: 0
    }).format(price);
}

/**
 * Check if a product is in stock
 */
function isProductInStock(product) {
    return product && product.available;
}

/**
 * Get product URL from handle
 */
function getProductUrl(handle) {
    return `https://${SHOPIFY_DOMAIN}/products/${handle}`;
}

/**
 * Subscribe to Shopify events
 */
function subscribeToShopifyEvents() {
    // This would typically use Shopify's Events API
    // For demonstration, we'll just show a console message
    console.log('Subscribing to Shopify events...');
}
