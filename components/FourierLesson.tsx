"use client";
import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// 60-Second Educational Script
const SCRIPT = [
  { time: 0, terms: 1, text: "1. The Fundamental. A pure Sine Wave." },
  { time: 6, terms: 1, text: "Notice the perfect circular rotation." },
  { time: 12, terms: 2, text: "2. Add the 3rd Harmonic (3x speed, 1/3 size)." },
  { time: 18, terms: 2, text: "The wave begins to flatten at the peaks." },
  { time: 24, terms: 3, text: "3. Add the 5th Harmonic. Edges sharpen." },
  { time: 30, terms: 5, text: "Constructive Interference builds the corners." },
  { time: 36, terms: 10, text: "Destructive Interference clears the gaps." },
  { time: 42, terms: 20, text: "Adding complexity..." },
  { time: 48, terms: 50, text: "Approaching the Square Wave limit." },
  { time: 54, terms: 100, text: "Order from Chaos. The Fourier Series." },
];

export default function FourierLesson() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeCaption, setActiveCaption] = useState(SCRIPT[0].text);
  const [N, setN] = useState(1);

  const reset = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      setN(1);
      setActiveCaption(SCRIPT[0].text);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let frame = 0;
    let t = 0;
    
    // Wave buffer
    const wave: {y: number, hue: number}[] = [];

    const animate = () => {
      if (!isPlaying) return;

      const now = frame / 60;
      setCurrentTime(now);
      
      // Script Director
      const step = SCRIPT.slice().reverse().find(s => now >= s.time);
      if (step) {
          setActiveCaption(step.text);
          // Smooth lerp for N
          if (step.terms > N) {
              setN(n => n + (step.terms - n) * 0.05);
          } else {
              setN(step.terms);
          }
      }
      
      // --- RENDER ---
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // 1. Fluid Flow Background
      // We create a shifting gradient mesh
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      const hue1 = (t * 0.5) % 360;
      const hue2 = (t * 0.5 + 60) % 360;
      const hue3 = (t * 0.5 + 120) % 360;
      
      // Deep, rich colors with low opacity for the "void" feel
      gradient.addColorStop(0, `hsla(${hue1}, 60%, 5%, 1)`);
      gradient.addColorStop(0.5, `hsla(${hue2}, 60%, 8%, 1)`);
      gradient.addColorStop(1, `hsla(${hue3}, 60%, 5%, 1)`);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Subtle fluid ripples
      ctx.strokeStyle = "rgba(255,255,255,0.03)";
      ctx.lineWidth = 2;
      for (let i = 0; i < 5; i++) {
          const yOffset = Math.sin(t * 0.01 + i) * 100;
          ctx.beginPath();
          ctx.moveTo(0, canvas.height/2 + yOffset + i * 50);
          ctx.bezierCurveTo(
              canvas.width/3, canvas.height/2 + yOffset - 100, 
              canvas.width/3 * 2, canvas.height/2 + yOffset + 100, 
              canvas.width, canvas.height/2 + yOffset
          );
          ctx.stroke();
      }

      // 2. Grid (Fixed Reference)
      ctx.strokeStyle = "rgba(255,255,255,0.05)";
      ctx.lineWidth = 1;
      const cx = 300; 
      const cy = canvas.height / 2;
      
      ctx.beginPath();
      ctx.moveTo(cx, 0); ctx.lineTo(cx, canvas.height); // Y Axis
      ctx.moveTo(0, cy); ctx.lineTo(canvas.width, cy);  // X Axis
      ctx.stroke();

      // 3. Fourier Circles
      let x = cx;
      let y = cy;
      const radius = 120;
      const speed = 2;
      const terms = Math.floor(N);

      for (let i = 0; i < terms; i++) {
          const prevX = x;
          const prevY = y;
          
          const n = i * 2 + 1; // Odd harmonics: 1, 3, 5...
          const r = radius * (4 / (n * Math.PI));
          
          x += r * Math.cos(n * now * speed);
          y += r * Math.sin(n * now * speed);
          
          // Calculate "Prominence"
          // First circle is 1.0 opacity, others fade out
          const prominence = 1 - (i / terms);
          
          // Draw Orbit
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 255, 255, ${prominence * 0.15})`; // Faint path
          ctx.lineWidth = i === 0 ? 2 : 1; // Main circle thicker
          ctx.arc(prevX, prevY, r, 0, Math.PI * 2);
          ctx.stroke();
          
          // Draw Vector Arm
          ctx.beginPath();
          // Color shifts from Hot Pink (Fundamental) to Cool Cyan (Harmonics)
          const color = `hsla(${340 - i * 10}, 100%, 60%, ${prominence})`;
          ctx.strokeStyle = color;
          ctx.lineWidth = i === 0 ? 3 : 1.5; // Main arm thicker
          ctx.moveTo(prevX, prevY);
          ctx.lineTo(x, y);
          ctx.stroke();
          
          // Joint Dot
          ctx.fillStyle = "#fff";
          ctx.beginPath();
          ctx.arc(x, y, i === 0 ? 4 : 2, 0, Math.PI*2);
          ctx.fill();
      }
      
      // 4. Waveform
      const waveXStart = 600;
      wave.unshift({ y, hue: (t * 1) % 360 });
      if (wave.length > 500) wave.pop();
      
      // Connector Line (The "Laser")
      ctx.beginPath();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
      ctx.setLineDash([4, 4]);
      ctx.moveTo(x, y);
      ctx.lineTo(waveXStart, y);
      ctx.stroke();
      ctx.setLineDash([]);
      
      // Draw The Resulting Wave
      if (wave.length > 1) {
        ctx.lineWidth = 4;
        ctx.shadowBlur = 20;
        ctx.shadowColor = "rgba(34, 211, 238, 0.4)"; // Cyan glow
        
        // Gradient Stroke along the wave
        const waveGrad = ctx.createLinearGradient(waveXStart, 0, canvas.width, 0);
        waveGrad.addColorStop(0, "#22d3ee"); // Cyan head
        waveGrad.addColorStop(1, "rgba(139, 92, 246, 0)"); // Violet tail fade
        
        ctx.strokeStyle = waveGrad;
        ctx.beginPath();
        ctx.moveTo(waveXStart, wave[0].y);
        for (let i = 1; i < wave.length; i++) {
            ctx.lineTo(waveXStart + i, wave[i].y);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Pen Tip (Bright Spark)
      ctx.fillStyle = "#fff";
      ctx.shadowBlur = 15;
      ctx.shadowColor = "#fff";
      ctx.beginPath();
      ctx.arc(waveXStart, y, 4, 0, Math.PI*2);
      ctx.fill();
      ctx.shadowBlur = 0;

      frame++;
      t += 1;
      animationId = requestAnimationFrame(animate);
    };

    if (isPlaying) {
        animationId = requestAnimationFrame(animate);
    }

    return () => cancelAnimationFrame(animationId);
  }, [isPlaying, N]);

  return (
    <div className="w-full h-full bg-black relative flex flex-col overflow-hidden">
        
        {/* 1080x1080 Master Canvas */}
        <canvas 
            ref={canvasRef} 
            width={1080} 
            height={1080} 
            className="w-full h-full object-cover"
        />
        
        {/* OVERLAY UI */}
        <div className="absolute inset-0 z-10 flex flex-col justify-between p-8 pointer-events-none">
            
            {/* Header Stats */}
            <div className="flex justify-between items-start">
                 <div className="glass px-4 py-2 rounded-full flex items-center gap-3">
                    <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">N-Value</span>
                    <span className="text-xl font-light font-mono text-white leading-none">{Math.floor(N)}</span>
                 </div>
                 {isPlaying && (
                    <div className="bg-red-500/20 border border-red-500/50 px-3 py-1.5 rounded-full flex items-center gap-2 backdrop-blur-sm">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                        <span className="text-[9px] font-bold text-red-200 uppercase tracking-widest">LIVE</span>
                    </div>
                 )}
            </div>

            {/* Sleek Captions (Center-Bottom) */}
            <div className="absolute bottom-[20%] left-0 w-full text-center px-12">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCaption}
                        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <h2 className="text-3xl md:text-4xl font-thin text-white tracking-widest leading-tight drop-shadow-xl bg-black/20 backdrop-blur-sm py-2 rounded-xl inline-block px-6">
                            {activeCaption}
                        </h2>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Controller (Bottom) */}
            <div className="pointer-events-auto flex flex-col gap-4 mt-auto">
                 {/* Timeline */}
                 <div className="w-full h-0.5 bg-white/10 rounded-full overflow-hidden">
                     <motion.div 
                        className="h-full bg-gradient-to-r from-blue-400 to-purple-500"
                        style={{ width: `${(currentTime / 60) * 100}%` }}
                     />
                 </div>
                 
                 <div className="flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform"
                        >
                            {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="ml-0.5" />}
                        </button>
                        <button onClick={reset} className="text-neutral-500 hover:text-white transition-colors">
                            <RotateCcw size={18} />
                        </button>
                     </div>
                     <span className="font-mono text-[10px] text-neutral-500 tracking-widest">
                         {currentTime.toFixed(1)} / 60.0s
                     </span>
                 </div>
            </div>
        </div>

    </div>
  );
}