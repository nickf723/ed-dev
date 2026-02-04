"use client";
import WorldMapExplorer from "./WorldMapExplorer";
import { Globe, Compass, Map } from "lucide-react";

export default function LocationsHubPage() {
  return (
    <main className="relative h-screen bg-[#0f172a] text-slate-200 overflow-hidden font-sans selection:bg-cyan-500/30">
      
      {/* MAP LAYER */}
      <div className="absolute inset-0 z-0">
          <WorldMapExplorer />
      </div>

      {/* UI OVERLAY */}
      <div className="relative z-10 pointer-events-none w-full h-full flex flex-col justify-between p-8">
          
          {/* Header */}
          <header className="flex justify-between items-start pointer-events-auto">
              <div>
                  <div className="flex items-center gap-2 text-cyan-400 mb-2">
                      <Globe size={20} />
                      <span className="text-xs font-bold uppercase tracking-widest">Global Network</span>
                  </div>
                  <h1 className="text-5xl font-black text-white uppercase tracking-tighter leading-none">
                      Locations
                  </h1>
              </div>
              <div className="bg-slate-900/80 backdrop-blur-md p-4 rounded-xl border border-white/10 text-right">
                  <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">Active Nodes</div>
                  <div className="text-2xl font-mono text-cyan-400 font-bold">01</div>
              </div>
          </header>

          {/* Footer */}
          <footer className="flex justify-between items-end pointer-events-auto">
              <div className="max-w-md bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                  <h3 className="text-sm font-bold text-white uppercase mb-2 flex items-center gap-2">
                      <Compass size={16} className="text-cyan-400" /> Explorer Mode
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                      Select a highlighted region to access its cultural archives. Currently syncing with North American servers.
                  </p>
              </div>
          </footer>

      </div>
    </main>
  );
}