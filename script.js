// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for sticky navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Image Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    const carouselTrack = document.getElementById('carouselTrack');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const pagination = document.getElementById('carouselPagination');
    const slides = document.querySelectorAll('.carousel-slide');
    
    if (!carouselTrack || slides.length === 0) return;
    
    let currentSlide = 0;
    
    // Create pagination dots
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        dot.addEventListener('click', () => goToSlide(index));
        pagination.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.carousel-dot');
    
    // Update carousel position
    function updateCarousel() {
        carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update pagination dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
        
        // Update button states
        prevButton.disabled = currentSlide === 0;
        nextButton.disabled = currentSlide === slides.length - 1;
    }
    
    // Go to specific slide
    function goToSlide(index) {
        if (index < 0 || index >= slides.length) return;
        currentSlide = index;
        updateCarousel();
    }
    
    // Next slide
    function nextSlide() {
        if (currentSlide < slides.length - 1) {
            currentSlide++;
        } else {
            currentSlide = 0; // Loop back to first slide
        }
        updateCarousel();
    }
    
    // Previous slide
    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
        } else {
            currentSlide = slides.length - 1; // Loop to last slide
        }
        updateCarousel();
    }
    
    // Event listeners
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (document.querySelector('.carousel-container:hover')) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                nextSlide();
            }
        }
    });
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    carouselTrack.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    carouselTrack.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide(); // Swipe left - next
            } else {
                prevSlide(); // Swipe right - previous
            }
        }
    }
    
    // Initialize
    updateCarousel();
});

// FAQ Accordion Functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
                this.setAttribute('aria-expanded', 'true');
            }
        });
    });
});

// Form submission handler
const quoteForm = document.getElementById('quoteForm');
const formMessage = document.getElementById('formMessage');

quoteForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Show loading state
    const submitButton = quoteForm.querySelector('.btn-submit');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    formMessage.style.display = 'none';
    
    try {
        // Create FormData from the form itself - this automatically handles all fields including multiple files
        const formData = new FormData(quoteForm);
        
        // TODO: PRODUCTION - Update FormBackend endpoint URL below to client's account
        // Replace the URL in the fetch call with the client's FormBackend endpoint URL
        const response = await fetch('https://www.formbackend.com/f/6f995b9518f099aa', {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            // Success
            formMessage.textContent = 'Thank you! Your quote request has been sent successfully. We\'ll get back to you soon!';
            formMessage.className = 'form-message success';
            formMessage.style.display = 'block';
            quoteForm.reset();
            
            // Scroll to message
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Form submission failed');
        }
        
    } catch (error) {
        console.error('Error submitting form:', error);
        formMessage.textContent = error.message || 'Sorry, there was an error sending your message. Please try calling us directly at (469) 966-9193 or email alsteenhandyman@yahoo.com';
        formMessage.className = 'form-message error';
        formMessage.style.display = 'block';
    } finally {
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
    }
});

