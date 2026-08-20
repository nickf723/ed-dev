import type { RegimeGroup } from "@/lib/page-system/schema";

export function TimelineLens({ accentRgb }: { accentRgb: string }) {
  const labels = ["Deep past", "Ancient", "Post-classical", "Early modern", "Modern"];
  return (
    <div className="relative h-full min-h-[220px] overflow-hidden rounded-[22px] border p-4" style={{ borderColor: `rgba(${accentRgb},0.10)`, background: `rgba(${accentRgb},0.025)` }}>
      <div className="absolute left-[8%] right-[8%] top-1/2 h-px" style={{ background: `linear-gradient(90deg,rgba(${accentRgb},0.20),rgba(${accentRgb},0.72),rgba(${accentRgb},0.26))` }} />
      <div className="relative flex h-full min-h-[188px] items-center justify-between gap-1">
        {labels.map((label, index) => (
          <div key={label} className="flex min-w-0 flex-1 flex-col items-center text-center">
            <div
              className="h-3 w-3 rounded-full border"
              style={{
                borderColor: `rgba(${accentRgb},0.48)`,
                background: `rgb(${accentRgb})`,
                opacity: 0.45 + index * 0.12,
                boxShadow: `0 0 18px rgba(${accentRgb},0.28)`,
              }}
            />
            <div className="mt-5 font-mono text-[8px] uppercase leading-4 tracking-[0.08em]" style={{ color: `rgba(${accentRgb},0.58)` }}>
              {label}
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-4 left-4 right-4 flex justify-between font-mono text-[8px] uppercase tracking-[0.11em] text-slate-600">
        <span>before</span><span>sequence · duration · change</span><span>after</span>
      </div>
    </div>
  );
}

export function MapLens({ accentRgb }: { accentRgb: string }) {
  return (
    <div className="relative h-full min-h-[220px] overflow-hidden rounded-[22px] border p-4" style={{ borderColor: `rgba(${accentRgb},0.10)`, background: `rgba(${accentRgb},0.025)` }}>
      <div
        className="absolute inset-0 opacity-45"
        style={{
          backgroundImage: `linear-gradient(rgba(${accentRgb},0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(${accentRgb},0.05) 1px,transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      />
      <svg viewBox="0 0 480 220" className="relative h-full min-h-[188px] w-full" role="img" aria-label="Connected historical regions">
        <path d="M42 92 C80 50 137 50 167 83 C184 104 159 122 131 119 C109 117 104 142 72 134 C45 127 25 111 42 92Z" fill={`rgba(${accentRgb},0.055)`} stroke={`rgba(${accentRgb},0.30)`} />
        <path d="M208 58 C238 35 278 44 286 70 C292 91 270 97 260 116 C249 138 221 126 216 104 C212 87 191 74 208 58Z" fill={`rgba(${accentRgb},0.045)`} stroke={`rgba(${accentRgb},0.24)`} />
        <path d="M298 72 C337 38 410 54 431 89 C445 113 407 119 389 114 C365 108 358 143 327 135 C300 128 278 94 298 72Z" fill={`rgba(${accentRgb},0.05)`} stroke={`rgba(${accentRgb},0.27)`} />
        <path d="M124 105 Q228 49 332 93 M256 93 Q319 128 409 174 M129 111 Q210 155 335 123" fill="none" stroke={`rgba(${accentRgb},0.34)`} strokeWidth="1.3" strokeDasharray="4 7" />
        {[[124, 105], [256, 93], [332, 93], [409, 174]].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="5" fill={`rgba(${accentRgb},0.78)`} />
        ))}
      </svg>
      <div className="absolute bottom-4 left-4 right-4 text-center font-mono text-[8px] uppercase tracking-[0.11em]" style={{ color: `rgba(${accentRgb},0.52)` }}>
        movement · exchange · local context
      </div>
    </div>
  );
}

export function NetworkLens({ accentRgb }: { accentRgb: string }) {
  const nodes = [[50, 48], [24, 25], [75, 24], [18, 70], [80, 72], [50, 84]];
  return (
    <div className="relative h-full min-h-[220px] overflow-hidden rounded-[22px] border p-4" style={{ borderColor: `rgba(${accentRgb},0.10)`, background: `rgba(${accentRgb},0.025)` }}>
      <svg viewBox="0 0 100 100" className="absolute inset-[8%] h-[76%] w-[84%]" aria-hidden="true">
        {nodes.slice(1).map(([x, y], index) => (
          <line key={index} x1="50" y1="48" x2={x} y2={y} stroke={`rgba(${accentRgb},0.24)`} strokeWidth="0.7" />
        ))}
        <path d="M24 25 L75 24 L80 72 L50 84 L18 70 Z" fill="none" stroke={`rgba(${accentRgb},0.13)`} strokeWidth="0.6" strokeDasharray="2 3" />
      </svg>
      {nodes.map(([left, top], index) => (
        <span
          key={index}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border"
          style={{
            left: `${left}%`,
            top: `${top}%`,
            width: index === 0 ? 18 : 10,
            height: index === 0 ? 18 : 10,
            borderColor: `rgba(${accentRgb},${index === 0 ? 0.55 : 0.30})`,
            background: `rgba(${accentRgb},${index === 0 ? 0.30 : 0.12})`,
            boxShadow: `0 0 ${index === 0 ? 24 : 12}px rgba(${accentRgb},0.16)`,
          }}
        />
      ))}
      <div className="absolute bottom-4 left-4 right-4 text-center font-mono text-[8px] uppercase tracking-[0.11em]" style={{ color: `rgba(${accentRgb},0.52)` }}>
        patterns recur across time and place
      </div>
    </div>
  );
}

export function RegimeArtwork({ visual, accentRgb }: { visual: RegimeGroup["visual"]; accentRgb: string }) {
  return (
    <div className="pointer-events-none absolute inset-0 opacity-60" aria-hidden="true">
      <div
        className="absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            visual === "classical"
              ? `linear-gradient(rgba(${accentRgb},0.045) 1px,transparent 1px),linear-gradient(90deg,rgba(${accentRgb},0.045) 1px,transparent 1px)`
              : `radial-gradient(circle,rgba(${accentRgb},0.13) 0 1px,transparent 1.5px)`,
          backgroundSize: visual === "classical" ? "46px 46px" : "31px 31px",
          maskImage:
            visual === "classical"
              ? "linear-gradient(135deg,black,transparent 72%)"
              : "linear-gradient(225deg,black,transparent 76%)",
        }}
      />
      <svg viewBox="0 0 800 680" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        {visual === "classical" ? (
          <>
            <path d="M50 190 C170 80 305 85 430 205 S650 330 760 180" fill="none" stroke={`rgba(${accentRgb},0.15)`} strokeWidth="2" />
            <path d="M38 500 C120 440 180 560 260 500 S400 440 480 500 S640 560 770 470" fill="none" stroke="rgba(96,165,250,0.16)" strokeWidth="2" />
            <circle cx="590" cy="180" r="74" fill="none" stroke="rgba(34,211,238,0.11)" strokeWidth="1.5" />
          </>
        ) : (
          <>
            <path d="M400 82 L245 360 L555 360 Z" fill={`rgba(${accentRgb},0.022)`} stroke={`rgba(${accentRgb},0.12)`} strokeWidth="1.5" />
            <ellipse cx="590" cy="180" rx="122" ry="58" fill="none" stroke="rgba(52,211,153,0.11)" strokeWidth="1.5" transform="rotate(-24 590 180)" />
            <ellipse cx="590" cy="180" rx="122" ry="58" fill="none" stroke={`rgba(${accentRgb},0.10)`} strokeWidth="1.5" transform="rotate(38 590 180)" />
          </>
        )}
      </svg>
    </div>
  );
}
