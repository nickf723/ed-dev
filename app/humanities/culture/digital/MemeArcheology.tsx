"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Image as ImageIcon, Smile, Cpu } from 'lucide-react';

const ERAS = [
  {
    id: 'web1',
    title: "The Dial-Up Era",
    years: "1990 - 2004",
    style: "font-mono text-green-400 bg-black border-green-500",
    desc: "The Wild West. GIFs were new. Communication was text-based (IRC, Forums). Humor was nerdy and niche.",
    artifact: "¯\\_(ツ)_/¯",
    icon: Globe
  },
  {
    id: 'web2',
    title: "The Social Feed",
    years: "2005 - 2015",
    style: "font-sans text-white bg-blue-600 border-white",
    desc: "The Golden Age. The rise of Facebook and Reddit. Memes became standardized templates (Impact Font).",
    artifact: "CAN I HAZ CHEEZBURGER?",
    icon: ImageIcon
  },
  {
    id: 'post',
    title: "Post-Irony",
    years: "2016 - Present",
    style: "font-serif text-yellow-300 bg-purple-900 border-yellow-300 italic",
    desc: "Chaos. Humor became abstract, surreal, and layered. 'Deep Fried' visuals and nonsense became the punchline.",
    artifact: "S T O N K S 📉",
    icon: Cpu
  }
];

export default function MemeArcheology() {
  const [activeEra, setActiveEra] = useState(0);
  const current = ERAS[activeEra];

  return (
    <div className="w-full max-w-4xl mx-auto bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden flex flex-col md:flex-row min-h-[400px]">
      
      {/* TIMELINE NAV */}
      <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-white/10 p-4 flex flex-col gap-2">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Select Era</div>
          {ERAS.map((era, i) => (
              <button
                key={era.id}
                onClick={() => setActiveEra(i)}
                className={`p-4 rounded-xl text-left transition-all ${activeEra === i ? 'bg-white/10 border border-white/20' : 'hover:bg-white/5 border border-transparent'}`}
              >
                  <div className="text-xs text-slate-400 font-mono mb-1">{era.years}</div>
                  <div className={`font-bold ${activeEra === i ? 'text-white' : 'text-slate-500'}`}>{era.title}</div>
              </button>
          ))}
      </div>

      {/* DISPLAY PORTAL */}
      <div className="flex-1 p-8 relative flex flex-col justify-center items-center text-center">
          <AnimatePresence mode="wait">
              <motion.div 
                key={current.id}
                initial={{ opacity: 0, scale: 0.9, rotateX: 90 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotateX: -90 }}
                transition={{ duration: 0.4 }}
                className={`relative z-10 p-8 rounded-xl border-4 shadow-2xl max-w-sm ${current.style}`}
              >
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black border border-white/20 p-2 rounded-full">
                      <current.icon size={24} className="text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-black uppercase mb-4 mt-2">{current.title}</h3>
                  
                  <div className="my-6 py-4 border-y border-current/30 text-xl font-bold">
                      "{current.artifact}"
                  </div>

                  <p className="text-sm opacity-80 leading-relaxed">
                      {current.desc}
                  </p>
              </motion.div>
          </AnimatePresence>

          {/* Era-Specific Background Decorations */}
          {current.id === 'web1' && <div className="absolute inset-0 bg-[url('https://media.giphy.com/media/unQ3IJU2RG7XM/giphy.gif')] opacity-5 bg-repeat pointer-events-none" />}
          {current.id === 'post' && <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-yellow-500/20 animate-pulse pointer-events-none" />}
      </div>

    </div>
  );
}