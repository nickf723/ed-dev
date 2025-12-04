"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  Spline, AreaChart, ArrowRight, ChevronRight, Sigma, 
  Infinity, Scale, Divide, Zap, Globe, Rocket, 
  Layers, Box, Activity, Hash, FunctionSquare, Scaling, Orbit
} from "lucide-react";

// --- INTERNAL COMPONENTS (Background & Widgets) ---

// 1. THE "SICK" BACKGROUND (Sedated Flow)
function CalculusBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let time = 0;

    const animate = () => {
      ctx.fillStyle = "rgba(5, 5, 5, 0.1)"; 
      ctx.fillRect(0, 0, w, h);

      ctx.lineWidth = 2;
      const lines = 8;
      
      for (let i = 0; i < lines; i++) {
          ctx.beginPath();
          const yBase = h / 2 + (i - lines/2) * 60;
          const hue = 340 + i * 5; 
          ctx.strokeStyle = `hsla(${hue}, 80%, 60%, 0.15)`;

          for (let x = 0; x <= w; x += 10) {
              const y = yBase + 
                        Math.sin(x * 0.003 + time * 0.01 + i * 0.5) * 50 + 
                        Math.cos(x * 0.005 - time * 0.005) * 30;
              if (x === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
          }
          ctx.stroke();
      }
      time++;
      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);
    return () => { window.removeEventListener("resize", handleResize); cancelAnimationFrame(animId); };
  }, []);

  return (
    <>
        <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
        <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_90%)]" />
    </>
  );
}

// 2. DERIVATIVE WIDGET
function DerivativeWidget() {
  const [xVal, setXVal] = useState(2); 
  const f = (x: number) => 0.2 * x * x;
  const df = (x: number) => 0.4 * x;
  const width = 300; const height = 150; const scale = 30; 
  const originX = width / 2; const originY = height - 20;
  const currentX = xVal; const currentY = -f(currentX); const slope = -df(currentX);   
  const x1 = currentX - 3; const y1 = currentY - 3 * slope;
  const x2 = currentX + 3; const y2 = currentY + 3 * slope;

  return (
    <div className="w-full bg-neutral-900/60 border border-red-500/30 rounded-2xl p-6 backdrop-blur-md shadow-xl">
      <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-red-400">
              <Spline size={16} />
              <h3 className="text-xs font-bold uppercase tracking-widest">Slope Visualizer</h3>
          </div>
          <div className="text-[10px] font-mono text-neutral-500">f(x) = 0.2x²</div>
      </div>
      <div className="relative h-32 w-full bg-black/40 rounded-xl border border-white/5 overflow-hidden mb-4">
          <svg className="absolute inset-0 w-full h-full overflow-visible">
              <line x1="0" y1={originY} x2={width} y2={originY} stroke="#333" strokeWidth="1" />
              <line x1={originX} y1="0" x2={originX} y2={height} stroke="#333" strokeWidth="1" />
              <path d={`M ${Array.from({length: width}, (_, i) => {
                    const x = (i - originX) / scale; return `${i},${-f(x) * scale + originY}`;
                }).join(" L ")}`} fill="none" stroke="#525252" strokeWidth="2" />
              <line x1={x1 * scale + originX} y1={y1 * scale + originY} x2={x2 * scale + originX} y2={y2 * scale + originY} stroke="#f87171" strokeWidth="2" />
              <circle cx={currentX * scale + originX} cy={currentY * scale + originY} r="4" fill="white" />
          </svg>
      </div>
      <div className="flex items-center gap-4">
          <input type="range" min="-4" max="4" step="0.1" value={xVal} onChange={(e) => setXVal(parseFloat(e.target.value))} className="w-full accent-red-500 h-1 bg-white/10 rounded appearance-none cursor-pointer" />
          <div className="text-xs font-mono text-red-300 w-16 text-right">m = {df(xVal).toFixed(1)}</div>
      </div>
    </div>
  );
}

// 3. INTEGRAL WIDGET
function IntegrationWidget() {
  const [rects, setRects] = useState(4); 
  const f = (x: number) => -(Math.pow(x - 2, 2)) + 5;
  const width = 300; const height = 150; const scaleX = width / 5; const scaleY = height / 6;
  const dx = 4 / rects;
  const totalArea = Array.from({length: rects}, (_, i) => f(i * dx) * dx).reduce((a, b) => a + b, 0);

  return (
    <div className="w-full bg-neutral-900/60 border border-red-500/30 rounded-2xl p-6 backdrop-blur-md shadow-xl">
      <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-red-400">
              <AreaChart size={16} />
              <h3 className="text-xs font-bold uppercase tracking-widest">Riemann Sums</h3>
          </div>
          <div className="text-[10px] font-mono text-neutral-500">n = {rects}</div>
      </div>
      <div className="relative h-32 w-full bg-black/40 rounded-xl border border-white/5 overflow-hidden mb-4 flex items-end px-4">
          <svg className="absolute inset-0 w-full h-full overflow-visible">
             {Array.from({length: rects}).map((_, i) => (
                 <rect key={i} x={(i * dx) * scaleX} y={height - f(i * dx) * scaleY} width={dx * scaleX - 1} height={f(i * dx) * scaleY} fill="rgba(248, 113, 113, 0.2)" stroke="rgba(248, 113, 113, 0.5)" />
             ))}
             <path d={`M ${Array.from({length: 100}, (_, i) => { const x = (i / 100) * 5; return `${x * scaleX},${height - (f(x) * scaleY)}`; }).join(" L ")}`} fill="none" stroke="white" strokeWidth="2" strokeOpacity="0.5" />
          </svg>
      </div>
      <input type="range" min="2" max="50" step="1" value={rects} onChange={(e) => setRects(parseInt(e.target.value))} className="w-full accent-red-500 h-1 bg-white/10 rounded appearance-none cursor-pointer" />
    </div>
  );
}

// --- MAIN PAGE COMPONENT ---

const LEVELS = [
  { id: "pre", title: "0.0 Preparation" },
  { id: "diff", title: "1.0 Differentiation" },
  { id: "int", title: "2.0 Accumulation" },
  { id: "multi", title: "3.0 Multivariable" },
  { id: "vector", title: "4.0 Fields" },
];

export default function CalculusPage() {
  const [activeLevel, setActiveLevel] = useState("pre");

  const scrollTo = (id: string) => {
    setActiveLevel(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#050505] text-white selection:bg-red-500/30 font-sans">
      
      {/* 1. Background */}
      <CalculusBackground /> 
      
      <div className="relative z-10 w-full min-h-screen flex flex-col lg:flex-row max-w-[1600px] mx-auto">
        
        {/* --- LEFT RAIL: NAVIGATION --- */}
        <nav className="hidden lg:flex flex-col w-64 fixed h-screen p-8 border-r border-white/5 bg-[#050505]/80 backdrop-blur-xl z-50">
            <div className="flex items-center gap-3 mb-10 text-red-400">
                <Sigma size={24} />
                <span className="font-bold tracking-widest uppercase text-xs">Calculus Sequence</span>
            </div>
            <div className="space-y-1">
                {LEVELS.map(lvl => (
                    <button
                        key={lvl.id}
                        onClick={() => scrollTo(lvl.id)}
                        className={`w-full text-left px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wide transition-all border-l-2
                            ${activeLevel === lvl.id 
                                ? "border-red-500 bg-red-950/30 text-white" 
                                : "border-transparent text-neutral-500 hover:text-neutral-300 hover:bg-white/5"
                            }
                        `}
                    >
                        {lvl.title}
                    </button>
                ))}
            </div>
            <div className="mt-auto">
                <Link href="/formal-science/mathematics" className="flex items-center gap-2 text-xs font-bold text-neutral-500 hover:text-white transition-colors">
                    <ChevronRight className="rotate-180" size={12} /> Return to Mathematics
                </Link>
            </div>
        </nav>

        {/* --- MAIN CONTENT --- */}
        <div className="flex-1 lg:ml-64 p-6 md:p-12 lg:p-16 space-y-32">
            
            {/* HERO */}
            <header className="mb-20">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-900/30 border border-red-500/30 text-red-400 text-[10px] font-bold uppercase tracking-widest mb-6">
                    <Infinity size={12} /> Analysis
                </div>
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-6">
                    Calculus
                </h1>
                <p className="text-xl text-neutral-300 font-light leading-relaxed max-w-3xl">
                    The mathematics of motion, change, and infinity. From the instantaneous slope of a curve to the accumulation of 3D fields, Calculus provides the language to describe the dynamic universe.
                </p>
            </header>

            {/* 0.0 PREPARATION (Pre-Calc) */}
            <section id="pre" className="scroll-mt-32">
                <div className="flex items-center gap-4 mb-8">
                    <h2 className="text-3xl font-black text-white">0.0 Preparation</h2>
                    <div className="h-[1px] flex-1 bg-white/10" />
                    <span className="text-xs font-bold uppercase text-neutral-500 tracking-widest">Pre-Calculus</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <p className="text-neutral-400 leading-relaxed mb-6">
                            Before mastering change, one must master the static. This level consolidates Algebra and Trigonometry into the language of <strong>Functions</strong>—the fundamental objects that Calculus manipulates.
                        </p>
                        <ul className="space-y-3">
                            <TopicItem title="Functions & Graphs" desc="Domain, Range, Transformations, and Composition." />
                            <TopicItem title="Trigonometry" desc="The Unit Circle, Identities, and Wave Functions." />
                            <TopicItem title="Rational Functions" desc="Asymptotes and behavior at infinity." />
                        </ul>
                    </div>
                    <div className="p-6 rounded-2xl bg-neutral-900/40 border border-white/10 flex flex-col justify-center items-center text-center">
                        <FunctionSquare size={48} className="text-red-500/50 mb-4" />
                        <h3 className="font-bold text-white mb-2">The Function f(x)</h3>
                        <p className="text-xs text-neutral-500 max-w-xs">
                            The central character of the story. Calculus asks two questions about f(x): How fast is it changing? And how much of it is there?
                        </p>
                    </div>
                </div>
            </section>

            {/* 1.0 DIFFERENTIATION (Calc I) */}
            <section id="diff" className="scroll-mt-32 border-t border-white/5 pt-12">
                <div className="flex items-center gap-4 mb-8">
                    <h2 className="text-3xl font-black text-white">1.0 Differentiation</h2>
                    <div className="h-[1px] flex-1 bg-white/10" />
                    <span className="text-xs font-bold uppercase text-neutral-500 tracking-widest">Calculus I</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-7 space-y-6">
                        <p className="text-neutral-400 leading-relaxed">
                            The study of the <strong>Instantaneous</strong>. By taking the limit as time approaches zero, we stop the movie frame-by-frame to find exact velocity, slope, and sensitivity.
                        </p>
                        <ul className="space-y-3">
                            <TopicItem title="Limits & Continuity" desc="Approaching a value without touching it. The definition of continuity." />
                            <TopicItem title="The Derivative" desc="Definition as a limit. Slope of the tangent line." />
                            <TopicItem title="Rules of Differentiation" desc="Power, Product, Quotient, and Chain rules." />
                            <TopicItem title="Optimization" desc="Using derivatives to find max/min values (peaks/valleys)." />
                        </ul>
                    </div>
                    <div className="lg:col-span-5">
                        <DerivativeWidget />
                    </div>
                </div>
            </section>

            {/* 2.0 ACCUMULATION (Calc II) */}
            <section id="int" className="scroll-mt-32 border-t border-white/5 pt-12">
                <div className="flex items-center gap-4 mb-8">
                    <h2 className="text-3xl font-black text-white">2.0 Accumulation</h2>
                    <div className="h-[1px] flex-1 bg-white/10" />
                    <span className="text-xs font-bold uppercase text-neutral-500 tracking-widest">Calculus II</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-7 space-y-6 order-2 lg:order-1">
                        <p className="text-neutral-400 leading-relaxed">
                            The study of the <strong>Whole</strong>. Integration sums up infinite infinitesimal slices to calculate areas, volumes, and total change over time. It also introduces the infinite sum (Series).
                        </p>
                        <ul className="space-y-3">
                            <TopicItem title="Integration" desc="Antiderivatives and the Area Problem." />
                            <TopicItem title="Applications" desc="Volumes of revolution, Arc Length, Work, and Fluid Force." />
                            <TopicItem title="Techniques" desc="U-Sub, Integration by Parts, Trig Substitution." />
                            <TopicItem title="Sequences & Series" desc="Taylor Series, Convergence tests, and Power Series." />
                        </ul>
                    </div>
                    <div className="lg:col-span-5 order-1 lg:order-2">
                        <IntegrationWidget />
                    </div>
                </div>
            </section>

            {/* 3.0 MULTIVARIABLE (Calc III) */}
            <section id="multi" className="scroll-mt-32 border-t border-white/5 pt-12">
                <div className="flex items-center gap-4 mb-8">
                    <h2 className="text-3xl font-black text-white">3.0 Multivariable</h2>
                    <div className="h-[1px] flex-1 bg-white/10" />
                    <span className="text-xs font-bold uppercase text-neutral-500 tracking-widest">Calculus III</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 rounded-2xl bg-neutral-900/40 border border-white/10 hover:border-red-500/30 transition-all">
                        <div className="mb-4 text-red-400"><Box size={24} /></div>
                        <h3 className="font-bold text-white mb-2">Vectors & Space</h3>
                        <p className="text-xs text-neutral-400 leading-relaxed">
                            Leaving the 2D plane. Dot/Cross products, planes, and quadric surfaces in $R^3$.
                        </p>
                    </div>
                    <div className="p-6 rounded-2xl bg-neutral-900/40 border border-white/10 hover:border-red-500/30 transition-all">
                        <div className="mb-4 text-red-400"><Scaling size={24} /></div>
                        <h3 className="font-bold text-white mb-2">Partial Derivatives</h3>
                        <p className="text-xs text-neutral-400 leading-relaxed">
                            How a surface changes in the X direction vs the Y direction. Gradients and Directional Derivatives.
                        </p>
                    </div>
                    <div className="p-6 rounded-2xl bg-neutral-900/40 border border-white/10 hover:border-red-500/30 transition-all">
                        <div className="mb-4 text-red-400"><Layers size={24} /></div>
                        <h3 className="font-bold text-white mb-2">Multiple Integrals</h3>
                        <p className="text-xs text-neutral-400 leading-relaxed">
                            Double and Triple integrals. Summing volume under a surface or mass inside a solid.
                        </p>
                    </div>
                </div>
            </section>

            {/* 4.0 FIELDS (Vector Calc) */}
            <section id="vector" className="scroll-mt-32 border-t border-white/5 pt-12 pb-20">
                <div className="flex items-center gap-4 mb-8">
                    <h2 className="text-3xl font-black text-white">4.0 Fields</h2>
                    <div className="h-[1px] flex-1 bg-white/10" />
                    <span className="text-xs font-bold uppercase text-neutral-500 tracking-widest">Vector Analysis</span>
                </div>

                <div className="rounded-3xl bg-gradient-to-br from-red-900/20 to-black border border-red-500/20 p-8 flex flex-col md:flex-row gap-8 items-center">
                    <div className="md:w-2/3">
                        <h3 className="text-2xl font-bold text-white mb-2">The Language of Physics</h3>
                        <p className="text-sm text-neutral-400 leading-relaxed mb-6">
                            Vector Calculus studies **Vector Fields**—regions where every point has a magnitude and direction (like wind or gravity). It culminates in the "Big Three" theorems that relate flow through a boundary to behavior inside the region.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="p-3 bg-black/40 rounded border border-white/5 text-center">
                                <span className="block text-[10px] text-red-400 font-bold uppercase mb-1">Green's</span>
                                <span className="text-xs text-white">2D Circulation</span>
                            </div>
                            <div className="p-3 bg-black/40 rounded border border-white/5 text-center">
                                <span className="block text-[10px] text-red-400 font-bold uppercase mb-1">Stokes'</span>
                                <span className="text-xs text-white">3D Curl</span>
                            </div>
                            <div className="p-3 bg-black/40 rounded border border-white/5 text-center">
                                <span className="block text-[10px] text-red-400 font-bold uppercase mb-1">Divergence</span>
                                <span className="text-xs text-white">3D Flux</span>
                            </div>
                        </div>
                    </div>
                    <div className="md:w-1/3 flex justify-center">
                        <Orbit size={80} className="text-red-500/50 animate-spin-slow" />
                    </div>
                </div>
            </section>

        </div>
      </div>
    </main>
  );
}

// --- HELPER COMPONENT ---
function TopicItem({ title, desc }: any) {
    return (
        <li className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
            <div className="mt-1 text-red-400"><ArrowRight size={14} /></div>
            <div>
                <h4 className="text-sm font-bold text-white">{title}</h4>
                <p className="text-xs text-neutral-400 mt-1 leading-relaxed">{desc}</p>
            </div>
        </li>
    );
}