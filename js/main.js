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
