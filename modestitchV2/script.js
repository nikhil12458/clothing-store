// T-shirt data with colors and background texts
        const tshirts = [
            {
                color: 'linear-gradient(135deg, #00355F 0%, #0077A8 100%)',
                text: 'STRENGTH'
            },
            {
                color: 'linear-gradient(135deg, #174227 0%, #2e8b57 100%)',
                text: 'PSYCHEDELICS'
            },
            {
                color: 'linear-gradient(135deg, #171715 0%, #3b3a30 100%)',
                text: 'STRENGTH'
            },
            {
                color: 'linear-gradient(135deg, #307179 0%, #6DBDC3 100%)',
                text: 'POLAR'
            },
            {
                color: 'linear-gradient(135deg, #F2E5D4 0%, #D7BFA8 100%)',
                text: 'POLAR'
            }
        ];

        let currentIndex = 0;
        const slides = document.querySelectorAll('.tshirt-slide');
        const bgText = document.getElementById('bgText');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navLinks = document.querySelector('.nav-links');

        function updateSlide() {
            // Remove active class from all slides
            slides.forEach((slide, index) => {
                slide.classList.remove('active', 'prev');
                if (index < currentIndex) {
                    slide.classList.add('prev');
                }
            });

            // Add active class to current slide
            slides[currentIndex].classList.add('active');

            // Update background
            document.body.style.background = tshirts[currentIndex].color;

            // Update background text
            bgText.textContent = tshirts[currentIndex].text;

            // Add animation to background text
            bgText.style.transform = 'translate(-50%, -50%) scale(0.8)';
            setTimeout(() => {
                bgText.style.transform = 'translate(-50%, -50%) scale(1)';
            }, 100);
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlide();
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlide();
        }

        // Event listeners
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);

        // Mobile menu toggle
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav') && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
        });

        // Removed auto-slide - now only manual navigation

        // Smooth scroll for navigation links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                // Add smooth scrolling logic here if you have multiple sections
            });
        });

        // Initialize
        updateSlide();

        // Add parallax effect to floating elements
        window.addEventListener('mousemove', (e) => {
            const elements = document.querySelectorAll('.floating-element');
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;

            elements.forEach((element, index) => {
                const speed = (index + 1) * 0.5;
                const translateX = (x - 0.5) * speed * 50;
                const translateY = (y - 0.5) * speed * 50;
                element.style.transform = `translate(${translateX}px, ${translateY}px)`;
            });
        });