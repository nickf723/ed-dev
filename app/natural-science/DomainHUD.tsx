"use client";
import Link from "next/link";
import { ArrowRight, Activity, Microscope, Telescope, Atom, Database } from "lucide-react";

export type DomainData = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  question: string;
  subdomains: string[];
  tools: string[];
  metricLabel: string;
  metricValue: string;
  color: string; // e.g., "text-indigo-400"
  buttonColor: string; // e.g., "bg-indigo-600"
};

export default function DomainHUD({ data }: { data: DomainData }) {
  return (
    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 w-full max-w-7xl px-6 items-center">
      
      {/* LEFT COLUMN: Main Title & Description */}
      <div className="lg:col-span-7 flex flex-col justify-center">
        {/* Scale/Label Tag */}
        <div className={`flex items-center gap-3 mb-6 ${data.color} opacity-80`}>
           <div className="h-px w-8 bg-current" />
           <span className="font-mono text-xs tracking-[0.3em] uppercase">
             Sector: {data.id}
           </span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-6 drop-shadow-2xl">
          {data.title}
        </h1>

        <p className="text-xl md:text-2xl text-neutral-200 font-light leading-relaxed max-w-2xl drop-shadow-md">
          {data.description}
        </p>

        {/* Action Button */}
        <div className="mt-10 flex items-center gap-6">
           <Link 
             href={`/natural-science/${data.id}`}
             className={`group relative px-8 py-4 rounded-full font-bold text-white overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] ${data.buttonColor}`}
           >
             <span className="relative z-10 flex items-center gap-2">
               Enter Domain <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
             </span>
             {/* Button Shine Effect */}
             <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
           </Link>
        </div>
      </div>


      {/* RIGHT COLUMN: The "Instrument Panel" (Glass Card) */}
      <div className="lg:col-span-5">
         <div className="backdrop-blur-md bg-neutral-900/60 border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden group">
            
            {/* Decorative Scanline */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50 animate-scanline" />

            {/* 1. The Core Question */}
            <div className="mb-8 border-b border-white/10 pb-6">
                <h4 className="text-[10px] font-mono uppercase text-neutral-400 mb-2 tracking-widest">
                    Fundamental Inquiry
                </h4>
                <p className={`text-lg font-serif italic ${data.color}`}>
                    "{data.question}"
                </p>
            </div>

            {/* 2. Sub-Domains Grid */}
            <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                   <h4 className="text-[10px] font-mono uppercase text-neutral-400 mb-2 tracking-widest">
                      Focus Areas
                   </h4>
                   <ul className="space-y-1">
                      {data.subdomains.map(sub => (
                          <li key={sub} className="text-sm text-neutral-300 flex items-center gap-2">
                              <span className={`w-1 h-1 rounded-full bg-current ${data.color}`} />
                              {sub}
                          </li>
                      ))}
                   </ul>
                </div>
                <div>
                   <h4 className="text-[10px] font-mono uppercase text-neutral-400 mb-2 tracking-widest">
                      Instruments
                   </h4>
                   <div className="flex flex-wrap gap-2">
                      {data.tools.map(tool => (
                          <span key={tool} className="text-[10px] border border-white/10 px-2 py-1 rounded bg-white/5 text-neutral-300">
                              {tool}
                          </span>
                      ))}
                   </div>
                </div>
            </div>

            {/* 3. Live Metric (The "Generic Content" Interactive feel) */}
            <div className="bg-black/40 rounded-lg p-4 flex items-center justify-between border border-white/5">
                <div className="flex items-center gap-3">
                    <Activity size={16} className={data.color} />
                    <span className="text-xs font-mono text-neutral-400">{data.metricLabel}</span>
                </div>
                <div className="font-mono text-xl font-bold text-white tracking-widest">
                    {data.metricValue}
                </div>
            </div>

         </div>
      </div>

    </div>
  );
}