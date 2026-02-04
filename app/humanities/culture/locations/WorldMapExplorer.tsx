"use client";
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowRight, Globe } from 'lucide-react';
import Link from 'next/link';

export default function WorldMapExplorer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  // Simplified coordinates for visual placement (0-100 scale)
  const cities = [
    { id: 'chicago', name: 'Chicago', x: 28, y: 35, active: true },
    { id: 'ny', name: 'New York', x: 32, y: 34, active: false },
    { id: 'london', name: 'London', x: 48, y: 28, active: false },
    { id: 'tokyo', name: 'Tokyo', x: 85, y: 36, active: false },
    { id: 'paris', name: 'Paris', x: 50, y: 30, active: false },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let frame = 0;

    const animate = () => {
      ctx.fillStyle = '#0f172a'; // Slate-900
      ctx.fillRect(0, 0, width, height);

      // Draw World Map Dots (Abstract)
      // This is a procedural generation for the background "Landmass" effect
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      for(let i=0; i<200; i++) {
          const x = (Math.sin(i * 132.1) * 0.5 + 0.5) * width;
          const y = (Math.cos(i * 453.2) * 0.5 + 0.5) * height;
          // Only draw if roughly in land zones (visual hack for demo)
          if (y > height * 0.2 && y < height * 0.8) {
             ctx.beginPath();
             ctx.arc(x, y, 1, 0, Math.PI*2);
             ctx.fill();
          }
      }

      // Draw Grid Lines (Latitude/Longitude)
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.05)'; // Sky-400 low opacity
      ctx.lineWidth = 1;
      for(let x=0; x<width; x+=100) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,height); ctx.stroke(); }
      for(let y=0; y<height; y+=100) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(width,y); ctx.stroke(); }

      // Draw Connections from Active City (Chicago)
      const chicago = cities.find(c => c.id === 'chicago');
      if (chicago) {
          const cx = (chicago.x / 100) * width;
          const cy = (chicago.y / 100) * height;

          cities.forEach(c => {
              if (c.id === 'chicago') return;
              const tx = (c.x / 100) * width;
              const ty = (c.y / 100) * height;

              // Draw Arc
              ctx.beginPath();
              ctx.moveTo(cx, cy);
              ctx.quadraticCurveTo((cx+tx)/2, cy - 100, tx, ty);
              ctx.strokeStyle = 'rgba(56, 189, 248, 0.1)';
              ctx.stroke();

              // Traveling Dot
              const travel = (frame % 200) / 200;
              // Bezier math for dot position would go here
          });
      }

      frame++;
      requestAnimationFrame(animate);
    };

    const handleResize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    animate();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative w-full h-full">
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
        
        {/* Render Interactive Pins */}
        {cities.map((city) => (
            <div 
                key={city.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{ left: `${city.x}%`, top: `${city.y}%` }}
                onMouseEnter={() => setHoveredCity(city.id)}
                onMouseLeave={() => setHoveredCity(null)}
            >
                {/* Pulse Effect */}
                <div className={`absolute inset-0 rounded-full animate-ping ${city.active ? 'bg-cyan-500' : 'bg-slate-600'} opacity-75`} />
                
                {/* Pin Head */}
                <div className={`relative w-4 h-4 rounded-full border-2 border-white shadow-[0_0_15px_rgba(0,0,0,0.5)] ${city.active ? 'bg-cyan-500' : 'bg-slate-700'}`} />

                {/* Label (Always visible for Active, Hover for others) */}
                {(city.active || hoveredCity === city.id) && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        className="absolute top-6 left-1/2 -translate-x-1/2 bg-slate-900/90 border border-white/20 p-3 rounded-xl backdrop-blur-md min-w-[150px] z-50"
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <MapPin size={12} className={city.active ? 'text-cyan-400' : 'text-slate-400'} />
                            <span className="text-xs font-bold text-white uppercase tracking-wider">{city.name}</span>
                        </div>
                        {city.active && (
                            <Link href="/humanities/culture/locations/chicago" className="block mt-2">
                                <button className="w-full py-1.5 bg-cyan-600 hover:bg-cyan-500 text-[10px] font-bold text-white uppercase rounded transition-colors flex items-center justify-center gap-2">
                                    Enter City <ArrowRight size={10} />
                                </button>
                            </Link>
                        )}
                        {!city.active && (
                            <div className="text-[9px] text-slate-500 italic text-center">Data Uplink Offline</div>
                        )}
                    </motion.div>
                )}
            </div>
        ))}
    </div>
  );
}