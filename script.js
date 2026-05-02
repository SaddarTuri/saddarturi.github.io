/* ============================================
   SADDAR ABBAS PORTFOLIO — script.js
   ============================================ */

/* ---------- Theme Toggle ---------- */
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);

  // Brief scale pop on toggle
  themeToggle.style.transform = 'scale(0.85)';
  setTimeout(() => { themeToggle.style.transform = ''; }, 200);
});

/* ---------- Navbar scroll effect ---------- */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  highlightNav();
}, { passive: true });

/* ---------- Hamburger menu ---------- */
const hamburger = document.getElementById('hamburger');
const navLinksMenu = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksMenu.classList.toggle('open');
});

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
      link.classList.toggle('active', scrollPos >= top && scrollPos < bottom);
    }
  });
}

/* ---------- Reveal on scroll (staggered) ---------- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Find all reveal siblings in the same parent and stagger them
        const parent = entry.target.parentElement;
        const siblings = Array.from(
          parent.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
        ).filter(el => el.parentElement === parent || parent.contains(el));

        const idx = siblings.indexOf(entry.target);
        const delay = Math.min(idx * 90, 400); // cap at 400ms
        entry.target.style.transitionDelay = `${delay}ms`;
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
);

document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
  revealObserver.observe(el);
});

/* ---------- Typewriter effect ---------- */
const phrases = [
  'Senior Mobile Developer',
  'Android (Kotlin & Java) Expert',
  'Flutter App Developer',
  'Clean Architecture Advocate',
  'AI-Powered App Builder',
  'Open Source Contributor',
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeEl = document.getElementById('typewriter');

function type() {
  if (!typeEl) return;
  const current = phrases[phraseIndex];

  if (isDeleting) {
    typeEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typeEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 55 : 100;
  if (!isDeleting && charIndex === current.length) {
    speed = 2200;
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
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.6 }
);

document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

/* ---------- Progress bars ---------- */
const progressObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.progress-fill').forEach((bar, i) => {
          setTimeout(() => {
            bar.style.width = bar.dataset.width + '%';
          }, i * 120);
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
    projectCards.forEach((card, idx) => {
      const category = card.dataset.category || '';
      const show = filter === 'all' || category.split(' ').includes(filter);
      if (show) {
        card.classList.remove('hidden');
        card.style.animationDelay = `${idx * 60}ms`;
        card.style.animation = 'fadeInUp 0.4s ease both';
        setTimeout(() => { card.style.animation = ''; }, 500);
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

/* ---------- Contact form (demo submit) ---------- */
const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
const submitBtn = document.getElementById('submitBtn');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btnSpan = submitBtn.querySelector('span');
    btnSpan.textContent = 'Sending…';
    submitBtn.disabled = true;

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

/* ---------- Smooth scroll ---------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  });
});

/* ---------- Parallax on hero glows ---------- */
const glow1 = document.querySelector('.glow-1');
const glow2 = document.querySelector('.glow-2');

let lastX = 0, lastY = 0;
window.addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth - 0.5) * 24;
  const y = (e.clientY / window.innerHeight - 0.5) * 24;

  // Smooth interpolation
  lastX += (x - lastX) * 0.08;
  lastY += (y - lastY) * 0.08;

  if (glow1) glow1.style.transform = `translateX(calc(-50% + ${lastX}px)) translateY(${lastY}px)`;
  if (glow2) glow2.style.transform = `translateX(${-lastX * 0.5}px) translateY(${-lastY * 0.5}px)`;
}, { passive: true });

/* ---------- Timeline card entrance stagger ---------- */
const timelineObserver = new IntersectionObserver(
  entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 100);
        timelineObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.timeline-item .reveal').forEach(el => {
  timelineObserver.observe(el);
});

/* ---------- Project card tilt on hover ---------- */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-6px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ---------- Inject fadeInUp keyframe ---------- */
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);
