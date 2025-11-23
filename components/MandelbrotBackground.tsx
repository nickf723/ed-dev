"use client";
import { useEffect, useRef } from "react";

export default function MandelbrotBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Rendering at lower res for performance + style
    let w = (canvas.width = window.innerWidth / 4);
    let h = (canvas.height = window.innerHeight / 4);
    
    // Viewport
    let zoom = 250;
    let panX = 2; // Center horizontally
    let panY = 1.5; // Center vertically
    
    // Animation
    let time = 0;
    
    // Color Palette (Psychedelic / Mathematical)
    // Mapping iteration count to color
    const colors = new Uint32Array(1000);
    for (let i = 0; i < 1000; i++) {
        // Sine-wave based coloring
        const r = Math.floor(128 + 127 * Math.sin(i * 0.05));
        const g = Math.floor(128 + 127 * Math.sin(i * 0.05 + 2));
        const b = Math.floor(128 + 127 * Math.sin(i * 0.05 + 4));
        // Store as ABGR (little-endian)
        colors[i] = (255 << 24) | (b << 16) | (g << 8) | r;
    }

    const render = () => {
      const imgData = ctx.createImageData(w, h);
      const buf = new Uint32Array(imgData.data.buffer);
      
      // Slowly shift the view
      // We orbit a point of interest (e.g., Seahorse Valley)
      const targetX = -0.743643887037158704752191506114774;
      const targetY = 0.131825904205311970493132056385139;
      
      // Zoom oscillation
      const z = 150 + Math.sin(time * 0.005) * 10000; // Deep zoom in/out
      
      // Let's keep it simple: a slow drift across the main cardioid for the background
      // x range: -2.5 to 1
      // y range: -1 to 1
      
      // Dynamic Pan
      const scale = 1 / (150 + time * 10); 
      const cx = -0.745;
      const cy = 0.1;

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          // Map pixel to complex plane
          let zx = 0;
          let zy = 0;
          
          // c = map(x, y)
          const cx0 = (x - w / 2) * scale + cx;
          const cy0 = (y - h / 2) * scale + cy;
          
          let iter = 0;
          const maxIter = 100; // Lower for background perf
          
          while (zx * zx + zy * zy < 4 && iter < maxIter) {
            const xtemp = zx * zx - zy * zy + cx0;
            zy = 2 * zx * zy + cy0;
            zx = xtemp;
            iter++;
          }
          
          // Color mapping
          if (iter === maxIter) {
              buf[y * w + x] = 0xFF000000; // Black inside
          } else {
              // Offset color by time to make it cycle
              const colorIdx = (iter + Math.floor(time)) % 1000;
              buf[y * w + x] = colors[colorIdx];
          }
        }
      }
      
      ctx.putImageData(imgData, 0, 0);
      time += 0.5;
      requestAnimationFrame(render);
    };

    const animId = requestAnimationFrame(render);
    
    const handleResize = () => {
      w = canvas.width = window.innerWidth / 4;
      h = canvas.height = window.innerHeight / 4;
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
        <canvas 
            ref={canvasRef} 
            className="fixed inset-0 pointer-events-none z-0 opacity-30 mix-blend-screen"
            style={{ transform: "scale(4)", transformOrigin: "top left" }} // Scale up low-res
        />
        <div className="hd-vignette" />
    </>
  );
}