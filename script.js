const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 75;

canvas.style.position = 'absolute';
canvas.style.display = 'none';
canvas.style.pointerEvents = 'none'; // clicks still pass through

class Particle {
  constructor(x, y, dx, dy, size, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.size = size;
    this.color = color;
    this.alpha = 1; 
    this.rotation = Math.random() * Math.PI * 2; // give each particle its own rotation
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;

    // move canvas origin to the particle center
    ctx.translate(this.x + this.size / 2, this.y + 0.25 * this.size);

    ctx.rotate(this.rotation);

    ctx.fillStyle = this.color;

    ctx.fillRect(-this.size / 2, -0.25 * this.size, this.size, 0.5 * this.size);

    ctx.restore();
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
    this.alpha -= 0.0005; // fade
    this.draw();
  }
}

function initParticles(x, y) {
  particles = []; 
  for (let i = 0; i < particleCount; i++) {
    const size = Math.random() * 12 + 8;
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
      particles.splice(i, 1); 
    }
  }

  if (particles.length > 0) {
    requestAnimationFrame(animate);
  } else {
    canvas.style.display = 'none'; 
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
