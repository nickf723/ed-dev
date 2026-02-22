"use client";
import { useState, useEffect, useRef } from "react";
import { RefreshCw, Globe, Sun } from "lucide-react";

export default function CosmosWidget() {
  const [model, setModel] = useState<"geo" | "helio">("geo");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let time = 0;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        time += 0.02;

        if (model === "geo") {
            // GEOCENTRIC (Ptolemaic)
            // Center: Earth
            ctx.beginPath();
            ctx.arc(cx, cy, 15, 0, Math.PI*2);
            ctx.fillStyle = "#3b82f6"; // Blue Earth
            ctx.fill();
            ctx.fillStyle = "white"; ctx.font="10px monospace"; ctx.fillText("EARTH", cx-15, cy+25);

            // Orbit: Sun around Earth
            const sunDist = 80;
            const sunX = cx + Math.cos(time) * sunDist;
            const sunY = cy + Math.sin(time) * sunDist;
            
            ctx.strokeStyle = "rgba(255,255,255,0.1)";
            ctx.beginPath(); ctx.arc(cx, cy, sunDist, 0, Math.PI*2); ctx.stroke();

            ctx.beginPath();
            ctx.arc(sunX, sunY, 10, 0, Math.PI*2);
            ctx.fillStyle = "#fbbf24"; // Yellow Sun
            ctx.fill();

            // Planet (Mars) doing epicycles?
            // Simplified: Mars orbits Earth further out
            const marsDist = 130;
            const marsX = cx + Math.cos(time * 0.5) * marsDist;
            const marsY = cy + Math.sin(time * 0.5) * marsDist;
            
            ctx.beginPath(); ctx.arc(cx, cy, marsDist, 0, Math.PI*2); ctx.stroke();
            ctx.beginPath(); ctx.arc(marsX, marsY, 6, 0, Math.PI*2); ctx.fillStyle = "#ef4444"; ctx.fill();

        } else {
            // HELIOCENTRIC (Copernican)
            // Center: Sun
            ctx.beginPath();
            ctx.arc(cx, cy, 20, 0, Math.PI*2);
            ctx.fillStyle = "#fbbf24"; // Yellow Sun
            ctx.fill();
            ctx.fillStyle = "white"; ctx.font="10px monospace"; ctx.fillText("SUN", cx-10, cy+30);

            // Orbit: Earth around Sun
            const earthDist = 80;
            const earthX = cx + Math.cos(time) * earthDist;
            const earthY = cy + Math.sin(time) * earthDist;

            ctx.strokeStyle = "rgba(255,255,255,0.1)";
            ctx.beginPath(); ctx.arc(cx, cy, earthDist, 0, Math.PI*2); ctx.stroke();

            ctx.beginPath();
            ctx.arc(earthX, earthY, 10, 0, Math.PI*2);
            ctx.fillStyle = "#3b82f6"; // Blue Earth
            ctx.fill();

            // Orbit: Mars around Sun
            const marsDist = 130;
            const marsX = cx + Math.cos(time * 0.53) * marsDist; // slower
            const marsY = cy + Math.sin(time * 0.53) * marsDist;

            ctx.beginPath(); ctx.arc(cx, cy, marsDist, 0, Math.PI*2); ctx.stroke();
            ctx.beginPath(); ctx.arc(marsX, marsY, 6, 0, Math.PI*2); ctx.fillStyle = "#ef4444"; ctx.fill();
        }

        requestAnimationFrame(animate);
    };
    const id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, [model]);

  return (
    <div className="bg-[#1e1b4b]/80 border border-indigo-500/30 rounded-xl p-6 backdrop-blur-md shadow-2xl">
        <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-indigo-200 flex items-center gap-2">
                <RefreshCw size={18} className="text-amber-400" /> Systema Mundi
            </h3>
            <div className="flex gap-2 bg-black/40 p-1 rounded-lg">
                <button 
                    onClick={() => setModel("geo")}
                    className={`p-2 rounded ${model === "geo" ? "bg-indigo-600 text-white" : "text-indigo-400 hover:text-white"}`}
                    title="Geocentric (Ptolemy)"
                >
                    <Globe size={16} />
                </button>
                <button 
                    onClick={() => setModel("helio")}
                    className={`p-2 rounded ${model === "helio" ? "bg-amber-600 text-white" : "text-indigo-400 hover:text-white"}`}
                    title="Heliocentric (Copernicus)"
                >
                    <Sun size={16} />
                </button>
            </div>
        </div>

        <canvas ref={canvasRef} width={300} height={300} className="w-full bg-black/20 rounded-full border border-white/5" />

        <div className="mt-4 text-center">
            <div className="text-lg font-bold text-white font-serif">
                {model === "geo" ? "Geocentric Model" : "Heliocentric Model"}
            </div>
            <div className="text-xs text-indigo-300">
                {model === "geo" ? "AD 150 (Ptolemy)" : "AD 1543 (Copernicus)"}
            </div>
        </div>
    </div>
  );
}