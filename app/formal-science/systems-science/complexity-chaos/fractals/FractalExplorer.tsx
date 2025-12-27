"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Snowflake, MousePointer2 } from "lucide-react";

export default function FractalExplorer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [coords, setCoords] = useState({ x: -0.8, y: 0.156 }); // A cool starting Julia set

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = 200;
    const h = 200;
    
    // Optimization: Pre-calculate colors
    const colors = new Uint32Array(256);
    for(let i=0; i<256; i++) {
        const r = i * 4;
        const g = i * 2;
        const b = 255 - i;
        colors[i] = (255 << 24) | (b << 16) | (g << 8) | r;
    }

    const render = () => {
      const imgData = ctx.createImageData(w, h);
      const buf = new Uint32Array(imgData.data.buffer);
      
      // Render Julia Set for C = coords
      // Z = Z^2 + C
      
      const cx = coords.x;
      const cy = coords.y;
      const maxIter = 64;
      const scale = 3 / w;

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
           let zx = (x - w / 2) * scale;
           let zy = (y - h / 2) * scale;
           
           let iter = 0;
           while (zx * zx + zy * zy < 4 && iter < maxIter) {
             const xtemp = zx * zx - zy * zy + cx;
             zy = 2 * zx * zy + cy;
             zx = xtemp;
             iter++;
           }
           
           if (iter === maxIter) {
               buf[y * w + x] = 0xFF000000;
           } else {
               buf[y * w + x] = colors[(iter * 8) % 256];
           }
        }
      }
      
      ctx.putImageData(imgData, 0, 0);
    };

    requestAnimationFrame(render);

  }, [coords]);

  // Mouse handler for the control pad
  const handleMouseMove = (e: React.MouseEvent) => {
      const rect = e.currentTarget.getBoundingClientRect();
      // Map 0..1 to -2..2 roughly
      const x = ((e.clientX - rect.left) / rect.width) * 4 - 2;
      const y = ((e.clientY - rect.top) / rect.height) * 4 - 2;
      setCoords({ x, y });
  };

  return (
    <div className="glass overflow-hidden rounded-xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl">
      <div className="border-b border-white/5 px-5 py-4 flex justify-between items-center">
        <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-300">
          <Snowflake size={14} className="text-blue-400" /> Julia Morph
        </h3>
      </div>

      <div className="p-6 flex flex-col items-center gap-6">
        
        {/* The Viewer */}
        <div className="relative w-48 h-48 rounded-xl border border-white/10 overflow-hidden shadow-2xl">
            <canvas ref={canvasRef} width={200} height={200} className="w-full h-full" />
            <div className="absolute bottom-2 right-2 text-[9px] font-mono text-white bg-black/50 px-1 rounded">
                {coords.x.toFixed(3)} + {coords.y.toFixed(3)}i
            </div>
        </div>

        {/* The Controller */}
        <div 
            className="relative w-full h-24 bg-neutral-950 rounded-lg border border-white/10 cursor-crosshair group"
            onMouseMove={handleMouseMove}
        >
            {/* Grid lines */}
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#444_1px,transparent_1px),linear-gradient(to_bottom,#444_1px,transparent_1px)] bg-[size:20px_20px]" />
            
            {/* Mandelbrot Outline (Static Image or Overlay) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                <div className="w-16 h-12 bg-white rounded-full blur-xl" />
            </div>

            {/* Cursor */}
            <div 
                className="absolute w-4 h-4 border-2 border-white rounded-full -ml-2 -mt-2 pointer-events-none shadow-[0_0_10px_white]"
                style={{ 
                    left: `${((coords.x + 2) / 4) * 100}%`, 
                    top: `${((coords.y + 2) / 4) * 100}%` 
                }}
            />
            
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <span className="text-[10px] text-white bg-black/50 px-2 py-1 rounded">Move to explore C-space</span>
            </div>
        </div>

      </div>
    </div>
  );
}