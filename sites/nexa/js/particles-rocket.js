/**
 * NEXA TELECOM - 3D Particle Rocket Interactive Engine (V2 - Ultra Cinema)
 * Exact recreation of the reference image:
 * - Huge imposing scale matching the reference monitor display
 * - Warm golden/amber dorsal canopy & nose cone
 * - Brilliant icy-blue/white cockpit sphere on the upper ridge
 * - Glowing golden core spine running to the engine
 * - Vibrant electric cyan & azure blue fuselage and swept delta wings
 * - High-speed dynamic plasma thruster flames
 * - Fluid interactive mouse repulsion, curl swirl & elastic spring return
 * - 3D drag-to-rotate with inertia damping
 */

(function () {
  'use strict';

  const container = document.getElementById('rocket-canvas-container');
  if (!container) return;

  // 1. Scene & Camera Setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    40,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  // Brought camera closer for a massive, screen-filling rocket
  camera.position.set(0, 0, 12.5);

  const renderer = new THREE.WebGLRenderer({
    antialias: false,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  let isCanvasVisible = true;
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      isCanvasVisible = entries[0].isIntersecting;
    }, { threshold: 0.02 });
    io.observe(container);
  }

  // Group to hold the entire rocket
  const rocketGroup = new THREE.Group();
  // Diagonally angled flying towards top-right (~42° on Z, ~18° on X, ~-28° on Y)
  const BASE_ROT_Z = Math.PI * 0.23;
  const BASE_ROT_X = 0.26;
  const BASE_ROT_Y = -0.42;

  rocketGroup.rotation.z = BASE_ROT_Z;
  rocketGroup.rotation.x = BASE_ROT_X;
  rocketGroup.rotation.y = BASE_ROT_Y;
  
  // Position slightly to the right of center, filling the right viewport
  rocketGroup.position.set(1.6, 0.2, 0);
  rocketGroup.scale.set(1.55, 1.55, 1.55);
  scene.add(rocketGroup);

  // Responsive sizing
  function handleResponsive() {
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);

    if (w < 768) {
      camera.position.z = 15.0;
      rocketGroup.position.set(0, 0.1, 0);
      rocketGroup.scale.set(1.3, 1.3, 1.3);
    } else if (w < 1100) {
      camera.position.z = 14.5;
      rocketGroup.position.set(1.0, 0.1, 0);
      rocketGroup.scale.set(1.35, 1.35, 1.35);
    } else {
      camera.position.z = 12.5;
      rocketGroup.position.set(1.8, 0.15, 0);
      rocketGroup.scale.set(1.65, 1.65, 1.65);
    }
  }

  // 2. High-Fidelity Glow Particle Texture
  function createParticleTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.18, 'rgba(255, 255, 255, 0.95)');
    grad.addColorStop(0.42, 'rgba(220, 240, 255, 0.6)');
    grad.addColorStop(0.7, 'rgba(100, 180, 255, 0.2)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(32, 32, 32, 0, Math.PI * 2);
    ctx.fill();

    return new THREE.CanvasTexture(canvas);
  }

  const particleTexture = createParticleTexture();

  // 3. Particle System Configuration (Dense & Luminous)
  const TOTAL_ROCKET_POINTS = 13500;
  const TOTAL_FLAME_POINTS  = 3000;
  const TOTAL_POINTS = TOTAL_ROCKET_POINTS + TOTAL_FLAME_POINTS;
  const TOTAL_STARS = 1500;

  const positions     = new Float32Array(TOTAL_POINTS * 3);
  const basePositions = new Float32Array(TOTAL_POINTS * 3);
  const velocities    = new Float32Array(TOTAL_POINTS * 3);
  const colors        = new Float32Array(TOTAL_POINTS * 3);
  const sizes         = new Float32Array(TOTAL_POINTS);

  const flameLifetimes = new Float32Array(TOTAL_FLAME_POINTS);
  const flameSpeeds    = new Float32Array(TOTAL_FLAME_POINTS);

  // Exact Color Palettes Matching Reference Image
  // 1. Warm Golden Amber / Honey / Copper (Canopy & Nose)
  const COLOR_GOLD_BRIGHT = new THREE.Color('#FFF176'); // Pale gold highlight
  const COLOR_GOLD_AMBER  = new THREE.Color('#FFB300'); // Radiant amber
  const COLOR_GOLD_DEEP   = new THREE.Color('#FB8C00'); // Warm orange-gold
  const COLOR_GOLD_COPPER = new THREE.Color('#E65100'); // Deep copper

  // 2. Cockpit Bubble (Icy Pale Cyan & Pure White)
  const COLOR_WHITE_CORE  = new THREE.Color('#FFFFFF');
  const COLOR_ICE_BLUE    = new THREE.Color('#E0F7FA');
  const COLOR_CYAN_GLOW   = new THREE.Color('#80DEEA');

  // 3. Body & Wings (Vivid Electric Blue & Cyan)
  const COLOR_NEON_CYAN   = new THREE.Color('#00E5FF');
  const COLOR_AZURE_BLUE  = new THREE.Color('#2979FF');
  const COLOR_ROYAL_BLUE  = new THREE.Color('#1565C0');
  const COLOR_DEEP_BLUE   = new THREE.Color('#0D47A1');

  // 4. Flame Exhaust (Blazing Core to Fire Red)
  const COLOR_FLAME_WHITE  = new THREE.Color('#FFFFEE');
  const COLOR_FLAME_YELLOW = new THREE.Color('#FFD600');
  const COLOR_FLAME_AMBER  = new THREE.Color('#FF6D00');
  const COLOR_FLAME_RED    = new THREE.Color('#DD2C00');

  let pIndex = 0;

  // Rocket Geometry Dimensions
  const ROCKET_LENGTH = 7.4;
  const ROCKET_Y_MIN = -3.7;
  const ROCKET_Y_MAX = 3.7;

  // Generate Rocket Points
  for (let i = 0; i < TOTAL_ROCKET_POINTS; i++) {
    const idx3 = pIndex * 3;
    const rand = Math.random();

    let px = 0, py = 0, pz = 0;
    let col = COLOR_NEON_CYAN;
    let pSize = 0.22 + Math.random() * 0.16;

    if (rand < 0.62) {
      // --- A. MAIN FUSELAGE & CANOPY ---
      // u goes from 0 (tail base) to 1 (sharp nose tip)
      const u = Math.pow(Math.random(), 0.88);
      py = ROCKET_Y_MIN + u * ROCKET_LENGTH;

      // Ogive / Von Karman aerodynamic profile
      let radius = 0;
      if (u > 0.82) {
        // Sharp aerodynamic cone tip
        const tTip = (u - 0.82) / 0.18;
        radius = 1.45 * Math.sqrt(Math.max(0, 1 - tTip)) * 0.7;
      } else if (u > 0.3) {
        // Bulging aerodynamic fuselage
        const tMid = (u - 0.55) / 0.45;
        radius = 1.48 * (1 - tMid * tMid * 0.32);
      } else {
        // Base tapering to engine nozzle
        radius = 1.15 + (u / 0.3) * 0.33;
      }

      // Shell distribution with internal volume depth
      const angle = Math.random() * Math.PI * 2;
      const depthFactor = 0.82 + Math.random() * 0.22;
      px = Math.cos(angle) * radius * depthFactor;
      pz = Math.sin(angle) * radius * depthFactor;

      // Color classification matching the exact reference image:
      // The image has the GOLDEN / AMBER particles along the upper/dorsal arch (pz > -0.25 && px > -0.45)
      // and concentrating towards the front nose cone (u > 0.68)
      const isDorsalArch = (pz > -0.3 && px > -0.45 && u > 0.22) || (u > 0.72);
      const isCenterSpine = Math.abs(px) < 0.4 && pz > 0.2 && u < 0.65;

      if (isDorsalArch && Math.random() < 0.86) {
        // GOLDEN / AMBER CANOPY
        const gMix = Math.random();
        if (gMix < 0.25) col = COLOR_GOLD_BRIGHT;
        else if (gMix < 0.65) col = COLOR_GOLD_AMBER;
        else if (gMix < 0.88) col = COLOR_GOLD_DEEP;
        else col = COLOR_GOLD_COPPER;

        pSize = 0.24 + Math.random() * 0.18;
      } else if (isCenterSpine && Math.random() < 0.6) {
        // WARM SPINAL GLOW (connecting cockpit down to engine)
        col = COLOR_GOLD_AMBER;
        pSize = 0.22 + Math.random() * 0.14;
      } else {
        // ELECTRIC CYAN & AZURE HULL
        const bMix = Math.random();
        if (bMix < 0.35) col = COLOR_NEON_CYAN;
        else if (bMix < 0.75) col = COLOR_AZURE_BLUE;
        else if (bMix < 0.92) col = COLOR_ROYAL_BLUE;
        else col = COLOR_DEEP_BLUE;

        pSize = 0.20 + Math.random() * 0.15;
      }

    } else if (rand < 0.82) {
      // --- B. COCKPIT BUBBLE SPHERE (Visible on the upper ridge in the photo) ---
      // Distinct dense spherical cluster of icy-white/blue particles
      const sphereCenter = { x: 0.38, y: 1.1, z: 1.05 };
      const sphereRadius = 0.95;

      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = sphereRadius * (0.75 + Math.random() * 0.28);

      const sinPhi = Math.sin(phi);
      px = sphereCenter.x + r * sinPhi * Math.cos(theta) * 0.95;
      py = sphereCenter.y + r * Math.cos(phi) * 0.95;
      pz = sphereCenter.z + r * sinPhi * Math.sin(theta) * 0.95;

      // Luminous icy blue and pure white
      const cMix = Math.random();
      if (cMix < 0.45) col = COLOR_WHITE_CORE;
      else if (cMix < 0.8) col = COLOR_ICE_BLUE;
      else col = COLOR_CYAN_GLOW;

      pSize = 0.26 + Math.random() * 0.18;

    } else {
      // --- C. SWEPT DELTA WINGS & STABILIZER FINS ---
      const wingSide = Math.random() < 0.45 ? 1 : Math.random() < 0.9 ? -1 : 0;
      const t = Math.random(); // 0 (front of wing root) to 1 (rear tip)

      if (wingSide !== 0) {
        // Left & Right Swept Wings
        py = -1.4 - t * 2.4;
        const wingSpan = 1.2 + t * 1.85;
        px = wingSide * wingSpan * (0.88 + Math.random() * 0.18);
        pz = (Math.random() - 0.5) * 0.32;
      } else {
        // Dorsal tail fin
        py = -1.6 - t * 2.0;
        px = (Math.random() - 0.5) * 0.26;
        pz = -(1.1 + t * 1.2) * (0.9 + Math.random() * 0.15);
      }

      const wMix = Math.random();
      if (wMix < 0.4) col = COLOR_NEON_CYAN;
      else if (wMix < 0.8) col = COLOR_AZURE_BLUE;
      else col = COLOR_ROYAL_BLUE;

      pSize = 0.21 + Math.random() * 0.14;
    }

    positions[idx3]     = px;
    positions[idx3 + 1] = py;
    positions[idx3 + 2] = pz;

    basePositions[idx3]     = px;
    basePositions[idx3 + 1] = py;
    basePositions[idx3 + 2] = pz;

    velocities[idx3]     = 0;
    velocities[idx3 + 1] = 0;
    velocities[idx3 + 2] = 0;

    colors[idx3]     = col.r;
    colors[idx3 + 1] = col.g;
    colors[idx3 + 2] = col.b;

    sizes[pIndex] = pSize;
    pIndex++;
  }

  // --- D. HIGH-ENERGY THRUSTER FLAMES ---
  for (let i = 0; i < TOTAL_FLAME_POINTS; i++) {
    const idx3 = pIndex * 3;
    const fIdx = i;

    const life = Math.random();
    flameLifetimes[fIdx] = life;
    flameSpeeds[fIdx] = 0.045 + Math.random() * 0.07;

    const nozzleRadius = 0.85;
    const angle = Math.random() * Math.PI * 2;
    const rBase = Math.sqrt(Math.random()) * nozzleRadius;

    const flameLength = 5.2;
    const py = ROCKET_Y_MIN - life * flameLength;

    const spread = (1.0 + life * 1.2);
    const px = Math.cos(angle) * rBase * spread + (Math.random() - 0.5) * 0.25;
    const pz = Math.sin(angle) * rBase * spread + (Math.random() - 0.5) * 0.25;

    positions[idx3]     = px;
    positions[idx3 + 1] = py;
    positions[idx3 + 2] = pz;

    basePositions[idx3]     = px;
    basePositions[idx3 + 1] = py;
    basePositions[idx3 + 2] = pz;

    velocities[idx3]     = 0;
    velocities[idx3 + 1] = 0;
    velocities[idx3 + 2] = 0;

    let col;
    if (life < 0.2) col = COLOR_FLAME_WHITE;
    else if (life < 0.45) col = COLOR_FLAME_YELLOW;
    else if (life < 0.75) col = COLOR_FLAME_AMBER;
    else col = COLOR_FLAME_RED;

    colors[idx3]     = col.r;
    colors[idx3 + 1] = col.g;
    colors[idx3 + 2] = col.b;

    sizes[pIndex] = 0.26 + (1.0 - life) * 0.16;
    pIndex++;
  }

  // Rocket Points Object
  const rocketGeometry = new THREE.BufferGeometry();
  rocketGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  rocketGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  rocketGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  const rocketMaterial = new THREE.PointsMaterial({
    size: 0.28,
    vertexColors: true,
    map: particleTexture,
    transparent: true,
    opacity: 0.95,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: true
  });

  const rocketPoints = new THREE.Points(rocketGeometry, rocketMaterial);
  rocketGroup.add(rocketPoints);

  // 4. Distant Ambient Starfield
  const starGeo = new THREE.BufferGeometry();
  const starPositions = new Float32Array(TOTAL_STARS * 3);
  const starColors = new Float32Array(TOTAL_STARS * 3);

  for (let i = 0; i < TOTAL_STARS; i++) {
    const idx = i * 3;
    starPositions[idx]     = (Math.random() - 0.5) * 60;
    starPositions[idx + 1] = (Math.random() - 0.5) * 50;
    starPositions[idx + 2] = -12 + (Math.random() - 0.5) * 40;

    const sRnd = Math.random();
    let sc = new THREE.Color('#FFFFFF');
    if (sRnd < 0.4) sc = new THREE.Color('#90CAF9');
    else if (sRnd < 0.6) sc = new THREE.Color('#FFE082');

    starColors[idx]     = sc.r;
    starColors[idx + 1] = sc.g;
    starColors[idx + 2] = sc.b;
  }

  starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

  const starMaterial = new THREE.PointsMaterial({
    size: 0.2,
    vertexColors: true,
    map: particleTexture,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const starField = new THREE.Points(starGeo, starMaterial);
  scene.add(starField);

  // -------------------------------------------------------------------------
  // 5. MOUSE & TOUCH FLUID INTERACTION PHYSICS
  // -------------------------------------------------------------------------
  const mouse = {
    x: 0,
    y: 0,
    prevX: 0,
    prevY: 0,
    speed: 0,
    targetTiltX: 0,
    targetTiltY: 0,
    currentTiltX: 0,
    currentTiltY: 0,
    worldPoint: new THREE.Vector3(9999, 9999, 9999),
    localPoint: new THREE.Vector3(9999, 9999, 9999),
    isHovered: false,
    hasMoved: false
  };

  const raycaster = new THREE.Raycaster();
  const planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  const inverseRocketMatrix = new THREE.Matrix4();

  // Drag to rotate in 3D
  let isDragging = false;
  let prevDragPos = { x: 0, y: 0 };
  let dragRotX = 0;
  let dragRotY = 0;

  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    prevDragPos.x = e.clientX;
    prevDragPos.y = e.clientY;
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  container.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches[0]) {
      isDragging = true;
      prevDragPos.x = e.touches[0].clientX;
      prevDragPos.y = e.touches[0].clientY;
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
    mouse.isHovered = false;
    mouse.worldPoint.set(9999, 9999, 9999);
    mouse.localPoint.set(9999, 9999, 9999);
    mouse.targetTiltX = 0;
    mouse.targetTiltY = 0;
  }, { passive: true });

  function onPointerMove(event) {
    const rect = container.getBoundingClientRect();
    const clientX = event.clientX !== undefined ? event.clientX : (event.touches && event.touches[0] ? event.touches[0].clientX : undefined);
    const clientY = event.clientY !== undefined ? event.clientY : (event.touches && event.touches[0] ? event.touches[0].clientY : undefined);

    if (clientX === undefined || clientY === undefined) return;

    if (isDragging) {
      const dx = clientX - prevDragPos.x;
      const dy = clientY - prevDragPos.y;
      dragRotY += dx * 0.007;
      dragRotX += dy * 0.007;
      prevDragPos.x = clientX;
      prevDragPos.y = clientY;
    }

    const inBounds =
      clientX >= rect.left - 120 &&
      clientX <= rect.right + 120 &&
      clientY >= rect.top - 120 &&
      clientY <= rect.bottom + 120;

    mouse.isHovered = inBounds;
    mouse.hasMoved = true;

    const normX = ((clientX - rect.left) / rect.width) * 2 - 1;
    const normY = -(((clientY - rect.top) / rect.height) * 2 - 1);

    // Track cursor velocity for dynamic impulse
    const dx = normX - mouse.prevX;
    const dy = normY - mouse.prevY;
    mouse.speed = Math.sqrt(dx * dx + dy * dy);
    mouse.prevX = normX;
    mouse.prevY = normY;
    mouse.x = normX;
    mouse.y = normY;

    // Smooth parallax tilt
    mouse.targetTiltY = Math.max(-0.6, Math.min(0.6, normX * 0.45));
    mouse.targetTiltX = Math.max(-0.5, Math.min(0.5, -normY * 0.35));

    // Raycast to 3D world plane Z=0
    raycaster.setFromCamera(new THREE.Vector2(normX, normY), camera);
    raycaster.ray.intersectPlane(planeZ, mouse.worldPoint);
  }

  window.addEventListener('mousemove', onPointerMove, { passive: true });
  window.addEventListener('touchmove', onPointerMove, { passive: true });

  window.addEventListener('mouseout', (e) => {
    if (!e.relatedTarget && !e.toElement) {
      mouse.isHovered = false;
      mouse.worldPoint.set(9999, 9999, 9999);
      mouse.localPoint.set(9999, 9999, 9999);
      mouse.targetTiltX = 0;
      mouse.targetTiltY = 0;
    }
  });

  // Shockwave Pulse on Click
  let shockwave = {
    active: false,
    radius: 0,
    maxRadius: 10.0,
    origin: new THREE.Vector3(),
    strength: 0
  };

  function triggerShockwave(origin) {
    shockwave.active = true;
    shockwave.radius = 0.1;
    shockwave.strength = 2.2;
    shockwave.origin.copy(origin || mouse.localPoint);
    if (shockwave.origin.x > 9000) shockwave.origin.set(0, 0, 0);
  }

  container.addEventListener('click', () => {
    triggerShockwave();
  });

  // -------------------------------------------------------------------------
  // 6. ANIMATION LOOP & PARTICLE PHYSICS
  // -------------------------------------------------------------------------
  let clock = new THREE.Clock();
  let time = 0;

  // Fluid physics constants
  const REPEL_RADIUS = 3.8;          // Generous interactive influence radius
  const REPEL_RADIUS_SQ = REPEL_RADIUS * REPEL_RADIUS;
  const BASE_REPEL_FORCE = 0.65;
  const SPRING_K = 0.082;            // Elastic snappy restoring spring
  const DAMPING = 0.88;              // Snappy damping for realistic bounce

  // Track scroll for dynamic 3D banking
  let currentScroll = 0;
  let targetScroll = 0;
  window.addEventListener('scroll', () => {
    targetScroll = window.scrollY;
  }, { passive: true });

  // Initial cinematic entrance timer
  let entranceProgress = 0;

  function animate() {
    requestAnimationFrame(animate);
    if (!isCanvasVisible) return;

    const delta = Math.min(clock.getDelta(), 0.1);
    time += delta;

    // Smooth scroll interpolation
    currentScroll += (targetScroll - currentScroll) * 0.05;
    const scrollFactor = Math.min(currentScroll / (window.innerHeight || 1), 2.5);

    // Opening cinematic entrance glide (0 -> 1 over 1.6s)
    if (entranceProgress < 1.0) {
      entranceProgress = Math.min(1.0, entranceProgress + delta * 0.65);
    }
    const easeEntrance = 1.0 - Math.pow(1.0 - entranceProgress, 3); // Cubic ease-out

    // 1. Idle Floating & Parallax Tilt
    mouse.currentTiltX += (mouse.targetTiltX - mouse.currentTiltX) * 0.06;
    mouse.currentTiltY += (mouse.targetTiltY - mouse.currentTiltY) * 0.06;

    if (!isDragging) {
      dragRotX *= 0.94;
      dragRotY *= 0.94;
    }

    const idleHover = Math.sin(time * 1.3) * 0.22;
    const idleRoll  = Math.cos(time * 1.0) * 0.05;

    const basePosY = (container.clientWidth < 768 ? 0.5 : 0.15);

    // Apply scroll parallax banking so rocket feels alive throughout the entire page
    rocketGroup.position.y = (basePosY + idleHover - scrollFactor * 0.9) * easeEntrance;
    rocketGroup.position.z = (0 - (1.0 - easeEntrance) * 4.0);
    rocketGroup.rotation.x = BASE_ROT_X + mouse.currentTiltX * 0.6 + idleRoll + dragRotX - scrollFactor * 0.22;
    rocketGroup.rotation.y = BASE_ROT_Y + mouse.currentTiltY * 0.8 + dragRotY + scrollFactor * 0.35;
    rocketGroup.rotation.z = BASE_ROT_Z + mouse.currentTiltY * 0.25 + scrollFactor * 0.12;


    // Synchronize 3D matrix for exact mouse projection
    rocketGroup.updateMatrixWorld(true);
    if (mouse.isHovered && mouse.hasMoved) {
      inverseRocketMatrix.copy(rocketGroup.matrixWorld).invert();
      mouse.localPoint.copy(mouse.worldPoint).applyMatrix4(inverseRocketMatrix);
    } else {
      mouse.localPoint.set(9999, 9999, 9999);
    }

    // Update Shockwave
    if (shockwave.active) {
      shockwave.radius += delta * 16.0;
      shockwave.strength *= 0.93;
      if (shockwave.radius > shockwave.maxRadius || shockwave.strength < 0.04) {
        shockwave.active = false;
      }
    }

    // 2. Physics Simulation on Rocket Particles
    const pos = positions;
    const base = basePositions;
    const vel = velocities;
    const mx = mouse.localPoint.x;
    const my = mouse.localPoint.y;
    const mz = mouse.localPoint.z;
    const hasMouseNear = mouse.isHovered && mx < 9000;

    // Repulsion force scales with mouse speed
    const dynamicForce = BASE_REPEL_FORCE * (1.0 + Math.min(mouse.speed * 4.0, 2.5));

    // --- ROCKET BODY PARTICLES ---
    for (let i = 0; i < TOTAL_ROCKET_POINTS; i++) {
      const i3 = i * 3;
      let px = pos[i3];
      let py = pos[i3 + 1];
      let pz = pos[i3 + 2];

      let vx = vel[i3];
      let vy = vel[i3 + 1];
      let vz = vel[i3 + 2];

      // A. MOUSE HOVER REPULSION WITH ORGANIC CURL SWIRL
      if (hasMouseNear) {
        const dx = px - mx;
        const dy = py - my;
        const dz = pz - mz;
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < REPEL_RADIUS_SQ && distSq > 0.001) {
          const dist = Math.sqrt(distSq);
          const factor = (1.0 - dist / REPEL_RADIUS);
          const force = factor * factor * dynamicForce;

          const invDist = 1.0 / dist;
          const nx = dx * invDist;
          const ny = dy * invDist;
          const nz = dz * invDist;

          // Organic vortex curl around cursor axis
          const swirlX = -ny * 0.45;
          const swirlY = nx * 0.45;

          vx += (nx * force * 0.7 + swirlX * force);
          vy += (ny * force * 0.7 + swirlY * force);
          vz += (nz * force * 0.85 + (Math.random() - 0.5) * 0.1);
        }
      }

      // B. SHOCKWAVE BURST
      if (shockwave.active) {
        const swdx = px - shockwave.origin.x;
        const swdy = py - shockwave.origin.y;
        const swdz = pz - shockwave.origin.z;
        const swDist = Math.sqrt(swdx * swdx + swdy * swdy + swdz * swdz);
        const waveDiff = Math.abs(swDist - shockwave.radius);

        if (waveDiff < 1.6) {
          const waveForce = (1.0 - waveDiff / 1.6) * shockwave.strength * 0.4;
          const nInv = 1.0 / (swDist + 0.001);
          vx += swdx * nInv * waveForce;
          vy += swdy * nInv * waveForce;
          vz += swdz * nInv * waveForce;
        }
      }

      // C. ELASTIC SPRING RESTORING FORCE
      const targetX = base[i3];
      const targetY = base[i3 + 1];
      const targetZ = base[i3 + 2];

      vx = (vx + (targetX - px) * SPRING_K) * DAMPING;
      vy = (vy + (targetY - py) * SPRING_K) * DAMPING;
      vz = (vz + (targetZ - pz) * SPRING_K) * DAMPING;

      pos[i3]     = px + vx;
      pos[i3 + 1] = py + vy;
      pos[i3 + 2] = pz + vz;

      vel[i3]     = vx;
      vel[i3 + 1] = vy;
      vel[i3 + 2] = vz;
    }

    // --- THRUSTER FLAME PARTICLES ---
    const flameOffsetStart = TOTAL_ROCKET_POINTS;

    for (let f = 0; f < TOTAL_FLAME_POINTS; f++) {
      const pIdx = flameOffsetStart + f;
      const i3 = pIdx * 3;

      let life = flameLifetimes[f];
      life += flameSpeeds[f];

      if (life >= 1.0) {
        life = 0;
        flameLifetimes[f] = 0;

        const nozzleRadius = 0.85;
        const angle = Math.random() * Math.PI * 2;
        const rBase = Math.sqrt(Math.random()) * nozzleRadius;

        base[i3]     = Math.cos(angle) * rBase;
        base[i3 + 1] = ROCKET_Y_MIN;
        base[i3 + 2] = Math.sin(angle) * rBase;

        pos[i3]     = base[i3];
        pos[i3 + 1] = base[i3 + 1];
        pos[i3 + 2] = base[i3 + 2];

        vel[i3]     = 0;
        vel[i3 + 1] = 0;
        vel[i3 + 2] = 0;
      } else {
        flameLifetimes[f] = life;

        const flameLen = 5.4;
        const spread = 1.0 + life * 1.3;

        const jitterX = Math.sin(time * 14.0 + f) * 0.08;
        const jitterZ = Math.cos(time * 14.0 + f) * 0.08;

        let px = base[i3] * spread + jitterX;
        let py = ROCKET_Y_MIN - life * flameLen;
        let pz = base[i3 + 2] * spread + jitterZ;

        if (hasMouseNear) {
          const dx = px - mx;
          const dy = py - my;
          const dz = pz - mz;
          const distSq = dx * dx + dy * dy + dz * dz;
          if (distSq < REPEL_RADIUS_SQ) {
            const factor = (1.0 - Math.sqrt(distSq) / REPEL_RADIUS);
            px += (dx * factor * 0.55);
            pz += (dz * factor * 0.55);
          }
        }

        pos[i3]     = px;
        pos[i3 + 1] = py;
        pos[i3 + 2] = pz;
      }
    }

    rocketGeometry.attributes.position.needsUpdate = true;

    // Starfield gentle motion
    starField.rotation.y = time * 0.012;
    starField.rotation.x = time * 0.006;

    renderer.render(scene, camera);
  }

  window.addEventListener('resize', handleResponsive, { passive: true });
  handleResponsive();
  animate();

})();
