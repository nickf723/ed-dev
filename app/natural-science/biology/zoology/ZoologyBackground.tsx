"use client";
import { useEffect, useRef } from "react";

interface Props {
  weather: string;
}

export default function ZoologyBackground(props: Props) {
  const { weather } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let time = 0;

    // Defines a particle with advanced physics properties
    interface Particle {
      x: number;
      y: number;
      z: number; // For Parallax (0 = far, 1 = close)
      size: number;
      speed: number;
      angle: number;     // Rotation
      spinSpeed: number; // How fast it rotates
      drift: number;     // Wind resistance
    }

    const particles: Particle[] = [];
    
    // --- PARTICLE FACTORY ---
    const initWeather = () => {
      particles.length = 0;
      
      // 1. LEAVES (Forest)
      if (weather === 'LEAVES') {
        const count = 50;
        for(let i=0; i<count; i++) {
          particles.push({
             x: Math.random() * w,
             y: Math.random() * h,
             z: Math.random(), // varying depth
             size: Math.random() * 8 + 4,
             speed: Math.random() * 1 + 0.5,
             angle: Math.random() * Math.PI * 2,
             spinSpeed: (Math.random() - 0.5) * 0.1,
             drift: Math.random() * 2
          });
        }
      }
      
      // 2. SNOW (Tundra)
      else if (weather === 'SNOW_STORM') {
        const count = 150;
        for(let i=0; i<count; i++) {
           particles.push({
             x: Math.random() * w,
             y: Math.random() * h,
             z: Math.random(),
             size: Math.random() * 2 + 1,
             speed: Math.random() * 3 + 1,
             angle: 0,
             spinSpeed: 0,
             drift: Math.random() * 0.5
           });
        }
      }

      // 3. BUBBLES / UNDERWATER (Ocean / Coral Reef)
      else if (weather === 'BUBBLES' || weather === 'UNDERWATER') {
         const count = 60;
         for(let i=0; i<count; i++) {
            particles.push({
              x: Math.random() * w,
              y: h + Math.random() * 100,
              z: Math.random(),
              size: Math.random() * 10 + 2,
              speed: Math.random() * 1.5 + 0.2,
              angle: 0, 
              spinSpeed: 0, 
              drift: Math.random() * 1
            });
         }
      }
      
      // 4. RAIN (Rainforest)
      else if (weather === 'RAIN') {
          const count = 100;
          for(let i=0; i<count; i++) {
              particles.push({
                x: Math.random() * w, 
                y: Math.random() * h, 
                z: Math.random(),
                size: Math.random() * 20 + 10, // Length
                speed: Math.random() * 15 + 10,
                angle: 0, spinSpeed: 0, drift: 0
              });
          }
      }

      // 5. FOG (Wetlands) - Fog uses particles as "Cloud Puffs"
      else if (weather === 'FOG') {
         const count = 30;
         for(let i=0; i<count; i++) {
            particles.push({
                x: Math.random() * w,
                y: Math.random() * h,
                z: Math.random(),
                size: Math.random() * 300 + 100, // Width
                speed: Math.random() * 0.5 + 0.1,
                angle: 0, spinSpeed: 0, drift: 0
            });
         }
      }
      
      // (CRAGGY, GRASSY, CLEAR, HEAT_HAZE are procedural only)
    };
    
    initWeather();

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      
      // Global Wind Calculation (Sine wave that shifts over time)
      const windForce = Math.sin(time * 0.005) * 2;

      // --- ATMOSPHERIC LAYERS ---

      // 1. GOD RAYS (Savanna / Grassland)
      if (weather === 'GOD_RAYS' || weather === 'GRASSY') {
         ctx.globalCompositeOperation = "screen";
         const cx = w * 0.8; 
         const cy = -100;
         for(let i=0; i<5; i++) {
            const angle = (Math.sin(time * 0.0005 + i) * 0.1) + 0.6 + (i * 0.15);
            const grad = ctx.createLinearGradient(cx, cy, cx - Math.cos(angle)*h, h);
            grad.addColorStop(0, "rgba(251, 191, 36, 0.1)"); 
            grad.addColorStop(1, "rgba(0,0,0,0)");
            
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(cx - Math.cos(angle - 0.05) * h * 1.5, h);
            ctx.lineTo(cx - Math.cos(angle + 0.05) * h * 1.5, h);
            ctx.fill();
         }
         ctx.globalCompositeOperation = "source-over";
      }

      // 2. HEAT HAZE (Desert)
      else if (weather === 'HEAT_HAZE') {
         ctx.strokeStyle = "rgba(255, 160, 0, 0.05)";
         ctx.lineWidth = 20;
         for(let i=0; i<20; i++) {
             const x = (i * w/20) + Math.sin(time * 0.01 + i) * 20;
             ctx.beginPath();
             ctx.moveTo(x, h);
             ctx.bezierCurveTo(x + 50, h*0.7, x - 50, h*0.3, x + Math.sin(time*0.02)*50, 0);
             ctx.stroke();
         }
      }

      // 3. UNDERWATER CAUSTICS (Coral Reef)
      else if (weather === 'UNDERWATER') {
         ctx.globalCompositeOperation = "overlay";
         const causticCount = 10;
         ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
         ctx.lineWidth = 40;
         
         for(let i=0; i<causticCount; i++) {
             // Waving light bands
             const x = (i * w/causticCount) + Math.sin(time * 0.01 + i) * 50;
             ctx.beginPath();
             ctx.moveTo(x, 0);
             ctx.bezierCurveTo(
                 x + 100, h * 0.3, 
                 x - 100, h * 0.7, 
                 x + Math.sin(time * 0.02) * 50, h
             );
             ctx.stroke();
         }
         ctx.globalCompositeOperation = "source-over";
      }

      // --- PROCEDURAL TERRAIN ---

      // 4. GRASSY (Savanna / Grassland)
      if (weather === 'GRASSY' || weather === 'GOD_RAYS') {
         const grassColor = weather === 'GRASSY' ? "163, 230, 53" : "251, 191, 36"; // Lime vs Amber
         const grassCount = Math.floor(w / 12); 
         
         for(let i=0; i<grassCount; i++) {
             const x = i * 12; 
             const sway = Math.sin(time * 0.02 + i * 0.1) * 15 + (windForce * 5);
             const height = 60 + Math.sin(i * 0.5) * 20; 
             
             ctx.beginPath();
             ctx.moveTo(x, h);
             ctx.quadraticCurveTo(x + sway/2, h - height/2, x + sway, h - height);
             ctx.lineWidth = 4;
             
             const grad = ctx.createLinearGradient(x, h, x, h-height);
             grad.addColorStop(0, `rgba(${grassColor}, 0.4)`);
             grad.addColorStop(1, `rgba(${grassColor}, 0)`);
             ctx.strokeStyle = grad;
             ctx.stroke();
         }
         
         // Fireflies
         if (weather === 'GRASSY') {
            ctx.fillStyle = "rgba(250, 204, 21, 0.8)"; 
            for(let i=0; i<5; i++) {
                const fx = (Math.sin(time * 0.01 + i * 100) * w/2) + w/2;
                const fy = h - 100 + Math.cos(time * 0.02 + i) * 50;
                ctx.beginPath(); ctx.arc(fx, fy, 2, 0, Math.PI*2); ctx.fill();
            }
         }
      }

      // 5. CRAGGY (Mountains)
      else if (weather === 'CRAGGY') {
        // Layer 1 (Far)
        ctx.fillStyle = "rgba(31, 41, 55, 0.5)"; // Gray-800
        ctx.beginPath();
        ctx.moveTo(0, h);
        for(let x=0; x<=w; x+=50) {
            const y = h - 150 - Math.abs(Math.sin(x * 0.01 + 1)) * 100;
            ctx.lineTo(x, y);
        }
        ctx.lineTo(w, h); ctx.fill();

        // Layer 2 (Close)
        ctx.fillStyle = "rgba(17, 24, 39, 0.8)"; // Gray-900
        ctx.beginPath();
        ctx.moveTo(0, h);
        for(let x=0; x<=w; x+=30) {
            const noise = Math.sin(x * 0.05) * 20; // Jagged
            const y = h - 80 - Math.abs(Math.sin(x * 0.02)) * 80 + noise;
            ctx.lineTo(x, y);
        }
        ctx.lineTo(w, h); ctx.fill();
      }

      // --- PARTICLE SIMULATION ---

      particles.forEach(p => {
          // A. LEAVES
          if (weather === 'LEAVES') {
             p.y += p.speed;
             p.x += Math.sin(time * 0.01 + p.drift) * 2 + windForce;
             p.angle += p.spinSpeed;
             
             if(p.y > h + 20) p.y = -20;
             if(p.x > w + 20) p.x = -20; if(p.x < -20) p.x = w + 20;

             ctx.save();
             ctx.translate(p.x, p.y);
             ctx.rotate(p.angle);
             ctx.fillStyle = `rgba(34, 197, 94, ${p.z * 0.5 + 0.2})`; // Green opacity depth
             ctx.beginPath();
             ctx.ellipse(0, 0, p.size / 2, p.size, 0, 0, Math.PI*2);
             ctx.fill();
             ctx.restore();
          }

          // B. RAIN
          else if (weather === 'RAIN') {
             p.y += p.speed;
             p.x += windForce * 0.5; // Slant
             if(p.y > h) { p.y = -p.size; p.x = Math.random() * w; }
             
             ctx.strokeStyle = `rgba(16, 185, 129, ${p.z * 0.5})`; // Emerald
             ctx.lineWidth = 1.5;
             ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x - windForce, p.y + p.size); ctx.stroke();
          }

          // C. SNOW
          else if (weather === 'SNOW_STORM') {
             p.y += p.speed; 
             p.x += Math.sin(time * 0.01 + p.drift) + windForce;
             if(p.y > h) p.y = -5;
             if(p.x > w) p.x = 0; if(p.x < 0) p.x = w;

             ctx.fillStyle = `rgba(255, 255, 255, ${p.z * 0.8})`;
             ctx.beginPath(); ctx.arc(p.x, p.y, p.size * p.z, 0, Math.PI*2); ctx.fill();
          }

          // D. FOG (Clouds)
          else if (weather === 'FOG') {
             p.x -= p.speed;
             if(p.x + p.size < 0) p.x = w + p.size;
             
             // Radial gradient for soft cloud look
             const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size/2);
             grad.addColorStop(0, "rgba(20, 184, 166, 0.08)"); // Teal mist
             grad.addColorStop(1, "rgba(0,0,0,0)");
             ctx.fillStyle = grad;
             ctx.fillRect(p.x - p.size, p.y - 100, p.size * 2, 200);
          }

          // E. BUBBLES
          else if (weather === 'BUBBLES' || weather === 'UNDERWATER') {
             p.y -= p.speed;
             p.x += Math.sin(time * 0.02 + p.drift) * 0.5; // Wobble
             if (p.y < -20) { p.y = h + 20; p.x = Math.random() * w; }

             // Tint bubbles: Pink for Reef, Blue for Ocean
             const color = weather === 'UNDERWATER' ? "236, 72, 153" : "56, 189, 248";
             
             ctx.strokeStyle = `rgba(${color}, 0.3)`;
             ctx.fillStyle = `rgba(${color}, 0.1)`;
             ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI*2); 
             ctx.fill(); ctx.stroke();
             
             // Shine dot
             ctx.fillStyle = "rgba(255,255,255,0.4)";
             ctx.beginPath(); ctx.arc(p.x - p.size*0.3, p.y - p.size*0.3, p.size*0.2, 0, Math.PI*2); ctx.fill();
          }
      });

      // 6. CLEAR (Starfield)
      if (weather === 'CLEAR') {
        ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
        // Simple static stars generated every frame is inefficient, 
        // so we just reuse the 'particles' array but treat them as static
        // Or for simplicity in this loop, draw randos (low perf impact for simple dots)
        for(let i=0; i<100; i++) {
            // Pseudo-random based on index to keep them static without storage
            const x = (i * 123456) % w;
            const y = (i * 654321) % h;
            ctx.beginPath(); ctx.arc(x, y, 1.5, 0, Math.PI*2); ctx.fill();
        }
      }

      time++;
      requestAnimationFrame(render);
    };

    const animId = requestAnimationFrame(render);
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; initWeather(); };
    window.addEventListener("resize", handleResize);
    return () => { window.removeEventListener("resize", handleResize); cancelAnimationFrame(animId); };
  }, [weather]);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}