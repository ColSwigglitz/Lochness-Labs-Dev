const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.main-nav a');
const year = document.getElementById('year');
const heroArt = document.querySelector('.hero-art-image');

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

if (heroArt && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const updateParallax = () => {
        const y = Math.min(window.scrollY * 0.12, 75);
        heroArt.style.transform = `translate3d(0, ${y}px, 0) scale(1.04)`;
    };
    updateParallax();
    window.addEventListener('scroll', updateParallax, { passive: true });
}

const lightbox = document.getElementById('gallery-lightbox');
const lightboxImage = lightbox?.querySelector('img');
const lightboxClose = lightbox?.querySelector('.lightbox-close');
const galleryItems = document.querySelectorAll('.gallery-item');

function closeGallery() {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lightboxImage) lightboxImage.src = '';
}

galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
        if (!lightbox || !lightboxImage) return;
        lightboxImage.src = item.dataset.full || item.querySelector('img')?.src || '';
        lightbox.classList.add('is-open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        lightboxClose?.focus();
    });
});

lightboxClose?.addEventListener('click', closeGallery);
lightbox?.addEventListener('click', (event) => {
    if (event.target === lightbox) closeGallery();
});
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && lightbox?.classList.contains('is-open')) closeGallery();
});