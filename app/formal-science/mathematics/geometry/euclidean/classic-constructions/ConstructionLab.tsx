"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, ChevronRight, Triangle, Split, Minus } from 'lucide-react';

type ScenarioKey = 'perp_bisector' | 'angle_bisector' | 'equilateral';

// DEFINING THE LOGIC FOR EACH CONSTRUCTION
const SCENARIOS = {
    perp_bisector: {
        title: "Perpendicular Bisector",
        icon: Minus,
        steps: [
            "Start with Segment AB.",
            "Compass at A. Set radius > ½ length.",
            "Compass at B. Keep SAME radius.",
            "Mark intersections C and D.",
            "Connect C and D to bisect AB."
        ]
    },
    angle_bisector: {
        title: "Angle Bisector",
        icon: Split,
        steps: [
            "Start with Angle ABC.",
            "Compass at B. Draw arc crossing both legs.",
            "Compass at intersection D. Draw arc interior.",
            "Compass at intersection E. Same radius.",
            "Connect B to intersection F."
        ]
    },
    equilateral: {
        title: "Equilateral Triangle",
        icon: Triangle,
        steps: [
            "Start with Segment AB.",
            "Compass at A. Radius = length AB.",
            "Compass at B. Radius = length AB.",
            "Mark intersection C.",
            "Connect A to C and B to C."
        ]
    }
};

export default function ConstructionLab() {
  const [activeId, setActiveId] = useState<ScenarioKey>('perp_bisector');
  const [step, setStep] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const activeScenario = SCENARIOS[activeId];

  // DRAWING ENGINE
  useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      const width = canvas.width;
      const height = canvas.height;
      const cx = width / 2;
      const cy = height / 2;

      // --- HELPERS ---
      const point = (x:number, y:number, label: string, color='#fff') => {
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI*2);
          ctx.fillStyle = color;
          ctx.fill();
          ctx.font = "12px monospace";
          ctx.fillStyle = "#aaa";
          ctx.fillText(label, x - 5, y + 20);
      };

      const line = (p1: {x:number, y:number}, p2: {x:number, y:number}, color='#525252', width=3) => {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = color;
          ctx.lineWidth = width;
          ctx.stroke();
      };

      const arc = (center: {x:number, y:number}, r: number, start: number, end: number, color='#f87171') => {
          ctx.beginPath();
          ctx.arc(center.x, center.y, r, start, end);
          ctx.strokeStyle = color;
          ctx.lineWidth = 1.5;
          ctx.stroke();
      };

      // --- RENDER LOOP ---
      ctx.clearRect(0, 0, width, height);

      // 1. PERPENDICULAR BISECTOR LOGIC
      if (activeId === 'perp_bisector') {
          const A = { x: cx - 100, y: cy };
          const B = { x: cx + 100, y: cy };
          const R = 140;

          // Always draw base
          line(A, B, '#fff');
          point(A.x, A.y, "A");
          point(B.x, B.y, "B");

          if (step >= 1) arc(A, R, -1.2, 1.2);
          if (step >= 2) arc(B, R, Math.PI - 1.2, Math.PI + 1.2);
          
          if (step >= 3) {
              const h = Math.sqrt(R*R - 100*100);
              point(cx, cy - h, "C", '#fbbf24');
              point(cx, cy + h, "D", '#fbbf24');
          }
          if (step >= 4) {
              const h = Math.sqrt(R*R - 100*100);
              line({x: cx, y: cy - h - 20}, {x: cx, y: cy + h + 20}, '#34d399');
              // Right Angle Mark
              ctx.strokeRect(cx, cy - 10, 10, 10);
          }
      }

      // 2. ANGLE BISECTOR LOGIC
      if (activeId === 'angle_bisector') {
          const B = { x: cx - 80, y: cy + 50 }; // Vertex
          const A = { x: cx + 100, y: cy - 50 };
          const C = { x: cx + 100, y: cy + 100 };
          const R1 = 100;

          // Always draw angle
          line(B, A, '#fff');
          line(B, C, '#fff');
          point(B.x, B.y, "B");

          if (step >= 1) {
              arc(B, R1, -1, 1); // First cut
              // Calc intersections D and E (approx for demo visual)
              point(B.x + 85, B.y - 48, "D", '#fbbf24');
              point(B.x + 95, B.y + 25, "E", '#fbbf24');
          }

          if (step >= 2) arc({x: B.x + 85, y: B.y - 48}, 80, 0, 1.5);
          if (step >= 3) arc({x: B.x + 95, y: B.y + 25}, 80, -0.5, 1);
          
          if (step >= 4) {
              point(cx + 60, cy + 10, "F", '#34d399');
              line(B, {x: cx + 150, y: cy - 10}, '#34d399');
          }
      }

      // 3. EQUILATERAL TRIANGLE LOGIC
      if (activeId === 'equilateral') {
          const size = 160;
          const A = { x: cx - size/2, y: cy + size/3 };
          const B = { x: cx + size/2, y: cy + size/3 };

          line(A, B, '#fff');
          point(A.x, A.y, "A");
          point(B.x, B.y, "B");

          if (step >= 1) arc(A, size, -1.5, 0);
          if (step >= 2) arc(B, size, Math.PI, Math.PI + 1.5);
          
          if (step >= 3) {
              const h = size * Math.sin(Math.PI/3);
              const C = { x: cx, y: A.y - h };
              point(C.x, C.y, "C", '#fbbf24');
          }
          if (step >= 4) {
              const h = size * Math.sin(Math.PI/3);
              const C = { x: cx, y: A.y - h };
              line(A, C, '#34d399');
              line(B, C, '#34d399');
          }
      }

  }, [step, activeId]);

  const handleSwitch = (id: ScenarioKey) => {
      setActiveId(id);
      setStep(0);
  };

  return (
    <div className="w-full bg-neutral-900 border border-red-500/30 rounded-xl p-8 shadow-2xl flex flex-col lg:flex-row gap-8">
        
        {/* LEFT PANEL: CONTROLS */}
        <div className="w-full lg:w-80 flex flex-col">
            
            {/* Header */}
            <div className="pb-4 border-b border-neutral-700 mb-6">
                <div className="text-xs font-bold text-red-400 uppercase tracking-widest mb-1">Construction Lab</div>
                <h3 className="text-2xl font-black text-white">{activeScenario.title}</h3>
            </div>

            {/* Scenario Selector Tabs */}
            <div className="flex gap-2 mb-6">
                {Object.entries(SCENARIOS).map(([key, data]) => {
                    const Icon = data.icon;
                    return (
                        <button
                            key={key}
                            onClick={() => handleSwitch(key as ScenarioKey)}
                            className={`p-3 rounded-lg border transition-all ${activeId === key ? 'bg-red-900/30 border-red-500 text-white' : 'bg-neutral-800 border-neutral-700 text-neutral-400 hover:border-neutral-500'}`}
                            title={data.title}
                        >
                            <Icon size={20} />
                        </button>
                    )
                })}
            </div>

            {/* Step List */}
            <div className="space-y-3 mb-8 flex-1">
                {activeScenario.steps.map((text, i) => (
                    <div 
                        key={i}
                        className={`p-3 rounded-lg border text-sm transition-all flex gap-3 ${i === step ? 'bg-neutral-800 border-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.2)]' : i < step ? 'bg-neutral-900 border-neutral-800 text-neutral-500 line-through' : 'bg-transparent border-transparent text-neutral-600'}`}
                    >
                        <span className="font-bold font-mono text-red-500/50">{i+1}.</span>
                        {text}
                    </div>
                ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
                <button 
                    onClick={() => setStep(prev => Math.min(prev + 1, activeScenario.steps.length - 1))}
                    disabled={step === activeScenario.steps.length - 1}
                    className="flex-1 py-4 bg-red-600 hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold uppercase rounded flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95"
                >
                    <Play size={16} fill="currentColor" /> Next Step
                </button>
                <button 
                    onClick={() => setStep(0)}
                    className="px-4 py-4 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded border border-neutral-700"
                >
                    <RotateCcw size={16} />
                </button>
            </div>
        </div>

        {/* RIGHT PANEL: VISUALIZER */}
        <div className="flex-1 bg-[#1c1c1c] rounded-xl border border-neutral-700 relative flex items-center justify-center overflow-hidden h-[500px]">
            {/* Grid BG */}
            <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/1/10/Grid_graph_paper.svg')] opacity-5 pointer-events-none invert" />
            
            <canvas ref={canvasRef} width={800} height={500} className="relative z-10 max-w-full max-h-full" />
            
            {/* Overlay Indicator */}
            <div className="absolute top-4 left-4 flex gap-2">
                <div className="px-3 py-1 bg-black/50 backdrop-blur rounded text-xs font-mono text-neutral-400 border border-white/10">
                    Step {step + 1} / {activeScenario.steps.length}
                </div>
            </div>
        </div>
    </div>
  );
}