// Smooth scrolling for navigation links
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

// Active navigation link highlighting
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

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add active style to nav links
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--accent-light);
    }
`;
document.head.appendChild(style);

// Intersection Observer for fade-in animations
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

// Observe elements
document.querySelectorAll('.experience-item, .education-item, .skill-category, .publication-item, .conference-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Mobile menu toggle (if needed in future)
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        showScrollToTopButton();
    } else {
        hideScrollToTopButton();
    }
});

function showScrollToTopButton() {
    if (!document.getElementById('scrollToTop')) {
        const button = document.createElement('button');
        button.id = 'scrollToTop';
        button.innerHTML = '↑';
        button.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background-color: var(--accent-color);
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 24px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 999;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        `;
        button.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        button.addEventListener('mouseenter', () => {
            button.style.backgroundColor = 'var(--accent-light)';
            button.style.transform = 'scale(1.1)';
        });
        button.addEventListener('mouseleave', () => {
            button.style.backgroundColor = 'var(--accent-color)';
            button.style.transform = 'scale(1)';
        });
        document.body.appendChild(button);
    }
}

function hideScrollToTopButton() {
    const button = document.getElementById('scrollToTop');
    if (button) {
        button.remove();
    }
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrollPosition = window.pageYOffset;
    hero.style.backgroundPosition = `0 ${scrollPosition * 0.5}px`;
});

// Initialize AOS-like animations on load
window.addEventListener('load', () => {
    document.querySelectorAll('.experience-item, .education-item, .skill-category').forEach((el, index) => {
        el.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s backwards`;
    });
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any modals or dropdowns if added in future
    }
});

// Add copy to clipboard functionality for contact info
document.querySelectorAll('[data-copy]').forEach(el => {
    el.addEventListener('click', () => {
        const text = el.getAttribute('data-copy');
        navigator.clipboard.writeText(text).then(() => {
            const originalText = el.textContent;
            el.textContent = 'Copied!';
            setTimeout(() => {
                el.textContent = originalText;
            }, 2000);
        });
    });
});

// Prevent layout shift on scroll
document.documentElement.style.scrollBehavior = 'smooth';