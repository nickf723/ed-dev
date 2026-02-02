"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Server, Globe, Monitor, Clock } from 'lucide-react';

export default function RenderingModesLab() {
  const [mode, setMode] = useState<'ssg' | 'ssr' | 'csr'>('ssg');

  const strategies = {
    ssg: {
      title: "Static Site Generation",
      desc: "HTML generated at build time. Served instantly via CDN.",
      ttfb: "Instant",
      seo: "Perfect",
      color: "text-purple-400",
      bg: "bg-purple-500",
      border: "border-purple-500"
    },
    ssr: {
      title: "Server-Side Rendering",
      desc: "HTML generated on every request. Always fresh data.",
      ttfb: "Slow (Server processing)",
      seo: "Good",
      color: "text-blue-400",
      bg: "bg-blue-500",
      border: "border-blue-500"
    },
    csr: {
      title: "Client-Side Rendering",
      desc: "Empty HTML sent. Browser builds UI via JavaScript.",
      ttfb: "Fast (Empty page)",
      seo: "Poor (without crawlers)",
      color: "text-yellow-400",
      bg: "bg-yellow-500",
      border: "border-yellow-500"
    }
  };

  const active = strategies[mode];

  return (
    <div className="w-full bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-2xl">
      
      {/* HEADER CONTROLS */}
      <div className="p-4 border-b border-white/10 bg-black/40 flex justify-between items-center">
        <h3 className="font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2">
            <Zap size={16} /> Rendering Engine
        </h3>
        <div className="flex bg-zinc-900 p-1 rounded-lg">
            {(['ssg', 'ssr', 'csr'] as const).map((m) => (
                <button 
                    key={m}
                    onClick={() => setMode(m)}
                    className={`px-4 py-1.5 text-[10px] font-bold uppercase rounded transition-all ${mode === m ? 'bg-white text-black' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                    {m}
                </button>
            ))}
        </div>
      </div>

      <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* LEFT: VISUALIZATION TIMELINE */}
        <div className="space-y-6">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-500 uppercase">
                <span>Build Time</span>
                <span>Request Time</span>
                <span>Browser</span>
            </div>

            {/* The Build/Request Visual */}
            <div className="relative h-32 w-full bg-zinc-900 rounded-xl overflow-hidden border border-white/5 flex items-center px-4">
                {/* Connection Line */}
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-zinc-800" />

                {/* Build Node */}
                <motion.div 
                    initial={false}
                    animate={{ 
                        scale: mode === 'ssg' ? 1.2 : 1,
                        opacity: mode === 'ssg' ? 1 : 0.3
                    }}
                    className="relative z-10 w-12 h-12 bg-zinc-800 rounded-full border border-white/10 flex items-center justify-center flex-col"
                >
                    <Server size={14} className="text-white" />
                    <span className="absolute -bottom-5 text-[8px] uppercase text-zinc-500">Build</span>
                </motion.div>

                {/* The Request Flow Animation */}
                <motion.div 
                   key={mode}
                   initial={{ x: 0, opacity: 0 }}
                   animate={{ 
                       x: 200, 
                       opacity: [0, 1, 1, 0],
                       transition: { duration: 2, repeat: Infinity, ease: "linear" }
                   }}
                   className={`absolute top-1/2 -mt-1.5 w-8 h-3 rounded-full ${active.bg} blur-md z-0`}
                />

                {/* Server Runtime Node */}
                <motion.div 
                    initial={false}
                    animate={{ 
                        scale: mode === 'ssr' ? 1.2 : 1,
                        opacity: mode === 'ssr' ? 1 : 0.3,
                        left: '45%'
                    }}
                    className="absolute z-10 w-12 h-12 bg-zinc-800 rounded-full border border-white/10 flex items-center justify-center flex-col"
                >
                    <Globe size={14} className="text-white" />
                    <span className="absolute -bottom-5 text-[8px] uppercase text-zinc-500">Server</span>
                </motion.div>

                {/* Client Node */}
                <motion.div 
                    initial={false}
                    animate={{ 
                        scale: mode === 'csr' ? 1.2 : 1,
                        opacity: 1, // Client always active
                        right: '16px'
                    }}
                    className="absolute z-10 w-12 h-12 bg-zinc-800 rounded-full border border-white/10 flex items-center justify-center flex-col"
                >
                    <Monitor size={14} className="text-white" />
                    <span className="absolute -bottom-5 text-[8px] uppercase text-zinc-500">Client</span>
                </motion.div>
            </div>
            
            <div className={`p-4 rounded-xl bg-zinc-900/50 border ${active.border} border-opacity-30`}>
                <h4 className={`text-lg font-bold ${active.color} mb-1`}>{active.title}</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">{active.desc}</p>
            </div>
        </div>

        {/* RIGHT: METRICS */}
        <div className="flex flex-col justify-center space-y-4">
            <Metric label="HTML Generation" value={mode === 'ssg' ? 'Build Time' : mode === 'ssr' ? 'Request Time' : 'Runtime'} />
            <Metric label="Time to First Byte" value={active.ttfb} color={mode === 'ssg' ? 'text-emerald-400' : mode === 'csr' ? 'text-emerald-400' : 'text-amber-400'} />
            <Metric label="SEO Friendly" value={active.seo} color={mode === 'csr' ? 'text-red-400' : 'text-emerald-400'} />
            
            <div className="mt-4 p-3 bg-black rounded font-mono text-[10px] text-zinc-500">
                // Next.js Function<br/>
                <span className="text-white">
                {mode === 'ssg' ? 'export function getStaticProps()' : mode === 'ssr' ? 'export function getServerSideProps()' : 'useEffect(() => fetch(), [])'}
                </span>
            </div>
        </div>

      </div>
    </div>
  );
}

function Metric({ label, value, color = "text-white" }: any) {
    return (
        <div className="flex justify-between items-center border-b border-white/5 pb-2 last:border-0">
            <span className="text-xs text-zinc-500 uppercase font-bold">{label}</span>
            <span className={`text-sm font-mono ${color}`}>{value}</span>
        </div>
    )
}