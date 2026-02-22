"use client";
import React from 'react';
import Link from 'next/link';
import { 
  Heart, Zap, Droplets, Activity, 
  ArrowRight, HeartPulse, Stethoscope, 
  ArrowLeft, ShieldAlert, FileWarning
} from 'lucide-react';
import CardiologyBackground from './_components/CardiologyBackground';
import ECGLab from './_components/ECGLab';

const CURRICULUM = [
  {
    id: 'anatomy',
    title: 'Cardiac Anatomy',
    subtitle: 'Chambers & Valves',
    description: 'The 4-chambered pump. Understanding the flow from Vena Cava to the Aorta, and the valves that prevent backflow.',
    icon: <Heart size={20} className="text-rose-500" />,
    href: '/applied-science/health/specializations/cardiology/anatomy',
    color: 'rose'
  },
  {
    id: 'electrophysiology',
    title: 'Electrophysiology',
    subtitle: 'The Wiring System',
    description: 'The SA Node pacemaker, AV Node delay, and Purkinje fibers. The electrical current that drives the pump.',
    icon: <Zap size={20} className="text-yellow-500" />,
    href: '/applied-science/health/specializations/cardiology/electrophysiology',
    color: 'yellow'
  },
  {
    id: 'hemodynamics',
    title: 'Hemodynamics',
    subtitle: 'Pressure & Resistance',
    description: 'Cardiac Output, Stroke Volume, and Blood Pressure. The physics of moving fluid through closed pipes.',
    icon: <Droplets size={20} className="text-cyan-500" />,
    href: '/applied-science/health/specializations/cardiology/hemodynamics',
    color: 'cyan'
  },
  {
    id: 'pathology',
    title: 'Cardiac Pathology',
    subtitle: 'When the Pump Fails',
    description: 'Myocardial Infarction (Heart Attacks), Arrhythmias, Heart Failure, and structural valve diseases.',
    icon: <Activity size={20} className="text-red-500" />,
    href: '/applied-science/health/specializations/cardiology/pathology',
    color: 'red'
  }
];

const CASE_STUDIES = [
  {
    id: 'commotio-cordis',
    title: 'Commotio Cordis',
    subtitle: 'Kinetic/Electrical Short-Circuit',
    description: 'A blunt impact to the chest at the exact millisecond the heart resets, triggering sudden cardiac arrest.',
    icon: <ShieldAlert size={20} className="text-red-500" />,
    href: '/applied-science/health/specializations/cardiology/case-studies/commotio-cordis',
    tags: ['Trauma', 'V-Fib', 'Electrophysiology']
  },
  {
    id: 'wpw-syndrome',
    title: 'W.P.W. Syndrome',
    subtitle: 'The Rogue Electrical Wire',
    description: 'An accessory pathway bypasses the AV node, creating a slurred Delta Wave and terrifying infinite feedback loops.',
    icon: <Zap size={20} className="text-yellow-500" />,
    href: '/applied-science/health/specializations/cardiology/case-studies/wpw-syndrome',
    tags: ['Electrophysiology', 'SVT', 'ECG']
  }
];

export default function CardiologyHubPage() {
  return (
    <main className="relative min-h-screen bg-[#020000] overflow-hidden selection:bg-red-900/30 font-sans">
      <CardiologyBackground />
      
      <div className="relative z-10 max-w-[90rem] mx-auto px-6 py-12 lg:py-24">
         
         <Link href="/applied-science/health/specializations" className="inline-flex items-center gap-2 text-[10px] font-black tracking-widest text-neutral-500 hover:text-white mb-12 transition-colors uppercase">
             <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform"/> Back to Specializations
         </Link>

         {/* HERO SECTION */}
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24 items-end">
             <div className="lg:col-span-8">
                 <div className="flex items-center gap-3 text-red-500 mb-6 font-mono text-xs font-bold tracking-[0.2em] uppercase">
                     <span className="w-8 h-px bg-red-500"></span>
                     Specialization 04
                 </div>
                 <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none">
                     CARDIOLOGY
                 </h1>
                 <p className="text-xl text-neutral-400 max-w-2xl leading-relaxed font-light">
                     The engine of the human body. It beats 100,000 times a day, pumping 2,000 gallons of blood through 60,000 miles of vessels. 
                     It never rests. <strong className="text-white font-semibold">When it stops, everything stops.</strong>
                 </p>
             </div>
             
             {/* QUICK STATS */}
             <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col justify-end gap-4">
                 <div className="p-5 bg-black/50 backdrop-blur-md rounded-none border-l-4 border-red-500 border-y border-r border-neutral-900">
                     <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">Average Output</div>
                     <div className="text-3xl font-black text-white font-mono">5.0 <span className="text-lg text-red-500">L/min</span></div>
                 </div>
                 <div className="p-5 bg-black/50 backdrop-blur-md rounded-none border-l-4 border-neutral-700 border-y border-r border-neutral-900">
                     <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">Ejection Fraction</div>
                     <div className="text-3xl font-black text-white font-mono">55-70<span className="text-lg text-neutral-500">%</span></div>
                 </div>
             </div>
         </div>

         <div className="mb-24">
             
         </div>

         {/* CONCEPT ZERO: THE ECG */}
         <div className="mb-32">
            <div className="flex items-center gap-3 mb-8">
                 <div className="w-2 h-2 bg-red-500 animate-[pulse_1s_ease-out_infinite] shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>
                 <span className="text-xs font-black text-white uppercase tracking-widest">Concept Zero: Electrical to Mechanical</span>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 bg-black/60 backdrop-blur-xl border border-neutral-800 shadow-2xl">
                <div className="lg:col-span-8 border-b lg:border-b-0 lg:border-r border-neutral-800">
                    <ECGLab />
                </div>
                <div className="lg:col-span-4 p-10 flex flex-col justify-center">
                    <h3 className="text-2xl font-black text-white mb-4 tracking-tight">Reading the Rhythm</h3>
                    <p className="text-sm text-neutral-400 mb-6 leading-relaxed">
                        The heart doesn't just squeeze randomly. It is a highly coordinated, two-stage pump driven by its own internal electrical grid. 
                        <br/><br/>
                        An <strong className="text-red-400">ECG</strong> is simply a camera watching that electricity flow. By reading the bumps on the paper, a cardiologist can see exactly which part of the heart is misfiring, blocked, or damaged.
                    </p>
                </div>
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
             
             {/* CURRICULUM GRID (LEFT SIDE) */}
             <div className="lg:col-span-8">
                 <div className="flex items-center mb-8 border-b border-neutral-900 pb-4">
                     <h2 className="text-2xl font-black text-white flex items-center gap-3 tracking-tight">
                        <HeartPulse size={24} className="text-red-500"/> Core Competencies
                     </h2>
                 </div>

                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     {CURRICULUM.map((lesson) => (
                         <Link 
                            key={lesson.id} 
                            href={lesson.href}
                            className="group relative p-6 bg-black/40 border border-neutral-800 hover:bg-neutral-900 hover:border-red-500/30 transition-all duration-300 flex flex-col gap-4"
                         >
                            <div className="flex justify-between items-start">
                                <div className={`p-3 bg-black border border-neutral-800 group-hover:border-${lesson.color}-500/50 transition-colors`}>
                                    {lesson.icon}
                                </div>
                                <ArrowRight size={16} className="text-neutral-700 group-hover:text-red-500 group-hover:translate-x-1 transition-all" />
                            </div>

                            <div>
                                <h3 className={`text-lg font-bold text-white mb-1 group-hover:text-${lesson.color}-400 transition-colors`}>
                                    {lesson.title}
                                </h3>
                                <div className="text-[9px] font-black text-neutral-600 uppercase tracking-widest mb-3">
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

             {/* CLINICAL CASE STUDIES (RIGHT SIDE TOWER) */}
             <div className="lg:col-span-4">
                 <div className="flex items-center mb-8 border-b border-neutral-900 pb-4">
                     <h2 className="text-2xl font-black text-white flex items-center gap-3 tracking-tight">
                        <FileWarning size={24} className="text-red-500"/> Clinical Cases
                     </h2>
                 </div>

                 <div className="flex flex-col gap-4">
                     {CASE_STUDIES.map((study) => (
                         <Link 
                            key={study.id} 
                            href={study.href}
                            className="group relative p-6 bg-red-950/10 border border-red-900/30 hover:bg-red-950/30 hover:border-red-500/50 transition-all duration-300 overflow-hidden"
                         >
                            {/* Urgent slash pattern background */}
                            <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity" 
                                 style={{ backgroundImage: 'repeating-linear-gradient(45deg, #ef4444 0, #ef4444 1px, transparent 1px, transparent 10px)' }}></div>
                            
                            <div className="relative z-10 flex flex-col gap-4">
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-2">
                                        {study.tags.map(tag => (
                                            <span key={tag} className="text-[8px] font-black text-red-400 bg-red-950/50 px-2 py-1 uppercase tracking-widest border border-red-900/50">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        {study.icon}
                                        <h3 className="text-xl font-black text-white group-hover:text-red-400 transition-colors">
                                            {study.title}
                                        </h3>
                                    </div>
                                    <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-3">
                                        {study.subtitle}
                                    </div>
                                    <p className="text-sm text-neutral-400 leading-relaxed font-light">
                                        {study.description}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 text-xs font-black text-red-500 uppercase tracking-widest mt-2 group-hover:gap-4 transition-all">
                                    Review File <ArrowRight size={14} />
                                </div>
                            </div>
                         </Link>
                     ))}
                     
                     <div className="mt-4">
                         
                     </div>
                 </div>
             </div>
         </div>

         {/* NOTATION DECODER */}
         <div className="bg-[#050000] border-y border-neutral-900 py-12 px-8 lg:px-16 -mx-6 lg:-mx-12">
             <div className="flex items-center gap-3 mb-10 max-w-7xl mx-auto">
                 <Stethoscope size={20} className="text-neutral-500" />
                 <h3 className="text-sm font-black text-white uppercase tracking-widest">Vitals Decoder</h3>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
                 <div className="space-y-3">
                     <div className="text-4xl font-mono text-white mb-2 font-black">120<span className="text-xl text-neutral-600 font-light">/80</span></div>
                     <div className="text-[10px] font-black text-red-500 uppercase tracking-widest">Blood Pressure (BP)</div>
                     <p className="text-sm text-neutral-400 font-light">Systolic (pressure when ventricles squeeze) over Diastolic (pressure when heart relaxes). Measured in mmHg.</p>
                 </div>
                 <div className="space-y-3">
                     <div className="text-4xl font-mono text-white mb-2 font-black">72 <span className="text-sm text-neutral-600 uppercase font-light">bpm</span></div>
                     <div className="text-[10px] font-black text-red-500 uppercase tracking-widest">Heart Rate (HR)</div>
                     <p className="text-sm text-neutral-400 font-light">The rate of the SA node firing. Tachycardia is &gt;100 bpm. Bradycardia is &lt;60 bpm.</p>
                 </div>
                 <div className="space-y-3">
                     <div className="text-4xl font-mono text-white mb-2 font-black">98<span className="text-xl text-neutral-600 font-light">%</span></div>
                     <div className="text-[10px] font-black text-red-500 uppercase tracking-widest">SpO2 (Pulse Ox)</div>
                     <p className="text-sm text-neutral-400 font-light">The percentage of hemoglobin in the blood saturated with oxygen. Below 90% is clinical hypoxia.</p>
                 </div>
             </div>
         </div>

      </div>
    </main>
  );
}