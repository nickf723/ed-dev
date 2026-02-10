"use client";
import React from 'react';
import Link from 'next/link';
import { LocationNode } from './locationsData';
import { 
  X, MapPin, Globe, ShieldCheck, 
  ArrowRight, ExternalLink, Lock 
} from 'lucide-react';

interface PanelProps {
  loc: LocationNode | null;
  onClose: () => void;
}

export default function LocationDetailPanel({ loc, onClose }: PanelProps) {
  if (!loc) return null;

  const isOnline = loc.status === 'Online';

  return (
    <div className="absolute top-4 bottom-4 right-4 w-96 bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-[500] animate-in slide-in-from-right-10 duration-300">
      
      {/* HEADER IMAGE */}
      <div className="relative h-48 shrink-0">
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${loc.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
          
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-3 right-3 p-2 bg-black/50 hover:bg-red-500/80 rounded-full text-white transition-colors backdrop-blur-sm"
          >
              <X size={16} />
          </button>

          {/* Status Badge */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
              <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest border backdrop-blur-md flex items-center gap-2 ${isOnline ? 'bg-green-500/20 border-green-500/50 text-green-400' : 'bg-red-500/20 border-red-500/50 text-red-400'}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
                  {loc.status}
              </div>
          </div>
      </div>

      {/* CONTENT SCROLL */}
      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {/* Title */}
          <div className="mb-6">
              <h2 className="text-3xl font-black text-white uppercase tracking-tight leading-none mb-1">{loc.name}</h2>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-500">
                  <MapPin size={12} />
                  {loc.coords[0].toFixed(4)}° N, {loc.coords[1].toFixed(4)}° E
              </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-3 bg-slate-800/50 rounded border border-slate-700">
                  <div className="text-[10px] text-slate-500 uppercase font-bold mb-1 flex items-center gap-1">
                      <Globe size={10} /> Region
                  </div>
                  <div className="text-sm text-slate-200 font-medium">{loc.continent}</div>
              </div>
              <div className="p-3 bg-slate-800/50 rounded border border-slate-700">
                  <div className="text-[10px] text-slate-500 uppercase font-bold mb-1 flex items-center gap-1">
                      <ShieldCheck size={10} /> Sector
                  </div>
                  <div className="text-sm text-slate-200 font-medium truncate">
                      {loc.sector.join(', ')}
                  </div>
              </div>
          </div>

          {/* Description */}
          <div className="prose prose-invert prose-sm mb-8">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 border-b border-slate-800 pb-2">
                  System Analysis
              </h3>
              <p className="text-slate-300 leading-relaxed font-sans text-sm">
                  {loc.desc}
              </p>
          </div>
          
          {/* Map Insert */}
          <div className="mb-4">
             
          </div>

      </div>

      {/* FOOTER ACTION */}
      <div className="p-4 border-t border-slate-800 bg-slate-900">
          {isOnline ? (
              <Link 
                href={loc.link}
                className="flex items-center justify-center gap-2 w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold uppercase rounded-lg transition-all shadow-[0_0_20px_rgba(8,145,178,0.3)] hover:shadow-[0_0_30px_rgba(8,145,178,0.5)]"
              >
                  Initialize Uplink <ExternalLink size={16} />
              </Link>
          ) : (
              <button 
                disabled 
                className="flex items-center justify-center gap-2 w-full py-3 bg-slate-800 text-slate-500 font-bold uppercase rounded-lg cursor-not-allowed border border-slate-700"
              >
                  <Lock size={16} /> Access Denied
              </button>
          )}
      </div>
    </div>
  );
}