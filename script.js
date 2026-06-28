document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================
     1. Language Switcher & Localization
     ========================================== */
  const langSwitchBtn = document.getElementById('lang-switch-btn');
  const body = document.body;

  // Load language preference or default to Lithuanian if user locale is LT, else English
  let currentLang = localStorage.getItem('religion_lang') || 'en';
  setLanguage(currentLang);

  langSwitchBtn.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'lt' : 'en';
    setLanguage(currentLang);
  });

  function setLanguage(lang) {
    localStorage.setItem('religion_lang', lang);
    body.className = `lang-${lang}`;
    
    // Toggle active menu indicators based on current hash
    updateActiveMenuLink();
  }

  /* ==========================================
     2. Navigation Scroll Effects & Mobile Toggle
     ========================================== */
  const header = document.querySelector('.main-header');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-menu a');

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

  // Highlight current section in navigation
  function updateActiveMenuLink() {
    let fromTop = window.scrollY + 100;
    
    navLinks.forEach(link => {
      // Find both versions of the link (EN and LT have separate anchors)
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
     3. Particle Background Canvas System
     ========================================== */
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  let particlesArray = [];
  let mouse = { x: null, y: null, radius: 150 };

  // Adjust canvas size
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Capture mouse movement
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Particle Class representing glowing starch sparks
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height + canvas.height; // Start below screen or randomly
      if(Math.random() > 0.5) this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2.5 + 0.5;
      this.speedX = Math.random() * 0.4 - 0.2;
      this.speedY = -(Math.random() * 0.8 + 0.2); // Float upwards
      this.color = `rgba(212, 163, 92, ${Math.random() * 0.3 + 0.15})`; // Soft gold
      this.angle = Math.random() * 360;
      this.spinSpeed = Math.random() * 0.02 - 0.01;
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX;
      this.angle += this.spinSpeed;

      // Wrap around screen
      if (this.y < -10) {
        this.y = canvas.height + 10;
        this.x = Math.random() * canvas.width;
      }
      if (this.x < -10 || this.x > canvas.width + 10) {
        this.x = Math.random() * canvas.width;
      }

      // Mouse interactive push away effect
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
      
      // Dynamic glowing filter
      ctx.shadowBlur = this.size * 2;
      ctx.shadowColor = 'rgba(212, 163, 92, 0.5)';
      ctx.fill();
      ctx.restore();
    }
  }

  // Populate particles
  function initParticles() {
    particlesArray = [];
    const count = Math.floor((canvas.width * canvas.height) / 15000);
    for (let i = 0; i < Math.min(count, 120); i++) {
      particlesArray.push(new Particle());
    }
  }
  initParticles();

  // Animation Loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }
  animate();

  // Reinitialize particles on resize to fit density
  window.addEventListener('resize', () => {
    initParticles();
  });

  /* ==========================================
     4. Doctrine Cards interaction
     ========================================== */
  const doctrineCards = document.querySelectorAll('.doctrine-card');
  doctrineCards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Toggle card flip on click
      card.classList.toggle('flipped');
    });
  });

  /* ==========================================
     5. FAQ Accordion Logic
     ========================================== */
  const faqTriggers = document.querySelectorAll('.faq-trigger');
  
  faqTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const parent = trigger.parentElement;
      const content = trigger.nextElementSibling;
      const isOpen = parent.classList.contains('active');

      // Close all accordion items
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        item.querySelector('.faq-content').style.maxHeight = null;
      });

      if (!isOpen) {
        parent.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  /* ==========================================
     6. Signature Canvas Drawing Logic
     ========================================== */
  const sigCanvas = document.getElementById('signature-canvas');
  const sigCtx = sigCanvas.getContext('2d');
  const clearSigBtn = document.getElementById('clear-sig');
  const clearSigLtBtn = document.getElementById('clear-sig-lt');
  let isDrawing = false;
  let signatureIsEmpty = true;

  // Drawing settings
  sigCtx.strokeStyle = '#d4a35c'; // Match --primary
  sigCtx.lineWidth = 3;
  sigCtx.lineCap = 'round';
  sigCtx.lineJoin = 'round';

  function getCoords(e) {
    const rect = sigCanvas.getBoundingClientRect();
    const scaleX = sigCanvas.width / rect.width;
    const scaleY = sigCanvas.height / rect.height;
    if (e.touches && e.touches.length > 0) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY
      };
    } else {
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
      };
    }
  }

  function startDrawing(e) {
    isDrawing = true;
    signatureIsEmpty = false;
    const coords = getCoords(e);
    sigCtx.beginPath();
    sigCtx.moveTo(coords.x, coords.y);
  }

  function draw(e) {
    if (!isDrawing) return;
    e.preventDefault(); // Prevent scrolling on touch devices
    const coords = getCoords(e);
    sigCtx.lineTo(coords.x, coords.y);
    sigCtx.stroke();
  }

  function stopDrawing() {
    isDrawing = false;
  }

  function clearSignature() {
    sigCtx.clearRect(0, 0, sigCanvas.width, sigCanvas.height);
    signatureIsEmpty = true;
  }

  // Desktop Mouse Events
  sigCanvas.addEventListener('mousedown', startDrawing);
  sigCanvas.addEventListener('mousemove', draw);
  sigCanvas.addEventListener('mouseup', stopDrawing);
  sigCanvas.addEventListener('mouseleave', stopDrawing);

  // Mobile Touch Events
  sigCanvas.addEventListener('touchstart', startDrawing);
  sigCanvas.addEventListener('touchmove', draw);
  sigCanvas.addEventListener('touchend', stopDrawing);

  // Clear signature button binds
  clearSigBtn.addEventListener('click', clearSignature);
  clearSigLtBtn.addEventListener('click', clearSignature);

  // Resize listener to prevent stretching sig canvas context
  function initSigCanvasResolution() {
    // Clear and match bounding dimensions
    const rect = sigCanvas.getBoundingClientRect();
    sigCanvas.width = rect.width;
    sigCanvas.height = rect.height;
    
    // Restore styling properties lost during dimension changes
    sigCtx.strokeStyle = '#d4a35c';
    sigCtx.lineWidth = 3;
    sigCtx.lineCap = 'round';
    sigCtx.lineJoin = 'round';
  }
  initSigCanvasResolution();
  window.addEventListener('resize', initSigCanvasResolution);

  /* ==========================================
     7. Founding Registry Form Submission
     ========================================== */
  const pledgeForm = document.getElementById('pledge-form');
  const formSuccess = document.getElementById('form-success');
  const pledgeCountEl = document.getElementById('pledge-count');
  const pledgeCountLtEl = document.getElementById('pledge-count-lt');
  const progressBarFill = document.getElementById('progress-bar-fill');
  const disciplesList = document.getElementById('disciples-list');

  // Check if visitor has already signed
  const signedUser = localStorage.getItem('tuber_signed_user');
  if (signedUser) {
    const userData = JSON.parse(signedUser);
    displaySignedState(userData.name, userData.city);
  }

  pledgeForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('pledge-name').value.trim();
    const city = document.getElementById('pledge-city').value.trim();

    if (signatureIsEmpty) {
      alert(currentLang === 'en' ? 'Please provide your signature on the canvas to sign.' : 'Prašome pasirašyti tam skirtame laukelyje.');
      return;
    }

    // Save state
    const userData = { name, city };
    localStorage.setItem('tuber_signed_user', JSON.stringify(userData));

    // Animate list update
    displaySignedState(name, city);
  });

  function displaySignedState(name, city) {
    // Increment numbers: base is 11, becomes 12
    const totalPledges = 12;
    pledgeCountEl.textContent = totalPledges;
    pledgeCountLtEl.textContent = totalPledges;
    
    // Update progress bar percentage (12/15 = 80%)
    progressBarFill.style.width = '80%';

    // Append user to top of the scrollable disciples list
    const newItem = document.createElement('li');
    newItem.className = 'disciple-item verified new-disciple';
    
    newItem.innerHTML = `
      <div class="disciple-meta">
        <span class="disciple-name">${escapeHTML(name)}</span>
        <span class="disciple-addr">${escapeHTML(city)}, LT</span>
      </div>
      <span class="disciple-status" lang="en">Co-Founder</span>
      <span class="disciple-status" lang="lt">Bendraįkūrėjis</span>
    `;
    
    disciplesList.insertBefore(newItem, disciplesList.firstChild);

    // Hide form, show success
    pledgeForm.style.display = 'none';
    formSuccess.style.display = 'block';

    // Scroll disciples list to top to show newly added user
    document.querySelector('.disciples-scroll-area').scrollTop = 0;
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

  /* ==========================================
     8. Download Statutes PDF Mock
     ========================================== */
  const downloadStatutesBtn = document.getElementById('download-statutes-btn');
  downloadStatutesBtn.addEventListener('click', () => {
    // Elegant system print option that formats the statutes nicely
    window.print();
  });
});
