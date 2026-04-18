"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Triangle, Move } from 'lucide-react';

type Point = { x: number; y: number };

export default function TriangleLab() {
    const svgRef = useRef<SVGSVGElement>(null);
    const [points, setPoints] = useState<Point[]>([
        { x: 150, y: 50 },  // A
        { x: 50, y: 250 },  // B
        { x: 350, y: 250 }  // C
    ]);
    const [draggingIdx, setDraggingIdx] = useState<number | null>(null);

    // Math engine: Calculate distance between two points
    const dist = (p1: Point, p2: Point) => Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));

    // Math engine: Calculate angle using Law of Cosines
    const getAngle = (p1: Point, p2: Point, p3: Point) => {
        const a = dist(p2, p3);
        const b = dist(p1, p3);
        const c = dist(p1, p2);
        const angleRad = Math.acos((b*b + c*c - a*a) / (2 * b * c));
        return (angleRad * 180) / Math.PI;
    };

    const angles = [
        getAngle(points[0], points[1], points[2]), // Angle A
        getAngle(points[1], points[0], points[2]), // Angle B
        getAngle(points[2], points[0], points[1])  // Angle C
    ];

    const totalAngle = Math.round(angles[0] + angles[1] + angles[2]);

    // Dragging Logic
    const handlePointerMove = (e: React.PointerEvent) => {
        if (draggingIdx === null || !svgRef.current) return;
        const pt = svgRef.current.createSVGPoint();
        pt.x = e.clientX;
        pt.y = e.clientY;
        const svgP = pt.matrixTransform(svgRef.current.getScreenCTM()?.inverse());
        
        setPoints(prev => {
            const newPoints = [...prev];
            // Constrain to SVG bounds roughly
            newPoints[draggingIdx] = { 
                x: Math.max(20, Math.min(380, svgP.x)), 
                y: Math.max(20, Math.min(280, svgP.y)) 
            };
            return newPoints;
        });
    };

    const handlePointerUp = () => setDraggingIdx(null);

    // Prevent scrolling while dragging on touch devices
    useEffect(() => {
        const preventScroll = (e: TouchEvent) => { if (draggingIdx !== null) e.preventDefault(); };
        document.addEventListener('touchmove', preventScroll, { passive: false });
        return () => document.removeEventListener('touchmove', preventScroll);
    }, [draggingIdx]);

    return (
        <div className="w-full bg-zinc-950/80 backdrop-blur-xl border border-emerald-500/20 rounded-2xl overflow-hidden shadow-2xl font-sans select-none">
            <div className="bg-emerald-950/30 border-b border-emerald-500/20 p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/20 border border-emerald-500/30 rounded-lg">
                        <Triangle size={18} className="text-emerald-400" />
                    </div>
                    <div>
                        <h3 className="text-white font-bold tracking-wide">Euclidean Validator</h3>
                        <p className="text-[10px] text-emerald-300/60 font-mono uppercase tracking-widest">Interior Angle Theorem</p>
                    </div>
                </div>
                <div className="text-xl font-black text-emerald-400 bg-black/50 px-4 py-1 rounded-lg border border-emerald-500/30 shadow-inner">
                    Σ = {totalAngle}°
                </div>
            </div>

            <div className="p-0 bg-black/40 relative border-b border-white/5">
                <svg 
                    ref={svgRef}
                    viewBox="0 0 400 300" 
                    className="w-full h-auto cursor-crosshair touch-none"
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerLeave={handlePointerUp}
                >
                    {/* The Triangle Fill */}
                    <polygon 
                        points={`${points[0].x},${points[0].y} ${points[1].x},${points[1].y} ${points[2].x},${points[2].y}`}
                        fill="rgba(16, 185, 129, 0.1)"
                        stroke="rgba(16, 185, 129, 0.5)"
                        strokeWidth="2"
                        strokeLinejoin="round"
                    />

                    {/* Draggable Vertices */}
                    {points.map((pt, i) => (
                        <g 
                            key={i} 
                            transform={`translate(${pt.x}, ${pt.y})`}
                            onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); setDraggingIdx(i); }}
                            className="cursor-grab active:cursor-grabbing"
                        >
                            <circle cx="0" cy="0" r="15" fill="transparent" /> {/* Invisible larger hit area */}
                            <circle cx="0" cy="0" r="6" fill="#06b6d4" className="transition-transform hover:scale-150" />
                            <circle cx="0" cy="0" r="3" fill="#fff" />
                            <text x="12" y="-12" fill="#fff" fontSize="12" fontWeight="bold" fontFamily="monospace">
                                {['A', 'B', 'C'][i]}
                            </text>
                        </g>
                    ))}
                </svg>

                {/* Initial Helper Overlay */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 border border-emerald-500/30 px-4 py-2 rounded-lg flex items-center gap-2 text-emerald-400 text-[10px] font-bold uppercase tracking-widest shadow-xl pointer-events-none">
                    <Move size={14} /> Drag the cyan vertices
                </div>
            </div>

            {/* Diagnostics Panel */}
            <div className="p-6 grid grid-cols-3 gap-4 text-center">
                <div className="bg-zinc-900/50 border border-white/5 rounded-xl p-3">
                    <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">Angle A</div>
                    <div className="text-lg font-black text-white">{angles[0].toFixed(1)}°</div>
                </div>
                <div className="bg-zinc-900/50 border border-white/5 rounded-xl p-3">
                    <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">Angle B</div>
                    <div className="text-lg font-black text-white">{angles[1].toFixed(1)}°</div>
                </div>
                <div className="bg-zinc-900/50 border border-white/5 rounded-xl p-3">
                    <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">Angle C</div>
                    <div className="text-lg font-black text-white">{angles[2].toFixed(1)}°</div>
                </div>
            </div>
        </div>
    );
}