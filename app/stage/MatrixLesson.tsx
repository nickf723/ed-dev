"use client";
import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// The Lesson Script
const SCRIPT = [
  { time: 0, matrix: [1, 0, 0, 1], text: "The Identity Matrix. Pure, unwarped space." },
  { time: 6, matrix: [1.5, 0, 0, 1.5], text: "Scaling. Multiplying the fabric of space." },
  { time: 12, matrix: [1, 0.5, 0, 1], text: "Shear (X-Axis). Sliding dimensions sideways." },
  { time: 18, matrix: [Math.cos(1), -Math.sin(1), Math.sin(1), Math.cos(1)], text: "Rotation. Spinning the entire coordinate system." },
  { time: 26, matrix: [1, 0, 0, -1], text: "Reflection. Flipping reality upside down." },
  { time: 34, matrix: [0, 1, 1, 0], text: "Permutation. Swapping X and Y entirely." },
  { time: 42, matrix: [0.5, -0.5, 0.5, 0.5], text: "Combination. Rotate + Scale." },
  { time: 50, matrix: [0, 0, 0, 0], text: "Singularity. Collapsing dimension into nothing." },
];

export default function MatrixLesson() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeCaption, setActiveCaption] = useState(SCRIPT[0].text);
  
  // Current Matrix State [i_hat_x, i_hat_y, j_hat_x, j_hat_y]
  // We define basis vectors i_hat (1,0) and j_hat (0,1)
  const [currentMatrix, setCurrentMatrix] = useState([1, 0, 0, 1]);

  const reset = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      setCurrentMatrix([1, 0, 0, 1]);
      setActiveCaption(SCRIPT[0].text);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let frame = 0;

    const animate = () => {
      if (!isPlaying) return;

      const now = frame / 60;
      setCurrentTime(now);
      
      // Script Engine
      const step = SCRIPT.slice().reverse().find(s => now >= s.time);
      if (step) {
          setActiveCaption(step.text);
          
          // Linear Interpolation (Lerp) towards target matrix
          // This makes the transitions smooth and "gooey"
          const target = step.matrix;
          const speed = 0.05; // 5% per frame
          
          const nextMatrix = currentMatrix.map((val, i) => 
              val + (target[i] - val) * speed
          );
          
          // Update state (ref-like behavior in loop)
          // Note: We mutate a local var or use set inside loop carefully
          // For smooth anim loop, we update the values passed to next frame
          setCurrentMatrix(nextMatrix);
          
          // Use local variable for drawing this frame
          var drawMatrix = nextMatrix;
      } else {
          var drawMatrix = currentMatrix;
      }

      // --- RENDER ---
      
      // 1. The "Trail" Effect (WMP Aesthetic)
      // Instead of clearing, we draw a black rect with 10% opacity
      // This makes moving lines leave a "ghost"
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const spacing = 50;

      // Matrix Transformation Function
      // [ x' ]   [ i_x  j_x ] [ x ]
      // [ y' ] = [ i_y  j_y ] [ y ]
      const transform = (x: number, y: number) => {
          const nx = x * drawMatrix[0] + y * drawMatrix[2];
          const ny = x * drawMatrix[1] + y * drawMatrix[3];
          return { x: cx + nx, y: cy - ny }; // Screen Y is inverted
      };

      ctx.lineWidth = 2;

      // 2. Draw Grid Lines
      const range = 15; // Lines in each direction
      
      for (let i = -range; i <= range; i++) {
          // Vertical Lines (transforming X)
          ctx.beginPath();
          const vStart = transform(i * spacing, -range * spacing);
          const vEnd = transform(i * spacing, range * spacing);
          
          // Color logic: Center axes are brighter
          if (i === 0) {
              ctx.strokeStyle = "#fff";
              ctx.lineWidth = 3;
          } else {
              ctx.strokeStyle = "rgba(34, 211, 238, 0.3)"; // Cyan ghost
              ctx.lineWidth = 1;
          }
          
          ctx.moveTo(vStart.x, vStart.y);
          ctx.lineTo(vEnd.x, vEnd.y);
          ctx.stroke();

          // Horizontal Lines (transforming Y)
          ctx.beginPath();
          const hStart = transform(-range * spacing, i * spacing);
          const hEnd = transform(range * spacing, i * spacing);
          
          if (i === 0) {
              ctx.strokeStyle = "#fff";
              ctx.lineWidth = 3;
          } else {
              ctx.strokeStyle = "rgba(236, 72, 153, 0.3)"; // Pink ghost
              ctx.lineWidth = 1;
          }
          
          ctx.moveTo(hStart.x, hStart.y);
          ctx.lineTo(hEnd.x, hEnd.y);
          ctx.stroke();
      }

      // 3. "Beat" Pulse (Unit Circle)
      // A circle that warps along with the grid to show distortion
      ctx.beginPath();
      const beat = 1 + Math.sin(frame * 0.2) * 0.1; // Pulse size
      for (let a = 0; a <= Math.PI * 2; a += 0.1) {
          const r = spacing * 2 * beat;
          const pt = transform(Math.cos(a) * r, Math.sin(a) * r);
          if (a === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
      }
      ctx.closePath();
      ctx.strokeStyle = "rgba(250, 204, 21, 0.8)"; // Yellow
      ctx.lineWidth = 2;
      ctx.shadowBlur = 20;
      ctx.shadowColor = "rgba(250, 204, 21, 0.8)";
      ctx.stroke();
      ctx.shadowBlur = 0;

      // 4. Basis Vectors (The "Hands" of the matrix)
      const origin = transform(0, 0);
      const iHat = transform(spacing * 2, 0); // X basis
      const jHat = transform(0, spacing * 2); // Y basis
      
      // X Vector
      ctx.beginPath();
      ctx.moveTo(origin.x, origin.y);
      ctx.lineTo(iHat.x, iHat.y);
      ctx.strokeStyle = "#22d3ee"; // Cyan
      ctx.lineWidth = 4;
      ctx.stroke();
      
      // Y Vector
      ctx.beginPath();
      ctx.moveTo(origin.x, origin.y);
      ctx.lineTo(jHat.x, jHat.y);
      ctx.strokeStyle = "#ec4899"; // Pink
      ctx.lineWidth = 4;
      ctx.stroke();

      frame++;
      animationId = requestAnimationFrame(animate);
    };

    if (isPlaying) {
        animationId = requestAnimationFrame(animate);
    }

    return () => cancelAnimationFrame(animationId);
  }, [isPlaying, currentMatrix]); // Dependency on currentMatrix to keep state fresh in loop

  return (
    <div className="w-full h-full bg-black relative flex flex-col overflow-hidden">
        
        {/* CANVAS */}
        <canvas 
            ref={canvasRef} 
            width={1080} 
            height={1080} 
            className="w-full h-full object-cover"
        />
        
        {/* UI OVERLAY (Clean Feed Style) */}
        <div className="absolute inset-0 z-10 flex flex-col justify-between p-8 pointer-events-none">
            
            {/* Top: Matrix Readout */}
            <div className="flex justify-between items-start">
                 <div className="bg-black/60 backdrop-blur-md border border-white/10 p-3 rounded-xl flex gap-4 font-mono text-sm text-cyan-400 shadow-lg">
                    <div className="flex flex-col items-end border-r border-white/10 pr-3">
                        <span>{currentMatrix[0].toFixed(2)}</span>
                        <span>{currentMatrix[1].toFixed(2)}</span>
                    </div>
                    <div className="flex flex-col items-start">
                        <span>{currentMatrix[2].toFixed(2)}</span>
                        <span>{currentMatrix[3].toFixed(2)}</span>
                    </div>
                 </div>
                 {isPlaying && (
                    <div className="bg-red-500/20 border border-red-500/50 px-3 py-1.5 rounded-full flex items-center gap-2 backdrop-blur-sm">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                        <span className="text-[9px] font-bold text-red-200 uppercase tracking-widest">REC</span>
                    </div>
                 )}
            </div>

            {/* Center: Cinematic Captions */}
            <div className="absolute top-[20%] left-0 w-full text-center px-12">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCaption}
                        initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                        transition={{ duration: 0.6, ease: "backOut" }}
                    >
                        <h2 className="text-4xl md:text-5xl font-light italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-white to-pink-200 tracking-widest leading-tight drop-shadow-2xl">
                            {activeCaption}
                        </h2>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Bottom: Controls */}
            <div className="pointer-events-auto flex flex-col gap-4 mt-auto bg-gradient-to-t from-black/90 to-transparent pb-4 pt-12 -mx-8 px-8">
                 <div className="w-full h-0.5 bg-white/10 rounded-full overflow-hidden">
                     <motion.div 
                        className="h-full bg-gradient-to-r from-cyan-500 via-white to-pink-500"
                        style={{ width: `${(currentTime / 60) * 100}%` }}
                     />
                 </div>
                 
                 <div className="flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                        >
                            {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
                        </button>
                        <button onClick={reset} className="text-neutral-500 hover:text-white transition-colors">
                            <RotateCcw size={20} />
                        </button>
                     </div>
                     <div className="flex flex-col items-end">
                        <span className="font-mono text-xs text-neutral-300 tracking-widest">
                            LINEAR_TRANSFORMATION
                        </span>
                        <span className="font-mono text-[10px] text-neutral-600">
                            {currentTime.toFixed(1)}s
                        </span>
                     </div>
                 </div>
            </div>
        </div>

    </div>
  );
}