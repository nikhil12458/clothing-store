// Quick View Modal Functionality
const quickViewBtns = document.querySelectorAll('.quick-view-btn');
const quickViewModal = document.getElementById('quick-view-modal');
const closeModalBtn = document.querySelector('.close-modal');
const modalMainImage = document.getElementById('modal-main-image');
const modalProductName = document.getElementById('modal-product-name');
const modalProductPrice = document.getElementById('modal-product-price');
const modalProductDescription = document.getElementById('modal-product-description');
const modalSizeSelector = document.getElementById('modal-size');
const modalThumbnails = document.querySelector('.modal-thumbnails');

// Sample product data (in a real app, this would come from a database/API)
const productsData = [
    {
        name: 'Retro Graphic Tee',
        price: '$75.00',
        description: 'A vibrant retro graphic tee made from 100% organic cotton. Features a unique vintage print and a comfortable, relaxed fit.',
        images: [
            'https://placehold.co/400x500/FFD700/000000?text=Vintage+Tee+Color',
            'https://placehold.co/400x500/FFD700/000000?text=Vintage+Tee+Angle2',
            'https://placehold.co/400x500/FFD700/000000?text=Vintage+Tee+Detail'
        ],
        sizes: ['s', 'm', 'l', 'xl']
    },
    {
        name: 'Urban Oversized Hoodie',
        price: '$120.00',
        description: 'An essential oversized hoodie for modern streetwear. Crafted from heavy-weight fleece, offering ultimate comfort and style.',
        images: [
            'https://placehold.co/400x500/008000/FFFFFF?text=Streetwear+Hoodie+Color',
            'https://placehold.co/400x500/008000/FFFFFF?text=Streetwear+Hoodie+Angle2'
        ],
        sizes: ['m', 'l', 'xl']
    },
    {
        name: 'Clean Line Shirt',
        price: '$55.00',
        description: 'A minimalist shirt with clean lines and a modern silhouette. Perfect for a sophisticated, understated look.',
        images: [
            'https://placehold.co/400x500/ADD8E6/000000?text=Minimalist+Shirt+Color'
        ],
        sizes: ['xs', 's', 'm', 'l']
    },
    {
        name: 'Retro Band Tee',
        price: '$80.00',
        description: 'Channel your inner rockstar with this authentic retro band tee. Soft cotton, distressed finish, and a classic fit.',
        images: [
            'https://placehold.co/400x500/FF0000/FFFFFF?text=Band+Tee+Color',
            'https://placehold.co/400x500/FF0000/FFFFFF?text=Band+Tee+Detail'
        ],
        sizes: ['s', 'm', 'l']
    },
    {
        name: 'Minimalist Cap',
        price: '$30.00',
        description: 'A simple yet stylish cap to complete your minimalist look. Adjustable strap for a perfect fit.',
        images: [
            'https://placehold.co/400x500/333333/FFFFFF?text=Cap+Color'
        ],
        sizes: ['one-size']
    },
    {
        name: 'Classic Denim Jacket',
        price: '$95.00',
        description: 'A timeless denim jacket with a modern wash. A versatile piece that never goes out of style.',
        images: [
            'https://placehold.co/400x500/4682B4/FFFFFF?text=Denim+Jacket+Color',
            'https://placehold.co/400x500/4682B4/FFFFFF?text=Denim+Jacket+Back'
        ],
        sizes: ['s', 'm', 'l', 'xl']
    },
    {
        name: 'Essential White Shirt',
        price: '$60.00',
        description: 'The perfect crisp white shirt for any occasion. Made from breathable fabric for all-day comfort.',
        images: [
            'https://placehold.co/400x500/FFFFFF/000000?text=White+Shirt+Color'
        ],
        sizes: ['s', 'm', 'l']
    },
    {
        name: 'Abstract Graphic Tee',
        price: '$70.00',
        description: 'An artistic graphic tee featuring a unique abstract design. Express your individuality with this statement piece.',
        images: [
            'https://placehold.co/400x500/A9A9A9/FFFFFF?text=Graphic+Tee+Color'
        ],
        sizes: ['s', 'm', 'l', 'xl']
    }
];


quickViewBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const product = productsData[index]; // Get product data based on button index

        // Populate modal with product data
        modalMainImage.src = product.images[0];
        modalProductName.textContent = product.name;
        modalProductPrice.textContent = product.price;
        modalProductDescription.textContent = product.description;

        // Clear previous size options
        modalSizeSelector.innerHTML = '';
        // Add new size options
        product.sizes.forEach(size => {
            const option = document.createElement('option');
            option.value = size;
            option.textContent = size.toUpperCase();
            modalSizeSelector.appendChild(option);
        });

        // Populate thumbnails
        modalThumbnails.innerHTML = ''; // Clear existing thumbnails
        product.images.forEach((imgSrc, i) => {
            const thumb = document.createElement('img');
            thumb.src = imgSrc;
            thumb.alt = `Thumbnail ${i + 1}`;
            thumb.classList.add('modal-thumbnail');
            if (i === 0) {
                thumb.classList.add('active-thumb'); // Set first thumb as active
            }
            thumb.addEventListener('click', () => {
                modalMainImage.src = imgSrc;
                // Remove active class from all thumbs and add to clicked one
                document.querySelectorAll('.modal-thumbnail').forEach(t => t.classList.remove('active-thumb'));
                thumb.classList.add('active-thumb');
            });
            modalThumbnails.appendChild(thumb);
        });


        // Display the modal with GSAP animation
        quickViewModal.style.display = 'flex'; // Make it visible
        gsap.fromTo(quickViewModal, { opacity: 0 }, { opacity: 1, duration: 0.3 });
        gsap.fromTo(quickViewModal.querySelector('.quick-view-content'),
            { y: 50, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }
        );
    });
});

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
        gsap.to(quickViewModal.querySelector('.quick-view-content'),
            { y: 50, opacity: 0, scale: 0.9, duration: 0.3, ease: 'power2.in' });
        gsap.to(quickViewModal, {
            opacity: 0, duration: 0.3, delay: 0.2, onComplete: () => {
                quickViewModal.style.display = 'none';
            }
        });
    });
}

// Close modal when clicking outside the content
if (quickViewModal) {
    quickViewModal.addEventListener('click', (e) => {
        if (e.target === quickViewModal) {
            gsap.to(quickViewModal.querySelector('.quick-view-content'),
                { y: 50, opacity: 0, scale: 0.9, duration: 0.3, ease: 'power2.in' });
            gsap.to(quickViewModal, {
                opacity: 0, duration: 0.3, delay: 0.2, onComplete: () => {
                    quickViewModal.style.display = 'none';
                }
            });
        }
    });
}

// Filterable Grid Logic
const filterCheckboxes = document.querySelectorAll('.filters input[type="checkbox"]');
const colorSwatches = document.querySelectorAll('.color-swatch');
const productCards = document.querySelectorAll('.product-grid .product-card');

function applyFilters() {
    const selectedCategories = Array.from(document.querySelectorAll('.filter-group input[type="checkbox"][value="vintage-tees"]:checked, .filter-group input[type="checkbox"][value="streetwear"]:checked, .filter-group input[type="checkbox"][value="minimal"]:checked, .filter-group input[type="checkbox"][value="accessories"]:checked'))
        .map(cb => cb.value);
    const selectedSizes = Array.from(document.querySelectorAll('.filter-group input[type="checkbox"][value="xs"]:checked, .filter-group input[type="checkbox"][value="s"]:checked, .filter-group input[type="checkbox"][value="m"]:checked, .filter-group input[type="checkbox"][value="l"]:checked, .filter-group input[type="checkbox"][value="xl"]:checked, .filter-group input[type="checkbox"][value="one-size"]:checked'))
        .map(cb => cb.value);
    const selectedPriceRanges = Array.from(document.querySelectorAll('.filter-group input[type="checkbox"][value="0-50"]:checked, .filter-group input[type="checkbox"][value="50-100"]:checked, .filter-group input[type="checkbox"][value="100-200"]:checked, .filter-group input[type="checkbox"][value="200+"]:checked'))
        .map(cb => cb.value);
    const selectedColor = document.querySelector('.color-swatch.active')?.dataset.color;

    productCards.forEach(card => {
        const cardCategory = card.dataset.category;
        const cardSize = card.dataset.size;
        const cardPrice = parseFloat(card.dataset.price);
        const cardColor = card.dataset.color;

        let categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(cardCategory);
        let sizeMatch = selectedSizes.length === 0 || selectedSizes.includes(cardSize);
        let colorMatch = !selectedColor || cardColor === selectedColor;

        let priceMatch = selectedPriceRanges.length === 0;
        if (!priceMatch) {
            selectedPriceRanges.forEach(range => {
                if (range === '0-50' && cardPrice >= 0 && cardPrice <= 50) priceMatch = true;
                if (range === '50-100' && cardPrice > 50 && cardPrice <= 100) priceMatch = true;
                if (range === '100-200' && cardPrice > 100 && cardPrice <= 200) priceMatch = true;
                if (range === '200+' && cardPrice > 200) priceMatch = true;
            });
        }

        if (categoryMatch && sizeMatch && priceMatch && colorMatch) {
            gsap.to(card, { opacity: 1, scale: 1, display: 'block', duration: 0.3 });
        } else {
            gsap.to(card, {
                opacity: 0, scale: 0.9, duration: 0.3, onComplete: () => {
                    card.style.display = 'none'; // Hide after animation
                }
            });
        }
    });
}

filterCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', applyFilters);
});

colorSwatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
        // Toggle active class
        const isActive = swatch.classList.contains('active');
        colorSwatches.forEach(s => s.classList.remove('active')); // Remove active from all
        if (!isActive) {
            swatch.classList.add('active'); // Add active to clicked if it wasn't active
        }
        applyFilters();
    });
});

// Initial filter application on page load
document.addEventListener('DOMContentLoaded', applyFilters);
