import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  color?: "cyan" | "purple" | "emerald" | "orange" | "slate";
  variant?: "outline" | "solid";
  className?: string;
}

export function Badge({ children, color = "cyan", variant = "outline", className }: BadgeProps) {
  const styles = {
    cyan: "border-cyan-500/30 text-cyan-400 bg-cyan-950/30 shadow-[0_0_10px_rgba(6,182,212,0.1)]",
    purple: "border-purple-500/30 text-purple-400 bg-purple-950/30 shadow-[0_0_10px_rgba(168,85,247,0.1)]",
    emerald: "border-emerald-500/30 text-emerald-400 bg-emerald-950/30 shadow-[0_0_10px_rgba(16,185,129,0.1)]",
    orange: "border-orange-500/30 text-orange-400 bg-orange-950/30 shadow-[0_0_10px_rgba(249,115,22,0.1)]",
    slate: "border-white/10 text-slate-400 bg-white/5",
  };
  
  const solidStyles = {
    cyan: "bg-cyan-500 text-black border-transparent font-bold",
    purple: "bg-purple-500 text-black border-transparent font-bold",
    emerald: "bg-emerald-500 text-black border-transparent font-bold",
    orange: "bg-orange-500 text-black border-transparent font-bold",
    slate: "bg-slate-700 text-white border-transparent",
  };

  return (
    <span className={cn(
      "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider border",
      variant === "outline" ? styles[color] : solidStyles[color],
      className
    )}>
      {children}
    </span>
  );
}