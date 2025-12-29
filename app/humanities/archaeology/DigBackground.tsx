"use client";
import { useEffect, useRef } from "react";

export default function DigBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let isDrawing = false;

    // 1. Define Artifacts (Hidden underneath)
    type Artifact = { x: number; y: number; type: 'bone' | 'pot' | 'skull'; rotation: number; size: number };
    const artifacts: Artifact[] = [];
    
    // Seed artifacts
    for(let i=0; i<15; i++) {
        artifacts.push({
            x: Math.random() * w,
            y: h/3 + Math.random() * (h * 0.6), // Mostly lower down
            type: Math.random() > 0.6 ? 'bone' : Math.random() > 0.5 ? 'pot' : 'skull',
            rotation: Math.random() * Math.PI * 2,
            size: 20 + Math.random() * 40
        });
    }

    // 2. Draw the "Hidden" Layer (Permanent)
    // We actually need a separate off-screen canvas for the dirt to handle "erasing" properly 
    // without erasing the background color of the page.
    // For simplicity here, we'll draw the artifacts on the main canvas, 
    // then draw dirt ON TOP. Erasing the dirt reveals the artifacts.

    // Dirt Layers Config
    const layers = [
        { y: 0, color: "#292524" },   // Topsoil (Stone-800)
        { y: h*0.2, color: "#451a03" }, // Clay (Amber-950)
        { y: h*0.5, color: "#27272a" }, // Bedrock (Zinc-800)
    ];

    // Initialize Dirt State
    // We'll use `globalCompositeOperation` to erase.
    // This requires the dirt to be drawn once, then we just update the "holes".
    
    // Create an offscreen canvas for the dirt mask
    const dirtCanvas = document.createElement('canvas');
    dirtCanvas.width = w;
    dirtCanvas.height = h;
    const dCtx = dirtCanvas.getContext('2d');
    if (!dCtx) return;

    // Fill Dirt Layers
    layers.forEach((l, i) => {
        dCtx.fillStyle = l.color;
        const nextY = layers[i+1] ? layers[i+1].y : h;
        dCtx.fillRect(0, l.y, w, nextY - l.y);
        
        // Add texture/noise to dirt
        for(let j=0; j<500; j++) {
            dCtx.fillStyle = "rgba(0,0,0,0.1)";
            dCtx.beginPath();
            dCtx.arc(Math.random()*w, l.y + Math.random()*(nextY-l.y), 2, 0, Math.PI*2);
            dCtx.fill();
        }
    });

    const draw = () => {
        // Clear Main Screen
        ctx.clearRect(0, 0, w, h);
        
        // 1. Draw Background (The "Hole") - Dark void or underlying rock
        ctx.fillStyle = "#0c0a09"; 
        ctx.fillRect(0, 0, w, h);

        // 2. Draw Artifacts (They sit inside the hole)
        artifacts.forEach(a => {
            ctx.save();
            ctx.translate(a.x, a.y);
            ctx.rotate(a.rotation);
            ctx.fillStyle = "#d6d3d1"; // Stone-300 (Bone color)
            
            if (a.type === 'bone') {
                ctx.beginPath();
                ctx.roundRect(-a.size/2, -5, a.size, 10, 5);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(-a.size/2, -5, 8, 0, Math.PI*2);
                ctx.arc(-a.size/2, 5, 8, 0, Math.PI*2);
                ctx.arc(a.size/2, -5, 8, 0, Math.PI*2);
                ctx.arc(a.size/2, 5, 8, 0, Math.PI*2);
                ctx.fill();
            } else if (a.type === 'pot') {
                ctx.fillStyle = "#ea580c"; // Orange-600 (Terracotta)
                ctx.beginPath();
                ctx.arc(0, 0, a.size/2, 0, Math.PI, false); // Bowl
                ctx.fill();
            } else {
                 // Skull (Simple)
                 ctx.beginPath();
                 ctx.arc(0, -5, a.size/2, 0, Math.PI*2);
                 ctx.fill();
                 ctx.fillRect(-a.size/3, 5, a.size/1.5, 10);
            }
            ctx.restore();
        });

        // 3. Draw Dirt Overlay
        ctx.drawImage(dirtCanvas, 0, 0);
        
        // 4. Instructions overlay (fade out?)
        // (Handled in React UI)
    };

    draw();

    // INTERACTION: DIGGING
    const dig = (x: number, y: number) => {
        // Erase from Dirt Canvas
        dCtx.globalCompositeOperation = 'destination-out';
        dCtx.beginPath();
        dCtx.arc(x, y, 40, 0, Math.PI*2);
        
        // Ragged edge for brush
        for(let i=0; i<10; i++) {
            dCtx.arc(x + (Math.random()-0.5)*20, y + (Math.random()-0.5)*20, 20, 0, Math.PI*2);
        }
        
        dCtx.fill();
        dCtx.globalCompositeOperation = 'source-over';
        
        draw(); // Re-render composition
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isDrawing) dig(e.clientX, e.clientY);
    };
    const handleMouseDown = (e: MouseEvent) => {
        isDrawing = true;
        dig(e.clientX, e.clientY);
    };
    const handleMouseUp = () => isDrawing = false;

    const handleResize = () => { 
        w = canvas.width = window.innerWidth; 
        h = canvas.height = window.innerHeight;
        // Re-init dirt (resetting progress, sadly, but necessary for resize)
        // ... (re-run init logic)
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("resize", handleResize);

    return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mousedown", handleMouseDown);
        window.removeEventListener("mouseup", handleMouseUp);
        window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-auto cursor-none" />;
}