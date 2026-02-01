"use client";
import { useEffect, useRef } from "react";

export default function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // --- CONFIG ---
    const nodeCount = 60;
    const connectionDist = 150;
    const packetChance = 0.02; // Chance to spawn a data packet
    
    // --- STATE ---
    const nodes: { x: number; y: number; vx: number; vy: number }[] = [];
    const packets: { 
        startNodeIdx: number; 
        endNodeIdx: number; 
        progress: number; // 0 to 1
        speed: number;
    }[] = [];

    // Init Nodes
    for (let i = 0; i < nodeCount; i++) {
        nodes.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5
        });
    }

    const render = () => {
      ctx.fillStyle = "#120303d0"; // Gray-950
      ctx.fillRect(0, 0, w, h);

      // Update Nodes
      nodes.forEach(n => {
          n.x += n.vx;
          n.y += n.vy;

          // Bounce
          if (n.x < 0 || n.x > w) n.vx *= -1;
          if (n.y < 0 || n.y > h) n.vy *= -1;
      });

      // Draw Connections & Manage Packets
      ctx.strokeStyle = "rgba(212, 6, 6, 0.15)"; // Cyan-500 low opacity
      ctx.lineWidth = 1;

      for (let i = 0; i < nodeCount; i++) {
          for (let j = i + 1; j < nodeCount; j++) {
              const dx = nodes[i].x - nodes[j].x;
              const dy = nodes[i].y - nodes[j].y;
              const dist = Math.sqrt(dx*dx + dy*dy);

              if (dist < connectionDist) {
                  // Draw Line
                  ctx.beginPath();
                  ctx.moveTo(nodes[i].x, nodes[i].y);
                  ctx.lineTo(nodes[j].x, nodes[j].y);
                  ctx.stroke();

                  // Spawn Packet?
                  if (Math.random() < packetChance) {
                      packets.push({
                          startNodeIdx: i,
                          endNodeIdx: j,
                          progress: 0,
                          speed: 0.02 + Math.random() * 0.03
                      });
                  }
              }
          }
      }

      // Draw Packets (The Data Flow)
      // We iterate backwards to allow removal
      for (let i = packets.length - 1; i >= 0; i--) {
          const p = packets[i];
          p.progress += p.speed;

          if (p.progress >= 1) {
              packets.splice(i, 1); // Arrived
              continue;
          }

          const n1 = nodes[p.startNodeIdx];
          const n2 = nodes[p.endNodeIdx];
          
          // Re-check distance to see if link broke (optional, but looks better)
          const dist = Math.sqrt((n1.x-n2.x)**2 + (n1.y-n2.y)**2);
          if (dist > connectionDist) {
               packets.splice(i, 1);
               continue;
          }

          // Lerp position
          const curX = n1.x + (n2.x - n1.x) * p.progress;
          const curY = n1.y + (n2.y - n1.y) * p.progress;

          ctx.fillStyle = "#ee2222"; // Cyan-400
          ctx.beginPath();
          ctx.arc(curX, curY, 2, 0, Math.PI*2);
          ctx.fill();
      }

      // Draw Nodes (Tech Dots)
      ctx.fillStyle = "#900e0e"; // Cyan-700
      nodes.forEach(n => {
          ctx.beginPath();
          ctx.arc(n.x, n.y, 2, 0, Math.PI*2);
          ctx.fill();
      });

      requestAnimationFrame(render);
    };

    const animId = requestAnimationFrame(render);
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);
    return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-50 pointer-events-none" />;
}