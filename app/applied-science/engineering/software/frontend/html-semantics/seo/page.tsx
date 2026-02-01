"use client";
import Link from "next/link";
import CrawlerBackground from "./CrawlerBackground";
import SerpPreviewLab from "./SerpPreviewLab";
import { 
  Search, Share2, Globe, FileCode, 
  ArrowRight, Hash, Eye 
} from "lucide-react";

export default function SeoPage() {
  return (
    <main className="relative min-h-screen bg-[#020617] text-slate-200 overflow-hidden font-sans selection:bg-emerald-500/30">
      <CrawlerBackground />
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* HERO */}
        <header className="mb-16 border-b border-emerald-500/20 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/applied-science/engineering/software/frontend/html-semantics" className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded hover:bg-emerald-500/20 transition-colors">
              <Search className="text-emerald-400" size={20} />
            </Link>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-400">
              HTML // Discovery
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none">
            SEO <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">&</span><br/>
            <span className="text-slate-500">METADATA</span>
          </h1>
          <p className="mt-6 text-slate-400 max-w-2xl text-lg font-light leading-relaxed border-l-2 border-emerald-500/50 pl-6">
            Code isn't just for browsers; it's for robots. Search Engine Optimization (SEO) relies on semantic HTML and invisible metadata to help crawlers understand, index, and rank your content.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: THEORY */}
          <div className="lg:col-span-6 space-y-12">
            
            {/* The Head Tag */}
            <div className="p-6 bg-slate-900/60 border border-white/5 rounded-2xl backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <FileCode size={20} className="text-emerald-400" /> The &lt;head&gt;
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                While the <code>&lt;body&gt;</code> is for humans, the <code>&lt;head&gt;</code> is for machines. It contains the instructions that determine how your site appears in Google searches and Twitter feeds.
              </p>
              
              <div className="bg-black/50 p-4 rounded-lg font-mono text-[10px] border-l-2 border-emerald-500 space-y-1">
                <div className="text-slate-500">&lt;head&gt;</div>
                <div className="pl-4">
                    <span className="text-emerald-400">&lt;title&gt;</span>The Knowledge Web<span className="text-emerald-400">&lt;/title&gt;</span>
                </div>
                <div className="pl-4">
                    <span className="text-emerald-400">&lt;meta</span> <span className="text-sky-400">name</span>="description" <span className="text-sky-400">content</span>="..." /<span className="text-emerald-400">&gt;</span>
                </div>
                <div className="pl-4">
                    <span className="text-emerald-400">&lt;meta</span> <span className="text-sky-400">property</span>="og:image" <span className="text-sky-400">content</span>="..." /<span className="text-emerald-400">&gt;</span>
                </div>
                <div className="text-slate-500">&lt;/head&gt;</div>
              </div>
            </div>

            

            {/* Key Tags Grid */}
            <div>
               <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Crucial Tags</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="p-4 bg-slate-900/60 border border-white/5 rounded-xl">
                    <div className="flex items-center gap-2 mb-2 text-emerald-400 font-bold text-sm">
                        <Globe size={16} /> Canonical
                    </div>
                    <p className="text-xs text-slate-400">Prevents duplicate content issues by telling Google which URL is the "master" copy.</p>
                 </div>
                 <div className="p-4 bg-slate-900/60 border border-white/5 rounded-xl">
                    <div className="flex items-center gap-2 mb-2 text-sky-400 font-bold text-sm">
                        <Share2 size={16} /> Open Graph
                    </div>
                    <p className="text-xs text-slate-400">Controls how links look when shared on social media (Image, Title, Desc).</p>
                 </div>
                 <div className="p-4 bg-slate-900/60 border border-white/5 rounded-xl">
                    <div className="flex items-center gap-2 mb-2 text-purple-400 font-bold text-sm">
                        <Hash size={16} /> JSON-LD
                    </div>
                    <p className="text-xs text-slate-400">Structured data that powers "Rich Snippets" (Star ratings, Recipes, Events).</p>
                 </div>
                 <div className="p-4 bg-slate-900/60 border border-white/5 rounded-xl">
                    <div className="flex items-center gap-2 mb-2 text-rose-400 font-bold text-sm">
                        <Eye size={16} /> Alt Text
                    </div>
                    <p className="text-xs text-slate-400">Describes images for blind users AND tells Google what the image contains.</p>
                 </div>
               </div>
            </div>
            
            
            

          </div>

          {/* RIGHT: THE LAB */}
          <div className="lg:col-span-6 space-y-8">
            <SerpPreviewLab />
            
            <div className="p-6 bg-emerald-950/20 border border-emerald-500/20 rounded-2xl">
               <h4 className="text-sm font-bold text-white uppercase mb-4">The Logic of Ranking</h4>
               <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Google doesn't "read" your article; it parses your DOM. It looks for signals:
               </p>
               <ul className="space-y-2">
                  <li className="flex items-center gap-3 text-xs text-slate-400">
                     <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                     <span>Is there exactly one <code>&lt;h1&gt;</code>?</span>
                  </li>
                  <li className="flex items-center gap-3 text-xs text-slate-400">
                     <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                     <span>Do link texts describe destination (not "click here")?</span>
                  </li>
                  <li className="flex items-center gap-3 text-xs text-slate-400">
                     <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                     <span>Is the meta description under 160 characters?</span>
                  </li>
               </ul>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}