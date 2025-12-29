"use client";
import { useEffect, useRef } from "react";

export default function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let mouseX = w / 2;
    let mouseY = h / 2;

    // Stars
    const stars: {x: number, y: number, size: number, alpha: number, speed: number}[] = [];
    for(let i=0; i<3000; i++) { // Increased star count
        stars.push({
            x: Math.random() * w,
            y: Math.random() * h,
            size: Math.random() * 1.5,
            alpha: Math.random(),
            speed: Math.random() * 0.5 + 0.1
        });
    }

    // Shooting Stars
    let shootingStar: { x: number, y: number, vx: number, vy: number, life: number } | null = null;

    // Nebula Clouds
    const clouds = [
        { x: w*0.2, y: h*0.2, r: 600, color: "rgba(77, 29, 149, 0.6)", vx: 0.2, vy: 0.1 },
        { x: w*0.7, y: h*0.3, r: 800, color: "rgba(201, 17, 186, 0.62)", vx: -0.15, vy: 0.1 },
        { x: w*0.4, y: h*0.7, r: 500, color: "rgba(77, 29, 149, 0.6)", vx: 0.1, vy: -0.1 },
        { x: w*0.6, y: h*0.6, r: 600, color: "rgba(134, 17, 201, 0.41)", vx: -0.1, vy: -0.15 },
        { x: w*0.8, y: h*0.8, r: 700, color: "rgba(6, 181, 212, 0.49)", vx: -0.1, vy: -0.2 },
    ];

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      
      // Parallax Offset
      const offsetX = (mouseX - w/2) * 0.02;
      const offsetY = (mouseY - h/2) * 0.02;

      // 1. Draw Stars
      ctx.fillStyle = "white";
      stars.forEach(s => {
          ctx.globalAlpha = s.alpha * (0.5 + Math.random() * 0.5); // Twinkle
          ctx.beginPath();
          // Apply slight parallax opposite to mouse movement for depth
          const px = s.x + offsetX * s.speed;
          const py = s.y + offsetY * s.speed;
          
          // Wrap around logic with parallax in mind
          const wrappedX = (px % w + w) % w;
          const wrappedY = (py % h + h) % h;

          ctx.arc(wrappedX, wrappedY, s.size, 0, Math.PI*2);
          ctx.fill();
      });

      // 2. Shooting Star Logic
      if (!shootingStar && Math.random() < 0.05) { // 5% chance per frame
          shootingStar = {
              x: Math.random() * w,
              y: Math.random() * h * 0.5, // Start in top half
              vx: (Math.random() - 0.5) * 10 + 5, // Fast horizontal
              vy: Math.random() * 5 + 2, // Downward
              life: 1.0
          };
      }
      
      if (shootingStar) {
          ctx.globalAlpha = shootingStar.life;
          ctx.strokeStyle = "white";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(shootingStar.x, shootingStar.y);
          ctx.lineTo(shootingStar.x - shootingStar.vx * 3, shootingStar.y - shootingStar.vy * 3); // Trail
          ctx.stroke();
          
          shootingStar.x += shootingStar.vx;
          shootingStar.y += shootingStar.vy;
          shootingStar.life -= 0.02;
          
          if (shootingStar.life <= 0) shootingStar = null;
      }

      // 3. Draw Nebula (Glow)
      ctx.globalCompositeOperation = "screen";
      clouds.forEach(c => {
          c.x += c.vx; 
          c.y += c.vy;
          if(c.x < -200 || c.x > w+200) c.vx *= -1;
          if(c.y < -200 || c.y > h+200) c.vy *= -1;

          const g = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.r);
          g.addColorStop(0, c.color);
          g.addColorStop(1, "transparent");
          
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(c.x, c.y, c.r, 0, Math.PI*2);
          ctx.fill();
      });

      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
        requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    const handleMouseMove = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY; };
    
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("mousemove", handleMouseMove);
        cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
        <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
        <div className="fixed inset-0 pointer-events-none z-0 bg-radial-vignette opacity-70" />
    </>
  );
}