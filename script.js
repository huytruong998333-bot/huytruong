const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const pageLoader = document.getElementById('pageLoader');
const progressLine = document.getElementById('progressLine');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  menuToggle.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.classList.remove('open');
  });
});

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressLine.style.width = `${percent}%`;
});

window.addEventListener('load', () => {
  setTimeout(() => {
    pageLoader.classList.add('hidden');
  }, 700);
});

const sections = document.querySelectorAll('main section[id]');
const navItems = document.querySelectorAll('.navlinks a');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    }
  });
}, { threshold: 0.38 });

sections.forEach(section => sectionObserver.observe(section));

const revealElements = document.querySelectorAll('.fade-up');
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

revealElements.forEach(el => revealObserver.observe(el));

const typedText = document.querySelector('.hero-title');
if (typedText) {
  const originalText = typedText.textContent.trim();
  typedText.textContent = '';
  originalText.split('').forEach((char, index) => {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.opacity = '0';
    span.style.display = 'inline-block';
    span.style.animation = `typing 0.06s ease forwards ${index * 0.03 + 0.8}s`;
    typedText.appendChild(span);
  });
}

const styleSheet = document.createElement('style');
styleSheet.textContent = `@keyframes typing { to { opacity: 1; transform: translateY(0); } }`;
document.head.appendChild(styleSheet);
