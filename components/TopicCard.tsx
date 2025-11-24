"use client";
import React from "react";
import Link from "next/link";
import { LucideIcon, ArrowRight } from "lucide-react";

type TopicCardProps = {
  title: string;
  desc: string;
  href: string;
  Icon: LucideIcon;
  className?: string;
  subtitle?: string;
  variant?: "default" | "dimmed" | "highlighted";
};

export default function TopicCard({
  title,
  desc,
  href,
  Icon,
  className = "",
  subtitle,
  variant = "default",
}: TopicCardProps) {
  
  const isDimmed = variant === "dimmed";
  const isHighlighted = variant === "highlighted";

  return (
    <Link
      href={href}
      // ACCESSIBILITY FIX: Add focus ring for keyboard navigation
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-neutral-900 ${className}
        ${isDimmed ? "opacity-40 scale-95 blur-[1px] grayscale" : "opacity-100 scale-100 blur-0 grayscale-0"}
        ${isHighlighted 
            ? "border-cyan-500/50 bg-cyan-950/30 shadow-[0_0_30px_rgba(6,182,212,0.15)] scale-[1.02]" 
            : "border-white/5 bg-neutral-900/40 hover:border-white/20 hover:bg-neutral-900/60 hover:shadow-2xl hover:-translate-y-1"}
      `}
      aria-label={`${title}: ${desc}`} // ACCESSIBILITY FIX: Explicit label
    >
      {/* Dynamic Gradient Glow on Hover - ACCESSIBILITY FIX: Hide decorative elements */}
      <div 
        aria-hidden="true"
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
            background: "radial-gradient(circle at top right, var(--theme-gradient-start, rgba(255,255,255,0.05)), transparent 70%)"
        }}
      />

      <div className="relative z-10 flex flex-1 flex-col justify-between p-6">
        <div>
          <div className="mb-5 flex items-start justify-between">
            {/* Icon Box - ACCESSIBILITY FIX: Hide icon from screen readers */}
            <div 
                aria-hidden="true"
                className="flex h-12 w-12 items-center justify-center rounded-xl border bg-black/20 backdrop-blur-md transition-colors duration-300 group-hover:scale-110"
                style={{
                    borderColor: "rgba(255,255,255,0.05)",
                    color: "var(--theme-text-icon, #a3a3a3)"
                }}
            >
              <Icon size={24} />
            </div>
            
            {subtitle && (
              <span 
                className="rounded-full border border-white/5 bg-white/5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider transition-colors"
                style={{ color: "var(--theme-text-header, #737373)" }}
              >
                {subtitle}
              </span>
            )}
          </div>

          <h3 
            className="mb-3 text-xl font-bold leading-tight transition-colors duration-300 group-hover:text-white"
            style={{ color: isHighlighted ? "#fff" : "var(--theme-text-title, #e5e5e5)" }}
          >
            {title}
          </h3>
          
          <p className="text-sm font-light leading-relaxed text-neutral-400 group-hover:text-neutral-300">
            {desc}
          </p>
        </div>

        {/* Footer Arrow - ACCESSIBILITY FIX: Hide decorative "Initialize" text */}
        <div 
             aria-hidden="true"
             className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-wider opacity-0 transition-all duration-300 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
             style={{ color: "var(--theme-text-icon, #fff)" }}
        >
          <span>Initialize</span>
          <ArrowRight size={14} />
        </div>
      </div>
    </Link>
  );
}