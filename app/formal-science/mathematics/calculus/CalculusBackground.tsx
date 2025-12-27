import { useEffect, useRef } from "react";

export default function CalculusBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let time = 0;

    const animate = () => {
      ctx.fillStyle = "rgba(5, 5, 5, 0.1)"; 
      ctx.fillRect(0, 0, w, h);

      ctx.lineWidth = 2;
      const lines = 8;
      
      for (let i = 0; i < lines; i++) {
          ctx.beginPath();
          const yBase = h / 2 + (i - lines/2) * 60;
          const hue = 340 + i * 5; 
          ctx.strokeStyle = `hsla(${hue}, 80%, 60%, 0.15)`;

          for (let x = 0; x <= w; x += 10) {
              const y = yBase + 
                        Math.sin(x * 0.003 + time * 0.01 + i * 0.5) * 50 + 
                        Math.cos(x * 0.005 - time * 0.005) * 30;
              if (x === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
          }
          ctx.stroke();
      }
      time++;
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
        <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_90%)]" />
    </>
  );
}