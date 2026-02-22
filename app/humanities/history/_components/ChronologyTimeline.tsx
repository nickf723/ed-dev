"use client";
import React, { useState } from 'react';
import { Landmark, Castle, Compass, Factory, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const ERAS = [
  { id: 'prehistoric', title: 'Prehistory', span: 'Before 3000 BCE', icon: <Landmark size={24}/>, desc: 'The dawn of humanity, from the first tools to the rise of agriculture.' },
  { id: 'ancient', title: 'Antiquity', span: '3000 BCE – 500 CE', icon: <Landmark size={24}/>, desc: 'The birth of civilization, writing, and foundational empires.' },
  { id: 'medieval', title: 'Post-Classical', span: '500 CE – 1500 CE', icon: <Castle size={24}/>, desc: 'The Middle Ages, the Islamic Golden Age, and Mongol networks.' },
  { id: 'early-modern', title: 'Early Modern', span: '1500 CE – 1800 CE', icon: <Compass size={24}/>, desc: 'Global exploration, colonialism, and the Scientific Revolution.' },
  { id: 'modern', title: 'Late Modern', span: '1800 CE – Present', icon: <Factory size={24}/>, desc: 'Industrialization, total global war, and the atomic age.' },
  { id: 'futurology', title: 'Futurology', span: 'Present – Future', icon: <Compass size={24}/>, desc: 'Speculations on the future of humanity, technology, and society.' }
];

export default function ChronologyTimeline() {
  const [hovered, setHovered] = useState<string | null>('ancient');

  return (
    <div className="w-full flex flex-col md:flex-row h-[400px] gap-2">
      {ERAS.map((era) => {
        const isActive = hovered === era.id;
        return (
          <Link
            key={era.id}
            href={`/humanities/history/chronology/${era.id}`}
            onMouseEnter={() => setHovered(era.id)}
            className={`
              relative group flex flex-col justify-end p-6 overflow-hidden transition-all duration-500 ease-out border border-neutral-800 rounded-2xl
              ${isActive ? 'md:flex-[3] bg-amber-950/20 border-amber-500/50 shadow-[0_0_30px_rgba(245,158,11,0.15)]' : 'md:flex-[1] bg-black/40 hover:bg-neutral-900'}
            `}
          >
            {/* Background Glow */}
            <div className={`absolute inset-0 bg-gradient-to-t from-amber-900/40 to-transparent opacity-0 transition-opacity duration-500 ${isActive ? 'opacity-100' : ''}`} />
            
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className={`p-4 rounded-xl border transition-all duration-500 w-fit ${isActive ? 'bg-amber-500/20 border-amber-500/50 text-amber-400' : 'bg-black border-neutral-800 text-neutral-500'}`}>
                {era.icon}
              </div>
              
              <div>
                <div className={`text-[10px] font-black font-mono tracking-widest uppercase mb-2 transition-all duration-300 ${isActive ? 'text-amber-500' : 'text-neutral-600'}`}>
                    {era.span}
                </div>
                <h3 className={`font-black tracking-tight transition-all duration-300 ${isActive ? 'text-3xl text-white mb-3' : 'text-xl text-neutral-400 rotate-0 md:-rotate-90 md:origin-left md:translate-x-4 whitespace-nowrap'}`}>
                  {era.title}
                </h3>
                
                <div className={`overflow-hidden transition-all duration-500 ${isActive ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-sm text-neutral-300 font-light leading-relaxed mb-4">
                    {era.desc}
                  </p>
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-500 uppercase tracking-widest">
                    Enter Era <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}