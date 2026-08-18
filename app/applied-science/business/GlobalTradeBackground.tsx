export default function GlobalTradeBackground() {
  const nodes = [
    { x: 120, y: 330, label: "CUSTOMER NEED", rgb: "244,114,182" },
    { x: 330, y: 330, label: "DEMAND / ORDERS", rgb: "251,191,36" },
    { x: 545, y: 220, label: "SUPPLIERS", rgb: "125,211,252" },
    { x: 545, y: 440, label: "INVENTORY / CAPACITY", rgb: "192,132,252" },
    { x: 790, y: 330, label: "OPERATIONS", rgb: "94,234,212" },
    { x: 1040, y: 330, label: "DELIVERY", rgb: "134,239,172" },
    { x: 1260, y: 330, label: "CUSTOMER EXPERIENCE", rgb: "244,114,182" },
  ] as const;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#07100c]" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_44%,rgba(52,211,153,0.07),transparent_33%),radial-gradient(circle_at_79%_66%,rgba(56,189,248,0.03),transparent_29%),linear-gradient(145deg,#07100c_0%,#07110f_48%,#0d0d14_100%)]" />
      <svg className="absolute inset-[10%_2%_12%_2%] h-[78%] w-[96%] opacity-90" viewBox="0 0 1400 720" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="ops-grid" width="52" height="52" patternUnits="userSpaceOnUse">
            <path d="M52 0H0V52" fill="none" stroke="rgba(52,211,153,0.04)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect x="18" y="18" width="1364" height="684" fill="url(#ops-grid)" stroke="rgba(52,211,153,0.055)" />
        <text x="70" y="86" fill="rgba(110,231,183,0.27)" fontSize="13" fontFamily="monospace">OPERATING MODEL · GOODS / SERVICES · CASH · INFORMATION · CAPABILITY</text>

        <path d="M120 330H330L545 220L790 330H1040H1260" fill="none" stroke="rgba(110,231,183,0.15)" strokeWidth="3" />
        <path d="M330 330L545 440L790 330" fill="none" stroke="rgba(192,132,252,0.13)" strokeWidth="2" />
        <path d="M1260 382C1110 530 684 552 330 430C214 390 165 374 120 374" fill="none" stroke="rgba(251,191,36,0.11)" strokeWidth="2" strokeDasharray="8 10" />
        <path d="M1260 278C1112 124 699 107 330 228C211 267 158 282 120 284" fill="none" stroke="rgba(125,211,252,0.09)" strokeWidth="1.5" strokeDasharray="5 9" />

        {nodes.map((node) => (
          <g key={node.label} transform={`translate(${node.x} ${node.y})`}>
            <rect x="-72" y="-31" width="144" height="62" rx="12" fill={`rgba(${node.rgb},0.026)`} stroke={`rgba(${node.rgb},0.18)`} />
            <circle cx="-54" cy="0" r="6" fill={`rgba(${node.rgb},0.18)`} stroke={`rgba(${node.rgb},0.32)`} />
            <text x="-39" y="4" fill={`rgba(${node.rgb},0.33)`} fontSize="10" fontFamily="monospace">{node.label}</text>
          </g>
        ))}

        <g transform="translate(530 565)">
          <text x="0" y="0" fill="rgba(251,191,36,0.25)" fontSize="11" fontFamily="monospace">CASH / WORKING CAPITAL</text>
          <rect x="0" y="18" width="410" height="38" rx="8" fill="rgba(251,191,36,0.018)" stroke="rgba(251,191,36,0.10)" />
          <rect x="12" y="29" width="112" height="16" rx="8" fill="rgba(251,191,36,0.09)" />
          <rect x="136" y="29" width="86" height="16" rx="8" fill="rgba(94,234,212,0.07)" />
          <rect x="234" y="29" width="154" height="16" rx="8" fill="rgba(192,132,252,0.065)" />
        </g>

        <g transform="translate(535 122)">
          <text x="0" y="0" fill="rgba(125,211,252,0.24)" fontSize="11" fontFamily="monospace">INFORMATION / FORECAST / FEEDBACK</text>
          <path d="M0 31H620" stroke="rgba(125,211,252,0.09)" strokeDasharray="6 8" />
          {[0, 1, 2, 3, 4].map((index) => <circle key={index} cx={30 + index * 140} cy="31" r="5" fill="rgba(125,211,252,0.09)" />)}
        </g>

        <g className="animate-[order-flow_34s_linear_infinite] motion-reduce:animate-none" transform="translate(120 330)">
          <circle r="8" fill="rgba(110,231,183,0.76)" />
          <circle r="18" fill="none" stroke="rgba(110,231,183,0.22)" />
        </g>
        <g className="animate-[cash-return_38s_linear_infinite] motion-reduce:animate-none" transform="translate(1260 382)">
          <circle r="6" fill="rgba(251,191,36,0.66)" />
        </g>
      </svg>
      <style>{`@keyframes order-flow { 0% { transform: translate(120px,330px); } 25% { transform: translate(330px,330px); } 48% { transform: translate(545px,220px); } 68% { transform: translate(790px,330px); } 84% { transform: translate(1040px,330px); } 100% { transform: translate(1260px,330px); } } @keyframes cash-return { from { transform: translate(1260px,382px); } to { transform: translate(120px,374px); } }`}</style>
      <div className="absolute inset-x-0 top-0 h-[20%] bg-gradient-to-b from-[#07100c] via-[#07100c]/80 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[22%] bg-gradient-to-t from-[#07100c] via-[#07100c]/84 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_34%,rgba(3,8,6,0.72)_100%)]" />
    </div>
  );
}
