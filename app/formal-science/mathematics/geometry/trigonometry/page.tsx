"use client";
import Link from "next/link";
import SineConstructionBackground from "./SineConstructionBackground";
import UnitCircleLab from "./UnitCircleLab";
import { 
  Triangle, Circle, Box, Maximize, 
  ArrowRight, Activity, Ruler, Grid3X3 
} from "lucide-react";

export default function GeometryPage() {
  const modules = [
    { 
      title: "Euclidean Geometry", 
      href: "/formal-science/mathematics/geometry/euclidean", 
      icon: Triangle, 
      color: "text-cyan-400", 
      border: "hover:border-cyan-500/50",
      bg: "hover:bg-cyan-500/10",
      desc: "Points, lines, and planes. The rules of shapes on a flat surface." 
    },
    { 
      title: "Trigonometry", 
      href: "/formal-science/mathematics/geometry/trigonometry", 
      icon: Activity, 
      color: "text-purple-400", 
      border: "hover:border-purple-500/50",
      bg: "hover:bg-purple-500/10",
      desc: "Triangles and cycles. Sine, Cosine, and Tangent." 
    },
    { 
      title: "Analytic Geometry", 
      href: "/formal-science/mathematics/geometry/analytic", 
      icon: Grid3X3, 
      color: "text-pink-400", 
      border: "hover:border-pink-500/50",
      bg: "hover:bg-pink-500/10",
      desc: "Coordinate systems. Describing shapes with algebraic equations." 
    },
    { 
      title: "Solids & 3D", 
      href: "/formal-science/mathematics/geometry/solids", 
      icon: Box, 
      color: "text-amber-400", 
      border: "hover:border-amber-500/50",
      bg: "hover:bg-amber-500/10",
      desc: "Volume and Surface Area. Spheres, Prisms, and Polyhedra." 
    },
  ];

  return (
    <main className="relative min-h-screen bg-[#020617] text-slate-200 overflow-hidden font-sans selection:bg-cyan-500/30">
      <SineConstructionBackground />
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* HERO */}
        <header className="mb-16 border-b border-cyan-500/20 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/formal-science/mathematics" className="p-2 bg-cyan-500/10 border border-cyan-500/30 rounded hover:bg-cyan-500/20 transition-colors">
              <Ruler className="text-cyan-400" size={20} />
            </Link>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-400">
              Mathematics // Space
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
            GEOMETRY <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">&</span><br/>
            TRIGONOMETRY
          </h1>
          <p className="mt-6 text-slate-400 max-w-2xl text-lg font-light leading-relaxed border-l-2 border-cyan-500/50 pl-6">
            Geometry measures the static world of shapes. Trigonometry breathes life into them, transforming triangles into waves and allowing us to map stars, sound, and cycles.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: THEORY */}
          <div className="lg:col-span-5 space-y-12">
            
            {/* The SOH CAH TOA Card */}
            <div className="p-6 bg-slate-900/60 border border-white/5 rounded-2xl backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Triangle size={20} className="text-cyan-400" /> The Magic Ratio
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                If you change the size of a triangle but keep the angles the same, the <strong>Ratio</strong> of the sides never changes. This is the foundation of Trigonometry.
              </p>
              
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono font-bold">
                 <div className="p-3 bg-cyan-900/40 rounded border border-cyan-500/30">
                    <div className="text-cyan-400 text-lg mb-1">SOH</div>
                    <div className="text-slate-400">Sin = Opp/Hyp</div>
                 </div>
                 <div className="p-3 bg-purple-900/40 rounded border border-purple-500/30">
                    <div className="text-purple-400 text-lg mb-1">CAH</div>
                    <div className="text-slate-400">Cos = Adj/Hyp</div>
                 </div>
                 <div className="p-3 bg-slate-800 rounded border border-white/10">
                    <div className="text-white text-lg mb-1">TOA</div>
                    <div className="text-slate-400">Tan = Opp/Adj</div>
                 </div>
              </div>
            </div>


            {/* Navigation Grid */}
            <div>
               <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Maximize size={14} /> Domains
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {modules.map((m) => (
                   <Link 
                     key={m.title} 
                     href={m.href}
                     className={`group p-5 bg-black/40 border border-white/5 rounded-xl transition-all hover:-translate-y-1 ${m.border} ${m.bg}`}
                   >
                      <div className="flex items-start justify-between mb-3">
                         <m.icon className={m.color} size={24} />
                         <ArrowRight size={16} className={`opacity-0 group-hover:opacity-100 transition-opacity ${m.color}`} />
                      </div>
                      <h4 className="font-bold text-white text-sm mb-1">{m.title}</h4>
                      <p className="text-xs text-slate-400 leading-snug">{m.desc}</p>
                   </Link>
                 ))}
               </div>
            </div>

            

          </div>

          {/* RIGHT: THE LAB */}
          <div className="lg:col-span-7 space-y-8">
            <UnitCircleLab />
            
            <div className="p-6 bg-slate-900/50 border border-white/5 rounded-2xl">
               <h4 className="text-sm font-bold text-white uppercase mb-4 flex items-center gap-2">
                   <Activity size={16} className="text-slate-400" /> From Circle to Wave
               </h4>
               <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Why do we use Sine waves for audio and light? Look at the background animation.
               </p>
               <div className="flex gap-4 items-start">
                  <div className="p-2 bg-black/40 rounded text-cyan-400 font-mono text-xl font-bold">y</div>
                  <p className="text-xs text-slate-400 mt-1">
                      As you rotate around a circle (like a generator spinning), your vertical height ($y$) goes Up, Down, and back Up smoothly. This creates the <strong>Sine Wave</strong>.
                  </p>
               </div>
            </div>
            
            
          </div>

        </div>
      </div>
    </main>
  );
}