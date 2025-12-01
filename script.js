// Get all sections once
const sections = document.querySelectorAll('section[id]');
const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
const navLinks = document.querySelectorAll('.navlist a');

// Mobile Bottom Navigation Active State
function updateMobileNavActive() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            mobileNavItems.forEach(item => {
                item.classList.remove('active');
                const href = item.getAttribute('href');
                if (href === `#${sectionId}` || (sectionId === 'home' && href === '#home')) {
                    item.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateMobileNavActive);
window.addEventListener('load', updateMobileNavActive);

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Create mailto link (you can replace this with actual form submission)
        const mailtoLink = `mailto:pousalidolai59@gmail.com?subject=Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0D%0A%0D%0AFrom: ${encodeURIComponent(email)}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Message Sent!';
        submitBtn.style.background = '#4caf50';
        
        // Reset after 3 seconds
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
            contactForm.reset();
        }, 3000);
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

// Active link highlighting on scroll (Desktop navigation)
function highlightActiveLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightActiveLink);

// Scroll-triggered animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Add reveal animation to child elements
            const children = entry.target.querySelectorAll('.p1, .p2, .p3, .p4, .project-item');
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.style.opacity = '1';
                    child.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    });
}, observerOptions);

// Observe sections for scroll animations
document.querySelectorAll('.about-me, .skills, .projects').forEach(section => {
    observer.observe(section);
});

// Add stagger animation to project items when projects section is visible
const projectsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const projectItems = entry.target.querySelectorAll('.project-item');
            projectItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    });
}, observerOptions);

const projectsSection = document.querySelector('.projects');
if (projectsSection) {
    projectsObserver.observe(projectsSection);
}

