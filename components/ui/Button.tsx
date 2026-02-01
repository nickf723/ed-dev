import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
  color?: "cyan" | "purple" | "emerald" | "orange" | "slate"; // <--- THEME PROP
  isLoading?: boolean;
}

export function Button({ 
  className, 
  variant = "primary", 
  size = "md", 
  color = "cyan",
  isLoading,
  children,
  ...props 
}: ButtonProps) {
  
  // 1. Dynamic Color Maps
  const theme = {
    cyan: {
      primary: "bg-cyan-500/10 text-cyan-400 border-cyan-500/50 hover:bg-cyan-500 hover:text-black shadow-[0_0_10px_rgba(6,182,212,0.1)] hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]",
      outline: "border-cyan-500/30 text-cyan-400 hover:bg-cyan-950/30",
      ghost: "text-cyan-400 hover:bg-cyan-950/20"
    },
    purple: {
      primary: "bg-purple-500/10 text-purple-400 border-purple-500/50 hover:bg-purple-500 hover:text-black shadow-[0_0_10px_rgba(168,85,247,0.1)] hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]",
      outline: "border-purple-500/30 text-purple-400 hover:bg-purple-950/30",
      ghost: "text-purple-400 hover:bg-purple-950/20"
    },
    emerald: {
      primary: "bg-emerald-500/10 text-emerald-400 border-emerald-500/50 hover:bg-emerald-500 hover:text-black shadow-[0_0_10px_rgba(16,185,129,0.1)] hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]",
      outline: "border-emerald-500/30 text-emerald-400 hover:bg-emerald-950/30",
      ghost: "text-emerald-400 hover:bg-emerald-950/20"
    },
    orange: {
      primary: "bg-orange-500/10 text-orange-400 border-orange-500/50 hover:bg-orange-500 hover:text-black shadow-[0_0_10px_rgba(249,115,22,0.1)] hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]",
      outline: "border-orange-500/30 text-orange-400 hover:bg-orange-950/30",
      ghost: "text-orange-400 hover:bg-orange-950/20"
    },
    slate: {
      primary: "bg-white/10 text-white border-white/20 hover:bg-white hover:text-black",
      outline: "border-white/10 text-slate-300 hover:bg-white/5",
      ghost: "text-slate-400 hover:text-white hover:bg-white/5"
    }
  };

  const selectedTheme = theme[color];

  const variants = {
    primary: cn("border", selectedTheme.primary),
    secondary: "bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 hover:text-white",
    outline: cn("border bg-transparent", selectedTheme.outline),
    ghost: cn("bg-transparent border-transparent", selectedTheme.ghost),
    danger: "bg-red-500/10 text-red-400 border border-red-500/50 hover:bg-red-500 hover:text-white",
  };

  const sizes = {
    sm: "text-[10px] px-3 py-1 gap-1 h-7",
    md: "text-xs px-5 py-2.5 gap-2 h-10",
    lg: "text-sm px-8 py-3 gap-3 h-12",
    icon: "p-2 aspect-square h-10 w-10 flex items-center justify-center",
  };

  return (
    <button 
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-bold uppercase tracking-wider transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )} 
      disabled={isLoading || props.disabled}
      {...props} 
    >
      {isLoading && <Loader2 className="animate-spin mr-2" size={14} />}
      {children}
    </button>
  );
}