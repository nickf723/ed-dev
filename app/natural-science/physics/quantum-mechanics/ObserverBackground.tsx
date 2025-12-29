"use client";
import { useEffect, useRef } from "react";

export default function ObserverBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let mouse = { x: -1000, y: -1000 }; // Start off-screen
    let time = 0;

    // Grid of Quantum States
    const spacing = 60;
    const rows = Math.ceil(h / spacing);
    const cols = Math.ceil(w / spacing);
    
    const animate = () => {
      // Deep Quantum Void
      ctx.fillStyle = "#020205"; // Nearly black
      ctx.fillRect(0, 0, w, h);
      
      time += 0.05;

      for(let i=0; i<cols; i++) {
          for(let j=0; j<rows; j++) {
              const cx = i * spacing + spacing/2;
              const cy = j * spacing + spacing/2;
              
              // Distance to Observer (Mouse)
              const dx = mouse.x - cx;
              const dy = mouse.y - cy;
              const dist = Math.sqrt(dx*dx + dy*dy);
              
              // Quantum State: 0 = Particle (Collapsed), 1 = Wave (Delocalized)
              // The closer the mouse, the more "collapsed" it becomes.
              const observationRadius = 200;
              const probability = Math.min(1, Math.max(0, (dist - 50) / observationRadius));

              ctx.strokeStyle = `rgba(232, 121, 249, ${0.3 + (1-probability)*0.7})`; // Fuchsia glow
              ctx.lineWidth = 2;
              ctx.beginPath();

              if (probability < 0.1) {
                  // COLLAPSED STATE: Particle
                  // Draw a solid point
                  ctx.fillStyle = "#e879f9";
                  ctx.arc(cx, cy, 4, 0, Math.PI*2);
                  ctx.fill();
                  
                  // Uncertainty ring (small)
                  ctx.strokeStyle = "rgba(232, 121, 249, 0.5)";
                  ctx.beginPath();
                  ctx.arc(cx, cy, 8 + Math.sin(time*2)*2, 0, Math.PI*2);
                  ctx.stroke();

              } else {
                  // WAVE STATE: Interference Pattern
                  // Draw a sine wave segment that rotates
                  const angle = (i + j) * 0.5 + time * 0.5;
                  const size = 20 * probability; // Waves get bigger/fuzzier further away
                  
                  // Wavy line
                  for(let k=-size; k<=size; k+=2) {
                      // Parametric wave
                      const px = cx + k * Math.cos(angle) - Math.sin(k*0.5 + time)*5 * Math.sin(angle);
                      const py = cy + k * Math.sin(angle) + Math.sin(k*0.5 + time)*5 * Math.cos(angle);
                      
                      if(k===-size) ctx.moveTo(px, py);
                      else ctx.lineTo(px, py);
                  }
                  ctx.stroke();
              }
          }
      }

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    const handleMouseMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}