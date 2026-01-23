"use client";
import { useEffect, useRef } from "react";

const STREAMS = [
  "DEMOCRACY  JAZZ  HOLLYWOOD  BASEBALL  APPLES  FREEDOM  INTERNET",
  "SILICON_VALLEY  ROUTE_66  BROADWAY  NASHVILLE  LAS_VEGAS  NASA",
  "MEMES  BLOCKBUSTER  VINYL  STREAMING  NETWORK  DATA  VIRAL",
  "GOTHIC  NOIR  WESTERN  SCI-FI  COMICS  SUPERHEROES  MYTHOS"
];

export default function CultureStream() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let time = 0;

    const render = () => {
      // Clear with dark noise color
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, w, h);

      ctx.font = "bold 80px sans-serif";
      ctx.textBaseline = "middle";
      
      STREAMS.forEach((text, i) => {
          const y = 150 + (i * 150);
          // Alternating directions
          const dir = i % 2 === 0 ? 1 : -1;
          const speed = (time * 0.5 * dir) % w;
          
          // Draw multiple times to loop
          const renderText = text.repeat(10); 
          const x = -1000 + speed;

          // Stroke text effect (Outline)
          ctx.lineWidth = 1;
          ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
          ctx.strokeText(renderText, x, y);
      });

      // Scanlines
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      for(let i=0; i<h; i+=4) {
          ctx.fillRect(0, i, w, 2);
      }

      time++;
      requestAnimationFrame(render);
    };

    const animId = requestAnimationFrame(render);
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);
    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none bg-[#0a0a0a]" />;
}