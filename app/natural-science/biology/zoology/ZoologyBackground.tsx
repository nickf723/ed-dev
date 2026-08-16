"use client";

import type { CSSProperties } from "react";
import type { ZoologyEnvironment } from "./zoology-data";

type Props = {
  accentRgb: string;
  environment: ZoologyEnvironment;
};

const PARTICLES = Array.from({ length: 22 }, (_, index) => ({
  left: `${(index * 37) % 101}%`,
  top: `${(index * 61) % 97}%`,
  size: 2 + (index % 4),
  delay: `${-(index % 9) * 1.7}s`,
  duration: `${15 + (index % 7) * 3}s`,
}));

export default function ZoologyBackground({ accentRgb, environment }: Props) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0 transition-[background] duration-700"
        style={{
          background: `
            radial-gradient(circle at 16% 16%, rgba(${accentRgb},0.20), transparent 31%),
            radial-gradient(circle at 84% 18%, rgba(45,212,191,0.10), transparent 34%),
            radial-gradient(circle at 52% 92%, rgba(132,204,22,0.08), transparent 32%),
            linear-gradient(180deg,#06100b 0%,#050b08 44%,#020504 100%)
          `,
        }}
      />

      <div
        className="absolute inset-0 opacity-55"
        style={{
          backgroundImage:
            "linear-gradient(rgba(110,231,183,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(110,231,183,0.035) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(circle at 50% 38%, black, transparent 82%)",
        }}
      />

      <svg
        viewBox="0 0 1400 900"
        className="absolute inset-0 h-full w-full opacity-55"
        preserveAspectRatio="none"
      >
        <g fill="none" strokeLinecap="round">
          <path d="M-80 730 C150 630 215 590 330 470 C430 365 540 410 620 292" stroke={`rgba(${accentRgb},0.12)`} strokeWidth="2" />
          <path d="M330 470 C430 500 510 566 650 610" stroke="rgba(52,211,153,0.08)" strokeWidth="1.5" />
          <path d="M620 292 C735 250 790 130 940 100" stroke="rgba(45,212,191,0.09)" strokeWidth="1.5" />
          <path d="M620 292 C735 342 810 450 970 435" stroke={`rgba(${accentRgb},0.085)`} strokeWidth="1.5" />
          <path d="M970 435 C1090 365 1180 320 1460 340" stroke="rgba(132,204,22,0.07)" strokeWidth="1.4" />
          <path d="M650 610 C825 655 975 730 1210 690" stroke="rgba(52,211,153,0.07)" strokeWidth="1.4" />
          {["330,470", "620,292", "650,610", "970,435", "940,100", "1210,690"].map((point) => {
            const [cx, cy] = point.split(",").map(Number);
            return <circle key={point} cx={cx} cy={cy} r="5" fill={`rgba(${accentRgb},0.18)`} stroke={`rgba(${accentRgb},0.3)`} />;
          })}
        </g>
      </svg>

      <EnvironmentMotif environment={environment} accentRgb={accentRgb} />

      {PARTICLES.map((particle, index) => (
        <span
          key={index}
          className="absolute rounded-full animate-[zoology-drift_var(--duration)_ease-in-out_infinite]"
          style={
            {
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              animationDelay: particle.delay,
              "--duration": particle.duration,
              background: `rgba(${accentRgb},${0.12 + (index % 4) * 0.035})`,
              boxShadow: `0 0 ${8 + particle.size * 2}px rgba(${accentRgb},0.12)`,
            } as CSSProperties
          }
        />
      ))}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,transparent_46%,rgba(0,0,0,0.44)_100%)]" />
      <style jsx>{`
        @keyframes zoology-drift {
          0%, 100% { transform: translate3d(0, 0, 0); opacity: .35; }
          50% { transform: translate3d(18px, -26px, 0); opacity: .9; }
        }
      `}</style>
    </div>
  );
}

function EnvironmentMotif({
  environment,
  accentRgb,
}: {
  environment: ZoologyEnvironment;
  accentRgb: string;
}) {
  if (environment === "marine" || environment === "reef") {
    return (
      <div className="absolute inset-x-0 bottom-0 h-[42%] opacity-50">
        {[0, 1, 2, 3].map((line) => (
          <svg key={line} viewBox="0 0 1400 220" className="absolute inset-0 h-full-w-full" preserveAspectRatio="none" style={{ transform: `translateY(${line * 28}px)`, opacity: 0.32 - line * 0.045 }}>
            <path d="M-40 80 C140 10 260 150 440 80 S760 10 940 80 S1240 150 1450 62" fill="none" stroke={`rgba(${accentRgb},0.42)`} strokeWidth="2" />
          </svg>
        ))}
      </div>
    );
  }

  if (environment === "canopy" || environment === "forest") {
    return (
      <div className="absolute -right-[8%] top-[7%] h-[64vh] w-[42vw] min-w-[420px] opacity-30 blur-[1px]">
        {[0, 1, 2, 3, 4].map((leaf) => (
          <span
            key={leaf}
            className="absolute rounded-[80%_10%_80%_10%] border"
            style={{
              width: `${150 + leaf * 34}px`,
              height: `${78 + leaf * 17}px`,
              right: `${leaf * 11}%`,
              top: `${leaf * 14}%`,
              transform: `rotate(${18 + leaf * 19}deg)`,
              borderColor: `rgba(${accentRgb},0.20)`,
              background: `linear-gradient(135deg,rgba(${accentRgb},0.06),transparent)`,
            }}
          />
        ))}
      </div>
    );
  }

  if (environment === "open" || environment === "arid" || environment === "wetland") {
    return (
      <div className="absolute inset-x-0 bottom-0 h-[27%] opacity-45">
        {Array.from({ length: 48 }, (_, index) => (
          <span
            key={index}
            className="absolute bottom-0 w-px origin-bottom rounded-full"
            style={{
              left: `${(index / 47) * 100}%`,
              height: `${34 + (index % 9) * 8}%`,
              transform: `rotate(${(index % 7) - 3}deg)`,
              background: `linear-gradient(to top,rgba(${accentRgb},0.35),transparent)`,
            }}
          />
        ))}
      </div>
    );
  }

  if (environment === "alpine" || environment === "polar") {
    return (
      <svg viewBox="0 0 1400 380" className="absolute inset-x-0 bottom-0 h-[42%] w-full opacity-45" preserveAspectRatio="none">
        <path d="M-80 380 L170 172 L330 292 L560 82 L760 278 L980 132 L1190 292 L1460 106 L1460 380 Z" fill={`rgba(${accentRgb},0.055)`} stroke={`rgba(${accentRgb},0.16)`} strokeWidth="2" />
        <path d="M170 172 L250 230 L330 292 M560 82 L650 188 L760 278 M980 132 L1080 215 L1190 292" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.4" />
      </svg>
    );
  }

  return (
    <div className="absolute right-[5%] top-[18%] h-[430px] w-[430px] rounded-full border border-emerald-200/[0.06] opacity-45">
      {[0, 1, 2, 3].map((ring) => (
        <span key={ring} className="absolute rounded-full border" style={{ inset: `${ring * 46}px`, borderColor: `rgba(${accentRgb},${0.12 - ring * 0.018})` }} />
      ))}
      {Array.from({ length: 8 }, (_, index) => (
        <span key={index} className="absolute h-2.5 w-2.5 rounded-full" style={{ left: `${50 + Math.cos((index / 8) * Math.PI * 2) * 42}%`, top: `${50 + Math.sin((index / 8) * Math.PI * 2) * 42}%`, background: `rgba(${accentRgb},0.30)`, boxShadow: `0 0 18px rgba(${accentRgb},0.18)` }} />
      ))}
    </div>
  );
}
