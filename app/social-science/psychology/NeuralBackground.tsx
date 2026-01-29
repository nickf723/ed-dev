"use client";
import { useEffect, useRef } from "react";

export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let mouse = { x: -100, y: -100 };

    // Configuration
    const nodeCount = 100;
    const connectDist = 150;
    
    // Neuron Class
    class Neuron {
        x: number;
        y: number;
        radius: number;
        connections: Neuron[];
        
        constructor() {
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.radius = 2 + Math.random() * 3;
            this.connections = [];
        }
    }

    // Signal (Action Potential) Class
    class Signal {
        start: Neuron;
        end: Neuron;
        progress: number; // 0 to 1
        speed: number;
        life: boolean;

        constructor(start: Neuron, end: Neuron) {
            this.start = start;
            this.end = end;
            this.progress = 0;
            this.speed = 0.02 + Math.random() * 0.03;
            this.life = true;
        }

        update() {
            this.progress += this.speed;
            if (this.progress >= 1) {
                this.life = false;
                // Trigger chain reaction (chance to fire new signals)
                if (Math.random() > 0.7) triggerSignal(this.end);
            }
        }

        draw() {
            const curX = this.start.x + (this.end.x - this.start.x) * this.progress;
            const curY = this.start.y + (this.end.y - this.start.y) * this.progress;
            
            ctx.beginPath();
            ctx.arc(curX, curY, 2, 0, Math.PI*2);
            ctx.fillStyle = "#00e1ff"; // Pink-400
            ctx.shadowBlur = 10;
            ctx.shadowColor = "#16065f";
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    const neurons: Neuron[] = [];
    let signals: Signal[] = [];

    // Initialize Network
    for(let i=0; i<nodeCount; i++) neurons.push(new Neuron());

    // Connect Neurons (Static Map)
    neurons.forEach(n1 => {
        neurons.forEach(n2 => {
            if (n1 === n2) return;
            const dist = Math.sqrt((n1.x - n2.x)**2 + (n1.y - n2.y)**2);
            if (dist < connectDist) {
                // One-way connection for simplicity of list, but visual line is shared
                if (!n1.connections.includes(n2)) n1.connections.push(n2);
            }
        });
    });

    const triggerSignal = (source: Neuron) => {
        // Fire to random neighbors
        source.connections.forEach(target => {
            if (Math.random() > 0.5) { // Don't fire everywhere, keep it sparse
                signals.push(new Signal(source, target));
            }
        });
    };

    const animate = () => {
      // Clear with fade (dreamy trail)
      ctx.fillStyle = "rgba(15, 5, 24, 0.2)"; // Deep Violet-Black
      ctx.fillRect(0, 0, w, h);

      // Draw Static Web (Faint)
      ctx.lineWidth = 0.5;
      neurons.forEach(n => {
          // Draw Body
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius, 0, Math.PI*2);
          ctx.fillStyle = "#9c05aa"; // Violet-900
          ctx.fill();

          // Draw Axons
          n.connections.forEach(target => {
              ctx.beginPath();
              ctx.moveTo(n.x, n.y);
              ctx.lineTo(target.x, target.y);
              ctx.strokeStyle = "rgba(139, 92, 246, 0.1)"; // Violet-500 low opacity
              ctx.stroke();
          });
          
          // Mouse Interaction (Fire)
          const dist = Math.sqrt((n.x - mouse.x)**2 + (n.y - mouse.y)**2);
          if (dist < 100 && Math.random() > 0.9) {
              triggerSignal(n);
          }
      });

      // Update & Draw Signals
      for (let i = signals.length - 1; i >= 0; i--) {
          signals[i].update();
          signals[i].draw();
          if (!signals[i].life) signals.splice(i, 1);
      }

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