"use client";
import Link from "next/link";
import EventLoopBackground from "./EventLoopBackground";
import AsyncPlayground from "./AsyncPlayground";
import { 
  Terminal, Code, Zap, Braces, 
  ArrowRight, Activity, Layers, Boxes,
  Package, FileJson, Server, LayoutTemplate
} from "lucide-react";

export default function JavascriptPage() {
  const concepts = [
    { title: "DOM Manipulation", icon: Layers, desc: "Selecting HTML elements and changing their content or style dynamically." },
    { title: "Event Listeners", icon: Zap, desc: "Responding to user actions like clicks, scrolls, and key presses." },
    { title: "Asynchronous JS", icon: Activity, desc: "Handling API requests, Promises, and the Event Loop without freezing the UI." },
    { title: "Modern ES6+", icon: Braces, desc: "Arrow functions, destructuring, modules, and classes." }
  ];

  // New Ecosystem Links
  const ecosystem = [
    { 
      id: "typescript", 
      title: "TypeScript", 
      icon: FileJson, 
      color: "text-blue-400", 
      border: "hover:border-blue-500/50",
      bg: "hover:bg-blue-500/10",
      desc: "JavaScript with syntax for types. Adds safety and scale.",
      href: "/applied-science/engineering/software/frontend/javascript/typescript"
    },
    { 
      id: "react", 
      title: "React.js", 
      icon: LayoutTemplate, 
      color: "text-cyan-400", 
      border: "hover:border-cyan-500/50",
      bg: "hover:bg-cyan-500/10",
      desc: "The library for web and native user interfaces.",
      href: "/applied-science/engineering/software/frontend/javascript/react"
    },
    { 
      id: "node", 
      title: "Node.js", 
      icon: Server, 
      color: "text-emerald-400", 
      border: "hover:border-emerald-500/50",
      bg: "hover:bg-emerald-500/10",
      desc: "JavaScript runtime built on Chrome's V8 engine.",
      href: "/applied-science/engineering/software/frontend/javascript/node"
    },
    { 
      id: "next", 
      title: "Next.js", 
      icon: Package, 
      color: "text-white", 
      border: "hover:border-white/50",
      bg: "hover:bg-white/10",
      desc: "The React framework for the web. Server-side rendering.",
      href: "/applied-science/engineering/software/frontend/javascript/nextjs"
    }
  ];

  return (
    <main className="relative min-h-screen bg-[#0f172a] text-slate-200 overflow-hidden font-sans selection:bg-yellow-500/30">
      <EventLoopBackground />
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* HERO */}
        <header className="mb-16 border-b border-yellow-500/20 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/applied-science/engineering/software/frontend" className="p-2 bg-yellow-500/10 border border-yellow-500/30 rounded hover:bg-yellow-500/20 transition-colors">
              <Terminal className="text-yellow-400" size={20} />
            </Link>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-yellow-400">
              Frontend // Logic
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none">
            JAVA<span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">SCRIPT</span>
          </h1>
          <p className="mt-6 text-slate-400 max-w-2xl text-lg font-light leading-relaxed border-l-2 border-yellow-500/50 pl-6">
            The programming language of the web. While HTML provides structure and CSS provides style, JavaScript provides <strong>life</strong>. It turns static documents into interactive applications.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: THEORY */}
          <div className="lg:col-span-6 space-y-12">
            
            {/* The Engine Pitch */}
            <div className="p-6 bg-slate-900/60 border border-white/5 rounded-2xl backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Code size={20} className="text-yellow-400" /> Client-Side Logic
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                JavaScript runs directly in the user's browser. This allows for instant feedback (like form validation) without needing to wait for a server response.
              </p>
              
              <div className="mt-4 p-3 bg-black/50 border border-white/10 rounded font-mono text-xs">
                <span className="text-purple-400">const</span> btn = document.<span className="text-yellow-200">querySelector</span>(<span className="text-green-300">'.btn'</span>);<br/>
                btn.<span className="text-yellow-200">addEventListener</span>(<span className="text-green-300">'click'</span>, () ={'>'} {'{'}<br/>
                &nbsp;&nbsp;alert(<span className="text-green-300">'Hello World!'</span>);<br/>
                {'}'});
              </div>
            </div>

            {/* Core Concepts Grid */}
            <div>
               <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Core Capabilities</h3>
               <div className="grid grid-cols-1 gap-4">
                 {concepts.map((item) => (
                   <div key={item.title} className="group relative p-5 bg-black/40 border border-white/5 hover:border-yellow-500/50 rounded-xl transition-all hover:translate-x-2">
                     <div className="flex items-start gap-4">
                       <div className="p-3 rounded-lg bg-white/5 text-yellow-400">
                         <item.icon size={24} />
                       </div>
                       <div>
                         <h4 className="text-lg font-bold text-white mb-1">{item.title}</h4>
                         <p className="text-xs text-slate-400">{item.desc}</p>
                       </div>
                     </div>
                   </div>
                 ))}
               </div>
            </div>

          </div>

          {/* RIGHT: THE LAB & ECOSYSTEM */}
          <div className="lg:col-span-6 space-y-8">
            <AsyncPlayground />
            
            

            {/* UPGRADED ECOSYSTEM SECTION */}
            <div className="p-1 rounded-2xl bg-gradient-to-b from-white/10 to-transparent">
              <div className="bg-[#020617] rounded-[14px] p-6 border border-white/5">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-sm font-bold text-white uppercase flex items-center gap-2">
                      <Boxes size={16} className="text-yellow-400" /> Install Dependencies
                  </h4>
                  <span className="text-[10px] font-mono text-slate-500">package.json</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {ecosystem.map((tech) => (
                      <Link 
                        key={tech.id} 
                        href={tech.href}
                        className={`group p-4 bg-slate-900/50 border border-white/5 rounded-xl transition-all hover:-translate-y-1 ${tech.border} ${tech.bg}`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <tech.icon size={20} className={`${tech.color}`} />
                          <ArrowRight size={14} className={`opacity-0 group-hover:opacity-100 transition-opacity ${tech.color}`} />
                        </div>
                        <h5 className="font-bold text-white text-sm mb-1">{tech.title}</h5>
                        <p className="text-[10px] text-slate-400 leading-snug">{tech.desc}</p>
                      </Link>
                    ))}
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}