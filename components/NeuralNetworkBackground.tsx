"use client";
import { useEffect, useRef } from "react";

export default function NeuralNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    
    // Network Structure
    const layerCounts = [6, 8, 8, 6]; // Nodes per layer
    const layers: Node[][] = [];
    const pulses: Pulse[] = [];
    
    // Colors
    const nodeColor = "rgba(139, 92, 246, 0.2)"; // Violet
    const activeColor = "#22d3ee"; // Cyan

    class Node {
      x: number;
      y: number;
      r: number;
      activation: number;
      
      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.r = 4;
        this.activation = 0;
      }
      
      draw() {
          if (!ctx) return;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.r + this.activation * 4, 0, Math.PI*2);
          ctx.fillStyle = this.activation > 0.1 ? activeColor : nodeColor;
          ctx.globalAlpha = 0.5 + this.activation * 0.5;
          ctx.fill();
          
          // Decay
          this.activation *= 0.9;
          ctx.globalAlpha = 1;
      }
    }

    class Pulse {
      layerIndex: number;
      startNode: Node;
      endNode: Node;
      progress: number;
      speed: number;
      dead: boolean;

      constructor(layerIndex: number, startNode: Node, endNode: Node) {
          this.layerIndex = layerIndex;
          this.startNode = startNode;
          this.endNode = endNode;
          this.progress = 0;
          this.speed = Math.random() * 0.02 + 0.01;
          this.dead = false;
      }

      update() {
          this.progress += this.speed;
          if (this.progress >= 1) {
              this.progress = 1;
              this.endNode.activation = 1; // Trigger next node
              this.dead = true;
              
              // Spawn next layer pulses if not last layer
              if (this.layerIndex < layers.length - 2) {
                  const nextLayer = layers[this.layerIndex + 2];
                  // Connect to random nodes in next layer
                  const targetCount = Math.floor(Math.random() * 3) + 1;
                  for(let i=0; i<targetCount; i++) {
                      const nextNode = nextLayer[Math.floor(Math.random() * nextLayer.length)];
                      pulses.push(new Pulse(this.layerIndex + 1, this.endNode, nextNode));
                  }
              }
          }
      }

      draw() {
          if (!ctx) return;
          const x = this.startNode.x + (this.endNode.x - this.startNode.x) * this.progress;
          const y = this.startNode.y + (this.endNode.y - this.startNode.y) * this.progress;
          
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI*2);
          ctx.fillStyle = "#fff";
          ctx.shadowBlur = 5;
          ctx.shadowColor = activeColor;
          ctx.fill();
          ctx.shadowBlur = 0;
          
          // Trail
          ctx.beginPath();
          ctx.moveTo(this.startNode.x, this.startNode.y);
          ctx.lineTo(x, y);
          ctx.strokeStyle = activeColor;
          ctx.globalAlpha = 0.2;
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.globalAlpha = 1;
      }
    }

    // Init Layers
    const initLayers = () => {
        layers.length = 0;
        const colSpacing = w / (layerCounts.length + 1);
        
        layerCounts.forEach((count, colIndex) => {
            const col: Node[] = [];
            const rowSpacing = h / (count + 1);
            for(let i=0; i<count; i++) {
                const x = colSpacing * (colIndex + 1) + (Math.random() * 20 - 10);
                const y = rowSpacing * (i + 1) + (Math.random() * 20 - 10);
                col.push(new Node(x, y));
            }
            layers.push(col);
        });
    };

    initLayers();

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      
      // Draw Connections (Static background web)
      ctx.strokeStyle = "rgba(139, 92, 246, 0.05)";
      ctx.lineWidth = 1;
      for(let i=0; i<layers.length-1; i++) {
          const l1 = layers[i];
          const l2 = layers[i+1];
          l1.forEach(n1 => {
              l2.forEach(n2 => {
                  ctx.beginPath();
                  ctx.moveTo(n1.x, n1.y);
                  ctx.lineTo(n2.x, n2.y);
                  ctx.stroke();
              });
          });
      }

      // Input Trigger
      if (Math.random() > 0.95) {
          const l1 = layers[0];
          const l2 = layers[1];
          const start = l1[Math.floor(Math.random() * l1.length)];
          start.activation = 1;
          const end = l2[Math.floor(Math.random() * l2.length)];
          pulses.push(new Pulse(0, start, end));
      }

      // Update Pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
          pulses[i].update();
          pulses[i].draw();
          if (pulses[i].dead) pulses.splice(i, 1);
      }

      // Draw Nodes
      layers.flat().forEach(n => n.draw());

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    const handleResize = () => { 
        w = canvas.width = window.innerWidth; 
        h = canvas.height = window.innerHeight;
        initLayers(); 
    };
    window.addEventListener("resize", handleResize);
    return () => { window.removeEventListener("resize", handleResize); cancelAnimationFrame(animId); };
  }, []);

  return (
    <>
        <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-40" />
        <div className="hd-vignette" />
    </>
  );
}