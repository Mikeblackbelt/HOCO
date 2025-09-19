const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let particles = [];
var particleCount = 75;
var added = 0
canvas.style.position = 'absolute';
canvas.style.display = 'none';
canvas.style.pointerEvents = 'none'; 


class Particle {
  constructor(x, y, dx, dy, size, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.size = size;
    this.color = color;
    this.alpha = 1; 
    this.rotation = Math.random() * Math.PI * 2; 
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;

    ctx.translate(this.x + this.size / 2, this.y + 0.25 * this.size);

    ctx.rotate(this.rotation);

    ctx.fillStyle = this.color;

    ctx.fillRect(-this.size / 2, -0.25 * this.size, this.size, 0.5 * this.size);

    ctx.restore();
  }

  update() {
    this.x += this.dx;
    this.dx *= 0.992;
    this.y += this.dy;
    this.dy *= 0.992;
    this.size *= 0.995;
    this.alpha -= 0.005;
    this.rotation += 0.005;
    this.draw();
  }
}

function initParticles(x, y) {
  particles = []; 
  for (let i = 0; i < particleCount; i++) {
    var size = Math.random() * 12 + 8;
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 2 + 1.5;
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
    if (p.alpha <= 0 || p.size < 1) {
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
canvas.style.zIndex = 1000;
yes.style.zIndex = 1001;

yes.addEventListener('click', () => {
  const yesPosition = getposition(yes);
  particleCount += 10 - added;
  added = Math.max(added - 2, 10)
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.left = 0;
  canvas.style.top = 0;
  canvas.style.display = 'block';

  initParticles(yesPosition.x, yesPosition.y);
  animate();
});
