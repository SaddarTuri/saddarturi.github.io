/* ===================================================
   SADDAR ABBAS PORTFOLIO — script.js
   =================================================== */

/* ---------- Navbar scroll effect ---------- */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  highlightNav();
});

/* ---------- Hamburger menu ---------- */
const hamburger = document.getElementById('hamburger');
const navLinksMenu = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksMenu.classList.toggle('open');
});

// Close on link click
navLinksMenu.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksMenu.classList.remove('open');
  });
});

/* ---------- Active nav link on scroll ---------- */
const sections = document.querySelectorAll('section[id]');

function highlightNav() {
  const scrollPos = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}

/* ---------- Reveal on scroll ---------- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings inside same parent
        const siblings = Array.from(
          entry.target.parentElement.querySelectorAll('.reveal')
        );
        const idx = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = `${idx * 80}ms`;
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ---------- Typewriter effect ---------- */
const phrases = [
  'Full-Stack Developer',
  'React & Node.js Expert',
  'Problem Solver',
  'UI/UX Enthusiast',
  'Open Source Contributor',
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeEl = document.getElementById('typewriter');

function type() {
  const current = phrases[phraseIndex];

  if (isDeleting) {
    typeEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typeEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 60 : 110;

  if (!isDeleting && charIndex === current.length) {
    speed = 2000; // pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    speed = 400;
  }

  setTimeout(type, speed);
}

type();

/* ---------- Animated counters ---------- */
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

/* ---------- Progress bars ---------- */
const progressObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.progress-fill').forEach(bar => {
          bar.style.width = bar.dataset.width + '%';
        });
        progressObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

const proficiencySection = document.querySelector('.proficiency');
if (proficiencySection) progressObserver.observe(proficiencySection);

/* ---------- Project filter ---------- */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const category = card.dataset.category;
      if (filter === 'all' || category === filter) {
        card.classList.remove('hidden');
        card.style.animation = 'fadeIn 0.4s ease forwards';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

/* ---------- Contact form (demo) ---------- */
const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
const submitBtn = document.getElementById('submitBtn');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btnSpan = submitBtn.querySelector('span');
    btnSpan.textContent = 'Sending…';
    submitBtn.disabled = true;

    // Simulate async send
    setTimeout(() => {
      formNote.textContent = '✅ Message sent! I\'ll get back to you soon.';
      formNote.className = 'form-note success';
      form.reset();
      btnSpan.textContent = 'Send Message';
      submitBtn.disabled = false;

      setTimeout(() => {
        formNote.textContent = '';
        formNote.className = 'form-note';
      }, 5000);
    }, 1600);
  });
}

/* ---------- Footer year ---------- */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ---------- Smooth scroll for all anchor links ---------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ---------- Subtle parallax on hero glows ---------- */
const glow1 = document.querySelector('.glow-1');
const glow2 = document.querySelector('.glow-2');

window.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  if (glow1) glow1.style.transform = `translateX(calc(-50% + ${x}px)) translateY(${y}px)`;
  if (glow2) glow2.style.transform = `translateX(${-x * 0.5}px) translateY(${-y * 0.5}px)`;
});

/* ---------- Fade-in keyframe via JS ---------- */
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);
