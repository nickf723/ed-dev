"use client";
import Link from "next/link";
import EdgeNetworkBackground from "./EdgeNetworkBackground";
import RenderingModesLab from "./RenderingModesLab";
import { 
  Package, Server, Globe, Zap, 
  ArrowRight, Layers, FileCode, Cpu 
} from "lucide-react";

export default function NextJsPage() {
  return (
    <main className="relative min-h-screen bg-[#000000] text-slate-200 overflow-hidden font-sans selection:bg-white/30">
      <EdgeNetworkBackground />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] opacity-80 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 py-12">
        <header className="mb-16 border-b border-white/10 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/applied-science/engineering/software/frontend/javascript" className="p-2 bg-white/10 border border-white/20 rounded hover:bg-white/20 transition-colors">
              <Package className="text-white" size={20} />
            </Link>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-400">
              JavaScript // Framework
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none">
            NEXT<span className="text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-600">.JS</span>
          </h1>
          <p className="mt-6 text-zinc-400 max-w-2xl text-lg font-light leading-relaxed border-l-2 border-white/20 pl-6">
            The React Framework for the Web. Next.js handles the configuration, routing, and backend integration so developers can focus on building. It creates a seamless hybrid between the server and the browser.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: THEORY & FEATURES */}
          <div className="lg:col-span-6 space-y-12">
            
            {/* The Pitch */}
            <div className="p-6 bg-zinc-900/50 border border-white/10 rounded-2xl backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Globe size={20} /> The Hybrid Web
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                React is a UI library. Next.js is a **Framework**. It adds the missing pieces: File-system Routing, API Routes, and Image Optimization. It allows you to choose *per page* whether to render on the server or the client.
              </p>
            </div>
            
            

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Feature icon={Layers} title="File-System Routing" desc="Create a file in /app, and it becomes a URL automatically." />
                <Feature icon={Server} title="Server Components" desc="Render React components on the server for zero client-side JS." />
                <Feature icon={Cpu} title="API Routes" desc="Build backend endpoints (Node.js) directly alongside your frontend." />
                <Feature icon={Zap} title="Image Optimization" desc="Automatically resize and serve modern image formats (WebP/AVIF)." />
            </div>

            

            {/* Vercel Mention */}
            <div className="flex gap-4 p-4 bg-white/5 border border-white/10 rounded-xl">
                <div className="w-10 h-10 bg-black rounded-full border border-white flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5"><path d="M12 1L24 22H0L12 1Z" /></svg>
                </div>
                <div>
                    <h4 className="text-sm font-bold text-white uppercase">The Vercel Ecosystem</h4>
                    <p className="text-xs text-zinc-500 mt-1">
                        Built by Vercel to run optimally on the Edge. While open source, Next.js is designed to deploy globally in seconds.
                    </p>
                </div>
            </div>

          </div>

          {/* RIGHT: THE LAB */}
          <div className="lg:col-span-6 space-y-8">
            <RenderingModesLab />
            
            <div className="p-6 bg-gradient-to-b from-zinc-900 to-black border border-white/10 rounded-2xl">
               <h4 className="text-sm font-bold text-white uppercase mb-4 flex items-center gap-2">
                   <FileCode size={16} className="text-zinc-500" /> App Router Structure
               </h4>
               <div className="font-mono text-xs space-y-2 text-zinc-400">
                  <div className="flex items-center gap-2"><FolderIcon /> app/</div>
                  <div className="flex items-center gap-2 pl-4"><FileIcon color="text-yellow-200" /> layout.tsx <span className="text-zinc-600">// Root UI</span></div>
                  <div className="flex items-center gap-2 pl-4"><FileIcon color="text-blue-300" /> page.tsx <span className="text-zinc-600">// Home Route (/)</span></div>
                  <div className="flex items-center gap-2 pl-4"><FolderIcon /> dashboard/</div>
                  <div className="flex items-center gap-2 pl-8"><FileIcon color="text-blue-300" /> page.tsx <span className="text-zinc-600">// /dashboard</span></div>
                  <div className="flex items-center gap-2 pl-8"><FileIcon color="text-emerald-300" /> loading.tsx <span className="text-zinc-600">// Spinner</span></div>
               </div>
            </div>
            
            
          </div>

        </div>
      </div>
    </main>
  );
}

function Feature({ icon: Icon, title, desc }: any) {
    return (
        <div className="p-4 bg-zinc-900/30 border border-white/5 rounded-xl hover:border-white/20 transition-colors">
            <Icon className="text-white mb-2" size={20} />
            <h4 className="text-sm font-bold text-white mb-1">{title}</h4>
            <p className="text-xs text-zinc-500 leading-snug">{desc}</p>
        </div>
    )
}

function FolderIcon() {
    return <svg className="w-4 h-4 fill-blue-500" viewBox="0 0 24 24"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"/></svg>
}

function FileIcon({ color }: { color: string }) {
    return <svg className={`w-4 h-4 ${color}`} viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
}