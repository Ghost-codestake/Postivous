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
        document.querySelectorAll('.section-header, .pricing-card, .faq-item, .cta-content').forEach(element => {
            observer.observe(element);
        });

        // FAQ functionality
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', function() {
                const faqItem = this.parentElement;
                const isActive = faqItem.classList.contains('active');
                
                // Close all FAQ items
                document.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('active');
                });
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    faqItem.classList.add('active');
                }
            });
        });

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

        // Pricing card interactions
        document.querySelectorAll('.pricing-cta').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get plan name
                const planName = this.closest('.pricing-card').querySelector('.plan-name').textContent;
                
                // Simple feedback for demo
                const originalText = this.textContent;
                this.textContent = 'Redirecting...';
                this.style.background = '#b9ff66';
                this.style.color = '#191a23';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.background = '';
                    this.style.color = '';
                    
                    // In a real application, this would redirect to a signup/contact form
                    alert(`You selected the ${planName} plan. In a real application, this would redirect to a signup form.`);
                }, 1500);
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
                } else {
                    this.textContent = 'Preparing Audit...';
                }
                
                setTimeout(() => {
                    this.textContent = originalText;
                    
                    if (isSecondary) {
                        alert('In a real application, this would open a calendar booking widget.');
                    } else {
                        alert('In a real application, this would redirect to a free SEO audit form.');
                    }
                }, 1500);
            });
        });

        // Add some dynamic pricing animations on load
        window.addEventListener('load', function() {
            setTimeout(() => {
                document.querySelectorAll('.price').forEach((price, index) => {
                    price.style.transform = 'scale(1.05)';
                    setTimeout(() => {
                        price.style.transform = 'scale(1)';
                    }, 200);
                }, index * 100);
            }, 1000);
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