'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Sigma,          // Formal
  Atom,           // Natural
  Users,          // Social
  BookOpen,       // Humanities
  Cpu,            // Applied
  Globe,          // Interdisciplinary
  ArrowRight
} from 'lucide-react';

// --- CONFIGURATION ---
const DOMAINS = [
  {
    id: 'formal',
    title: 'Formal Sciences',
    subtitle: 'Mathematics, Logic, Systems',
    href: '/formal-science',
    icon: Sigma,
    color: 'rose',
    active: true, // This is the one we are working on!
  },
  {
    id: 'natural',
    title: 'Natural Sciences',
    subtitle: 'Physics, Chemistry, Biology',
    href: '/natural-science',
    icon: Atom,
    color: 'emerald',
    active: false,
  },
  {
    id: 'applied',
    title: 'Applied Sciences',
    subtitle: 'Engineering, Medicine, Tech',
    href: '/applied-science',
    icon: Cpu,
    color: 'violet',
    active: false,
  },
  {
    id: 'social',
    title: 'Social Sciences',
    subtitle: 'Psychology, Sociology, Econ',
    href: '/social-science',
    icon: Users,
    color: 'cyan',
    active: false,
  },
  {
    id: 'humanities',
    title: 'Humanities',
    subtitle: 'History, Philosophy, Arts',
    href: '/humanities',
    icon: BookOpen,
    color: 'amber',
    active: false,
  },
  {
    id: 'interdisciplinary',
    title: 'Interdisciplines',
    subtitle: 'Complexity, Area Studies',
    href: '/interdisciplines',
    icon: Globe,
    color: 'slate',
    active: false,
  },
];

// --- ANIMATIONS ---
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { y: 20, opacity: 0, scale: 0.95 },
  show: { y: 0, opacity: 1, scale: 1, transition: { type: "spring", stiffness: 50 } }
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 relative selection:bg-cyan-500/30 flex items-center justify-center p-6">
      
      {/* --- BACKGROUND FX --- */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Abstract "Network" Lines */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'linear-gradient(45deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        
        {/* Central Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-6xl space-y-12">
        
        {/* --- HEADER --- */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-800 bg-slate-900/50 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">System Operational</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 tracking-tight">
            The Knowledge Web
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto font-light text-lg">
            Select a domain to access ontological structures and educational resources.
          </p>
        </motion.header>

        {/* --- THE 6 DOMAINS GRID --- */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {DOMAINS.map((domain) => (
            <DomainCard key={domain.id} data={domain} />
          ))}
        </motion.div>

      </div>
    </main>
  );
}

// --- CARD COMPONENT ---
function DomainCard({ data }: { data: typeof DOMAINS[0] }) {
  const { title, subtitle, icon: Icon, color, active, href } = data;
  
  // Color mappings for dynamic styling
  const colorMap: any = {
    cyan:    { border: "group-hover:border-cyan-500/50", glow: "group-hover:shadow-cyan-500/20", icon: "text-cyan-400", bg: "bg-cyan-950/30" },
    emerald: { border: "group-hover:border-emerald-500/50", glow: "group-hover:shadow-emerald-500/20", icon: "text-emerald-400", bg: "bg-emerald-950/30" },
    violet:  { border: "group-hover:border-violet-500/50", glow: "group-hover:shadow-violet-500/20", icon: "text-violet-400", bg: "bg-violet-950/30" },
    amber:   { border: "group-hover:border-amber-500/50", glow: "group-hover:shadow-amber-500/20", icon: "text-amber-400", bg: "bg-amber-950/30" },
    rose:    { border: "group-hover:border-rose-500/50", glow: "group-hover:shadow-rose-500/20", icon: "text-rose-400", bg: "bg-rose-950/30" },
    slate:   { border: "group-hover:border-slate-500/50", glow: "group-hover:shadow-slate-500/20", icon: "text-slate-400", bg: "bg-slate-900/30" },
  };

  const theme = colorMap[color];

  return (
    <motion.div variants={item}>
      <Link href={href} className="block group relative h-full">
        <div className={`
          relative h-48 rounded-2xl p-8 overflow-hidden
          bg-slate-900/40 backdrop-blur-md border border-white/5
          transition-all duration-500 ease-out
          ${theme.border}
          hover:shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)]
          ${theme.glow}
          hover:-translate-y-1
        `}>
          
          {/* Active Status Indicator */}
          {active && (
            <div className="absolute top-4 right-4 flex items-center gap-2">
               <span className="text-[10px] font-mono font-bold text-cyan-400 tracking-wider">ACTIVE</span>
               <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            </div>
          )}

          <div className="h-full flex flex-col justify-between relative z-10">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className={`p-3 rounded-xl border border-white/5 ${theme.bg}`}>
                <Icon className={`w-8 h-8 ${theme.icon}`} />
              </div>
              
              {/* Hover Arrow */}
              <div className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                <ArrowRight className="w-5 h-5 text-slate-500" />
              </div>
            </div>

            {/* Text */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-white transition-colors">
                {title}
              </h3>
              <p className="text-slate-400 text-sm font-light group-hover:text-slate-300 transition-colors">
                {subtitle}
              </p>
            </div>
          </div>

          {/* Background Gradient Effect on Hover */}
          <div className={`
            absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500
            bg-gradient-to-br from-${color}-500 to-transparent
          `} />

        </div>
      </Link>
    </motion.div>
  );
}