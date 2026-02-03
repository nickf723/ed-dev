"use client";
import Link from "next/link";
import GridPatternBackground from "./GridPatternBackground";
import BalanceScaleLab from "./BalanceScaleLab";
import { 
  Calculator, Scale, Hash, X, 
  ArrowRight, Box, Divide, Percent 
} from "lucide-react";

export default function PreAlgebraPage() {
  // 7th Grade Curriculum Modules
  const modules = [
    { 
      title: "Integers & Negatives", 
      href: "/formal-science/mathematics/algebra/pre-algebra/integers", 
      icon: Hash, 
      color: "text-blue-400", 
      border: "hover:border-blue-500/50",
      bg: "hover:bg-blue-500/10",
      desc: "The number line extends both ways. Adding and subtracting negative numbers." 
    },
    { 
      title: "Order of Operations", 
      href: "/formal-science/mathematics/algebra/pre-algebra/pemdas", 
      icon: Calculator, 
      color: "text-yellow-400", 
      border: "hover:border-yellow-500/50",
      bg: "hover:bg-yellow-500/10",
      desc: "PEMDAS. Why we multiply before we add to get the right answer." 
    },
    { 
      title: "Ratios & Proportions", 
      href: "/formal-science/mathematics/algebra/pre-algebra/ratios", 
      icon: Percent, 
      color: "text-rose-400", 
      border: "hover:border-rose-500/50",
      bg: "hover:bg-rose-500/10",
      desc: "Scaling up and down. Understanding relationships like speed and unit price." 
    },
    { 
      title: "One-Step Equations", 
      href: "/formal-science/mathematics/algebra/pre-algebra/equations", 
      icon: Scale, 
      color: "text-emerald-400", 
      border: "hover:border-emerald-500/50",
      bg: "hover:bg-emerald-500/10",
      desc: "Isolating the variable. Using inverse operations to solve for x." 
    },
  ];

  return (
    <main className="relative min-h-screen bg-[#172554] text-slate-200 overflow-hidden font-sans selection:bg-blue-500/30">
      <GridPatternBackground />
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* HERO */}
        <header className="mb-16 border-b border-blue-500/20 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/formal-science/mathematics" className="p-2 bg-blue-500/10 border border-blue-500/30 rounded hover:bg-blue-500/20 transition-colors">
              <Calculator className="text-blue-400" size={20} />
            </Link>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-blue-400">
              Middle School Math
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
            PRE <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-yellow-200">ALGEBRA</span>
          </h1>
          <p className="mt-6 text-slate-300 max-w-2xl text-lg font-light leading-relaxed border-l-2 border-blue-500/50 pl-6">
            This is the bridge between Arithmetic and Algebra. Here, we stop seeing math as just "calculating answers" and start seeing it as a language of relationships. We introduce the unknown: $x$.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: CONCEPTS & NAVIGATION */}
          <div className="lg:col-span-6 space-y-12">
            
            {/* The Shift in Thinking */}
            <div className="p-6 bg-slate-900/60 border border-white/5 rounded-2xl backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Box size={20} className="text-blue-400" /> Meeting the Variable
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                In elementary school, you saw: <strong>2 + 3 = ?</strong><br/>
                In algebra, we swap it: <strong>2 + x = 5</strong><br/><br/>
                The box is no longer at the end. It's in the middle. Algebra is the detective work of finding what number goes in the box to make the statement true.
              </p>
            </div>
            
            

            {/* Navigation Grid */}
            <div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {modules.map((m) => (
                   <Link 
                     key={m.title} 
                     href={m.href}
                     className={`group p-5 bg-black/40 border border-white/5 rounded-xl transition-all hover:-translate-y-1 ${m.border} ${m.bg}`}
                   >
                      <div className="flex items-start justify-between mb-3">
                         <m.icon className={m.color} size={24} />
                         <ArrowRight size={16} className={`opacity-0 group-hover:opacity-100 transition-opacity ${m.color}`} />
                      </div>
                      <h4 className="font-bold text-white text-sm mb-1">{m.title}</h4>
                      <p className="text-xs text-slate-400 leading-snug">{m.desc}</p>
                   </Link>
                 ))}
               </div>
            </div>

            

          </div>

          {/* RIGHT: THE LAB */}
          <div className="lg:col-span-6 space-y-8">
            <BalanceScaleLab />
            
            <div className="p-6 bg-blue-900/20 border border-blue-500/20 rounded-2xl">
               <h4 className="text-sm font-bold text-white uppercase mb-4 flex items-center gap-2">
                   <Scale size={16} className="text-blue-400" /> Inverse Operations
               </h4>
               <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  To solve for $x$, we have to "undo" what was done to it. We use opposites.
               </p>
               <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="flex justify-between p-2 bg-black/40 rounded">
                      <span className="text-slate-400">If you see (+)</span>
                      <span className="text-white">You do (-)</span>
                  </div>
                  <div className="flex justify-between p-2 bg-black/40 rounded">
                      <span className="text-slate-400">If you see (-)</span>
                      <span className="text-white">You do (+)</span>
                  </div>
                  <div className="flex justify-between p-2 bg-black/40 rounded">
                      <span className="text-slate-400">If you see (×)</span>
                      <span className="text-white">You do (÷)</span>
                  </div>
                  <div className="flex justify-between p-2 bg-black/40 rounded">
                      <span className="text-slate-400">If you see (÷)</span>
                      <span className="text-white">You do (×)</span>
                  </div>
               </div>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}