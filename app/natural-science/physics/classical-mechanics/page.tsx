"use client";
import Link from "next/link";
import { M } from "@/components/Math";
import TrajectoryBackground from "@/app/natural-science/physics/classical-mechanics/TrajectoryBackground";
import { ArrowLeft, Box, Move, Activity, TrendingUp, Scale, Clock } from "lucide-react";

export default function ClassicalMechanicsPage() {
  return (
    <main className="relative min-h-screen bg-slate-900 text-white overflow-hidden selection:bg-orange-500/30 font-mono">
      
      {/* 1. VISUAL ENGINE */}
      <TrajectoryBackground />
      
      {/* 2. OVERLAY UI */}
      <div className="relative z-10 pointer-events-none p-6 md:p-12 min-h-screen flex flex-col">
        
        {/* HEADER */}
        <div className="flex justify-between items-start mb-16 pointer-events-auto">
             <div>
                 <Link href="/natural-science/physics" className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors mb-4">
                    <ArrowLeft size={12} /> PHYSICS_ENGINE // SECTOR_01
                 </Link>
                 <div className="border-l-4 border-orange-500 pl-6">
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-2">
                        CLASSICAL<br/>MECHANICS
                    </h1>
                    <p className="text-slate-400 max-w-lg">
                        The study of the motion of bodies under the action of forces.
                        <span className="block mt-2 text-orange-400 text-xs">
                           // INSTRUCTION: CLICK & DRAG ON BACKGROUND TO LAUNCH PROJECTILES.
                        </span>
                    </p>
                 </div>
             </div>
             
             {/* Technical Data Block */}
             <div className="hidden md:block text-right">
                 <div className="text-4xl font-bold text-slate-700">NEWTON</div>
                 <div className="text-xs text-slate-500 mt-1">PRINCIPIA MATHEMATICA (1687)</div>
                 <div className="flex flex-col items-end gap-1 mt-4 text-[10px] text-orange-500/60">
                     <span>g = 9.81 m/s²</span>
                     <span>F_net = ΣF</span>
                 </div>
             </div>
        </div>


        {/* 3. MODULES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pointer-events-auto max-w-7xl mx-auto w-full">
            
            {/* MODULE A: KINEMATICS */}
            <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700 p-6 hover:border-orange-500/50 transition-colors group">
                <div className="flex justify-between items-start mb-6 border-b border-slate-700 pb-4">
                    <div className="flex items-center gap-3">
                        <Move className="text-orange-400" size={20} />
                        <h3 className="font-bold tracking-widest text-slate-200">KINEMATICS</h3>
                    </div>
                    <span className="text-[10px] text-slate-500">MOD_A</span>
                </div>
                
                <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                    Describing motion without regard to its causes. Velocity, acceleration, and displacement.
                </p>

                <div className="space-y-4">
                    <div className="bg-black/30 p-3 rounded border border-slate-800">
                        <div className="text-[10px] text-slate-500 mb-1">DISPLACEMENT</div>
                        <div className="text-lg text-white"><M>{"\\Delta x = v_0 t + \\frac{1}{2}at^2"}</M></div>
                    </div>
                    <div className="bg-black/30 p-3 rounded border border-slate-800">
                        <div className="text-[10px] text-slate-500 mb-1">VELOCITY</div>
                        <div className="text-lg text-white"><M>{"v_f^2 = v_0^2 + 2a\\Delta x"}</M></div>
                    </div>
                </div>
            </div>

            {/* MODULE B: DYNAMICS */}
            <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700 p-6 hover:border-orange-500/50 transition-colors group">
                <div className="flex justify-between items-start mb-6 border-b border-slate-700 pb-4">
                    <div className="flex items-center gap-3">
                        <Box className="text-orange-400" size={20} />
                        <h3 className="font-bold tracking-widest text-slate-200">DYNAMICS</h3>
                    </div>
                    <span className="text-[10px] text-slate-500">MOD_B</span>
                </div>
                
                <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                    The forces that cause motion. Mass, inertia, and Newton's Three Laws.
                </p>

                <div className="flex items-center justify-center py-8 relative">
                    {/* Visual: Free Body Diagram Graphic */}
                    <div className="w-16 h-16 bg-slate-800 border-2 border-white flex items-center justify-center relative">
                        M
                        {/* Vectors */}
                        <div className="absolute -top-8 left-1/2 w-0.5 h-8 bg-orange-500"></div> {/* Normal */}
                        <div className="absolute -bottom-8 left-1/2 w-0.5 h-8 bg-orange-500"></div> {/* Gravity */}
                        <div className="absolute top-1/2 -right-8 w-8 h-0.5 bg-orange-500"></div> {/* Force */}
                        <div className="absolute top-1/2 -left-4 w-4 h-0.5 bg-slate-600"></div> {/* Friction */}
                    </div>
                </div>

                <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-1"><M>{"\\sum F = ma"}</M></div>
                    <div className="text-[10px] text-slate-500 uppercase">Newton's Second Law</div>
                </div>
            </div>

            {/* MODULE C: ENERGY & WORK */}
            <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700 p-6 hover:border-orange-500/50 transition-colors group">
                <div className="flex justify-between items-start mb-6 border-b border-slate-700 pb-4">
                    <div className="flex items-center gap-3">
                        <Activity className="text-orange-400" size={20} />
                        <h3 className="font-bold tracking-widest text-slate-200">WORK / ENERGY</h3>
                    </div>
                    <span className="text-[10px] text-slate-500">MOD_C</span>
                </div>
                
                <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                    Conservation of energy. Kinetic vs Potential. The ability to do work.
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