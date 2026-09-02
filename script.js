document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("snow-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const particles = [];
  const count = 120;

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2.5 + 0.5,
      speed: Math.random() * 0.5 + 0.2,
      drift: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.1,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
      ctx.fill();
      p.y += p.speed;
      p.x += p.drift;
      if (p.y > canvas.height + 10) {
        p.y = -10;
        p.x = Math.random() * canvas.width;
      }
      if (p.x > canvas.width + 10) p.x = -10;
      if (p.x < -10) p.x = canvas.width + 10;
    }
    requestAnimationFrame(draw);
  }
  draw();

  // Scroll reveal animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.section-title, .game-card').forEach(el => {
    observer.observe(el);
  });

  // Stagger game card animations
  document.querySelectorAll('.game-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.15}s`;
  });

  // Rotating text effect
  const rotatingEl = document.querySelector('.rotating-text');
  if (rotatingEl) {
    const words = ['Experience', 'Security', 'Enjoyment'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeLoop() {
      const currentWord = words[wordIndex];

      if (isDeleting) {
        charIndex--;
        rotatingEl.textContent = currentWord.substring(0, charIndex);
      } else {
        charIndex++;
        rotatingEl.textContent = currentWord.substring(0, charIndex);
      }

      let speed = isDeleting ? 60 : 120;

      if (!isDeleting && charIndex === currentWord.length) {
        speed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 400;
      }

      setTimeout(typeLoop, speed);
    }

    setTimeout(typeLoop, 1200);
  }
});
