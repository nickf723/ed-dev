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
      // We append the incoming className (e.g., 'theme-chemistry') to the wrapper
      className={`group relative flex h-full flex-col overflow-hidden rounded-xl border transition-all duration-500 ${className}
        ${isDimmed ? "opacity-30 scale-95 grayscale blur-[1px]" : "opacity-100 scale-100 grayscale-0 blur-0"}
        ${isHighlighted ? "shadow-[0_0_40px_var(--theme-card-shadow)] scale-[1.02] border-[color:var(--theme-text-header)]" : "hover:shadow-2xl hover:border-[color:var(--theme-icon-hover)] border-white/10"}
      `}
      style={{
        // Fallback background if theme vars fail, but mostly using the glass effect
        background: isHighlighted 
            ? "linear-gradient(145deg, rgba(20,20,25,0.9), rgba(10,10,10, 0.95))" 
            : "linear-gradient(145deg, rgba(20,20,20,0.6), rgba(10,10,10, 0.4))",
      }}
    >
      {/* Dynamic Glow Effect Background */}
      <div 
        className={`absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-20 ${isHighlighted ? "opacity-20" : ""}`}
        style={{
            background: "radial-gradient(circle at top right, var(--theme-gradient-start), transparent 60%)"
        }}
      />

      {/* Content Container - Reduced padding from p-6 to p-5 */}
      <div className="relative z-10 flex flex-1 flex-col justify-between p-5">
        <div>
          <div className="mb-4 flex items-center justify-between">
            {/* Icon Box */}
            <div 
                className="flex h-10 w-10 items-center justify-center rounded-lg border transition-colors duration-300"
                style={{
                    borderColor: isHighlighted ? "var(--theme-text-header)" : "rgba(255,255,255,0.1)",
                    backgroundColor: "rgba(0,0,0,0.3)",
                    color: "var(--theme-text-icon)"
                }}
            >
              <Icon size={20} />
            </div>
            
            {/* Subtitle / Badge */}
            {subtitle && (
              <span 
                className="font-mono text-[10px] uppercase tracking-widest"
                style={{ color: "var(--theme-text-header)", opacity: 0.8 }}
              >
                {subtitle}
              </span>
            )}
          </div>

          <h3 
            className="mb-2 text-lg font-bold leading-tight transition-colors duration-300"
            style={{ color: "var(--theme-text-title)" }}
          >
            {title}
          </h3>
          
          {/* Description - constrained width for readability, smaller text */}
          <p className="text-sm font-light leading-relaxed text-neutral-400">
            {desc}
          </p>
        </div>

        {/* Footer / CTA */}
        <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors"
             style={{ color: "var(--theme-underline)" }}
        >
          <span className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
            Initialize
          </span>
          <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}