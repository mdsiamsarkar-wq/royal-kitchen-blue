/* Royal Kitchen Blue - main.js */

// Preloader
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').classList.add('done');
  }, 2200);
});

// Navbar scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
  highlightNav();
});

// Mobile menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Active nav link
function highlightNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.scrollY + 100;
  sections.forEach(s => {
    const top = s.offsetTop;
    const h = s.offsetHeight;
    const id = s.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      if (scrollY >= top && scrollY < top + h) link.classList.add('active');
      else link.classList.remove('active');
    }
  });
}

// Hero slideshow
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;

function goToSlide(n) {
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

dots.forEach((dot, i) => dot.addEventListener('click', () => goToSlide(i)));
setInterval(() => goToSlide(currentSlide + 1), 5000);

// Menu filters
const filterBtns = document.querySelectorAll('.filter-btn');
const menuCards = document.querySelectorAll('.menu-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    menuCards.forEach(card => {
      if (filter === 'all' || card.dataset.cat === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// Gallery lightbox
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbCaption = document.getElementById('lbCaption');
const lbClose = document.getElementById('lbClose');
const lbPrev = document.getElementById('lbPrev');
const lbNext = document.getElementById('lbNext');
let currentLb = 0;

const galleryImgs = Array.from(galleryItems).map(item => ({
  src: item.querySelector('img').src,
  caption: item.querySelector('.gallery-overlay span')?.textContent || ''
}));

function openLightbox(index) {
  currentLb = index;
  lbImg.src = galleryImgs[currentLb].src;
  lbCaption.textContent = galleryImgs[currentLb].caption;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

galleryItems.forEach((item, i) => {
  item.addEventListener('click', () => openLightbox(i));
});

lbClose.addEventListener('click', () => {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
});
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
});
lbPrev.addEventListener('click', (e) => {
  e.stopPropagation();
  currentLb = (currentLb - 1 + galleryImgs.length) % galleryImgs.length;
  lbImg.src = galleryImgs[currentLb].src;
  lbCaption.textContent = galleryImgs[currentLb].caption;
});
lbNext.addEventListener('click', (e) => {
  e.stopPropagation();
  currentLb = (currentLb + 1) % galleryImgs.length;
  lbImg.src = galleryImgs[currentLb].src;
  lbCaption.textContent = galleryImgs[currentLb].caption;
});
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape') { lightbox.classList.remove('active'); document.body.style.overflow = ''; }
  if (e.key === 'ArrowLeft') lbPrev.click();
  if (e.key === 'ArrowRight') lbNext.click();
});

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => revealObserver.observe(el));
