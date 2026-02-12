"use client";
import React, { useEffect, useRef } from 'react';

export default function Oscilloscope({ audioCtx, sourceNode }: { audioCtx: AudioContext | null, sourceNode: AudioNode | null }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const rafId = useRef<number>(0);

  useEffect(() => {
    if (!audioCtx || !sourceNode) return;

    // Create Analyser if not exists
    if (!analyserRef.current) {
        analyserRef.current = audioCtx.createAnalyser();
        analyserRef.current.fftSize = 2048;
        sourceNode.connect(analyserRef.current);
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      if (!analyserRef.current) return;
      
      rafId.current = requestAnimationFrame(draw);
      analyserRef.current.getByteTimeDomainData(dataArray);

      // Clear
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Wave
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#f59e0b'; // Amber
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

    return () => cancelAnimationFrame(rafId.current);
  }, [audioCtx, sourceNode]);

  return (
    <div className="bg-black border border-neutral-800 rounded-lg overflow-hidden h-16 w-32 relative shadow-inner">
        <canvas ref={canvasRef} width={128} height={64} className="w-full h-full" />
        <div className="absolute top-1 left-1 text-[8px] font-mono text-neutral-500 uppercase">Oscilloscope</div>
    </div>
  );
}