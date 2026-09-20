/**
 * VEXO STUDIO - 3D ASSET INSPECTOR ENGINE
 * High-performance 3D canvas projection engine with interactive orbit,
 * wireframe/solid shading, and realistic Roblox asset geometry.
 */

(function () {
  const canvas = document.getElementById('asset-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.clientWidth;
  let height = canvas.clientHeight;

  // Set high-DPI resolution
  function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // 3D Geometry definitions
  const MODELS = {
    katana: {
      name: "Voidwalker Katana",
      triangles: "1,240 Tris",
      vertices: "680 Verts",
      category: "Weapon / Combat UGC",
      texture: "PBR Metallic Roughness 2K",
      generate: function () {
        const verts = [];
        const edges = [];
        const faces = [];

        // Blade points (segmented curved katana)
        const bladeSegments = 16;
        for (let i = 0; i <= bladeSegments; i++) {
          const t = i / bladeSegments;
          const y = -160 + t * 240;
          const curve = Math.sin(t * 1.5) * 16;
          const width = (1 - t * 0.4) * 8;
          const thick = (1 - t * 0.6) * 2.5;

          // 4 vertices per blade slice (diamond/wedge cross-section)
          const baseIdx = verts.length;
          verts.push([curve - width, y, 0]); // spine
          verts.push([curve, y, thick]);     // right bevel
          verts.push([curve + width, y, 0]); // sharp edge
          verts.push([curve, y, -thick]);    // left bevel

          if (i > 0) {
            const prev = baseIdx - 4;
            // Faces for spine, right side, edge, left side
            faces.push([prev, baseIdx, baseIdx + 1, prev + 1]);
            faces.push([prev + 1, baseIdx + 1, baseIdx + 2, prev + 2]);
            faces.push([prev + 2, baseIdx + 2, baseIdx + 3, prev + 3]);
            faces.push([prev + 3, baseIdx + 3, baseIdx, prev]);

            edges.push([prev, baseIdx], [prev + 1, baseIdx + 1], [prev + 2, baseIdx + 2], [prev + 3, baseIdx + 3]);
          }
          edges.push([baseIdx, baseIdx + 1], [baseIdx + 1, baseIdx + 2], [baseIdx + 2, baseIdx + 3], [baseIdx + 3, baseIdx]);
        }

        // Tsuba (Guard) - Disc
        const guardIdx = verts.length;
        const guardSegments = 12;
        const guardY = -165;
        for (let j = 0; j < guardSegments; j++) {
          const ang = (j / guardSegments) * Math.PI * 2;
          verts.push([Math.cos(ang) * 24, guardY, Math.sin(ang) * 18]);
          verts.push([Math.cos(ang) * 24, guardY - 6, Math.sin(ang) * 18]);
          const cur = guardIdx + j * 2;
          const nxt = guardIdx + ((j + 1) % guardSegments) * 2;
          edges.push([cur, cur + 1], [cur, nxt], [cur + 1, nxt + 1]);
          faces.push([cur, nxt, nxt + 1, cur + 1]);
        }

        // Tsuka (Handle / Grip)
        const handleIdx = verts.length;
        const handleSegs = 6;
        for (let k = 0; k <= handleSegs; k++) {
          const hy = -172 - k * 14;
          const hBase = verts.length;
          verts.push([-6, hy, 4], [6, hy, 4], [6, hy, -4], [-6, hy, -4]);
          if (k > 0) {
            const hPrev = hBase - 4;
            faces.push([hPrev, hBase, hBase + 1, hPrev + 1]);
            faces.push([hPrev + 1, hBase + 1, hBase + 2, hPrev + 2]);
            faces.push([hPrev + 2, hBase + 2, hBase + 3, hPrev + 3]);
            faces.push([hPrev + 3, hBase + 3, hBase, hPrev]);
            edges.push([hPrev, hBase], [hPrev + 1, hBase + 1], [hPrev + 2, hBase + 2], [hPrev + 3, hBase + 3]);
          }
          edges.push([hBase, hBase + 1], [hBase + 1, hBase + 2], [hBase + 2, hBase + 3], [hBase + 3, hBase]);
        }

        return { verts, edges, faces };
      }
    },
    crate: {
      name: "Quantum Supply Pod",
      triangles: "960 Tris",
      vertices: "512 Verts",
      category: "Sci-Fi Environment / Prop",
      texture: "Stylized Metallic PBR",
      generate: function () {
        const verts = [];
        const edges = [];
        const faces = [];
        const s = 70; // Outer box size
        const b = 50; // Inner chamfer

        // 8 Main outer corners
        const corners = [
          [-s, -s, -s], [s, -s, -s], [s, s, -s], [-s, s, -s],
          [-s, -s, s], [s, -s, s], [s, s, s], [-s, s, s],
          // Bevel / panels
          [-b, -b, -s - 8], [b, -b, -s - 8], [b, b, -s - 8], [-b, b, -s - 8],
          [-b, -b, s + 8], [b, -b, s + 8], [b, b, s + 8], [-b, b, s + 8],
          [-s - 8, -b, -b], [-s - 8, b, -b], [-s - 8, b, b], [-s - 8, -b, b],
          [s + 8, -b, -b], [s + 8, b, -b], [s + 8, b, b], [s + 8, -b, b]
        ];

        corners.forEach(p => verts.push(p));

        // Outer box faces
        faces.push([0, 1, 2, 3], [4, 5, 6, 7], [0, 1, 5, 4], [2, 3, 7, 6], [1, 2, 6, 5], [0, 3, 7, 4]);

        // Panel faces
        faces.push([8, 9, 10, 11], [12, 13, 14, 15], [16, 17, 18, 19], [20, 21, 22, 23]);

        // Build edges
        faces.forEach(f => {
          for (let i = 0; i < f.length; i++) {
            edges.push([f[i], f[(i + 1) % f.length]]);
          }
        });

        return { verts, edges, faces };
      }
    },
    helm: {
      name: "Apex Cyber Visor",
      triangles: "1,580 Tris",
      vertices: "840 Verts",
      category: "Avatar UGC / Armor",
      texture: "Emissive Neon + Chrome PBR",
      generate: function () {
        const verts = [];
        const edges = [];
        const faces = [];
        const rings = 10;
        const segs = 14;

        for (let r = 0; r <= rings; r++) {
          const phi = (r / rings) * Math.PI * 0.7;
          const y = Math.cos(phi) * 85;
          const rad = Math.sin(phi) * 85;
          const rBase = verts.length;

          for (let s = 0; s < segs; s++) {
            const theta = (s / segs) * Math.PI * 1.8 - Math.PI * 0.9;
            const x = Math.sin(theta) * rad;
            const z = Math.cos(theta) * rad;
            verts.push([x, y, z]);

            if (r > 0 && s < segs - 1) {
              const prev = rBase - segs + s;
              const cur = rBase + s;
              faces.push([prev, prev + 1, cur + 1, cur]);
              edges.push([cur, cur + 1], [cur, prev]);
            }
          }
        }

        // Visor Bar
        const vBase = verts.length;
        verts.push([-65, 10, 75], [65, 10, 75], [60, -25, 78], [-60, -25, 78]);
        faces.push([vBase, vBase + 1, vBase + 2, vBase + 3]);
        edges.push([vBase, vBase + 1], [vBase + 1, vBase + 2], [vBase + 2, vBase + 3], [vBase + 3, vBase]);

        return { verts, edges, faces };
      }
    }
  };

  // State
  let currentModelKey = 'katana';
  let currentGeometry = MODELS[currentModelKey].generate();
  let renderMode = 'solid'; // 'solid', 'wireframe', 'points'
  let rotX = 0.2;
  let rotY = 0.8;
  let isDragging = false;
  let lastMouseX = 0;
  let lastMouseY = 0;
  let autoRotate = true;
  let scale = 1.0;

  // Event Listeners for controls
  canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  canvas.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const dx = e.clientX - lastMouseX;
    const dy = e.clientY - lastMouseY;
    rotY += dx * 0.008;
    rotX += dy * 0.008;
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
  });

  // Touch support for mobile
  canvas.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      isDragging = true;
      lastMouseX = e.touches[0].clientX;
      lastMouseY = e.touches[0].clientY;
    }
  });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  canvas.addEventListener('touchmove', (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - lastMouseX;
    const dy = e.touches[0].clientY - lastMouseY;
    rotY += dx * 0.008;
    rotX += dy * 0.008;
    lastMouseX = e.touches[0].clientX;
    lastMouseY = e.touches[0].clientY;
  });

  // Mode switcher (Solid / Wireframe / Points)
  document.querySelectorAll('.viewer-btn[data-mode]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.viewer-btn[data-mode]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderMode = btn.dataset.mode;
    });
  });

  // Auto rotate toggle
  const autoRotateBtn = document.getElementById('btn-auto-rotate');
  if (autoRotateBtn) {
    autoRotateBtn.addEventListener('click', () => {
      autoRotate = !autoRotate;
      autoRotateBtn.classList.toggle('active', autoRotate);
    });
  }

  // Model Selector
  window.switchModel = function (key) {
    if (!MODELS[key]) return;
    currentModelKey = key;
    currentGeometry = MODELS[key].generate();

    document.querySelectorAll('.model-select-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.model === key);
    });

    // Update spec labels
    const spec = MODELS[key];
    const elName = document.getElementById('spec-model-name');
    const elTris = document.getElementById('spec-triangles');
    const elVerts = document.getElementById('spec-vertices');
    const elCat = document.getElementById('spec-category');
    const elTex = document.getElementById('spec-texture');

    if (elName) elName.textContent = spec.name;
    if (elTris) elTris.textContent = spec.triangles;
    if (elVerts) elVerts.textContent = spec.vertices;
    if (elCat) elCat.textContent = spec.category;
    if (elTex) elTex.textContent = spec.texture;
  };

  // Math 3D Projection
  function project(p, cx, cy) {
    // Rotation Y
    let cosY = Math.cos(rotY), sinY = Math.sin(rotY);
    let x1 = p[0] * cosY + p[2] * sinY;
    let y1 = p[1];
    let z1 = -p[0] * sinY + p[2] * cosY;

    // Rotation X
    let cosX = Math.cos(rotX), sinX = Math.sin(rotX);
    let x2 = x1;
    let y2 = y1 * cosX - z1 * sinX;
    let z2 = y1 * sinX + z1 * cosX;

    // Perspective projection
    const fov = 420;
    const distance = 460;
    const sz = z2 + distance;
    const projScale = (fov / (sz > 1 ? sz : 1)) * scale;

    return {
      x: cx + x2 * projScale,
      y: cy - y2 * projScale,
      z: z2
    };
  }

  // Render Loop
  function render() {
    ctx.clearRect(0, 0, width, height);

    if (autoRotate && !isDragging) {
      rotY += 0.009;
    }

    const cx = width / 2;
    const cy = height / 2 + 10;
    const { verts, edges, faces } = currentGeometry;

    // Project all vertices
    const projected = verts.map(v => project(v, cx, cy));

    // Render floor grid shadow
    ctx.beginPath();
    ctx.ellipse(cx, cy + 130, 140, 45, 0, 0, Math.PI * 2);
    const grad = ctx.createRadialGradient(cx, cy + 130, 10, cx, cy + 130, 140);
    grad.addColorStop(0, 'rgba(255, 255, 255, 0.12)');
    grad.addColorStop(0.5, 'rgba(203, 213, 225, 0.05)');
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.fill();

    // Render Mode Logic
    if (renderMode === 'solid') {
      // Calculate depth and normal for each face
      const faceList = faces.map(face => {
        let avgZ = 0;
        face.forEach(idx => avgZ += projected[idx].z);
        avgZ /= face.length;

        // Normal estimation for flat metallic shading
        const p0 = verts[face[0]];
        const p1 = verts[face[1]];
        const p2 = verts[face[2]];

        const v1 = [p1[0] - p0[0], p1[1] - p0[1], p1[2] - p0[2]];
        const v2 = [p2[0] - p0[0], p2[1] - p0[1], p2[2] - p0[2]];

        const nx = v1[1] * v2[2] - v1[2] * v2[1];
        const ny = v1[2] * v2[0] - v1[0] * v2[2];
        const nz = v1[0] * v2[1] - v1[1] * v2[0];
        const len = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;

        // Light direction (top-right-front specular)
        const lx = 0.5, ly = 0.7, lz = 0.5;
        const dot = Math.max(0.12, (nx / len * lx + ny / len * ly + nz / len * lz));

        return { face, avgZ, dot };
      });

      // Sort faces back to front (Painter's Algorithm)
      faceList.sort((a, b) => a.avgZ - b.avgZ);

      // Draw faces
      faceList.forEach(({ face, dot }) => {
        ctx.beginPath();
        const first = projected[face[0]];
        ctx.moveTo(first.x, first.y);
        for (let i = 1; i < face.length; i++) {
          const pt = projected[face[i]];
          ctx.lineTo(pt.x, pt.y);
        }
        ctx.closePath();

        // Metallic pure silver shader tone
        const brightness = Math.min(255, Math.floor(dot * 230 + 35));
        const silverTint = Math.min(255, Math.floor(brightness * 1.01));
        ctx.fillStyle = `rgba(${brightness}, ${brightness}, ${silverTint}, 0.92)`;
        ctx.fill();

        // Subtle chrome edge highlight
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 + dot * 0.35})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });
    }

    if (renderMode === 'wireframe' || renderMode === 'solid') {
      if (renderMode === 'wireframe') {
        // Pure neon silver wireframe
        ctx.strokeStyle = 'rgba(241, 245, 249, 0.85)';
        ctx.lineWidth = 1.2;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.6)';
        ctx.shadowBlur = 6;

        edges.forEach(([i1, i2]) => {
          if (!projected[i1] || !projected[i2]) return;
          ctx.beginPath();
          ctx.moveTo(projected[i1].x, projected[i1].y);
          ctx.lineTo(projected[i2].x, projected[i2].y);
          ctx.stroke();
        });

        ctx.shadowBlur = 0;
      }
    }

    if (renderMode === 'points') {
      projected.forEach(pt => {
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#cbd5e1';
        ctx.shadowBlur = 8;
        ctx.fill();
      });
      ctx.shadowBlur = 0;
    }

    requestAnimationFrame(render);
  }

  // Initialize
  render();
})();
