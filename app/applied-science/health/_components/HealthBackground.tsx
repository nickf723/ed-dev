export default function HealthBackground() {
  const stations = [
    { x: 160, label: "HOME / COMMUNITY", rgb: "134,239,172" },
    { x: 380, label: "PREVENTION / ACCESS", rgb: "94,234,212" },
    { x: 610, label: "MEASUREMENT / DIAGNOSTICS", rgb: "125,211,252" },
    { x: 845, label: "COORDINATED CARE", rgb: "244,114,182" },
    { x: 1075, label: "REHABILITATION", rgb: "251,191,36" },
    { x: 1280, label: "DAILY LIFE / FOLLOW-UP", rgb: "192,132,252" },
  ] as const;

  const professions = [
    { x: 300, y: 160, label: "PUBLIC HEALTH", rgb: "94,234,212" },
    { x: 510, y: 575, label: "LAB / IMAGING", rgb: "125,211,252" },
    { x: 770, y: 150, label: "NURSING", rgb: "244,114,182" },
    { x: 965, y: 585, label: "NUTRITION", rgb: "134,239,172" },
    { x: 1120, y: 155, label: "REHAB", rgb: "251,191,36" },
    { x: 1270, y: 575, label: "INFORMATICS / SYSTEMS", rgb: "192,132,252" },
  ] as const;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#07100f]" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_44%,rgba(45,212,191,0.07),transparent_34%),radial-gradient(circle_at_78%_66%,rgba(244,114,182,0.035),transparent_30%),linear-gradient(145deg,#07100f_0%,#0a1212_50%,#0e0c12_100%)]" />
      <svg className="absolute inset-[10%_2%_12%_2%] h-[78%] w-[96%] opacity-90" viewBox="0 0 1440 740" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="care-grid" width="54" height="54" patternUnits="userSpaceOnUse">
            <path d="M54 0H0V54" fill="none" stroke="rgba(94,234,212,0.04)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect x="18" y="18" width="1404" height="704" fill="url(#care-grid)" stroke="rgba(94,234,212,0.055)" />

        <text x="75" y="90" fill="rgba(153,246,228,0.27)" fontSize="13" fontFamily="monospace">CARE NETWORK · PATHWAYS VARY BY PERSON, PLACE, PROFESSION, ACCESS, AND NEED</text>

        <path d="M160 370 C290 325 315 414 380 370 S520 320 610 370 S755 420 845 370 S990 316 1075 370 S1205 418 1280 370" fill="none" stroke="rgba(153,246,228,0.16)" strokeWidth="3" />
        <path d="M160 370 C300 455 490 250 610 370 C745 503 971 236 1075 370 C1160 480 1240 425 1280 370" fill="none" stroke="rgba(125,211,252,0.08)" strokeWidth="1.5" strokeDasharray="8 10" />

        {stations.map((station, index) => (
          <g key={station.label} transform={`translate(${station.x} 370)`}>
            <circle r="38" fill={`rgba(${station.rgb},0.035)`} stroke={`rgba(${station.rgb},0.25)`} strokeWidth="1.5" />
            <circle r="9" fill={`rgba(${station.rgb},0.16)`} stroke={`rgba(${station.rgb},0.35)`} />
            <text x="0" y="62" textAnchor="middle" fill={`rgba(${station.rgb},0.34)`} fontSize="10" fontFamily="monospace">{station.label}</text>
            <text x="0" y="-54" textAnchor="middle" fill="rgba(214,211,209,0.12)" fontSize="9" fontFamily="monospace">0{index + 1}</text>
          </g>
        ))}

        {professions.map((profession) => {
          const targetY = profession.y < 370 ? 332 : 408;
          return (
            <g key={profession.label} transform={`translate(${profession.x} ${profession.y})`}>
              <rect x="-68" y="-20" width="136" height="40" rx="20" fill={`rgba(${profession.rgb},0.025)`} stroke={`rgba(${profession.rgb},0.14)`} />
              <text x="0" y="4" textAnchor="middle" fill={`rgba(${profession.rgb},0.27)`} fontSize="10" fontFamily="monospace">{profession.label}</text>
              <path d={`M0 ${profession.y < 370 ? 22 : -22} L0 ${targetY - profession.y}`} stroke={`rgba(${profession.rgb},0.09)`} strokeDasharray="4 7" />
            </g>
          );
        })}

        <g transform="translate(720 370)">
          <circle r="72" fill="rgba(255,255,255,0.008)" stroke="rgba(255,255,255,0.04)" strokeDasharray="5 8" />
          <circle r="48" fill="rgba(45,212,191,0.018)" stroke="rgba(45,212,191,0.09)" />
          <circle cx="0" cy="-18" r="10" fill="none" stroke="rgba(153,246,228,0.20)" />
          <path d="M0-7v33M-21 6L0 17 21 6M-13 27l-8 30M13 27l8 30" fill="none" stroke="rgba(153,246,228,0.18)" strokeWidth="1.5" strokeLinecap="round" />
          <text x="0" y="86" textAnchor="middle" fill="rgba(153,246,228,0.23)" fontSize="10" fontFamily="monospace">PERSON / FAMILY / COMMUNITY</text>
        </g>

        <g className="animate-[care-handoff_38s_ease-in-out_infinite_alternate] motion-reduce:animate-none" transform="translate(160 370)">
          <circle r="8" fill="rgba(255,255,255,0.72)" />
          <circle r="18" fill="none" stroke="rgba(94,234,212,0.24)" />
        </g>
      </svg>
      <style>{`@keyframes care-handoff { from { transform: translate(160px,370px); } to { transform: translate(1280px,370px); } }`}</style>
      <div className="absolute inset-x-0 top-0 h-[20%] bg-gradient-to-b from-[#07100f] via-[#07100f]/80 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[22%] bg-gradient-to-t from-[#07100f] via-[#07100f]/84 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_34%,rgba(3,8,8,0.72)_100%)]" />
    </div>
  );
}
