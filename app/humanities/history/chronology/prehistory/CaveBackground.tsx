"use client";
import { useEffect, useRef } from "react";

export default function CaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let mouse = { x: w / 2, y: h / 2 };
    let flicker = 0;

    // 1. Generate Cave Art (The "Hidden" Layer)
    // We'll draw this onto an offscreen canvas to improve performance
    const artCanvas = document.createElement('canvas');
    artCanvas.width = w;
    artCanvas.height = h;
    const aCtx = artCanvas.getContext('2d');
    
    if (aCtx) {
        // Stone Texture Base
        aCtx.fillStyle = "#292524"; // Stone-800
        aCtx.fillRect(0, 0, w, h);
        
        // Noise / Rock Texture
        for(let i=0; i<2000; i++) {
            aCtx.fillStyle = Math.random() > 0.5 ? "#1c1917" : "#44403c";
            aCtx.beginPath();
            aCtx.arc(Math.random()*w, Math.random()*h, Math.random()*3, 0, Math.PI*2);
            aCtx.fill();
        }

        // Handprints (The "Signatures")
        const drawHand = (x: number, y: number, color: string) => {
            aCtx.fillStyle = color;
            aCtx.beginPath();
            aCtx.ellipse(x, y, 20, 30, 0, 0, Math.PI*2); // Palm
            aCtx.ellipse(x-15, y-35, 5, 20, -0.2, 0, Math.PI*2); // Fingers
            aCtx.ellipse(x-5, y-45, 5, 25, -0.1, 0, Math.PI*2);
            aCtx.ellipse(x+5, y-45, 5, 25, 0.1, 0, Math.PI*2);
            aCtx.ellipse(x+15, y-35, 5, 20, 0.2, 0, Math.PI*2);
            aCtx.ellipse(x+25, y-10, 5, 15, 0.8, 0, Math.PI*2); // Thumb
            aCtx.fill();
        };

        for(let i=0; i<10; i++) {
            drawHand(Math.random()*w, Math.random()*h, "rgba(180, 83, 9, 0.6)"); // Ochre
        }

        // Simple Animals (Deer/Bison outlines)
        aCtx.strokeStyle = "#7f1d1d"; // Red-900
        aCtx.lineWidth = 3;
        for(let i=0; i<5; i++) {
            const x = Math.random() * w;
            const y = Math.random() * h;
            aCtx.beginPath();
            aCtx.moveTo(x, y);
            aCtx.quadraticCurveTo(x+20, y-20, x+60, y); // Back
            aCtx.quadraticCurveTo(x+80, y+10, x+60, y+40); // Rump
            aCtx.lineTo(x+50, y+60); // Leg
            aCtx.moveTo(x, y);
            aCtx.quadraticCurveTo(x-10, y+10, x, y+40); // Neck
            aCtx.lineTo(x+10, y+60); // Front leg
            aCtx.stroke();
        }
    }

    const animate = () => {
      // 1. Draw the Art (The Base)
      ctx.drawImage(artCanvas, 0, 0);

      // 2. Create the Darkness Overlay
      // We use a radial gradient to simulate the torch light
      flicker += (Math.random() - 0.5) * 2;
      const radius = 150 + Math.sin(Date.now() * 0.01) * 5 + flicker;
      
      const g = ctx.createRadialGradient(mouse.x, mouse.y, radius * 0.2, mouse.x, mouse.y, radius);
      g.addColorStop(0, "rgba(0,0,0,0)");      // Transparent center (Light)
      g.addColorStop(0.5, "rgba(0,0,0,0.5)");  // Fading
      g.addColorStop(1, "rgba(0,0,0,1)");       // Solid Black (Darkness)

      ctx.fillStyle = g;
      ctx.globalCompositeOperation = 'source-over'; 
      // Actually, to make the rest pitch black, we need to fill the whole screen 
      // BUT exclude the center. The gradient above adds darkness TO the center.
      // Better approach: Fill black, then clear rect? No, that clears art.
      
      // Correct approach for "Flashlight":
      // Draw Black Rectangle over everything.
      // Use 'destination-out' to cut a hole in the black rectangle.
      
      // Step A: Draw Art (Already done at top of frame)
      
      // Step B: Draw Darkness Layer
      ctx.save();
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = "#000";
      // We can't just fillRect or we cover the art.
      // We need an offscreen "mask" canvas if we want complex lighting.
      // SIMPLE HACK: Draw a HUGE border around the mouse using the gradient?
      
      // Let's stick to the gradient "Vignette" approach but inverted logic visually
      // Actually, drawing a radial gradient from transparent to black is the easiest way to make a flashlight.
      // It just needs to cover the whole screen.
      const bigG = ctx.createRadialGradient(mouse.x, mouse.y, radius * 0.1, mouse.x, mouse.y, Math.max(w,h));
      bigG.addColorStop(0, "rgba(0,0,0,0)");       // Clear center
      bigG.addColorStop(0.1, "rgba(20, 10, 5, 0.4)"); // Warm glow edge
      bigG.addColorStop(0.2, "rgba(0,0,0,0.95)");  // Rapid falloff to dark
      bigG.addColorStop(1, "rgba(0,0,0,1)");
      
      ctx.fillStyle = bigG;
      ctx.fillRect(0, 0, w, h);
      ctx.restore();

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    const handleMouseMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}