// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    navbar.classList.add('scrolled');
    backToTop.classList.add('visible');
  } else {
    navbar.classList.remove('scrolled');
    backToTop.classList.remove('visible');
  }
  highlightNavLink();
  animateSkillBars();
});

// ===== BACK TO TOP =====
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
function highlightNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}

// ===== TYPING EFFECT =====
const roles = [
  'Java Full Stack Developer',
  'Frontend Developer',
  'Backend Developer',
  'Problem Solver',
  'CSE Graduate'
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const roleText = document.getElementById('roleText');

function type() {
  const current = roles[roleIndex];
  if (isDeleting) {
    roleText.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    roleText.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === current.length) {
    setTimeout(() => { isDeleting = true; }, 1800);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }

  const speed = isDeleting ? 60 : 100;
  setTimeout(type, speed);
}
setTimeout(type, 600);

// ===== SKILL BARS ANIMATION =====
let skillsAnimated = false;

function animateSkillBars() {
  const skillsSection = document.getElementById('skills');
  if (!skillsSection || skillsAnimated) return;
  const rect = skillsSection.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100) {
    skillsAnimated = true;
    document.querySelectorAll('.skill-fill').forEach(bar => {
      const width = bar.getAttribute('data-width');
      bar.style.width = width + '%';
    });
  }
}

// Trigger on load too (if already in view)
animateSkillBars();

// ===== INTERSECTION OBSERVER - FADE IN SECTIONS =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.section, .skill-card, .project-card, .cert-card, .timeline-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Add visible class style
const style = document.createElement('style');
style.textContent = `
  .section.visible, .skill-card.visible, .project-card.visible,
  .cert-card.visible, .timeline-item.visible {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(style);

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const btnText = document.getElementById('btnText');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');
  btn.disabled = true;
  btnText.textContent = 'Sending...';

  setTimeout(() => {
    btn.disabled = false;
    btnText.textContent = 'Send Message';
    formSuccess.style.display = 'flex';
    contactForm.reset();
    setTimeout(() => { formSuccess.style.display = 'none'; }, 4000);
  }, 1500);
});

// ===== STAGGER ANIMATION FOR CARDS =====
function staggerCards(selector) {
  document.querySelectorAll(selector).forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.1}s`;
  });
}
staggerCards('.skill-card');
staggerCards('.project-card');
staggerCards('.cert-card');
staggerCards('.timeline-item');
