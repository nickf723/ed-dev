"use client";

import type { CSSProperties } from "react";

export type ExhibitEnvironment =
  | "canopy"
  | "forest"
  | "open"
  | "arid"
  | "wetland"
  | "marine"
  | "reef"
  | "alpine"
  | "polar"
  | "taxonomy"
  | "network";

const TRACKS = Array.from({ length: 12 }, (_, index) => ({
  left: 8 + ((index * 13) % 82),
  top: 54 + ((index * 9) % 34),
  rotate: -28 + (index % 5) * 13,
  delay: -(index % 6) * 1.8,
}));

export default function LivingExhibitBackground({
  accentRgb,
  environment,
}: {
  accentRgb: string;
  environment: ExhibitEnvironment;
}) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0 transition-[background] duration-700"
        style={{
          background: `
            radial-gradient(circle at 14% 10%, rgba(${accentRgb},0.29), transparent 29%),
            radial-gradient(circle at 83% 14%, rgba(45,212,191,0.15), transparent 33%),
            linear-gradient(180deg,#10271a 0%,#0b1c13 38%,#061009 72%,#020604 100%)
          `,
        }}
      />

      <div className="absolute inset-x-0 top-0 h-[42%] bg-[linear-gradient(180deg,rgba(159,224,177,0.08),transparent)]" />
      <SunShafts accentRgb={accentRgb} />
      <HabitatScenery environment={environment} accentRgb={accentRgb} />
      <ParkTrail accentRgb={accentRgb} />

      {TRACKS.map((track, index) => (
        <span
          key={index}
          className="absolute h-3 w-2 rounded-[70%_70%_48%_48%] border animate-[exhibit-track_13s_ease-in-out_infinite]"
          style={
            {
              left: `${track.left}%`,
              top: `${track.top}%`,
              transform: `rotate(${track.rotate}deg)`,
              animationDelay: `${track.delay}s`,
              borderColor: `rgba(${accentRgb},0.16)`,
              background: `rgba(${accentRgb},0.035)`,
            } as CSSProperties
          }
        />
      ))}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,transparent_38%,rgba(0,0,0,0.52)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-[18%] bg-gradient-to-t from-[#010302] to-transparent" />
      <style jsx>{`
        @keyframes exhibit-track {
          0%, 100% { opacity: .18; }
          50% { opacity: .62; }
        }
        @keyframes exhibit-sway {
          0%, 100% { transform: rotate(-1.4deg) translateY(0); }
          50% { transform: rotate(1.4deg) translateY(-5px); }
        }
        @keyframes exhibit-water {
          to { transform: translateX(90px); }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

function SunShafts({ accentRgb }: { accentRgb: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-60">
      {[0, 1, 2, 3].map((shaft) => (
        <span
          key={shaft}
          className="absolute -top-[12%] h-[80%] w-[12%] origin-top -rotate-[13deg] blur-[2px]"
          style={{
            left: `${10 + shaft * 24}%`,
            background: `linear-gradient(180deg,rgba(${accentRgb},${0.09 - shaft * 0.012}),transparent)`,
            clipPath: "polygon(42% 0,58% 0,100% 100%,0 100%)",
          }}
        />
      ))}
    </div>
  );
}

function ParkTrail({ accentRgb }: { accentRgb: string }) {
  return (
    <svg viewBox="0 0 1400 900" preserveAspectRatio="none" className="absolute inset-0 h-full w-full opacity-70">
      <path d="M-100 850 C230 710 290 820 530 690 C770 560 675 430 890 360 C1090 295 1190 414 1500 230" fill="none" stroke="rgba(226,204,151,0.075)" strokeWidth="92" strokeLinecap="round" />
      <path d="M-100 850 C230 710 290 820 530 690 C770 560 675 430 890 360 C1090 295 1190 414 1500 230" fill="none" stroke="rgba(91,75,44,0.20)" strokeWidth="62" strokeLinecap="round" />
      <path d="M-100 850 C230 710 290 820 530 690 C770 560 675 430 890 360 C1090 295 1190 414 1500 230" fill="none" stroke={`rgba(${accentRgb},0.10)`} strokeWidth="1.5" strokeDasharray="8 18" strokeLinecap="round" />
      <g stroke="rgba(228,211,170,0.12)" fill="rgba(20,33,22,0.68)">
        <path d="M1120 248 V128 M1082 146 H1192 L1166 112 H1108 Z" strokeWidth="5" />
        <path d="M286 712 V616 M248 630 H358 L332 596 H274 Z" strokeWidth="5" />
      </g>
    </svg>
  );
}

function HabitatScenery({
  environment,
  accentRgb,
}: {
  environment: ExhibitEnvironment;
  accentRgb: string;
}) {
  if (environment === "marine" || environment === "reef") {
    return (
      <div className="absolute inset-0">
        <div className="absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-cyan-950/[0.28] to-transparent" />
        {[0, 1, 2, 3].map((line) => (
          <svg key={line} viewBox="0 0 1400 240" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-[36%] w-full" style={{ transform: `translateX(${-line * 28}px) translateY(${line * 30}px)`, animation: `exhibit-water ${20 + line * 7}s linear infinite alternate`, opacity: 0.32 - line * 0.05 }}>
            <path d="M-120 100 C80 8 250 176 450 86 S820 20 1010 94 S1270 165 1530 70" fill="none" stroke={`rgba(${accentRgb},0.55)`} strokeWidth="2" />
          </svg>
        ))}
        {environment === "reef" ? (
          <svg viewBox="0 0 1400 360" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-[34%] w-full opacity-35">
            <path d="M70 360 C94 278 60 218 112 162 C140 242 146 300 154 360 M240 360 C244 264 315 242 300 154 C358 226 338 302 326 360 M1080 360 C1064 266 1124 224 1110 128 C1186 222 1150 312 1152 360 M1260 360 C1268 304 1232 260 1280 210 C1324 270 1310 326 1312 360" fill={`rgba(${accentRgb},0.17)`} />
          </svg>
        ) : null}
      </div>
    );
  }

  if (environment === "alpine" || environment === "polar") {
    return (
      <svg viewBox="0 0 1400 520" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-[58%] w-full opacity-70">
        <path d="M-100 520 L140 300 L330 416 L520 170 L720 406 L930 210 L1130 414 L1510 122 L1510 520 Z" fill={`rgba(${accentRgb},0.065)`} stroke={`rgba(${accentRgb},0.20)`} strokeWidth="2" />
        <path d="M140 300 L230 354 L330 416 M520 170 L618 296 L720 406 M930 210 L1025 308 L1130 414" fill="none" stroke="rgba(242,248,255,0.12)" strokeWidth="2" />
      </svg>
    );
  }

  if (environment === "open" || environment === "arid" || environment === "wetland") {
    return (
      <div className="absolute inset-x-0 bottom-0 h-[38%] opacity-65">
        <div className="absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t from-lime-950/[0.22] to-transparent" />
        {Array.from({ length: 72 }, (_, index) => (
          <span
            key={index}
            className="absolute bottom-0 w-px origin-bottom rounded-full animate-[exhibit-sway_9s_ease-in-out_infinite]"
            style={{
              left: `${(index / 71) * 100}%`,
              height: `${42 + (index % 12) * 8}%`,
              animationDelay: `${-(index % 9)}s`,
              background: `linear-gradient(to top,rgba(${accentRgb},0.44),transparent)`,
            }}
          />
        ))}
        {environment === "wetland" ? <div className="absolute inset-x-0 bottom-0 h-[24%] bg-cyan-500/[0.045] blur-[8px]" /> : null}
      </div>
    );
  }

  if (environment === "taxonomy" || environment === "network") {
    return (
      <svg viewBox="0 0 1400 900" className="absolute inset-0 h-full w-full opacity-40">
        <g fill="none" stroke={`rgba(${accentRgb},0.15)`} strokeWidth="2">
          <path d="M700 840 C700 650 565 610 565 480 C565 350 380 330 380 180" />
          <path d="M700 840 C700 650 835 610 835 480 C835 350 1010 330 1010 180" />
          <path d="M565 480 C450 450 310 500 190 410 M565 480 C520 342 560 230 650 120" />
          <path d="M835 480 C950 450 1090 500 1210 410 M835 480 C880 342 840 230 750 120" />
        </g>
        {["700,840", "565,480", "835,480", "380,180", "1010,180", "190,410", "1210,410", "650,120", "750,120"].map((point) => {
          const [cx, cy] = point.split(",").map(Number);
          return <circle key={point} cx={cx} cy={cy} r="6" fill={`rgba(${accentRgb},0.24)`} />;
        })}
      </svg>
    );
  }

  return (
    <div className="absolute inset-0">
      <svg viewBox="0 0 1400 900" preserveAspectRatio="none" className="absolute inset-0 h-full w-full opacity-70">
        <path d="M-80 260 C120 60 250 78 330 264 C420 90 570 40 660 256 C760 74 920 78 1010 272 C1120 94 1280 84 1490 254 L1490 0 L-80 0 Z" fill={`rgba(${accentRgb},0.09)`} />
        <path d="M100 0 C142 180 108 296 54 430 M310 0 C360 178 332 316 270 470 M1080 0 C1018 180 1048 314 1114 478 M1300 0 C1248 178 1272 296 1334 420" fill="none" stroke={`rgba(${accentRgb},0.15)`} strokeWidth="24" />
      </svg>
      {[0, 1, 2, 3, 4, 5].map((leaf) => (
        <span
          key={leaf}
          className="absolute rounded-[80%_10%_80%_10%] border animate-[exhibit-sway_12s_ease-in-out_infinite]"
          style={{
            width: `${140 + leaf * 26}px`,
            height: `${72 + leaf * 13}px`,
            right: `${-2 + leaf * 13}%`,
            top: `${7 + (leaf % 3) * 16}%`,
            animationDelay: `${-leaf * 1.7}s`,
            transform: `rotate(${16 + leaf * 21}deg)`,
            borderColor: `rgba(${accentRgb},0.19)`,
            background: `linear-gradient(135deg,rgba(${accentRgb},0.07),transparent)`,
          }}
        />
      ))}
    </div>
  );
}
