// Language Switcher Functionality
function changeLanguage(lang) {
    // Update HTML direction and language
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    


    // Update all localized elements
    const elements = document.querySelectorAll('[data-lang-ar], [data-lang-en]');
    elements.forEach(element => {
        // Update text content
        if (element.getAttribute(`data-lang-${lang}`)) {
            element.textContent = element.getAttribute(`data-lang-${lang}`);
        }
        
        // Update placeholders
        if (element.hasAttribute('placeholder')) {
            const placeholderAttr = element.getAttribute(`data-lang-${lang}-placeholder`);
            if (placeholderAttr) {
                element.placeholder = placeholderAttr;
            }
        }
        
        // Update titles/alt text
        if (element.hasAttribute('title')) {
            const titleAttr = element.getAttribute(`data-lang-${lang}-title`);
            if (titleAttr) {
                element.title = titleAttr;
            }
        }
    });

    // Update currency format
    const currencyElements = document.querySelectorAll('.amount');
    currencyElements.forEach(element => {
        const amount = element.getAttribute('data-amount');
        if (amount) {
            element.textContent = formatCurrency(amount, lang);
        }
    });

    // Update layout-specific elements
    if (lang === 'ar') {
        // RTL specific adjustments
        document.querySelectorAll('.icon-arrow').forEach(icon => {
            icon.classList.remove('icon-arrow-left');
            icon.classList.add('icon-arrow-right');
        });
    } else {
        // LTR specific adjustments
        document.querySelectorAll('.icon-arrow').forEach(icon => {
            icon.classList.remove('icon-arrow-right');
            icon.classList.add('icon-arrow-left');
        });
    }

    // Store language preference
    localStorage.setItem('preferredLanguage', lang);

    // Trigger resize event to fix any layout issues
    window.dispatchEvent(new Event('resize'));
}

// Initialize language switcher
document.addEventListener('DOMContentLoaded', function() {
    const languageSwitcher = document.getElementById('languageSwitcher');
    if (languageSwitcher) {
        // Set initial language from localStorage or default to Arabic
        const savedLang = localStorage.getItem('preferredLanguage') || 'ar';
        languageSwitcher.value = savedLang;
        changeLanguage(savedLang);

        // Add change event listener
        languageSwitcher.addEventListener('change', function(e) {
            changeLanguage(e.target.value);
        });
    }
});

// Helper function for currency formatting
function formatCurrency(amount, lang) {
    const numAmount = parseFloat(amount);
    if (lang === 'ar') {
        return `${numAmount.toLocaleString('ar-SA')} ريال`;
    }
    return `SAR ${numAmount.toLocaleString('en-US')}`;
} 