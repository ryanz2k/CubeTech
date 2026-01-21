// CubeTech Innovations - Main JavaScript

// DOM Elements
const loader = document.getElementById('loader');
const navbar = document.getElementById('navbar');
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');
const backToTop = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');
const toast = document.getElementById('toast');
const carouselTrack = document.getElementById('carouselTrack');
const carouselPrev = document.getElementById('carouselPrev');
const carouselNext = document.getElementById('carouselNext');
const carouselDots = document.getElementById('carouselDots');

// Loader
window.addEventListener('load', () => {
    document.body.classList.add('loading');
    
    // Simulate minimum loading time for effect
    setTimeout(() => {
        loader.classList.add('hidden');
        document.body.classList.remove('loading');
        
        // Trigger initial animations
        animateOnScroll();
    }, 1500);
});

// Navigation

// Scroll effect for navbar
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Handle dropdown on mobile
const dropdownItems = document.querySelectorAll('.has-dropdown');

dropdownItems.forEach(item => {
    const link = item.querySelector('.nav-link');
    
    link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            item.classList.toggle('open');
        }
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Back to Top
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Scroll Animations
function animateOnScroll() {
    const elements = document.querySelectorAll('[data-animate]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, delay);
                
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(el => observer.observe(el));
}

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.count);
                const duration = 2000;
                const start = 0;
                const startTime = performance.now();
                
                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Easing function (ease-out-expo)
                    const easeOutExpo = 1 - Math.pow(2, -10 * progress);
                    const current = Math.floor(start + (target - start) * easeOutExpo);
                    
                    counter.textContent = current;
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                }
                
                requestAnimationFrame(updateCounter);
                observer.unobserve(counter);
            }
        });
    }, {
        threshold: 0.5
    });
    
    counters.forEach(counter => observer.observe(counter));
}

// Initialize counters
animateCounters();

// Team Carousel
let currentSlide = 0;
let slidesToShow = 4;
let totalSlides = 2;
const totalMembers = 8; // Total team members

function updateSlidesToShow() {
    if (window.innerWidth <= 480) {
        slidesToShow = 1;
        totalSlides = totalMembers;
    } else if (window.innerWidth <= 768) {
        slidesToShow = 2;
        totalSlides = Math.ceil(totalMembers / 2);
    } else if (window.innerWidth <= 1024) {
        slidesToShow = 3;
        totalSlides = Math.ceil(totalMembers / 3);
    } else {
        slidesToShow = 4;
        totalSlides = Math.ceil(totalMembers / 4);
    }
    
    // Update dots
    updateDots();
}

function updateDots() {
    if (carouselDots) {
        carouselDots.innerHTML = '';
        
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            if (i === currentSlide) dot.classList.add('active');
            dot.dataset.index = i;
            dot.setAttribute('aria-label', `Slide ${i + 1}`);
            
            dot.addEventListener('click', () => {
                currentSlide = i;
                updateCarousel();
            });
            
            carouselDots.appendChild(dot);
        }
    }
}

function updateCarousel() {
    if (!carouselTrack) return;
    
    const slideWidth = 100 / slidesToShow;
    const offset = currentSlide * slideWidth * slidesToShow;
    
    carouselTrack.style.transform = `translateX(-${offset}%)`;
    
    // Update dots
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
    
    // Update button states
    if (carouselPrev) {
        carouselPrev.style.opacity = currentSlide === 0 ? '0.5' : '1';
        carouselPrev.disabled = currentSlide === 0;
    }
    
    if (carouselNext) {
        carouselNext.style.opacity = currentSlide >= totalSlides - 1 ? '0.5' : '1';
        carouselNext.disabled = currentSlide >= totalSlides - 1;
    }
}

if (carouselPrev) {
    carouselPrev.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            updateCarousel();
        }
    });
}

if (carouselNext) {
    carouselNext.addEventListener('click', () => {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updateCarousel();
        }
    });
}

// Touch support for carousel
let touchStartX = 0;
let touchEndX = 0;

if (carouselTrack) {
    carouselTrack.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    carouselTrack.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (diff > swipeThreshold && currentSlide < totalSlides - 1) {
        currentSlide++;
        updateCarousel();
    } else if (diff < -swipeThreshold && currentSlide > 0) {
        currentSlide--;
        updateCarousel();
    }
}

// Initialize carousel
updateSlidesToShow();
updateCarousel();

// Update on resize
window.addEventListener('resize', () => {
    updateSlidesToShow();
    currentSlide = 0;
    updateCarousel();
});

// Contact Form
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = `
            <span>Sending...</span>
            <svg class="spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
                <path d="M12 2a10 10 0 0 1 10 10"/>
            </svg>
        `;
        submitBtn.disabled = true;
        
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Reset form and show success
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Show toast notification
        showToast('Message sent successfully!');
    });
}

function showToast(message) {
    const toastMessage = toast.querySelector('.toast-message');
    toastMessage.textContent = message;
    
    toast.classList.add('visible');
    
    setTimeout(() => {
        toast.classList.remove('visible');
    }, 4000);
}

// Input Animations
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
});

// Newsletter Form
const newsletterForm = document.querySelector('.footer-newsletter');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const input = newsletterForm.querySelector('input');
        
        if (input.value) {
            showToast('Thank you for subscribing!');
            input.value = '';
        }
    });
}

// Parallax Effect
const heroImage = document.querySelector('.hero-image');

if (heroImage && window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        
        heroImage.style.transform = `translateY(${rate}px) scale(1.1)`;
    });
}

// Image Lazy Loading
const lazyImages = document.querySelectorAll('img[data-src]');

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Hover Effects
const teamMembers = document.querySelectorAll('.team-member');

teamMembers.forEach(member => {
    const image = member.querySelector('.member-image');
    
    member.addEventListener('mouseenter', () => {
        teamMembers.forEach(m => {
            if (m !== member) {
                m.style.opacity = '0.6';
                m.style.transform = 'scale(0.95)';
            }
        });
    });
    
    member.addEventListener('mouseleave', () => {
        teamMembers.forEach(m => {
            m.style.opacity = '1';
            m.style.transform = 'scale(1)';
        });
    });
});

// Typing Effect
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    // ESC to close mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Debounce Utility
function debounce(func, wait = 20) {
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

// Apply debounce to scroll events
const debouncedScroll = debounce(() => {
    // Any expensive scroll operations can go here
}, 10);

window.addEventListener('scroll', debouncedScroll, { passive: true });

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('dom-loaded');
});

