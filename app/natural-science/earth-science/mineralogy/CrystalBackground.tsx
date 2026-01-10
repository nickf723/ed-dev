"use client";
import { useEffect, useRef } from "react";

export default function CrystalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // --- CONFIGURATION ---
    const shardCount = 400;
    const fuchsia = { r: 217, g: 70, b: 239 }; // Fuchsia-500
    const purple = { r: 168, g: 85, b: 247 };  // Purple-500
    const cyan = { r: 34, g: 211, b: 238 };    // Cyan-400 (Accents)

    // --- GENERATE SHARDS (TRIANGLES) ---
    const shards: {
      x: number; y: number; z: number;
      rx: number; ry: number; rz: number; // Rotations
      size: number;
      speed: number;
      color: { r: number, g: number, b: number };
      vertices: { x: number, y: number, z: number }[];
    }[] = [];

    for (let i = 0; i < shardCount; i++) {
      // Random position in a large cloud
      const range = 800;
      const x = (Math.random() - 0.5) * range * 2;
      const y = (Math.random() - 0.5) * range * 2;
      const z = (Math.random() - 0.5) * range * 2;

      // Pick color palette
      const seed = Math.random();
      let color = fuchsia;
      if (seed > 0.6) color = purple;
      if (seed > 0.9) color = cyan; // Rare cyan sparkles

      // Create a random triangle shape
      const s = 5 + Math.random() * 15; // Size
      const v1 = { x: (Math.random() - 0.5) * s, y: (Math.random() - 0.5) * s, z: (Math.random() - 0.5) * s };
      const v2 = { x: (Math.random() - 0.5) * s, y: (Math.random() - 0.5) * s, z: (Math.random() - 0.5) * s };
      const v3 = { x: (Math.random() - 0.5) * s, y: (Math.random() - 0.5) * s, z: (Math.random() - 0.5) * s };

      shards.push({
        x, y, z,
        rx: Math.random() * Math.PI, ry: Math.random() * Math.PI, rz: Math.random() * Math.PI,
        size: s,
        speed: (Math.random() * 0.01) + 0.002,
        color,
        vertices: [v1, v2, v3]
      });
    }

    // --- 3D MATH HELPERS ---
    const rotate = (x: number, y: number, z: number, pitch: number, yaw: number, roll: number) => {
      // Simple rotation matrix logic (simplified for perf)
      // Rotate Y (Yaw)
      let x1 = x * Math.cos(yaw) - z * Math.sin(yaw);
      let z1 = x * Math.sin(yaw) + z * Math.cos(yaw);
      // Rotate X (Pitch)
      let y1 = y * Math.cos(pitch) - z1 * Math.sin(pitch);
      let z2 = y * Math.sin(pitch) + z1 * Math.cos(pitch);
      // Rotate Z (Roll)
      let x2 = x1 * Math.cos(roll) - y1 * Math.sin(roll);
      let y2 = x1 * Math.sin(roll) + y1 * Math.cos(roll);
      return { x: x2, y: y2, z: z2 };
    };

    // --- ANIMATION LOOP ---
    let time = 0;
    const render = () => {
      time += 0.005;
      
      // Clear with deep purple void
      ctx.fillStyle = "#0f0518"; 
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      
      // Sort shards by Z so back ones draw first (Painter's Algorithm)
      // This is crucial for the "transparent crystal" feel, though simple here
      shards.sort((a, b) => b.z - a.z);

      shards.forEach(shard => {
        // 1. Move the shard center (Slow rotation of the whole cloud)
        const cloudRot = time * 0.5;
        let sx = shard.x * Math.cos(cloudRot) - shard.z * Math.sin(cloudRot);
        let sz = shard.x * Math.sin(cloudRot) + shard.z * Math.cos(cloudRot);
        let sy = shard.y;

        // 2. Local Rotation (The shard spinning)
        shard.rx += shard.speed;
        shard.ry += shard.speed;

        // 3. Project Vertices
        const projected = shard.vertices.map(v => {
           // Rotate vertex around shard center
           const rv = rotate(v.x, v.y, v.z, shard.rx, shard.ry, shard.rz);
           // Add world position
           const wx = sx + rv.x;
           const wy = sy + rv.y;
           const wz = sz + rv.z + 1000; // Push back from camera

           // Perspective Projection
           const scale = 600 / wz; // 600 = FOV
           return {
             x: cx + wx * scale,
             y: cy + wy * scale,
             z: wz // for lighting
           };
        });

        // 4. Draw Triangle
        // Calculate "Glint" - simple normal approximation
        // If the triangle is facing us, it reflects light
        // (Cross product logic simplified for visual effect)
        const p0 = projected[0]; const p1 = projected[1]; const p2 = projected[2];
        const area = (p1.x - p0.x) * (p2.y - p0.y) - (p1.y - p0.y) * (p2.x - p0.x);
        
        // Only draw front-facing triangles (Back-face culling)
        if (area > 0) {
           // Light Intensity based on how "flat" it is to the screen
           // + distance fade
           const brightness = Math.min(1, Math.abs(area) / 200); 
           const depthFade = 1 - (p0.z / 2000);
           const alpha = brightness * depthFade;

           if (alpha > 0.05) {
               ctx.beginPath();
               ctx.moveTo(p0.x, p0.y);
               ctx.lineTo(p1.x, p1.y);
               ctx.lineTo(p2.x, p2.y);
               ctx.closePath();
               
               // Fill
               ctx.fillStyle = `rgba(${shard.color.r}, ${shard.color.g}, ${shard.color.b}, ${alpha * 0.6})`;
               ctx.fill();
               
               // Stroke (The wireframe edges make it look sharper)
               ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.8})`;
               ctx.lineWidth = 0.5;
               ctx.stroke();

               // SUPER GLINT (The "Bedazzled" flash)
               if (alpha > 0.8) {
                   ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
                   ctx.fill();
               }
           }
        }
      });

      requestAnimationFrame(render);
    };

    render();
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}