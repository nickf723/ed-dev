"use client";
import { useEffect, useRef } from "react";

export default function EuclideanBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    let zoom = 1;
    
    // The Golden Ratio
    const phi = 1.61803398875;

    const render = () => {
      // Clear with "Blueprint" Deep Slate
      ctx.fillStyle = "#0f172a"; 
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      
      // Zoom logic (Infinite zoom loop)
      zoom *= 1.002;
      if (zoom > phi * phi) zoom /= (phi * phi); // Reset zoom seamlessly

      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(zoom, zoom);
      
      // We draw the spiral inward from a large size
      let size = 1000;
      let x = -500; // Start roughly centered
      let y = -300;
      let angle = 0;

      ctx.lineWidth = 2;
      
      // Draw 20 iterations of the Golden Rectangle
      for (let i = 0; i < 20; i++) {
          // 1. Draw The Square
          ctx.strokeStyle = `rgba(56, 189, 248, ${0.1 + i * 0.02})`; // Fading in Sky-400
          ctx.strokeRect(x, y, size, size);

          // 2. Draw The Spiral Arc
          ctx.beginPath();
          // The arc connects two corners of the square depending on rotation
          // This is a simplified "fake" spiral for visual effect
          // Real implementation requires tracking rotation state quadrant by quadrant
          
          // Let's just draw the rectangles for the "Structure" look
          // and a separate spiral line
          
          // Move to next sub-rectangle
          // The pattern rotates 90 degrees each step
          // and scales down by 1/phi
          
          // Visual Trick: Just draw nested rectangles rotating
          // It looks like the golden spiral construction
      }
      
      // Let's do a proper recursive transformation approach
      const drawGoldenRect = (iter: number) => {
          if (iter > 16) return;
          
          // Draw Square
          ctx.strokeStyle = "rgba(56, 189, 248, 0.1)";
          ctx.lineWidth = 1 / Math.pow(phi, iter * 0.5); // Thin out as we go in
          ctx.strokeRect(0, 0, 100, 100);

          // Draw Arc
          ctx.beginPath();
          ctx.strokeStyle = "#38bdf8";
          ctx.lineWidth = 2 / Math.pow(phi, iter * 0.5);
          ctx.arc(0, 100, 100, -Math.PI/2, 0); // Quarter circle
          ctx.stroke();
          
          // Transform for next iteration
          // Move to the "remaining" rectangle
          ctx.translate(100, 0);       // Move right
          ctx.scale(1/phi, 1/phi);     // Scale down
          ctx.rotate(Math.PI / 2);     // Rotate 90
          ctx.translate(0, -100);      // Re-align
          
          drawGoldenRect(iter + 1);
      };

      // Reset Matrix for the drawing
      ctx.restore();
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(performance.now() * 0.0001); // Slow rotation of entire universe
      ctx.scale(zoom, zoom);
      // Offset start to center the infinite tunnel
      ctx.translate(-150, 50); 
      
      drawGoldenRect(0);

      ctx.restore();
      requestAnimationFrame(render);
    };

    const animId = requestAnimationFrame(render);
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);
    return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-40 pointer-events-none" />;
}