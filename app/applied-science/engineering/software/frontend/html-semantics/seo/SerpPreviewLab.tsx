"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Globe, Share2, Image as ImageIcon } from 'lucide-react';

export default function SerpPreviewLab() {
  const [title, setTitle] = useState("Learn Frontend Engineering");
  const [desc, setDesc] = useState("Master HTML, CSS, and React in this interactive visual guide.");
  
  // SEO Constants
  const MAX_TITLE = 60;
  const MAX_DESC = 160;

  return (
    <div className="w-full bg-slate-900/90 border border-emerald-500/20 rounded-2xl backdrop-blur-md overflow-hidden flex flex-col">
      <div className="p-4 border-b border-white/5 bg-black/20 flex justify-between items-center">
        <h3 className="font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2">
            <Search className="text-emerald-400" size={16} /> Metadata Simulator
        </h3>
        <div className="text-[10px] font-mono text-slate-500">
           PREVIEW_MODE: LIVE
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* INPUTS */}
        <div className="space-y-6">
            <div>
                <div className="flex justify-between mb-1">
                    <label className="text-xs font-bold text-slate-400 uppercase">Page Title (&lt;title&gt;)</label>
                    <span className={`text-xs font-mono ${title.length > MAX_TITLE ? 'text-red-400' : 'text-emerald-400'}`}>
                        {title.length}/{MAX_TITLE}
                    </span>
                </div>
                <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-slate-800 border border-white/10 rounded p-2 text-sm text-white focus:border-emerald-500 outline-none"
                />
            </div>
            <div>
                <div className="flex justify-between mb-1">
                    <label className="text-xs font-bold text-slate-400 uppercase">Meta Description</label>
                    <span className={`text-xs font-mono ${desc.length > MAX_DESC ? 'text-red-400' : 'text-emerald-400'}`}>
                        {desc.length}/{MAX_DESC}
                    </span>
                </div>
                <textarea 
                    value={desc} 
                    onChange={(e) => setDesc(e.target.value)}
                    className="w-full bg-slate-800 border border-white/10 rounded p-2 text-sm text-white focus:border-emerald-500 outline-none h-24 resize-none"
                />
            </div>
        </div>

        {/* PREVIEWS */}
        <div className="space-y-6">
            
            {/* Google Result */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center">
                        <Globe size={14} className="text-slate-500" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] text-slate-800 font-bold">The Knowledge Web</span>
                        <span className="text-[8px] text-slate-500">https://society-os.com/engineering</span>
                    </div>
                </div>
                <div className="text-[#1a0dab] text-lg font-medium hover:underline cursor-pointer truncate">
                    {title || "Page Title"}
                </div>
                <div className="text-sm text-[#4d5156] line-clamp-2">
                    {desc || "No description provided."}
                </div>
            </div>

            {/* Social Card (Open Graph) */}
            <div className="bg-slate-800 rounded-lg overflow-hidden border border-white/10">
                <div className="h-32 bg-slate-700 flex items-center justify-center text-slate-500 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[url('/grid-pattern.svg')]"></div>
                    <ImageIcon size={32} />
                    <span className="ml-2 text-xs font-mono">og:image</span>
                </div>
                <div className="p-3 bg-slate-900 border-t border-white/5">
                    <div className="text-xs text-slate-500 uppercase font-bold mb-1">society-os.com</div>
                    <div className="text-white font-bold truncate mb-1">{title}</div>
                    <div className="text-xs text-slate-400 line-clamp-1">{desc}</div>
                </div>
            </div>

        </div>

      </div>
    </div>
  );
}