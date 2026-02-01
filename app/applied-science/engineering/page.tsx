"use client";
import Link from "next/link";
import BlueprintBackground from "./BlueprintBackground";
import StressTestLab from "./StressTestLab";
import { 
  Settings, PenTool, Cpu, Plane, 
  Terminal, Car, FlaskConical, Hammer,
  ArrowRight, HardHat, Cog
} from "lucide-react";

export default function EngineeringPage() {
  const disciplines = [
    { title: "Mechanical", icon: Cog, color: "text-slate-300", desc: "Motion, forces, and machinery." },
    { title: "Civil", icon: HardHat, color: "text-orange-400", desc: "Infrastructure, bridges, and dams." },
    { title: "Electrical", icon: Cpu, color: "text-yellow-400", desc: "Circuits, power, and electromagnetism." },
    { title: "Software", icon: Terminal, color: "text-green-400", desc: "Systems, code, and algorithms." },
    { title: "Aerospace", icon: Plane, color: "text-sky-400", desc: "Flight and atmospheric dynamics." },
    { title: "Automotive", icon: Car, color: "text-red-400", desc: "Vehicle mobility and engines." },
    { title: "Chemical", icon: FlaskConical, color: "text-purple-400", desc: "Process conversion of matter." },
    { title: "Carpentry", icon: Hammer, color: "text-amber-600", desc: "Structural fabrication and joinery." },
  ];

  return (
    <main className="relative min-h-screen bg-[#020617] text-slate-200 overflow-hidden font-sans selection:bg-violet-500/30">
      <BlueprintBackground />
      <div className="absolute inset-0 bg-radial-vignette opacity-60 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* HERO HEADER */}
        <header className="mb-16 border-b border-violet-500/20 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-violet-500/10 border border-violet-500/30 rounded">
              <Settings className="text-violet-400 animate-spin-slow" size={20} />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-violet-400">
              Applied Science // Systems
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none">
            ENGINE<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">ERING</span>
          </h1>
          <p className="mt-6 text-slate-400 max-w-2xl text-lg font-light leading-relaxed border-l-2 border-violet-500/50 pl-6">
            The application of scientific principles to design and build machines, structures, and systems. It is the bridge between the abstract laws of physics and the concrete needs of humanity.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: DISCIPLINE MATRIX */}
          <div className="lg:col-span-8">
            <section className="mb-8">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Fields of Practice</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {disciplines.map((d) => (
                  <Link 
                    key={d.title} 
                    href={`/applied-science/engineering/${d.title.toLowerCase().replace(" ", "-")}`} 
                    className="group relative p-5 bg-slate-900/60 border border-white/5 hover:border-violet-500/50 rounded-xl transition-all hover:-translate-y-1 backdrop-blur-sm"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg bg-black/40 border border-white/5 ${d.color} group-hover:scale-110 transition-transform`}>
                        <d.icon size={24} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                            <h4 className="text-lg font-bold text-white mb-1">{d.title}</h4>
                            <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-violet-400" />
                        </div>
                        <p className="text-xs text-slate-400 leading-tight">{d.desc}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT: INTERACTIVE LAB & THEORY */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* The Lab Widget */}
            <StressTestLab />

            {/* Theory Card: Safety Factor */}
            <div className="p-6 rounded-2xl bg-violet-950/20 border border-violet-500/20">
              <h4 className="text-sm font-bold text-white uppercase mb-2 flex items-center gap-2">
                <PenTool size={16} className="text-violet-400" /> The Engineering Method
              </h4>
              <ul className="space-y-3 mt-4">
                {['Define the Problem', 'Research & Specify', 'Brainstorm Solutions', 'Prototype & Test', 'Iterate'].map((step, i) => (
                  <li key={step} className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-black border border-white/10 text-[9px] font-bold text-violet-400">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ul>
            </div>

            {/* Stat Block */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-black/40 border border-white/10 rounded-xl text-center">
                <span className="text-[10px] text-slate-500 uppercase font-bold">Accuracy</span>
                <p className="text-xl font-mono text-cyan-400 mt-1">99.9%</p>
              </div>
              <div className="p-4 bg-black/40 border border-white/10 rounded-xl text-center">
                <span className="text-[10px] text-slate-500 uppercase font-bold">Tolerance</span>
                <p className="text-xl font-mono text-cyan-400 mt-1">±0.05mm</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}