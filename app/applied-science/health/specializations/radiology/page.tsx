"use client";
import React from 'react';
import Link from 'next/link';
import { 
  ScanLine, Magnet, Waves, 
  ArrowRight, ArrowLeft, Radiation, Layers, Activity
} from 'lucide-react';
import RadiologyBackground from './_components/RadiologyBackground';
import ImagingLab from './_components/ImagingLab';
import { M } from '@/components/Math'; 

const CURRICULUM = [
  {
    id: 'xray-physics',
    title: 'X-Ray Physics & CT',
    subtitle: 'Ionizing Radiation',
    description: 'How we generate Bremsstrahlung radiation, and how Computed Tomography (CT) spins X-rays to create 3D slices of the body.',
    icon: <Radiation size={20} className="text-white" />,
    href: '/applied-science/health/specializations/radiology/xray-physics',
    color: 'white'
  },
  {
    id: 'mri-physics',
    title: 'MRI Physics',
    subtitle: 'Nuclear Magnetic Resonance',
    description: 'T1 vs T2 weighting. Understanding the quantum spin of protons, precession frequencies, and radiofrequency pulses.',
    icon: <Magnet size={20} className="text-indigo-500" />,
    href: '/applied-science/health/specializations/radiology/mri-physics',
    color: 'indigo'
  },
  {
    id: 'ultrasound',
    title: 'Clinical Sonography',
    subtitle: 'Acoustic Impedance',
    description: 'The piezoelectric effect, Doppler shifts for measuring blood flow velocity, and identifying acoustic shadows.',
    icon: <Waves size={20} className="text-cyan-500" />,
    href: '/applied-science/health/specializations/radiology/ultrasound',
    color: 'cyan'
  },
  {
    id: 'nuclear-medicine',
    title: 'Nuclear Medicine & PET',
    subtitle: 'Functional Imaging',
    description: 'Instead of shooting radiation *through* the patient, we inject radioactive tracers (like fluorodeoxyglucose) to watch organs metabolize in real-time.',
    icon: <Activity size={20} className="text-lime-500" />,
    href: '/applied-science/health/specializations/radiology/nuclear-medicine',
    color: 'lime'
  }
];

export default function RadiologyHubPage() {
  return (
    <main className="relative min-h-screen bg-[#020202] overflow-hidden selection:bg-cyan-900/30 font-sans">
      <RadiologyBackground />
      
      <div className="relative z-10 max-w-[90rem] mx-auto px-6 py-12 lg:py-24">
         
         <Link href="/applied-science/health/specializations" className="inline-flex items-center gap-2 text-[10px] font-black tracking-widest text-neutral-500 hover:text-white mb-12 transition-colors uppercase">
             <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform"/> Back to Specializations
         </Link>

         {/* HERO SECTION */}
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24 items-end">
             <div className="lg:col-span-8">
                 <div className="flex items-center gap-3 text-white mb-6 font-mono text-xs font-bold tracking-[0.2em] uppercase">
                     <span className="w-8 h-px bg-white"></span>
                     Specialization 08
                 </div>
                 <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none">
                     RADIOLOGY
                 </h1>
                 <p className="text-xl text-neutral-400 max-w-2xl leading-relaxed font-light">
                     Before we can fix the biological machine, we must see inside it. 
                     By weaponizing the <strong className="text-white font-semibold">electromagnetic spectrum</strong> and <strong className="text-white font-semibold">acoustic physics</strong>, we turn the human body into glass.
                 </p>
             </div>
             
             {/* QUICK STATS */}
             <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col justify-end gap-4">
                 <div className="p-5 bg-black/50 backdrop-blur-md rounded-none border-l-4 border-white border-y border-r border-neutral-900">
                     <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">Standard X-Ray Energy</div>
                     <div className="text-3xl font-black text-white font-mono">30-150 <span className="text-lg text-neutral-500">keV</span></div>
                 </div>
                 <div className="p-5 bg-black/50 backdrop-blur-md rounded-none border-l-4 border-indigo-500 border-y border-r border-neutral-900">
                     <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">Clinical MRI Magnet</div>
                     <div className="text-3xl font-black text-white font-mono">1.5 - 3.0 <span className="text-lg text-indigo-400">Tesla</span></div>
                 </div>
             </div>
         </div>

         

         {/* CONCEPT ZERO: THE MODALITY MATRIX */}
         <div className="mb-32">
            <div className="flex items-center gap-3 mb-8">
                 <div className="w-2 h-2 bg-white animate-[pulse_1.5s_ease-out_infinite] shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
                 <span className="text-xs font-black text-white uppercase tracking-widest">Concept Zero: Choosing the Right Tool</span>
            </div>
            
            <ImagingLab />
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
             
             {/* CURRICULUM GRID */}
             <div className="lg:col-span-12">
                 <div className="flex items-center mb-8 border-b border-neutral-900 pb-4">
                     <h2 className="text-2xl font-black text-white flex items-center gap-3 tracking-tight">
                        <Layers size={24} className="text-white"/> Core Physics & Imaging
                     </h2>
                 </div>

                 

                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                     {CURRICULUM.map((lesson) => (
                         <Link 
                            key={lesson.id} 
                            href={lesson.href}
                            className="group relative p-6 bg-black/40 border border-neutral-800 hover:bg-neutral-900 transition-all duration-300 flex flex-col gap-4"
                            style={{ borderTopColor: `var(--tw-colors-${lesson.color}-500, #444)` }} // Top accent line
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

         

         {/* NOTATION DECODER -> DENSITY DECODER */}
         <div className="bg-[#050505] border-y border-neutral-900 py-12 px-8 lg:px-16 -mx-6 lg:-mx-12 mt-16">
             <div className="flex items-center gap-3 mb-10 max-w-7xl mx-auto">
                 <ScanLine size={20} className="text-neutral-500" />
                 <h3 className="text-sm font-black text-white uppercase tracking-widest">The Lexicon of Density</h3>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl mx-auto">
                 {/* X-Ray / CT Vocabulary */}
                 <div className="space-y-6">
                     <h4 className="text-white border-b border-neutral-800 pb-2 font-mono text-sm tracking-widest uppercase">X-Ray & CT (Density)</h4>
                     <div className="space-y-4">
                         <div>
                             <div className="flex items-center gap-2 mb-1">
                                 <span className="w-4 h-4 rounded bg-white border border-neutral-500"></span>
                                 <strong className="text-white">Radiopaque (Hyperdense)</strong>
                             </div>
                             <p className="text-sm text-neutral-400 pl-6">Blocks X-rays. Appears <strong className="text-white">White</strong>. Examples: Bone, Metal implants, Barium contrast.</p>
                         </div>
                         <div>
                             <div className="flex items-center gap-2 mb-1">
                                 <span className="w-4 h-4 rounded bg-black border border-neutral-500"></span>
                                 <strong className="text-neutral-400">Radiolucent (Hypodense)</strong>
                             </div>
                             <p className="text-sm text-neutral-400 pl-6">X-rays pass right through. Appears <strong className="text-black bg-neutral-300 px-1">Black</strong>. Examples: Air in lungs, bowel gas.</p>
                         </div>
                     </div>
                 </div>

                 {/* MRI Vocabulary */}
                 <div className="space-y-6">
                     <h4 className="text-indigo-400 border-b border-indigo-900/30 pb-2 font-mono text-sm tracking-widest uppercase">MRI (Signal Intensity)</h4>
                     <div className="space-y-4">
                         <div>
                             <div className="flex items-center gap-2 mb-1">
                                 <span className="w-4 h-4 rounded bg-white border border-indigo-500"></span>
                                 <strong className="text-white">Hyperintense</strong>
                             </div>
                             <p className="text-sm text-neutral-400 pl-6">Returns a strong radio signal. Appears <strong className="text-white">White/Bright</strong>. Example: Fat (on T1), Water/Edema (on T2).</p>
                         </div>
                         <div>
                             <div className="flex items-center gap-2 mb-1">
                                 <span className="w-4 h-4 rounded bg-black border border-indigo-500"></span>
                                 <strong className="text-neutral-400">Hypointense</strong>
                             </div>
                             <p className="text-sm text-neutral-400 pl-6">Returns weak/no signal. Appears <strong className="text-black bg-neutral-300 px-1">Black/Dark</strong>. Example: Cortical bone (has no mobile water), flowing blood.</p>
                         </div>
                     </div>
                 </div>
             </div>
             
             {/* Math Callout just to flex the M component on the landing page */}
             <div className="max-w-7xl mx-auto mt-16 p-6 bg-neutral-900/30 border border-neutral-800 rounded-xl flex items-center justify-between">
                 <div>
                     <div className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">The Larmor Equation (MRI Core Physics)</div>
                     <p className="text-sm text-neutral-400 max-w-lg">The frequency at which a proton spins (precesses) is directly proportional to the strength of the magnetic field it is inside.</p>
                 </div>
                 <div className="text-2xl text-indigo-400">
                     <M display>{`\\omega = \\gamma B_0`}</M>
                 </div>
             </div>
         </div>

      </div>
    </main>
  );
}