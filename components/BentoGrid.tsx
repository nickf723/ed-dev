"use client";
import Link from "next/link";
import { LucideIcon, ArrowRight } from "lucide-react";

export function BentoGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto">
      {children}
    </div>
  );
}

type BentoItemProps = {
  title: string;
  desc: string;
  href: string;
  Icon: LucideIcon;
  className?: string; // For grid spans (e.g. col-span-2)
  bgClass?: string;   // For background gradients
  colorClass?: string; // For icon/text color
};

export function BentoItem({ title, desc, href, Icon, className="", bgClass, colorClass }: BentoItemProps) {
  return (
    <Link
      href={href}
      className={`group relative overflow-hidden rounded-3xl border border-white/10 p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between ${className} ${bgClass}`}
    >
      {/* Hover Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
           <div className={`p-3 rounded-2xl bg-white/10 ${colorClass}`}>
             <Icon size={24} />
           </div>
           <ArrowRight className={`transition-transform duration-300 -rotate-45 group-hover:rotate-0 group-hover:text-white ${colorClass}`} />
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-sm text-neutral-400 group-hover:text-neutral-300 leading-relaxed max-w-xs">
          {desc}
        </p>
      </div>
    </Link>
  );
}