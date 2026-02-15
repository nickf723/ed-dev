"use client";
import React, { useEffect, useRef } from 'react';

interface OscilloscopeProps {
  audioCtx: AudioContext | null;
  sourceNode: AudioNode | null;
}

export default function Oscilloscope({ audioCtx, sourceNode }: OscilloscopeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const rafId = useRef<number>(0);

  useEffect(() => {
    // 1. Safety Checks
    if (!audioCtx || !sourceNode) return;

    // Check if the source actually has outputs to connect from
    if (sourceNode.numberOfOutputs === 0) return;

    // 2. Create Analyser (Singleton pattern for this effect lifecycle)
    if (!analyserRef.current) {
        analyserRef.current = audioCtx.createAnalyser();
        analyserRef.current.fftSize = 2048;
    }
    
    // 3. Connect Graph safely
    try {
        // Connect Master -> Analyser
        sourceNode.connect(analyserRef.current);
    } catch (e) {
        console.warn("Oscilloscope connection failed:", e);
        return;
    }

    // 4. Canvas Setup
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    // 5. Render Loop
    const draw = () => {
      if (!analyserRef.current) return;
      
      rafId.current = requestAnimationFrame(draw);
      analyserRef.current.getByteTimeDomainData(dataArray);

      // Clear Canvas
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Waveform
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#f59e0b'; // Amber-500
      ctx.beginPath();

      const sliceWidth = canvas.width * 1.0 / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = v * canvas.height / 2;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);

        x += sliceWidth;
      }

      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
    };

    draw();

    // 6. Cleanup Function
    return () => {
        cancelAnimationFrame(rafId.current);
        if (analyserRef.current && sourceNode) {
            try {
                sourceNode.disconnect(analyserRef.current);
            } catch (e) {
                // Ignore disconnection errors on unmount
            }
        }
    };
  }, [audioCtx, sourceNode]);

  return (
    <div className="bg-black border border-neutral-800 rounded-lg overflow-hidden h-12 w-32 relative shadow-inner">
        <canvas ref={canvasRef} width={128} height={48} className="w-full h-full" />
        <div className="absolute top-1 left-1 text-[8px] font-mono text-neutral-500 uppercase pointer-events-none">
            Scope
        </div>
    </div>
  );
}