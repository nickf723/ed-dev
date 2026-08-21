import {
  POLITICAL_MAJORITY,
  POLITICAL_PARTIES,
  POLITICAL_TOTAL_SEATS,
  buildPoliticalHemicycle,
} from "./politicalScienceModel";

const dots = buildPoliticalHemicycle();

export default function PoliticalScienceBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#070604]"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1600 1100"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <radialGradient id="politics-room" cx="54%" cy="66%" r="84%">
            <stop offset="0" stopColor="#261c0d" />
            <stop offset="0.44" stopColor="#100c08" />
            <stop offset="1" stopColor="#050505" />
          </radialGradient>
          <linearGradient id="politics-paper" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="rgba(251,191,36,0.14)" />
            <stop offset="1" stopColor="rgba(148,163,184,0.015)" />
          </linearGradient>
          <filter
            id="politics-glow"
            x="-100%"
            y="-100%"
            width="300%"
            height="300%"
          >
            <feGaussianBlur stdDeviation="12" />
          </filter>
        </defs>

        <rect width="1600" height="1100" fill="url(#politics-room)" />

        <g opacity="0.18" fill="none" stroke="rgba(251,191,36,0.34)">
          <path d="M-40 224 H404 L474 294 H718" />
          <path d="M1640 210 H1244 L1172 282 H928" />
          <path d="M-40 874 H378 L452 800 H698" />
          <path d="M1640 892 H1260 L1182 814 H930" />
          <path d="M800 78 V220" strokeDasharray="5 12" />
        </g>

        <g transform="translate(92 334)">
          <rect
            width="310"
            height="332"
            rx="28"
            fill="url(#politics-paper)"
            stroke="rgba(251,191,36,0.16)"
          />
          <text
            x="30"
            y="48"
            fill="rgba(253,230,138,0.48)"
            fontSize="12"
            fontFamily="ui-monospace, monospace"
            letterSpacing="2"
          >
            PREFERENCES
          </text>
          {POLITICAL_PARTIES.map((party, index) => (
            <g key={party.id} transform={`translate(30 ${78 + index * 46})`}>
              <rect
                width={party.seats * 4.9}
                height="12"
                rx="6"
                fill={`rgba(${party.rgb},0.28)`}
              />
              <circle
                cx="6"
                cy="6"
                r="4"
                fill={`rgb(${party.rgb})`}
                opacity="0.72"
              />
              <text
                x="220"
                y="10"
                fill="rgba(226,232,240,0.34)"
                fontSize="11"
                fontFamily="ui-monospace, monospace"
              >
                {party.seats}
              </text>
            </g>
          ))}
          <text
            x="30"
            y="304"
            fill="rgba(148,163,184,0.28)"
            fontSize="10"
            fontFamily="ui-monospace, monospace"
            letterSpacing="1.4"
          >
            FICTIONAL SEAT DISTRIBUTION
          </text>
        </g>

        <g transform="translate(450 258) scale(1)">
          <path
            d="M96 280 A254 254 0 0 1 604 280"
            fill="none"
            stroke="rgba(251,191,36,0.17)"
            strokeWidth="2"
          />
          <path
            d="M176 280 A174 174 0 0 1 524 280"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
          />
          {dots.map((dot) => (
            <circle
              key={dot.key}
              cx={dot.x}
              cy={dot.y}
              r="4.2"
              fill={`rgb(${dot.rgb})`}
              opacity="0.42"
            />
          ))}
          <circle
            cx="350"
            cy="292"
            r="44"
            fill="rgba(251,191,36,0.07)"
            filter="url(#politics-glow)"
          />
          <rect
            x="318"
            y="270"
            width="64"
            height="30"
            rx="9"
            fill="rgba(7,6,4,0.94)"
            stroke="rgba(251,191,36,0.30)"
          />
          <text
            x="350"
            y="291"
            textAnchor="middle"
            fill="rgba(253,230,138,0.62)"
            fontSize="12"
            fontFamily="ui-monospace, monospace"
          >
            {POLITICAL_MAJORITY}
          </text>
        </g>

        <g transform="translate(1222 344)">
          <rect
            width="286"
            height="306"
            rx="28"
            fill="rgba(9,8,6,0.38)"
            stroke="rgba(148,163,184,0.13)"
          />
          <text
            x="28"
            y="46"
            fill="rgba(253,230,138,0.48)"
            fontSize="12"
            fontFamily="ui-monospace, monospace"
            letterSpacing="2"
          >
            GOVERNING RECORD
          </text>
          {[
            ["RULE", "who may decide"],
            ["ACTION", "what was adopted"],
            ["DELIVERY", "what was implemented"],
            ["OUTCOME", "what changed"],
          ].map(([label, note], index) => (
            <g key={label} transform={`translate(28 ${80 + index * 51})`}>
              <circle
                cx="7"
                cy="7"
                r="7"
                fill="rgba(251,191,36,0.14)"
                stroke="rgba(251,191,36,0.28)"
              />
              {index < 3 ? (
                <line
                  x1="7"
                  y1="14"
                  x2="7"
                  y2="51"
                  stroke="rgba(251,191,36,0.15)"
                />
              ) : null}
              <text
                x="28"
                y="5"
                fill="rgba(226,232,240,0.42)"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
                letterSpacing="1.5"
              >
                {label}
              </text>
              <text
                x="28"
                y="23"
                fill="rgba(148,163,184,0.30)"
                fontSize="11"
                fontFamily="ui-monospace, monospace"
              >
                {note}
              </text>
            </g>
          ))}
        </g>

        <g
          fill="rgba(253,230,138,0.29)"
          fontFamily="ui-monospace, monospace"
          letterSpacing="2"
        >
          <text x="92" y="1018" fontSize="11">
            PREFERENCES → RULES → {POLITICAL_TOTAL_SEATS} SEATS →{" "}
            {POLITICAL_MAJORITY} MAJORITY
          </text>
          <text x="1135" y="1018" fontSize="11">
            ADOPTION ≠ IMPLEMENTATION ≠ EFFECT
          </text>
        </g>
      </svg>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_58%,transparent_7%,rgba(7,6,4,0.12)_54%,rgba(5,5,5,0.76)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-[34%] bg-gradient-to-b from-[#050505]/80 to-transparent" />
      <div className="from-[#050505]/78 absolute inset-x-0 bottom-0 h-[22%] bg-gradient-to-t to-transparent" />
    </div>
  );
}
