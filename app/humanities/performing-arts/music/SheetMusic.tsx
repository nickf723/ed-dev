"use client";
import React, { useEffect, useRef } from 'react';

// Expanded Mapping (C3 to C6)
const POSITIONS: Record<string, number> = {
  "C3": -7, "D3": -6, "E3": -5, "F3": -4, "G3": -3, "A3": -2, "B3": -1,
  "C4": 0,  "D4": 1,  "E4": 2,  "F4": 3,  "G4": 4,  "A4": 5,  "B4": 6,
  "C5": 7,  "D5": 8,  "E5": 9,  "F5": 10, "G5": 11, "A5": 12, "B5": 13,
  "C6": 14
};

export default function SheetMusic({ targetNote, isCorrect }: { targetNote: string, isCorrect: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const width = 200;
    const height = 180; // Taller for low/high notes
    const centerX = width / 2;
    const centerStaffY = 90; // Move staff down a bit

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = isCorrect ? "#dcfce7" : "#fff"; 
    ctx.fillRect(0,0, width, height);
    
    // Draw Staff (E4 bottom line -> F5 top line)
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 1;
    // Lines at relative steps: 2, 4, 6, 8, 10
    // Y positions relative to C4 (step 0). 
    // If C4 is at Y=Center, step N is at Y = Center - (N * 5)
    
    // We want E4 (step 2) to be bottom line.
    // Let's define C4 Y-pos as 110.
    const C4_Y = 110;
    
    // Draw lines for E4(2), G4(4), B4(6), D5(8), F5(10)
    [2, 4, 6, 8, 10].forEach(step => {
        const y = C4_Y - (step * 5); // 5px per step (10px per line gap)
        ctx.beginPath();
        ctx.moveTo(20, y); ctx.lineTo(180, y);
        ctx.stroke();
    });

    // Draw Treble Clef
    ctx.font = "40px serif";
    ctx.fillStyle = "#000";
    ctx.fillText("𝄞", 20, 100);

    const cleanNote = targetNote.replace("#", "");
    const isSharp = targetNote.includes("#");

    if (POSITIONS[cleanNote] !== undefined) {
        const step = POSITIONS[cleanNote]; 
        const noteY = C4_Y - (step * 5);
        
        // Note Head
        ctx.beginPath();
        ctx.ellipse(centerX, noteY, 6, 5, 0, 0, Math.PI*2);
        ctx.fillStyle = isCorrect ? "#22c55e" : "#000";
        ctx.fill();
        
        // Stem
        ctx.beginPath();
        const stemDir = step >= 6 ? 1 : -1; 
        ctx.moveTo(centerX + (stemDir===1 ? -5 : 5), noteY); 
        ctx.lineTo(centerX + (stemDir===1 ? -5 : 5), noteY + (30 * stemDir));
        ctx.strokeStyle = isCorrect ? "#22c55e" : "#000";
        ctx.stroke();

        // Ledger Lines
        // C4 (0) needs line. A3 (-2) needs line. C3 (-7) needs many.
        // A5 (12) needs line.
        if (step <= 0 || step >= 12) {
            // Calculate which even steps need lines
            // e.g. step 0 (C4), step -2 (A3), step -4 (F3)...
            // or step 12 (A5), step 14 (C6)...
            
            // Middle C (0)
            if (step === 0) drawLedger(ctx, centerX, C4_Y);
            
            // Below Staff
            for(let s = 0; s >= step; s -= 2) {
                if (s <= 0) drawLedger(ctx, centerX, C4_Y - (s * 5));
            }
            // Above Staff (Top line is step 10)
            for(let s = 12; s <= step; s += 2) {
                 drawLedger(ctx, centerX, C4_Y - (s * 5));
            }
        }

        // Sharp
        if (isSharp) {
            ctx.font = "16px serif";
            ctx.fillText("♯", centerX - 20, noteY + 5);
        }
    }

  }, [targetNote, isCorrect]);

  const drawLedger = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
      ctx.beginPath();
      ctx.moveTo(x - 12, y); ctx.lineTo(x + 12, y);
      ctx.strokeStyle = "#000";
      ctx.stroke();
  }

  return <canvas ref={canvasRef} width={200} height={180} className="rounded border border-neutral-300 shadow-inner" />;
}