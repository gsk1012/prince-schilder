import { useEffect, useRef } from 'react';

const GOLD = { r: 200, g: 156, b: 40 };

function rand(min, max) {
  return min + Math.random() * (max - min);
}

class Particle {
  constructor(W, H) {
    this.reset(W, H);
  }

  reset(W, H) {
    this.x = rand(0, W);
    this.y = rand(0, H);
    this.vx = rand(-0.18, 0.18);
    this.vy = rand(-0.35, -0.08); // drift slowly upward
    this.radius = rand(1.5, 5.5);
    this.alpha = 0;
    this.maxAlpha = rand(0.12, 0.45);
    this.life = 0;
    this.maxLife = rand(280, 520);
    // paint-streak: elongated tail
    this.tail = rand(4, 22);
    this.angle = Math.atan2(this.vy, this.vx);
  }

  update(W, H) {
    this.x += this.vx;
    this.y += this.vy;
    this.life++;

    const half = this.maxLife / 2;
    if (this.life < half * 0.3) {
      this.alpha = (this.life / (half * 0.3)) * this.maxAlpha;
    } else if (this.life < half) {
      this.alpha = this.maxAlpha;
    } else {
      this.alpha = this.maxAlpha * (1 - (this.life - half) / half);
    }

    if (this.life >= this.maxLife) this.reset(W, H);
  }

  draw(ctx) {
    const { r, g, b } = GOLD;
    const tx = this.x - Math.cos(this.angle) * this.tail;
    const ty = this.y - Math.sin(this.angle) * this.tail;

    const grad = ctx.createLinearGradient(tx, ty, this.x, this.y);
    grad.addColorStop(0, `rgba(${r},${g},${b},0)`);
    grad.addColorStop(1, `rgba(${r},${g},${b},${this.alpha})`);

    ctx.beginPath();
    ctx.moveTo(tx, ty);
    ctx.lineTo(this.x, this.y);
    ctx.strokeStyle = grad;
    ctx.lineWidth = this.radius;
    ctx.lineCap = 'round';
    ctx.stroke();

    // glowing dot at tip
    const glow = ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, this.radius * 2.5
    );
    glow.addColorStop(0, `rgba(${r},${g},${b},${this.alpha * 0.9})`);
    glow.addColorStop(1, `rgba(${r},${g},${b},0)`);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius * 2.5, 0, Math.PI * 2);
    ctx.fillStyle = glow;
    ctx.fill();
  }
}

class Splash {
  constructor(W, H) {
    this.reset(W, H);
  }

  reset(W, H) {
    this.x = rand(W * 0.3, W);
    this.y = rand(H * 0.1, H * 0.85);
    this.radius = rand(60, 180);
    this.alpha = 0;
    this.maxAlpha = rand(0.03, 0.09);
    this.life = 0;
    this.maxLife = rand(400, 900);
  }

  update(W, H) {
    this.life++;
    const half = this.maxLife / 2;
    if (this.life < half * 0.4) {
      this.alpha = (this.life / (half * 0.4)) * this.maxAlpha;
    } else if (this.life < half) {
      this.alpha = this.maxAlpha;
    } else {
      this.alpha = this.maxAlpha * (1 - (this.life - half) / half);
    }
    if (this.life >= this.maxLife) this.reset(W, H);
  }

  draw(ctx) {
    const { r, g, b } = GOLD;
    const grad = ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, this.radius
    );
    grad.addColorStop(0, `rgba(${r},${g},${b},${this.alpha})`);
    grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
  }
}

export default function HeroBg() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let raf;
    let particles = [];
    let splashes = [];

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function init() {
      resize();
      const W = canvas.width;
      const H = canvas.height;
      const count = Math.floor((W * H) / 9000);
      particles = Array.from({ length: count }, () => {
        const p = new Particle(W, H);
        p.life = Math.floor(Math.random() * p.maxLife);
        return p;
      });
      splashes = Array.from({ length: 6 }, () => {
        const s = new Splash(W, H);
        s.life = Math.floor(Math.random() * s.maxLife);
        return s;
      });
    }

    function draw() {
      const W = canvas.width;
      const H = canvas.height;

      ctx.clearRect(0, 0, W, H);

      // dark bg with slight vignette
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, W, H);

      const vignette = ctx.createRadialGradient(
        W * 0.5, H * 0.5, H * 0.1,
        W * 0.5, H * 0.5, H * 0.95
      );
      vignette.addColorStop(0, 'rgba(0,0,0,0)');
      vignette.addColorStop(1, 'rgba(0,0,0,0.55)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, W, H);

      splashes.forEach(s => { s.update(W, H); s.draw(ctx); });
      particles.forEach(p => { p.update(W, H); p.draw(ctx); });

      raf = requestAnimationFrame(draw);
    }

    init();
    draw();

    const ro = new ResizeObserver(() => { resize(); init(); });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'block',
        zIndex: 0,
      }}
    />
  );
}
