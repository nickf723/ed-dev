"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  HeartPulse, Brain, Bone, ScanLine, 
  TestTube2, Eye, Stethoscope, ArrowLeft, 
  Pill,  Ear, Wind, Activity, Hexagon 
} from 'lucide-react';
import SpecializationBackground from './_components/SpecializationBackground';

// The Deep Ontology of Medical Sciences
const SPECIALTIES = [
  // --- LEFT COLUMN (Head, Chest, Core) ---
  {
    id: 'neurology',
    title: 'Neurology',
    subtitle: 'Central Nervous System',
    icon: <Brain size={20} />,
    href: '/applied-science/health/specializations/neurology',
    color: 'indigo',
    nodeX: 150, nodeY: 40,
    // Effect: Synaptic electrical flashes
    effectClass: 'hover:shadow-[0_0_20px_#6366f1,inset_0_0_15px_#6366f1] transition-shadow duration-75',
  },
  {
    id: 'ophthalmology',
    title: 'Ophthalmology',
    subtitle: 'Visual System',
    icon: <Eye size={20} />,
    href: '/applied-science/health/specializations/ophthalmology',
    color: 'blue',
    nodeX: 150, nodeY: 60,
    // Effect: Starts slightly blurred, snaps into hyper-focus
    effectClass: 'blur-[1px] hover:blur-none hover:ring-2 hover:ring-blue-500 hover:scale-105 transition-all duration-300',
  },
  {
    id: 'otolaryngology',
    title: 'Otolaryngology',
    subtitle: 'Ear, Nose & Throat (ENT)',
    icon: <Ear size={20} />,
    href: '/applied-science/health/specializations/otolaryngology',
    color: 'teal',
    nodeX: 150, nodeY: 75,
    // Effect: Sonar acoustic rings expanding
    effectClass: 'hover:animate-[pulse_1s_ease-out_infinite] hover:border-teal-400',
  },
  {
    id: 'dentistry',
    title: 'Dentistry',
    subtitle: 'Oral Maxillofacial',
    icon: <Eye size={20} />,
    href: '/applied-science/health/specializations/dentistry',
    color: 'zinc',
    nodeX: 150, nodeY: 90,
    // Effect: A sharp, bright white gleam sweeping across
    effectClass: 'hover:bg-neutral-800 hover:border-white relative overflow-hidden group-hover:before:animate-gleam',
  },
  {
    id: 'pulmonology',
    title: 'Pulmonology',
    subtitle: 'Respiratory System',
    icon: <Wind size={20} />,
    href: '/applied-science/health/specializations/pulmonology',
    color: 'sky',
    nodeX: 130, nodeY: 140, // Left lung (mirrored in SVG)
    // Effect: Slow, deep breathing expansion and contraction
    effectClass: 'hover:animate-[breathe_4s_ease-in-out_infinite] hover:border-sky-400',
  },
  {
    id: 'cardiology',
    title: 'Cardiology',
    subtitle: 'Cardiovascular System',
    icon: <HeartPulse size={20} />,
    href: '/applied-science/health/specializations/cardiology',
    color: 'red',
    nodeX: 165, nodeY: 150, // Heart
    // Effect: Rapid, double-beat heartbeat
    effectClass: 'hover:animate-[heartbeat_1s_ease-in-out_infinite] hover:bg-red-950/30 hover:border-red-500',
  },
  {
    id: 'gastroenterology',
    title: 'Gastroenterology',
    subtitle: 'Digestive Tract',
    icon: <Pill size={20} />,
    href: '/applied-science/health/specializations/gastroenterology',
    color: 'orange',
    nodeX: 150, nodeY: 200,
    // Effect: Dissolving/bubbling gradient from the bottom
    effectClass: 'hover:bg-gradient-to-t hover:from-orange-900/40 hover:to-neutral-900 transition-all duration-500',
  },

  // --- RIGHT COLUMN (Systems, Imaging, Diagnostics) ---
  {
    id: 'hepatology',
    title: 'Hepatology',
    subtitle: 'Liver, Gallbladder & Pancreas',
    icon: <Hexagon size={20} />,
    href: '/applied-science/health/specializations/hepatology',
    color: 'amber',
    nodeX: 135, nodeY: 180,
    // Effect: Deep, slow chemical filtering glow
    effectClass: 'hover:bg-amber-950/20 hover:shadow-[inset_0_-20px_30px_rgba(245,158,11,0.1)]',
  },
  {
    id: 'nephrology',
    title: 'Nephrology',
    subtitle: 'Renal System (Kidneys)',
    icon: <Activity size={20} />,
    href: '/applied-science/health/specializations/nephrology',
    color: 'cyan',
    nodeX: 130, nodeY: 220,
    // Effect: Liquid flow / fluid dynamics
    effectClass: 'hover:border-cyan-500/50 hover:bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 to-transparent',
  },
  {
    id: 'orthopedics',
    title: 'Orthopedics',
    subtitle: 'Musculoskeletal System',
    icon: <Bone size={20} />,
    href: '/applied-science/health/specializations/orthopedics',
    color: 'stone',
    nodeX: 100, nodeY: 170, // Arm bone
    // Effect: Rigid, sharp, highly structured snapping into place
    effectClass: 'hover:rounded-none hover:border-2 hover:border-stone-300 hover:scale-[1.02] transition-all duration-100',
  },
  {
    id: 'endocrinology',
    title: 'Endocrinology',
    subtitle: 'Hormonal Networks',
    icon: <TestTube2 size={20} />,
    href: '/applied-science/health/specializations/endocrinology',
    color: 'fuchsia',
    nodeX: 150, nodeY: 120, // Thyroid area
    // Effect: Ambient, systemic pulsing that spreads outward
    effectClass: 'hover:shadow-[0_0_40px_-10px_#d946ef] hover:border-fuchsia-500/30 transition-all duration-700',
  },
  {
    id: 'dermatology',
    title: 'Dermatology',
    subtitle: 'Integumentary System',
    icon: <ScanLine size={20} />,
    href: '/applied-science/health/specializations/dermatology',
    color: 'rose',
    nodeX: 200, nodeY: 140, // Outer edge/skin
    // Effect: Smooth, sweeping surface highlight
    effectClass: 'hover:bg-gradient-to-r hover:from-neutral-900 hover:via-rose-950/20 hover:to-neutral-900 bg-[length:200%_auto] hover:animate-[sweep_2s_linear_infinite]',
  },
  {
    id: 'oncology',
    title: 'Oncology',
    subtitle: 'Cellular Pathology',
    icon: <TestTube2 size={20} />,
    href: '/applied-science/health/specializations/oncology',
    color: 'emerald',
    nodeX: 180, nodeY: 250,
    // Effect: Erratic, microscopic cell-division aesthetic
    effectClass: 'hover:border-dashed hover:border-emerald-500 hover:bg-emerald-950/10',
  },
  {
    id: 'radiology',
    title: 'Radiology',
    subtitle: 'Diagnostic Imaging',
    icon: <ScanLine size={20} />,
    href: '/applied-science/health/specializations/radiology',
    color: 'white',
    nodeX: 150, nodeY: 160, // Penetrating core
    // Effect: X-Ray / Invert filter
    effectClass: 'hover:backdrop-invert hover:bg-white/10 hover:border-white hover:text-black transition-all duration-200',
  }
];

export default function SpecializationsHubPage() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const leftCol = SPECIALTIES.slice(0, 7);
  const rightCol = SPECIALTIES.slice(7, 14);

  return (
    <main className="relative min-h-screen bg-black overflow-hidden selection:bg-violet-900/30 font-sans">
      {/* INJECT CUSTOM ANIMATIONS */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes gleam {
          0% { left: -100%; }
          50% { left: 100%; }
          100% { left: 100%; }
        }
        .before\\:animate-gleam::before {
          content: '';
          position: absolute;
          top: 0;
          width: 50%;
          height: 100%;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.15), transparent);
          transform: skewX(-20deg);
          animation: gleam 2s infinite;
        }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          15% { transform: scale(1.05); }
          30% { transform: scale(1); }
          45% { transform: scale(1.05); }
        }
        @keyframes breathe {
          0%, 100% { transform: scale(1); border-color: rgba(56, 189, 248, 0.2); }
          50% { transform: scale(1.02); border-color: rgba(56, 189, 248, 0.8); }
        }
        @keyframes sweep {
          to { background-position: 200% center; }
        }
      `}} />

      <SpecializationBackground />
      
      <div className="relative z-10 max-w-[90rem] mx-auto px-6 py-12 lg:py-24">
         
         <Link href="/applied-science/health" className="inline-flex items-center gap-2 text-xs font-bold text-neutral-500 hover:text-white mb-12 transition-colors group">
             <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform"/> BACK TO HEALTH SCIENCES
         </Link>

         {/* HEADER */}
         <div className="mb-16">
             <div className="flex items-center gap-3 text-violet-500 mb-4 font-mono text-sm tracking-widest uppercase">
                 <span className="w-8 h-px bg-violet-500"></span>
                 Focused Disciplines
             </div>
             <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
                 THE CLINICAL ATLAS
             </h1>
         </div>

         {/* INTERACTIVE ATLAS LAYOUT */}
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
             
             {/* LEFT COLUMN: CARDS */}
             <div className="lg:col-span-4 flex flex-col gap-3">
                 {leftCol.map((spec) => (
                     <SpecCard 
                        key={spec.id} spec={spec} 
                        isHovered={hoveredId === spec.id}
                        onHover={() => setHoveredId(spec.id)}
                        onLeave={() => setHoveredId(null)}
                     />
                 ))}
             </div>

             {/* CENTER COLUMN: SVG BODY MAP */}
             <div className="lg:col-span-4 hidden lg:flex justify-center items-center h-[700px] relative">
                 <svg viewBox="0 0 300 500" className="w-full h-full drop-shadow-2xl">
                    {/* Minimalist Abstract Silhouette */}
                    <path 
                        d="M 150 20 
                           C 120 20, 120 70, 150 80 
                           C 180 70, 180 20, 150 20 Z 
                           M 150 90 
                           C 100 90, 70 110, 70 160 
                           L 85 320 
                           C 85 360, 140 360, 150 360 
                           C 160 360, 215 360, 215 320 
                           L 230 160 
                           C 230 110, 200 90, 150 90 Z" 
                        fill="rgba(255, 255, 255, 0.02)" 
                        stroke="rgba(255, 255, 255, 0.1)" 
                        strokeWidth="1"
                    />

                    {/* Plotting the Nodes */}
                    {SPECIALTIES.map((spec) => {
                        const isNodeHovered = hoveredId === spec.id;
                        
                        // Handle dual nodes (like Lungs and Kidneys)
                        const drawNode = (cx: number, cy: number, keySuffix: string) => (
                            <g key={`node-${spec.id}-${keySuffix}`} className="transition-all duration-500">
                                <circle 
                                    cx={cx} cy={cy} 
                                    r={isNodeHovered ? 20 : 4} 
                                    fill="none"
                                    stroke={isNodeHovered ? `var(--tw-colors-${spec.color}-500, #a78bfa)` : 'transparent'}
                                    strokeWidth="1"
                                    className={`transition-all duration-300 ${isNodeHovered ? 'opacity-50 scale-100' : 'opacity-0 scale-50'}`}
                                />
                                <circle 
                                    cx={cx} cy={cy} 
                                    r={isNodeHovered ? 6 : 3} 
                                    fill={isNodeHovered ? `var(--tw-colors-${spec.color}-400, #fff)` : '#444'} 
                                    className={`transition-colors duration-300 ${isNodeHovered ? 'drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]' : ''}`}
                                />
                            </g>
                        );

                        return (
                            <React.Fragment key={spec.id}>
                                {drawNode(spec.nodeX, spec.nodeY, 'primary')}
                                {/* Mirror Lung/Kidney nodes for symmetry if needed based on the ID */}
                                {spec.id === 'pulmonology' && drawNode(170, spec.nodeY, 'secondary')}
                                {spec.id === 'nephrology' && drawNode(170, spec.nodeY, 'secondary')}
                            </React.Fragment>
                        );
                    })}
                 </svg>
             </div>

             {/* RIGHT COLUMN: CARDS */}
             <div className="lg:col-span-4 flex flex-col gap-3">
                 {rightCol.map((spec) => (
                     <SpecCard 
                        key={spec.id} spec={spec} 
                        isHovered={hoveredId === spec.id}
                        onHover={() => setHoveredId(spec.id)}
                        onLeave={() => setHoveredId(null)}
                     />
                 ))}
             </div>

         </div>
      </div>
    </main>
  );
}

// Interactive Card Component
function SpecCard({ spec, isHovered, onHover, onLeave }: any) {
    // Dynamic color classes for icons and text
    const colorMap: Record<string, string> = {
        indigo: 'text-indigo-400 border-indigo-500/50',
        blue: 'text-blue-400 border-blue-500/50',
        teal: 'text-teal-400 border-teal-500/50',
        zinc: 'text-zinc-300 border-zinc-500/50',
        sky: 'text-sky-400 border-sky-500/50',
        red: 'text-red-500 border-red-500/50',
        orange: 'text-orange-400 border-orange-500/50',
        amber: 'text-amber-400 border-amber-500/50',
        cyan: 'text-cyan-400 border-cyan-500/50',
        stone: 'text-stone-400 border-stone-500/50',
        fuchsia: 'text-fuchsia-400 border-fuchsia-500/50',
        rose: 'text-rose-400 border-rose-500/50',
        emerald: 'text-emerald-400 border-emerald-500/50',
        white: 'text-white border-white/50',
    };

    const activeColors = colorMap[spec.color as keyof typeof colorMap] || 'text-white border-white/50';
    const [textColor, borderColor] = activeColors.split(' ');

    return (
        <Link 
            href={spec.href}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            className={`
                group p-3 rounded-xl border border-neutral-800 bg-neutral-900/40 
                flex items-center gap-4 cursor-pointer relative z-0
                ${isHovered ? spec.effectClass : ''}
                ${isHovered ? 'z-10' : ''}
            `}
        >
            <div className={`p-2.5 rounded-lg bg-black border border-neutral-800 transition-colors duration-300 ${isHovered ? borderColor : ''}`}>
                <div className={`${isHovered ? textColor : 'text-neutral-500'} transition-colors duration-300`}>
                    {spec.icon}
                </div>
            </div>
            
            <div className="flex-1">
                <h3 className={`text-base font-bold transition-colors duration-300 ${isHovered ? textColor : 'text-neutral-300'}`}>
                    {spec.title}
                </h3>
                <div className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest mt-0.5">
                    {spec.subtitle}
                </div>
            </div>
        </Link>
    );
}