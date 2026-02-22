"use client";
import React from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, MapPin, Pickaxe, 
  Swords, Factory, Sun, 
  Compass, Mountain, Globe2, 
  Tent, Landmark
} from 'lucide-react';
import AmericasBackground from './_components/AmericasBackground';
import ExchangeLab from './_components/ExchangeLab';
import { M } from '@/components/Math'; 

const EPOCHS = [
  {
    id: 'pre-columbian',
    title: 'Pre-Columbian Era',
    span: '15,000 BCE – 1492 CE',
    description: 'Advanced mathematics, precise astronomy, and massive urban centers like Tenochtitlan built without beasts of burden or the wheel.',
    icon: <Sun size={24} className="text-amber-500" />,
    href: '/applied-science/humanities/history/region/americas/pre-columbian',
    color: 'amber'
  },
  {
    id: 'colonialism',
    title: 'The Colonial Era',
    span: '1492 CE – 1776 CE',
    description: 'Conquistadors, the Transatlantic Slave Trade, and the extraction of Andean silver that single-handedly fueled the global economy.',
    icon: <Compass size={24} className="text-emerald-500" />,
    href: '/applied-science/humanities/history/region/americas/colonialism',
    color: 'emerald'
  },
  {
    id: 'revolutions',
    title: 'Age of Revolutions',
    span: '1776 CE – 1830 CE',
    description: 'The domino effect of independence. The American Revolution, the Haitian slave revolt, and the liberation campaigns of Simón Bolívar.',
    icon: <Swords size={24} className="text-red-500" />,
    href: '/applied-science/humanities/history/region/americas/revolutions',
    color: 'red'
  },
  {
    id: 'modern',
    title: 'The Modern Hemisphere',
    span: '1830 CE – Present',
    description: 'Industrialization, the Monroe Doctrine, Cold War proxy conflicts, and the rapid rise of the United States as a global hegemon.',
    icon: <Factory size={24} className="text-blue-500" />,
    href: '/applied-science/humanities/history/region/americas/modern',
    color: 'blue'
  }
];

const SUB_REGIONS = [
  {
    id: 'north-america',
    title: 'North America',
    focus: 'Nomadic Networks & Modern Superpowers',
    icon: <Tent size={20} className="text-sky-500" />,
    href: '/humanities/history/regional/americas/north-america'
  },
  {
    id: 'mesoamerica',
    title: 'Mesoamerica',
    focus: 'Olmec, Maya & Aztec Empires',
    icon: <Landmark size={20} className="text-amber-500" />,
    href: '/humanities/history/regional/americas/mesoamerica'
  },
  {
    id: 'andes',
    title: 'The Andes',
    focus: 'Incan Vertical Archipelagos',
    icon: <Mountain size={20} className="text-emerald-500" />,
    href: '/humanities/history/regional/americas/andes'
  },
  {
    id: 'caribbean',
    title: 'The Caribbean',
    focus: 'Colonial Plantations & Naval Piracy',
    icon: <Globe2 size={20} className="text-cyan-500" />,
    href: '/humanities/history/regional/americas/caribbean'
  }
];

export default function AmericasRegionPage() {
  return (
    <main className="relative min-h-screen bg-[#010805] overflow-hidden selection:bg-emerald-900/30 font-sans">
      <AmericasBackground />
      
      <div className="relative z-10 max-w-[90rem] mx-auto px-6 py-12 lg:py-24">
         
         <Link href="/applied-science/humanities/history" className="inline-flex items-center gap-2 text-[10px] font-black tracking-widest text-neutral-500 hover:text-white mb-12 transition-colors uppercase">
             <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform"/> Back to History Hub
         </Link>

         {/* HERO SECTION */}
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24 items-end">
             <div className="lg:col-span-8">
                 <div className="flex items-center gap-3 text-emerald-500 mb-6 font-mono text-xs font-bold tracking-[0.2em] uppercase">
                     <span className="w-8 h-px bg-emerald-500"></span>
                     Regional History
                 </div>
                 <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none">
                     THE AMERICAS
                 </h1>
                 <p className="text-xl text-neutral-400 max-w-2xl leading-relaxed font-light">
                     For 15,000 years, two massive continents developed in total isolation from the rest of humanity. When the oceanic wall was finally breached in 1492, the resulting collision created <strong className="text-white font-semibold">the modern world.</strong>
                 </p>
             </div>
             
             {/* QUICK STATS */}
             <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col justify-end gap-4">
                 <div className="p-5 bg-black/50 backdrop-blur-md rounded-none border-l-4 border-emerald-500 border-y border-r border-neutral-900">
                     <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">Human Habitation</div>
                     <div className="text-3xl font-black text-white font-mono">~15,000 <span className="text-lg text-emerald-500 font-sans">Yrs</span></div>
                 </div>
                 <div className="p-5 bg-black/50 backdrop-blur-md rounded-none border-l-4 border-amber-500 border-y border-r border-neutral-900">
                     <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">Indigenous Pop. (1492)</div>
                     <div className="text-3xl font-black text-white font-mono">~60 <span className="text-lg text-amber-500 font-sans">Million</span></div>
                 </div>
             </div>
         </div>

         

         {/* CONCEPT ZERO: COLUMBIAN EXCHANGE */}
         <div className="mb-32">
            <div className="flex items-center gap-3 mb-8">
                 <div className="w-2 h-2 bg-emerald-500 animate-[pulse_1.5s_ease-out_infinite] shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
                 <span className="text-xs font-black text-white uppercase tracking-widest">Concept Zero: Biological Collision</span>
            </div>
            
            <ExchangeLab />
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
             
             {/* EPOCHS TIMELINE (LEFT SIDE) */}
             <div className="lg:col-span-8">
                 <div className="flex items-center mb-10 border-b border-neutral-900 pb-4">
                     <h2 className="text-2xl font-black text-white flex items-center gap-3 tracking-tight">
                        <MapPin size={24} className="text-emerald-500"/> Regional Epochs
                     </h2>
                 </div>

                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                     {EPOCHS.map((epoch) => (
                         <Link 
                            key={epoch.id} 
                            href={epoch.href}
                            className="group relative p-6 bg-black/40 border border-neutral-800 hover:bg-[#010c08] transition-all duration-300 flex flex-col gap-4 rounded-xl"
                            style={{ borderTopColor: `var(--tw-colors-${epoch.color}-500, #10b981)`, borderTopWidth: '2px' }}
                         >
                            <div className="flex justify-between items-start">
                                <div className="p-3 bg-black border border-neutral-800 rounded-xl transition-colors">
                                    {epoch.icon}
                                </div>
                                <span className={`text-[9px] font-black font-mono text-${epoch.color}-500/80 bg-${epoch.color}-950/30 px-2 py-1 rounded uppercase tracking-widest border border-${epoch.color}-900/30`}>
                                    {epoch.span}
                                </span>
                            </div>

                            <div className="flex-1 mt-2">
                                <h3 className={`text-xl font-bold text-white mb-2 group-hover:text-${epoch.color}-400 transition-colors`}>
                                    {epoch.title}
                                </h3>
                                <p className="text-sm text-neutral-400 leading-relaxed font-light">
                                    {epoch.description}
                                </p>
                            </div>
                         </Link>
                     ))}
                 </div>
             </div>

             {/* SUB-REGIONAL ONTOLOGY (RIGHT SIDE TOWER) */}
             <div className="lg:col-span-4">
                 <div className="flex items-center mb-10 border-b border-neutral-900 pb-4">
                     <h2 className="text-2xl font-black text-white flex items-center gap-3 tracking-tight">
                        <Globe2 size={24} className="text-emerald-500"/> Sub-Regions
                     </h2>
                 </div>

                 <div className="flex flex-col gap-4">
                     {SUB_REGIONS.map((sub) => (
                         <div 
                            key={sub.id} 
                            className="group p-5 bg-emerald-950/10 border border-emerald-900/20 hover:bg-emerald-950/30 hover:border-emerald-500/40 transition-all duration-300 flex items-center gap-4 cursor-pointer"
                            onClick={() => window.location.href = sub.href}
                         >
                            <div className="p-3 bg-black border border-neutral-800 rounded-lg group-hover:border-emerald-500/50 transition-colors">
                                {sub.icon}
                            </div>
                            <div>
                                <h3 className="text-md font-bold text-white group-hover:text-emerald-400 transition-colors">
                                    {sub.title}
                                </h3>
                                <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mt-1">
                                    {sub.focus}
                                </div>
                            </div>
                         </div>
                     ))}
                 </div>

                 <div className="mt-8 opacity-80 mix-blend-screen">
                     
                 </div>
             </div>
         </div>

         {/* ARCHAEOLOGICAL DECODER */}
         <div className="bg-[#010805] border-y border-neutral-900 py-12 px-8 lg:px-16 -mx-6 lg:-mx-12 mt-16">
             <div className="flex items-center gap-3 mb-10 max-w-7xl mx-auto">
                 <Pickaxe size={20} className="text-neutral-500" />
                 <h3 className="text-sm font-black text-white uppercase tracking-widest">Archaeological Decoder: Radiocarbon Dating</h3>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl mx-auto items-center">
                 <div className="space-y-6">
                     <p className="text-sm text-neutral-400 leading-relaxed font-light">
                         How do we know humans arrived in the Americas 15,000 years ago? We measure the radioactive decay of Carbon-14 found in ancient campfires and bones.
                     </p>
                     <p className="text-sm text-neutral-400 leading-relaxed font-light">
                         While alive, an organism absorbs Carbon-14. When it dies, absorption stops, and the Carbon-14 slowly decays into Nitrogen-14. By measuring the ratio of C-14 remaining, we can pinpoint its exact age.
                     </p>
                     
                 </div>

                 {/* The Half-Life Equation */}
                 <div className="p-8 bg-emerald-950/20 border border-emerald-900/50 rounded-xl flex flex-col justify-center shadow-2xl">
                     <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-6 border-b border-emerald-900/50 pb-2">The Decay Equation</div>
                     <div className="text-xl md:text-3xl text-white font-bold bg-black/60 px-6 py-8 rounded-lg border border-neutral-800 text-center shadow-inner">
                         <M display>{`N(t) = N_0 e^{-\\lambda t}`}</M>
                     </div>
                     <ul className="mt-6 text-xs text-neutral-400 space-y-3 font-mono">
                         <li className="flex items-start gap-3">
                             <strong className="text-white w-10 text-right"><M>N(t)</M></strong> = Remaining Carbon-14
                         </li>
                         <li className="flex items-start gap-3">
                             <strong className="text-emerald-400 w-10 text-right"><M>N_0</M></strong> = Initial Carbon-14 (at time of death)
                         </li>
                         <li className="flex items-start gap-3">
                             <strong className="text-amber-400 w-10 text-right"><M>\lambda</M></strong> = Decay Constant (Half-life is ~5,730 yrs)
                         </li>
                     </ul>
                 </div>
             </div>
         </div>

      </div>
    </main>
  );
}