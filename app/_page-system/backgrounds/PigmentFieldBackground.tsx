"use client";

const BLOBS = [
  { x: 8, y: 10, w: 42, h: 30, rgb: "244,63,94", rotate: -12, delay: -4 },
  { x: 60, y: 8, w: 38, h: 34, rgb: "59,130,246", rotate: 18, delay: -11 },
  { x: 16, y: 52, w: 34, h: 40, rgb: "250,204,21", rotate: 8, delay: -18 },
  { x: 58, y: 48, w: 44, h: 36, rgb: "139,92,246", rotate: -16, delay: -8 },
  { x: 35, y: 28, w: 32, h: 28, rgb: "20,184,166", rotate: 24, delay: -14 },
] as const;

export default function PigmentFieldBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(244,63,94,0.16),transparent_28%),radial-gradient(circle_at_84%_18%,rgba(59,130,246,0.15),transparent_31%),radial-gradient(circle_at_50%_86%,rgba(250,204,21,0.07),transparent_34%),linear-gradient(180deg,#0b0706_0%,#08070b_48%,#030303_100%)]" />

      {BLOBS.map((blob, index) => (
        <div
          key={index}
          className="absolute rounded-[45%_55%_58%_42%/40%_47%_53%_60%] blur-[72px] mix-blend-screen"
          style={{
            left: `${blob.x}%`,
            top: `${blob.y}%`,
            width: `${blob.w}vw`,
            height: `${blob.h}vw`,
            minWidth: 300,
            minHeight: 250,
            maxWidth: 760,
            maxHeight: 620,
            background: `rgba(${blob.rgb},0.07)`,
            transform: `rotate(${blob.rotate}deg)`,
            animation: `pigment-drift ${28 + index * 7}s ease-in-out infinite`,
            animationDelay: `${blob.delay}s`,
          }}
        />
      ))}

      <svg viewBox="0 0 1400 900" className="absolute inset-0 h-full w-full opacity-70" preserveAspectRatio="none">
        <path d="M-80 210 C150 95 270 340 510 215 S880 80 1120 250 S1430 370 1540 220" fill="none" stroke="rgba(244,114,182,0.11)" strokeWidth="3" />
        <path d="M-100 540 C150 390 360 650 610 510 S1010 360 1500 565" fill="none" stroke="rgba(96,165,250,0.09)" strokeWidth="24" strokeLinecap="round" opacity="0.5" />
        <path d="M40 700 C240 610 370 760 570 680 S870 560 1110 690 S1370 760 1480 650" fill="none" stroke="rgba(250,204,21,0.065)" strokeWidth="8" strokeLinecap="round" />
        {Array.from({ length: 28 }, (_, index) => (
          <circle key={index} cx={(index * 173) % 1400} cy={(index * 257) % 900} r={1.5 + index % 4} fill={`rgba(${index % 4 === 0 ? "244,63,94" : index % 4 === 1 ? "59,130,246" : index % 4 === 2 ? "250,204,21" : "20,184,166"},0.13)`} />
        ))}
      </svg>

      <div className="absolute inset-0 opacity-28" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.028) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.022) 1px,transparent 1px)", backgroundSize: "72px 72px", maskImage: "radial-gradient(circle at center,black,transparent 82%)" }} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_48%,rgba(0,0,0,0.50)_100%)]" />

      <style jsx>{`
        @keyframes pigment-drift {
          0%,100% { translate:-2% -1%; scale:.96; opacity:.62; }
          50% { translate:3% 2%; scale:1.08; opacity:1; }
        }
        @media (prefers-reduced-motion: reduce) {
          div[style*="pigment-drift"] { animation:none !important; }
        }
      `}</style>
    </div>
  );
}
