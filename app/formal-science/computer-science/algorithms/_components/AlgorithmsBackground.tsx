"use client";
import React, { useEffect, useRef } from "react";

export function AlgorithmsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // CONFIG
    const BAR_WIDTH = 4;
    const GAP = 1;
    const SPEED = 50; // Swaps per frame per section

    // STATE
    let bars: number[] = [];
    const numBars = Math.ceil(width / (BAR_WIDTH + GAP));

    // INITIALIZE RANDOM HEIGHTS
    function init() {
      bars = [];
      for (let i = 0; i < numBars; i++) {
        bars.push(Math.random() * height);
      }
    }

    // THE SORTING LOOP (Distributed Bubble Sort)
    // We sort random chunks to keep the visual active across the screen
    const animate = () => {
      // Fade out effect
      ctx.fillStyle = "rgba(2, 6, 23, 0.2)"; // Dark Slate
      ctx.fillRect(0, 0, width, height);

      // Perform Sort Steps
      for (let s = 0; s < SPEED; s++) {
        // Pick random index
        const i = Math.floor(Math.random() * (bars.length - 1));
        
        // BUBBLE SORT SWAP LOGIC
        if (bars[i] > bars[i + 1]) {
          const temp = bars[i];
          bars[i] = bars[i + 1];
          bars[i + 1] = temp;
        }
      }
      
      // Randomly reset a bar to keep chaos flowing (Entropy)
      if (Math.random() > 0.9) {
         const r = Math.floor(Math.random() * bars.length);
         bars[r] = Math.random() * height;
      }

      // DRAW BARS
      for (let i = 0; i < bars.length; i++) {
        const x = i * (BAR_WIDTH + GAP);
        const h = bars[i];
        
        // Color coding based on height (Heatmap)
        const hue = 160 + (h / height) * 40; // Emerald to Blue range
        const lightness = 30 + (h / height) * 40;
        
        ctx.fillStyle = `hsl(${hue}, 80%, ${lightness}%)`;
        ctx.fillRect(x, height - h, BAR_WIDTH, h);
      }

      requestAnimationFrame(animate);
    };

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      init();
    };

    window.addEventListener("resize", resize);
    init();
    const frameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-50 bg-[#020617]">
      <canvas ref={canvasRef} className="absolute inset-0 opacity-40" />
      {/* Vignette to focus center */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_90%)]" />
    </div>
  );
}