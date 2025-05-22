// Main JavaScript file for Skønheds-Laboratoriet

document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize accordion functionality
    initAccordion();
    
    // Initialize newsletter form
    initNewsletterForm();
    
    // Load Shopify integration script
    loadShopifyIntegration();
    
    // Load Calendly integration script if on consultation page
    if (window.location.pathname.includes('konsultation')) {
        loadCalendlyIntegration();
    }
    
    // Initialize comment form
    initCommentForm();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
});

// Mobile menu functionality
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
}

// Accordion functionality for FAQ sections
function initAccordion() {
    const accordionItems = document.querySelectorAll('.faq-item h3');
    
    if (accordionItems.length > 0) {
        accordionItems.forEach(item => {
            item.addEventListener('click', function() {
                this.parentElement.classList.toggle('active');
                
                // Close other open items
                accordionItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.parentElement.classList.remove('active');
                    }
                });
            });
        });
    }
}

// Newsletter form submission
function initNewsletterForm() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    if (newsletterForms.length > 0) {
        newsletterForms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const emailInput = this.querySelector('input[type="email"]');
                const email = emailInput.value.trim();
                
                if (validateEmail(email)) {
                    // Simulate form submission
                    this.innerHTML = '<p class="success-message">Tak for din tilmelding! Du vil snart modtage en bekræftelsesmail.</p>';
                    
                    // In a real implementation, you would send this data to your server or newsletter service
                    console.log('Newsletter signup:', email);
                } else {
                    // Show error message
                    const errorMsg = document.createElement('p');
                    errorMsg.classList.add('error-message');
                    errorMsg.textContent = 'Indtast venligst en gyldig e-mailadresse.';
                    
                    // Remove any existing error messages
                    const existingError = this.querySelector('.error-message');
                    if (existingError) {
                        existingError.remove();
                    }
                    
                    this.appendChild(errorMsg);
                }
            });
        });
    }
}

// Load Shopify integration script
function loadShopifyIntegration() {
    const shopifyScript = document.createElement('script');
    shopifyScript.src = '/js/shopify-integration.js';
    document.body.appendChild(shopifyScript);
}

// Load Calendly integration script
function loadCalendlyIntegration() {
    const calendlyScript = document.createElement('script');
    calendlyScript.src = '/js/calendly-integration.js';
    document.body.appendChild(calendlyScript);
}

// Comment form submission
function initCommentForm() {
    const commentForm = document.querySelector('.comment-form form');
    
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = this.querySelector('#name');
            const emailInput = this.querySelector('#email');
            const commentInput = this.querySelector('#comment');
            
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const comment = commentInput.value.trim();
            
            if (name && validateEmail(email) && comment) {
                // Simulate form submission
                const successMsg = document.createElement('p');
                successMsg.classList.add('success-message');
                successMsg.textContent = 'Tak for din kommentar! Den vil blive vist, når den er godkendt.';
                
                // Clear form
                this.reset();
                
                // Replace form with success message
                this.parentElement.innerHTML = '';
                this.parentElement.appendChild(successMsg);
                
                // In a real implementation, you would send this data to your server
                console.log('Comment submitted:', { name, email, comment });
            } else {
                // Show error message
                const errorMsg = document.createElement('p');
                errorMsg.classList.add('error-message');
                errorMsg.textContent = 'Udfyld venligst alle påkrævede felter korrekt.';
                
                // Remove any existing error messages
                const existingError = this.querySelector('.error-message');
                if (existingError) {
                    existingError.remove();
                }
                
                this.appendChild(errorMsg);
            }
        });
    }
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    if (anchorLinks.length > 0) {
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Email validation helper function
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

// Image gallery functionality (for product pages)
function initImageGallery() {
    const thumbnails = document.querySelectorAll('.product-thumbnails img');
    const mainImage = document.querySelector('.product-main-image img');
    
    if (thumbnails.length > 0 && mainImage) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                // Update main image
                mainImage.src = this.src;
                mainImage.alt = this.alt;
                
                // Update active thumbnail
                thumbnails.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
}

// Initialize image gallery if on product page
if (window.location.pathname.includes('produkter')) {
    document.addEventListener('DOMContentLoaded', initImageGallery);
}
