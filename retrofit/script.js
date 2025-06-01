// Ensure GSAP and ScrollTrigger are loaded
gsap.registerPlugin(ScrollTrigger);

// Hero Section Animations
gsap.from('.hero-headline', { opacity: 0, y: 30, duration: 1.2, ease: 'power3.out', delay: 0.5 });
gsap.from('.hero-tagline', { opacity: 0, y: 30, duration: 1.2, ease: 'power3.out', delay: 0.7 });
gsap.from('.hero-ctas .button', { x: -50, opacity: 0, duration: 1, ease: 'power2.out', delay: 1, stagger: 0.2 });
gsap.from('.hero-ctas .explore-lookbook', { x: 50, opacity: 0, duration: 1, ease: 'power2.out', delay: 1.2 });

// About Retrofit Section Animations (Scroll-triggered fade-in text and line dividers)
gsap.utils.toArray('.about-text').forEach(text => {
    gsap.from(text, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: text,
            start: 'top 85%', // When the top of the text enters 85% of the viewport
            toggleActions: 'play none none reverse' // Play on enter, reverse on leave
        }
    });
});

gsap.utils.toArray('.about-retrofit .divider').forEach(divider => {
    gsap.from(divider, {
        scaleX: 0,
        transformOrigin: 'center center',
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: divider,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
        }
    });
});

// Featured Collections Animations (Scroll-triggered fade-in and reveal)
gsap.utils.toArray('.collection-card').forEach(card => {
    gsap.from(card, {
        opacity: 0,
        y: 50,
        scale: 0.95,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        }
    });
});

// Testimonial Slider
const slides = document.querySelectorAll('.testimonial-slide');
const prevArrow = document.querySelector('.prev-arrow');
const nextArrow = document.querySelector('.next-arrow');
let currentIndex = 0;
let autoSlideInterval;

function showSlide(index) {
    // Ensure index wraps around
    currentIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
        if (i === currentIndex) {
            gsap.to(slide, { opacity: 1, duration: 0.8, ease: 'power2.out', zIndex: 1 });
            slide.classList.add('active');
        } else {
            gsap.to(slide, { opacity: 0, duration: 0.8, ease: 'power2.out', zIndex: 0 });
            slide.classList.remove('active');
        }
    });
}

function startAutoSlide() {
    // Clear any existing interval to prevent multiple intervals running
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(() => {
        showSlide(currentIndex + 1);
    }, 5000); // Auto-slide every 5 seconds
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

if (prevArrow && nextArrow) {
    prevArrow.addEventListener('click', () => {
        stopAutoSlide(); // Stop auto-slide on manual interaction
        showSlide(currentIndex - 1);
        startAutoSlide(); // Restart auto-slide after a brief delay or immediately
    });
    nextArrow.addEventListener('click', () => {
        stopAutoSlide(); // Stop auto-slide on manual interaction
        showSlide(currentIndex + 1);
        startAutoSlide(); // Restart auto-slide
    });

    // Initial display and start auto-slide
    showSlide(currentIndex);
    startAutoSlide();
}

// Lookbook Lightbox functionality
const lookbookItems = document.querySelectorAll('.lookbook-item');
const lightboxModal = document.getElementById('lightbox-modal');
const lightboxImg = document.getElementById('lightbox-img');
const closeLightbox = document.querySelector('.close-lightbox');

lookbookItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default link behavior
        const imgSrc = item.getAttribute('data-lightbox-src');
        lightboxImg.src = imgSrc;
        lightboxModal.style.display = 'block';
        gsap.fromTo(lightboxModal, { opacity: 0 }, { opacity: 1, duration: 0.3 });
        gsap.fromTo(lightboxImg, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' });
    });
});

if (closeLightbox) {
    closeLightbox.addEventListener('click', () => {
        gsap.to(lightboxModal, { opacity: 0, duration: 0.3, onComplete: () => {
            lightboxModal.style.display = 'none';
        }});
    });
}

// Close lightbox when clicking outside the image
if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) {
            gsap.to(lightboxModal, { opacity: 0, duration: 0.3, onComplete: () => {
                lightboxModal.style.display = 'none';
            }});
        }
    });
}

// Newsletter Signup Button Bounce Animation (CSS handles the animation on hover)
// No specific GSAP needed here as CSS @keyframes are used.
