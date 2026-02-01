"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import InfrastructureBackground from "./InfrastructureBackground";
import { 
  Cpu, HeartPulse, Briefcase, Wheat, 
  Building, GraduationCap, Library, PenTool,
  Settings, ArrowRight, Activity
} from "lucide-react";

export default function AppliedSciencePage() {
  const domains = [
    { 
      category: "Systems & Production",
      items: [
        { id: 'engineering', title: 'Engineering', href: '/applied-science/engineering', icon: Cpu, color: 'text-violet-400', desc: 'Design and build complex systems.' },
        { id: 'design', title: 'Industrial Design', href: '/applied-science/industrial-design', icon: PenTool, color: 'text-orange-400', desc: 'Form, function, and ergonomics.' },
        { id: 'business', title: 'Business', href: '/applied-science/business', icon: Briefcase, color: 'text-emerald-400', desc: 'Organization and resource management.' },
      ]
    },
    { 
      category: "Life & Environment",
      items: [
        { id: 'medicine', title: 'Health & Medicine', href: '/applied-science/medicine', icon: HeartPulse, color: 'text-rose-400', desc: 'Healing and physiology.' },
        { id: 'agriculture', title: 'Agriculture', href: '/applied-science/agriculture', icon: Wheat, color: 'text-green-400', desc: 'Cultivation and food systems.' },
      ]
    },
    { 
      category: "Society & Information",
      items: [
        { id: 'architecture', title: 'Architecture', href: '/applied-science/architecture', icon: Building, color: 'text-amber-400', desc: 'The built environment.' },
        { id: 'education', title: 'Education', href: '/applied-science/education', icon: GraduationCap, color: 'text-blue-400', desc: 'Pedagogy and learning systems.' },
        { id: 'library', title: 'Library Science', href: '/applied-science/library-science', icon: Library, color: 'text-cyan-400', desc: 'Organization of information.' },
      ]
    }
  ];

  return (
    <main className="relative min-h-screen bg-gray-950 text-slate-200 overflow-hidden font-sans selection:bg-violet-500/30">
      <InfrastructureBackground />
      <div className="absolute inset-0 bg-radial-vignette opacity-50 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* HERO HUD */}
        <header className="mb-16 border-b border-violet-500/20 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-violet-500/10 border border-violet-500/30 rounded">
              <Settings className="text-violet-400 animate-spin-slow" size={20} />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-violet-400">
              Sector: Application
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none">
            APPLIED <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">SCIENCE</span>
          </h1>
          <p className="mt-6 text-slate-400 max-w-2xl text-lg leading-relaxed font-light">
            The bridge between theory and reality. We take the laws of nature (Natural Science) and the logic of structure (Formal Science) to build the world we live in.
          </p>
        </header>

        {/* DOMAIN DASHBOARD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: THE DOMAIN MATRIX */}
          <div className="lg:col-span-8 space-y-12">
            {domains.map((section) => (
              <section key={section.category}>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-4">
                  {section.category} <div className="h-px flex-1 bg-white/10" />
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {section.items.map((item) => (
                    <Link key={item.id} href={item.href} className="group relative p-6 bg-slate-900/60 border border-white/5 hover:border-violet-500/50 rounded-xl transition-all hover:-translate-y-1 backdrop-blur-sm">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-lg bg-black/40 border border-white/5 ${item.color}`}>
                          <item.icon size={24} />
                        </div>
                        <ArrowRight size={16} className="text-slate-600 group-hover:text-violet-400 transition-colors -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0" />
                      </div>
                      <h4 className="text-lg font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* RIGHT: INNOVATION SIDEBAR */}
          <div className="lg:col-span-4 space-y-8">
            {/* Widget: The Innovation Cycle */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-950/50 to-slate-900 border border-violet-500/20">
              <div className="flex items-center gap-2 mb-6">
                <Activity size={18} className="text-violet-400" />
                <h3 className="font-bold text-white text-sm uppercase tracking-wider">The Innovation Cycle</h3>
              </div>
              
              <div className="space-y-6 relative">
                {/* Connecting Line */}
                <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-violet-500/20" />
                
                {[
                  { title: "Research", desc: "Formal & Natural Sciences define what is possible." },
                  { title: "Development", desc: "Applied Sciences prototype solutions (Engineering, Design)." },
                  { title: "Implementation", desc: "Systems are deployed at scale (Business, Architecture)." },
                  { title: "Impact", desc: "Society is transformed (Education, Health)." }
                ].map((step, i) => (
                  <div key={step.title} className="relative pl-8">
                    <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-slate-900 border border-violet-500 text-[10px] flex items-center justify-center text-violet-400 font-bold z-10">
                      {i + 1}
                    </div>
                    <h4 className="text-sm font-bold text-white">{step.title}</h4>
                    <p className="text-[10px] text-slate-500 leading-snug mt-1">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Widget: Interdisciplinary Links */}
            <div className="p-6 rounded-2xl bg-black/40 border border-white/10">
              <h3 className="font-bold text-white text-sm mb-4">Core Dependencies</h3>
              <div className="flex flex-wrap gap-2">
                <Badge text="Physics → Engineering" color="bg-emerald-500/10 text-emerald-400 border-emerald-500/20" />
                <Badge text="Biology → Medicine" color="bg-rose-500/10 text-rose-400 border-rose-500/20" />
                <Badge text="Math → Computer Sci" color="bg-cyan-500/10 text-cyan-400 border-cyan-500/20" />
                <Badge text="Psychology → Education" color="bg-amber-500/10 text-amber-400 border-amber-500/20" />
                <Badge text="Art → Architecture" color="bg-orange-500/10 text-orange-400 border-orange-500/20" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

function Badge({ text, color }: { text: string, color: string }) {
  return (
    <span className={`px-2 py-1 rounded text-[10px] font-mono border ${color}`}>
      {text}
    </span>
  )
}