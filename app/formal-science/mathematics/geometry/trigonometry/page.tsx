"use client";
import Link from "next/link";
import SineConstructionBackground from "./SineConstructionBackground";
import UnitCircleLab from "./UnitCircleLab";
import { 
  Triangle, Activity, Maximize2, Circle, 
  ArrowLeft, Ruler 
} from "lucide-react";

export default function TrigonometryPage() {
  return (
    <main className="relative min-h-screen bg-[#020617] text-slate-200 overflow-hidden font-sans selection:bg-purple-500/30">
      <SineConstructionBackground />
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* HERO */}
        <header className="mb-16 border-b border-purple-500/20 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/formal-science/mathematics/geometry" className="p-2 bg-purple-500/10 border border-purple-500/30 rounded hover:bg-purple-500/20 transition-colors group">
              <ArrowLeft className="text-purple-400 group-hover:-translate-x-1 transition-transform" size={20} />
            </Link>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-purple-400">
              Geometry // Triangles
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
            TRIGONOMETRY
          </h1>
          <p className="mt-6 text-slate-400 max-w-2xl text-lg font-light leading-relaxed border-l-2 border-purple-500/50 pl-6">
            The study of the relationships between the side lengths and angles of triangles. Trigonometry allows us to calculate distances we cannot measure directly—like the height of a mountain or the distance to a star.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: THEORY */}
          <div className="lg:col-span-5 space-y-12">
            
            {/* The Big 3 Functions */}
            <div className="p-6 bg-slate-900/60 border border-white/5 rounded-2xl backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Triangle size={20} className="text-purple-400" /> SOH CAH TOA
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Every angle creates a specific ratio between the sides of a Right Triangle.
              </p>
              
              <div className="space-y-3">
                 <FunctionCard 
                    name="Sine (sin)" 
                    ratio="Opposite / Hypotenuse" 
                    desc="Vertical Component" 
                    color="text-purple-400"
                    bg="bg-purple-500/10"
                 />
                 <FunctionCard 
                    name="Cosine (cos)" 
                    ratio="Adjacent / Hypotenuse" 
                    desc="Horizontal Component" 
                    color="text-cyan-400"
                    bg="bg-cyan-500/10"
                 />
                 <FunctionCard 
                    name="Tangent (tan)" 
                    ratio="Opposite / Adjacent" 
                    desc="Slope (Rise / Run)" 
                    color="text-amber-400"
                    bg="bg-amber-500/10"
                 />
              </div>
            </div>
            
            

            {/* Pythagorean Identity */}
            <div className="flex gap-4 p-4 bg-purple-900/10 border border-purple-500/20 rounded-xl">
                <Maximize2 className="text-purple-500 shrink-0" />
                <div>
                    <h4 className="text-sm font-bold text-white uppercase">The Secret Identity</h4>
                    <p className="text-xs text-slate-400 mt-1">
                        Because these triangles live inside a circle with radius 1, the Pythagorean Theorem ($a^2 + b^2 = c^2$) becomes: <br/>
                        <code className="text-white font-bold block mt-2">sin²θ + cos²θ = 1</code>
                    </p>
                </div>
            </div>

          </div>

          {/* RIGHT: THE LAB */}
          <div className="lg:col-span-7 space-y-8">
            <UnitCircleLab />
            
            <div className="p-6 bg-slate-900/50 border border-white/5 rounded-2xl">
               <h4 className="text-sm font-bold text-white uppercase mb-4 flex items-center gap-2">
                   <Circle size={16} className="text-slate-400" /> From Circle to Wave
               </h4>
               <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Why do we use Sine waves for audio and light? Look at the background animation.
               </p>
               <div className="flex gap-4 items-start">
                  <div className="p-2 bg-black/40 rounded text-purple-400 font-mono text-xl font-bold">y</div>
                  <p className="text-xs text-slate-400 mt-1">
                      As you rotate around a circle (like a generator spinning), your vertical height ($y$) goes Up, Down, and back Up smoothly. This creates the <strong>Sine Wave</strong>.
                  </p>
               </div>
            </div>
            
            

[Image of unit circle chart with degrees and radians]

            

[Image of sound wave frequency amplitude]

          </div>

        </div>
      </div>
    </main>
  );
}

function FunctionCard({ name, ratio, desc, color, bg }: any) {
    return (
        <div className={`flex items-center justify-between p-3 rounded border border-white/5 group hover:border-white/20 transition-colors ${bg}`}>
            <div>
                <div className={`text-sm font-bold ${color}`}>{name}</div>
                <div className="text-[10px] text-slate-400 uppercase">{desc}</div>
            </div>
            <div className="text-xs font-mono text-white bg-slate-950/50 px-2 py-1 rounded border border-white/10">
                {ratio}
            </div>
        </div>
    )
}