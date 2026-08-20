"use client";
import React, { useEffect, useRef, useState } from "react";
import { Orbit, RefreshCw, Rocket, Activity, Info } from "lucide-react";

export default function OrbitalSandbox() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [starMass, setStarMass] = useState(5000);
  const [initialVelocity, setInitialVelocity] = useState(4.5);
  const [isSimulating, setIsSimulating] = useState(false);

  // Physics State Refs to avoid infinite re-renders during requestAnimationFrame
  const physicsRef = useRef({
    planet: { x: 0, y: -150, vx: initialVelocity, vy: 0 },
    trail: [] as { x: number; y: number }[],
    trailTick: 0,
    crashed: false,
    escaped: false,
  });

  const G = 1; // Simplified Gravitational Constant

  const resetSimulation = () => {
    physicsRef.current = {
      planet: { x: 0, y: -150, vx: initialVelocity, vy: 0 },
      trail: [],
      trailTick: 0,
      crashed: false,
      escaped: false,
    };
    setIsSimulating(false);
  };

  // Update initial velocity in physics ref when slider changes (if not running)
  useEffect(() => {
    if (!isSimulating) {
      physicsRef.current.planet.vx = initialVelocity;
    }
  }, [initialVelocity, isSimulating]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      const state = physicsRef.current;

      if (isSimulating && !state.crashed && !state.escaped) {
        // Physics Integration (Verlet/Euler approximation)
        const dx = -state.planet.x; // Star is at (0,0)
        const dy = -state.planet.y;
        const distSq = dx * dx + dy * dy;
        const dist = Math.sqrt(distSq);

        if (dist < 20) {
          state.crashed = true;
        } else if (dist > 800) {
          state.escaped = true;
        } else {
          // F = G * (m1*m2) / r^2. Acceleration a = F/m2 = G * m1 / r^2
          const force = (G * starMass) / distSq;
          const ax = force * (dx / dist);
          const ay = force * (dy / dist);

          state.planet.vx += ax;
          state.planet.vy += ay;
          state.planet.x += state.planet.vx;
          state.planet.y += state.planet.vy;

          // Sample every other integration step for a stable, deterministic trace.
          state.trailTick += 1;
          if (state.trailTick % 2 === 0) {
            state.trail.push({ x: state.planet.x, y: state.planet.y });
          }
          if (state.trail.length > 400) state.trail.shift();
        }
      }

      // Draw Trail
      if (state.trail.length > 0) {
        ctx.beginPath();
        ctx.moveTo(cx + state.trail[0].x, cy + state.trail[0].y);
        for (let i = 1; i < state.trail.length; i++) {
          ctx.lineTo(cx + state.trail[i].x, cy + state.trail[i].y);
        }
        ctx.strokeStyle = "rgba(56, 189, 248, 0.4)";
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Draw Star
      const starRadius = Math.max(15, starMass / 300);
      ctx.beginPath();
      ctx.arc(cx, cy, starRadius, 0, Math.PI * 2);
      ctx.fillStyle = "#fef08a"; // Yellow-200
      ctx.shadowBlur = 30;
      ctx.shadowColor = "#eab308"; // Yellow-500
      ctx.fill();
      ctx.shadowBlur = 0; // Reset

      // Draw Planet
      if (!state.crashed) {
        ctx.beginPath();
        ctx.arc(cx + state.planet.x, cy + state.planet.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = "#38bdf8"; // Sky-400
        ctx.fill();
      }

      // Draw Status Text
      if (state.crashed) {
        ctx.fillStyle = "#ef4444";
        ctx.font = "bold 24px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("CATASTROPHIC IMPACT", cx, cy - starRadius - 20);
      } else if (state.escaped) {
        ctx.fillStyle = "#a8a29e";
        ctx.font = "bold 24px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("ORBIT ESCAPED (ROGUE PLANET)", cx, 50);
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isSimulating, starMass]);

  return (
    <div className="w-full overflow-hidden rounded-3xl border border-white/10 bg-[#050508]/90 font-sans shadow-[0_0_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
      {/* Minimalist Top Bar */}
      <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
        <div className="flex items-center gap-3">
          <Orbit size={20} className="text-sky-400" />
          <h3 className="font-medium tracking-wide text-white">
            Simplified Two-Body Orbit Sandbox
          </h3>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs text-zinc-500">
          <Activity size={14} /> LIVE TELEMETRY
        </div>
      </div>

      {/* Massive Canvas Area */}
      <div className="relative h-[400px] w-full cursor-crosshair bg-black md:h-[500px]">
        <canvas
          ref={canvasRef}
          width={800}
          height={500}
          role="img"
          aria-label="A two-dimensional orbit model with one fixed star, one moving planet, and a cyan motion trail"
          className="h-full w-full object-cover"
        />

        {!isSimulating && (
          <div className="pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-4 opacity-50">
            <Rocket size={48} className="text-zinc-600" />
            <span className="font-mono text-sm uppercase tracking-widest text-zinc-500">
              Awaiting Launch Sequence
            </span>
          </div>
        )}
      </div>

      {/* Mission Control Panel */}
      <div className="grid grid-cols-1 gap-8 border-t border-white/5 bg-zinc-950 p-6 md:grid-cols-12 md:p-8">
        {/* Sliders */}
        <div className="space-y-6 md:col-span-8">
          <div>
            <div className="mb-2 flex justify-between font-mono text-xs uppercase tracking-widest text-zinc-400">
              <span>Central Star Mass</span>
              <span className="text-yellow-400">
                {starMass.toLocaleString()} units
              </span>
            </div>
            <input
              aria-label="Central star mass in scaled model units"
              type="range"
              min="1000"
              max="10000"
              step="100"
              value={starMass}
              onChange={(e) => setStarMass(Number(e.target.value))}
              disabled={isSimulating}
              className="h-1 w-full cursor-pointer appearance-none rounded-lg bg-zinc-800 accent-yellow-400 disabled:opacity-50"
            />
          </div>
          <div>
            <div className="mb-2 flex justify-between font-mono text-xs uppercase tracking-widest text-zinc-400">
              <span>Orbital Injection Velocity</span>
              <span className="text-sky-400">
                {initialVelocity.toFixed(1)} units / tick
              </span>
            </div>
            <input
              aria-label="Initial sideways velocity in scaled model units per simulation step"
              type="range"
              min="1"
              max="10"
              step="0.1"
              value={initialVelocity}
              onChange={(e) => setInitialVelocity(Number(e.target.value))}
              disabled={isSimulating}
              className="h-1 w-full cursor-pointer appearance-none rounded-lg bg-zinc-800 accent-sky-400 disabled:opacity-50"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col justify-center gap-3 md:col-span-4">
          {!isSimulating ? (
            <button
              type="button"
              onClick={() => setIsSimulating(true)}
              className="w-full rounded-xl bg-sky-500 py-4 text-sm font-black uppercase tracking-widest text-black shadow-[0_0_20px_rgba(56,189,248,0.2)] transition-all hover:bg-sky-400"
            >
              Initiate Orbit
            </button>
          ) : (
            <button
              type="button"
              onClick={resetSimulation}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-zinc-800"
            >
              <RefreshCw size={16} /> Reset Engine
            </button>
          )}

          <div className="mt-2 flex items-start gap-2 font-mono text-[10px] leading-relaxed text-zinc-500">
            <Info size={12} className="mt-0.5 shrink-0" />
            This scaled 2D model fixes one star and advances one test planet
            with a simple numerical approximation. Find a long-lived orbit
            between impact and escape.
          </div>
        </div>
      </div>
    </div>
  );
}
