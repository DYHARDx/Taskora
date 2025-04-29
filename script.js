// DOM Elements
const navbar = document.querySelector('.navbar');
const scrollProgress = document.querySelector('.scroll-progress');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const loadingScreen = document.querySelector('.loading-screen');
const revealElements = document.querySelectorAll('.reveal-element');

// Loading Screen
window.addEventListener('load', () => {
    // Ensure minimum loading time of 800ms for visual effect
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        document.body.style.overflow = 'visible';
        // Initialize animations after loading
        initializeAnimations();
    }, 800);
});

// Intersection Observer for revealing elements on scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
            if (entry.target.classList.contains('stat-number')) {
                animateNumber(entry.target);
            }
        }
    });
}, observerOptions);

// Initialize animations
function initializeAnimations() {
    // Add reveal classes to elements
    const revealElements = document.querySelectorAll('.reveal-element, .reveal-left, .reveal-right');
    revealElements.forEach(element => {
        observer.observe(element);
    });

    // Animate hero section
    document.querySelector('.hero').classList.add('loaded');

    // Initialize feature cards animation
    initializeFeatureCards();
}

// Feature cards animation
function initializeFeatureCards() {
    const cards = document.querySelectorAll('.feature-card');
    cards.forEach((card, index) => {
        // Add staggered animation delay
        card.style.transitionDelay = `${index * 0.1}s`;
        
        // Add hover effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-5px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// Animate statistics numbers
function animateNumber(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const updateNumber = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(updateNumber);
        } else {
            element.textContent = target.toLocaleString();
        }
    };

    updateNumber();
}

// Navbar background on scroll
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scrolled', 'scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }

    navbar.classList.add('scrolled');
    lastScroll = currentScroll;
});

// Mobile menu toggle
menuToggle?.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Floating cards animation
const cards = document.querySelectorAll('.task-card');
cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 2}s`;
});

// Smooth scroll handling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            navLinks.classList.remove('active');
            menuToggle?.classList.remove('active');
        }
    });
});

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    // Add your newsletter subscription logic here
    alert('Thank you for subscribing! We\'ll be in touch soon.');
    e.target.reset();
});

// Add parallax effect to floating elements
document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

    document.querySelectorAll('.floating-cards .task-card').forEach(card => {
        card.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});

// Add CSS variables for animations
document.documentElement.style.setProperty('--animate-duration', '1s');

// Add custom cursor effect for interactive elements
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, button, .feature-card, .step-card, .testimonial-card').forEach(element => {
    element.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    element.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// Scroll Progress Indicator
function updateScrollProgress() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / documentHeight) * 100;
    scrollProgress.style.width = `${progress}%`;
}

// Reveal Elements on Scroll
function revealOnScroll() {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Particle Animation
function createParticle() {
    const particles = document.querySelector('.particles');
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random position
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    
    particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: var(--primary-color);
        left: ${x}%;
        top: ${y}%;
        opacity: 0;
        transform: translateY(0);
        animation: floatParticle 3s ease-in infinite;
    `;
    
    particles.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        particle.remove();
    }, 3000);
}

// Create particles periodically
setInterval(createParticle, 200);

// Hover Effect for Cards
document.querySelectorAll('.feature-card, .benefit-card, .testimonial-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const angleX = (y - centerY) / 20;
        const angleY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// Add CSS for particle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes floatParticle {
        0% {
            opacity: 0;
            transform: translateY(0);
        }
        20% {
            opacity: 0.5;
        }
        80% {
            opacity: 0.5;
        }
        100% {
            opacity: 0;
            transform: translateY(-100px);
        }
    }
`;
document.head.appendChild(style);

// Event Listeners
window.addEventListener('scroll', () => {
    updateScrollProgress();
    revealOnScroll();
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks.style.display = 'flex';
    } else {
        navLinks.style.display = 'none';
    }
});

// Initialize
revealOnScroll(); 