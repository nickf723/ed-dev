"use client";
import React from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, MapPin, 
  Tent, Compass, Landmark, MountainSnow, ArrowRight
} from 'lucide-react';
import NorthAmericaBackground from './_components/NorthAmericaBackground';
import ContestedMapLab from './_components/ContestedMapLab';
import { M } from '@/components/Math';

const NATIONS = [
  {
    id: 'usa',
    title: 'United States',
    subtitle: 'The Federal Republic',
    description: 'Born from colonial rebellion, it expanded rapidly across the continent to become the dominant global military and economic hegemon.',
    icon: <Landmark size={20} className="text-blue-500" />,
    href: '/applied-science/humanities/history/region/americas/usa',
    color: 'blue'
  },
  {
    id: 'canada',
    title: 'Canada',
    subtitle: 'The Northern Dominion',
    description: 'A vast, resource-rich federation built on treaties, French-British compromise, and remaining tied to the British Commonwealth.',
    icon: <MountainSnow size={20} className="text-red-500" />,
    href: '/applied-science/humanities/history/region/americas/canada',
    color: 'red'
  },
  {
    id: 'mexico',
    title: 'Mexico',
    subtitle: 'The Cultural Synthesis',
    description: 'The direct heir to Mesoamerican empires and New Spain. A history defined by revolution, profound cultural synthesis, and regional influence.',
    icon: <Compass size={20} className="text-emerald-500" />,
    href: '/applied-science/humanities/history/region/americas/mexico',
    color: 'emerald'
  },
  {
    id: 'indigenous',
    title: 'Indigenous Nations',
    subtitle: 'First Peoples',
    description: 'The sovereign histories of the Navajo, Iroquois Confederacy, Inuit, and hundreds of other nations existing before, during, and after colonization.',
    icon: <Tent size={20} className="text-amber-500" />,
    href: '/applied-science/humanities/history/region/americas/indigenous',
    color: 'amber'
  }
];

export default function NorthAmericaPage() {
  return (
    <main className="relative min-h-screen bg-[#01060a] overflow-hidden selection:bg-sky-900/30 font-sans">
      <NorthAmericaBackground />
      
      <div className="relative z-10 max-w-[90rem] mx-auto px-6 py-12 lg:py-24">
         
         <Link href="/applied-science/humanities/history/region/americas" className="inline-flex items-center gap-2 text-[10px] font-black tracking-widest text-neutral-500 hover:text-white mb-12 transition-colors uppercase">
             <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform"/> Back to The Americas
         </Link>

         {/* HERO SECTION */}
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24 items-end">
             <div className="lg:col-span-8">
                 <div className="flex items-center gap-3 text-sky-400 mb-6 font-mono text-xs font-bold tracking-[0.2em] uppercase">
                     <span className="w-8 h-px bg-sky-400"></span>
                     Sub-Region
                 </div>
                 <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none">
                     NORTH AMERICA
                 </h1>
                 <p className="text-xl text-neutral-400 max-w-2xl leading-relaxed font-light">
                     From the Arctic tundra to the Sonoran deserts. A massive geographic arena defined by overlapping Indigenous networks, aggressive European imperialism, and the forging of modern superpowers.
                 </p>
             </div>
             
             {/* QUICK STATS */}
             <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col justify-end gap-4">
                 <div className="p-5 bg-black/50 backdrop-blur-md rounded-none border-l-4 border-sky-400 border-y border-r border-neutral-900">
                     <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">Land Area</div>
                     <div className="text-3xl font-black text-white font-mono">24.7 <span className="text-lg text-sky-400 font-sans">Million km²</span></div>
                 </div>
             </div>
         </div>

         

[Image of North American biomes map]


         {/* CONCEPT ZERO */}
         <div className="mb-32">
            <div className="flex items-center gap-3 mb-8">
                 <div className="w-2 h-2 bg-sky-400 animate-[pulse_1.5s_ease-out_infinite] shadow-[0_0_10px_rgba(56,189,248,0.8)]"></div>
                 <span className="text-xs font-black text-white uppercase tracking-widest">Concept Zero: Shifting Borders</span>
            </div>
            
            <ContestedMapLab />
         </div>

         {/* NATIONS & ENTITIES GRID */}
         <div className="mb-24">
             <div className="flex items-center mb-10 border-b border-neutral-900 pb-4">
                 <h2 className="text-2xl font-black text-white flex items-center gap-3 tracking-tight">
                    <MapPin size={24} className="text-sky-400"/> Geopolitical Entities
                 </h2>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {NATIONS.map((nation) => (
                     <Link 
                        key={nation.id} 
                        href={nation.href}
                        className={`
                          group relative p-8 bg-black/40 border border-neutral-800 transition-all duration-300 flex flex-col justify-between min-h-[200px] rounded-2xl
                          hover:bg-neutral-900 hover:border-${nation.color}-500/30
                        `}
                     >
                        <div>
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 bg-black border border-neutral-800 rounded-xl transition-colors">
                                    {nation.icon}
                                </div>
                                <ArrowRight size={20} className={`text-neutral-700 group-hover:text-${nation.color}-500 transition-all group-hover:translate-x-1`} />
                            </div>
                            
                            <h3 className={`text-2xl font-bold text-white mb-1 group-hover:text-${nation.color}-400 transition-colors`}>
                                {nation.title}
                            </h3>
                            <div className="text-[10px] font-black font-mono text-neutral-500 uppercase tracking-widest mb-3">
                                {nation.subtitle}
                            </div>
                            <p className="text-sm text-neutral-400 leading-relaxed font-light">
                                {nation.description}
                            </p>
                        </div>
                     </Link>
                 ))}
             </div>
         </div>

         

         {/* CARTOGRAPHIC DECODER */}
         <div className="bg-[#010810] border-y border-neutral-900 py-12 px-8 lg:px-16 -mx-6 lg:-mx-12 mt-16">
             <div className="flex items-center gap-3 mb-10 max-w-7xl mx-auto">
                 <Compass size={20} className="text-neutral-500" />
                 <h3 className="text-sm font-black text-white uppercase tracking-widest">Cartographic Decoder: The Mercator Distortion</h3>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl mx-auto items-center">
                 <div className="space-y-6">
                     <p className="text-sm text-neutral-400 leading-relaxed font-light">
                         When looking at standard maps of history, North America (specifically Canada and Greenland) appears unfathomably large. This is an illusion caused by the <strong>Mercator Projection</strong>.
                     </p>
                     <p className="text-sm text-neutral-400 leading-relaxed font-light">
                         Because you cannot mathematically flatten a sphere onto a rectangle without stretching it, the Mercator projection stretches the map exponentially the closer you get to the poles. While Greenland looks the same size as Africa on a map, Africa is actually <strong>14 times larger</strong>.
                     </p>
                 </div>

                 {/* The Math of Map Distortion */}
                 <div className="p-8 bg-sky-950/20 border border-sky-900/50 rounded-xl flex flex-col justify-center shadow-xl">
                     <div className="text-[10px] font-bold text-sky-400 uppercase tracking-widest mb-6 border-b border-sky-900/50 pb-2">Distortion Scaling Factor</div>
                     <div className="text-xl md:text-3xl text-white font-bold bg-black/60 px-6 py-8 rounded-lg border border-neutral-800 text-center shadow-inner">
                         <M display>{`k = \\sec(\\varphi) = \\frac{1}{\\cos(\\varphi)}`}</M>
                     </div>
                     <ul className="mt-6 text-xs text-neutral-400 space-y-3 font-mono">
                         <li className="flex items-start gap-3">
                             <strong className="text-white w-10 text-right"><M>k</M></strong> = Scale factor (Amount of stretching)
                         </li>
                         <li className="flex items-start gap-3">
                             <strong className="text-sky-400 w-10 text-right"><M>\varphi</M></strong> = Latitude
                         </li>
                         <li className="mt-4 pt-4 border-t border-neutral-800 italic">
                             At the equator (<M>\varphi = 0^\circ</M>), scale is 1 (accurate). At <M>\varphi = 60^\circ</M> North (Northern Canada), the scale is 2, meaning the map area is stretched by a factor of 4!
                         </li>
                     </ul>
                 </div>
             </div>
         </div>

      </div>
    </main>
  );
}