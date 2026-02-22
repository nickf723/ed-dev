"use client";
import React from 'react';
import Link from 'next/link';
import { 
   Bug, Wrench, Sparkles, 
  ArrowRight, ArrowLeft, AlignEndVertical, Microscope
} from 'lucide-react';
import DentistryBackground from './_components/DentistryBackground';
import ToothLab from './_components/ToothLab';
import { M } from '@/components/Math'; 

const CURRICULUM = [
  {
    id: 'cariology',
    title: 'Cariology & Pathology',
    subtitle: 'The Micro-War',
    description: 'The chemical battle between Streptococcus mutans producing lactic acid, and your saliva trying to remineralize the enamel.',
    icon: <Bug size={20} className="text-yellow-500" />,
    href: '/applied-science/health/specializations/dentistry/cariology',
    color: 'yellow'
  },
  {
    id: 'periodontics',
    title: 'Periodontics',
    subtitle: 'Foundation & Gums',
    description: 'The supporting structures of teeth. How tartar triggers chronic immune inflammation, melting the jawbone away.',
    icon: <AlignEndVertical size={20} className="text-rose-500" />,
    href: '/applied-science/health/specializations/dentistry/periodontics',
    color: 'rose'
  },
  {
    id: 'restorative',
    title: 'Restorative & Prosthetics',
    subtitle: 'Material Science',
    description: 'Rebuilding lost anatomy using composite resins, porcelain crowns, and titanium root implants integrated into the bone.',
    icon: <Wrench size={20} className="text-zinc-400" />,
    href: '/applied-science/health/specializations/dentistry/restorative',
    color: 'zinc'
  },
  {
    id: 'orthodontics',
    title: 'Orthodontics',
    subtitle: 'Bio-Mechanics',
    description: 'Applying sustained, low-level force to intentionally trigger bone remodeling, dragging teeth through solid jawbone.',
    icon: <Sparkles size={20} className="text-teal-500" />,
    href: '/applied-science/health/specializations/dentistry/orthodontics',
    color: 'teal'
  }
];

export default function DentistryHubPage() {
  return (
    <main className="relative min-h-screen bg-[#020505] overflow-hidden selection:bg-teal-900/30 font-sans">
      <DentistryBackground />
      
      <div className="relative z-10 max-w-[90rem] mx-auto px-6 py-12 lg:py-24">
         
         <Link href="/applied-science/health/specializations" className="inline-flex items-center gap-2 text-[10px] font-black tracking-widest text-neutral-500 hover:text-white mb-12 transition-colors uppercase">
             <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform"/> Back to Specializations
         </Link>

         {/* HERO SECTION */}
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24 items-end">
             <div className="lg:col-span-8">
                 <div className="flex items-center gap-3 text-teal-500 mb-6 font-mono text-xs font-bold tracking-[0.2em] uppercase">
                     <span className="w-8 h-px bg-teal-500"></span>
                     Specialization 03
                 </div>
                 <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none">
                     DENTISTRY
                 </h1>
                 <p className="text-xl text-neutral-400 max-w-2xl leading-relaxed font-light">
                     The gateway to the biological system. It is a highly localized warzone where <strong className="text-white font-semibold">material science</strong>, <strong className="text-white font-semibold">biomechanics</strong>, and <strong className="text-white font-semibold">bacteriology</strong> collide at the hardest substance in the human body.
                 </p>
             </div>
             
             {/* QUICK STATS */}
             <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col justify-end gap-4">
                 <div className="p-5 bg-black/50 backdrop-blur-md rounded-none border-l-4 border-white border-y border-r border-neutral-900">
                     <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">Enamel Hardness (Mohs)</div>
                     <div className="text-3xl font-black text-white font-mono">5.0 <span className="text-lg text-neutral-500">/ 10</span></div>
                 </div>
                 <div className="p-5 bg-black/50 backdrop-blur-md rounded-none border-l-4 border-rose-500 border-y border-r border-neutral-900">
                     <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">Bite Force (Molars)</div>
                     <div className="text-3xl font-black text-white font-mono">150 - 200 <span className="text-lg text-rose-400">lbs</span></div>
                 </div>
             </div>
         </div>

         

[Image of human tooth cross-section anatomy]


         {/* CONCEPT ZERO: THE DECAY SIMULATOR */}
         <div className="mb-32">
            <div className="flex items-center gap-3 mb-8">
                 <div className="w-2 h-2 bg-teal-500 animate-[pulse_1.5s_ease-out_infinite] shadow-[0_0_10px_rgba(20,184,166,0.8)]"></div>
                 <span className="text-xs font-black text-white uppercase tracking-widest">Concept Zero: Acid vs. Armor</span>
            </div>
            
            <ToothLab />
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
             
             {/* CURRICULUM GRID */}
             <div className="lg:col-span-12">
                 <div className="flex items-center mb-8 border-b border-neutral-900 pb-4">
                     <h2 className="text-2xl font-black text-white flex items-center gap-3 tracking-tight">
                        <Microscope size={24} className="text-teal-500"/> Core Sciences
                     </h2>
                 </div>

                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                     {CURRICULUM.map((lesson) => (
                         <Link 
                            key={lesson.id} 
                            href={lesson.href}
                            className="group relative p-6 bg-black/40 border border-neutral-800 hover:bg-neutral-900 transition-all duration-300 flex flex-col gap-4"
                            style={{ borderTopColor: `var(--tw-colors-${lesson.color}-500, #444)` }} 
                         >
                            <div className="flex justify-between items-start">
                                <div className={`p-3 bg-black border border-neutral-800 transition-colors`}>
                                    {lesson.icon}
                                </div>
                                <ArrowRight size={16} className={`text-neutral-700 group-hover:text-${lesson.color}-500 group-hover:translate-x-1 transition-all`} />
                            </div>

                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-white transition-colors">
                                    {lesson.title}
                                </h3>
                                <div className={`text-[9px] font-black text-${lesson.color}-500/70 uppercase tracking-widest mb-3`}>
                                    {lesson.subtitle}
                                </div>
                                <p className="text-sm text-neutral-400 leading-relaxed font-light">
                                    {lesson.description}
                                </p>
                            </div>
                         </Link>
                     ))}
                 </div>
             </div>
         </div>

         

[Image of universal tooth numbering system chart]


         {/* NOTATION DECODER */}
         <div className="bg-[#050909] border-y border-neutral-900 py-12 px-8 lg:px-16 -mx-6 lg:-mx-12 mt-16">
             <div className="flex items-center gap-3 mb-10 max-w-7xl mx-auto">
                 <Sparkles size={20} className="text-neutral-500" />
                 <h3 className="text-sm font-black text-white uppercase tracking-widest">Dental Charting Decoder</h3>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl mx-auto">
                 {/* Numbering System */}
                 <div className="space-y-6">
                     <h4 className="text-white border-b border-neutral-800 pb-2 font-mono text-sm tracking-widest uppercase">Universal Numbering (1-32)</h4>
                     <div className="space-y-4">
                         <div>
                             <strong className="text-white text-lg font-mono">1, 16, 17, 32</strong>
                             <p className="text-sm text-neutral-400 mt-1">The four <strong className="text-teal-300">Wisdom Teeth</strong> (Third Molars). Located at the far corners of the jaw. Often impacted and extracted.</p>
                         </div>
                         <div>
                             <strong className="text-white text-lg font-mono">8 & 9</strong>
                             <p className="text-sm text-neutral-400 mt-1">The upper <strong className="text-teal-300">Central Incisors</strong>. The two most prominent front teeth, crucial for aesthetics and biting.</p>
                         </div>
                     </div>
                 </div>

                 {/* Surface Vocab */}
                 <div className="space-y-6">
                     <h4 className="text-teal-400 border-b border-teal-900/30 pb-2 font-mono text-sm tracking-widest uppercase">Tooth Surfaces</h4>
                     <div className="grid grid-cols-2 gap-4">
                         <div>
                             <strong className="text-white">Occlusal (O)</strong>
                             <p className="text-xs text-neutral-400 mt-1">The flat, chewing surface of back teeth. Where most cavities start.</p>
                         </div>
                         <div>
                             <strong className="text-white">Interproximal (M/D)</strong>
                             <p className="text-xs text-neutral-400 mt-1">The space <em>between</em> teeth. Mesial is toward the front, Distal is toward the back. Requires flossing.</p>
                         </div>
                         <div>
                             <strong className="text-white">Facial/Buccal (F/B)</strong>
                             <p className="text-xs text-neutral-400 mt-1">The outside surface of the tooth, touching the cheeks or lips.</p>
                         </div>
                         <div>
                             <strong className="text-white">Lingual (L)</strong>
                             <p className="text-xs text-neutral-400 mt-1">The inside surface of the tooth, touching the tongue.</p>
                         </div>
                     </div>
                 </div>
             </div>
             
             {/* Chemistry Callout */}
             <div className="max-w-7xl mx-auto mt-16 p-6 bg-teal-950/20 border border-teal-900/50 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6">
                 <div>
                     <div className="text-xs font-bold text-teal-500 uppercase tracking-widest mb-2">The Armor: Hydroxyapatite</div>
                     <p className="text-sm text-neutral-400 max-w-lg leading-relaxed">The chemical structure of tooth enamel. When exposed to fluoride, the <M>{`\\text{OH}^{-}`}</M> ion is replaced by a Fluoride ion, forming <em>Fluorapatite</em>—a compound significantly more resistant to bacterial acid.</p>
                 </div>
                 <div className="text-xl md:text-2xl text-white font-bold bg-black/50 px-6 py-4 rounded-lg border border-neutral-800">
                     <M display>{`\\text{Ca}_{10}(\\text{PO}_4)_6(\\text{OH})_2`}</M>
                 </div>
             </div>
         </div>

      </div>
    </main>
  );
}