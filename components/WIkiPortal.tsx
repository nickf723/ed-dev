"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Globe, ExternalLink, Image as ImageIcon, Loader2, AlertCircle, List, Database, Beaker } from "lucide-react";
import ImageLab from "@/components/ImageLab";

type WikiResult = {
  pageid: number;
  title: string;
  extract: string;
  thumbnail?: { source: string; width: number; height: number };
};

export default function WikiPortal() {
  const [query, setQuery] = useState("Tardigrade");
  const [results, setResults] = useState<WikiResult[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [labImage, setLabImage] = useState<string | null>(null);

  // Fetch Top 5 Results
  const fetchWiki = async (searchTerm: string) => {
    if (!searchTerm) return;
    setLoading(true);
    try {
        const endpoint = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(searchTerm)}&gsrlimit=5&prop=pageimages|extracts&pithumbsize=1000&exintro&explaintext&exsentences=4&origin=*&format=json`;
        const res = await fetch(endpoint);
        const json = await res.json();
        
        if (json.query && json.query.pages) {
            const pages = Object.values(json.query.pages) as WikiResult[];
            setResults(pages);
            setActiveId(pages[0].pageid);
        } else {
            setResults([]);
        }
    } catch (err) {
        console.error("Wiki Error", err);
    } finally {
        setLoading(false);
    }
  };

  // Initial Load
  useEffect(() => { fetchWiki(query); }, []);

  const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();
      fetchWiki(query);
  };

  const activePage = results.find(p => p.pageid === activeId);

  return (
    <div className="space-y-6">
        
        {/* SEARCH BAR */}
        <div className="relative max-w-2xl mx-auto z-20">
            <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full opacity-20" />
            <form onSubmit={handleSearch} className="relative flex items-center bg-neutral-900 border border-white/10 rounded-full px-4 py-2 shadow-2xl">
                <Globe className="text-cyan-400 mr-3" size={18} />
                <input 
                    type="text" 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="bg-transparent border-none focus:outline-none text-white w-full placeholder-neutral-500 font-medium"
                    placeholder="Query the global database..."
                />
                <button type="submit" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors text-white">
                    {loading ? <Loader2 className="animate-spin" size={16} /> : <Search size={16} />}
                </button>
            </form>
        </div>

        {/* IMAGE LAB MODAL */}
        <AnimatePresence>
            {labImage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-black/80 backdrop-blur-sm">
                    <div className="w-full max-w-5xl">
                        <ImageLab src={labImage} onClose={() => setLabImage(null)} />
                    </div>
                </div>
            )}
        </AnimatePresence>

        {/* MAIN DASHBOARD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[500px]">
            
            {/* LEFT: Results List */}
            <div className="lg:col-span-3 flex flex-col gap-2">
                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2 px-2 flex items-center gap-2">
                    <List size={12} /> Search Results
                </h3>
                {results.map((res) => (
                    <button
                        key={res.pageid}
                        onClick={() => setActiveId(res.pageid)}
                        className={`text-left p-3 rounded-lg border transition-all duration-200 ${
                            activeId === res.pageid 
                            ? "bg-cyan-950/30 border-cyan-500/30 text-cyan-100" 
                            : "bg-neutral-900/40 border-white/5 text-neutral-400 hover:bg-neutral-900 hover:border-white/10"
                        }`}
                    >
                        <h4 className="font-bold text-sm truncate">{res.title}</h4>
                    </button>
                ))}
                {results.length === 0 && !loading && (
                    <div className="p-4 text-center text-xs text-neutral-600 italic">No signal found.</div>
                )}
            </div>

            {/* CENTER: Active Content */}
            <div className="lg:col-span-6">
                <AnimatePresence mode="wait">
                    {activePage ? (
                        <motion.div
                            key={activePage.pageid}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-neutral-900/60 border border-white/10 rounded-2xl overflow-hidden h-full flex flex-col"
                        >
                            {/* Image Area */}
                            <div className="relative h-64 bg-black/40 group overflow-hidden">
                                {activePage.thumbnail ? (
                                    <>
                                        <img 
                                            src={activePage.thumbnail.source} 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
                                        
                                        {/* Controls */}
                                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button 
                                                onClick={() => setLabImage(activePage.thumbnail!.source)}
                                                className="flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur border border-white/20 rounded-full text-[10px] font-bold uppercase tracking-wider text-white hover:bg-pink-500/80 hover:border-pink-500 transition-all"
                                            >
                                                <Beaker size={12} /> Process in Lab
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex items-center justify-center h-full text-neutral-600">
                                        <ImageIcon size={48} />
                                    </div>
                                )}
                                <div className="absolute bottom-0 left-0 p-6">
                                    <h1 className="text-3xl font-black text-white drop-shadow-lg">{activePage.title}</h1>
                                </div>
                            </div>

                            {/* Text Area */}
                            <div className="p-6 flex-1 overflow-y-auto">
                                <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                                    {activePage.extract}
                                </p>
                                <a 
                                    href={`https://en.wikipedia.org/?curid=${activePage.pageid}`}
                                    target="_blank" rel="noreferrer"
                                    className="text-cyan-400 text-xs font-bold uppercase tracking-widest hover:underline flex items-center gap-2"
                                >
                                    Full Source Record <ExternalLink size={12} />
                                </a>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="h-full rounded-2xl border border-dashed border-neutral-800 flex items-center justify-center text-neutral-600">
                            <Database size={32} className="mb-2 opacity-50" />
                            <p className="text-xs">Awaiting Query...</p>
                        </div>
                    )}
                </AnimatePresence>
            </div>

            {/* RIGHT: Metadata / Actions */}
            <div className="lg:col-span-3 space-y-4">
                <div className="p-4 rounded-xl border border-white/5 bg-neutral-900/40">
                    <h3 className="text-xs font-bold text-neutral-400 mb-3 uppercase tracking-widest">Metadata</h3>
                    <div className="space-y-2 text-[10px] font-mono text-neutral-500">
                        <div className="flex justify-between">
                            <span>ID:</span> <span className="text-neutral-300">{activePage?.pageid || "N/A"}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Source:</span> <span className="text-neutral-300">MediaWiki API</span>
                        </div>
                        <div className="flex justify-between">
                            <span>License:</span> <span className="text-neutral-300">CC BY-SA 3.0</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Words:</span> <span className="text-neutral-300">{activePage?.extract.split(" ").length || 0}</span>
                        </div>
                    </div>
                </div>

                <div className="p-4 rounded-xl border border-pink-500/10 bg-pink-900/5">
                    <h3 className="text-xs font-bold text-pink-400 mb-2 uppercase tracking-widest">Did You Know?</h3>
                    <p className="text-[10px] text-neutral-400 leading-relaxed">
                        You can drag images from the Portal directly into your lesson plans (Feature in Roadmap). For now, use the <strong>Image Lab</strong> to process assets.
                    </p>
                </div>
            </div>

        </div>
    </div>
  );
}