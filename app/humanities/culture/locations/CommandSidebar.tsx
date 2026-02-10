"use client";
import React, { useState, useMemo } from 'react';
import { LOCATIONS, LocationNode } from './locationsData';
import { 
  Globe, ChevronRight, ChevronDown, 
  MapPin, Search, Database, Layers 
} from 'lucide-react';

interface SidebarProps {
  onSelect: (id: string) => void;
  activeId: string | null;
}

export default function CommandSidebar({ onSelect, activeId }: SidebarProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ 'North America': true, 'Asia': true });
  const [search, setSearch] = useState("");

  const toggle = (key: string) => {
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // 1. Group Data by Hierarchy
  const tree = useMemo(() => {
    const groups: Record<string, Record<string, LocationNode[]>> = {};

    LOCATIONS.forEach(loc => {
      if (!groups[loc.continent]) groups[loc.continent] = {};
      if (!groups[loc.continent][loc.country]) groups[loc.continent][loc.country] = [];
      groups[loc.continent][loc.country].push(loc);
    });

    return groups;
  }, []);

  // 2. Filter Logic (Flatten tree if searching)
  const isSearching = search.length > 0;
  const filteredList = LOCATIONS.filter(l => l.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex flex-col h-full bg-slate-950/90 backdrop-blur-md border-r border-slate-800 w-80 z-20 shadow-2xl">
      
      {/* HEADER */}
      <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-2 text-cyan-500 mb-6 uppercase tracking-widest font-bold text-xs">
              <Database size={14} /> Orbital Command
          </div>
          
          <button 
            onClick={() => onSelect('global')}
            className={`w-full py-3 mb-4 rounded flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wide border transition-all ${activeId === 'global' ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'}`}
          >
             <Globe size={14} /> Global View
          </button>

          <div className="relative">
              <input 
                  type="text" 
                  placeholder="Filter nodes..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 pl-9 pr-4 text-xs text-white focus:border-cyan-500 outline-none transition-colors"
              />
              <Search size={14} className="absolute left-3 top-2.5 text-slate-500" />
          </div>
      </div>

      {/* TREE VIEW */}
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          {isSearching ? (
              // FLAT LIST (Search Mode)
              <div className="space-y-2">
                  {filteredList.map(loc => (
                      <NodeButton key={loc.id} loc={loc} activeId={activeId} onSelect={onSelect} />
                  ))}
                  {filteredList.length === 0 && <div className="text-xs text-slate-500 text-center py-4">No signals found.</div>}
              </div>
          ) : (
              // HIERARCHICAL LIST (Tree Mode)
              <div className="space-y-4">
                  {Object.entries(tree).map(([continent, countries]) => (
                      <div key={continent}>
                          {/* Level 1: Continent */}
                          <button 
                            onClick={() => toggle(continent)}
                            className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase hover:text-white mb-2 w-full text-left"
                          >
                              {expanded[continent] ? <ChevronDown size={12} className="text-cyan-500" /> : <ChevronRight size={12} />}
                              {continent}
                          </button>

                          {expanded[continent] && (
                              <div className="ml-2 border-l border-slate-800 pl-2 space-y-3">
                                  {Object.entries(countries).map(([country, locs]) => (
                                      <div key={country}>
                                          {/* Level 2: Country */}
                                          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase mb-1 px-2">
                                              <Layers size={10} /> {country}
                                          </div>
                                          
                                          {/* Level 3: Locations */}
                                          <div className="space-y-1">
                                              {locs.map(loc => (
                                                  <NodeButton key={loc.id} loc={loc} activeId={activeId} onSelect={onSelect} />
                                              ))}
                                          </div>
                                      </div>
                                  ))}
                              </div>
                          )}
                      </div>
                  ))}
              </div>
          )}
      </div>

      {/* FOOTER */}
      <div className="p-4 border-t border-slate-800 text-[9px] font-mono text-slate-600 uppercase flex justify-between">
          <span>Uplink Secure</span>
          <span>v2.4.0</span>
      </div>
    </div>
  );
}

// Helper Button Component
function NodeButton({ loc, activeId, onSelect }: any) {
    return (
        <button
            onClick={() => onSelect(loc.id)}
            className={`w-full text-left px-3 py-2 rounded text-xs font-medium transition-all flex items-center justify-between group ${activeId === loc.id ? 'bg-cyan-900/30 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent'}`}
        >
            <span className="flex items-center gap-2">
                <MapPin size={12} className={activeId === loc.id ? 'text-cyan-400' : 'text-slate-600 group-hover:text-slate-400'} />
                {loc.name}
            </span>
            <div className={`w-1.5 h-1.5 rounded-full ${loc.status === 'Online' ? 'bg-green-500' : loc.status === 'Locked' ? 'bg-red-500' : 'bg-slate-600'}`} />
        </button>
    )
}