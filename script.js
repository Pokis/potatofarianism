document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================
     1. Global DOM Selectors & State Variables
     ========================================== */
  const body = document.body;
  const langBtns = document.querySelectorAll('.lang-btn');
  const header = document.querySelector('.main-header');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-menu a');
  const doctrineCards = document.querySelectorAll('.doctrine-card');
  const faqTriggers = document.querySelectorAll('.faq-trigger');
  const downloadStatutesBtn = document.getElementById('download-statutes-btn');
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');

  let particlesArray = [];
  let mouse = { x: null, y: null, radius: 150 };

  /* ==========================================
     2. Language Switcher & Active Links Setup
     ========================================== */
  function setLanguage(lang) {
    localStorage.setItem('religion_lang', lang);
    body.className = `lang-${lang}`;
    
    // Toggle active state class on header buttons
    langBtns.forEach(btn => {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
    
    updateActiveMenuLink();
  }

  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedLang = btn.getAttribute('data-lang');
      setLanguage(selectedLang);
    });
  });

  // Highlight current section in navigation
  function updateActiveMenuLink() {
    let fromTop = window.scrollY + 100;
    
    navLinks.forEach(link => {
      const sectionId = link.getAttribute('href');
      if (sectionId === '#') return;
      
      const section = document.querySelector(sectionId);
      if (section) {
        if (
          section.offsetTop <= fromTop &&
          section.offsetTop + section.offsetHeight > fromTop
        ) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
  }

  /* ==========================================
     3. Header Shrink & Mobile Toggle
     ========================================== */
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('shrink');
    } else {
      header.classList.remove('shrink');
    }
    updateActiveMenuLink();
  });

  // Mobile menu toggle
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navMenu.classList.toggle('open');
  });

  // Close mobile menu when link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navMenu.classList.remove('open');
    });
  });

  /* ==========================================
     4. Canvas Particle System (Starch Sparks)
     ========================================== */
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height + canvas.height;
      if (Math.random() > 0.5) this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2.5 + 0.5;
      this.speedX = Math.random() * 0.4 - 0.2;
      this.speedY = -(Math.random() * 0.8 + 0.2);
      this.color = `rgba(212, 163, 92, ${Math.random() * 0.3 + 0.15})`;
      this.angle = Math.random() * 360;
      this.spinSpeed = Math.random() * 0.02 - 0.01;
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX;
      this.angle += this.spinSpeed;

      if (this.y < -10) {
        this.y = canvas.height + 10;
        this.x = Math.random() * canvas.width;
      }
      if (this.x < -10 || this.x > canvas.width + 10) {
        this.x = Math.random() * canvas.width;
      }

      if (mouse.x != null && mouse.y != null) {
        let dx = this.x - mouse.x;
        let dy = this.y - mouse.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
          let force = (mouse.radius - distance) / mouse.radius;
          let directionX = dx / distance;
          let directionY = dy / distance;
          this.x += directionX * force * 3;
          this.y += directionY * force * 3;
        }
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.beginPath();
      ctx.arc(0, 0, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = this.size * 2;
      ctx.shadowColor = 'rgba(212, 163, 92, 0.5)';
      ctx.fill();
      ctx.restore();
    }
  }

  function initParticles() {
    particlesArray = [];
    const count = Math.floor((canvas.width * canvas.height) / 15000);
    for (let i = 0; i < Math.min(count, 120); i++) {
      particlesArray.push(new Particle());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
  });

  /* ==========================================
     5. Doctrine Cards Click Flip Interaction
     ========================================= */
  doctrineCards.forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });
  });

  /* ==========================================
     6. FAQ Accordion Logic
     ========================================== */
  faqTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const parent = trigger.parentElement;
      const content = trigger.nextElementSibling;
      const isOpen = parent.classList.contains('expanded');

      // Close all accordion items
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('expanded');
        item.querySelector('.faq-content').style.maxHeight = null;
      });

      if (!isOpen) {
        parent.classList.add('expanded');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  /* ==========================================
     7. Statutes Download Trigger
     ========================================== */
  if (downloadStatutesBtn) {
    downloadStatutesBtn.addEventListener('click', () => {
      window.print();
    });
  }

  /* ==========================================
     8. Scroll Reveal Animation Logic
     ========================================== */
  const revealElements = document.querySelectorAll('.reveal');
  
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback if browser doesn't support IntersectionObserver
    revealElements.forEach(el => el.classList.add('active'));
  }

  /* ==========================================
     9. Initialise Operations on Boot
     ========================================== */
  resizeCanvas();
  initParticles();
  animate();

  let currentLang = localStorage.getItem('religion_lang') || 'en';
  setLanguage(currentLang);
});
