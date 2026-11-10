'use client';

import { useEffect, useRef } from 'react';

/*
 * Low-poly 3D volcano in raw WebGL (no three.js, ~6KB). Erupts when it mounts
 * (i.e. every time the Project page opens), then keeps smoking with embers.
 */

// ---------- tiny mat4 helpers (column-major) ----------
const perspective = (fovy, aspect, near, far) => {
  const f = 1 / Math.tan(fovy / 2);
  const nf = 1 / (near - far);
  return new Float32Array([f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (far + near) * nf, -1, 0, 0, 2 * far * near * nf, 0]);
};
const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const norm = (a) => {
  const l = Math.hypot(a[0], a[1], a[2]) || 1;
  return [a[0] / l, a[1] / l, a[2] / l];
};
const lookAt = (eye, center, up) => {
  const z = norm(sub(eye, center));
  const x = norm(cross(up, z));
  const y = cross(z, x);
  return new Float32Array([x[0], y[0], z[0], 0, x[1], y[1], z[1], 0, x[2], y[2], z[2], 0, -(x[0] * eye[0] + x[1] * eye[1] + x[2] * eye[2]), -(y[0] * eye[0] + y[1] * eye[1] + y[2] * eye[2]), -(z[0] * eye[0] + z[1] * eye[1] + z[2] * eye[2]), 1]);
};
const mul = (a, b) => {
  const o = new Float32Array(16);
  for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++) o[c * 4 + r] = a[r] * b[c * 4] + a[4 + r] * b[c * 4 + 1] + a[8 + r] * b[c * 4 + 2] + a[12 + r] * b[c * 4 + 3];
  return o;
};

// ---------- geometry ----------
const PEAK = 1.7;
const RIM = 0.5;

const buildVolcano = () => {
  const SEG = 30;
  const RINGS = 9;
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647) * 2 - 1;

  // ring vertices: [x, y, z, h]
  const rings = [];
  for (let i = 0; i <= RINGS; i++) {
    const t = i / RINGS;
    const radius = RIM + (3.1 - RIM) * Math.pow(1 - t, 1.7);
    const ring = [];
    for (let s = 0; s < SEG; s++) {
      const a = (s / SEG) * Math.PI * 2;
      const jitter = i === RINGS ? 0.04 : 0.11 * (1 - t * 0.5);
      const r = radius * (1 + rnd() * jitter);
      const y = t * PEAK + (i > 0 && i < RINGS ? rnd() * 0.05 : 0) - (i === 0 ? 0.6 : 0);
      ring.push([Math.cos(a) * r, y, Math.sin(a) * r, t]);
    }
    rings.push(ring);
  }
  // crater: inner wall down to a lava floor (h > 1 marks lava in the shader)
  const inner = rings[RINGS].map(([x, , z]) => [x * 0.62, PEAK - 0.2, z * 0.62, 1.02]);
  const floorY = PEAK - 0.24;

  const pos = [];
  const nrm = [];
  const hgt = [];
  const tri = (a, b, c) => {
    const n = norm(cross(sub(b, a), sub(c, a)));
    for (const v of [a, b, c]) {
      pos.push(v[0], v[1], v[2]);
      nrm.push(n[0], n[1], n[2]);
      hgt.push(v[3]);
    }
  };
  const band = (lo, hi) => {
    for (let s = 0; s < SEG; s++) {
      const n = (s + 1) % SEG;
      tri(lo[s], hi[s], hi[n]);
      tri(lo[s], hi[n], lo[n]);
    }
  };
  for (let i = 0; i < RINGS; i++) band(rings[i], rings[i + 1]);
  band(rings[RINGS], inner);
  const centre = [0, floorY, 0, 1.3];
  for (let s = 0; s < SEG; s++) {
    const n = (s + 1) % SEG;
    tri([inner[s][0], floorY, inner[s][2], 1.3], centre, [inner[n][0], floorY, inner[n][2], 1.3]);
  }
  return { pos: new Float32Array(pos), nrm: new Float32Array(nrm), hgt: new Float32Array(hgt), count: pos.length / 3 };
};

// ---------- shaders ----------
const MOUNTAIN_VS = `
attribute vec3 aPos; attribute vec3 aNormal; attribute float aH;
uniform mat4 uMVP;
varying vec3 vN; varying float vH; varying vec3 vP;
void main(){ vN = aNormal; vH = aH; vP = aPos; gl_Position = uMVP * vec4(aPos, 1.0); }`;

const MOUNTAIN_FS = `
precision mediump float;
varying vec3 vN; varying float vH; varying vec3 vP;
uniform float uTime; uniform float uGlow; uniform float uFlow;
void main(){
  vec3 lava = vec3(1.0, 0.36, 0.08);
  if (vH > 1.1) {                       // crater floor: molten lava
    float p = 0.75 + 0.25 * sin(uTime * 3.0 + vP.x * 6.0);
    gl_FragColor = vec4(mix(lava, vec3(1.0, 0.8, 0.3), 0.35) * p * uGlow, 1.0);
    return;
  }
  vec3 n = normalize(vN);
  vec3 L = normalize(vec3(-0.55, 0.75, 0.35));
  float diff = max(dot(n, L), 0.0);
  vec3 rock = mix(vec3(0.07, 0.04, 0.035), vec3(0.17, 0.09, 0.07), vH);
  vec3 col = rock * (0.35 + diff * 0.9);
  // rim light from the lava below the crater lip
  col += lava * smoothstep(0.82, 1.02, vH) * 0.55 * uGlow;
  // lava rivers running down after the eruption
  float ang = atan(vP.z, vP.x);
  float channel = pow(max(0.0, sin(ang * 5.0 + sin(vH * 9.0) * 0.6)), 28.0);
  float reach = smoothstep(1.0 - uFlow, 1.0 - uFlow + 0.15, vH);
  col += lava * channel * reach * (0.8 + 0.2 * sin(uTime * 2.0 + vH * 12.0)) * 1.4;
  // fade the foot into the page background
  col = mix(vec3(0.04, 0.024, 0.024), col, smoothstep(-0.15, 0.25, vH));
  gl_FragColor = vec4(col, 1.0);
}`;

const PARTICLE_VS = `
attribute vec3 aPos; attribute vec2 aLifeSize;
uniform mat4 uMVP; uniform float uScale;
varying float vLife;
void main(){ vLife = aLifeSize.x; vec4 p = uMVP * vec4(aPos, 1.0); gl_Position = p; gl_PointSize = aLifeSize.y * uScale / p.w; }`;

const PARTICLE_FS = `
precision mediump float;
varying float vLife; uniform float uSmoke;
void main(){
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.0, d);
  if (uSmoke > 0.5) {
    gl_FragColor = vec4(vec3(0.22, 0.18, 0.17), a * 0.22 * sin(vLife * 3.14159));
  } else {
    vec3 c = mix(vec3(1.0, 0.85, 0.35), vec3(0.9, 0.15, 0.04), vLife);
    gl_FragColor = vec4(c, a * (1.0 - vLife * vLife));
  }
}`;

const compile = (gl, vs, fs) => {
  const p = gl.createProgram();
  for (const [type, src] of [
    [gl.VERTEX_SHADER, vs],
    [gl.FRAGMENT_SHADER, fs],
  ]) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.warn('[volcano] shader:', gl.getShaderInfoLog(s));
    gl.attachShader(p, s);
  }
  gl.linkProgram(p);
  return p;
};

// ---------- particle pool ----------
const MAX = 700;
const makePool = () => ({ n: 0, pos: new Float32Array(MAX * 3), vel: new Float32Array(MAX * 3), life: new Float32Array(MAX), ttl: new Float32Array(MAX), size: new Float32Array(MAX), attr: new Float32Array(MAX * 2) });

const emit = (pool, { speed, spread, ttl, size }) => {
  if (pool.n >= MAX) return;
  const i = pool.n++;
  const a = Math.random() * Math.PI * 2;
  const r = Math.random() * 0.25;
  pool.pos.set([Math.cos(a) * r, PEAK - 0.15, Math.sin(a) * r], i * 3);
  pool.vel.set([(Math.random() - 0.5) * spread, speed[0] + Math.random() * (speed[1] - speed[0]), (Math.random() - 0.5) * spread], i * 3);
  pool.life[i] = 0;
  pool.ttl[i] = ttl[0] + Math.random() * (ttl[1] - ttl[0]);
  pool.size[i] = size[0] + Math.random() * (size[1] - size[0]);
};

const step = (pool, dt, gravity, wind, grow) => {
  for (let i = 0; i < pool.n; i++) {
    pool.life[i] += dt / pool.ttl[i];
    if (pool.life[i] >= 1) {
      // swap-remove
      const last = --pool.n;
      pool.pos.copyWithin(i * 3, last * 3, last * 3 + 3);
      pool.vel.copyWithin(i * 3, last * 3, last * 3 + 3);
      pool.life[i] = pool.life[last];
      pool.ttl[i] = pool.ttl[last];
      pool.size[i] = pool.size[last];
      i--;
      continue;
    }
    pool.vel[i * 3 + 1] += gravity * dt;
    pool.vel[i * 3] += wind * dt;
    pool.pos[i * 3] += pool.vel[i * 3] * dt;
    pool.pos[i * 3 + 1] += pool.vel[i * 3 + 1] * dt;
    pool.pos[i * 3 + 2] += pool.vel[i * 3 + 2] * dt;
    pool.attr[i * 2] = pool.life[i];
    pool.attr[i * 2 + 1] = pool.size[i] * (1 + pool.life[i] * grow);
  }
};

const Volcano = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let cancelled = false;
    let cleanup = () => {};

    // Init is split into small idle-time phases so it never blocks the main thread
    // in one long task (context → shaders → geometry → first frame).
    const idle = window.requestIdleCallback ?? ((cb) => setTimeout(cb, 16));
    const cancelIdle = window.cancelIdleCallback ?? clearTimeout;
    let idleId = 0;
    const phase = () =>
      new Promise((resolve) => {
        idleId = idle(resolve, { timeout: 500 });
      });

    const init = async () => {
      const gl = canvas.getContext('webgl', { alpha: true, antialias: false, premultipliedAlpha: false, powerPreference: 'low-power' });
      if (!gl || cancelled) return;
      const parallel = gl.getExtension('KHR_parallel_shader_compile');
      const ready = async (prog) => {
        // With parallel compile, wait (without blocking) until the driver is done.
        while (parallel && !gl.getProgramParameter(prog, parallel.COMPLETION_STATUS_KHR)) {
          await phase();
          if (cancelled) return;
        }
      };

      await phase();
      if (cancelled) return;
      const mProg = compile(gl, MOUNTAIN_VS, MOUNTAIN_FS);
      await phase();
      if (cancelled) return;
      const pProg = compile(gl, PARTICLE_VS, PARTICLE_FS);
      await ready(mProg);
      await ready(pProg);
      await phase();
      if (cancelled) return;

      // mountain
      const geo = buildVolcano();
      const buf = (data) => {
        const b = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, b);
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
        return b;
      };
      const mBufs = { aPos: [buf(geo.pos), 3], aNormal: [buf(geo.nrm), 3], aH: [buf(geo.hgt), 1] };
      const mU = Object.fromEntries(['uMVP', 'uTime', 'uGlow', 'uFlow'].map((k) => [k, gl.getUniformLocation(mProg, k)]));

      // particles
      const pU = Object.fromEntries(['uMVP', 'uScale', 'uSmoke'].map((k) => [k, gl.getUniformLocation(pProg, k)]));
      const pPosBuf = gl.createBuffer();
      const pAttrBuf = gl.createBuffer();
      const lava = makePool();
      const smoke = makePool();

      const resetAttrs = () => {
        for (let i = 0; i < 4; i++) gl.disableVertexAttribArray(i);
      };
      const bindAttr = (prog, name, buffer, size) => {
        const loc = gl.getAttribLocation(prog, name);
        if (loc < 0) return;
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.enableVertexAttribArray(loc);
        gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
      };

      let w = 0;
      let h = 0;
      let dpr = 1;
      const resize = () => {
        dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        w = canvas.clientWidth;
        h = canvas.clientHeight;
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
        gl.viewport(0, 0, canvas.width, canvas.height);
      };
      resize();

      gl.enable(gl.DEPTH_TEST);
      gl.clearColor(0, 0, 0, 0);

      let start = 0;
      let last = 0;
      let frame = 0;
      let running = false;
      let emitAcc = 0;
      let smokeAcc = 0;

      const render = (now) => {
        const t = (now - start) / 1000;
        const dt = Math.min((now - last) / 1000, 0.05);
        last = now;

        // eruption timeline
        const erupting = !reduceMotion && t > 0.4 && t < 2.8;
        const glow = reduceMotion ? 1.2 : 1 + Math.max(0, 1.6 - Math.abs(t - 0.6) * 1.2);
        const flow = reduceMotion ? 0.55 : Math.min(1, Math.max(0, (t - 0.8) / 4)) * 0.7;

        if (!reduceMotion) {
          emitAcc += dt * (erupting ? 340 : 14);
          while (emitAcc >= 1) {
            emitAcc -= 1;
            emit(lava, erupting ? { speed: [4.5, 7.8], spread: 3.2, ttl: [1.4, 2.6], size: [10, 22] } : { speed: [1.2, 2.4], spread: 0.8, ttl: [0.8, 1.6], size: [5, 10] });
          }
          smokeAcc += dt * (erupting ? 22 : 5);
          while (smokeAcc >= 1) {
            smokeAcc -= 1;
            emit(smoke, { speed: [0.5, 1.1], spread: 0.6, ttl: [5, 8], size: [60, 120] });
          }
          step(lava, dt, -6.5, 0, 0);
          step(smoke, dt, 0.05, 0.12, 1.6);
        }

        // camera: slow orbit, small shake while erupting, volcano sits right on wide screens
        const aspect = w / Math.max(h, 1);
        const orbit = reduceMotion ? 0.6 : 0.6 + t * 0.045;
        const shake = erupting ? (Math.random() - 0.5) * 0.05 : 0;
        const dist = aspect < 1 ? 10 : 6.6;
        const eye = [Math.sin(orbit) * dist, 2.6 + shake, Math.cos(orbit) * dist];
        const right = [Math.cos(orbit), 0, -Math.sin(orbit)];
        // peak sits in the empty space right of the page heading on wide screens
        const offset = aspect > 1.2 ? -Math.min(2.4, aspect * 1.25) : 0;
        const target = [right[0] * offset, (aspect < 1 ? 0.4 : 0.85) + shake, right[2] * offset];
        const mvp = mul(perspective(0.6, aspect, 0.1, 60), lookAt(eye, target, [0, 1, 0]));

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // mountain
        gl.useProgram(mProg);
        resetAttrs();
        gl.disable(gl.BLEND);
        gl.depthMask(true);
        for (const [name, [b, size]] of Object.entries(mBufs)) bindAttr(mProg, name, b, size);
        gl.uniformMatrix4fv(mU.uMVP, false, mvp);
        gl.uniform1f(mU.uTime, t);
        gl.uniform1f(mU.uGlow, glow);
        gl.uniform1f(mU.uFlow, flow);
        gl.drawArrays(gl.TRIANGLES, 0, geo.count);

        // particles (no depth write so they blend softly)
        gl.useProgram(pProg);
        resetAttrs();
        gl.enable(gl.BLEND);
        gl.depthMask(false);
        gl.uniformMatrix4fv(pU.uMVP, false, mvp);
        gl.uniform1f(pU.uScale, h * dpr * 0.009);
        for (const [pool, isSmoke] of [
          [smoke, 1],
          [lava, 0],
        ]) {
          if (!pool.n) continue;
          // colour: soft-over for smoke, additive glow for lava; alpha: standard 'over' so it never saturates to white
          gl.blendFuncSeparate(gl.SRC_ALPHA, isSmoke ? gl.ONE_MINUS_SRC_ALPHA : gl.ONE, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
          gl.uniform1f(pU.uSmoke, isSmoke);
          gl.bindBuffer(gl.ARRAY_BUFFER, pPosBuf);
          gl.bufferData(gl.ARRAY_BUFFER, pool.pos.subarray(0, pool.n * 3), gl.DYNAMIC_DRAW);
          bindAttr(pProg, 'aPos', pPosBuf, 3);
          gl.bindBuffer(gl.ARRAY_BUFFER, pAttrBuf);
          gl.bufferData(gl.ARRAY_BUFFER, pool.attr.subarray(0, pool.n * 2), gl.DYNAMIC_DRAW);
          bindAttr(pProg, 'aLifeSize', pAttrBuf, 2);
          gl.drawArrays(gl.POINTS, 0, pool.n);
        }

        if (running) frame = requestAnimationFrame(render);
      };

      const play = () => {
        if (running || reduceMotion || document.hidden) return;
        running = true;
        last = performance.now();
        if (!start) start = last; // eruption clock starts at the first rendered frame
        frame = requestAnimationFrame(render);
      };
      const pause = () => {
        running = false;
        cancelAnimationFrame(frame);
      };
      const onVisibility = () => (document.hidden ? pause() : play());
      const onResize = () => {
        resize();
        if (!running) render(performance.now());
      };

      if (reduceMotion) {
        start = performance.now();
        render(start);
      } else play();
      canvas.style.opacity = window.innerWidth < 768 ? '0.7' : '1';

      window.addEventListener('resize', onResize);
      document.addEventListener('visibilitychange', onVisibility);
      cleanup = () => {
        pause();
        window.removeEventListener('resize', onResize);
        document.removeEventListener('visibilitychange', onVisibility);
      };
    };

    init();
    return () => {
      cancelled = true;
      cancelIdle(idleId);
      cleanup();
    };
  }, []);

  return <canvas ref={canvasRef} data-volcano aria-hidden="true" className="pointer-events-none fixed inset-0 h-full w-full opacity-0 transition-opacity duration-1000" />;
};

export default Volcano;
