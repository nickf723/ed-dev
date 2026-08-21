const SOURCE_MARKS = Array.from({ length: 28 }, (_, index) => ({
  x: 54 + (index % 7) * 42,
  y: 160 + Math.floor(index / 7) * 54,
  bit: index % 3 === 0 || index % 7 === 0 ? "1" : "0",
}));

const RECORDS = [
  { y: 126, code: "A17", fields: ["creator", "date", "place"] },
  { y: 220, code: "B04", fields: ["format", "rights", "source"] },
  { y: 314, code: "C29", fields: ["schema", "units", "fixity"] },
] as const;

export default function InformationFlowBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#06111a]" aria-hidden="true">
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.84]"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        role="presentation"
      >
        <defs>
          <linearGradient id="information-ground" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#06111a" />
            <stop offset="0.52" stopColor="#081827" />
            <stop offset="1" stopColor="#0b1020" />
          </linearGradient>
          <radialGradient id="information-glow" cx="58%" cy="44%" r="62%">
            <stop offset="0" stopColor="#22d3ee" stopOpacity="0.075" />
            <stop offset="0.58" stopColor="#818cf8" stopOpacity="0.025" />
            <stop offset="1" stopColor="#030712" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="query-path" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#fbbf24" stopOpacity="0.06" />
            <stop offset="0.52" stopColor="#fbbf24" stopOpacity="0.26" />
            <stop offset="1" stopColor="#fbbf24" stopOpacity="0.04" />
          </linearGradient>
          <filter id="soft-information-glow">
            <feGaussianBlur stdDeviation="18" />
          </filter>
        </defs>

        <rect width="1600" height="900" fill="url(#information-ground)" />
        <rect width="1600" height="900" fill="url(#information-glow)" />

        <g opacity="0.34">
          {Array.from({ length: 13 }, (_, index) => (
            <line key={`row-${index}`} x1="0" y1={92 + index * 62} x2="1600" y2={92 + index * 62} stroke="#67e8f9" strokeOpacity="0.055" />
          ))}
          {Array.from({ length: 17 }, (_, index) => (
            <line key={`column-${index}`} x1={42 + index * 96} y1="0" x2={42 + index * 96} y2="900" stroke="#a5b4fc" strokeOpacity="0.04" />
          ))}
        </g>

        <g transform="translate(12 40)">
          <text x="42" y="78" fill="#67e8f9" fillOpacity="0.30" fontSize="12" fontFamily="monospace" letterSpacing="2">SOURCE MARKS</text>
          <text x="42" y="100" fill="#94a3b8" fillOpacity="0.18" fontSize="10" fontFamily="monospace">events become observations</text>
          {SOURCE_MARKS.map((mark, index) => (
            <g key={`${mark.x}-${mark.y}`}>
              <circle cx={mark.x} cy={mark.y} r="13" fill={index % 2 ? "#818cf8" : "#22d3ee"} fillOpacity="0.025" stroke={index % 2 ? "#a5b4fc" : "#67e8f9"} strokeOpacity="0.09" />
              <text x={mark.x} y={mark.y + 4} textAnchor="middle" fill={index % 2 ? "#c7d2fe" : "#a5f3fc"} fillOpacity="0.24" fontSize="11" fontFamily="monospace">{mark.bit}</text>
            </g>
          ))}
        </g>

        <g transform="translate(500 108)">
          <rect x="0" y="0" width="176" height="462" fill="#06111a" fillOpacity="0.32" stroke="#67e8f9" strokeOpacity="0.13" />
          <text x="88" y="36" textAnchor="middle" fill="#a5f3fc" fillOpacity="0.31" fontSize="11" fontFamily="monospace" letterSpacing="1.5">REPRESENT</text>
          {[
            ["SYMBOL", 92],
            ["FORMAT", 160],
            ["SCHEMA", 228],
            ["IDENTITY", 296],
            ["CONTEXT", 364],
          ].map(([label, y], index) => (
            <g key={label}>
              <rect x="28" y={Number(y) - 22} width="120" height="42" fill={index === 4 ? "#fbbf24" : "#22d3ee"} fillOpacity={index === 4 ? "0.038" : "0.022"} stroke={index === 4 ? "#fde68a" : "#67e8f9"} strokeOpacity={index === 4 ? "0.16" : "0.09"} />
              <text x="88" y={Number(y) + 4} textAnchor="middle" fill={index === 4 ? "#fde68a" : "#bae6fd"} fillOpacity={index === 4 ? "0.38" : "0.23"} fontSize="10" fontFamily="monospace">{label}</text>
            </g>
          ))}
        </g>

        <g transform="translate(790 72)">
          <text x="0" y="36" fill="#a5b4fc" fillOpacity="0.30" fontSize="12" fontFamily="monospace" letterSpacing="2">DESCRIBED RECORDS</text>
          <text x="0" y="57" fill="#94a3b8" fillOpacity="0.18" fontSize="10" fontFamily="monospace">fields preserve distinctions and provenance</text>
          {RECORDS.map((record, index) => (
            <g key={record.code} transform={`translate(0 ${record.y})`}>
              <rect width="560" height="72" fill="#07131d" fillOpacity="0.30" stroke={index === 1 ? "#67e8f9" : "#a5b4fc"} strokeOpacity={index === 1 ? "0.17" : "0.08"} />
              <text x="18" y="27" fill={index === 1 ? "#67e8f9" : "#c7d2fe"} fillOpacity="0.32" fontSize="11" fontFamily="monospace">{record.code}</text>
              <line x1="72" y1="13" x2="72" y2="59" stroke="#cbd5e1" strokeOpacity="0.07" />
              {record.fields.map((field, fieldIndex) => (
                <g key={field} transform={`translate(${94 + fieldIndex * 148} 17)`}>
                  <rect width="126" height="38" fill="#020617" fillOpacity="0.24" stroke="#67e8f9" strokeOpacity="0.07" />
                  <text x="63" y="23" textAnchor="middle" fill="#94a3b8" fillOpacity="0.24" fontSize="9" fontFamily="monospace">{field}</text>
                </g>
              ))}
            </g>
          ))}
        </g>

        <path d="M 1430 92 C 1280 110 1190 210 1070 303 C 900 434 748 408 628 336" fill="none" stroke="url(#query-path)" strokeWidth="2" strokeDasharray="7 12" />
        <circle cx="1430" cy="92" r="34" fill="#fbbf24" fillOpacity="0.055" filter="url(#soft-information-glow)" />
        <circle cx="1430" cy="92" r="7" fill="#fbbf24" fillOpacity="0.36" stroke="#fde68a" strokeOpacity="0.32" />
        <text x="1418" y="137" textAnchor="end" fill="#fde68a" fillOpacity="0.27" fontSize="11" fontFamily="monospace" letterSpacing="1.4">QUERY / RELEVANCE</text>

        <g transform="translate(520 720)" opacity="0.34">
          <text x="0" y="0" fill="#67e8f9" fillOpacity="0.62" fontSize="10" fontFamily="monospace">OBSERVE</text>
          <path d="M 78 -4 H 198" stroke="#67e8f9" strokeOpacity="0.30" />
          <text x="214" y="0" fill="#93c5fd" fillOpacity="0.62" fontSize="10" fontFamily="monospace">ENCODE</text>
          <path d="M 278 -4 H 398" stroke="#93c5fd" strokeOpacity="0.30" />
          <text x="414" y="0" fill="#fde68a" fillOpacity="0.62" fontSize="10" fontFamily="monospace">DESCRIBE</text>
          <path d="M 492 -4 H 612" stroke="#fde68a" strokeOpacity="0.30" />
          <text x="628" y="0" fill="#c4b5fd" fillOpacity="0.62" fontSize="10" fontFamily="monospace">RETRIEVE</text>
          <path d="M 700 -4 H 820" stroke="#c4b5fd" strokeOpacity="0.30" />
          <text x="836" y="0" fill="#f9a8d4" fillOpacity="0.62" fontSize="10" fontFamily="monospace">INTERPRET</text>
        </g>
      </svg>
      <div className="absolute inset-x-0 top-0 h-[17%] bg-gradient-to-b from-[#06111a]/95 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[20%] bg-gradient-to-t from-[#06111a]/95 to-transparent" />
    </div>
  );
}
