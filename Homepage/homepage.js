document.addEventListener('DOMContentLoaded', function() {

    // ===================================================================
    // 1. Mobile Navigation (Hamburger Menu)
    // ===================================================================
    // Check if the main navigation exists before creating the mobile menu
    const mainNavList = document.querySelector('.main-nav ul');
    if (mainNavList) {
        const headerContainer = document.querySelector('.site-header .container');
        const hamburgerBtn = document.createElement('button');
        const mobileNav = document.createElement('nav');
        const overlay = document.createElement('div');

        // --- Setup Hamburger Button ---
        hamburgerBtn.innerHTML = '&#9776;';
        hamburgerBtn.classList.add('hamburger-btn');
        hamburgerBtn.setAttribute('aria-label', 'Open navigation menu');
        headerContainer.appendChild(hamburgerBtn);

        // --- Setup Mobile Menu ---
        mobileNav.classList.add('mobile-nav');
        mobileNav.innerHTML = `<ul>${mainNavList.innerHTML}</ul>`;
        document.body.appendChild(mobileNav);

        // --- Setup Overlay ---
        overlay.classList.add('mobile-nav-overlay');
        document.body.appendChild(overlay);

        // --- Function to toggle menu state ---
        const toggleMenu = () => {
            const isOpen = mobileNav.classList.toggle('open');
            hamburgerBtn.classList.toggle('active');
            overlay.classList.toggle('open');
            document.body.classList.toggle('nav-open', isOpen);
            hamburgerBtn.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
        };
        
        // --- Add click events ---
        hamburgerBtn.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);
    }


    // ===================================================================
    // 2. Hero Banner Slider
    // ===================================================================

    function initializeSlider(sliderElement) {
        const slides = sliderElement.querySelectorAll('.slides .slide');
        const nextBtn = sliderElement.querySelector('.next-slide');
        const prevBtn = sliderElement.querySelector('.prev-slide');
        const dotsContainer = sliderElement.querySelector('.slider-dots');
        
        // If slider has 1 or no slides, do nothing.
        if (!slides || slides.length <= 1) {
            if (nextBtn) nextBtn.style.display = 'none';
            if (prevBtn) prevBtn.style.display = 'none';
            if (dotsContainer) dotsContainer.style.display = 'none';
            if (slides.length === 1) slides[0].classList.add('active'); // Show the single slide
            return;
        }

        let currentSlide = 0;
        let isAnimating = false;
        let slideInterval;
        const animationDuration = 1000; // Corresponds to CSS transition duration

        const updateDots = () => {
            if (!dots.length) return;
            dots.forEach(dot => dot.classList.remove('active'));
            if (dots[currentSlide]) dots[currentSlide].classList.add('active');
        };

        const goToSlide = (n) => {
            if (isAnimating || n === currentSlide) return;
            isAnimating = true;

            const outgoingSlide = slides[currentSlide];
            const incomingSlide = slides[n];

            // Activate new slide
            incomingSlide.classList.add('active');
            
            // After a very short delay, start fading out the old one by removing its active class.
            // This ensures the new one is visible underneath before the old one disappears.
            // The logic is simplified: just toggle 'active'. The CSS handles the fade.
            outgoingSlide.classList.remove('active');
            
            // Update the current slide index immediately
            currentSlide = n;
            updateDots();
            
            // Prevent further animations until the CSS transition is complete
            setTimeout(() => {
                isAnimating = false;
            }, animationDuration);
        };
        
        const changeSlide = (direction) => {
            let nextSlideIndex = (currentSlide + direction + slides.length) % slides.length;
            goToSlide(nextSlideIndex);
        };
        
        // Create dots if container exists
        let dots = [];
        if (dotsContainer) {
            slides.forEach((_, i) => {
                const dot = document.createElement('button'); // Use button for accessibility
                dot.classList.add('dot');
                dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
                dot.addEventListener('click', () => {
                    goToSlide(i);
                    resetInterval();
                });
                dotsContainer.appendChild(dot);
            });
            dots = sliderElement.querySelectorAll('.slider-dots .dot');
        }
        
        const startInterval = () => {
            const autoplaySpeed = sliderElement.classList.contains('cta-banner-section') ? 6000 : 5000;
            slideInterval = setInterval(() => changeSlide(1), autoplaySpeed);
        };
        const resetInterval = () => {
            clearInterval(slideInterval);
            startInterval();
        };

        // Add event listeners for buttons
        if (nextBtn && prevBtn) {
            nextBtn.addEventListener('click', () => { changeSlide(1); resetInterval(); });
            prevBtn.addEventListener('click', () => { changeSlide(-1); resetInterval(); });
        }

        // Initialize slider
        slides[currentSlide].classList.add('active');
        updateDots();
        startInterval();
    }

    // FIND AND INITIALIZE ALL SLIDERS ON THE PAGE
    document.querySelectorAll('.slider-component').forEach(slider => {
        initializeSlider(slider);
    });



    // ===================================================================
    // 3. Scroll Reveal Animation
    // ===================================================================
    const revealElements = document.querySelectorAll('.service-item, .product-card, .story-content, .story-image, .instagram-item');
    
    if (!!window.IntersectionObserver) { // Check if IntersectionObserver is supported
        revealElements.forEach(el => el.classList.add('reveal-on-scroll'));

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Stop observing after it becomes visible
                }
            });
        }, {
            threshold: 0.1 // Trigger when 10% of the element is in view
        });

        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    }


    // ===================================================================
    // 4. Form & Button Interactions
    // ===================================================================
    
    // --- Newsletter Form ---
    const newsletterForm = document.querySelector('.newsletter-form-fitmeal');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent page reload
            const emailInput = this.querySelector('input[type="email"]');
            const submitButton = this.querySelector('button[type="submit"]');

            if (emailInput.value && /^\S+@\S+\.\S+$/.test(emailInput.value)) {
                // Provide feedback without an alert
                submitButton.textContent = 'Đã đăng ký!';
                submitButton.disabled = true;
                emailInput.value = '';

                setTimeout(() => {
                    submitButton.textContent = 'Đăng ký nhận tin';
                    submitButton.disabled = false;
                }, 3000);
            } else {
                alert('Vui lòng nhập một địa chỉ email hợp lệ.');
            }
        });
    }

    // --- Add to Cart Buttons ---
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('added')) return;

            // Use CSS class for state change instead of inline styles
            this.textContent = 'Đã thêm!';
            this.classList.add('added');
            
            // Revert to original state after 2 seconds
            setTimeout(() => {
                this.textContent = 'Thêm vào giỏ';
                this.classList.remove('added');
            }, 2000);
        });
    });

});