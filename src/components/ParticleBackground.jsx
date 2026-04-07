import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "../context/ThemeContext";

const CONNECTION_DISTANCE = 120;
const MOUSE_INFLUENCE_RADIUS = 150;
const MOUSE_REPULSION_STRENGTH = 0.8;
const ROTATION_SPEED = 0.00025;
const DRIFT_SPEED = 0.15;
const SPRING_STRENGTH = 0.002;
const CAMERA_PARALLAX = 20;
const SPREAD = 500;

export default function ParticleBackground() {
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isDark = theme === "dark";
    const isMobile = window.innerWidth < 768;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const particleCount = isMobile ? (isDark ? 450 : 280) : (isDark ? 900 : 550);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.z = 400;

    const group = new THREE.Group();
    scene.add(group);

    // Particle data
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const origins = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = SPREAD * (0.3 + Math.random() * 0.7);
      positions[i3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = r * Math.cos(phi);
      origins[i3] = positions[i3];
      origins[i3 + 1] = positions[i3 + 1];
      origins[i3 + 2] = positions[i3 + 2];
      velocities[i3] = (Math.random() - 0.5) * DRIFT_SPEED;
      velocities[i3 + 1] = (Math.random() - 0.5) * DRIFT_SPEED;
      velocities[i3 + 2] = (Math.random() - 0.5) * DRIFT_SPEED;
      sizes[i] = 1.5 + Math.random() * 2.5;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const particleAlpha = isDark ? 0.4 : 0.12;
    const particleMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
      uniforms: {
        uColor1: { value: new THREE.Color(isDark ? 0x4f7df9 : 0x3a5ec9) },
        uColor2: { value: new THREE.Color(isDark ? 0x7b63f5 : 0x5a4abf) },
        uAlpha: { value: particleAlpha },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      },
      vertexShader: `
        attribute float size;
        varying float vDepth;
        uniform float uPixelRatio;
        void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * uPixelRatio * (200.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
          vDepth = clamp(-mvPosition.z / 800.0, 0.0, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uAlpha;
        varying float vDepth;
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          float alpha = smoothstep(0.5, 0.1, dist);
          alpha *= (1.0 - vDepth * 0.7);
          alpha *= uAlpha;
          vec3 color = mix(uColor1, uColor2, vDepth);
          gl_FragColor = vec4(color, alpha);
        }
      `,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    group.add(particles);

    // Connections
    const connections = [];
    const maxConns = 3;
    const connCounts = new Uint8Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      if (connCounts[i] >= maxConns) continue;
      for (let j = i + 1; j < particleCount; j++) {
        if (connCounts[j] >= maxConns) continue;
        const dx = positions[j * 3] - positions[i * 3];
        const dy = positions[j * 3 + 1] - positions[i * 3 + 1];
        const dz = positions[j * 3 + 2] - positions[i * 3 + 2];
        if (dx * dx + dy * dy + dz * dz < CONNECTION_DISTANCE * CONNECTION_DISTANCE) {
          connections.push(i, j);
          connCounts[i]++;
          connCounts[j]++;
          if (connCounts[i] >= maxConns) break;
        }
      }
    }

    const lineCount = connections.length / 2;
    const linePositions = new Float32Array(lineCount * 6);
    const lineColors = new Float32Array(lineCount * 6);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeo.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));

    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: isDark ? 0.12 : 0.04,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
      depthWrite: false,
    });

    const lines = new THREE.LineSegments(lineGeo, lineMat);
    group.add(lines);

    // Mouse
    const mouse = new THREE.Vector2(0, 0);
    const targetCamOff = new THREE.Vector2(0, 0);
    const currentCamOff = new THREE.Vector2(0, 0);
    const mouseWorld = new THREE.Vector3(0, 0, 0);
    const raycaster = new THREE.Raycaster();
    const mousePlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

    const handlePointerMove = (e) => {
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;
      mouse.x = (cx / window.innerWidth) * 2 - 1;
      mouse.y = -(cy / window.innerHeight) * 2 + 1;
      targetCamOff.set(mouse.x * CAMERA_PARALLAX, mouse.y * CAMERA_PARALLAX);
    };
    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("touchmove", handlePointerMove, { passive: true });

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    let animId;
    let frame = 0;
    const lineBaseColor = new THREE.Color(isDark ? 0x4f7df9 : 0x3a5ec9);

    const animate = () => {
      animId = requestAnimationFrame(animate);
      frame++;
      if (isMobile && frame % 2 !== 0) return;

      group.rotation.y += ROTATION_SPEED;
      group.rotation.x = Math.sin(frame * 0.0003) * 0.1;

      currentCamOff.x += (targetCamOff.x - currentCamOff.x) * 0.03;
      currentCamOff.y += (targetCamOff.y - currentCamOff.y) * 0.03;
      camera.position.x = currentCamOff.x;
      camera.position.y = currentCamOff.y;
      camera.lookAt(0, 0, 0);

      raycaster.setFromCamera(mouse, camera);
      raycaster.ray.intersectPlane(mousePlane, mouseWorld);

      const posArr = particleGeo.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        posArr[i3] += velocities[i3];
        posArr[i3 + 1] += velocities[i3 + 1];
        posArr[i3 + 2] += velocities[i3 + 2];
        velocities[i3] += (origins[i3] - posArr[i3]) * SPRING_STRENGTH;
        velocities[i3 + 1] += (origins[i3 + 1] - posArr[i3 + 1]) * SPRING_STRENGTH;
        velocities[i3 + 2] += (origins[i3 + 2] - posArr[i3 + 2]) * SPRING_STRENGTH;
        velocities[i3] *= 0.98;
        velocities[i3 + 1] *= 0.98;
        velocities[i3 + 2] *= 0.98;

        const wp = new THREE.Vector3(posArr[i3], posArr[i3 + 1], posArr[i3 + 2]);
        group.localToWorld(wp);
        const dx = wp.x - mouseWorld.x;
        const dy = wp.y - mouseWorld.y;
        const dz = wp.z - mouseWorld.z;
        const distSq = dx * dx + dy * dy + dz * dz;
        if (distSq < MOUSE_INFLUENCE_RADIUS * MOUSE_INFLUENCE_RADIUS && distSq > 0.01) {
          const dist = Math.sqrt(distSq);
          const force = (1 - dist / MOUSE_INFLUENCE_RADIUS) * MOUSE_REPULSION_STRENGTH;
          velocities[i3] += (dx / dist) * force;
          velocities[i3 + 1] += (dy / dist) * force;
          velocities[i3 + 2] += (dz / dist) * force;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      const lPosArr = lineGeo.attributes.position.array;
      const lColArr = lineGeo.attributes.color.array;
      for (let c = 0; c < lineCount; c++) {
        const i = connections[c * 2], j = connections[c * 2 + 1];
        const c6 = c * 6, i3 = i * 3, j3 = j * 3;
        lPosArr[c6] = posArr[i3]; lPosArr[c6 + 1] = posArr[i3 + 1]; lPosArr[c6 + 2] = posArr[i3 + 2];
        lPosArr[c6 + 3] = posArr[j3]; lPosArr[c6 + 4] = posArr[j3 + 1]; lPosArr[c6 + 5] = posArr[j3 + 2];
        const ddx = posArr[j3] - posArr[i3], ddy = posArr[j3 + 1] - posArr[i3 + 1], ddz = posArr[j3 + 2] - posArr[i3 + 2];
        const alpha = Math.max(0, 1 - Math.sqrt(ddx * ddx + ddy * ddy + ddz * ddz) / (CONNECTION_DISTANCE * 1.5));
        lColArr[c6] = lineBaseColor.r * alpha; lColArr[c6 + 1] = lineBaseColor.g * alpha; lColArr[c6 + 2] = lineBaseColor.b * alpha;
        lColArr[c6 + 3] = lineBaseColor.r * alpha; lColArr[c6 + 4] = lineBaseColor.g * alpha; lColArr[c6 + 5] = lineBaseColor.b * alpha;
      }
      lineGeo.attributes.position.needsUpdate = true;
      lineGeo.attributes.color.needsUpdate = true;

      renderer.render(scene, camera);
    };

    if (reducedMotion) renderer.render(scene, camera);
    else animate();

    const handleVisibility = () => {
      if (document.hidden) cancelAnimationFrame(animId);
      else if (!reducedMotion) animate();
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      particleGeo.dispose(); particleMat.dispose();
      lineGeo.dispose(); lineMat.dispose();
      renderer.dispose();
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
