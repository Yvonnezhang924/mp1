/* Your JS here. */
console.log('Hello World!')

// Mobile Navigation Toggle and Scroll Spy
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navCollapse = document.getElementById('navbarResponsive');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Mobile menu toggle
    if (navToggle && navCollapse) {
        navToggle.addEventListener('click', function() {
            const isExpanded = navCollapse.classList.contains('show');
            
            if (isExpanded) {
                navCollapse.classList.remove('show');
                navToggle.setAttribute('aria-expanded', 'false');
            } else {
                navCollapse.classList.add('show');
                navToggle.setAttribute('aria-expanded', 'true');
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navCollapse.contains(event.target)) {
                navCollapse.classList.remove('show');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const navbarHeight = navbar.offsetHeight;
                const offsetTop = targetSection.offsetTop - navbarHeight - 20; // Account for fixed navbar with extra spacing
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu after clicking
            if (navCollapse) {
                navCollapse.classList.remove('show');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
    
    // Navbar resizing functionality
    const navbar = document.querySelector('.custom-navbar');
    
    function handleNavbarResize() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Scroll spy functionality with improved bottom detection
    function updateActiveNavLink() {
        const scrollPos = window.scrollY;
        const navbarHeight = navbar.offsetHeight;
        const adjustedScrollPos = scrollPos + navbarHeight + 50; // Account for navbar height
        
        let activeSection = null;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (adjustedScrollPos >= sectionTop && adjustedScrollPos < sectionTop + sectionHeight) {
                activeSection = sectionId;
            }
        });
        
        // Check if we're at the bottom of the page
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop + windowHeight >= documentHeight - 100) {
            // Highlight the last nav item when at bottom
            activeSection = 'hobbies'; // Last section
        }
        
        // Update active nav link
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').substring(1);
            if (href === activeSection) {
                link.classList.add('active');
            }
        });
    }
    
    // Update active nav link and navbar size on scroll
    window.addEventListener('scroll', function() {
        updateActiveNavLink();
        handleNavbarResize();
    });
    
    // Set initial active state
    updateActiveNavLink();
    handleNavbarResize();
    
    
    // Carousel functionality
    const carouselSlides = document.getElementById('carouselSlides');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dots = document.querySelectorAll('.dot');
    
    let currentSlide = 0;
    const totalSlides = 3;
    
    function showSlide(slideIndex) {
        // Update slide position
        carouselSlides.style.transform = `translateX(-${slideIndex * 33.333}%)`;
        
        // Update active slide
        document.querySelectorAll('.carousel-slide').forEach((slide, index) => {
            slide.classList.toggle('active', index === slideIndex);
        });
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === slideIndex);
        });
        
        currentSlide = slideIndex;
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }
    
    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Auto-play carousel (optional)
    let autoPlay = setInterval(nextSlide, 5000);
    
    // Pause auto-play on hover
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', () => {
            clearInterval(autoPlay);
        });
        
        carouselContainer.addEventListener('mouseleave', () => {
            autoPlay = setInterval(nextSlide, 5000);
        });
    }

    // Hobby modals functionality
    const hobbyCards = document.querySelectorAll('.hobby-card');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close');

    // Open modal when hobby card is clicked
    hobbyCards.forEach(card => {
        card.addEventListener('click', function() {
            const hobbyId = this.getAttribute('data-hobby');
            const modal = document.getElementById(`hobbyModal${hobbyId}`);
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });

    // Close modal when close button is clicked
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        });
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto'; // Restore scrolling
            }
        });
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.style.display === 'block') {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto'; // Restore scrolling
                }
            });
        }
    });
});
