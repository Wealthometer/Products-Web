// Import GSAP and ScrollTrigger
const gsap = window.gsap;
const ScrollTrigger = window.ScrollTrigger;

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initAnimations();
    initNavigation();
    initScrollEffects();
    updateCartCount();
});

// Animation Functions
function initAnimations() {
    // Hero animations
    const heroTl = gsap.timeline();
    
    heroTl.to('.hero-text', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
    })
    .to('.hero-image', {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out'
    }, '-=0.5');

    // Featured items animation
    gsap.set('.featured-item', { opacity: 0, y: 50 });
    
    ScrollTrigger.create({
        trigger: '.featured',
        start: 'top 80%',
        onEnter: () => {
            gsap.to('.featured-item', {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out'
            });
        }
    });

    // Collection items animation
    gsap.set('.collection-item', { opacity: 0, y: 50 });
    
    ScrollTrigger.create({
        trigger: '.collections',
        start: 'top 80%',
        onEnter: () => {
            gsap.to('.collection-item', {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out'
            });
        }
    });

    // About section animation
    gsap.set('.about-text', { opacity: 0, x: -50 });
    gsap.set('.about-image', { opacity: 0, x: 50 });
    
    ScrollTrigger.create({
        trigger: '.about',
        start: 'top 80%',
        onEnter: () => {
            gsap.to('.about-text', {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: 'power3.out'
            });
            gsap.to('.about-image', {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: 'power3.out'
            });
        }
    });

    // Stats counter animation
    ScrollTrigger.create({
        trigger: '.about-stats',
        start: 'top 80%',
        onEnter: () => {
            document.querySelectorAll('.stat-number').forEach(stat => {
                const target = parseInt(stat.textContent.replace(/\D/g, ''));
                const suffix = stat.textContent.replace(/[0-9]/g, '');
                
                gsap.to({ value: 0 }, {
                    value: target,
                    duration: 2,
                    ease: 'power2.out',
                    onUpdate: function() {
                        stat.textContent = Math.floor(this.targets()[0].value) + suffix;
                    }
                });
            });
        }
    });
}

// Navigation Functions
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.getElementById('navbar');

    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Navbar scroll effect
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll Effects
function initScrollEffects() {
    // Parallax effect for hero image
    if (document.querySelector('.hero-img')) {
        gsap.to('.hero-img', {
            yPercent: -50,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    }

    // Fade in elements on scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));
}

// Newsletter Form
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        // Simulate API call
        const button = this.querySelector('button');
        const originalText = button.textContent;
        button.innerHTML = '<span class="loading"></span>';
        button.disabled = true;
        
        setTimeout(() => {
            button.textContent = 'Subscribed!';
            button.style.backgroundColor = '#28a745';
            this.querySelector('input[type="email"]').value = '';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.backgroundColor = '';
                button.disabled = false;
            }, 2000);
        }, 1500);
    });
}

// Update cart count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

// Utility Functions
function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(price);
}

function showMessage(message, type = 'success') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `${type}-message`;
    messageDiv.textContent = message;
    
    document.body.insertBefore(messageDiv, document.body.firstChild);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Debounce function for search and filters
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
