"use client";
import React, { useState, useRef } from 'react';
import { Eye, Search, Layers, Info } from 'lucide-react';
import { PALEO_DB } from './paleoData';

export default function TimeLens() {
  const [activeId, setActiveId] = useState(0);
  const [slider, setSlider] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const animal = PALEO_DB[activeId];

  const handleMouseMove = (e: React.MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
      setSlider((x / rect.width) * 100);
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-[#1c1917] border border-stone-800 rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-[600px]">
      
      {/* SIDEBAR */}
      <div className="w-full md:w-64 border-r border-stone-800 bg-[#0c0a09] flex flex-col">
          <div className="p-4 border-b border-stone-800 text-xs font-bold text-amber-600 uppercase tracking-widest flex items-center gap-2">
              <Search size={14} /> Specimen Log
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar">
              {PALEO_DB.map((a, i) => (
                  <button
                    key={a.id}
                    onClick={() => { setActiveId(i); setSlider(50); }}
                    className={`w-full text-left p-4 border-b border-stone-900 hover:bg-white/5 transition-all group ${activeId === i ? 'bg-stone-800 border-l-4 border-l-amber-600' : 'border-l-4 border-l-transparent'}`}
                  >
                      <div className={`font-bold transition-colors ${activeId === i ? 'text-white' : 'text-stone-400 group-hover:text-stone-200'}`}>{a.name}</div>
                      <div className="text-[10px] text-stone-600 italic group-hover:text-stone-500">{a.era}</div>
                  </button>
              ))}
          </div>
      </div>

      {/* VIEWER */}
      <div className="flex-1 flex flex-col bg-[#151413]">
          
          {/* Header */}
          <div className="p-6 border-b border-stone-800 flex justify-between items-start">
              <div>
                  <h2 className="text-3xl font-black text-white uppercase tracking-tight">{animal.name}</h2>
                  <div className="text-sm text-stone-500 italic font-serif">{animal.scientificName}</div>
              </div>
              <div className="flex gap-4 text-right">
                  <div>
                    <div className="text-[10px] font-bold text-stone-600 uppercase">Period</div>
                    <div className="text-amber-500 font-mono text-xs">{animal.period}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-stone-600 uppercase">Diet</div>
                    <div className="text-stone-300 font-mono text-xs">{animal.diet}</div>
                  </div>
              </div>
          </div>

          {/* Slider Canvas */}
          <div 
            ref={containerRef}
            className="flex-1 relative overflow-hidden cursor-crosshair group select-none"
            onMouseMove={handleMouseMove}
            onTouchMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.touches[0].clientX - rect.left;
                setSlider((x/rect.width)*100);
            }}
          >
              {/* BACK LAYER: SKELETON */}
              <div className="absolute inset-0 p-8 flex items-center justify-center bg-[#0c0a09]">
                   {/* We use <img> to control object-fit better than bg-image for these specific diagrams */}
                   <img 
                      src={animal.skeleton} 
                      alt="Skeleton"
                      className="w-full h-full object-contain opacity-50 invert brightness-150 contrast-125" 
                   />
                   <div className="absolute top-4 left-4 flex items-center gap-2 text-[10px] font-bold text-stone-500 uppercase tracking-widest bg-black/50 px-2 py-1 rounded">
                      <Layers size={12} /> Skeletal Structure
                   </div>
              </div>

              {/* FRONT LAYER: LIFE (Clipped) */}
              <div 
                className="absolute inset-0 bg-[#0c0a09] border-r-2 border-amber-500 overflow-hidden"
                style={{ width: `${slider}%` }}
              >
                  <div className="absolute inset-0 p-8 flex items-center justify-center w-full h-full">
                     {/* The width of this inner container must match the PARENT width to keep image static while container clips */}
                     <div className="w-[calc(100vw-16rem)] max-w-5xl h-full flex items-center justify-center">
                         <img 
                            src={animal.image} 
                            alt="Life"
                            className="w-full h-full object-contain" 
                            style={{ width: containerRef.current?.offsetWidth || '100%' }}
                         />
                     </div>
                  </div>
                  
                  <div className="absolute top-4 right-4 flex items-center gap-2 text-[10px] font-bold text-amber-500 uppercase tracking-widest bg-black/50 px-2 py-1 rounded">
                      <Eye size={12} /> Life Restoration
                   </div>
              </div>

              {/* SLIDER HANDLE */}
              <div 
                className="absolute top-0 bottom-0 w-px bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)] flex items-center justify-center"
                style={{ left: `${slider}%` }}
              >
                  <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center shadow-lg text-black">
                      <Info size={16} />
                  </div>
              </div>
          </div>

          {/* Description */}
          <div className="p-6 border-t border-stone-800 bg-[#0c0a09] min-h-[100px]">
              <p className="text-sm text-stone-400 font-serif leading-relaxed max-w-3xl">
                  {animal.desc}
              </p>
          </div>

      </div>
    </div>
  );
}