// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    console.log('SOEN287 Web Development Project Loaded');
    
    // Initialize all functionality
    initSmoothScrolling();
    initInteractiveButton();
    initContactForm();
    initScrollAnimations();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Interactive button functionality
function initInteractiveButton() {
    const interactiveBtn = document.getElementById('interactive-btn');
    let clickCount = 0;
    
    const messages = [
        'Hello! 你好!',
        'Welcome to Web Development!',
        '欢迎来到网页开发!',
        'SOEN287 is awesome!',
        'Keep clicking for more!',
        'You\'re doing great!',
        'Web development is fun!',
        '网页开发很有趣!'
    ];
    
    interactiveBtn.addEventListener('click', function() {
        clickCount++;
        
        // Change button text
        this.textContent = messages[clickCount % messages.length];
        
        // Add visual feedback
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 100);
        
        // Change colors randomly
        const colors = ['#00b894', '#e17055', '#6c5ce7', '#fd79a8', '#fdcb6e'];
        this.style.backgroundColor = colors[clickCount % colors.length];
        
        // Create sparkle effect
        createSparkle(this);
        
        console.log(`Button clicked ${clickCount} times`);
    });
}

// Create sparkle animation
function createSparkle(button) {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.position = 'absolute';
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';
    sparkle.style.fontSize = '20px';
    sparkle.style.animation = 'sparkleAnimation 1s ease-out forwards';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '1000';
    
    button.style.position = 'relative';
    button.appendChild(sparkle);
    
    // Remove sparkle after animation
    setTimeout(() => {
        if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
        }
    }, 1000);
}

// Add sparkle animation CSS
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkleAnimation {
        0% {
            opacity: 1;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(1) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(360deg);
        }
    }
`;
document.head.appendChild(sparkleStyle);

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !message) {
            showMessage('Please fill in all fields!', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email address!', 'error');
            return;
        }
        
        // Simulate form submission
        showMessage('Thank you for your message! 谢谢你的信息!', 'success');
        
        // Reset form
        this.reset();
        
        console.log('Form submitted:', { name, email, message });
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show message function
function showMessage(text, type) {
    // Remove existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const message = document.createElement('div');
    message.className = `form-message ${type}`;
    message.textContent = text;
    message.style.cssText = `
        padding: 10px;
        margin: 10px 0;
        border-radius: 5px;
        text-align: center;
        font-weight: 500;
        ${type === 'success' ? 
            'background: #d4edda; color: #155724; border: 1px solid #c3e6cb;' :
            'background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'
        }
    `;
    
    // Insert message
    const form = document.getElementById('contact-form');
    form.insertBefore(message, form.firstChild);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        if (message.parentNode) {
            message.remove();
        }
    }, 3000);
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe feature cards
    const features = document.querySelectorAll('.feature');
    features.forEach(feature => {
        observer.observe(feature);
    });
}

// Additional utility functions
function getCurrentTime() {
    return new Date().toLocaleString();
}

function logPageVisit() {
    console.log(`Page visited at: ${getCurrentTime()}`);
}

// Welcome message
function showWelcomeMessage() {
    console.log('🎉 Welcome to SOEN287 Web Development!');
    console.log('💻 This webpage demonstrates HTML, CSS, and JavaScript integration');
    console.log('🌟 Try interacting with the elements on the page!');
}

// Initialize welcome
setTimeout(showWelcomeMessage, 1000);
logPageVisit();