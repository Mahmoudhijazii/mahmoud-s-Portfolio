import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "../context/ThemeContext";

export default function HeroLaptop({ className = "" }) {
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const container = canvas.parentElement;
    let width = container.clientWidth;
    let height = container.clientHeight;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.z = 7;

    const isDark = theme === "dark";

    // Color config per theme
    const lineColor = isDark ? 0x5b7dfa : 0x3d5cf5;
    const lineOpacity = isDark ? 0.55 : 0.7;
    const fillColor = isDark ? 0x5b7dfa : 0x3d5cf5;
    const fillOpacity = isDark ? 0.04 : 0.05;
    const glowColor = isDark ? 0x5b7dfa : 0x7b4ff5;

    // === MAIN WIREFRAME ===
    const geo = new THREE.IcosahedronGeometry(2.4, 1);
    const edges = new THREE.EdgesGeometry(geo);
    const lineMat = new THREE.LineBasicMaterial({
      color: lineColor,
      transparent: true,
      opacity: lineOpacity,
    });
    const wireframe = new THREE.LineSegments(edges, lineMat);

    // Subtle solid fill
    const solidMat = new THREE.MeshBasicMaterial({
      color: fillColor,
      transparent: true,
      opacity: fillOpacity,
      side: THREE.DoubleSide,
    });
    const solid = new THREE.Mesh(geo, solidMat);

    // === OUTER GLOW (larger, subtle) ===
    const glowGeo = new THREE.IcosahedronGeometry(2.8, 0);
    const glowEdges = new THREE.EdgesGeometry(glowGeo);
    const glowMat = new THREE.LineBasicMaterial({
      color: glowColor,
      transparent: true,
      opacity: isDark ? 0.15 : 0.22,
    });
    const outerGlow = new THREE.LineSegments(glowEdges, glowMat);

    // === INNER CORE (smaller, tighter) ===
    const coreGeo = new THREE.IcosahedronGeometry(1.4, 0);
    const coreEdges = new THREE.EdgesGeometry(coreGeo);
    const coreMat = new THREE.LineBasicMaterial({
      color: isDark ? 0x8b63f5 : 0x7b4ff5,
      transparent: true,
      opacity: isDark ? 0.35 : 0.4,
    });
    const innerCore = new THREE.LineSegments(coreEdges, coreMat);

    const group = new THREE.Group();
    group.add(outerGlow);
    group.add(wireframe);
    group.add(solid);
    group.add(innerCore);
    scene.add(group);

    // Mouse tracking
    const mouse = { x: 0, y: 0 };
    const targetRot = { x: 0, y: 0 };
    const currentRot = { x: 0, y: 0 };

    const handleMouseMove = (e) => {
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;
      mouse.x = (cx / window.innerWidth) * 2 - 1;
      mouse.y = -(cy / window.innerHeight) * 2 + 1;
      targetRot.y = mouse.x * 0.3;
      targetRot.x = mouse.y * 0.2;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleMouseMove, { passive: true });

    const handleResize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    let animId;
    let time = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      time += 0.008;

      // Main wireframe rotates
      currentRot.x += (targetRot.x - currentRot.x) * 0.02;
      currentRot.y += (targetRot.y - currentRot.y) * 0.02;
      wireframe.rotation.x = time * 0.2 + currentRot.x;
      wireframe.rotation.y = time * 0.3 + currentRot.y;
      solid.rotation.x = wireframe.rotation.x;
      solid.rotation.y = wireframe.rotation.y;

      // Outer glow rotates opposite, slower
      outerGlow.rotation.x = -time * 0.1;
      outerGlow.rotation.y = -time * 0.15;

      // Inner core rotates faster, different axis
      innerCore.rotation.x = time * 0.4;
      innerCore.rotation.z = time * 0.3;

      // Whole group floats
      group.position.y = Math.sin(time * 0.7) * 0.08;

      renderer.render(scene, camera);
    };

    if (reducedMotion) {
      renderer.render(scene, camera);
    } else {
      animate();
    }

    const handleVisibility = () => {
      if (document.hidden) cancelAnimationFrame(animId);
      else if (!reducedMotion) animate();
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      [geo, edges, glowGeo, glowEdges, coreGeo, coreEdges].forEach((g) => g.dispose());
      [lineMat, solidMat, glowMat, coreMat].forEach((m) => m.dispose());
      renderer.dispose();
    };
  }, [theme]);

  return (
    <div className={`relative ${className}`}>
      {/* Aura gradient backdrop for light mode */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[70%] h-[70%] rounded-full bg-gradient-to-br from-accent/10 via-accent-secondary/8 to-transparent blur-3xl" />
      </div>
      <canvas ref={canvasRef} className="relative w-full h-full" style={{ display: "block" }} />
    </div>
  );
}
