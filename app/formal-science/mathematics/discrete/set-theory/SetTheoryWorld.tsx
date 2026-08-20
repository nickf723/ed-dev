import {
  SET_THEORY_SPECIMENS,
  type SetTheorySpecimen,
} from "./setTheorySpecimens";

const WORLD_POSITIONS: Record<
  SetTheorySpecimen["id"],
  { x: number; y: number; rotation?: number }
> = {
  "cyan-circle": { x: 820, y: 320 },
  "cyan-square": { x: 1010, y: 322, rotation: 7 },
  "cyan-triangle": { x: 390, y: 320, rotation: -4 },
  "amber-triangle": { x: 390, y: 570, rotation: 5 },
  "amber-hexagon": { x: 820, y: 570, rotation: -6 },
  "violet-circle": { x: 1010, y: 570 },
};

const TONES = {
  cyan: { fill: "#0891b2", stroke: "#a5f3fc" },
  amber: { fill: "#b45309", stroke: "#fde68a" },
  violet: { fill: "#7c3aed", stroke: "#ddd6fe" },
} as const;

export default function SetTheoryWorld() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#02060b]"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_33%_34%,rgba(8,145,178,0.17),transparent_34%),radial-gradient(circle_at_73%_45%,rgba(124,58,237,0.12),transparent_38%),radial-gradient(circle_at_52%_74%,rgba(245,158,11,0.07),transparent_30%),linear-gradient(155deg,#06121a_0%,#02070c_54%,#08040f_100%)]" />

      <svg
        className="absolute inset-0 h-full w-full opacity-[0.76]"
        viewBox="0 0 1280 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="classification-scan" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#67e8f9" stopOpacity="0" />
            <stop offset="0.48" stopColor="#ecfeff" stopOpacity="0.3" />
            <stop offset="1" stopColor="#c4b5fd" stopOpacity="0" />
          </linearGradient>
          <filter
            id="classification-shadow"
            x="-80%"
            y="-80%"
            width="260%"
            height="260%"
          >
            <feGaussianBlur stdDeviation="11" />
          </filter>
        </defs>

        <path
          d="M74 118 L1206 94 L1236 770 L48 792 Z"
          fill="#061019"
          fillOpacity="0.74"
          stroke="#cbd5e1"
          strokeOpacity="0.08"
          strokeWidth="2"
        />
        <path
          d="M116 184 H1168 V724 H116 Z"
          fill="#02070c"
          fillOpacity="0.3"
          stroke="#94a3b8"
          strokeOpacity="0.12"
        />

        <rect
          x="116"
          y="184"
          width="524"
          height="270"
          fill="#fcd34d"
          fillOpacity="0.018"
        />
        <rect
          x="640"
          y="184"
          width="528"
          height="270"
          fill="#22d3ee"
          fillOpacity="0.018"
        />
        <rect
          x="116"
          y="454"
          width="524"
          height="270"
          fill="#a78bfa"
          fillOpacity="0.018"
        />

        <path
          d="M640 184 V724 M116 454 H1168"
          fill="none"
          stroke="#cbd5e1"
          strokeOpacity="0.12"
          strokeWidth="2"
        />
        <path
          d="M116 224 H1168 M160 184 V724"
          fill="none"
          stroke="#94a3b8"
          strokeOpacity="0.08"
        />

        <g fontFamily="monospace" fontWeight="700">
          <text x="356" y="212" fill="#c4b5fd" fillOpacity="0.32" fontSize="14">
            TRIANGLE
          </text>
          <text x="862" y="212" fill="#94a3b8" fillOpacity="0.23" fontSize="14">
            NOT TRIANGLE
          </text>
          <text
            x="145"
            y="346"
            fill="#67e8f9"
            fillOpacity="0.3"
            fontSize="14"
            textAnchor="middle"
            transform="rotate(-90 145 346)"
          >
            CYAN
          </text>
          <text
            x="145"
            y="612"
            fill="#94a3b8"
            fillOpacity="0.22"
            fontSize="14"
            textAnchor="middle"
            transform="rotate(-90 145 612)"
          >
            NOT CYAN
          </text>

          <text x="184" y="246" fill="#fcd34d" fillOpacity="0.17" fontSize="11">
            BOTH
          </text>
          <text x="682" y="246" fill="#67e8f9" fillOpacity="0.17" fontSize="11">
            A ONLY
          </text>
          <text x="184" y="510" fill="#c4b5fd" fillOpacity="0.17" fontSize="11">
            B ONLY
          </text>
          <text x="682" y="510" fill="#94a3b8" fillOpacity="0.15" fontSize="11">
            NEITHER
          </text>
        </g>

        {SET_THEORY_SPECIMENS.map((specimen) => {
          const position = WORLD_POSITIONS[specimen.id];
          return (
            <WorldSpecimen
              key={specimen.id}
              specimen={specimen}
              x={position.x}
              y={position.y}
              rotation={position.rotation}
            />
          );
        })}

        <g className="classification-inspection-light">
          <rect
            x="-240"
            y="150"
            width="300"
            height="610"
            fill="url(#classification-scan)"
            opacity="0.22"
          />
          <path
            d="M-44 174 V738"
            stroke="#ecfeff"
            strokeOpacity="0.14"
            strokeWidth="2"
          />
        </g>
      </svg>

      <div className="from-[#02060b]/78 absolute inset-y-0 left-0 w-[24%] bg-gradient-to-r to-transparent" />
      <div className="from-[#02060b]/78 absolute inset-y-0 right-0 w-[24%] bg-gradient-to-l to-transparent" />
      <div className="from-[#02060b]/64 absolute inset-x-0 top-0 h-[24vh] bg-gradient-to-b to-transparent" />
      <div className="from-[#02060b]/84 absolute inset-x-0 bottom-0 h-[38vh] bg-gradient-to-t to-transparent" />

      <style>{`
        .classification-inspection-light {
          animation: classification-inspection-pass 22s ease-in-out infinite;
        }

        @keyframes classification-inspection-pass {
          0%, 100% { transform: translateX(80px); opacity: 0.2; }
          50% { transform: translateX(1370px); opacity: 0.42; }
        }

        @media (prefers-reduced-motion: reduce) {
          .classification-inspection-light {
            animation: none;
            transform: translateX(670px);
            opacity: 0.23;
          }
        }
      `}</style>
    </div>
  );
}

function WorldSpecimen({
  specimen,
  x,
  y,
  rotation = 0,
}: {
  specimen: SetTheorySpecimen;
  x: number;
  y: number;
  rotation?: number;
}) {
  const tone = TONES[specimen.tone];

  return (
    <g transform={`translate(${x} ${y}) rotate(${rotation})`}>
      <ellipse
        cx="0"
        cy="38"
        rx="47"
        ry="13"
        fill={tone.stroke}
        fillOpacity="0.15"
        filter="url(#classification-shadow)"
      />
      <SpecimenShape
        shape={specimen.shape}
        fill={tone.fill}
        stroke={tone.stroke}
      />
    </g>
  );
}

function SpecimenShape({
  shape,
  fill,
  stroke,
}: {
  shape: SetTheorySpecimen["shape"];
  fill: string;
  stroke: string;
}) {
  const shared = {
    fill,
    fillOpacity: 0.72,
    stroke,
    strokeOpacity: 0.62,
    strokeWidth: 2,
  };

  if (shape === "circle") return <circle cx="0" cy="0" r="34" {...shared} />;
  if (shape === "square") {
    return <rect x="-31" y="-31" width="62" height="62" rx="8" {...shared} />;
  }
  if (shape === "triangle") {
    return <polygon points="0,-39 38,31 -38,31" {...shared} />;
  }
  return (
    <polygon points="0,-38 34,-19 34,19 0,38 -34,19 -34,-19" {...shared} />
  );
}
