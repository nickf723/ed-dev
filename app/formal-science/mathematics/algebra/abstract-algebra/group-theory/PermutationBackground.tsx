"use client";
import { useEffect, useRef } from "react";

export default function PermutationBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let time = 0;

    // --- CONFIGURATION ---
    const RINGS = 5;
    const PARTICLES_PER_RING = 12;
    const COLORS = ["#a78bfa", "#c084fc", "#e879f9", "#f472b6", "#fb7185"]; // Violet to Rose

    // State
    const rings = Array.from({ length: RINGS }, (_, i) => ({
        radius: (i + 1) * 120,
        speed: (i % 2 === 0 ? 1 : -1) * (0.002 + (RINGS - i) * 0.001),
        particles: [] as any[]
    }));

    // Initialize Particles
    rings.forEach((ring, rIndex) => {
        for (let i = 0; i < PARTICLES_PER_RING; i++) {
            const angle = (Math.PI * 2 * i) / PARTICLES_PER_RING;
            ring.particles.push({
                angle,
                targetR: rIndex, // The ring it belongs to
                currentR: rIndex * 120 + 120, // Current radius (for animation)
                color: COLORS[rIndex % COLORS.length],
                swapProgress: 0,
                swapping: false
            });
        }
    });

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      
      // 1. Deep Void Background
      const grad = ctx.createRadialGradient(w/2, h/2, 0, w/2, h/2, w);
      grad.addColorStop(0, "#050208"); // Almost Black
      grad.addColorStop(1, "#000000");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      // Draw Rings
      rings.forEach((ring, rIndex) => {
          ctx.beginPath();
          ctx.arc(cx, cy, (rIndex + 1) * 120, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(167, 139, 250, 0.05)`; // Very faint violet
          ctx.lineWidth = 1;
          ctx.stroke();

          // Move Ring
          const baseRotation = time * ring.speed;

          ring.particles.forEach((p) => {
              // Update Swap Logic
              if (p.swapping) {
                  p.swapProgress += 0.05;
                  if (p.swapProgress >= 1) {
                      p.swapProgress = 0;
                      p.swapping = false;
                      p.currentR = (p.targetR + 1) * 120;
                  } else {
                      // Lerp radius
                      const startR = p.currentR; // Simplification for visual smoothness
                      const endR = (p.targetR + 1) * 120;
                      // Simple sine easing
                      p.currentR = p.currentR + (endR - p.currentR) * 0.1;
                  }
              }

              // Calculate Position
              const x = cx + Math.cos(p.angle + baseRotation) * p.currentR;
              const y = cy + Math.sin(p.angle + baseRotation) * p.currentR;

              // Draw Particle
              ctx.beginPath();
              ctx.arc(x, y, 4, 0, Math.PI * 2);
              ctx.fillStyle = p.color;
              ctx.shadowColor = p.color;
              ctx.shadowBlur = 10;
              ctx.fill();
              ctx.shadowBlur = 0;

              // Connect to center visually (faint spokes)
              /*
              ctx.beginPath();
              ctx.moveTo(cx, cy);
              ctx.lineTo(x, y);
              ctx.strokeStyle = `rgba(255,255,255, 0.02)`;
              ctx.stroke();
              */
          });
      });

      // Trigger Random Swaps (Permutations)
      if (Math.random() < 0.02) {
          const r1 = Math.floor(Math.random() * (RINGS - 1));
          const r2 = r1 + 1;
          const pIndex = Math.floor(Math.random() * PARTICLES_PER_RING);
          
          // Swap target rings for two particles
          const p1 = rings[r1].particles[pIndex];
          const p2 = rings[r2].particles[pIndex]; // Same angle, different ring

          if (!p1.swapping && !p2.swapping) {
              const tempTarget = p1.targetR;
              p1.targetR = p2.targetR;
              p2.targetR = tempTarget;
              p1.swapping = true;
              p2.swapping = true;
              
              // Visual flair: draw a line between them briefly? 
              // (Handled by the motion itself)
          }
      }

      time += 1;
      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);
    return () => { window.removeEventListener("resize", handleResize); cancelAnimationFrame(animId); };
  }, []);

  return (
    <>
        <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
        <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
    </>
  );
}