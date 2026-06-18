// ==================== MOBILE MENU TOGGLE ====================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ==================== SMOOTH SCROLL ACTIVE NAV ====================
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ==================== NOTIFICATION FUNCTION ====================
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 16px 24px;
        background: ${type === 'success' ? '#10B981' : '#EF4444'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 9999;
        animation: slideIn 0.3s ease;
        font-weight: 500;
    `;

    document.body.appendChild(notification);

    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==================== SCROLL ANIMATIONS ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
    observer.observe(section);
});

// ==================== COUNTER ANIMATION ====================
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + (element.textContent.includes('%') ? '%' : '+');
    }, 16);
}

// Trigger counter animation when stats section is visible
const statsCards = document.querySelectorAll('.stat-number');
let statsAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !statsAnimated) {
        statsAnimated = true;
        statsCards.forEach(card => {
            const targetText = card.textContent.trim();
            const target = parseInt(targetText);
            if (!isNaN(target)) {
                animateCounter(card, target);
            }
        });
    }
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-grid');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ==================== PARALLAX EFFECT ====================
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        const stars = hero.querySelector('.stars');
        if (stars) {
            stars.style.backgroundPosition = `${scrolled * 0.5}px ${scrolled * 0.5}px`;
        }
    }
});

// ==================== NEWSLETTER FORM ====================
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;

        if (email) {
            showNotification('Successfully subscribed to newsletter!', 'success');
            newsletterForm.reset();
        }
    });
}

// ==================== VIDEO TESTIMONIAL INTERACTIONS ====================
const videos = document.querySelectorAll('.video-container video');
videos.forEach(video => {
    video.addEventListener('play', () => {
        // Pause other videos
        videos.forEach(v => {
            if (v !== video) {
                v.pause();
            }
        });
    });
});

// ==================== DARK MODE TOGGLE (OPTIONAL) ====================
function initDarkMode() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        });

        // Load saved preference
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
        }
    }
}

initDarkMode();

// ==================== LAZY LOADING IMAGES ====================
const images = document.querySelectorAll('img');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// ==================== SMOOTH SCROLL BEHAVIOR ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const element = document.querySelector(href);
            const top = element.offsetTop - 70; // Adjust for navbar height
            window.scrollTo({
                top: top,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== FORM VALIDATION ====================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

const emailInputs = document.querySelectorAll('input[type="email"]');
emailInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.value && !validateEmail(input.value)) {
            input.style.borderColor = '#EF4444';
            showNotification('Please enter a valid email address', 'error');
        } else {
            input.style.borderColor = '#E0E7FF';
        }
    });
});

// ==================== INIT ON PAGE LOAD ====================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio website loaded successfully!');

    // Add animation to elements on load
    const elements = document.querySelectorAll('.portfolio-item, .testimonial-card, .timeline-item');
    elements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
    });
});

// ==================== PERFORMANCE OPTIMIZATION ====================
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Use debounced scroll handler
const debouncedScroll = debounce(() => {
    // Update active nav link
    let current = '';
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}, 100);

window.addEventListener('scroll', debouncedScroll);

// ==================== PRELOAD CRITICAL RESOURCES ====================
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        // Preload images
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.as = 'image';
        link.href = 'assets/mercy.png';
        document.head.appendChild(link);
    });
}

console.log('All scripts loaded and initialized successfully!');
