"use client";
import { useEffect, useRef, useState } from "react";

export default function ShellBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let time = 0;
    
    // Atom State
    const nucleus = { x: w/2, y: h/2, r: 15 };
    
    // Shells (Energy Levels)
    const shells = [
        { r: 60, energy: -13.6, electrons: [] as any[] }, // n=1 (Ground)
        { r: 100, energy: -3.4, electrons: [] as any[] }, // n=2
        { r: 150, energy: -1.5, electrons: [] as any[] }, // n=3
        { r: 210, energy: -0.85, electrons: [] as any[] }, // n=4
    ];

    // Photons emitted
    const photons: {x: number, y: number, vx: number, vy: number, color: string, life: number}[] = [];

    // Initialize Electrons (1 in ground state for Hydrogen-like behavior visually)
    let electron = { 
        shellIndex: 0, 
        angle: 0, 
        speed: 0.05,
        targetShell: 0, 
        transitionProgress: 0 
    };

    const drawNeonCircle = (x: number, y: number, r: number, color: string, width: number, alpha: number) => {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI*2);
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.globalAlpha = alpha;
        ctx.stroke();
        ctx.globalAlpha = 1;
    };

    const animate = () => {
        // Clear (with trail)
        ctx.fillStyle = "rgba(5, 5, 10, 0.2)";
        ctx.fillRect(0, 0, w, h);
        time += 0.01;

        const cx = w/2;
        const cy = h/2;

        // 1. Draw Nucleus (Proton)
        ctx.shadowBlur = 20;
        ctx.shadowColor = "#f43f5e"; // Rose glow
        ctx.beginPath();
        ctx.arc(cx, cy, 10, 0, Math.PI*2);
        ctx.fillStyle = "#f43f5e";
        ctx.fill();
        ctx.shadowBlur = 0;

        // 2. Draw Shells
        shells.forEach((s, i) => {
            const isTarget = electron.targetShell === i;
            const isCurrent = electron.shellIndex === i;
            
            // Pulse effect if active
            const pulse = isCurrent ? Math.sin(time * 5) * 2 : 0;
            
            drawNeonCircle(
                cx, cy, s.r + pulse, 
                isCurrent ? "rgba(56, 189, 248, 0.5)" : "rgba(255, 255, 255, 0.1)", 
                isCurrent ? 2 : 1, 
                1
            );
        });

        // 3. Update Electron
        // Orbital motion
        electron.angle += electron.speed;
        
        // Transition Logic (Lerp between shells)
        let currentR = shells[electron.shellIndex].r;
        
        if (electron.shellIndex !== electron.targetShell) {
            electron.transitionProgress += 0.05;
            
            if (electron.transitionProgress >= 1) {
                // Transition Complete
                electron.shellIndex = electron.targetShell;
                electron.transitionProgress = 0;
                
                // If falling down (Relaxation), emit photon!
                if (electron.shellIndex < 3) { // Arbitrary check for "falling" logic handled in click
                    // Logic handled in trigger, visually we just snap here
                }
            } else {
                // Interpolate Radius
                const startR = shells[electron.shellIndex].r;
                const endR = shells[electron.targetShell].r;
                currentR = startR + (endR - startR) * electron.transitionProgress;
            }
        }

        const ex = cx + Math.cos(electron.angle) * currentR;
        const ey = cy + Math.sin(electron.angle) * currentR;

        // Draw Electron
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#38bdf8"; // Sky Blue
        ctx.beginPath();
        ctx.arc(ex, ey, 6, 0, Math.PI*2);
        ctx.fillStyle = "#38bdf8";
        ctx.fill();
        ctx.shadowBlur = 0;

        // Trail for electron
        // (Simplified for perf)

        // 4. Update & Draw Photons
        for (let i = photons.length - 1; i >= 0; i--) {
            const p = photons[i];
            p.x += p.vx;
            p.y += p.vy;
            p.life -= 0.02;

            if (p.life <= 0) {
                photons.splice(i, 1);
                continue;
            }

            ctx.globalAlpha = p.life;
            ctx.shadowBlur = 10;
            ctx.shadowColor = p.color;
            
            // Draw Wavy Photon
            ctx.beginPath();
            const waveLen = 10;
            const amp = 5;
            // Draw a little sine wave segment moving
            ctx.strokeStyle = p.color;
            ctx.lineWidth = 2;
            
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x - p.vx*2, p.y - p.vy*2); // Simple streak for now
            ctx.stroke();

            ctx.globalAlpha = 1;
            ctx.shadowBlur = 0;
        }

        // Auto-decay logic: If excited (n > 0), random chance to fall back down
        if (electron.shellIndex > 0 && electron.shellIndex === electron.targetShell && Math.random() < 0.02) {
            const ground = 0;
            // Emit Photon
            const color = getEmissionColor(electron.shellIndex, ground);
            const angle = Math.random() * Math.PI * 2;
            photons.push({
                x: ex, y: ey,
                vx: Math.cos(angle) * 5,
                vy: Math.sin(angle) * 5,
                color: color,
                life: 1
            });
            
            electron.targetShell = ground;
        }

        requestAnimationFrame(animate);
    };

    const getEmissionColor = (n1: number, n2: number) => {
        // Simple mapping: 
        // n=2 -> n=1 (Lyman, UV - shown as Violet)
        // n=3 -> n=1 (High Energy - Blue)
        // n=3 -> n=2 (Balmer, Visible - Red/Cyan)
        const diff = n1 - n2;
        if (diff === 1 && n2 === 0) return "#a855f7"; // Violet
        if (diff === 2 && n2 === 0) return "#3b82f6"; // Blue
        if (diff === 1 && n2 === 1) return "#ef4444"; // Red (Balmer alpha)
        return "#ffffff";
    };

    const animId = requestAnimationFrame(animate);

    const handleClick = () => {
        // Excite!
        if (electron.shellIndex < 3) {
            electron.targetShell = electron.shellIndex + 1;
        }
    };
    
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };

    window.addEventListener("mousedown", handleClick);
    window.addEventListener("resize", handleResize);

    return () => {
        window.removeEventListener("mousedown", handleClick);
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-auto cursor-pointer" />;
}