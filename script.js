/* Navbar */
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[data-section]');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 140) current = s.id; });
  navLinks.forEach(a => a.classList.toggle('active', a.dataset.section === current));
}, { passive: true });
if (window.scrollY > 40) navbar.classList.add('scrolled');

/* Hamburger */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  const open = hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});
document.querySelectorAll('.mob-link').forEach(a => a.addEventListener('click', () => {
  hamburger.classList.remove('open'); mobileMenu.classList.remove('open'); document.body.style.overflow = '';
}));

/* Reveal */
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
revealEls.forEach(el => observer.observe(el));

/* Filter */
const chapters = document.querySelectorAll('.menu-chapter');
const filterBtns = document.querySelectorAll('.filter-btn');
const catCards = document.querySelectorAll('.cat-card');
let currentFilter = 'all';

function filterMenu(filter) {
  if (filter === currentFilter && filter !== 'all') filter = 'all';
  currentFilter = filter;

  filterBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.filter === filter));
  catCards.forEach(card => card.classList.toggle('active', card.dataset.filter === filter));

  chapters.forEach(ch => {
    const id = ch.id.replace('chapter-', '');
    const show = filter === 'all' || id === filter;
    if (show) {
      ch.classList.remove('hidden');
      ch.style.animation = 'none';
      void ch.offsetWidth;
      ch.style.animation = '';
      ch.querySelectorAll('.reveal').forEach(el => { if (!el.classList.contains('visible')) observer.observe(el); });
    } else {
      ch.classList.add('hidden');
    }
  });
}

filterBtns.forEach(btn => btn.addEventListener('click', () => filterMenu(btn.dataset.filter)));
catCards.forEach(card => card.addEventListener('click', () => {
  filterMenu(card.dataset.filter);
  const ms = document.getElementById('menu');
  window.scrollTo({ top: ms.getBoundingClientRect().top + window.scrollY - 90, behavior: 'smooth' });
}));