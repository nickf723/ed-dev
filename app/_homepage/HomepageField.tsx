import { DOMAINS } from "@/lib/domains";

const RING_POINTS = [
  { x: 560, y: 245 },
  { x: 1040, y: 245 },
  { x: 1245, y: 500 },
  { x: 1040, y: 755 },
  { x: 560, y: 755 },
  { x: 355, y: 500 },
] as const;

export default function HomepageField() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#020407]" aria-hidden="true">
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.030) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.030) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(56,189,248,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.018) 1px, transparent 1px)",
          backgroundSize: "256px 256px",
        }}
      />

      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="station-fade" x1="0" x2="1">
            <stop offset="0" stopColor="rgba(125,211,252,0)" />
            <stop offset="0.5" stopColor="rgba(125,211,252,0.13)" />
            <stop offset="1" stopColor="rgba(125,211,252,0)" />
          </linearGradient>
        </defs>

        <g fill="none" strokeLinecap="square">
          <circle cx="800" cy="500" r="175" stroke="rgba(226,232,240,0.035)" />
          <circle cx="800" cy="500" r="315" stroke="rgba(226,232,240,0.026)" strokeDasharray="3 14" />
          <circle cx="800" cy="500" r="425" stroke="rgba(125,211,252,0.025)" />

          <path d="M260 500H1340" stroke="url(#station-fade)" />
          <path d="M800 80V920" stroke="rgba(148,163,184,0.025)" />
          <path d="M430 286L1170 714" stroke="rgba(148,163,184,0.018)" />
          <path d="M1170 286L430 714" stroke="rgba(148,163,184,0.018)" />

          <path d="M560 245H1040L1245 500L1040 755H560L355 500Z" stroke="rgba(226,232,240,0.045)" />

          {RING_POINTS.map((point, index) => {
            const domain = DOMAINS[index];
            return (
              <g key={domain.id}>
                <path
                  d={`M800 500L${point.x} ${point.y}`}
                  stroke={`rgba(${domain.theme.rgb},0.065)`}
                  strokeDasharray="2 10"
                />
                <circle cx={point.x} cy={point.y} r="4.5" fill={`rgba(${domain.theme.rgb},0.36)`} />
                <circle cx={point.x} cy={point.y} r="12" stroke={`rgba(${domain.theme.rgb},0.10)`} />
              </g>
            );
          })}
        </g>

        <g fill="rgba(148,163,184,0.20)" fontFamily="monospace" fontSize="11" letterSpacing="2.2">
          <text x="70" y="92">ES64 / DOMAIN ARRAY</text>
          <text x="70" y="112" fill="rgba(148,163,184,0.09)">SIX PRIMARY FIELDS · CURRICULUM GRAPH ONLINE</text>
          <text x="1292" y="902" fill="rgba(148,163,184,0.11)">NAVIGATION FIELD</text>
        </g>
      </svg>

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/20 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(8,20,31,0.10),rgba(2,4,7,0.40)_48%,rgba(2,4,7,0.92)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,4,7,0.08),rgba(2,4,7,0.30)_72%,rgba(2,4,7,0.82))]" />
    </div>
  );
}
