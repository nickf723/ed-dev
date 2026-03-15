"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Timer } from 'lucide-react';

export default function JumpPhysicsLab() {
  const [coyoteFrames, setCoyoteFrames] = useState(10); // How many frames you can jump after falling
  const [gameState, setGameState] = useState<'waiting' | 'running' | 'fell' | 'jumped'>('waiting');
  const [msg, setMsg] = useState("Press SPACE to Jump!");
  const gameStateRef = useRef(gameState);
  
  // Game Logic
  const boxRef = useRef<HTMLDivElement>(null);
  const [boxX, setBoxX] = useState(0);
  const [boxY, setBoxY] = useState(0);
  
  const EDGE_X = 200; // Where the platform ends

  useEffect(() => {
      gameStateRef.current = gameState;
  }, [gameState]);

  useEffect(() => {
      let animId: number;
      let framesSinceEdge = 0;
      let velocityY = 0;

      if (gameState === 'running') {
          const loop = () => {
              setBoxX(prev => {
                  const next = prev + 5; // Move right
                  
                  // Logic
                  if (next > EDGE_X) {
                      // We are off the ledge!
                      framesSinceEdge++;
                      
                      // Gravity kicks in immediately visually
                      if (gameStateRef.current !== 'jumped') {
                           velocityY += 1;
                           setBoxY(y => y + velocityY);
                      }

                      // Fail condition
                      if (framesSinceEdge > coyoteFrames && velocityY > 10) {
                          setGameState('fell');
                          setMsg("Too late! You fell.");
                      }
                  }
                  return next;
              });

              if (gameState === 'running') animId = requestAnimationFrame(loop);
          };
          animId = requestAnimationFrame(loop);
      }
      return () => cancelAnimationFrame(animId);
  }, [gameState, coyoteFrames]);

  const jump = () => {
      if (gameState !== 'running') return;
      
      // Check if we are past the edge
      if (boxX > EDGE_X) {
          // Calculate how many pixels past edge (approx frames * speed)
          const framesPast = (boxX - EDGE_X) / 5;
          
          if (framesPast <= coyoteFrames) {
              setGameState('jumped');
              setBoxY(-100); // Simple visual jump
              setMsg("NICE JUMP! (Used Coyote Time)");
          } else {
              setMsg("Jump input ignored! (Outside window)");
          }
      } else {
          setGameState('jumped');
          setBoxY(-100);
          setMsg("Standard Jump.");
      }
  };

  const reset = () => {
      setBoxX(0);
      setBoxY(0);
      setGameState('waiting');
      setMsg("Press START to run");
  };

  return (
    <div className="w-full bg-slate-900 border border-slate-700 rounded-xl p-8 shadow-xl flex flex-col md:flex-row gap-8">
        
        {/* CONTROLS */}
        <div className="w-full md:w-64 space-y-6">
            <div>
                <div className="flex items-center gap-2 text-sky-400 font-bold uppercase mb-2">
                    <Timer size={16} /> Coyote Time
                </div>
                <p className="text-xs text-slate-400 mb-4">
                    The hidden window of time developers give you to jump *after* leaving a ledge.
                </p>
                <input 
                    type="range" 
                    min="0" max="30" 
                    value={coyoteFrames}
                    onChange={(e) => setCoyoteFrames(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
                />
                <div className="text-right font-mono text-white mt-1">{coyoteFrames} Frames</div>
            </div>

            <button 
                onClick={() => setGameState('running')}
                disabled={gameState !== 'waiting'}
                className="w-full py-3 bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white font-bold rounded uppercase flex items-center justify-center gap-2"
            >
                <Play size={16} /> Start Run
            </button>
            <button 
                onClick={reset}
                className="w-full py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded uppercase flex items-center justify-center gap-2"
            >
                <RotateCcw size={16} /> Reset
            </button>
        </div>

        {/* VISUALIZER */}
        <div 
            className="flex-1 bg-sky-900/50 rounded-xl relative overflow-hidden h-64 border border-sky-500/30 cursor-pointer"
            onMouseDown={jump}
        >
            <div className="absolute top-4 right-4 text-xs font-mono text-sky-300">
                {msg}
            </div>

            {/* The Platform */}
            <div className="absolute bottom-0 left-0 bg-slate-200 h-10 w-[200px] border-t-4 border-green-500" />
            
            {/* The Coyote Zone (Visual Aid) */}
            <div 
                className="absolute bottom-0 left-[200px] h-10 bg-red-500/20 border-t-4 border-dashed border-red-500/50 transition-all"
                style={{ width: `${coyoteFrames * 5}px` }}
            >
                <div className="absolute -bottom-6 left-0 text-[9px] text-red-300 uppercase whitespace-nowrap">Forgiveness Window</div>
            </div>

            {/* The Player Box */}
            <div 
                className="absolute w-8 h-8 bg-yellow-400 border-2 border-white rounded shadow-lg transition-transform"
                style={{ 
                    left: boxX, 
                    bottom: 40 - boxY, // Invert Y for CSS bottom
                    transform: `rotate(${boxY * 2}deg)` // Rotate when falling
                }}
            />
        </div>
    </div>
  );
}