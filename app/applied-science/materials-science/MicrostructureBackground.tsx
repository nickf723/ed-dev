const GRAINS = Array.from({ length: 24 }, (_, index) => ({
  x: 1050 + ((index * 97) % 410),
  y: 224 + ((index * 67) % 386),
  radius: 34 + ((index * 13) % 23),
  sides: 5 + (index % 3),
  phase: (index * 31) % 80,
  rgb:
    index % 4 === 0
      ? "251,191,36"
      : index % 4 === 1
        ? "56,189,248"
        : index % 4 === 2
          ? "167,139,250"
          : "94,234,212",
}));

const LATTICE_POINTS = Array.from({ length: 70 }, (_, index) => {
  const row = Math.floor(index / 10);
  const column = index % 10;
  return {
    x: 1080 + column * 39 + (row % 2) * 19.5,
    y: 250 + row * 35,
    missing: (row === 3 && column === 5) || (row === 5 && column === 2),
    alternate: (row + column) % 7 === 0,
  };
});

const PROCESS_STEPS = [
  { label: "PROCESS", note: "heat · form · cure", rgb: "251,146,60" },
  { label: "STRUCTURE", note: "phase · grain · defect", rgb: "125,211,252" },
  { label: "PROPERTY", note: "stiffness · transport", rgb: "251,191,36" },
  { label: "PERFORMANCE", note: "lifetime · failure", rgb: "94,234,212" },
] as const;

export default function MicrostructureBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
      data-background="materials-test-bench"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_38%,rgba(125,211,252,0.095),transparent_29%),radial-gradient(circle_at_28%_58%,rgba(251,191,36,0.06),transparent_32%),linear-gradient(145deg,#05080c_0%,#081018_48%,#040609_100%)]" />
      <div
        className="opacity-38 absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.032) 1px,transparent 1px),linear-gradient(90deg,rgba(148,163,184,0.026) 1px,transparent 1px)",
          backgroundSize: "58px 58px",
          maskImage:
            "linear-gradient(to bottom,transparent,black 18%,black 84%,transparent)",
        }}
      />

      <svg
        viewBox="0 0 1600 1000"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        role="presentation"
      >
        <defs>
          <radialGradient id="scope-field">
            <stop offset="0" stopColor="rgba(15,23,31,0.78)" />
            <stop offset="0.86" stopColor="rgba(7,15,23,0.72)" />
            <stop offset="1" stopColor="rgba(125,211,252,0.08)" />
          </radialGradient>
          <linearGradient id="specimen-metal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="rgba(226,232,240,0.20)" />
            <stop offset="0.48" stopColor="rgba(125,211,252,0.08)" />
            <stop offset="1" stopColor="rgba(148,163,184,0.17)" />
          </linearGradient>
          <clipPath id="scope-clip">
            <circle cx="1260" cy="430" r="235" />
          </clipPath>
        </defs>

        <g opacity="0.68">
          <g transform="translate(112 252)">
            <rect
              width="690"
              height="410"
              rx="28"
              fill="rgba(3,7,11,0.20)"
              stroke="rgba(203,213,225,0.10)"
            />
            <text
              x="28"
              y="38"
              fill="rgba(203,213,225,0.38)"
              fontSize="11"
              fontFamily="monospace"
            >
              UNIAXIAL TEST FRAME · SCHEMATIC SPECIMEN
            </text>

            <rect
              x="48"
              y="118"
              width="106"
              height="176"
              rx="10"
              fill="rgba(148,163,184,0.035)"
              stroke="rgba(148,163,184,0.13)"
            />
            <rect
              x="536"
              y="118"
              width="106"
              height="176"
              rx="10"
              fill="rgba(148,163,184,0.035)"
              stroke="rgba(148,163,184,0.13)"
            />
            {[138, 166, 194, 222, 250, 278].map((y) => (
              <g key={y}>
                <path d={`M58 ${y}H144`} stroke="rgba(148,163,184,0.09)" />
                <path d={`M546 ${y}H632`} stroke="rgba(148,163,184,0.09)" />
              </g>
            ))}

            <path
              d="M132 154 H225 C252 154 262 178 276 190 H414 C428 178 438 154 465 154 H558 V258 H465 C438 258 428 234 414 222 H276 C262 234 252 258 225 258 H132 Z"
              fill="url(#specimen-metal)"
              stroke="rgba(186,230,253,0.30)"
              strokeWidth="1.4"
            />
            <path
              d="M344 190L336 203L348 209L339 222"
              fill="none"
              stroke="rgba(248,113,113,0.38)"
              strokeWidth="2"
            />
            <path
              d="M278 181V232M414 181V232"
              stroke="rgba(251,191,36,0.22)"
              strokeDasharray="4 5"
            />
            <path
              d="M278 310H414M278 302V318M414 302V318"
              stroke="rgba(251,191,36,0.28)"
            />
            <text
              x="309"
              y="338"
              fill="rgba(253,230,138,0.42)"
              fontSize="10"
              fontFamily="monospace"
            >
              GAUGE LENGTH
            </text>
            <path d="M184 94H506" stroke="rgba(125,211,252,0.16)" />
            <path
              d="M184 94l18-9v18zM506 94l-18-9v18z"
              fill="rgba(125,211,252,0.20)"
            />
            <text
              x="300"
              y="78"
              fill="rgba(186,230,253,0.40)"
              fontSize="10"
              fontFamily="monospace"
            >
              APPLIED FORCE
            </text>
          </g>

          <circle
            cx="1260"
            cy="430"
            r="235"
            fill="url(#scope-field)"
            stroke="rgba(186,230,253,0.22)"
          />
          <circle
            cx="1260"
            cy="430"
            r="245"
            fill="none"
            stroke="rgba(226,232,240,0.07)"
          />
          <g clipPath="url(#scope-clip)">
            <g opacity="0.76">
              {GRAINS.map((grain, index) => (
                <path
                  key={index}
                  d={polygonPath(
                    grain.x,
                    grain.y,
                    grain.radius,
                    grain.sides,
                    grain.phase
                  )}
                  fill={`rgba(${grain.rgb},0.028)`}
                  stroke={`rgba(${grain.rgb},0.15)`}
                />
              ))}
            </g>
            <g opacity="0.72">
              {LATTICE_POINTS.map((point, index) =>
                point.missing ? null : (
                  <circle
                    key={index}
                    cx={point.x}
                    cy={point.y}
                    r={point.alternate ? 4 : 2.5}
                    fill={
                      point.alternate
                        ? "rgba(167,139,250,0.34)"
                        : "rgba(125,211,252,0.24)"
                    }
                  />
                )
              )}
            </g>
            <path
              d="M1040 454 C1130 405 1175 505 1265 452 S1410 408 1500 470"
              fill="none"
              stroke="rgba(251,191,36,0.26)"
              strokeDasharray="7 8"
            />
          </g>
          <path
            d="M1025 430H1495M1260 195V665"
            stroke="rgba(226,232,240,0.055)"
          />
          <text
            x="1070"
            y="702"
            fill="rgba(203,213,225,0.35)"
            fontSize="10"
            fontFamily="monospace"
          >
            MICROSTRUCTURE WINDOW · GRAINS / LATTICE / DEFECTS
          </text>
        </g>

        <g transform="translate(176 796)" opacity="0.50">
          {PROCESS_STEPS.map((step, index) => (
            <g key={step.label} transform={`translate(${index * 342} 0)`}>
              <rect
                width="274"
                height="70"
                rx="12"
                fill={`rgba(${step.rgb},0.025)`}
                stroke={`rgba(${step.rgb},0.15)`}
              />
              <text
                x="18"
                y="29"
                fill={`rgba(${step.rgb},0.60)`}
                fontSize="11"
                fontFamily="monospace"
              >
                {step.label}
              </text>
              <text
                x="18"
                y="49"
                fill="rgba(148,163,184,0.36)"
                fontSize="10"
                fontFamily="monospace"
              >
                {step.note}
              </text>
              {index < PROCESS_STEPS.length - 1 ? (
                <path
                  d="M286 35H328M320 27l8 8-8 8"
                  fill="none"
                  stroke="rgba(203,213,225,0.22)"
                />
              ) : null}
            </g>
          ))}
        </g>
      </svg>

      <div className="absolute inset-x-0 top-0 h-[18%] bg-gradient-to-b from-[#05080c]/90 to-transparent" />
      <div className="from-[#05080c]/86 absolute inset-x-0 bottom-0 h-[18%] bg-gradient-to-t to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_46%,rgba(0,0,0,0.50)_100%)]" />
    </div>
  );
}

function polygonPath(
  cx: number,
  cy: number,
  radius: number,
  sides: number,
  phase: number
) {
  return (
    Array.from({ length: sides }, (_, side) => {
      const angle = (side / sides) * Math.PI * 2 + phase;
      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius;
      return `${side === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    }).join(" ") + " Z"
  );
}
