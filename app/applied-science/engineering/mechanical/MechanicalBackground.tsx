"use client";
import { useEffect, useRef } from "react";

export default function MechanicalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let scrollY = 0;

    // --- COMPONENT CLASSES ---

    class Gear {
        x: number; y: number; radius: number; teeth: number; rotation: number; speedRatio: number; color: string;
        constructor(x: number, y: number, radius: number, teeth: number, speedRatio: number, color = "#b45309") {
            this.x = x; this.y = y; this.radius = radius; this.teeth = teeth;
            this.rotation = 0; this.speedRatio = speedRatio; this.color = color;
        }
        draw(currentScroll: number) {
            this.rotation = currentScroll * this.speedRatio * 0.002;
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.fillStyle = this.color;
            ctx.beginPath();
            // Gear body
            ctx.arc(0, 0, this.radius - 5, 0, Math.PI * 2);
            ctx.fill();
            // Teeth
            for (let i = 0; i < this.teeth; i++) {
                const angle = (i / this.teeth) * Math.PI * 2;
                ctx.save();
                ctx.rotate(angle);
                ctx.fillRect(-4, -this.radius, 8, 10);
                ctx.restore();
            }
            // Axle
            ctx.fillStyle = "#78350f";
            ctx.beginPath(); ctx.arc(0, 0, 10, 0, Math.PI * 2); ctx.fill();
            ctx.restore();
        }
    }

    class Ball {
        x: number; y: number; r: number; stage: number = 0;
        constructor() {
            this.r = 12; this.reset();
        }
        reset() {
            this.x = w * 0.1; this.y = -20; this.stage = 0;
        }
        update(currentScroll: number, gears: Gear[]) {
            // The ball's progress is tied to scroll
            const progress = currentScroll * 0.5;

            // STAGE 0: Initial Drop & Ramp
            if (this.stage === 0) {
                this.x = w * 0.1 + progress * 0.5;
                this.y = Math.min(h * 0.2, -20 + progress * 0.8);
                if (this.y >= h * 0.2 && this.x > w * 0.25) this.stage = 1;
            }
            // STAGE 1: Riding the Gears
            else if (this.stage === 1) {
                const mainGear = gears[0];
                // Map progress to an angle on the gear
                const angle = Math.PI * 1.2 + (progress - 250) * 0.005; 
                this.x = mainGear.x + Math.cos(angle) * (mainGear.radius + this.r);
                this.y = mainGear.y + Math.sin(angle) * (mainGear.radius + this.r);
                if (angle > Math.PI * 2.3) this.stage = 2;
            }
            // STAGE 2: Conveyor Belt
            else if (this.stage === 2) {
                const startX = gears[0].x + gears[0].radius;
                const beltY = gears[0].y - 20;
                this.x = startX + (progress - 700) * 0.8;
                this.y = beltY;
                 if (this.x > w * 0.8) this.stage = 3;
            }
             // STAGE 3: Final Drop & Reset
            else if (this.stage === 3) {
                 this.x += 2;
                 this.y += (progress - 1100) * 0.5;
                 if (this.y > h + 50) this.reset();
            }

        }
        draw() {
            ctx.fillStyle = "#eab308"; // Gold ball
            ctx.shadowBlur = 10; ctx.shadowColor = "#ca8a04";
            ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2); ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    // --- SETUP ---
    const gears: Gear[] = [
        new Gear(w * 0.4, h * 0.4, 80, 24, 1, "#b45309"),
        new Gear(w * 0.4 - 120, h * 0.4 + 60, 50, 16, -1.6, "#92400e"),
        new Gear(w * 0.4 + 110, h * 0.4 - 40, 40, 12, -2, "#92400e"),
    ];
    const ball = new Ball();

    // --- ANIMATION LOOP ---
    const animate = () => {
      ctx.fillStyle = "#1c1917"; // Dark Stone background
      ctx.fillRect(0, 0, w, h);

      // Draw Background Elements (Pipes, Structures)
      ctx.strokeStyle = "#44403c"; ctx.lineWidth = 10;
      ctx.beginPath(); ctx.moveTo(w*0.1, 0); ctx.lineTo(w*0.1, h*0.2); ctx.lineTo(w*0.3, h*0.3); ctx.stroke(); // Ramp
      ctx.beginPath(); ctx.moveTo(w*0.5, h*0.4); ctx.lineTo(w*0.8, h*0.4); ctx.stroke(); // Conveyor support

      // Draw & Update Gears
      gears.forEach(g => g.draw(scrollY));

      // Draw & Update Ball
      ball.update(scrollY, gears);
      ball.draw();

      // Draw Foreground Steam/Smoke (Parallax)
      ctx.fillStyle = "rgba(255,255,255,0.02)";
      for(let i=0; i<5; i++) {
          const x = (w/5 * i + scrollY * 0.1) % w;
          const y = h - (scrollY * 0.05 + i*50) % h;
          ctx.beginPath(); ctx.arc(x, y, 100 + i*20, 0, Math.PI*2); ctx.fill();
      }

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    
    // --- EVENT LISTENERS ---
    const handleScroll = () => { scrollY = window.scrollY; };
    const handleResize = () => { 
        w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight;
        // Reposition gears on resize
        gears[0].x = w * 0.4; gears[0].y = h * 0.4;
        gears[1].x = w * 0.4 - 120; gears[1].y = h * 0.4 + 60;
        gears[2].x = w * 0.4 + 110; gears[2].y = h * 0.4 - 40;
        ball.reset();
    };
    
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}