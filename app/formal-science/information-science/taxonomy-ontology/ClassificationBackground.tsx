const TREE_NODES = [
  { x: 120, y: 142, label: "GAME" },
  { x: 250, y: 228, label: "BOARD" },
  { x: 380, y: 314, label: "STRATEGY" },
  { x: 510, y: 400, label: "NETWORK" },
] as const;

const GRAPH_NODES = [
  { x: 1130, y: 178, label: "CLASS" },
  { x: 1360, y: 286, label: "GENRE" },
  { x: 1074, y: 414, label: "GAME" },
  { x: 1310, y: 544, label: "PERSON" },
  { x: 1460, y: 670, label: "MECHANIC" },
] as const;

export default function ClassificationBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#050714]" aria-hidden="true">
      <svg className="absolute inset-0 h-full w-full opacity-[0.82]" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" role="presentation">
        <defs>
          <linearGradient id="classification-ground" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#050714" />
            <stop offset="0.48" stopColor="#0b0a1d" />
            <stop offset="1" stopColor="#120c19" />
          </linearGradient>
          <radialGradient id="classification-center" cx="52%" cy="46%" r="62%">
            <stop offset="0" stopColor="#818cf8" stopOpacity="0.065" />
            <stop offset="0.55" stopColor="#fbbf24" stopOpacity="0.018" />
            <stop offset="1" stopColor="#030712" stopOpacity="0" />
          </radialGradient>
          <marker id="background-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10Z" fill="rgba(253,230,138,0.22)" /></marker>
        </defs>
        <rect width="1600" height="900" fill="url(#classification-ground)" />
        <rect width="1600" height="900" fill="url(#classification-center)" />
        {Array.from({ length: 18 }, (_, index) => <line key={`column-${index}`} x1={index * 96} y1="0" x2={index * 96} y2="900" stroke="#a5b4fc" strokeOpacity="0.032" />)}
        {Array.from({ length: 12 }, (_, index) => <line key={`row-${index}`} x1="0" y1={index * 82} x2="1600" y2={index * 82} stroke="#a5b4fc" strokeOpacity="0.032" />)}

        <g opacity="0.58">
          <text x="42" y="84" fill="#c7d2fe" fillOpacity="0.34" fontSize="11" fontFamily="monospace" letterSpacing="2">BROADER / NARROWER</text>
          <path d="M120 142H184V228H250M250 228H314V314H380M380 314H444V400H510" fill="none" stroke="#a5b4fc" strokeOpacity="0.18" strokeWidth="2" />
          {TREE_NODES.map((node, index) => (
            <g key={node.label} transform={`translate(${node.x} ${node.y})`}>
              <rect x="-52" y="-23" width="104" height="46" rx="13" fill="#4f46e5" fillOpacity={0.055 + index * 0.012} stroke="#a5b4fc" strokeOpacity="0.16" />
              <text textAnchor="middle" y="4" fill="#e0e7ff" fillOpacity="0.28" fontSize="9" fontFamily="monospace">{node.label}</text>
            </g>
          ))}
        </g>

        <g opacity="0.56">
          <text x="1100" y="84" fill="#fde68a" fillOpacity="0.34" fontSize="11" fontFamily="monospace" letterSpacing="2">SUBJECT / PREDICATE / OBJECT</text>
          {[
            [2, 0, "IS A"],
            [2, 1, "HAS GENRE"],
            [2, 3, "DESIGNED BY"],
            [2, 4, "USES"],
          ].map(([fromIndex, toIndex, label]) => {
            const from = GRAPH_NODES[Number(fromIndex)];
            const to = GRAPH_NODES[Number(toIndex)];
            return <g key={String(label)}><line x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="#fde68a" strokeOpacity="0.16" markerEnd="url(#background-arrow)" /><text x={(from.x + to.x) / 2} y={(from.y + to.y) / 2 - 8} textAnchor="middle" fill="#fde68a" fillOpacity="0.22" fontSize="8" fontFamily="monospace">{label}</text></g>;
          })}
          {GRAPH_NODES.map((node, index) => (
            <g key={node.label} transform={`translate(${node.x} ${node.y})`}>
              <circle r={index === 2 ? 39 : 31} fill={index === 2 ? "#4f46e5" : "#111827"} fillOpacity={index === 2 ? "0.12" : "0.65"} stroke={index === 2 ? "#a5b4fc" : "#fde68a"} strokeOpacity="0.18" />
              <text textAnchor="middle" y="4" fill={index === 2 ? "#e0e7ff" : "#fef3c7"} fillOpacity="0.30" fontSize="9" fontFamily="monospace">{node.label}</text>
            </g>
          ))}
        </g>

        <g transform="translate(510 748)" opacity="0.34">
          <text x="0" y="0" fill="#c7d2fe" fontSize="10" fontFamily="monospace">NAME</text>
          <path d="M54 -4H176" stroke="#a5b4fc" strokeOpacity="0.4" />
          <text x="194" y="0" fill="#c7d2fe" fontSize="10" fontFamily="monospace">GROUP</text>
          <path d="M252 -4H374" stroke="#a5b4fc" strokeOpacity="0.4" />
          <text x="392" y="0" fill="#fde68a" fontSize="10" fontFamily="monospace">RELATE</text>
          <path d="M450 -4H572" stroke="#fde68a" strokeOpacity="0.4" />
          <text x="590" y="0" fill="#fde68a" fontSize="10" fontFamily="monospace">CONSTRAIN</text>
        </g>
      </svg>
      <div className="absolute inset-x-0 top-0 h-[18%] bg-gradient-to-b from-[#050714]/95 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[20%] bg-gradient-to-t from-[#050714]/95 to-transparent" />
    </div>
  );
}
