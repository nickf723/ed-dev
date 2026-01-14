"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ATLA_WIKI } from "./avatar-wiki-data";

export default function AvatarWikiLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const data = ATLA_WIKI;

  return (
    <div className="min-h-screen bg-[#020202] text-stone-200 font-sans flex">
      
      {/* WIKI SIDEBAR NAVIGATION */}
      <aside className="w-64 bg-neutral-900/50 border-r border-white/5 hidden md:flex flex-col p-4 fixed inset-y-0 left-0 z-20">
          
          {/* Back to Repository */}
          <Link href="/humanities/performing-arts/tv-and-film" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 hover:text-white transition-colors mb-8 pl-2">
              <ArrowLeft size={10} /> Repository
          </Link>

          {/* Wiki Title */}
          <div className="mb-8 pl-2">
              <div className="text-[9px] font-mono text-cyan-500 mb-1">FILE: {data.meta.id.toUpperCase()}</div>
              <h1 className="text-xl font-black text-white leading-tight">{data.meta.title}</h1>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-1">
              {data.sections.map(section => {
                  const isActive = pathname === section.href;
                  const Icon = section.icon;
                  return (
                      <Link 
                          key={section.id} 
                          href={section.href}
                          className={`
                              group flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all
                              ${isActive ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" : "text-stone-400 hover:bg-white/5 hover:text-white border border-transparent"}
                          `}
                      >
                          <Icon size={16} className={isActive ? "text-cyan-400" : "text-stone-600 group-hover:text-stone-400"} />
                          {section.label}
                      </Link>
                  )
              })}
          </nav>

          {/* Status Footer */}
          <div className="mt-auto p-4 rounded-lg bg-black/40 border border-white/5 text-center">
              <div className="text-[9px] text-stone-500 uppercase tracking-widest mb-1">Archive Status</div>
              <div className="text-xs font-bold text-emerald-400 flex items-center justify-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Online
              </div>
          </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 md:pl-64 p-6 md:p-12 overflow-x-hidden relative">
          {/* Background Gradient for theme */}
          <div className={`fixed inset-0 bg-gradient-to-br ${data.meta.heroColor} opacity-[0.03] pointer-events-none`} />
          <div className="relative z-10 max-w-4xl mx-auto">
            {children}
          </div>
      </main>
    </div>
  );
}