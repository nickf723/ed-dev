"use client";
import { useEffect, useRef } from "react";

export default function GlyphBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    
    // ... (Previous Glyph logic here, simplified for brevity) ...
    const glyphs = "αβγδεζηθικλμνξοπρστυφχψω&¶§©®?¿!¡æœ1234567890";
    const particles: any[] = [];
    for(let i=0; i<50; i++) {
        particles.push({
            x: Math.random()*w, y: Math.random()*h,
            char: glyphs[Math.floor(Math.random()*glyphs.length)],
            size: Math.random()*12+8,
            speed: Math.random()*0.5+0.2,
            opacity: Math.random()*0.3+0.1
        });
    }

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      
      // Gold tint
      ctx.fillStyle = "#fbbf24"; 
      
      particles.forEach(p => {
          p.y -= p.speed;
          if(p.y < -20) p.y = h+20;
          
          ctx.globalAlpha = p.opacity;
          ctx.font = `${p.size}px serif`;
          ctx.fillText(p.char, p.x, p.y);
      });
      
      requestAnimationFrame(animate);
    };
    animate();
    
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
        <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-30 mix-blend-screen" />
        
        {/* HD-2D Lighting: God Rays */}
        {/* We simulate this with a large, rotated gradient moving slowly */}
        <div className="fixed inset-0 pointer-events-none z-0 opacity-40 mix-blend-soft-light animate-pulse" 
             style={{
                 background: "linear-gradient(45deg, transparent 40%, rgba(251, 191, 36, 0.3) 50%, transparent 60%)",
                 backgroundSize: "200% 200%",
                 animation: "pulse 10s infinite ease-in-out" // Simple pulse for now
             }}
        />
        
        {/* Warm Vignette (Sepia tone) */}
        <div className="hd-vignette" style={{ background: "radial-gradient(circle, transparent 40%, rgba(66, 32, 6, 0.6) 100%)" }} />
        <div className="hd-noise opacity-[0.05]" />
    </>
  );
}