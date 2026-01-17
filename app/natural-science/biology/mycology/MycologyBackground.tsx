"use client";
import { useEffect, useRef } from "react";

// Define the structure for a growing fungal thread tip
interface HyphaTip {
    x: number;
    y: number;
    angle: number; // Current direction of growth
    speed: number;
    color: string;
    shadowColor: string;
    thickness: number;
    life: number; // To eventually kill off old branches so screen doesn't fill
}

// Define structure for floating spores (from previous version)
interface Spore {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
}

export default function MycologyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Ensure high-DPI rendering for crisp lines
    const dpr = window.devicePixelRatio || 1;
    let w = (canvas.width = window.innerWidth * dpr);
    let h = (canvas.height = window.innerHeight * dpr);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.scale(dpr, dpr);
    w = window.innerWidth;
    h = window.innerHeight;

    let time = 0;
    const spores: Spore[] = [];
    let hyphae: HyphaTip[] = [];

    // --- CONFIG ---
    const maxHyphae = 40; // Limit active growing tips to manage performance
    const growthSpeed = 0.8;
    const branchChance = 0.02; // Chance per frame to split
    const sporeChance = 0.05; // Chance per frame to emit a spore
    const turnSpeed = 0.1; // How sharply they curl

    const colors = {
        purple: { fill: "rgba(168, 85, 247, ", glow: "#a855f7" }, // Neon Purple
        green:  { fill: "rgba(52, 211, 153, ", glow: "#34d399" }  // Neon Emerald
    };

    // Helper to create a new growing tip
    const createHypha = (x: number, y: number, angle: number): HyphaTip => {
        const isPurple = Math.random() > 0.5;
        return {
            x, y, angle,
            speed: growthSpeed + Math.random() * 0.5,
            color: isPurple ? colors.purple.fill : colors.green.fill,
            shadowColor: isPurple ? colors.purple.glow : colors.green.glow,
            thickness: Math.random() * 1.5 + 0.5,
            life: Math.random() * 500 + 200
        };
    };

    // Helper to create a spore
    const createSpore = (x: number, y: number, colorPrefix: string): Spore => ({
        x, y, vx: 0, vy: 0,
        size: Math.random() * 1.5 + 0.5,
        color: colorPrefix
    });

    // Initialize a few starting points randomly off-screen or central
    for(let i =0; i < 5; i++) {
        hyphae.push(createHypha(Math.random() * w, Math.random() * h, Math.random() * Math.PI * 2));
    }

    const render = () => {
      // 1. THE FADE EFFECT
      // Instead of clearing, draw a semi-transparent dark rectangle.
      // This creates the "trails" of the growing mycelium.
      // A lower opacity makes trails last longer.
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(5, 5, 10, 0.08)"; // Very slow fade for long trails
      ctx.fillRect(0, 0, w, h);

      // 2. GROW THE MYCELIUM (Hyphae)
      // Use lighter composition for glowing intersections
      ctx.globalCompositeOperation = "lighter"; 

      // Iterate backwards so we can splice (remove) dead tips easily
      for (let i = hyphae.length - 1; i >= 0; i--) {
          const tip = hyphae[i];
          tip.life--;

          // Kill old or off-screen tips, but always keep a minimum few
          if ((tip.life <= 0 || tip.x < -50 || tip.x > w+50 || tip.y < -50 || tip.y > h+50) && hyphae.length > 5) {
              hyphae.splice(i, 1);
              continue;
          }

          // Move forward
          const oldX = tip.x;
          const oldY = tip.y;
          tip.x += Math.cos(tip.angle) * tip.speed;
          tip.y += Math.sin(tip.angle) * tip.speed;

          // Randomly steer (Brownian-ish motion)
          tip.angle += (Math.random() - 0.5) * turnSpeed;

          // DRAW THE SEGMENT
          ctx.beginPath();
          ctx.moveTo(oldX, oldY);
          ctx.lineTo(tip.x, tip.y);
          ctx.strokeStyle = `${tip.color} 0.8)`;
          ctx.lineWidth = tip.thickness;
          ctx.lineCap = "round";
          // Intense Glow effect
          ctx.shadowBlur = 15;
          ctx.shadowColor = tip.shadowColor;
          ctx.stroke();

          // BRANCHING EVENT
          if (Math.random() < branchChance && hyphae.length < maxHyphae) {
              // Branch off at a slight deviation from current angle
              const deviation = (Math.random() > 0.5 ? 1 : -1) * (Math.PI / 4 + Math.random() * 0.5);
              hyphae.push(createHypha(tip.x, tip.y, tip.angle + deviation));
          }

          // SPORING EVENT (Burst from tip)
          if (Math.random() < sporeChance && spores.length < 300) {
              spores.push(createSpore(tip.x, tip.y, tip.color));
          }
      }

      // reset shadow for spores so they don't look too blurry
      ctx.shadowBlur = 0; 

      // 3. ANIMATE FLOATING SPORES (Flow Field Logic from previous version)
      spores.forEach((p) => {
          const noiseScale = 0.003;
          // Simple flow field based on sine/cosine
          const angle = (Math.cos(p.x * noiseScale + time * 0.001) + Math.sin(p.y * noiseScale + time * 0.001)) * Math.PI * 2;
          
          p.vx += Math.cos(angle) * 0.02;
          p.vy += Math.sin(angle) * 0.02;
          p.vx *= 0.99; // Friction
          p.vy *= 0.99;
          p.x += p.vx;
          p.y += p.vy;

          // Wrap around screen edges
          if(p.x < 0) p.x = w; if(p.x > w) p.x = 0;
          if(p.y < 0) p.y = h; if(p.y > h) p.y = 0;

          const alpha = (Math.sin(time * 0.05 + p.x*0.01) + 1) / 2 * 0.5 + 0.3;
          ctx.fillStyle = `${p.color}${alpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
      });

      time++;
      requestAnimationFrame(render);
    };

    const animId = requestAnimationFrame(render);
    const handleResize = () => {
         // Reset canvas size on resize
         w = canvas.width = window.innerWidth * dpr;
         h = canvas.height = window.innerHeight * dpr;
         canvas.style.width = `${window.innerWidth}px`;
         canvas.style.height = `${window.innerHeight}px`;
         ctx.scale(dpr, dpr);
         // Clear background completely on resize to avoid trailing artifacts
         ctx.fillStyle = "#05050a";
         ctx.fillRect(0,0,w,h);
         w = window.innerWidth;
         h = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Base background color matches the fade color for seamless look
  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none bg-[#05050a]" />;
}