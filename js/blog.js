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
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        // Observe blog cards and sidebar
        document.querySelectorAll('.blog-card').forEach(card => {
            observer.observe(card);
        });

        document.querySelectorAll('.sidebar').forEach(sidebar => {
            observer.observe(sidebar);
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

        // Newsletter form handling
        const newsletterForm = document.querySelector('.newsletter');
        const newsletterButton = newsletterForm.querySelector('button');
        const newsletterInput = newsletterForm.querySelector('input');

        newsletterButton.addEventListener('click', function(e) {
            e.preventDefault();
            const email = newsletterInput.value.trim();
            
            if (email && email.includes('@')) {
                newsletterButton.textContent = 'Subscribed!';
                newsletterButton.style.background = '#4ade80';
                newsletterInput.value = '';
                
                setTimeout(() => {
                    newsletterButton.textContent = 'Subscribe';
                    newsletterButton.style.background = '#b9ff66';
                }, 3000);
            } else {
                newsletterButton.textContent = 'Valid email required';
                newsletterButton.style.background = '#ef4444';
                
                setTimeout(() => {
                    newsletterButton.textContent = 'Subscribe';
                    newsletterButton.style.background = '#b9ff66';
                }, 2000);
            }
        });

        // Search functionality
        const searchBox = document.querySelector('.search-box');
        searchBox.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const blogCards = document.querySelectorAll('.blog-card');
            
            blogCards.forEach(card => {
                const title = card.querySelector('.blog-title').textContent.toLowerCase();
                const excerpt = card.querySelector('.blog-excerpt').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = searchTerm === '' ? 'block' : 'none';
                }
            });
        });