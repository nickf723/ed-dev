"use client";
import { useEffect, useRef } from "react";

export default function GeometryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // --- GEOMETRY HELPERS ---
    const createEdges = (vertices: {x: number, y: number, z: number}[], threshold: number) => {
        const edges: {a: number, b: number}[] = [];
        for(let i=0; i<vertices.length; i++) {
            for(let j=i+1; j<vertices.length; j++) {
                const d = Math.sqrt(
                    Math.pow(vertices[i].x - vertices[j].x, 2) + 
                    Math.pow(vertices[i].y - vertices[j].y, 2) + 
                    Math.pow(vertices[i].z - vertices[j].z, 2)
                );
                if (d < threshold) edges.push({a: i, b: j});
            }
        }
        return edges;
    };

    const createDodecahedron = () => {
        const phi = (1 + Math.sqrt(5)) / 2;
        const vertices: {x: number, y: number, z: number}[] = [];
        for(let i=0; i<8; i++) vertices.push({ x: (i&1?1:-1), y: (i&2?1:-1), z: (i&4?1:-1) });
        for(let i=0; i<4; i++) vertices.push({ x: 0, y: (i&1?1:-1)/phi, z: (i&2?phi:-phi) });
        for(let i=0; i<4; i++) vertices.push({ x: (i&1?1:-1)/phi, y: (i&2?phi:-phi), z: 0 });
        for(let i=0; i<4; i++) vertices.push({ x: (i&1?phi:-phi), y: 0, z: (i&2?1:-1)/phi });
        return { vertices, edges: createEdges(vertices, 2.0/phi + 0.1) };
    };

    const createCube = () => {
        const vertices: {x: number, y: number, z: number}[] = [];
        for(let i=0; i<8; i++) vertices.push({ x: (i&1?1:-1), y: (i&2?1:-1), z: (i&4?1:-1) });
        return { vertices, edges: createEdges(vertices, 2.1) };
    };

    const createTetrahedron = () => {
        const vertices = [ {x:1,y:1,z:1}, {x:-1,y:-1,z:1}, {x:-1,y:1,z:-1}, {x:1,y:-1,z:-1} ];
        return { vertices, edges: createEdges(vertices, 3) };
    };

    const createOctahedron = () => {
        const vertices = [ {x:1,y:0,z:0}, {x:-1,y:0,z:0}, {x:0,y:1,z:0}, {x:0,y:-1,z:0}, {x:0,y:0,z:1}, {x:0,y:0,z:-1} ];
        return { vertices, edges: createEdges(vertices, 1.5) };
    };

    const createIcosahedron = () => {
        const phi = (1 + Math.sqrt(5)) / 2;
        const vertices: {x: number, y: number, z: number}[] = [];
        for(let i=0; i<4; i++) vertices.push({x:0, y:(i&1?1:-1), z:(i&2?phi:-phi)});
        for(let i=0; i<4; i++) vertices.push({x:(i&1?1:-1), y:(i&2?phi:-phi), z:0});
        for(let i=0; i<4; i++) vertices.push({x:(i&1?phi:-phi), y:0, z:(i&2?1:-1)});
        return { vertices, edges: createEdges(vertices, 2.1) };
    };

    // --- SCENE STATE ---
    interface GeometricShape {
        vertices: {x: number, y: number, z: number}[];
        edges: {a: number, b: number}[];
        position: {x: number, y: number, z: number};
        rotation: {x: number, y: number, z: number};
        rotSpeed: {x: number, y: number, z: number};
        scale: number;
        color: string;
        lineWidth: number;
    }
    const shapes: GeometricShape[] = [];

    const initScene = () => {
        shapes.length = 0;

        // 1. Central Dodecahedron
        const dodeca = createDodecahedron();
        shapes.push({
            ...dodeca,
            position: {x: 0, y: 0, z: 0},
            rotation: {x: 0, y: 0, z: 0},
            rotSpeed: {x: 0.002, y: 0.003, z: 0.001},
            scale: 180,
            color: "rgba(56, 189, 248, 0.5)", // Sky-400
            lineWidth: 2
        });

        // 2. Floating Platonic Solids
        const solidCreators = [createCube, createTetrahedron, createOctahedron, createIcosahedron];
        const colors = ["rgba(167, 139, 250, 0.3)", "rgba(244, 63, 94, 0.3)", "rgba(52, 211, 153, 0.3)", "rgba(251, 191, 36, 0.3)"];
        
        for(let i=0; i<12; i++) {
            const createFunc = solidCreators[i % solidCreators.length];
            shapes.push({
                ...createFunc(),
                position: {
                    x: (Math.random() - 0.5) * w * 1.2,
                    y: (Math.random() - 0.5) * h * 1.2,
                    z: (Math.random() - 0.5) * 800 - 200
                },
                rotation: {x: Math.random(), y: Math.random(), z: Math.random()},
                rotSpeed: {
                    x: (Math.random() - 0.5) * 0.01,
                    y: (Math.random() - 0.5) * 0.01,
                    z: (Math.random() - 0.5) * 0.01
                },
                scale: 40 + Math.random() * 60,
                color: colors[i % colors.length],
                lineWidth: 1
            });
        }

        // 3. Floating 2D Polygons
        for(let i=0; i<20; i++) {
            const sides = 3 + Math.floor(Math.random() * 5); // Triangles to Heptagons
            const vertices = [];
            const edges = [];
            for(let j=0; j<sides; j++) {
                const theta = (j / sides) * Math.PI * 2;
                vertices.push({x: Math.cos(theta), y: Math.sin(theta), z: 0});
                edges.push({a: j, b: (j+1)%sides});
            }
            shapes.push({
                vertices, edges,
                position: {
                    x: (Math.random() - 0.5) * w,
                    y: (Math.random() - 0.5) * h,
                    z: (Math.random() - 0.5) * 1000
                },
                rotation: {x: Math.random(), y: Math.random(), z: Math.random()},
                rotSpeed: {
                    x: (Math.random() - 0.5) * 0.02,
                    y: (Math.random() - 0.5) * 0.02,
                    z: (Math.random() - 0.5) * 0.02
                },
                scale: 20 + Math.random() * 30,
                color: "rgba(255, 255, 255, 0.1)",
                lineWidth: 1
            });
        }
    };

    initScene();

    // --- RENDER LOOP ---
    const render = () => {
      ctx.fillStyle = "#02040a"; 
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const fov = 800;

      shapes.forEach(shape => {
          // Update Rotation
          shape.rotation.x += shape.rotSpeed.x;
          shape.rotation.y += shape.rotSpeed.y;
          shape.rotation.z += shape.rotSpeed.z;
          
          const cosX = Math.cos(shape.rotation.x), sinX = Math.sin(shape.rotation.x);
          const cosY = Math.cos(shape.rotation.y), sinY = Math.sin(shape.rotation.y);
          const cosZ = Math.cos(shape.rotation.z), sinZ = Math.sin(shape.rotation.z);

          // Transform & Project Vertices
          const projected = shape.vertices.map(v => {
              // Rotate
              let y1 = v.y * cosX - v.z * sinX; let z1 = v.y * sinX + v.z * cosX; let x1 = v.x;
              let x2 = x1 * cosY - z1 * sinY; let z2 = x1 * sinY + z1 * cosY; let y2 = y1;
              let x3 = x2 * cosZ - y2 * sinZ; let y3 = x2 * sinZ + y2 * cosZ; let z3 = z2;

              // Scale & Translate
              const wx = x3 * shape.scale + shape.position.x;
              const wy = y3 * shape.scale + shape.position.y;
              const wz = z3 * shape.scale + shape.position.z;

              // Project
              const dist = fov + wz;
              if (dist <= 0) return null; // Clip
              const persp = fov / dist;

              return { x: cx + wx * persp, y: cy + wy * persp, z: dist };
          });

          // Draw Edges
          ctx.strokeStyle = shape.color;
          ctx.lineWidth = shape.lineWidth;
          ctx.beginPath();
          shape.edges.forEach(e => {
              const p1 = projected[e.a];
              const p2 = projected[e.b];
              if (p1 && p2) {
                  ctx.moveTo(p1.x, p1.y);
                  ctx.lineTo(p2.x, p2.y);
              }
          });
          ctx.stroke();

          // Draw Vertices (for main shapes)
          if (shape.scale > 100) {
              ctx.fillStyle = "#fff";
              projected.forEach(p => {
                  if (p) {
                      const size = Math.max(1, 400 / p.z);
                      ctx.beginPath(); ctx.arc(p.x, p.y, size, 0, Math.PI*2); ctx.fill();
                  }
              });
          }
      });

      requestAnimationFrame(render);
    };

    const animId = requestAnimationFrame(render);
    const handleResize = () => { 
        w = canvas.width = window.innerWidth; 
        h = canvas.height = window.innerHeight; 
        initScene();
    };
    window.addEventListener("resize", handleResize);
    return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-100 pointer-events-none" />;
}