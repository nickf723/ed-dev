"use client";
import Link from "next/link";
import ServerRackBackground from "./ServerRackBackground";
import ExpressApiLab from "./ExpressApiLab";
import { 
  Server, Database, Network, Box, 
  ArrowRight, Cpu, HardDrive, Terminal 
} from "lucide-react";

export default function NodePage() {
  return (
    <main className="relative min-h-screen bg-[#020617] text-slate-200 overflow-hidden font-sans selection:bg-emerald-500/30">
      <ServerRackBackground />
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 py-12">
        <header className="mb-16 border-b border-emerald-500/20 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/applied-science/engineering/software/frontend/javascript" className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded hover:bg-emerald-500/20 transition-colors">
              <Terminal className="text-emerald-400" size={20} />
            </Link>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-400">
              JavaScript // Runtime
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none">
            NODE<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-300">.JS</span>
          </h1>
          <p className="mt-6 text-slate-400 max-w-2xl text-lg font-light leading-relaxed border-l-2 border-emerald-500/50 pl-6">
            Node.js takes JavaScript out of the browser and puts it on the server. Built on Chrome's V8 engine, it uses an event-driven, non-blocking I/O model that makes it lightweight and efficient for data-intensive real-time applications.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-6 space-y-12">
            
            {/* The V8 Pitch */}
            <div className="p-6 bg-slate-900/60 border border-white/5 rounded-2xl backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Cpu size={20} className="text-emerald-400" /> The V8 Engine
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                Node.js isn't a language; it's a <strong>Runtime</strong>. It wraps Google's V8 engine (written in C++) to compile JS into native machine code, giving it incredible performance for a scripting language.
              </p>
            </div>
            
            

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Feature icon={Network} title="Non-Blocking I/O" desc="Handles thousands of concurrent connections without creating new threads." />
                <Feature icon={Box} title="NPM" desc="The largest software registry in the world. 1.3M+ packages." />
                <Feature icon={Server} title="Microservices" desc="Build small, independent services that communicate via APIs." />
                <Feature icon={HardDrive} title="File System" desc="Read and write files directly to the server's hard drive." />
            </div>

            

            {/* Architecture Note */}
            <div className="flex gap-4 p-4 bg-emerald-900/10 border border-emerald-500/20 rounded-xl">
                <Database className="text-emerald-500 shrink-0" />
                <div>
                    <h4 className="text-sm font-bold text-white uppercase">The Full Stack</h4>
                    <p className="text-xs text-slate-400 mt-1">
                        With Node, you can use the same language (JS) for the Frontend, Backend, and Database (MongoDB). This is the <strong>MERN</strong> stack.
                    </p>
                </div>
            </div>

          </div>

          <div className="lg:col-span-6 space-y-8">
            <ExpressApiLab />
            
            <div className="p-6 bg-slate-900/50 border border-white/5 rounded-2xl">
               <h4 className="text-sm font-bold text-white uppercase mb-4 flex items-center gap-2">
                   <Box size={16} className="text-slate-400" /> Key Frameworks
               </h4>
               <div className="space-y-4">
                  <Framework 
                    title="Express" 
                    desc="Minimalist web framework for servers." 
                    code="npm install express" 
                  />
                  <Framework 
                    title="Socket.io" 
                    desc="Real-time, bidirectional communication." 
                    code="npm install socket.io" 
                  />
                  <Framework 
                    title="Mongoose" 
                    desc="Object modeling for MongoDB." 
                    code="npm install mongoose" 
                  />
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
        <div className="p-4 bg-black/40 border border-white/5 rounded-xl hover:border-emerald-500/30 transition-colors">
            <Icon className="text-emerald-400 mb-2" size={20} />
            <h4 className="text-sm font-bold text-white mb-1">{title}</h4>
            <p className="text-xs text-slate-400 leading-snug">{desc}</p>
        </div>
    )
}

function Framework({ title, desc, code }: any) {
    return (
        <div className="border-b border-white/5 last:border-0 pb-3 last:pb-0">
            <div className="flex justify-between items-baseline mb-1">
                <span className="text-sm font-bold text-white">{title}</span>
            </div>
            <p className="text-xs text-slate-400 mb-2">{desc}</p>
            <code className="text-[10px] font-mono text-emerald-400 bg-black/40 px-2 py-1 rounded block w-fit">
                {code}
            </code>
        </div>
    )
}