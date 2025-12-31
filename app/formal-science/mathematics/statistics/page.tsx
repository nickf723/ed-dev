"use client";
import Link from "next/link";
import StatsBackground from "@/app/formal-science/mathematics/statistics/StatsBackground";
import RegressionLab from "@/app/formal-science/mathematics/statistics/RegressionLab";
import { 
  ArrowLeft, BarChart3, PieChart, LineChart, 
  HelpCircle, Binary, Search
} from "lucide-react";

export default function StatisticsPage() {
  return (
    <main className="relative min-h-screen bg-[#0f0518] text-violet-100 overflow-hidden font-sans selection:bg-cyan-500/30">
      
      {/* 1. VISUAL ENGINE */}
      <StatsBackground />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none z-0" />

      {/* 2. HEADER */}
      <header className="relative z-20 flex items-center justify-between px-8 py-6 border-b border-white/10 bg-[#0f0518]/90 backdrop-blur-md sticky top-0">
         <div className="flex items-center gap-6">
             <Link href="/formal-science/mathematics" className="flex items-center gap-2 text-xs font-mono text-violet-500 hover:text-violet-400 transition-colors uppercase tracking-widest">
                <ArrowLeft size={12} /> Mathematics
             </Link>
             <div className="h-4 w-px bg-white/10" />
             <div className="flex items-center gap-3">
                 <div className="p-1.5 bg-violet-950 border border-violet-500/50 rounded">
                    <BarChart3 size={18} className="text-violet-500" />
                 </div>
                 <h1 className="text-xl font-bold text-white tracking-tight">
                    STATISTICS
                 </h1>
             </div>
         </div>
         <div className="hidden md:block text-[10px] font-mono text-violet-500/50 uppercase tracking-widest">
            The Science of Data
         </div>
      </header>

      {/* 3. CONTENT GRID */}
      <div className="relative z-10 container mx-auto p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* LEFT: THE CONCEPTS */}
                <div className="lg:col-span-7 space-y-6">
                    
                    {/* HERO CARD */}
                    <div className="bg-violet-950/60 backdrop-blur-md border border-white/10 rounded-2xl p-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-24 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold text-white mb-4">Making Sense of Chaos</h2>
                            <p className="text-sm text-violet-200/80 leading-relaxed mb-6">
                                We live in a noisy, uncertain world. Statistics provides the mathematical toolkit to quantify uncertainty, find patterns in data, and make predicted decisions with confidence.
                            </p>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-black/30 rounded border border-white/5">
                                    <LineChart size={14} className="text-violet-400" />
                                    <span className="text-xs font-mono">Inference</span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-black/30 rounded border border-white/5">
                                    <Binary size={14} className="text-cyan-400" />
                                    <span className="text-xs font-mono">Data</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    

[Image of normal distribution curve]


                    {/* DOMAINS GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        <div className="bg-violet-950/40 border border-white/5 p-5 rounded-xl hover:border-violet-500/30 transition-colors group">
                            <div className="flex items-center gap-3 mb-2">
                                <PieChart className="text-violet-500" size={20} />
                                <h3 className="font-bold text-white">Descriptive</h3>
                            </div>
                            <p className="text-xs text-violet-200/60">
                                Summarizing data. Mean, Median, Mode, and Standard Deviation. The "what happened".
                            </p>
                        </div>

                        <div className="bg-violet-950/40 border border-white/5 p-5 rounded-xl hover:border-cyan-500/30 transition-colors group">
                            <div className="flex items-center gap-3 mb-2">
                                <Search className="text-cyan-500" size={20} />
                                <h3 className="font-bold text-white">Inferential</h3>
                            </div>
                            <p className="text-xs text-violet-200/60">
                                Drawing conclusions from samples. Hypothesis Testing, P-values, and Confidence Intervals.
                            </p>
                        </div>
                        
                        <div className="bg-violet-950/40 border border-white/5 p-5 rounded-xl hover:border-violet-500/30 transition-colors group">
                            <div className="flex items-center gap-3 mb-2">
                                <HelpCircle className="text-violet-500" size={20} />
                                <h3 className="font-bold text-white">Probability</h3>
                            </div>
                            <p className="text-xs text-violet-200/60">
                                The logic of chance. Calculating the likelihood of events occurring.
                            </p>
                        </div>

                    </div>
                </div>

                {/* RIGHT: INTERACTIVE LAB */}
                <div className="lg:col-span-5 space-y-6 flex flex-col items-center">
                    
                    {/* WIDGET */}
                    <RegressionLab />

                    {/* LAW OF LARGE NUMBERS */}
                    <div className="bg-violet-950/60 border border-white/10 rounded-xl p-6 w-full">
                        <h3 className="font-bold text-white mb-2">Law of Large Numbers</h3>
                        <p className="text-xs text-violet-200/60 leading-relaxed mb-3">
                            If you flip a coin 10 times, you might get 80% heads. If you flip it 1,000,000 times, you will almost certainly get 50% heads. As the sample size grows, the average converges to the expected value.
                        </p>
                    </div>

                </div>

            </div>
      </div>
    </main>
  );
}