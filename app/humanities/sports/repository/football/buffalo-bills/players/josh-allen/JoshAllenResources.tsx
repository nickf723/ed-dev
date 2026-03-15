"use client";
import React from 'react';
import Image from 'next/image';
import { ExternalLink, PlayCircle, FileText, Image as ImageIcon, ShieldAlert } from 'lucide-react';

export default function JoshAllenResources() {
  const resources = [
    {
      type: 'video',
      title: 'The Hurdle',
      source: 'NFL / YouTube',
      desc: 'Visual evidence of the "Alien" trait. Allen hurdles Vikings LB Anthony Barr (6\'5") in open space.',
      href: 'https://www.youtube.com/watch?v=l5P546lWdGM',
      icon: PlayCircle,
      color: 'text-blue-400',
      border: 'border-blue-500/30',
      hoverGlow: 'group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
    },
    {
      type: 'article',
      title: '13 Seconds Analysis',
      source: 'The Guardian',
      desc: 'Tactical breakdown of the greatest QB duel in history. 2 minutes, 25 points, and a heartbreak.',
      href: 'https://www.theguardian.com/sport/2022/jan/24/nfl-playoffs-bills-chiefs-patrick-mahomes-josh-allen-football',
      icon: FileText,
      color: 'text-red-400',
      border: 'border-red-500/30',
      hoverGlow: 'group-hover:shadow-[0_0_15px_rgba(248,113,113,0.3)]'
    },
    {
      type: 'article',
      title: 'The Unicorn Project',
      source: 'The Ringer',
      desc: 'How Allen went from "mathematically impossible prospect" to MVP candidate. The development story.',
      href: 'https://www.theringer.com/2021/04/28/nfl-draft/quarterback-development-nfl-draft-josh-allen-buffalo-bills',
      icon: FileText,
      color: 'text-purple-400',
      border: 'border-purple-500/30',
      hoverGlow: 'group-hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]'
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12 font-sans">
      
      {/* LEFT: THE HERO IMAGE FRAME */}
      <div className="relative group flex flex-col h-full min-h-[400px]">
        {/* Animated Glow Backdrop */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-red-600 rounded-2xl blur-md opacity-30 group-hover:opacity-60 transition duration-1000 z-0" />
        
        <div className="relative z-10 h-full bg-slate-950 border border-white/10 rounded-xl overflow-hidden flex flex-col shadow-2xl">
           
           {/* Optimized Next.js Image Container */}
           <div className="relative flex-1 min-h-[300px] w-full bg-black overflow-hidden">
              <Image 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Josh_Allen_%2843574937214%29_%28cropped%29.jpg/800px-Josh_Allen_%2843574937214%29_%28cropped%29.jpg"
                  alt="Josh Allen passing the ball"
                  fill
                  className="object-cover object-top opacity-70 group-hover:opacity-100 transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105"
              />
              {/* Bottom Vignette for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />
              
              {/* Top-Right Classification Badge */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2 py-1 bg-red-500/20 border border-red-500/50 rounded backdrop-blur-md">
                 <ShieldAlert size={12} className="text-red-400" />
                 <span className="text-[9px] font-black text-red-400 uppercase tracking-widest">Level 5 Asset</span>
              </div>
           </div>
           
           {/* Data Footer */}
           <div className="p-5 border-t border-white/10 flex justify-between items-center bg-slate-950 shrink-0">
              <div>
                  <div className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em] mb-1 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                      Subject #17
                  </div>
                  <div className="text-white font-black italic text-lg tracking-tight">ALLEN, JOSHUA PATRICK</div>
              </div>
              <a 
                href="https://www.buffalobills.com/photos/" 
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-white/5 hover:bg-blue-600 hover:text-white text-slate-400 rounded-lg transition-all border border-white/5 hover:border-blue-500"
                title="View Official Gallery"
              >
                  <ImageIcon size={20} />
              </a>
           </div>
        </div>
      </div>

      {/* RIGHT: INTEL DOSSIER */}
      <div className="space-y-4 flex flex-col justify-center">
          <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <ExternalLink size={16} /> Classified Intel
              </h4>
              <span className="text-[10px] font-mono text-slate-600 uppercase border border-slate-800 px-2 py-0.5 rounded">
                  {resources.length} Files Active
              </span>
          </div>
          
          <div className="space-y-4">
              {resources.map((res) => (
                  <a 
                    key={res.title}
                    href={res.href}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`block p-5 bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-xl transition-all duration-300 group hover:-translate-y-1 hover:bg-slate-800/80 ${res.hoverGlow}`}
                  >
                      <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3 mb-3">
                              <div className={`p-2 rounded-lg bg-slate-950 border ${res.border}`}>
                                  <res.icon size={16} className={res.color} />
                              </div>
                              <span className="font-bold text-white text-base group-hover:text-blue-100 transition-colors">
                                  {res.title}
                              </span>
                          </div>
                          <ExternalLink size={14} className="text-slate-600 group-hover:text-white transition-colors mt-1" />
                      </div>
                      <p className="text-sm text-slate-400 leading-relaxed mb-4 font-light">
                          {res.desc}
                      </p>
                      <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 uppercase bg-slate-950/50 w-fit px-2 py-1 rounded border border-slate-800/50">
                          <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-green-500 transition-colors" />
                          Source: {res.source}
                      </div>
                  </a>
              ))}
          </div>
      </div>

    </div>
  );
}