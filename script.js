const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 100;

class Particle {
  constructor(x, y, dx, dy, size, color) {
    this.x = x;
    this.y = y;
    this.dx = dx; // Horizontal velocity
    this.dy = dy; // Vertical velocity
    this.size = size;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  update() {
    if (this.x + this.size > canvas.width || this.x - this.size < 0) this.dx *= -1;
    if (this.y + this.size > canvas.height || this.y - this.size < 0) this.dy *= -1;

    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }
}

function initParticles() {
  for (let i = 0; i < particleCount; i++) {
    const size = Math.random() * 5 + 1;
    const x = Math.random() * (canvas.width - size * 2) + size;
    const y = Math.random() * (canvas.height - size * 2) + size;
    const dx = (Math.random() - 0.5) * 2;
    const dy = (Math.random() - 0.5) * 2;
    const color = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.7)`;
    particles.push(new Particle(x, y, dx, dy, size, color));
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(particle => particle.update());
  requestAnimationFrame(animate);
}

initParticles();
animate();
