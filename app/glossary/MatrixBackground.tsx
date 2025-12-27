"use client";
import { useEffect, useRef } from "react";

export default function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    
    const cols = Math.floor(w / 20);
    const ypos = Array(cols).fill(0);
    
    // Matrix characters (Katakana + Latin + Digits)
    const chars = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const animate = () => {
      // Draw semi-transparent black to create trail effect
      ctx.fillStyle = "rgba(10, 10, 10, 0.05)";
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = "#06b6d4"; // Cyan-500
      ctx.font = "15px monospace";

      ypos.forEach((y, i) => {
        // Random character
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * 20;
        
        // Draw character
        ctx.fillText(text, x, y);

        // Reset to top randomly to vary column lengths
        if (y > h && Math.random() > 0.975) {
          ypos[i] = 0;
        } else {
          ypos[i] = y + 20;
        }
      });
      
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    const handleResize = () => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-20"
    />
  );
}