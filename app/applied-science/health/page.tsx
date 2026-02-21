"use client";
import React from 'react';
import Link from 'next/link';
import { 
  Activity, Microscope, TestTube, 
  Stethoscope, Syringe, Scissors, 
  Apple, Dumbbell, Brain, Globe, 
  ArrowRight, Lock, 
  HeartPulse
} from 'lucide-react';
import HealthBackground from './_components/HealthBackground';

type Lesson = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color: string;
  status?: 'locked' | 'open';
};

const LESSONS: Lesson[] = [
  {
    id: 'anatomy',
    title: 'Anatomy & Physiology',
    subtitle: 'The Biological Machine',
    description: 'The structural mapping and functional systems of the human body.',
    icon: <Activity size={20} className="text-cyan-500" />,
    href: 'applied-science/health/anatomy',
    color: 'cyan'
  },
  {
    id: 'pathology',
    title: 'Pathology & Immunology',
    subtitle: 'System Failures',
    description: 'The study of disease, pathogens, and the body\'s cellular defense mechanisms.',
    icon: <Microscope size={20} className="text-rose-500" />,
    href: 'applied-science/health/pathology',
    color: 'rose'
  },
  {
    id: 'pharmacology',
    title: 'Pharmacology',
    subtitle: 'Chemical Intervention',
    description: 'How drugs interact with biological systems to alter function or treat disease.',
    icon: <TestTube size={20} className="text-purple-500" />,
    href: 'applied-science/health/pharmacology',
    color: 'purple'
  },
  {
    id: 'clinical',
    title: 'Clinical Practice',
    subtitle: 'Medicine & Nursing',
    description: 'The applied science of patient diagnosis, care, and treatment protocols.',
    icon: <Stethoscope size={20} className="text-blue-500" />,
    href: 'applied-science/health/clinical',
    color: 'blue'
  },
  {
    id: 'surgery',
    title: 'Surgery',
    subtitle: 'Mechanical Intervention',
    description: 'Operative manual and instrumental techniques to investigate or treat conditions.',
    icon: <Scissors size={20} className="text-zinc-400" />,
    href: 'applied-science/health/surgery',
    color: 'zinc'
  },
  {
    id: 'mental-health',
    title: 'Psychiatry & Psychology',
    subtitle: 'The Cognitive System',
    description: 'The intersection of neurology and behavior, focusing on mental health.',
    icon: <Brain size={20} className="text-indigo-500" />,
    href: 'applied-science/health/mental-health',
    color: 'indigo'
  },
  {
    id: 'nutrition',
    title: 'Nutrition & Dietetics',
    subtitle: 'System Fuel',
    description: 'The biochemical processing of macronutrients and their impact on longevity.',
    icon: <Apple size={20} className="text-green-500" />,
    href: 'applied-science/health/nutrition',
    color: 'green'
  },
  {
    id: 'kinesiology',
    title: 'Kinesiology & Fitness',
    subtitle: 'Movement Optimization',
    description: 'Biomechanics, physical conditioning, and rehabilitative sciences.',
    icon: <Dumbbell size={20} className="text-amber-500" />,
    href: 'applied-science/health/kinesiology',
    color: 'amber'
  },
  {
    id: 'public-health',
    title: 'Public Health',
    subtitle: 'Macro Epidemiology',
    description: 'Health outcomes, disease tracking, and preventative measures at the population scale.',
    icon: <Globe size={20} className="text-teal-500" />,
    href: 'applied-science/health/public-health',
    color: 'teal'
  },
  {
    id: 'specializations',
    title: 'Specializations',
    subtitle: 'Specialized Fields',
    description: 'Explore the various specialized fields within health sciences.',
    icon: <HeartPulse size={20} className="text-pink-500" />,
    href: '/health/specializations',
    color: 'pink'
  }
];

export default function HealthHubPage() {
  return (
    <main className="relative min-h-screen bg-black overflow-hidden selection:bg-rose-900/30 font-sans">
      <HealthBackground />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
         
         {/* HEADER */}
         <div className="mb-20">
             <div className="flex items-center gap-3 text-rose-500 mb-4 font-mono text-sm tracking-widest uppercase">
                 <span className="w-8 h-px bg-rose-500"></span>
                 Life Sciences
             </div>
             <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter">
                 HEALTH SCIENCES
             </h1>
             <p className="text-xl text-neutral-400 max-w-2xl leading-relaxed">
                 The study of the most complex machine known to science: The Human Body. 
                 Explore how it is <span className="text-white font-bold">structured</span>, how it <span className="text-rose-400 font-bold">breaks</span>, and how we <span className="text-cyan-400 font-bold">fix</span> it.
             </p>
         </div>

         {/* ONTOLOGY GRID */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {LESSONS.map((lesson, idx) => {
                 const isLocked = lesson.status === 'locked';

                 return (
                 <Link 
                    key={lesson.id}
                    href={isLocked ? '#' : lesson.href}
                    className={`
                        group relative p-8 rounded-2xl border transition-all duration-300 flex flex-col
                        ${
                            isLocked
                            ? 'bg-neutral-900/20 border-neutral-800 cursor-not-allowed opacity-60 grayscale' 
                            : 'bg-neutral-900/40 border-neutral-800 hover:bg-neutral-900 hover:border-rose-500/30 hover:-translate-y-1 hover:shadow-2xl'}
                    `}
                 >
                    <div className="flex justify-between items-start mb-6">
                        <div className={`p-3 rounded-xl bg-black border border-neutral-800 group-hover:border-${lesson.color}-500/50 transition-colors`}>
                            {lesson.icon}
                        </div>
                        <div className="text-xs font-black text-neutral-700 font-mono">
                            HS.{String(idx + 1).padStart(2, '0')}
                        </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-rose-400 transition-colors">
                        {lesson.title}
                    </h3>
                    <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-wide mb-4">
                        {lesson.subtitle}
                    </div>
                    <p className="text-sm text-neutral-400 leading-relaxed mb-8 flex-1">
                        {lesson.description}
                    </p>

                    <div className="pt-6 border-t border-neutral-800 flex items-center justify-between text-xs font-bold uppercase tracking-widest">
                        {isLocked ? (
                            <span className="text-neutral-600 flex items-center gap-2"><Lock size={12}/> Locked</span>
                        ) : (
                            <span className="text-rose-500 flex items-center gap-2 group-hover:gap-3 transition-all">Enter <ArrowRight size={12}/></span>
                        )}
                    </div>
                 </Link>
                 );
             })}
         </div>

      </div>
    </main>
  );
}