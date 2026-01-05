// Initialize EmailJS
// Note: You'll need to set up EmailJS service and get your keys
// Replace these with your actual EmailJS service ID, template ID, and public key
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

// Initialize EmailJS (commented out until keys are configured)
// emailjs.init(EMAILJS_PUBLIC_KEY);

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

// Helper function to convert images to base64
function convertImagesToBase64(fileInput) {
    return new Promise((resolve, reject) => {
        const files = fileInput.files;
        if (files.length === 0) {
            resolve([]);
            return;
        }
        
        const base64Images = [];
        let processed = 0;
        const maxSize = 5 * 1024 * 1024; // 5MB max per image
        
        Array.from(files).forEach(file => {
            if (file.size > maxSize) {
                reject(new Error(`Image ${file.name} is too large. Maximum size is 5MB.`));
                return;
            }
            
            const reader = new FileReader();
            reader.onload = (e) => {
                base64Images.push({
                    name: file.name,
                    data: e.target.result,
                    size: file.size
                });
                processed++;
                if (processed === files.length) {
                    resolve(base64Images);
                }
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    });
}

quoteForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const project = document.getElementById('project').value;
    const imageInput = document.getElementById('images');
    
    // Show loading state
    const submitButton = quoteForm.querySelector('.btn-submit');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    formMessage.style.display = 'none';
    
    try {
        // Build message
        let message = `Quote Request from: ${name}\n\n`;
        message += `Contact Information:\n`;
        message += `Email: ${email}\n`;
        message += `Phone: ${phone}\n\n`;
        message += `Project Description:\n${project}`;
        
        // Add image info if any are selected (FormSubmit.co free tier doesn't support file attachments)
        if (imageInput.files.length > 0) {
            message += `\n\nImages attached: ${imageInput.files.length} file(s)\n`;
            Array.from(imageInput.files).forEach((file, index) => {
                message += `- ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)\n`;
            });
            message += `\nNote: Image files cannot be sent through this form. Please email images directly if needed.`;
        }
        
        // Using FormSubmit.co for testing - simple, no setup required
        // Note: FormSubmit.co free tier doesn't support file attachments
        // For production with file uploads, consider Formspree (requires setup at formspree.io)
        const response = await fetch('https://formsubmit.co/ajax/westley.harris11@gmail.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                phone: phone,
                message: message,
                _subject: `Quote Request from ${name}`,
                _captcha: 'false'
            })
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

