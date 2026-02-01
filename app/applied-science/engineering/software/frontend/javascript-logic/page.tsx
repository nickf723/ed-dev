"use client";
import Link from "next/link";
import AsyncPlayground from "./AsyncPlayground";
import { 
  Terminal, Code, Zap, Braces, 
  ArrowRight, Activity, Layers, Boxes 
} from "lucide-react";

export default function JavascriptPage() {
  const concepts = [
    { title: "DOM Manipulation", icon: Layers, desc: "Selecting HTML elements and changing their content or style dynamically." },
    { title: "Event Listeners", icon: Zap, desc: "Responding to user actions like clicks, scrolls, and key presses." },
    { title: "Asynchronous JS", icon: Activity, desc: "Handling API requests, Promises, and the Event Loop without freezing the UI." },
    { title: "Modern ES6+", icon: Braces, desc: "Arrow functions, destructuring, modules, and classes." }
  ];

  return (
    <main className="relative min-h-screen bg-[#0f172a] text-slate-200 overflow-hidden font-sans selection:bg-yellow-500/30">
      {/* Dark overlay to make text pop */}
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
          
          {/* LEFT: CONCEPTS & THEORY */}
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

          {/* RIGHT: THE LAB */}
          <div className="lg:col-span-6 space-y-8">
            <AsyncPlayground />
            
            {/* The Ecosystem */}
            <div className="p-6 bg-yellow-900/10 border border-yellow-500/20 rounded-2xl">
               <h4 className="text-sm font-bold text-white uppercase mb-4 flex items-center gap-2">
                   <Boxes size={16} className="text-yellow-400" /> The Ecosystem
               </h4>
               <p className="text-xs text-slate-400 leading-relaxed mb-4">
                   Modern JavaScript rarely lives alone. It is the foundation for a massive ecosystem of tools and frameworks.
               </p>
               <div className="flex flex-wrap gap-2">
                  <Badge text="React" color="bg-sky-500/10 text-sky-400 border-sky-500/20" />
                  <Badge text="TypeScript" color="bg-blue-500/10 text-blue-400 border-blue-500/20" />
                  <Badge text="Node.js" color="bg-green-500/10 text-green-400 border-green-500/20" />
                  <Badge text="Next.js" color="bg-white/10 text-white border-white/20" />
               </div>
            </div>
            
            

          </div>

        </div>
      </div>
    </main>
  );
}

function Badge({ text, color }: { text: string, color: string }) {
    return (
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${color}`}>
            {text}
        </span>
    )
}