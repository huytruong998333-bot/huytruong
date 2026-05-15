const body = document.body;
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
  }, 600);
});

const sections = document.querySelectorAll('main section[id]');
const navItems = document.querySelectorAll('.navlinks a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navItems.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, {
  threshold: 0.36,
});

sections.forEach(section => sectionObserver.observe(section));

const revealElements = document.querySelectorAll('.fade-up');
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

revealElements.forEach(el => revealObserver.observe(el));

const typedText = document.querySelector('.headline');
if (typedText) {
  const text = typedText.textContent.trim();
  typedText.textContent = '';
  const chars = text.split('');
  chars.forEach((char, index) => {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.opacity = '0';
    span.style.display = 'inline-block';
    span.style.animation = `typing 0.08s ease forwards ${index * 0.04 + 0.6}s`;
    typedText.appendChild(span);
  });
}

const styleSheet = document.createElement('style');
styleSheet.textContent = `@keyframes typing { to { opacity: 1; transform: translateY(0); } }`;
document.head.appendChild(styleSheet);

const resizeObserver = new ResizeObserver(entries => {
  entries.forEach(entry => {
    if (entry.contentRect.width <= 860) {
      navLinks.style.position = 'absolute';
      navLinks.style.top = '82px';
      navLinks.style.right = '20px';
      navLinks.style.background = 'rgba(255,255,255,0.95)';
      navLinks.style.padding = '18px 22px';
      navLinks.style.borderRadius = '24px';
      navLinks.style.flexDirection = 'column';
      navLinks.style.boxShadow = '0 32px 80px rgba(15,23,42,0.16)';
    } else {
      navLinks.style.position = '';
      navLinks.style.top = '';
      navLinks.style.right = '';
      navLinks.style.background = '';
      navLinks.style.padding = '';
      navLinks.style.borderRadius = '';
      navLinks.style.flexDirection = '';
      navLinks.style.boxShadow = '';
    }
  });
});
resizeObserver.observe(document.body);
