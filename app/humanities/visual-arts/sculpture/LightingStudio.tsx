"use client";
import React, { useRef, useEffect, useState } from 'react';
import { Lightbulb, Sun, Moon } from 'lucide-react';

export default function LightingStudio() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [lightPos, setLightPos] = useState({ x: 1, y: -1, z: 1 }); // Normalized vector

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const cx = width / 2;
    const cy = height / 2;
    const radius = 120;

    const render = () => {
      // Fill Background
      ctx.fillStyle = '#1c1917'; // Stone-900
      ctx.fillRect(0, 0, width, height);

      // Draw Sphere Pixel by Pixel (Simplified Raycasting)
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
           const dx = x - cx;
           const dy = y - cy;
           const dist = Math.sqrt(dx*dx + dy*dy);

           if (dist < radius) {
               // Calculate Normal Vector (Sphere surface)
               const nx = dx / radius;
               const ny = dy / radius;
               const nz = Math.sqrt(1 - nx*nx - ny*ny);

               // Calculate Dot Product (Lighting intensity)
               // N dot L
               let intensity = (nx * lightPos.x) + (ny * lightPos.y) + (nz * lightPos.z);
               
               // Ambient light base + Diffuse
               intensity = Math.max(0.1, intensity);
               
               // Specular highlight (Shininess)
               const reflection = Math.pow(intensity, 20); // Sharp highlight
               
               const r = 200 * intensity + 55 * reflection;
               const g = 190 * intensity + 65 * reflection;
               const b = 180 * intensity + 75 * reflection;

               const index = (y * width + x) * 4;
               data[index] = r;     // R
               data[index + 1] = g; // G
               data[index + 2] = b; // B
               data[index + 3] = 255; // Alpha
           }
        }
      }
      ctx.putImageData(imageData, 0, 0);

      // Draw Light Source Indicator
      /*
        Project 3D light pos to 2D for UI visualization
        UI Circle orbiting center
      */
      const orbitR = 180;
      const lx = cx + lightPos.x * orbitR;
      const ly = cy + lightPos.y * orbitR;
      
      ctx.beginPath();
      ctx.arc(lx, ly, 8, 0, Math.PI*2);
      ctx.fillStyle = '#facc15'; // Yellow
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#facc15';
      ctx.fill();
      ctx.shadowBlur = 0;
    };

    render();
  }, [lightPos]);

  // Handle Mouse Move to update Light Vector
  const handleMouseMove = (e: React.MouseEvent) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width/2;
      const y = e.clientY - rect.top - rect.height/2;
      
      // Normalize
      const mag = Math.sqrt(x*x + y*y + 10000); // 10000 is fake Z depth
      setLightPos({ x: x/mag, y: y/mag, z: 100/mag });
  };

  return (
    <div className="w-full bg-stone-900 border border-stone-800 rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-[500px]">
      
      {/* CONTROLS */}
      <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-stone-800 p-6 flex flex-col justify-between">
          <div>
              <div className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Lightbulb size={16} /> Lighting Studio
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Defining Form</h3>
              <p className="text-sm text-stone-400 leading-relaxed">
                  Sculpture has no color of its own; it relies on shadows to reveal its shape.
              </p>
          </div>
          
          <div className="p-4 bg-black/40 rounded border border-stone-800 text-xs text-stone-500">
              <div className="flex items-center gap-2 mb-2 text-stone-300">
                  <Sun size={12} /> <span className="font-bold">Highlight</span>
              </div>
              The point where the surface faces the light directly.
              <div className="flex items-center gap-2 mt-4 mb-2 text-stone-300">
                  <Moon size={12} /> <span className="font-bold">Shadow</span>
              </div>
              The "Core Shadow" is the darkest point, turning the form away from the light.
          </div>
      </div>

      {/* CANVAS AREA */}
      <div 
        className="flex-1 relative cursor-crosshair bg-[#0c0a09]"
        onMouseMove={handleMouseMove}
      >
          <canvas ref={canvasRef} width={600} height={500} className="w-full h-full" />
          <div className="absolute bottom-4 left-0 right-0 text-center text-[10px] text-stone-600 uppercase tracking-widest pointer-events-none">
              Move cursor to control light source
          </div>
      </div>

    </div>
  );
}