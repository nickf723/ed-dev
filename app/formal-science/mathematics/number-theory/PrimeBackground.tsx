"use client";
import { useEffect, useRef } from "react";

export default function PrimeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // Grid Settings
    const gap = 40;
    const cols = Math.ceil(w / gap);
    const rows = Math.ceil(h / gap);
    
    // Prality Test (Simple)
    const isPrime = (num: number) => {
        if (num <= 1) return false;
        if (num <= 3) return true;
        if (num % 2 === 0 || num % 3 === 0) return false;
        for (let i = 5; i * i <= num; i += 6) {
            if (num % i === 0 || num % (i + 2) === 0) return false;
        }
        return true;
    };

    // Numbers
    type NumberCell = {
        val: number;
        x: number;
        y: number;
        prime: boolean;
        opacity: number;
    };
    const numbers: NumberCell[] = [];
    let n = 1;
    for(let y=0; y<rows; y++) {
        for(let x=0; x<cols; x++) {
            numbers.push({
                val: n,
                x: x * gap + gap/2,
                y: y * gap + gap/2,
                prime: isPrime(n),
                opacity: Math.random() // Start with random opacity for twinkling
            });
            n++;
        }
    }

    const animate = () => {
      ctx.fillStyle = "#0f0518"; // Deep Indigo
      ctx.fillRect(0, 0, w, h);

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "10px monospace";

      numbers.forEach(num => {
          // Twinkle effect
          if(num.prime) {
              num.opacity += (Math.random() - 0.5) * 0.1;
              if (num.opacity > 1) num.opacity = 1;
              if (num.opacity < 0.3) num.opacity = 0.3;
          } else {
              num.opacity = 0.05; // Composites are almost invisible
          }

          ctx.fillStyle = num.prime ? `rgba(234, 179, 8, ${num.opacity})` : `rgba(255, 255, 255, ${num.opacity})`; // Gold vs Faint White
          
          // Draw Number
          ctx.fillText(num.val.toString(), num.x, num.y);
          
          // Draw Glow for Primes
          if(num.prime) {
              ctx.shadowBlur = 10 * num.opacity;
              ctx.shadowColor = "#eab308";
              // ctx.beginPath(); ctx.arc(num.x, num.y, 10, 0, Math.PI*2); ctx.fill(); // Optional glow orb
              ctx.shadowBlur = 0;
          }
      });

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);

    return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}