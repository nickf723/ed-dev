"use client";
import React, { useEffect, useRef } from "react";

export function AstronomyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // CONFIG
    const starCount = 400;
    const speed = 0.2; // Warp factor
    let stars: any[] = [];

    // RESIZE
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Center origin
      ctx.translate(canvas.width / 2, canvas.height / 2);
      initStars();
    };
    
    // STAR FACTORY
    function initStars() {
      stars = [];
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: (Math.random() - 0.5) * canvas!.width * 2,
          y: (Math.random() - 0.5) * canvas!.height * 2,
          z: Math.random() * canvas!.width // Depth
        });
      }
    }

    // ANIMATION LOOP
    const animate = () => {
      // Clear with transparency for trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
      ctx.fillRect(-canvas.width, -canvas.height, canvas.width * 2, canvas.height * 2);

      ctx.fillStyle = "white";
      
      stars.forEach((star) => {
        // Move star closer
        star.z -= speed * 10;

        // Reset if it passes camera
        if (star.z <= 0) {
          star.x = (Math.random() - 0.5) * canvas.width * 2;
          star.y = (Math.random() - 0.5) * canvas.height * 2;
          star.z = canvas.width;
        }

        // Project 3D to 2D
        const k = 128.0 / star.z;
        const px = star.x * k;
        const py = star.y * k;

        // Scale size by proximity
        const size = (1 - star.z / canvas.width) * 3;
        const opacity = (1 - star.z / canvas.width);

        if (px >= -canvas.width/2 && px <= canvas.width/2 && py >= -canvas.height/2 && py <= canvas.height/2) {
            ctx.beginPath();
            ctx.globalAlpha = opacity;
            ctx.arc(px, py, size, 0, Math.PI * 2);
            ctx.fill();
        }
      });
      ctx.globalAlpha = 1.0;

      requestRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    // Initial setup needs to handle the translate carefully
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    initStars();
    
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-50 bg-black">
      <canvas ref={canvasRef} className="absolute inset-0" />
      {/* Nebular Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent mix-blend-screen" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent mix-blend-screen" />
    </div>
  );
}