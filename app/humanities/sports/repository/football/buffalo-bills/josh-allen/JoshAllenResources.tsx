"use client";
import React from 'react';
import { ExternalLink, PlayCircle, FileText, Image as ImageIcon } from 'lucide-react';

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
      border: 'border-blue-500/30'
    },
    {
      type: 'article',
      title: '13 Seconds Analysis',
      source: 'The Guardian',
      desc: 'Tactical breakdown of the greatest QB duel in history. 2 minutes, 25 points, and a heartbreak.',
      href: 'https://www.theguardian.com/sport/2022/jan/24/nfl-playoffs-bills-chiefs-patrick-mahomes-josh-allen-football',
      icon: FileText,
      color: 'text-red-400',
      border: 'border-red-500/30'
    },
    {
      type: 'article',
      title: 'The Unicorn Project',
      source: 'The Ringer',
      desc: 'How Allen went from "mathematically impossible prospect" to MVP candidate. The development story.',
      href: 'https://www.theringer.com/2021/04/28/nfl-draft/quarterback-development-nfl-draft-josh-allen-buffalo-bills',
      icon: FileText,
      color: 'text-purple-400',
      border: 'border-purple-500/30'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
      
      {/* LEFT: THE HERO IMAGE FRAME */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-red-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
        <div className="relative h-full bg-slate-900 border border-white/10 rounded-xl overflow-hidden flex flex-col">
           {/* Placeholder for the actual image - in a real app, use <Image> */}
           <div className="flex-1 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Josh_Allen_%2843574937214%29_%28cropped%29.jpg/800px-Josh_Allen_%2843574937214%29_%28cropped%29.jpg')] bg-cover bg-center min-h-[300px] opacity-80 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
           </div>
           
           <div className="p-4 border-t border-white/10 flex justify-between items-center">
              <div>
                  <div className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Subject #17</div>
                  <div className="text-white font-black italic">ALLEN, JOSHUA PATRICK</div>
              </div>
              <a 
                href="https://www.vikings.com/photos/photos-kentucky-de-josh-allen" 
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-white/5 hover:bg-white/20 rounded-full transition-colors"
              >
                  <ImageIcon size={20} className="text-white" />
              </a>
           </div>
        </div>
      </div>

      {/* RIGHT: INTEL DOSSIER */}
      <div className="space-y-4">
          <h4 className="text-sm font-bold text-slate-500 uppercase flex items-center gap-2 mb-4">
              <ExternalLink size={16} /> Classified Intel
          </h4>
          {resources.map((res) => (
              <a 
                key={res.title}
                href={res.href}
                target="_blank" 
                rel="noopener noreferrer"
                className={`block p-4 bg-slate-900/80 border ${res.border} rounded-xl hover:translate-x-2 transition-transform duration-300 group`}
              >
                  <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3 mb-2">
                          <res.icon size={18} className={res.color} />
                          <span className="font-bold text-white text-sm group-hover:underline decoration-white/30 underline-offset-4">{res.title}</span>
                      </div>
                      <ExternalLink size={12} className="text-slate-600 group-hover:text-white" />
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-2">
                      {res.desc}
                  </p>
                  <div className="text-[9px] font-mono text-slate-500 uppercase">
                      Source: {res.source}
                  </div>
              </a>
          ))}
      </div>

    </div>
  );
}