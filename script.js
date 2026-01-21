// CubeTech Innovations - Main JavaScript
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

window.addEventListener('load', () => {
    document.body.classList.add('loading');
    setTimeout(() => {
        loader.classList.add('hidden');
        document.body.classList.remove('loading');
        animateOnScroll();
    }, 1500);
});

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

mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

const dropdownItems = document.querySelectorAll('.has-dropdown');

dropdownItems.forEach(item => {
    const link = item.querySelector('.nav-link');
    
    link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            e.stopPropagation();
            item.classList.toggle('open');
        }
    });
});

navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
        const parentItem = link.closest('.has-dropdown');
        if (!parentItem || window.innerWidth > 768) {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

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

function animateOnScroll() {
    const elements = document.querySelectorAll('[data-animate]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(el => observer.observe(el));
}

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

animateCounters();

let currentSlide = 0;
let slidesToShow = 4;
let totalSlides = 2;
const totalMembers = 8;

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
    
    const container = carouselTrack.parentElement;
    const containerWidth = container.offsetWidth;
    const gapPx = window.innerWidth <= 768 ? 16 : 32;
    const itemWidth = (containerWidth - (gapPx * (slidesToShow - 1))) / slidesToShow;
    const offset = currentSlide * (itemWidth + gapPx);
    const offsetPercent = (offset / containerWidth) * 100;
    
    carouselTrack.style.transform = `translateX(-${offsetPercent}%)`;
    
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
    
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

updateSlidesToShow();
updateCarousel();

window.addEventListener('resize', () => {
    updateSlidesToShow();
    currentSlide = 0;
    updateCarousel();
});

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = `
            <span>Sending...</span>
            <svg class="spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
                <path d="M12 2a10 10 0 0 1 10 10"/>
            </svg>
        `;
        submitBtn.disabled = true;
        await new Promise(resolve => setTimeout(resolve, 2000));
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
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

const heroImage = document.querySelector('.hero-image');

if (heroImage && window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        
        heroImage.style.transform = `translateY(${rate}px) scale(1.1)`;
    });
}

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

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

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

const debouncedScroll = debounce(() => {}, 10);
window.addEventListener('scroll', debouncedScroll, { passive: true });

document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('dom-loaded');
});

