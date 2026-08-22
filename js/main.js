const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.main-nav a');
const year = document.getElementById('year');
const heroArt = document.querySelector('.hero-art-image');
const galleryItems = document.querySelectorAll('.gallery-item');
const galleryLightbox = document.querySelector('.gallery-lightbox');
const galleryLightboxImage = galleryLightbox?.querySelector('img');
const galleryLightboxClose = galleryLightbox?.querySelector('.lightbox-close');

if (year) year.textContent = new Date().getFullYear();

if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
        const isOpen = mainNav.classList.toggle('is-open');
        document.body.classList.toggle('menu-open', isOpen);
        menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('is-open');
            document.body.classList.remove('menu-open');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

const closeGallery = () => {
    if (!galleryLightbox || !galleryLightboxImage) return;
    galleryLightbox.classList.remove('is-open');
    galleryLightboxImage.removeAttribute('src');
    galleryLightboxImage.alt = '';
    document.body.style.removeProperty('overflow');
};

if (galleryLightbox && galleryLightboxImage && galleryItems.length) {
    galleryItems.forEach((item) => {
        item.addEventListener('click', () => {
            const sourceImage = item.querySelector('img');
            const fullImage = item.dataset.full || sourceImage?.src;
            if (!fullImage) return;
            galleryLightboxImage.src = fullImage;
            galleryLightboxImage.alt = sourceImage?.alt || 'Hotwing Hellions artwork';
            galleryLightbox.classList.add('is-open');
            document.body.style.overflow = 'hidden';
            galleryLightboxClose?.focus();
        });
    });

    galleryLightboxClose?.addEventListener('click', closeGallery);
    galleryLightbox.addEventListener('click', (event) => {
        if (event.target === galleryLightbox) closeGallery();
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && galleryLightbox.classList.contains('is-open')) closeGallery();
    });
}

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const desktopParallax = window.matchMedia('(min-width: 901px)');

if (heroArt && !reducedMotion.matches && desktopParallax.matches) {
    let ticking = false;

    const updateParallax = () => {
        const y = Math.min(window.scrollY * 0.12, 75);
        heroArt.style.transform = `translate3d(0, ${y}px, 0) scale(1.04)`;
        ticking = false;
    };

    const requestParallaxUpdate = () => {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    };

    updateParallax();
    window.addEventListener('scroll', requestParallaxUpdate, { passive: true });
} else if (heroArt) {
    heroArt.style.removeProperty('transform');
}
