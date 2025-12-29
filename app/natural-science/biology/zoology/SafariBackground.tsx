"use client";
import { useEffect, useRef } from "react";

export default function SafariBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let time = 0;

    // --- ENTITIES ---
    type Entity = { x: number; y: number; vx: number; vy: number; type: 'prey' | 'predator'; energy: number; r: number };
    type Plant = { x: number; y: number; size: number };

    let entities: Entity[] = [];
    let plants: Plant[] = [];

    // Init Population
    const init = () => {
        entities = [];
        plants = [];
        // Spawn Prey
        for(let i=0; i<40; i++) {
            entities.push({
                x: Math.random() * w, y: Math.random() * h,
                vx: (Math.random()-0.5), vy: (Math.random()-0.5),
                type: 'prey', energy: 100, r: 4
            });
        }
        // Spawn Predators
        for(let i=0; i<5; i++) {
            entities.push({
                x: Math.random() * w, y: Math.random() * h,
                vx: (Math.random()-0.5), vy: (Math.random()-0.5),
                type: 'predator', energy: 150, r: 6
            });
        }
    };
    init();

    const animate = () => {
      // Background: Savanna Night
      ctx.fillStyle = "#1c1917"; // Stone-900
      ctx.fillRect(0, 0, w, h);
      time++;

      // 1. Grow Plants (Randomly)
      if (Math.random() > 0.8 && plants.length < 200) {
          plants.push({ x: Math.random()*w, y: Math.random()*h, size: 0 });
      }

      // Draw Plants
      ctx.fillStyle = "#166534"; // Green-800
      for(let i=plants.length-1; i>=0; i--) {
          const p = plants[i];
          if(p.size < 3) p.size += 0.05;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
          ctx.fill();
      }

      // 2. Update Animals
      for(let i=entities.length-1; i>=0; i--) {
          const e = entities[i];
          
          // MOVEMENT & PHYSICS
          e.x += e.vx; e.y += e.vy;
          
          // Wrap
          if(e.x < 0) e.x = w; if(e.x > w) e.x = 0;
          if(e.y < 0) e.y = h; if(e.y > h) e.y = 0;

          // Drag / Metabolism
          e.energy -= 0.1;
          
          // BEHAVIOR
          let target = null;
          let minDist = 200;

          if (e.type === 'prey') {
              // Look for food
              for(let j=plants.length-1; j>=0; j--) {
                  const p = plants[j];
                  const d = Math.sqrt((e.x-p.x)**2 + (e.y-p.y)**2);
                  if (d < e.r + p.size) {
                      // Eat
                      e.energy += 20;
                      plants.splice(j, 1);
                  } else if (d < minDist) {
                      minDist = d;
                      target = p;
                  }
              }
              // Flee from predators
              entities.forEach(other => {
                  if(other.type === 'predator') {
                      const d = Math.sqrt((e.x-other.x)**2 + (e.y-other.y)**2);
                      if (d < 100) {
                          e.vx -= (other.x - e.x)/d * 0.5;
                          e.vy -= (other.y - e.y)/d * 0.5;
                      }
                  }
              });

          } else { // Predator
              // Chase prey
              let closestPrey = null;
              let preyIdx = -1;
              
              for(let j=0; j<entities.length; j++) {
                  const other = entities[j];
                  if (other.type === 'prey') {
                      const d = Math.sqrt((e.x-other.x)**2 + (e.y-other.y)**2);
                      if (d < e.r + other.r) {
                          // Eat Prey
                          e.energy += 50;
                          entities.splice(j, 1);
                          if(j < i) i--; // Adjust index
                      } else if (d < minDist) {
                          minDist = d;
                          closestPrey = other;
                      }
                  }
              }
              if(closestPrey) target = closestPrey;
          }

          // Move towards target
          if(target) {
              const dx = target.x - e.x;
              const dy = target.y - e.y;
              const d = Math.sqrt(dx*dx + dy*dy);
              e.vx += (dx/d) * 0.1;
              e.vy += (dy/d) * 0.1;
          } else {
              // Wander
              e.vx += (Math.random()-0.5)*0.2;
              e.vy += (Math.random()-0.5)*0.2;
          }

          // Speed Limit
          const speed = Math.sqrt(e.vx*e.vx + e.vy*e.vy);
          const maxSpeed = e.type === 'predator' ? 3 : 2;
          if(speed > maxSpeed) { e.vx *= 0.9; e.vy *= 0.9; }

          // Reproduction
          if(e.energy > 200) {
              e.energy = 100;
              entities.push({ ...e, x: e.x + 10, y: e.y + 10, vx: -e.vx, vy: -e.vy });
          }

          // Death
          if(e.energy <= 0) {
              entities.splice(i, 1);
              continue;
          }

          // DRAW
          ctx.beginPath();
          // Orientation
          const angle = Math.atan2(e.vy, e.vx);
          const tipX = e.x + Math.cos(angle) * e.r * 2;
          const tipY = e.y + Math.sin(angle) * e.r * 2;
          
          ctx.moveTo(tipX, tipY);
          ctx.lineTo(e.x + Math.cos(angle + 2.5)*e.r, e.y + Math.sin(angle + 2.5)*e.r);
          ctx.lineTo(e.x + Math.cos(angle - 2.5)*e.r, e.y + Math.sin(angle - 2.5)*e.r);
          
          ctx.fillStyle = e.type === 'prey' ? "#a3e635" : "#f87171"; // Lime vs Red
          ctx.fill();
      }

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    
    // Click to add food cluster (The Hand of Nature)
    const handleClick = (e: MouseEvent) => {
        for(let i=0; i<10; i++) {
            plants.push({ 
                x: e.clientX + (Math.random()-0.5)*50, 
                y: e.clientY + (Math.random()-0.5)*50, 
                size: 0 
            });
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

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-auto cursor-crosshair" />;
}