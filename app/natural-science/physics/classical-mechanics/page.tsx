"use client";
import Link from "next/link";
import { M } from "@/app/_components/Math";
import TrajectoryBackground from "@/app/natural-science/physics/classical-mechanics/TrajectoryBackground";
import { ArrowLeft, ArrowRight, Box, Move, Activity } from "lucide-react";

export default function ClassicalMechanicsPage() {
  return (
    <main className="relative min-h-screen bg-slate-900 text-white overflow-hidden selection:bg-orange-500/30 font-mono">
      <TrajectoryBackground />

      <div className="relative z-10 pointer-events-none p-6 md:p-12 min-h-screen flex flex-col">
        <div className="flex justify-between items-start mb-16 pointer-events-auto">
          <div>
            <Link href="/natural-science/physics" className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors mb-4">
              <ArrowLeft size={12} /> PHYSICS // CLASSICAL MECHANICS
            </Link>
            <div className="border-l-4 border-orange-500 pl-6">
              <h1 className="text-5xl md:text-7xl font-black text-white mb-2">
                CLASSICAL<br />MECHANICS
              </h1>
              <p className="text-slate-400 max-w-lg">
                The classical framework connecting motion, interactions, momentum, and energy at everyday scales.
                <span className="block mt-2 text-orange-400 text-xs">
                  // THIS PAGE WILL BE REBUILT AFTER THE FOUNDATIONAL MOTION UNIT.
                </span>
              </p>
            </div>
          </div>

          <div className="hidden md:block text-right">
            <div className="text-4xl font-bold text-slate-700">NEWTON</div>
            <div className="text-xs text-slate-500 mt-1">PRINCIPIA MATHEMATICA (1687)</div>
            <div className="flex flex-col items-end gap-1 mt-4 text-[10px] text-orange-500/60">
              <span>g = 9.81 m/s²</span>
              <span>F_net = ΣF</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pointer-events-auto max-w-7xl mx-auto w-full">
          <Link
            href="/natural-science/physics/motion"
            className="bg-slate-900/80 backdrop-blur-md border border-slate-700 p-6 hover:border-orange-500/70 hover:bg-slate-900/90 transition-all group"
          >
            <div className="flex justify-between items-start mb-6 border-b border-slate-700 pb-4">
              <div className="flex items-center gap-3">
                <Move className="text-orange-400" size={20} />
                <h3 className="font-bold tracking-widest text-slate-200">MOTION</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-full border border-orange-500/20 bg-orange-500/5 px-2 py-1 text-[8px] text-orange-300">FOUNDATION</span>
                <ArrowRight size={14} className="text-slate-600 transition-transform group-hover:translate-x-1 group-hover:text-orange-300" />
              </div>
            </div>

            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Kinematics now lives in its own Motion unit instead of being buried under Classical Mechanics. Start there for position, velocity, acceleration, projectiles, and reference frames.
            </p>

            <div className="space-y-4">
              <div className="bg-black/30 p-3 rounded border border-slate-800 group-hover:border-orange-500/20 transition-colors">
                <div className="text-[10px] text-slate-500 mb-1">KINEMATICS</div>
                <div className="text-lg text-white"><M>{"x(t) \\rightarrow v(t) \\rightarrow a(t)"}</M></div>
              </div>
              <div className="bg-black/30 p-3 rounded border border-slate-800 group-hover:border-orange-500/20 transition-colors">
                <div className="text-[10px] text-slate-500 mb-1">CONSTANT ACCELERATION</div>
                <div className="text-lg text-white"><M>{"v = v_0 + at"}</M></div>
              </div>
            </div>
          </Link>

          <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700 p-6 hover:border-orange-500/50 transition-colors group">
            <div className="flex justify-between items-start mb-6 border-b border-slate-700 pb-4">
              <div className="flex items-center gap-3">
                <Box className="text-orange-400" size={20} />
                <h3 className="font-bold tracking-widest text-slate-200">DYNAMICS</h3>
              </div>
              <span className="text-[10px] text-slate-500">PLANNED</span>
            </div>

            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              The interactions that change motion. Mass, inertia, free-body diagrams, and Newton&apos;s laws.
            </p>

            <div className="flex items-center justify-center py-8 relative">
              <div className="w-16 h-16 bg-slate-800 border-2 border-white flex items-center justify-center relative">
                M
                <div className="absolute -top-8 left-1/2 w-0.5 h-8 bg-orange-500" />
                <div className="absolute -bottom-8 left-1/2 w-0.5 h-8 bg-orange-500" />
                <div className="absolute top-1/2 -right-8 w-8 h-0.5 bg-orange-500" />
                <div className="absolute top-1/2 -left-4 w-4 h-0.5 bg-slate-600" />
              </div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1"><M>{"\\sum F = ma"}</M></div>
              <div className="text-[10px] text-slate-500 uppercase">Newton&apos;s Second Law</div>
            </div>
          </div>

          <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700 p-6 hover:border-orange-500/50 transition-colors group">
            <div className="flex justify-between items-start mb-6 border-b border-slate-700 pb-4">
              <div className="flex items-center gap-3">
                <Activity className="text-orange-400" size={20} />
                <h3 className="font-bold tracking-widest text-slate-200">WORK / ENERGY</h3>
              </div>
              <span className="text-[10px] text-slate-500">PLANNED</span>
            </div>

            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Track change without following every instant. Work transfers energy; conservation lets us compare states.
            </p>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-black/30 p-3 rounded border border-slate-800 text-center">
                <div className="text-[10px] text-slate-500 mb-1">KINETIC</div>
                <div className="text-sm text-white"><M>{"K = \\frac{1}{2}mv^2"}</M></div>
              </div>
              <div className="bg-black/30 p-3 rounded border border-slate-800 text-center">
                <div className="text-[10px] text-slate-500 mb-1">POTENTIAL</div>
                <div className="text-sm text-white"><M>{"U = mgh"}</M></div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-800 text-center">
              <div className="text-sm text-orange-400"><M>{"E_i = E_f"}</M></div>
              <div className="text-[10px] text-slate-600 uppercase mt-1">Conservation Law</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
