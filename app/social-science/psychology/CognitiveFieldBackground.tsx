const PARTICIPANTS = [
  { id: "P-04", condition: "A", score: 8 },
  { id: "P-11", condition: "B", score: 5 },
  { id: "P-17", condition: "A", score: 9 },
  { id: "P-23", condition: "B", score: 6 },
] as const;

export default function CognitiveFieldBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#070610]"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1600 1100"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="psychology-field" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#17091d" />
            <stop offset="0.48" stopColor="#09131d" />
            <stop offset="1" stopColor="#050610" />
          </linearGradient>
          <radialGradient id="psychology-observation-glow" cx="0" cy="0" r="1">
            <stop offset="0" stopColor="#22d3ee" stopOpacity="0.13" />
            <stop offset="1" stopColor="#22d3ee" stopOpacity="0" />
          </radialGradient>
          <pattern id="psychology-grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M48 0H0V48" fill="none" stroke="#bae6fd" strokeOpacity="0.035" />
          </pattern>
        </defs>

        <rect width="1600" height="1100" fill="url(#psychology-field)" />
        <rect width="1600" height="1100" fill="url(#psychology-grid)" />
        <circle cx="1260" cy="210" r="520" fill="url(#psychology-observation-glow)" />

        <g transform="translate(90 188) rotate(-2 260 210)" opacity="0.56">
          <rect width="520" height="420" rx="18" fill="#080b14" fillOpacity="0.38" stroke="#f9a8d4" strokeOpacity="0.16" />
          <text x="34" y="46" fill="#fbcfe8" fillOpacity="0.52" fontSize="13" letterSpacing="3">OBSERVATION / INFERENCE</text>
          <path d="M34 70H486" stroke="#f9a8d4" strokeOpacity="0.13" />
          <g transform="translate(34 100)">
            <rect width="190" height="104" rx="12" fill="#22d3ee" fillOpacity="0.035" stroke="#67e8f9" strokeOpacity="0.18" />
            <text x="18" y="30" fill="#a5f3fc" fillOpacity="0.65" fontSize="11" letterSpacing="2">OBSERVED</text>
            <circle cx="38" cy="70" r="10" fill="none" stroke="#67e8f9" strokeOpacity="0.54" />
            <path d="M62 64H158M62 76H132" stroke="#67e8f9" strokeOpacity="0.25" />
          </g>
          <path d="M238 152H284" stroke="#c4b5fd" strokeOpacity="0.36" strokeDasharray="6 8" />
          <path d="M275 144L286 152L275 160" fill="none" stroke="#c4b5fd" strokeOpacity="0.36" />
          <g transform="translate(298 100)">
            <rect width="188" height="104" rx="12" fill="#a78bfa" fillOpacity="0.035" stroke="#c4b5fd" strokeOpacity="0.18" />
            <text x="18" y="30" fill="#ddd6fe" fillOpacity="0.65" fontSize="11" letterSpacing="2">CONSTRUCT</text>
            <path d="M28 76C56 42 86 94 112 62S158 52 168 70" fill="none" stroke="#c4b5fd" strokeOpacity="0.48" />
          </g>
          <text x="34" y="246" fill="#94a3b8" fillOpacity="0.48" fontSize="11" letterSpacing="2">ONE MEASURE ≠ THE WHOLE PERSON</text>
          <path d="M34 274H486" stroke="#f9a8d4" strokeOpacity="0.10" />
          <path d="M34 310H324M34 344H438M34 378H276" stroke="#94a3b8" strokeOpacity="0.10" strokeWidth="10" />
        </g>

        <g transform="translate(1030 124)" opacity="0.62">
          <path d="M0 0H440V334H0Z" fill="#06111a" fillOpacity="0.32" stroke="#67e8f9" strokeOpacity="0.15" />
          <text x="24" y="38" fill="#a5f3fc" fillOpacity="0.52" fontSize="12" letterSpacing="3">MASKED PARTICIPANT LEDGER</text>
          <path d="M24 60H416" stroke="#67e8f9" strokeOpacity="0.13" />
          {PARTICIPANTS.map((participant, index) => {
            const y = 94 + index * 54;
            return (
              <g key={participant.id} transform={`translate(24 ${y})`}>
                <text x="0" y="16" fill="#cbd5e1" fillOpacity="0.48" fontSize="12">{participant.id}</text>
                <text x="112" y="16" fill={participant.condition === "A" ? "#67e8f9" : "#f9a8d4"} fillOpacity="0.58" fontSize="12">CONDITION {participant.condition}</text>
                <path d="M252 11H370" stroke="#cbd5e1" strokeOpacity="0.10" strokeWidth="8" />
                <path d={`M252 11H${252 + participant.score * 11}`} stroke={participant.condition === "A" ? "#67e8f9" : "#f9a8d4"} strokeOpacity="0.42" strokeWidth="8" />
              </g>
            );
          })}
        </g>

        <g transform="translate(800 650)" opacity="0.44">
          <text x="0" y="0" fill="#fef3c7" fillOpacity="0.62" fontSize="12" letterSpacing="3">TRIAL SEQUENCE</text>
          <path d="M0 56H690" stroke="#fde68a" strokeOpacity="0.17" strokeWidth="2" />
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <g key={index} transform={`translate(${index * 118} 30)`}>
              <circle r="12" fill={index % 2 === 0 ? "#22d3ee" : "#f472b6"} fillOpacity="0.12" stroke={index % 2 === 0 ? "#67e8f9" : "#f9a8d4"} strokeOpacity="0.34" />
              <text x="0" y="4" textAnchor="middle" fill="#f8fafc" fillOpacity="0.56" fontSize="10">{index + 1}</text>
            </g>
          ))}
          <text x="0" y="94" fill="#94a3b8" fillOpacity="0.46" fontSize="11" letterSpacing="2">STIMULUS → RESPONSE → RECORD → COMPARE</text>
        </g>

        <g opacity="0.22" stroke="#c4b5fd" fill="none">
          <path d="M170 810C370 710 520 914 724 790S1094 718 1426 846" />
          <path d="M170 842C370 742 520 946 724 822S1094 750 1426 878" strokeDasharray="10 16" />
        </g>
      </svg>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,6,16,0.30),transparent_32%,transparent_72%,rgba(5,6,16,0.36))]" />
      <div className="absolute inset-x-0 top-0 h-[20%] bg-gradient-to-b from-[#070610]/80 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[28%] bg-gradient-to-t from-[#050610]/88 to-transparent" />
    </div>
  );
}
