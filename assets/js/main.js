// Cúlra Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSmoothScrolling();
    initScrollAnimations();
    initHeaderBehavior();
    initMobileMenu();
    initAlbumInteractions();
    initParallaxEffects();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Intersection Observer for fade-in animations
function initScrollAnimations() {
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

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Header behavior on scroll
function initHeaderBehavior() {
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Change header background opacity based on scroll
        if (scrollTop > 100) {
            header.style.background = 'rgba(0, 0, 0, 0.98)';
            header.style.backdropFilter = 'blur(15px)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        }
        
        // Optional: Hide/show header on scroll direction
        // Uncomment the following lines if you want this behavior
        /*
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        */
        
        lastScrollTop = scrollTop;
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    let isMenuOpen = false;
    
    // Helper function to check if we're on mobile
    function isMobileView() {
        return window.innerWidth <= 768;
    }

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', function() {
            isMenuOpen = !isMenuOpen;
            
            // Toggle menu visibility
            navLinks.style.display = isMenuOpen ? 'flex' : 'none';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.background = 'rgba(0, 0, 0, 0.98)';
            navLinks.style.padding = '2rem';
            navLinks.style.gap = '1.5rem';
            
            // Animate menu toggle icon
            const spans = mobileToggle.querySelectorAll('span');
            if (isMenuOpen) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
         // Close menu when clicking on a link - BUT ONLY ON MOBILE
        navLinks.addEventListener('click', function(e) {
            if (e.target.tagName === 'A' && isMobileView()) {
                isMenuOpen = false;
                navLinks.style.display = 'none';
                
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking outside - BUT ONLY ON MOBILE
        document.addEventListener('click', function(e) {
            if (isMenuOpen && isMobileView() && !mobileToggle.contains(e.target) && !navLinks.contains(e.target)) {
                isMenuOpen = false;
                navLinks.style.display = 'none';
                
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
}

// Album card interactions
function initAlbumInteractions() {
    const albumCards = document.querySelectorAll('.album-card');
    
    albumCards.forEach(card => {
        const coverOverlay = card.querySelector('.cover-overlay');
        
        if (coverOverlay) {
            // Add click handler for play functionality
            coverOverlay.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Add a subtle animation to indicate interaction
                const playIcon = this.querySelector('.play-icon');
                if (playIcon) {
                    playIcon.style.transform = 'scale(1.2)';
                    setTimeout(() => {
                        playIcon.style.transform = 'scale(1)';
                    }, 200);
                }
                
                // Here you would typically integrate with a music player
                console.log('Play button clicked for:', card.querySelector('h3').textContent);
            });
        }
        
        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
}

// Subtle parallax effects
function initParallaxEffects() {
    const heroParticles = document.querySelector('.hero-particles');
    
    if (heroParticles) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            heroParticles.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // Add subtle movement to logo circles on scroll
    const logoCircles = document.querySelectorAll('.hero-logo-circle, .logo-circle');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        logoCircles.forEach((circle, index) => {
            const rate = scrolled * (0.002 + index * 0.001);
            circle.style.transform = `rotate(${rate}deg)`;
        });
    });
}

// Utility functions
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        
        if (callNow) func.apply(context, args);
    };
}

// Handle window resize
window.addEventListener('resize', debounce(function() {
    // Reset mobile menu on resize
    const navLinks = document.querySelector('.nav-links');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    
    if (window.innerWidth > 768 && navLinks) {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'row';
        navLinks.style.position = 'static';
        navLinks.style.background = 'none';
        navLinks.style.padding = '0';
        
        if (mobileToggle) {
            const spans = mobileToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    } else if (window.innerWidth <= 768 && navLinks) {
        navLinks.style.display = 'none';
    }
}, 250));

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        const navLinks = document.querySelector('.nav-links');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        
        if (window.innerWidth <= 768 && navLinks && navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
            
            if (mobileToggle) {
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        }
    }
});

// Loading animation (if needed)
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Optional: Remove loading screen if you add one
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 300);
    }
});

// Console message for developers
console.log(`
    ████████████████████████████████████████
    █                                      █
    █             CÚLRA                    █
    █     Rooted in tradition,             █
    █     reaching for the infinite        █
    █                                      █
    ████████████████████████████████████████
    
    Website built with passion and attention to detail.
    For inquiries: culrabandtech@gmail.com.com
`);