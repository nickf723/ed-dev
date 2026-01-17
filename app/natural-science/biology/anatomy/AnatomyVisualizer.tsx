"use client";
import { useEffect, useRef } from "react";
import { SystemType } from "./anatomy-data";

// (Keep JOINTS and BONES constants exactly as before to save space)
const JOINTS = {
  head: { x: 0.5, y: 0.15 },
  neck: { x: 0.5, y: 0.25 },
  lShoulder: { x: 0.35, y: 0.28 },
  rShoulder: { x: 0.65, y: 0.28 },
  lElbow: { x: 0.3, y: 0.45 },
  rElbow: { x: 0.7, y: 0.45 },
  lHand: { x: 0.25, y: 0.6 },
  rHand: { x: 0.75, y: 0.6 },
  spineTop: { x: 0.5, y: 0.25 },
  spineBot: { x: 0.5, y: 0.5 },
  lHip: { x: 0.4, y: 0.55 },
  rHip: { x: 0.6, y: 0.55 },
  lKnee: { x: 0.4, y: 0.75 },
  rKnee: { x: 0.6, y: 0.75 },
  lFoot: { x: 0.4, y: 0.92 },
  rFoot: { x: 0.6, y: 0.92 },
};

const BONES = [
  ['head', 'neck'],
  ['neck', 'spineTop'],
  ['spineTop', 'spineBot'],
  ['neck', 'lShoulder'], ['neck', 'rShoulder'],
  ['lShoulder', 'lElbow'], ['lElbow', 'lHand'],
  ['rShoulder', 'rElbow'], ['rElbow', 'rHand'],
  ['spineBot', 'lHip'], ['spineBot', 'rHip'],
  ['lHip', 'lKnee'], ['lKnee', 'lFoot'],
  ['rHip', 'rKnee'], ['rKnee', 'rFoot'],
];

interface Props {
  activeSystem: SystemType | null;
  color: string;
}

const ORGANS = {
  NERVOUS:     [{ x: 0.5, y: 0.15, label: 'BRAIN', size: 15 }], // Head
  CIRCULATORY: [{ x: 0.53, y: 0.28, label: 'HEART', size: 12 }], // Chest (slightly left)
  RESPIRATORY: [{ x: 0.45, y: 0.3, label: 'R. LUNG', size: 10 }, { x: 0.55, y: 0.3, label: 'L. LUNG', size: 10 }],
  DIGESTIVE:   [{ x: 0.5, y: 0.45, label: 'STOMACH', size: 14 }, { x: 0.5, y: 0.55, label: 'INTESTINES', size: 12 }],
  SKELETAL:    [{ x: 0.5, y: 0.15, label: 'SKULL', size: 14 }, { x: 0.5, y: 0.4, label: 'RIBCAGE', size: 16 }],
  MUSCULAR:    [{ x: 0.65, y: 0.28, label: 'DELTOID', size: 8 }, { x: 0.4, y: 0.75, label: 'QUADRICEP', size: 8 }]
};

export default function AnatomyVisualizer({ activeSystem, color }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Use offsetWidth/Height for responsive sizing
    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);
    let time = 0;

    const getPos = (key: keyof typeof JOINTS) => ({
      x: JOINTS[key as keyof typeof JOINTS].x * w,
      y: JOINTS[key as keyof typeof JOINTS].y * h
    });

    const render = () => {
      // Clear with Trail
      ctx.fillStyle = "rgba(5, 10, 15, 0.25)"; 
      ctx.fillRect(0, 0, w, h);

      // 1. SCANLINE EFFECT (The MRI Bar)
      const scanY = (Math.sin(time * 0.02) * 0.5 + 0.5) * h;
      
      // Draw scanline
      const grad = ctx.createLinearGradient(0, scanY - 20, 0, scanY + 20);
      grad.addColorStop(0, "rgba(0,0,0,0)");
      grad.addColorStop(0.5, activeSystem ? color : "rgba(14, 165, 233, 0.5)"); // Blue if idle, System color if active
      grad.addColorStop(1, "rgba(0,0,0,0)");
      
      ctx.fillStyle = grad;
      ctx.fillRect(0, scanY - 20, w, 40);
      
      // Draw faint grid line at scan pos
      ctx.strokeStyle = activeSystem ? color : "rgba(14, 165, 233, 0.3)";
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(0, scanY); ctx.lineTo(w, scanY); ctx.stroke();

      // 2. DRAW BASE SILHOUETTE (Ghost)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
      ctx.lineWidth = 12;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      BONES.forEach(([start, end]) => {
          const s = getPos(start as any);
          const e = getPos(end as any);
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(e.x, e.y);
      });
      ctx.stroke();

      if (activeSystem && ORGANS[activeSystem as keyof typeof ORGANS]) {
          const targets = ORGANS[activeSystem as keyof typeof ORGANS];
          
          targets.forEach(organ => {
              const ox = organ.x * w;
              const oy = organ.y * h;
              
              // 1. Pulsing Ring
              const pulse = (Math.sin(time * 0.1) + 1) * 0.5; // 0 to 1
              ctx.strokeStyle = color;
              ctx.lineWidth = 1;
              ctx.globalAlpha = 1 - pulse; // Fade out as it expands
              ctx.beginPath();
              ctx.arc(ox, oy, organ.size + (pulse * 20), 0, Math.PI * 2);
              ctx.stroke();
              
              // 2. Solid Core
              ctx.globalAlpha = 1;
              ctx.fillStyle = color;
              ctx.shadowBlur = 20;
              ctx.shadowColor = color;
              ctx.beginPath();
              ctx.arc(ox, oy, 3, 0, Math.PI * 2);
              ctx.fill();
              
              // 3. Label Tag (High-Tech Line)
              ctx.strokeStyle = "rgba(255,255,255,0.2)";
              ctx.beginPath();
              ctx.moveTo(ox + 10, oy - 10);
              ctx.lineTo(ox + 30, oy - 30);
              ctx.lineTo(ox + 80, oy - 30);
              ctx.stroke();
              
              // Text
              ctx.fillStyle = "rgba(255,255,255,0.7)";
              ctx.font = "10px monospace";
              ctx.fillText(organ.label, ox + 35, oy - 35);
          });
      }
      // 3. DRAW ACTIVE SYSTEM
      if (activeSystem) {
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = color;

        // --- SKELETAL ---
        if (activeSystem === 'SKELETAL') {
             ctx.lineWidth = 6;
             ctx.beginPath();
             BONES.forEach(([start, end]) => {
                const s = getPos(start as any);
                const e = getPos(end as any);
                ctx.moveTo(s.x, s.y);
                ctx.lineTo(e.x, e.y);
             });
             ctx.stroke();
             // Joints
             Object.values(JOINTS).forEach(j => {
                 ctx.beginPath();
                 ctx.arc(j.x * w, j.y * h, 3, 0, Math.PI*2);
                 ctx.fill();
             });
        }

        // --- NERVOUS ---
        else if (activeSystem === 'NERVOUS') {
            ctx.lineWidth = 1.5;
            BONES.forEach(([start, end]) => {
                const s = getPos(start as any);
                const e = getPos(end as any);
                // Jagged line
                ctx.beginPath();
                ctx.moveTo(s.x, s.y);
                const dist = Math.hypot(e.x - s.x, e.y - s.y);
                const steps = dist / 5;
                for(let i=1; i<=steps; i++) {
                    const t = i/steps;
                    const tx = s.x + (e.x - s.x) * t;
                    const ty = s.y + (e.y - s.y) * t;
                    ctx.lineTo(tx + (Math.random()-0.5)*8, ty + (Math.random()-0.5)*8);
                }
                ctx.stroke();
            });
            // Brain Spark
            const head = getPos('head');
            if(Math.random() > 0.8) {
                ctx.fillStyle = "#fff";
                ctx.beginPath(); ctx.arc(head.x, head.y, Math.random()*15, 0, Math.PI*2); ctx.fill();
            }
        }

        // --- CIRCULATORY ---
        else if (activeSystem === 'CIRCULATORY') {
            BONES.forEach(([start, end]) => {
                const s = getPos(start as any);
                const e = getPos(end as any);
                const particles = 4; 
                for(let i=0; i<particles; i++) {
                    const t = (time * 0.015 + (i/particles)) % 1;
                    const px = s.x + (e.x - s.x) * t;
                    const py = s.y + (e.y - s.y) * t;
                    ctx.beginPath(); ctx.arc(px, py, 4 * Math.sin(t*Math.PI), 0, Math.PI * 2); ctx.fill();
                }
            });
            // Heart Beat
            const chest = getPos('spineTop');
            const beat = (Math.sin(time * 0.2) + 1) * 8;
            ctx.fillStyle = color;
            ctx.beginPath(); ctx.arc(chest.x - 10, chest.y + 15, 10 + beat, 0, Math.PI * 2); ctx.fill();
        }

        // --- OTHERS (Generic Glow) ---
        else {
             ctx.lineWidth = 4;
             ctx.globalAlpha = 0.6;
             BONES.forEach(([start, end]) => {
                const s = getPos(start as any);
                const e = getPos(end as any);
                ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(e.x, e.y); ctx.stroke();
             });
             ctx.globalAlpha = 1;
        }
      }

      ctx.shadowBlur = 0;
      time++;
      requestAnimationFrame(render);
    };

    const animId = requestAnimationFrame(render);
    
    // Observer for resize to handle container flex sizing
    const resizeObserver = new ResizeObserver(() => {
        if(canvas) {
            w = canvas.width = canvas.offsetWidth;
            h = canvas.height = canvas.offsetHeight;
        }
    });
    resizeObserver.observe(canvas);

    return () => {
        resizeObserver.disconnect();
        cancelAnimationFrame(animId);
    };
  }, [activeSystem, color]);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
}