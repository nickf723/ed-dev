"use client";
import React from "react";
import Link from "next/link";
import { LucideIcon, ArrowRight } from "lucide-react";

type TopicCardProps = {
  title: string;
  desc: string;
  href: string;
  Icon: LucideIcon; // Accepts the Lucide icon component directly
  className?: string;
  subtitle?: string;
  variant?: "default" | "dimmed" | "highlighted"; // New Prop
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
  
  // Dynamic styles based on variant
  const isDimmed = variant === "dimmed";
  const isHighlighted = variant === "highlighted";

  return (
    <Link
      href={href}
      className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border p-6 transition-all duration-500
        ${isDimmed ? "opacity-20 scale-95 blur-[1px] grayscale" : "opacity-100 scale-100 blur-0 grayscale-0"}
        ${isHighlighted ? "border-cyan-500/50 bg-cyan-950/10 shadow-[0_0_30px_rgba(6,182,212,0.15)] scale-[1.02]" : "border-neutral-800 bg-neutral-900/40 hover:border-neutral-700 hover:bg-neutral-900/60 hover:shadow-2xl"}
        ${className}
      `}
    >
      {/* Highlight Gradient Orb */}
      {isHighlighted && (
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-500/20 blur-[50px]" />
      )}

      <div>
        <div className="mb-6 flex items-center justify-between">
          <div className={`flex h-12 w-12 items-center justify-center rounded-full border transition-colors duration-300
            ${isHighlighted ? "border-cyan-500/50 bg-cyan-950 text-cyan-400" : "border-neutral-800 bg-neutral-950 text-neutral-400 group-hover:border-neutral-600 group-hover:text-white"}
          `}>
            <Icon size={24} />
          </div>
          {subtitle && (
            <span className={`text-xs font-mono uppercase tracking-widest transition-colors duration-300
                ${isHighlighted ? "text-cyan-400" : "text-neutral-600 group-hover:text-neutral-400"}
            `}>
              {subtitle}
            </span>
          )}
        </div>

        <h3 className={`mb-3 text-xl font-bold transition-colors duration-300 ${isHighlighted ? "text-cyan-100" : "text-neutral-100"}`}>
          {title}
        </h3>
        
        <p className="text-sm leading-relaxed text-neutral-400">
          {desc}
        </p>
      </div>

      <div className="mt-8 flex items-center gap-2 text-sm font-medium text-neutral-500 transition-colors group-hover:text-cyan-400">
        Explore Node <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}