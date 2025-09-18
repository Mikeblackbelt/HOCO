const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 50;

canvas.style.position = 'absolute';
canvas.style.display = 'none';
canvas.style.pointerEvents = 'none'; // so clicks still work on buttons

class Particle {
  constructor(x, y, dx, dy, size, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.size = size;
    this.color = color;
    this.alpha = 1; // start visible
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
    this.alpha -= 0.02; // fade out faster
    this.draw();
  }
}

function initParticles(x, y) {
  particles = []; // reset completely
  for (let i = 0; i < particleCount; i++) {
    const size = Math.random() * 5 + 2;
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 3 + 1;
    const dx = Math.cos(angle) * speed;
    const dy = Math.sin(angle) * speed;
    const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    particles.push(new Particle(x, y, dx, dy, size, color));
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.update();
    if (p.alpha <= 0) {
      particles.splice(i, 1); // remove faded particles
    }
  }

  if (particles.length > 0) {
    requestAnimationFrame(animate);
  } else {
    canvas.style.display = 'none'; // hide once all particles gone
  }
}

function getposition(element) {
  const rect = element.getBoundingClientRect();
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
}

const yes = document.getElementById('yes');

yes.addEventListener('click', () => {
  const yesPosition = getposition(yes);

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.left = 0;
  canvas.style.top = 0;
  canvas.style.display = 'block';

  initParticles(yesPosition.x, yesPosition.y);
  animate();
});
