"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight, Scroll, Tv, Users } from "lucide-react";
import { ATLA_WIKI } from "./avatar-wiki-data";

export default function AvatarWikiHub() {
  const data = ATLA_WIKI;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Hero Header */}
      <header className="mb-12 relative overflow-hidden rounded-3xl bg-neutral-900/50 border border-white/10 p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
          <div className={`absolute inset-0 bg-gradient-to-r ${data.meta.heroColor} opacity-10`} />
          
          {/* Placeholder Art */}
          <div className="w-40 h-40 rounded-full bg-black/50 border-4 border-cyan-500/20 flex items-center justify-center shadow-2xl relative z-10 shrink-0">
              <span className="text-4xl">🌊</span>
          </div>

          <div className="relative z-10 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">
                  <Scroll size={12} /> Holocron Entry
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tighter">
                  {data.meta.title}
              </h1>
              <p className="text-lg text-stone-300 max-w-xl leading-relaxed">
                  Access confirmed. Welcome to the definitive archive for the Four Nations era. Explore characters, bending arts, and historical records.
              </p>
          </div>
      </header>

      {/* Quick Links Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.sections.filter(s => s.id !== 'hub').map(section => {
              const Icon = section.icon;
              return (
                  <Link 
                      key={section.id}
                      href={section.href}
                      className="group relative p-8 rounded-2xl bg-white/5 border border-white/5 overflow-hidden transition-all hover:border-cyan-500/30 hover:bg-white/10"
                  >
                      <div className="absolute right-0 bottom-0 opacity-5 transform translate-x-1/4 translate-y-1/4 group-hover:scale-110 transition-transform">
                          <Icon size={120} />
                      </div>
                      <div className="relative z-10">
                          <div className="p-3 rounded-xl bg-cyan-950/50 border border-cyan-500/20 w-fit mb-4 text-cyan-400 group-hover:scale-110 transition-transform">
                              <Icon size={24} />
                          </div>
                          <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                              {section.label}
                          </h2>
                          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-500 group-hover:text-white transition-colors mt-6">
                              Access Data <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                          </div>
                      </div>
                  </Link>
              )
          })}
      </div>
    </div>
  );
}