import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

interface DashboardCardProps {
  title: string;
  icon?: React.ElementType;
  children?: React.ReactNode;
  href?: string;
  className?: string;
  accentColor?: "cyan" | "purple" | "emerald" | "orange" | "slate";
}

export function DashboardCard({ 
  title, 
  icon: Icon, 
  children, 
  className, 
  href,
  accentColor = "cyan" 
}: DashboardCardProps) {
  
  // 1. THEME CONFIGURATION
  // We define how the border and shadow react on hover
  const themeStyles = {
    cyan: "hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]",
    purple: "hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]",
    emerald: "hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]",
    orange: "hover:border-orange-500/50 hover:shadow-[0_0_30px_rgba(249,115,22,0.15)]",
    slate: "hover:border-white/30 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]",
  };

  // We define how the Icon box looks
  const iconStyles = {
    cyan: "text-cyan-400 bg-cyan-950/30 border-cyan-500/20 group-hover:bg-cyan-500 group-hover:text-black group-hover:border-cyan-500",
    purple: "text-purple-400 bg-purple-950/30 border-purple-500/20 group-hover:bg-purple-500 group-hover:text-black group-hover:border-purple-500",
    emerald: "text-emerald-400 bg-emerald-950/30 border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-black group-hover:border-emerald-500",
    orange: "text-orange-400 bg-orange-950/30 border-orange-500/20 group-hover:bg-orange-500 group-hover:text-black group-hover:border-orange-500",
    slate: "text-slate-400 bg-white/5 border-white/10 group-hover:bg-white group-hover:text-black group-hover:border-white",
  };

  const Content = (
    <div className={cn(
      "group relative flex flex-col h-full p-6 rounded-2xl border border-white/5 bg-neutral-900/40 backdrop-blur-sm transition-all duration-500 ease-out",
      "hover:-translate-y-1", // Slight lift on hover
      themeStyles[accentColor],
      className
    )}>
      
      {/* HEADER ROW */}
      <div className="flex items-start justify-between mb-4 z-10">
        <div className="flex items-center gap-3">
          {Icon && (
            <div className={cn("p-2 rounded-lg border transition-all duration-300", iconStyles[accentColor])}>
              <Icon size={18} />
            </div>
          )}
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 group-hover:text-white transition-colors">
            {title}
          </span>
        </div>
        
        {/* If it's a link, show the arrow */}
        {href && (
          <ArrowUpRight 
            size={16} 
            className="text-slate-600 group-hover:text-white transition-colors duration-300" 
          />
        )}
      </div>
      
      {/* BODY CONTENT */}
      <div className="flex-1 flex flex-col relative z-10">
        {children}
      </div>

      {/* BACKGROUND GRADIENT OVERLAY (Subtle shine) */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />
    </div>
  );

  // LOGIC: If 'href' is passed, wrap in Next.js Link. If not, just a Div.
  if (href) {
    return <Link href={href} className="block h-full">{Content}</Link>;
  }
  return Content;
}