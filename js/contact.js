 // Mobile menu toggle
        const hamburger = document.getElementById('hamburger');
        const nav = document.getElementById('nav');
        
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
        });

        // Scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                    }, index * 100);
                }
            });
        }, observerOptions);

        // Observe all animatable elements
        document.querySelectorAll('.contact-info, .contact-form, .section-header, .map-container, .cta-content').forEach(element => {
            observer.observe(element);
        });

        // Form submission handling
        const contactForm = document.getElementById('contactForm');
        const successMessage = document.getElementById('successMessage');
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Validate required fields
            if (!formObject.firstName || !formObject.lastName || !formObject.email || !formObject.message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formObject.email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                // Show success message
                successMessage.classList.add('show');
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Log form data (in real application, this would be sent to server)
                console.log('Form submitted:', formObject);
                
            }, 2000);
        });
        
        // Close success message
        function closeSuccessMessage() {
            successMessage.classList.remove('show');
        }
        
        // Auto-close success message after 5 seconds
        function showSuccessMessage() {
            setTimeout(() => {
                if (successMessage.classList.contains('show')) {
                    closeSuccessMessage();
                }
            }, 5000);
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Header scroll effect
        let lastScrollTop = 0;
        const header = document.querySelector('header');

        window.addEventListener('scroll', function() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });

        // Enhanced form interactions
        const formInputs = document.querySelectorAll('input, select, textarea');
        
        formInputs.forEach(input => {
            // Add focus effects
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'scale(1.02)';
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.style.transform = 'scale(1)';
            });
            
            // Real-time validation feedback
            input.addEventListener('input', function() {
                if (this.hasAttribute('required') && this.value.trim() === '') {
                    this.style.borderColor = '#ff6b6b';
                } else if (this.type === 'email' && this.value) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    this.style.borderColor = emailRegex.test(this.value) ? '#4ade80' : '#ff6b6b';
                } else if (this.value) {
                    this.style.borderColor = '#4ade80';
                } else {
                    this.style.borderColor = '#e9ecef';
                }
            });
        });

        // Contact method interactions
        document.querySelectorAll('.contact-method').forEach(method => {
            method.addEventListener('click', function() {
                const details = this.querySelector('.contact-details');
                const contactType = details.querySelector('h3').textContent.toLowerCase();
                
                if (contactType === 'phone') {
                    const phone = details.querySelector('p').textContent;
                    window.location.href = `tel:${phone}`;
                } else if (contactType === 'email') {
                    const email = details.querySelector('p').textContent;
                    window.location.href = `mailto:${email}`;
                }
            });
        });

        // CTA button interactions
        document.querySelectorAll('.cta-button').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const originalText = this.textContent;
                const isSecondary = this.classList.contains('secondary');
                
                if (isSecondary) {
                    this.textContent = 'Scheduling...';
                    setTimeout(() => {
                        this.textContent = originalText;
                        alert('In a real application, this would open a calendar booking widget.');
                    }, 1500);
                } else {
                    this.textContent = 'Preparing Audit...';
                    setTimeout(() => {
                        this.textContent = originalText;
                        // Scroll to contact form
                        document.querySelector('.contact-form').scrollIntoView({
                            behavior: 'smooth'
                        });
                    }, 1500);
                }
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            const nav = document.getElementById('nav');
            const hamburger = document.getElementById('hamburger');
            
            if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
                nav.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });

        // Add typing effect to form placeholders
        const messageTextarea = document.getElementById('message');
        const originalPlaceholder = messageTextarea.placeholder;
        
        messageTextarea.addEventListener('focus', function() {
            if (!this.value) {
                this.placeholder = '';
                let i = 0;
                const typeInterval = setInterval(() => {
                    if (i < originalPlaceholder.length) {
                        this.placeholder += originalPlaceholder.charAt(i);
                        i++;
                    } else {
                        clearInterval(typeInterval);
                    }
                }, 50);
            }
        });

        messageTextarea.addEventListener('blur', function() {
            if (!this.value) {
                this.placeholder = originalPlaceholder;
            }
        });

        // Add success message auto-trigger when form is shown
        document.addEventListener('DOMContentLoaded', function() {
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        showSuccessMessage();
                    }
                });
            });
            
            observer.observe(successMessage);
        });

        // Add loading states to contact methods
        document.querySelectorAll('.contact-method').forEach(method => {
            method.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.contact-icon');
                icon.style.transform = 'rotate(360deg)';
                icon.style.transition = 'transform 0.6s ease';
            });
            
            method.addEventListener('mouseleave', function() {
                const icon = this.querySelector('.contact-icon');
                icon.style.transform = 'rotate(0deg)';
            });
        });