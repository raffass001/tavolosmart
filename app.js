// TAVOLO SMART - JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('TAVOLO SMART website initializing...');
    
    // Elements
    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');
    const modalClose = document.querySelector('.modal__close');
    const ctaButtons = document.querySelectorAll('.cta-button');
    const navLinks = document.querySelectorAll('.nav__link');
    const whatsappButton = document.querySelector('.whatsapp-button');
    const heroImageContainer = document.querySelector('.hero-image-container');
    const techIcons = document.querySelectorAll('.tech-icon');
    const serviceCards = document.querySelectorAll('.service-card');

    // Tech icons interactive enhancements
    if (techIcons.length > 0) {
        techIcons.forEach((icon, index) => {
            // Add click interaction
            icon.addEventListener('click', function(e) {
                e.preventDefault();
                const iconType = this.querySelector('span').textContent;
                console.log(`Tech icon clicked: ${iconType}`);
                
                // Add click animation
                this.style.transform = 'translateY(-2px) scale(1.02)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);

                // Scroll to relevant service section
                scrollToRelevantService(iconType);
            });

            // Add hover sound effect simulation (visual feedback)
            icon.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.05)';
            });

            icon.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });

            // Add keyboard accessibility
            icon.setAttribute('tabindex', '0');
            icon.setAttribute('role', 'button');
            icon.setAttribute('aria-label', `Visualizza servizio ${this.querySelector('span').textContent}`);
            
            icon.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
    }

    // Function to scroll to relevant service based on tech icon
    function scrollToRelevantService(iconType) {
        const serviceMapping = {
            'Tablet POS': 'prenotazioni',
            'Menu QR': 'menu-qr', 
            'Schermi Digitali': 'social',
            'AI Assistant': 'voicebot'
        };

        const targetServiceId = serviceMapping[iconType];
        if (targetServiceId) {
            const targetCard = document.querySelector(`[data-service="${targetServiceId}"]`);

            if (targetCard) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetCard.offsetTop - headerHeight - 100;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Add highlight effect
                targetCard.classList.add('highlighted');
                
                setTimeout(() => {
                    targetCard.classList.remove('highlighted');
                }, 3000);

                console.log(`Scrolled to service: ${targetServiceId}`);
            } else {
                console.error(`Service card not found for: ${targetServiceId}`);
            }
        } else {
            console.error(`No service mapping found for: ${iconType}`);
        }
    }

    // Fix smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Nav link clicked:', this.getAttribute('href'));
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                console.log('Scrolling to section:', targetId);
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            } else {
                console.error('Target section not found:', targetId);
            }
        });
    });

    // Fix CTA buttons scroll to contact
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const action = this.getAttribute('data-action');
            console.log('CTA button clicked with action:', action);
            
            if (action === 'contact') {
                e.preventDefault();
                const contactSection = document.getElementById('contatti');
                
                if (contactSection) {
                    console.log('Scrolling to contact section');
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = contactSection.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Focus on first form field after scroll
                    setTimeout(() => {
                        const firstInput = document.getElementById('name');
                        if (firstInput) {
                            firstInput.focus();
                            console.log('Focused on first input');
                        }
                    }, 1000);
                } else {
                    console.error('Contact section not found');
                }
            }
        });
    });

    // Form validation and submission
    if (contactForm) {
        console.log('Contact form found, adding event listener');
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submitted');
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value.trim(),
                owner: document.getElementById('owner').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                city: document.getElementById('city').value.trim(),
                covers: document.getElementById('covers').value,
                message: document.getElementById('message').value.trim()
            };

            console.log('Form data collected:', formData);

            // Clear previous error styling
            const allInputs = contactForm.querySelectorAll('.form-control');
            allInputs.forEach(input => {
                input.style.borderColor = '';
                input.style.boxShadow = '';
            });

            // Validate required fields
            const requiredFields = ['name', 'owner', 'email', 'phone', 'city'];
            let isValid = true;
            let firstErrorField = null;

            requiredFields.forEach(field => {
                const input = document.getElementById(field);
                const value = formData[field];
                
                if (!value) {
                    isValid = false;
                    input.style.borderColor = 'var(--color-error)';
                    input.style.boxShadow = '0 0 0 3px rgba(192, 21, 47, 0.2)';
                    
                    if (!firstErrorField) {
                        firstErrorField = input;
                    }
                    console.log('Required field missing:', field);
                }
            });

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const emailInput = document.getElementById('email');
            if (formData.email && !emailRegex.test(formData.email)) {
                isValid = false;
                emailInput.style.borderColor = 'var(--color-error)';
                emailInput.style.boxShadow = '0 0 0 3px rgba(192, 21, 47, 0.2)';
                
                if (!firstErrorField) {
                    firstErrorField = emailInput;
                }
                console.log('Invalid email format');
            }

            // Phone validation (basic format)
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/;
            const phoneInput = document.getElementById('phone');
            if (formData.phone && !phoneRegex.test(formData.phone)) {
                isValid = false;
                phoneInput.style.borderColor = 'var(--color-error)';
                phoneInput.style.boxShadow = '0 0 0 3px rgba(192, 21, 47, 0.2)';
                
                if (!firstErrorField) {
                    firstErrorField = phoneInput;
                }
                console.log('Invalid phone format');
            }

            if (!isValid) {
                console.log('Form validation failed');
                if (firstErrorField) {
                    firstErrorField.focus();
                    firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                return;
            }

            console.log('Form validation passed');

            // Simulate form submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            // Show loading state
            submitButton.textContent = '⏳ Invio in corso...';
            submitButton.disabled = true;
            submitButton.style.opacity = '0.7';

            // Simulate API call
            setTimeout(() => {
                // Reset button
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.style.opacity = '1';
                
                // Show success modal
                showSuccessModal();
                
                // Reset form
                contactForm.reset();
                
                // Track successful submission
                console.log('Form submitted successfully:', formData);
                
            }, 1500);
        });
    } else {
        console.error('Contact form not found');
    }

    // Modal functionality
    function showSuccessModal() {
        console.log('Showing success modal');
        if (successModal) {
            successModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            
            // Focus on close button for accessibility
            const closeButton = successModal.querySelector('.modal__close');
            if (closeButton) {
                setTimeout(() => closeButton.focus(), 100);
            }
        }
    }

    function hideSuccessModal() {
        console.log('Hiding success modal');
        if (successModal) {
            successModal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    }

    // Close modal events
    if (modalClose) {
        modalClose.addEventListener('click', function(e) {
            e.preventDefault();
            hideSuccessModal();
        });
    }

    if (successModal) {
        successModal.addEventListener('click', function(e) {
            if (e.target === successModal || e.target.classList.contains('modal__overlay')) {
                hideSuccessModal();
            }
        });
    }

    // Escape key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && successModal && !successModal.classList.contains('hidden')) {
            hideSuccessModal();
        }
    });

    // WhatsApp message generation
    function generateWhatsAppMessage(formData = null) {
        if (formData) {
            return `🍽️ *RICHIESTA PROVA GRATUITA TAVOLO SMART*

👤 *Ristorante:* ${formData.name}
👨‍💼 *Proprietario:* ${formData.owner}
📧 *Email:* ${formData.email}
📞 *Telefono:* ${formData.phone}
🏙️ *Città:* ${formData.city}
${formData.covers ? `👥 *Coperti:* ${formData.covers}` : ''}
${formData.message ? `💬 *Note:* ${formData.message}` : ''}

✅ Interessato alla prova gratuita di 7 giorni!

Quando possiamo sentirci per maggiori informazioni?`;
        } else {
            return "Ciao, sono interessato a TAVOLO SMART e vorrei sapere di più sulla prova gratuita di 7 giorni! Quando possiamo sentirci?";
        }
    }

    // Update WhatsApp button
    if (whatsappButton) {
        const phoneNumber = "393123456789"; // Replace with actual number
        const message = generateWhatsAppMessage();
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        
        whatsappButton.href = whatsappUrl;
        whatsappButton.setAttribute('target', '_blank');
        whatsappButton.setAttribute('rel', 'noopener noreferrer');
        
        whatsappButton.addEventListener('click', function(e) {
            console.log('WhatsApp button clicked');
            // Let the default behavior handle the redirect
        });
        
        console.log('WhatsApp button configured:', whatsappUrl);
    }

    // Form field enhancements
    const formInputs = document.querySelectorAll('.form-control');
    formInputs.forEach(input => {
        // Clear error styling on focus
        input.addEventListener('focus', function() {
            this.style.borderColor = '';
            this.style.boxShadow = '';
        });
    });

    // Phone number formatting (Italian format)
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/[^\d\+\s\-\(\)]/g, '');
            e.target.value = value;
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Animate hero image container on scroll
    if (heroImageContainer) {
        heroImageContainer.style.opacity = '0';
        heroImageContainer.style.transform = 'translateY(20px)';
        heroImageContainer.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(heroImageContainer);
    }

    // Animate service cards on scroll
    if (serviceCards.length > 0) {
        serviceCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            observer.observe(card);
        });
    }

    // Animate steps on scroll
    const steps = document.querySelectorAll('.step');
    if (steps.length > 0) {
        steps.forEach((step, index) => {
            step.style.opacity = '0';
            step.style.transform = 'translateY(30px)';
            step.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
            observer.observe(step);
        });
    }

    // Animate requirement items on scroll
    const requirementItems = document.querySelectorAll('.requirement-item');
    if (requirementItems.length > 0) {
        requirementItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            observer.observe(item);
        });
    }

    // Scroll to top functionality
    let scrollTopButton = document.createElement('button');
    scrollTopButton.innerHTML = '↑';
    scrollTopButton.className = 'scroll-top-button';
    scrollTopButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--color-primary);
        color: var(--color-btn-primary-text);
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        transform: scale(0);
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    `;
    
    document.body.appendChild(scrollTopButton);
    
    scrollTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Show/hide scroll to top button
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            if (window.scrollY > 300) {
                scrollTopButton.style.opacity = '1';
                scrollTopButton.style.transform = 'scale(1)';
            } else {
                scrollTopButton.style.opacity = '0';
                scrollTopButton.style.transform = 'scale(0)';
            }
        }, 10);
    });

    // Add ripple effect to CTA buttons
    ctaButtons.forEach(button => {
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        
        button.addEventListener('click', function(e) {
            // Add ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                pointer-events: none;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.remove();
                }
            }, 600);
        });
    });

    // Add ripple animation styles
    if (!document.getElementById('ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Enhanced hero image interaction
    if (heroImageContainer) {
        let mouseX = 0;
        let mouseY = 0;
        let isHovering = false;

        heroImageContainer.addEventListener('mouseenter', function() {
            isHovering = true;
        });

        heroImageContainer.addEventListener('mouseleave', function() {
            isHovering = false;
            // Reset tech icons positions
            techIcons.forEach(icon => {
                icon.style.transform = '';
            });
        });

        heroImageContainer.addEventListener('mousemove', function(e) {
            if (!isHovering || window.innerWidth <= 768) return;

            const rect = this.getBoundingClientRect();
            mouseX = (e.clientX - rect.left) / rect.width;
            mouseY = (e.clientY - rect.top) / rect.height;

            // Subtle movement of tech icons based on mouse position
            techIcons.forEach((icon, index) => {
                const moveX = (mouseX - 0.5) * 15;
                const moveY = (mouseY - 0.5) * 15;
                const intensity = 0.2 + (index * 0.1);
                
                icon.style.transform = `translate(${moveX * intensity}px, ${moveY * intensity}px)`;
            });
        });

        // Add intro animation for tech icons
        setTimeout(() => {
            techIcons.forEach((icon, index) => {
                setTimeout(() => {
                    icon.style.opacity = '1';
                    icon.style.transform = 'translateY(0)';
                }, index * 200);
            });
        }, 500);
    }

    // Initialize tech icons with initial state
    techIcons.forEach(icon => {
        icon.style.opacity = '0';
        icon.style.transform = 'translateY(20px)';
        icon.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Debug logging
    console.log('Elements found:');
    console.log('- Contact form:', !!contactForm);
    console.log('- Success modal:', !!successModal);
    console.log('- CTA buttons:', ctaButtons.length);
    console.log('- Nav links:', navLinks.length);
    console.log('- WhatsApp button:', !!whatsappButton);
    console.log('- Hero image container:', !!heroImageContainer);
    console.log('- Tech icons:', techIcons.length);
    console.log('- Service cards:', serviceCards.length);

    console.log('TAVOLO SMART website loaded successfully! 🍽️✨');
});