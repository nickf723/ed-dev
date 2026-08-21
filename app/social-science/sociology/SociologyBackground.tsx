const PEOPLE = [
  [1040, 150, "#67e8f9"],
  [1115, 205, "#67e8f9"],
  [1190, 140, "#67e8f9"],
  [1285, 220, "#c4b5fd"],
  [1370, 155, "#c4b5fd"],
  [1450, 240, "#c4b5fd"],
  [1060, 430, "#c4b5fd"],
  [1160, 485, "#c4b5fd"],
  [1260, 420, "#c4b5fd"],
  [1370, 500, "#f9a8d4"],
  [1475, 430, "#f9a8d4"],
] as const;

const TIES = [
  [0, 1],
  [1, 2],
  [1, 3],
  [3, 4],
  [4, 5],
  [6, 7],
  [7, 8],
  [8, 9],
  [9, 10],
  [3, 8],
  [5, 10],
] as const;

export default function SociologyBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#09050f]"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1600 1000"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <radialGradient id="soc-glow" cx="78%" cy="32%" r="55%">
            <stop offset="0" stopColor="#8b5cf6" stopOpacity="0.10" />
            <stop offset="0.52" stopColor="#22d3ee" stopOpacity="0.025" />
            <stop offset="1" stopColor="#09050f" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="soc-scale" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#22d3ee" stopOpacity="0.16" />
            <stop offset="0.5" stopColor="#a78bfa" stopOpacity="0.14" />
            <stop offset="1" stopColor="#f472b6" stopOpacity="0.13" />
          </linearGradient>
        </defs>
        <rect width="1600" height="1000" fill="#09050f" />
        <rect width="1600" height="1000" fill="url(#soc-glow)" />

        <g fill="none" stroke="#ddd6fe" strokeOpacity="0.05">
          <rect x="950" y="75" width="590" height="235" rx="42" />
          <rect x="930" y="350" width="630" height="250" rx="42" />
          <rect x="900" y="650" width="680" height="250" rx="42" />
        </g>
        <g fontSize="12" letterSpacing="4" fill="#ddd6fe" fillOpacity="0.22">
          <text x="980" y="112">
            MICRO · ENCOUNTERS AND MEANING
          </text>
          <text x="960" y="388">
            MESO · GROUPS, NETWORKS, ORGANIZATIONS
          </text>
          <text x="930" y="690">
            MACRO · INSTITUTIONS, POPULATIONS, INEQUALITY
          </text>
        </g>

        <g stroke="url(#soc-scale)" strokeWidth="1.5">
          {TIES.map(([from, to]) => (
            <line
              key={`${from}-${to}`}
              x1={PEOPLE[from][0]}
              y1={PEOPLE[from][1]}
              x2={PEOPLE[to][0]}
              y2={PEOPLE[to][1]}
            />
          ))}
        </g>
        <g>
          {PEOPLE.map(([x, y, color], index) => (
            <g key={index} transform={`translate(${x} ${y})`}>
              <circle
                r="18"
                fill={color}
                fillOpacity="0.045"
                stroke={color}
                strokeOpacity="0.19"
              />
              <circle cy="-5" r="4" fill={color} fillOpacity="0.52" />
              <path
                d="M -7 9 C -6 1 6 1 7 9"
                fill="none"
                stroke={color}
                strokeOpacity="0.48"
              />
            </g>
          ))}
        </g>

        <g
          transform="translate(1030 735)"
          fill="none"
          stroke="#f9a8d4"
          strokeOpacity="0.14"
        >
          <path d="M 0 105 V 30 H 115 V 105 M 145 105 V 0 H 270 V 105 M 300 105 V 48 H 430 V 105" />
          <path d="M -40 105 H 490" />
          <path d="M 30 30 V 10 H 85 V 30 M 180 0 V -28 H 235 V 0" />
          <g fill="#f9a8d4" fillOpacity="0.08" stroke="none">
            <rect x="16" y="48" width="20" height="20" />
            <rect x="76" y="48" width="20" height="20" />
            <rect x="165" y="22" width="24" height="24" />
            <rect x="225" y="22" width="24" height="24" />
            <rect x="320" y="65" width="24" height="20" />
            <rect x="382" y="65" width="24" height="20" />
          </g>
        </g>

        <g
          fill="none"
          stroke="#c4b5fd"
          strokeOpacity="0.035"
          strokeDasharray="7 22"
        >
          <path d="M 0 170 H 720" />
          <path d="M 80 225 H 600" />
          <path d="M 0 610 H 760" />
        </g>
      </svg>
      <div className="from-[#09050f]/82 absolute inset-y-0 left-0 w-[38%] bg-gradient-to-r to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[20%] bg-gradient-to-t from-[#09050f]/90 to-transparent" />
    </div>
  );
}
