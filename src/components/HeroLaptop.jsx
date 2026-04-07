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
    const lineColor = isDark ? 0x4f7df9 : 0x4f7df9;
    const lineOpacity = isDark ? 0.5 : 0.35;
    const fillColor = isDark ? 0x4f7df9 : 0x4f7df9;
    const fillOpacity = isDark ? 0.03 : 0.02;

    // Wireframe icosahedron
    const geo = new THREE.IcosahedronGeometry(2.4, 1);
    const edges = new THREE.EdgesGeometry(geo);
    const lineMat = new THREE.LineBasicMaterial({
      color: lineColor,
      transparent: true,
      opacity: lineOpacity,
    });
    const wireframe = new THREE.LineSegments(edges, lineMat);

    // Subtle solid fill for depth
    const solidMat = new THREE.MeshBasicMaterial({
      color: fillColor,
      transparent: true,
      opacity: fillOpacity,
      wireframe: false,
      side: THREE.DoubleSide,
    });
    const solid = new THREE.Mesh(geo, solidMat);

    const group = new THREE.Group();
    group.add(wireframe);
    group.add(solid);
    scene.add(group);

    // Mouse tracking
    const mouse = { x: 0 };
    const targetRotY = { v: 0 };
    const currentRotY = { v: 0 };

    const handleMouseMove = (e) => {
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      mouse.x = (cx / window.innerWidth) * 2 - 1;
      targetRotY.v = mouse.x * 0.3;
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

      group.rotation.x = 0.3 + Math.sin(time * 0.5) * 0.1;
      currentRotY.v += (targetRotY.v - currentRotY.v) * 0.02;
      group.rotation.y = time * 0.3 + currentRotY.v;
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
      geo.dispose();
      edges.dispose();
      lineMat.dispose();
      solidMat.dispose();
      renderer.dispose();
    };
  }, [theme]);

  return (
    <div className={className}>
      <canvas ref={canvasRef} className="w-full h-full" style={{ display: "block" }} />
    </div>
  );
}
