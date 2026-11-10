'use client';

import { useEffect, useRef } from 'react';

// Lightweight replacement for tsparticles (~2KB instead of ~50KB of JS):
// same look — small coloured squares that drift and bounce, scatter away
// from the cursor, and multiply on click.
const COLORS = ['#fdcf58', '#757676', '#f27d0c', '#800909', '#f07f13'];
const REPULSE_RADIUS = 200;
const MAX_PARTICLES = 140;

const rand = (min, max) => min + Math.random() * (max - min);

const makeParticle = (w, h, x = rand(0, w), y = rand(0, h)) => {
  const angle = rand(0, Math.PI * 2);
  const speed = rand(0.4, 1.6);
  return { x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, size: rand(1, 3), color: COLORS[(Math.random() * COLORS.length) | 0], ox: 0, oy: 0 };
};

const Particle = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pointer = { x: -9999, y: -9999 };
    let particles = [];
    let w = 0;
    let h = 0;
    let frame = 0;
    let last = 0;
    let running = false;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const target = Math.max(18, Math.min(90, Math.round((w * h) / 16000)));
      while (particles.length < target) particles.push(makeParticle(w, h));
      if (particles.length > target) particles.length = target;
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x + p.ox, p.y + p.oy, p.size, p.size);
      }
    };

    const tick = (now) => {
      const dt = Math.min((now - last) / 16.67, 3);
      last = now;
      for (const p of particles) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        // Repulse: ease an offset away from the pointer, relax back otherwise.
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const dist = Math.hypot(dx, dy);
        let tx = 0;
        let ty = 0;
        if (dist < REPULSE_RADIUS && dist > 0) {
          const force = (1 - dist / REPULSE_RADIUS) * 90;
          tx = (dx / dist) * force;
          ty = (dy / dist) * force;
        }
        p.ox += (tx - p.ox) * 0.12 * dt;
        p.oy += (ty - p.oy) * 0.12 * dt;
      }
      draw();
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running || reduceMotion || document.hidden) return;
      running = true;
      last = performance.now();
      frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    const onMove = (e) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };
    const onClick = (e) => {
      for (let i = 0; i < 4 && particles.length < MAX_PARTICLES; i++) particles.push(makeParticle(w, h, e.clientX, e.clientY));
      if (reduceMotion) draw();
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    // Start after the page is idle so particles never compete with first paint.
    const idle = window.requestIdleCallback ?? ((cb) => setTimeout(cb, 400));
    const cancelIdle = window.cancelIdleCallback ?? clearTimeout;
    const idleId = idle(
      () => {
        resize();
        draw();
        canvas.style.opacity = '1';
        start();
      },
      { timeout: 2000 },
    );

    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    window.addEventListener('click', onClick);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelIdle(idleId);
      stop();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('click', onClick);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 h-full w-full opacity-0 transition-opacity duration-1000" />;
};

export default Particle;
