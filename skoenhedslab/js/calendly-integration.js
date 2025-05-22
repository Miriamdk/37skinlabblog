/**
 * Calendly Integration Script for Skønheds-Laboratoriet
 * This script handles the integration with Calendly for booking consultations
 */

// Configuration
const CALENDLY_USERNAME = 'your-calendly'; // Replace with actual Calendly username
const CONSULTATION_TYPES = {
    'hudanalyse': {
        name: 'Hudanalyse & Rådgivning',
        duration: 30,
        price: 299,
        url: `https://calendly.com/${CALENDLY_USERNAME}/hudanalyse`
    },
    'microneedling': {
        name: 'Microneedling Masterclass',
        duration: 45,
        price: 499,
        url: `https://calendly.com/${CALENDLY_USERNAME}/microneedling`
    },
    'holistisk': {
        name: 'Holistisk Skønhedsplan',
        duration: 60,
        price: 699,
        url: `https://calendly.com/${CALENDLY_USERNAME}/holistisk`
    }
};

// Initialize Calendly integration
document.addEventListener('DOMContentLoaded', function() {
    initCalendlyIntegration();
});

/**
 * Initialize Calendly integration features
 */
function initCalendlyIntegration() {
    // Initialize Calendly widget if on consultation page
    if (document.getElementById('calendly-widget')) {
        initCalendlyWidget();
    }
    
    // Initialize consultation type buttons
    initConsultationButtons();
    
    // Add event tracking for Calendly events
    addCalendlyEventTracking();
}

/**
 * Initialize the default Calendly widget
 */
function initCalendlyWidget() {
    if (typeof Calendly !== 'undefined') {
        Calendly.initInlineWidget({
            url: `https://calendly.com/${CALENDLY_USERNAME}`,
            parentElement: document.getElementById('calendly-widget'),
            prefill: {},
            utm: {}
        });
    } else {
        console.error('Calendly script not loaded');
    }
}

/**
 * Initialize consultation type buttons
 */
function initConsultationButtons() {
    const consultationButtons = document.querySelectorAll('[onclick*="openCalendly"]');
    
    consultationButtons.forEach(button => {
        // Extract consultation type from onclick attribute
        const onclickAttr = button.getAttribute('onclick');
        const match = onclickAttr.match(/openCalendly\(['"]([^'"]+)['"]\)/);
        
        if (match && match[1]) {
            const consultationType = match[1];
            
            // Replace onclick with our function to avoid potential issues
            button.removeAttribute('onclick');
            button.addEventListener('click', function(e) {
                e.preventDefault();
                openCalendly(consultationType);
            });
        }
    });
}

/**
 * Open Calendly widget for specific consultation type
 */
function openCalendly(type) {
    const consultationInfo = CONSULTATION_TYPES[type];
    
    if (!consultationInfo) {
        console.error(`Unknown consultation type: ${type}`);
        return;
    }
    
    const calendlyWidget = document.getElementById('calendly-widget');
    if (!calendlyWidget) {
        console.error('Calendly widget container not found');
        return;
    }
    
    // Clear existing widget
    calendlyWidget.innerHTML = '';
    
    // Initialize new widget with specific consultation type
    if (typeof Calendly !== 'undefined') {
        Calendly.initInlineWidget({
            url: consultationInfo.url,
            parentElement: calendlyWidget,
            prefill: {
                name: getStoredUserName(),
                email: getStoredUserEmail(),
                customAnswers: {
                    a1: `Booking fra Skønheds-Laboratoriet blog`
                }
            },
            utm: getUtmParams()
        });
        
        // Scroll to calendly section
        document.getElementById('calendly').scrollIntoView({behavior: 'smooth'});
        
        // Track consultation selection
        trackConsultationSelection(type);
    } else {
        console.error('Calendly script not loaded');
    }
}

/**
 * Get stored user name from localStorage if available
 */
function getStoredUserName() {
    return localStorage.getItem('user_name') || '';
}

/**
 * Get stored user email from localStorage if available
 */
function getStoredUserEmail() {
    return localStorage.getItem('user_email') || '';
}

/**
 * Get UTM parameters from URL
 */
function getUtmParams() {
    const params = {};
    const searchParams = new URLSearchParams(window.location.search);
    
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(param => {
        if (searchParams.has(param)) {
            params[param] = searchParams.get(param);
        }
    });
    
    return params;
}

/**
 * Add event tracking for Calendly events
 */
function addCalendlyEventTracking() {
    if (typeof Calendly !== 'undefined') {
        // Track when someone views the scheduling page
        Calendly.on('profile_page_viewed', function() {
            trackCalendlyEvent('profile_page_viewed');
        });
        
        // Track when someone selects a date
        Calendly.on('date_and_time_selected', function() {
            trackCalendlyEvent('date_and_time_selected');
        });
        
        // Track when someone completes the scheduling process
        Calendly.on('scheduling_completed', function() {
            trackCalendlyEvent('scheduling_completed');
            
            // Show success message
            showBookingSuccessMessage();
        });
    }
}

/**
 * Track Calendly events
 */
function trackCalendlyEvent(eventName) {
    // This would typically send data to an analytics platform
    console.log(`Calendly event tracked: ${eventName}`);
    
    // If Google Analytics is available
    if (typeof ga !== 'undefined') {
        ga('send', 'event', 'Calendly', eventName);
    }
}

/**
 * Track consultation selection
 */
function trackConsultationSelection(type) {
    const consultationInfo = CONSULTATION_TYPES[type];
    
    // This would typically send data to an analytics platform
    console.log(`Consultation selected: ${consultationInfo.name}`);
    
    // If Google Analytics is available
    if (typeof ga !== 'undefined') {
        ga('send', 'event', 'Consultation', 'selection', consultationInfo.name);
    }
}

/**
 * Show booking success message
 */
function showBookingSuccessMessage() {
    const calendlySection = document.getElementById('calendly');
    if (calendlySection) {
        // Create success message element
        const successMessage = document.createElement('div');
        successMessage.className = 'booking-success-message';
        successMessage.innerHTML = `
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3>Tak for din booking!</h3>
            <p>Din konsultation er nu bekræftet. Du vil modtage en bekræftelsesmail med detaljer og et link til Zoom-mødet.</p>
            <p>Jeg glæder mig til at tale med dig!</p>
        `;
        
        // Replace Calendly widget with success message
        const calendlyWidget = document.getElementById('calendly-widget');
        if (calendlyWidget) {
            calendlyWidget.innerHTML = '';
            calendlyWidget.appendChild(successMessage);
        }
    }
}

/**
 * Store user information for future bookings
 */
function storeUserInformation(name, email) {
    if (name) {
        localStorage.setItem('user_name', name);
    }
    
    if (email) {
        localStorage.setItem('user_email', email);
    }
}
