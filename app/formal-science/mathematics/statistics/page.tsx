"use client";
import Link from "next/link";
import GaltonBoardBackground from "./GaltonBoardBackground";
import RegressionPlayground from "./RegressionPlayground";
import { 
  Sigma, BarChart3, ScatterChart, PieChart, 
  ArrowRight, Binary, Calculator, BrainCircuit,
  TrendingUp, Activity, FileSpreadsheet
} from "lucide-react";

export default function StatisticsPage() {
  // Navigation Modules (The Child Pages)
  const modules = [
    { 
      title: "Descriptive Statistics", 
      href: "/formal-science/mathematics/statistics/descriptive", 
      icon: BarChart3, 
      color: "text-teal-400",
      border: "hover:border-teal-500/50",
      bg: "hover:bg-teal-500/10",
      desc: "Summarizing datasets. Mean, Median, Mode, and standard deviation." 
    },
    { 
      title: "Inferential Statistics", 
      href: "/formal-science/mathematics/statistics/inferential", 
      icon: ScatterChart, 
      color: "text-indigo-400",
      border: "hover:border-indigo-500/50",
      bg: "hover:bg-indigo-500/10",
      desc: "Hypothesis testing, confidence intervals, and p-values." 
    },
    { 
      title: "Probability Theory", 
      href: "/formal-science/mathematics/statistics/probability", 
      icon: Binary, 
      color: "text-purple-400",
      border: "hover:border-purple-500/50",
      bg: "hover:bg-purple-500/10",
      desc: "Quantifying uncertainty, random variables, and distributions." 
    },
    { 
      title: "Bayesian Statistics", 
      href: "/formal-science/mathematics/statistics/bayesian", 
      icon: BrainCircuit, 
      color: "text-rose-400",
      border: "hover:border-rose-500/50",
      bg: "hover:bg-rose-500/10",
      desc: "Probabilistic reasoning that updates belief as new data arrives." 
    },
  ];

  return (
    <main className="relative min-h-screen bg-[#020617] text-slate-200 overflow-hidden font-sans selection:bg-indigo-500/30">
      <GaltonBoardBackground />
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* HERO */}
        <header className="mb-16 border-b border-indigo-500/20 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/formal-science/mathematics" className="p-2 bg-indigo-500/10 border border-indigo-500/30 rounded hover:bg-indigo-500/20 transition-colors">
              <Sigma className="text-indigo-400" size={20} />
            </Link>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-indigo-400">
              Mathematics // Data
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none">
            STATIS<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-teal-400">TICS</span>
          </h1>
          <p className="mt-6 text-slate-400 max-w-2xl text-lg font-light leading-relaxed border-l-2 border-indigo-500/50 pl-6">
            The science of collecting, analyzing, interpreting, and presenting data. In a chaotic world, statistics provides the tools to find the signal in the noise.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: INTERACTIVE MODULES */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* The Bell Curve Concept */}
            <div className="p-6 bg-slate-900/60 border border-white/5 rounded-2xl backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Activity size={20} className="text-indigo-400" /> The Central Limit Theorem
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                You are watching it happen in the background. When you sum up many independent random variables (like balls bouncing left or right), the result <em>always</em> converges to a Normal Distribution (The Bell Curve).
              </p>
            </div>
            
            

[Image of normal distribution curve standard deviation]


            {/* Navigation Grid */}
            <div>
               <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <FileSpreadsheet size={14} /> Core Curriculum
               </h3>
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
          <div className="lg:col-span-5 space-y-8">
            <RegressionPlayground />
            
            <div className="p-6 bg-slate-900/50 border border-white/5 rounded-2xl">
               <h4 className="text-sm font-bold text-white uppercase mb-4 flex items-center gap-2">
                   <Calculator size={16} className="text-slate-400" /> Statistical Notation
               </h4>
               <div className="space-y-4">
                  <Metric title="Mean (µ)" desc="Population Average" formula="Σx / N" />
                  <Metric title="Standard Deviation (σ)" desc="Spread/Dispersion" formula="√Var(x)" />
                  <Metric title="Correlation (r)" desc="Linear Relationship" formula="cov(x,y) / σxσy" />
               </div>
            </div>
            
            
          </div>

        </div>
      </div>
    </main>
  );
}

function Metric({ title, desc, formula }: any) {
    return (
        <div className="flex items-center justify-between border-b border-white/5 pb-2 last:border-0 last:pb-0">
            <div>
                <div className="text-sm font-bold text-indigo-400">{title}</div>
                <div className="text-[10px] text-slate-500">{desc}</div>
            </div>
            <div className="px-3 py-1 bg-black/40 rounded font-mono text-xs text-white border border-white/10">
                {formula}
            </div>
        </div>
    )
}