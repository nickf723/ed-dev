"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CircleDot, MoveHorizontal, RotateCw, Settings } from "lucide-react";

const JOINTS = [
  { 
    id: "hinge", 
    name: "Hinge Joint", 
    loc: "Elbow / Knee", 
    mech: "Door Hinge", 
    dof: "1 DoF (Flex/Extend)",
    icon: MoveHorizontal 
  },
  { 
    id: "ball", 
    name: "Ball & Socket", 
    loc: "Shoulder / Hip", 
    mech: "Joystick / Trailer Hitch", 
    dof: "3 DoF (Rotation)",
    icon: RotateCw 
  },
  { 
    id: "pivot", 
    name: "Pivot Joint", 
    loc: "Neck (Atlas/Axis)", 
    mech: "Axle / Wheel", 
    dof: "1 DoF (Spin)",
    icon: CircleDot 
  },
];

export default function JointWidget() {
  const [active, setActive] = useState(JOINTS[0]);

  return (
    <div className="glass overflow-hidden rounded-xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl">
      <div className="border-b border-white/5 px-5 py-4 flex justify-between items-center">
        <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-300">
          <Settings size={14} className="text-neutral-400" /> Joint Mechanics
        </h3>
      </div>

      {/* Visualization (Abstract) */}
      <div className="h-32 bg-neutral-950/50 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-800/30 to-transparent" />
        
        <AnimatePresence mode="wait">
            <motion.div
                key={active.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="text-neutral-200"
            >
                {active.id === 'hinge' && (
                    <div className="w-16 h-16 border-l-4 border-b-4 border-neutral-400 rounded-bl-lg animate-pulse" />
                )}
                {active.id === 'ball' && (
                    <div className="relative">
                        <div className="w-12 h-12 rounded-full border-2 border-neutral-500" />
                        <div className="absolute top-1 left-1 w-10 h-10 rounded-full bg-neutral-700 animate-ping opacity-20" />
                    </div>
                )}
                {active.id === 'pivot' && (
                    <div className="flex flex-col items-center">
                        <div className="w-12 h-4 border-2 border-neutral-400 rounded-full" />
                        <div className="w-1 h-12 bg-neutral-500" />
                    </div>
                )}
            </motion.div>
        </AnimatePresence>
      </div>

      <div className="p-4 space-y-2">
        {JOINTS.map((j) => (
            <button
                key={j.id}
                onClick={() => setActive(j)}
                className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all text-xs
                    ${active.id === j.id 
                        ? "bg-neutral-800 border-neutral-600 text-white" 
                        : "bg-transparent border-transparent text-neutral-500 hover:bg-white/5 hover:text-neutral-300"}
                `}
            >
                <div className="flex items-center gap-3">
                    <j.icon size={16} />
                    <span className="font-bold">{j.name}</span>
                </div>
            </button>
        ))}
      </div>

      <div className="bg-neutral-950/50 px-5 py-3 border-t border-white/5 space-y-1">
        <div className="flex justify-between text-[10px] text-neutral-500">
            <span>Biology:</span>
            <span className="text-neutral-300">{active.loc}</span>
        </div>
        <div className="flex justify-between text-[10px] text-neutral-500">
            <span>Machine:</span>
            <span className="text-neutral-300">{active.mech}</span>
        </div>
        <div className="flex justify-between text-[10px] text-neutral-500">
            <span>Motion:</span>
            <span className="text-neutral-300">{active.dof}</span>
        </div>
      </div>
    </div>
  );
}