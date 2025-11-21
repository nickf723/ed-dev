"use client";
import { motion } from "framer-motion";
import { Lightbulb, PenTool, Hourglass, BookOpen } from "lucide-react";

export const MODES = [
  { id: "reason", label: "Reason", desc: "Logic & Ethics", Icon: Lightbulb, color: "text-amber-400" },
  { id: "expression", label: "Expression", desc: "Art & Literature", Icon: PenTool, color: "text-orange-400" },
  { id: "memory", label: "Memory", desc: "History & Record", Icon: Hourglass, color: "text-yellow-600" },
];

type InquiryWidgetProps = {
  activeMode: string | null;
  setActiveMode: (id: string | null) => void;
};

export default function InquiryWidget({ activeMode, setActiveMode }: InquiryWidgetProps) {
  return (
    <div className="glass overflow-hidden rounded-xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl">
      <div className="border-b border-white/5 px-5 py-4 flex justify-between items-center">
        <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-300">
          <BookOpen size={14} className="text-amber-500" /> Modes of Inquiry
        </h3>
        {activeMode && (
            <button onClick={() => setActiveMode(null)} className="text-[10px] text-red-400 hover:text-red-300 uppercase font-bold">
                Reset
            </button>
        )}
      </div>

      <div className="flex flex-col p-2 gap-1">
        {MODES.map((mode) => {
          const isActive = activeMode === mode.id;
          return (
            <button
              key={mode.id}
              onMouseEnter={() => setActiveMode(mode.id)}
              className={`group relative flex items-center gap-4 rounded-lg px-4 py-3 transition-all duration-300 border border-transparent ${
                isActive ? "bg-white/5 border-white/5" : "hover:bg-white/5"
              }`}
            >
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-md border transition-colors duration-300 ${
                  isActive
                    ? `border-current ${mode.color} bg-neutral-950 shadow-[0_0_15px_rgba(251,191,36,0.2)]`
                    : "border-neutral-800 bg-neutral-900 text-neutral-500 group-hover:text-neutral-300"
                }`}
              >
                <mode.Icon size={18} />
              </div>

              <div className="text-left">
                <span
                  className={`block text-sm font-bold transition-colors ${
                    isActive ? "text-white" : "text-neutral-400"
                  }`}
                >
                  {mode.label}
                </span>
                <span className="text-[10px] text-neutral-500 uppercase tracking-wider">
                  {mode.desc}
                </span>
              </div>

              {/* Feather/Quill Tip Indicator */}
              {isActive && (
                <motion.div
                  layoutId="quillTip"
                  className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full ${mode.color.replace("text", "bg")}`}
                />
              )}
            </button>
          );
        })}
      </div>
      
      <div className="bg-neutral-950/50 px-5 py-3 border-t border-white/5">
        <p className="text-[10px] text-neutral-500 font-serif italic">
            {activeMode === 'reason' && "\"The unexamined life is not worth living.\""}
            {activeMode === 'expression' && "\"Art is the lie that enables us to realize the truth.\""}
            {activeMode === 'memory' && "\"Those who cannot remember the past are condemned to repeat it.\""}
            {!activeMode && "Select a lens to view the human condition."}
        </p>
      </div>
    </div>
  );
}