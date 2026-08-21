export function ComputerScienceBackground() {
  const bits = [
    [124, 257, 1],
    [154, 257, 0],
    [184, 257, 1],
    [214, 257, 1],
    [244, 257, 0],
    [274, 257, 0],
    [124, 303, 0],
    [154, 303, 1],
    [184, 303, 0],
    [214, 303, 1],
    [244, 303, 1],
    [274, 303, 0],
    [124, 349, 1],
    [154, 349, 1],
    [184, 349, 0],
    [214, 349, 0],
    [244, 349, 1],
    [274, 349, 0],
    [124, 395, 0],
    [154, 395, 0],
    [184, 395, 1],
    [214, 395, 1],
    [244, 395, 0],
    [274, 395, 1],
    [124, 441, 1],
    [154, 441, 0],
    [184, 441, 1],
    [214, 441, 0],
    [244, 441, 1],
    [274, 441, 1],
    [124, 487, 0],
    [154, 487, 1],
    [184, 487, 1],
    [214, 487, 0],
    [244, 487, 0],
    [274, 487, 1],
  ] as const;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#02080b]"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1600 1000"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="cs-field" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#031218" />
            <stop offset="0.52" stopColor="#07111a" />
            <stop offset="1" stopColor="#05060d" />
          </linearGradient>
          <radialGradient id="cs-core" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#22d3ee" stopOpacity="0.18" />
            <stop offset="0.5" stopColor="#a78bfa" stopOpacity="0.08" />
            <stop offset="1" stopColor="#02080b" stopOpacity="0" />
          </radialGradient>
          <pattern
            id="cs-grid"
            width="72"
            height="72"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M72 0H0V72"
              fill="none"
              stroke="#67e8f9"
              strokeOpacity="0.035"
            />
          </pattern>
          <filter id="cs-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="9" />
          </filter>
        </defs>
        <rect width="1600" height="1000" fill="url(#cs-field)" />
        <rect width="1600" height="1000" fill="url(#cs-grid)" />

        <g opacity="0.68">
          <rect
            x="90"
            y="205"
            width="238"
            height="336"
            rx="24"
            fill="#020a0d"
            fillOpacity="0.32"
            stroke="#34d399"
            strokeOpacity="0.13"
          />
          <path
            d="M116 246H302M116 292H302M116 338H302M116 384H302M116 430H302M116 476H302"
            stroke="#34d399"
            strokeOpacity="0.16"
          />
          {bits.map(([x, y, active], index) => (
            <rect
              key={index}
              x={x}
              y={y}
              width="16"
              height="12"
              rx="3"
              fill={active ? "#34d399" : "#94a3b8"}
              fillOpacity={active ? "0.44" : "0.08"}
            />
          ))}
          <path
            d="M328 270H468V365H568"
            fill="none"
            stroke="#34d399"
            strokeOpacity="0.24"
            strokeWidth="2"
          />
          <path
            d="M328 362H430V425H568"
            fill="none"
            stroke="#22d3ee"
            strokeOpacity="0.22"
            strokeWidth="2"
          />
          <path
            d="M328 454H468V485H568"
            fill="none"
            stroke="#a78bfa"
            strokeOpacity="0.22"
            strokeWidth="2"
          />
          <circle cx="468" cy="270" r="5" fill="#34d399" fillOpacity="0.62" />
          <circle cx="430" cy="362" r="5" fill="#22d3ee" fillOpacity="0.62" />
          <circle cx="468" cy="454" r="5" fill="#a78bfa" fillOpacity="0.62" />
        </g>

        <circle cx="790" cy="422" r="230" fill="url(#cs-core)" />
        <circle
          cx="790"
          cy="422"
          r="116"
          fill="#09131d"
          fillOpacity="0.28"
          stroke="#a78bfa"
          strokeOpacity="0.22"
        />
        <circle
          cx="790"
          cy="422"
          r="78"
          fill="#061016"
          fillOpacity="0.5"
          stroke="#22d3ee"
          strokeOpacity="0.25"
        />
        <path
          d="M746 387H834M746 422H834M746 457H834"
          stroke="#e2e8f0"
          strokeOpacity="0.13"
        />
        <path
          d="M790 344V500M712 422H868"
          stroke="#22d3ee"
          strokeOpacity="0.12"
        />
        <circle cx="790" cy="422" r="7" fill="#67e8f9" fillOpacity="0.8" />
        <circle
          cx="790"
          cy="422"
          r="20"
          fill="#22d3ee"
          fillOpacity="0.28"
          filter="url(#cs-glow)"
        />

        <g opacity="0.7">
          <path
            d="M908 365H1050V256H1260"
            fill="none"
            stroke="#34d399"
            strokeOpacity="0.24"
            strokeWidth="2"
          />
          <path
            d="M908 422H1120"
            fill="none"
            stroke="#22d3ee"
            strokeOpacity="0.24"
            strokeWidth="2"
          />
          <path
            d="M908 479H1050V586H1260"
            fill="none"
            stroke="#a78bfa"
            strokeOpacity="0.24"
            strokeWidth="2"
          />
          <circle cx="1050" cy="365" r="5" fill="#34d399" fillOpacity="0.62" />
          <circle cx="1120" cy="422" r="5" fill="#22d3ee" fillOpacity="0.62" />
          <circle cx="1050" cy="479" r="5" fill="#a78bfa" fillOpacity="0.62" />
          <rect
            x="1120"
            y="196"
            width="388"
            height="452"
            rx="28"
            fill="#03080f"
            fillOpacity="0.28"
            stroke="#60a5fa"
            strokeOpacity="0.13"
          />
          <rect
            x="1160"
            y="242"
            width="302"
            height="74"
            rx="18"
            fill="#34d399"
            fillOpacity="0.035"
            stroke="#34d399"
            strokeOpacity="0.16"
          />
          <rect
            x="1160"
            y="348"
            width="302"
            height="74"
            rx="18"
            fill="#22d3ee"
            fillOpacity="0.035"
            stroke="#22d3ee"
            strokeOpacity="0.16"
          />
          <rect
            x="1160"
            y="454"
            width="302"
            height="74"
            rx="18"
            fill="#a78bfa"
            fillOpacity="0.035"
            stroke="#a78bfa"
            strokeOpacity="0.16"
          />
          <rect
            x="1160"
            y="560"
            width="302"
            height="42"
            rx="14"
            fill="#60a5fa"
            fillOpacity="0.035"
            stroke="#60a5fa"
            strokeOpacity="0.16"
          />
          <path
            d="M1190 279H1325M1190 385H1406M1190 491H1360M1190 581H1288"
            stroke="#e2e8f0"
            strokeOpacity="0.14"
            strokeWidth="8"
            strokeLinecap="round"
          />
        </g>

        <g fill="none" strokeDasharray="7 12">
          <path d="M52 132H1548" stroke="#34d399" strokeOpacity="0.07" />
          <path d="M52 710H1548" stroke="#22d3ee" strokeOpacity="0.07" />
          <path d="M390 94V730" stroke="#34d399" strokeOpacity="0.055" />
          <path d="M1018 94V730" stroke="#a78bfa" strokeOpacity="0.055" />
        </g>
        <path d="M80 820H1520" stroke="#60a5fa" strokeOpacity="0.06" />
        <path
          d="M165 850H1435M245 884H1355"
          stroke="#94a3b8"
          strokeOpacity="0.035"
        />
      </svg>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(1,8,10,0.18),transparent_24%,transparent_80%,rgba(2,5,9,0.25))]" />
      <div className="absolute inset-x-0 top-0 h-[20%] bg-gradient-to-b from-[#010609]/65 to-transparent" />
      <div className="from-[#010304]/62 absolute inset-x-0 bottom-0 h-[22%] bg-gradient-to-t to-transparent" />
    </div>
  );
}
