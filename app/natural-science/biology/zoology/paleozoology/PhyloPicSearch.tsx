"use client";
import React, { useState } from 'react';
import { Search, Loader2, AlertCircle } from 'lucide-react';

export default function PhyloPicSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const searchPhylo = async () => {
      if(!query) return;
      setLoading(true);
      setError(false);
      setResults([]);

      try {
          // 1. Search for the Node (Taxon)
          const searchRes = await fetch(`https://api.phylopic.org/autocomplete?query=${query}`);
          const searchData = await searchRes.json();
          
          if(searchData.matches && searchData.matches.length > 0) {
              // 2. Get images for the top 3 matches
              const newResults = [];
              for(let i=0; i<Math.min(3, searchData.matches.length); i++) {
                  const match = searchData.matches[i];
                  // Get specific image data
                  const imgRes = await fetch(`https://api.phylopic.org/images?filter_name=${match.title.toLowerCase()}&embed_items=true`);
                  const imgData = await imgRes.json();
                  
                  if(imgData._embedded && imgData._embedded.items.length > 0) {
                      const item = imgData._embedded.items[0];
                      newResults.push({
                          name: match.title,
                          img: item._links.rasterFiles.href || item._links.sourceFile.href,
                          uuid: item.uuid
                      });
                  }
              }
              setResults(newResults);
          } else {
              setError(true);
          }
      } catch (err) {
          setError(true);
      }
      setLoading(false);
  };

  return (
    <div className="w-full bg-[#1c1917] border border-stone-800 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4 text-amber-600 font-bold uppercase text-xs tracking-widest">
            <Search size={14} /> Global Taxonomy Database
        </div>
        
        <div className="flex gap-2 mb-6">
            <input 
                type="text" 
                placeholder="Search any extinct species (e.g. 'Velociraptor')"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && searchPhylo()}
                className="flex-1 bg-black border border-stone-700 rounded px-4 py-2 text-stone-200 focus:outline-none focus:border-amber-600 transition-colors"
            />
            <button 
                onClick={searchPhylo}
                disabled={loading}
                className="px-6 py-2 bg-amber-700 text-white font-bold uppercase rounded hover:bg-amber-600 transition-colors disabled:opacity-50"
            >
                {loading ? <Loader2 size={18} className="animate-spin" /> : "SCAN"}
            </button>
        </div>

        {error && (
            <div className="p-4 bg-red-900/20 border border-red-900/50 rounded text-red-400 text-xs flex items-center gap-2">
                <AlertCircle size={14} /> No specimens found in archive.
            </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {results.map((r, i) => (
                <div key={i} className="p-4 bg-black/40 border border-stone-800 rounded-lg flex flex-col items-center justify-center aspect-square hover:border-amber-600/50 transition-colors cursor-pointer group">
                    <img 
                        src={r.img} 
                        alt={r.name}
                        className="w-full h-32 object-contain opacity-60 group-hover:opacity-100 transition-opacity invert" 
                        // PhyloPic images are usually black, so 'invert' makes them white for dark mode
                    />
                    <div className="mt-4 text-xs font-bold text-stone-500 uppercase group-hover:text-white">{r.name}</div>
                </div>
            ))}
        </div>
        
        <div className="mt-4 text-[10px] text-stone-600 text-center font-mono">
            POWERED BY PHYLOPIC API
        </div>
    </div>
  );
}