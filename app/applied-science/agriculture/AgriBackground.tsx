"use client";
import { useEffect, useRef } from "react";

export default function AgriBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // Isometric Grid settings
    const tileW = 60;
    const tileH = 30;
    
    // Plant State: 0=Empty, 1=Sprout, 2=Growing, 3=Mature, 4=Harvested (Brown)
    class Tile {
        x: number; y: number; state: number; progress: number; type: number;
        constructor(x: number, y: number) {
            this.x = x; this.y = y;
            this.state = Math.random() * 4;
            this.progress = Math.random() * 100;
            this.type = Math.random() > 0.5 ? 0 : 1; // 0 = Leafy, 1 = Stalky
        }

        update() {
            this.progress += 0.2;
            if (this.progress > 100) {
                this.state++;
                this.progress = 0;
                if (this.state > 4) this.state = 0; // Reset / Replant
            }
        }

        draw(offsetX: number, offsetY: number) {
            // Iso Projection
            const isoX = (this.x - this.y) * tileW + offsetX;
            const isoY = (this.x + this.y) * tileH + offsetY;

            // Draw Soil
            ctx.fillStyle = "#3f2e18"; // Dark dirt
            ctx.beginPath();
            ctx.moveTo(isoX, isoY);
            ctx.lineTo(isoX + tileW, isoY + tileH);
            ctx.lineTo(isoX, isoY + tileH * 2);
            ctx.lineTo(isoX - tileW, isoY + tileH);
            ctx.fill();
            
            // Draw Plant based on state
            if (this.state === 1) { // Sprout
                ctx.fillStyle = "#84cc16";
                ctx.fillRect(isoX - 2, isoY + tileH - 5, 4, 5);
            } else if (this.state === 2) { // Growing
                ctx.fillStyle = "#65a30d";
                ctx.fillRect(isoX - 4, isoY + tileH - 15, 8, 15);
            } else if (this.state === 3) { // Mature
                ctx.fillStyle = this.type === 0 ? "#166534" : "#eab308"; // Green or Gold
                ctx.fillRect(isoX - 6, isoY + tileH - 25, 12, 25);
            }
            // State 0 and 4 are empty dirt
        }
    }

    const gridSize = 15;
    const tiles: Tile[] = [];
    for(let x=0; x<gridSize; x++) {
        for(let y=0; y<gridSize; y++) {
            tiles.push(new Tile(x, y));
        }
    }

    const animate = () => {
      ctx.fillStyle = "#1c1917"; // Stone-900
      ctx.fillRect(0, 0, w, h);

      const offsetX = w / 2;
      const offsetY = h / 4;

      tiles.forEach(t => {
          t.update();
          t.draw(offsetX, offsetY);
      });

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);

    return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}