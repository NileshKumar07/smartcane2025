// Feature data
const features = [
    {
        title: 'AI-Based Step-by-Step Voice Navigation',
        icon: 'fas fa-route',
        description: 'Voice-guided navigation system that provides step-by-step directions using AI and GPS technology.',
        benefits: [
            'No smartphone required',
            'Works without Google Maps',
            'Predefined paths for common routes'
        ]
    },
    {
        title: 'Advanced Obstacle Detection',
        icon: 'fas fa-radar',
        description: 'LiDAR-based system that detects obstacles up to 8 meters away in all lighting conditions.',
        benefits: [
            'Detects obstacles up to 8 meters away',
            'Works in bright sunlight & complete darkness',
            'Alerts for head-level obstacles'
        ]
    },
    {
        title: 'Traffic Light Detection',
        icon: 'fas fa-traffic-light',
        description: 'Beacon-based system that detects traffic light signals at pedestrian crossings.',
        benefits: [
            'Prevents accidents at busy intersections',
            'Works independently - No internet needed',
            'Quick alerts for safe crossings'
        ]
    },
    {
        title: 'SOS Emergency System',
        icon: 'fas fa-ambulance',
        description: 'Real-time GPS tracking and emergency alerts system for immediate assistance.',
        benefits: [
            'Instant help in emergencies',
            'Automatic fall detection',
            'Live GPS tracking for caregivers'
        ]
    },
    {
        title: 'Auto SOS on Impact',
        icon: 'fas fa-shield-alt',
        description: 'Accelerometer-based system that detects falls and automatically triggers SOS alerts.',
        benefits: [
            'Automatic fall detection',
            'Quick medical assistance',
            'Protection from serious accidents'
        ]
    },
    {
        title: 'AI-Powered Route Optimization',
        icon: 'fas fa-robot',
        description: 'Smart system that analyzes real-time data to suggest the safest and most accessible routes.',
        benefits: [
            'Avoids busy or unsafe paths',
            'Adapts to real-time conditions',
            'Seamless travel experience'
        ]
    }
];

// Benefits data
const benefits = [
    'Full AI-Based Navigation',
    'Best-in-Class Obstacle Detection',
    'Intelligent SOS & Safety Features',
    'Maximum Accessibility',
    'Affordable & Future-Proof'
];

// Mobile menu functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    }
});

// Populate features grid
const featuresGrid = document.querySelector('.features-grid');
features.forEach(feature => {
    const featureCard = document.createElement('div');
    featureCard.className = 'feature-card';
    featureCard.innerHTML = `
        <i class="${feature.icon}"></i>
        <h3>${feature.title}</h3>
        <p>${feature.description}</p>
        <ul>
            ${feature.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
        </ul>
    `;
    featuresGrid.appendChild(featureCard);
});

// Populate benefits grid
const benefitsGrid = document.querySelector('.benefits-grid');
benefits.forEach(benefit => {
    const benefitItem = document.createElement('div');
    benefitItem.className = 'benefit-item';
    benefitItem.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <p>${benefit}</p>
    `;
    benefitsGrid.appendChild(benefitItem);
});

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const submitButton = contactForm.querySelector('button[type="submit"]');
        
        // Disable submit button and show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Show success message
                formStatus.textContent = 'Thank you for your message! We will get back to you soon.';
                formStatus.className = 'form-status success';
                contactForm.reset();
            } else {
                const data = await response.json();
                throw new Error(data.error || 'Form submission failed');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            // Show error message
            formStatus.textContent = 'Sorry, there was an error sending your message. Please email us at nknileshkumar2.0@gmail.com';
            formStatus.className = 'form-status error';
        } finally {
            // Re-enable submit button and restore text
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
            
            // Clear status message after 5 seconds
            setTimeout(() => {
                formStatus.textContent = '';
                formStatus.className = 'form-status';
            }, 5000);
        }
    });
}

// Smooth scrolling for anchor links
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

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
}); 