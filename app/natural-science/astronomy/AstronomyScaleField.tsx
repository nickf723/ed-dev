"use client";

import { useWorldDirector } from "@/app/_page-system/scene/WorldDirector";

const WEB_NODES = [
  [110, 94],
  [242, 154],
  [382, 78],
  [524, 166],
  [672, 92],
  [814, 176],
  [958, 88],
  [1092, 156],
  [1234, 74],
  [1352, 170],
  [188, 328],
  [338, 252],
  [492, 350],
  [650, 270],
  [798, 344],
  [946, 258],
  [1114, 342],
  [1282, 268],
] as const;

export default function AstronomyScaleField() {
  const director = useWorldDirector();
  const scene = director.previewScene ?? director.scene ?? "local";

  return (
    <div
      className="pointer-events-none absolute inset-x-2 top-2 h-[548px] overflow-hidden rounded-[28px]"
      aria-hidden="true"
    >
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          scene === "local" ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute left-[10%] top-[46%] h-28 w-28 rounded-full bg-cyan-200/10 shadow-[0_0_90px_rgba(34,211,238,0.18)]" />
        {[140, 230, 330, 440].map((size, index) => (
          <div
            key={size}
            className="absolute left-[18%] top-1/2 rounded-[50%] border border-cyan-100/15"
            style={{
              width: `${size}px`,
              height: `${Math.round(size * 0.38)}px`,
              transform: "translate(-50%, -50%) rotate(-10deg)",
            }}
          >
            <span
              className="absolute top-1/2 block rounded-full bg-cyan-100 shadow-[0_0_18px_rgba(165,243,252,0.78)]"
              style={{
                height: `${5 + index}px`,
                width: `${5 + index}px`,
                left: `${58 + index * 8}%`,
              }}
            />
          </div>
        ))}
        <div className="absolute inset-y-[12%] left-[38%] w-px bg-gradient-to-b from-transparent via-cyan-100/25 to-transparent" />
        <div className="text-cyan-100/34 absolute left-[40%] top-[16%] font-mono text-[11px] uppercase tracking-[0.14em]">
          orbit · period · atmosphere · star
        </div>
      </div>

      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          scene === "galaxy" ? "opacity-100" : "opacity-0"
        }`}
      >
        <svg viewBox="0 0 1440 548" className="h-full w-full">
          <defs>
            <radialGradient id="astronomy-galaxy-core">
              <stop offset="0" stopColor="rgba(254,249,195,0.78)" />
              <stop offset="0.18" stopColor="rgba(196,181,253,0.30)" />
              <stop offset="1" stopColor="rgba(139,92,246,0)" />
            </radialGradient>
          </defs>
          <ellipse
            cx="690"
            cy="275"
            rx="180"
            ry="108"
            fill="url(#astronomy-galaxy-core)"
          />
          <g fill="none" strokeLinecap="round" transform="rotate(-8 690 275)">
            <path
              d="M690 275 C770 206 928 216 1014 286 C900 246 792 292 742 350 C656 444 442 390 364 292 C466 346 608 334 690 275"
              stroke="rgba(196,181,253,0.34)"
              strokeWidth="8"
            />
            <path
              d="M690 275 C624 226 506 210 410 260 C500 248 596 292 646 344 C720 414 914 378 1022 302 C918 338 780 336 690 275"
              stroke="rgba(125,211,252,0.24)"
              strokeWidth="5"
            />
            <ellipse
              cx="690"
              cy="275"
              rx="394"
              ry="156"
              stroke="rgba(255,255,255,0.09)"
              strokeDasharray="3 11"
            />
          </g>
        </svg>
        <div className="text-violet-100/34 absolute left-[9%] top-[14%] font-mono text-[11px] uppercase tracking-[0.14em]">
          disk · bulge · halo · rotation · dust
        </div>
      </div>

      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          scene === "web" ? "opacity-100" : "opacity-0"
        }`}
      >
        <svg viewBox="0 0 1440 548" className="h-full w-full">
          <g fill="none" stroke="rgba(244,114,182,0.20)" strokeWidth="1.5">
            <path d="M110 94 L242 154 L382 78 L524 166 L672 92 L814 176 L958 88 L1092 156 L1234 74 L1352 170" />
            <path d="M188 328 L338 252 L492 350 L650 270 L798 344 L946 258 L1114 342 L1282 268" />
            <path d="M242 154 L338 252 M382 78 L492 350 M524 166 L650 270 M672 92 L798 344 M814 176 L946 258 M958 88 L1114 342 M1092 156 L1282 268" />
          </g>
          <g fill="rgba(216,180,254,0.52)">
            {WEB_NODES.map(([x, y], index) => (
              <circle
                key={`${x}-${y}`}
                cx={x}
                cy={y}
                r={index % 3 === 0 ? 7 : 4}
              />
            ))}
          </g>
        </svg>
        <div className="text-fuchsia-100/34 absolute right-[8%] top-[14%] font-mono text-[11px] uppercase tracking-[0.14em]">
          clusters · filaments · voids · expansion
        </div>
      </div>
    </div>
  );
}
