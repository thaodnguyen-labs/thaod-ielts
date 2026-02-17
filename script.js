// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-link[href="#${id}"]`);
        if (link) {
            link.classList.toggle('active', scrollY >= top && scrollY < top + height);
        }
    });
});

// Scroll animations
const fadeElements = document.querySelectorAll(
    '.about-card, .timeline-item, .career-card, .test-card-small, .ielts-card, ' +
    '.knowledge-item, .course-card, .student-bubble, .band-row, .summary-item, .contact-card'
);

fadeElements.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, i * 80);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

fadeElements.forEach(el => observer.observe(el));

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== Language Toggle =====
let currentLang = 'en';
const langToggle = document.getElementById('langToggle');

function switchLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;

    // Update all elements with data-en / data-vi attributes
    document.querySelectorAll('[data-en][data-vi]').forEach(el => {
        el.textContent = el.getAttribute(`data-${lang}`);
    });

    // Update toggle button
    const flagSpan = langToggle.querySelector('.lang-flag');
    const textSpan = langToggle.querySelector('.lang-text');
    if (lang === 'en') {
        flagSpan.textContent = '\u{1F1EC}\u{1F1E7}';
        textSpan.textContent = 'EN';
    } else {
        flagSpan.textContent = '\u{1F1FB}\u{1F1F3}';
        textSpan.textContent = 'VI';
    }

    // Save preference
    localStorage.setItem('lang', lang);
}

langToggle.addEventListener('click', () => {
    switchLanguage(currentLang === 'en' ? 'vi' : 'en');
});

// Load saved language preference (default English)
const savedLang = localStorage.getItem('lang') || 'en';
if (savedLang !== 'en') {
    switchLanguage(savedLang);
}
