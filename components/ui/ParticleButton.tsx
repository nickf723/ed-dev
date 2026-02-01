import React from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface ParticleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  mode: "cosmos" | "earth" | "bio" | "chem" | "physics";
}

export function ParticleButton({ mode, children, className, ...props }: ParticleButtonProps) {
  
  // UNIQUE VISUAL CONFIGS
  const configs = {
    cosmos: {
      base: "bg-purple-950/30 border-purple-500/30 text-purple-200 hover:border-purple-400 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]",
      particles: (
        <>
          <div className="absolute top-1 left-2 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDuration: '2s' }} />
          <div className="absolute bottom-2 right-4 w-0.5 h-0.5 bg-white rounded-full animate-pulse" style={{ animationDuration: '3s' }} />
          <div className="absolute top-1/2 right-2 w-1 h-1 bg-purple-200 rounded-full animate-ping" style={{ animationDuration: '4s' }} />
        </>
      )
    },
    earth: {
      base: "bg-orange-950/30 border-orange-500/30 text-orange-200 hover:border-orange-400 hover:bg-orange-900/40",
      particles: (
        <>
           <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
           {/* Dust motes */}
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        </>
      )
    },
    bio: {
      base: "bg-emerald-950/30 border-emerald-500/30 text-emerald-200 hover:border-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] overflow-hidden",
      particles: (
        <>
          <div className="absolute bottom-0 left-1/4 w-2 h-2 bg-emerald-400/20 rounded-full animate-bounce" style={{ animationDuration: '3s' }} />
          <div className="absolute bottom-0 right-1/3 w-3 h-3 bg-emerald-400/10 rounded-full animate-bounce" style={{ animationDuration: '4.5s' }} />
        </>
      )
    },
    chem: {
      base: "bg-cyan-950/30 border-cyan-500/30 text-cyan-200 hover:border-cyan-400 hover:bg-cyan-900/40",
      particles: (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent opacity-50" />
          {/* Bubbles */}
          <div className="absolute bottom-1 left-2 w-1 h-1 bg-cyan-300 rounded-full animate-[ping_2s_linear_infinite]" />
          <div className="absolute bottom-3 right-4 w-1.5 h-1.5 bg-cyan-300 rounded-full animate-[ping_3s_linear_infinite]" />
        </>
      )
    },
    physics: {
      base: "bg-blue-950/30 border-blue-500/30 text-blue-200 hover:border-blue-400 hover:shadow-[0_0_25px_rgba(59,130,246,0.3)]",
      particles: (
        <>
           {/* Orbiting ring */}
           <div className="absolute inset-0 border border-blue-400/10 rounded-xl skew-y-12 scale-75" />
           <div className="absolute top-1/2 left-1/2 w-32 h-[1px] bg-blue-500/50 -translate-x-1/2 -translate-y-1/2 rotate-45" />
           <div className="absolute top-1/2 left-1/2 w-32 h-[1px] bg-blue-500/50 -translate-x-1/2 -translate-y-1/2 -rotate-45" />
        </>
      )
    }
  };

  const config = configs[mode];

  return (
    <button 
      className={cn(
        "relative group/btn flex items-center gap-3 px-6 py-4 w-full text-left rounded-xl border transition-all duration-500",
        config.base,
        className
      )}
      {...props}
    >
      {/* BACKGROUND PARTICLES */}
      <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
        {config.particles}
      </div>

      {/* CONTENT (Z-Index to sit above particles) */}
      <div className="relative z-10 flex items-center justify-between w-full">
        <span className="font-bold uppercase tracking-wider text-sm">{children}</span>
        <ArrowRight className="w-4 h-4 opacity-0 -translate-x-4 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-300" />
      </div>
    </button>
  );
}