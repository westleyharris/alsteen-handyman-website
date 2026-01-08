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
        
        // Submit to FormBackend
        const response = await fetch('https://www.formbackend.com/f/db1341b09606524a', {
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

