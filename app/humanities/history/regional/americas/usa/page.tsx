"use client";
import React from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Flag, Gavel, 
  Swords, Factory, Globe, 
  Landmark, MapPin
} from 'lucide-react';
import USABackground from './_components/USABackground';
import ExpansionLab from './_components/ExpansionLab';
import { M } from '@/components/Math';

const EPOCHS = [
  {
    id: 'founding',
    title: 'The Founding & Republic',
    span: '1776 – 1850',
    description: 'The drafting of the Constitution, the invention of modern democracy, and the aggressive westward expansion known as Manifest Destiny.',
    icon: <Gavel size={24} className="text-blue-500" />,
    href: '/humanities/history/region/americas/usa/founding'
  },
  {
    id: 'civil-war',
    title: 'Fracture & Civil War',
    span: '1850 – 1877',
    description: 'The paradox of a nation built on liberty harboring chattel slavery. The bloodiest conflict in American history, followed by the broken promises of Reconstruction.',
    icon: <Swords size={24} className="text-red-500" />,
    href: '/humanities/history/region/americas/usa/civil-war'
  },
  {
    id: 'gilded-age',
    title: 'Industry & The Gilded Age',
    span: '1877 – 1914',
    description: 'The explosive rise of rail, steel, and oil. The era of Robber Barons, mass immigration, urbanization, and intense labor struggles.',
    icon: <Factory size={24} className="text-amber-500" />,
    href: '/humanities/history/region/americas/usa/gilded-age'
  },
  {
    id: 'american-century',
    title: 'The American Century',
    span: '1914 – Present',
    description: 'Two World Wars, the Great Depression, the Atomic Age, and the Cold War. The United States assumes the mantle of global democratic hegemon.',
    icon: <Globe size={24} className="text-white" />,
    href: '/humanities/history/region/americas/usa/american-century'
  }
];

export default function USAHistoryPage() {
  return (
    <main className="relative min-h-screen bg-[#010814] overflow-hidden selection:bg-red-900/30 font-sans">
      <USABackground />
      
      <div className="relative z-10 max-w-[90rem] mx-auto px-6 py-12 lg:py-24">
         
         <Link href="/humanities/history/region/americas" className="inline-flex items-center gap-2 text-[10px] font-black tracking-widest text-neutral-500 hover:text-white mb-12 transition-colors uppercase">
             <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform"/> Back to The Americas
         </Link>

         {/* HERO SECTION */}
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24 items-end">
             <div className="lg:col-span-8">
                 <div className="flex items-center gap-3 text-red-500 mb-6 font-mono text-xs font-bold tracking-[0.2em] uppercase">
                     <span className="w-8 h-px bg-red-500"></span>
                     Nation State Profile
                 </div>
                 <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none">
                     UNITED STATES
                 </h1>
                 <p className="text-xl text-neutral-400 max-w-2xl leading-relaxed font-light">
                     A nation founded not on shared blood or ancient geography, but on a philosophical argument. It is a timeline defined by rapid expansion, immense industrial power, and <strong className="text-white font-semibold">profound internal contradiction.</strong>
                 </p>
             </div>
             
             {/* QUICK STATS */}
             <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col justify-end gap-4">
                 <div className="p-5 bg-black/50 backdrop-blur-md rounded-none border-l-4 border-blue-500 border-y border-r border-neutral-900">
                     <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">Founding Charter</div>
                     <div className="text-3xl font-black text-white font-mono">1787 <span className="text-lg text-blue-500">CE</span></div>
                 </div>
                 <div className="p-5 bg-black/50 backdrop-blur-md rounded-none border-l-4 border-red-500 border-y border-r border-neutral-900">
                     <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">Geopolitical Status</div>
                     <div className="text-xl font-black text-white uppercase tracking-wider mt-2">Superpower</div>
                 </div>
             </div>
         </div>

         {/* CONCEPT ZERO: MANIFEST DESTINY */}
         <div className="mb-32">
            <div className="flex items-center gap-3 mb-8">
                 <div className="w-2 h-2 bg-blue-500 animate-[pulse_1.5s_ease-out_infinite] shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                 <span className="text-xs font-black text-white uppercase tracking-widest">Concept Zero: Manifest Destiny</span>
            </div>
            
            <ExpansionLab />
         </div>

         {/* EPOCHS OF US HISTORY */}
         <div className="mb-24">
             <div className="flex items-center mb-10 border-b border-neutral-900 pb-4">
                 <h2 className="text-2xl font-black text-white flex items-center gap-3 tracking-tight">
                    <Flag size={24} className="text-red-500"/> Epochs of The Republic
                 </h2>
             </div>

             

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                 {EPOCHS.map((epoch) => (
                     <Link 
                        key={epoch.id} 
                        href={epoch.href}
                        className="group relative p-8 bg-black/40 border border-neutral-800 hover:bg-[#020d1c] hover:border-blue-500/30 transition-all duration-300 flex flex-col justify-between min-h-[220px] rounded-2xl"
                     >
                        <div>
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 bg-black border border-neutral-800 rounded-xl transition-colors">
                                    {epoch.icon}
                                </div>
                                <span className="text-[10px] font-black font-mono text-red-500/70 bg-red-950/30 px-3 py-1.5 rounded uppercase tracking-widest border border-red-900/30">
                                    {epoch.span}
                                </span>
                            </div>
                            
                            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
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

         {/* DOCUMENT DECODER: THE ELECTORAL COLLEGE */}
         <div className="bg-[#010610] border-y border-neutral-900 py-12 px-8 lg:px-16 -mx-6 lg:-mx-12 mt-16">
             <div className="flex items-center gap-3 mb-10 max-w-7xl mx-auto">
                 <Landmark size={20} className="text-neutral-500" />
                 <h3 className="text-sm font-black text-white uppercase tracking-widest">Constitutional Decoder: The Electoral College</h3>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl mx-auto items-center">
                 <div className="space-y-6">
                     <p className="text-sm text-neutral-400 leading-relaxed">
                         The United States does not elect its President by popular vote. Instead, it uses a mechanism designed by the Founders as a compromise between a vote in Congress and a popular vote by qualified citizens.
                     </p>
                     <p className="text-sm text-neutral-400 leading-relaxed">
                         Every state is assigned a specific number of "Electors." To win the Presidency, a candidate must secure an absolute majority of these electoral votes (currently 270 out of 538).
                     </p>
                 </div>

                 {/* The Math of Representation */}
                 <div className="p-6 bg-blue-950/20 border border-blue-900/50 rounded-xl flex flex-col justify-center">
                     <div className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-4">The Representation Formula</div>
                     <div className="text-xl md:text-2xl text-white font-bold bg-black/50 px-6 py-6 rounded-lg border border-neutral-800 text-center">
                         <M display>{`E = R(p) + S`}</M>
                     </div>
                     <ul className="mt-4 text-xs text-neutral-500 space-y-3 font-mono">
                         <li className="flex items-start gap-2">
                             <strong className="text-white w-4">E</strong> = Total Electoral Votes for a State
                         </li>
                         <li className="flex items-start gap-2">
                             <strong className="text-blue-400 w-4">R</strong> = House Representatives (scaled by state population <M>p</M>)
                         </li>
                         <li className="flex items-start gap-2">
                             <strong className="text-red-400 w-4">S</strong> = Senators (Always exactly 2, protecting small states)
                         </li>
                     </ul>
                 </div>
             </div>
         </div>

      </div>
    </main>
  );
}