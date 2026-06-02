// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    preloader.classList.add('completed');
});

// Theme Toggle
const themeToggle = document.querySelector('.toggle-theme');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    // Change icon
    if (document.body.classList.contains('light-theme')) {
        themeToggle.classList.remove('fa-moon');
        themeToggle.classList.add('fa-sun');
    } else {
        themeToggle.classList.remove('fa-sun');
        themeToggle.classList.add('fa-moon');
    }
});

// Mobile Menu
const menuBtn = document.querySelector('.menu-btn');
const navMenu = document.querySelector('.nav-menu');

menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    // Change icon
    if (navMenu.classList.contains('active')) {
        menuBtn.classList.remove('fa-bars');
        menuBtn.classList.add('fa-times');
    } else {
        menuBtn.classList.remove('fa-times');
        menuBtn.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuBtn.classList.remove('fa-times');
        menuBtn.classList.add('fa-bars');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

// Smooth scrolling for anchor links (already smooth via CSS but we can add behavior)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.match-card, .player-card, .news-card, .stat-card, .gallery-grid img, .contact-form');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
            element.classList.add('revealed');
        }
    });
};

// Add revealed class initially for elements already in view
window.addEventListener('load', revealOnScroll);
window.addEventListener('scroll', revealOnScroll);

// Initialize revealed class in CSS (we'll add via JS)
revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

// When revealed
const revealOnScrollClass = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

window.addEventListener('load', revealOnScrollClass);
window.addEventListener('scroll', revealOnScrollClass);

// Live Match Timer Update (simple simulation)
const matchTimers = document.querySelectorAll('.timer');
setInterval(() => {
    matchTimers.forEach(timer => {
        // Simulate time increment (for demo, just add a second every 10 seconds real time)
        // In real app, you would get actual match time from API
        let text = timer.textContent;
        // Simple increment of minutes (not accurate but for demo)
        if (text.includes("'")) {
            let parts = text.split("' + ");
            let minutes = parseInt(parts[0]);
            let extra = parts[1] ? parseInt(parts[1].replace("'", "")) : 0;
            // Increment extra time every 10 seconds (simulated)
            // We'll just add a bit randomly for demo
            if (Math.random() > 0.9) {
                extra++;
                if (extra >= 5) {
                    extra = 0;
                    minutes++;
                }
            }
            timer.textContent = `${minutes}' + ${extra}'`;
        }
    });
}, 10000); // update every 10 seconds

// Lightbox for Gallery
const galleryImages = document.querySelectorAll('.gallery-grid img');
const lightbox = document.createElement('div');
lightbox.classList.add('lightbox');
document.body.appendChild(lightbox);

const lightboxImg = document.createElement('img');
lightbox.appendChild(lightboxImg);

galleryImages.forEach(img => {
    img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
    });
});

lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) {
        lightbox.classList.remove('active');
    }
});

// Close lightbox with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        lightbox.classList.remove('active');
    }
});

// Add animation to live indicator (already done via CSS pulse)

// Add some random goal updates for stats (optional)
const statCounts = document.querySelectorAll('.count');
setInterval(() => {
    statCounts.forEach(count => {
        // Increment by a small random number occasionally
        if (Math.random() > 0.95) {
            let current = parseInt(count.textContent);
            count.textContent = current + Math.floor(Math.random() * 3);
        }
    });
}, 15000);
