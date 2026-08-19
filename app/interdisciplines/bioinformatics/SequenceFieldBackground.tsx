const ROWS = [
  "ATGCTACGTTACGATCGGCTA",
  "ATGCTGCGTTACGATCGACTA",
  "ATG-TACGTTACCATCGGCTA",
  "ATGCTACGATACGAT-GGCTA",
  "ATGCTACGTTACGATCGGCTA",
] as const;

const BASE_COLORS: Record<string, string> = {
  A: "52,211,153",
  T: "244,114,182",
  G: "34,211,238",
  C: "167,139,250",
  "-": "148,163,184",
};

export default function SequenceFieldBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#030907]" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(52,211,153,0.10),transparent_26%),radial-gradient(circle_at_80%_30%,rgba(34,211,238,0.08),transparent_28%),radial-gradient(circle_at_72%_84%,rgba(167,139,250,0.07),transparent_30%),linear-gradient(145deg,#030907_0%,#040b10_52%,#05070d_100%)]" />

      <div className="absolute -left-16 top-[16%] rotate-[-7deg] space-y-3 opacity-30">
        {ROWS.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-2 font-mono text-[12px] tracking-[0.08em]">
            {row.split("").map((base, index) => (
              <span key={`${rowIndex}-${index}`} style={{ color: `rgba(${BASE_COLORS[base]},${index % 5 === rowIndex ? 0.52 : 0.20})` }}>
                {base}
              </span>
            ))}
          </div>
        ))}
      </div>

      <svg className="absolute inset-0 h-full w-full opacity-75" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="sequence-flow" x1="0" x2="1">
            <stop offset="0" stopColor="rgba(52,211,153,0)" />
            <stop offset="0.45" stopColor="rgba(52,211,153,0.10)" />
            <stop offset="0.70" stopColor="rgba(34,211,238,0.08)" />
            <stop offset="1" stopColor="rgba(34,211,238,0)" />
          </linearGradient>
        </defs>

        <g fill="none" strokeLinecap="round">
          <path d="M230 560 C430 390, 620 680, 805 500 S1180 360, 1420 520" stroke="url(#sequence-flow)" strokeWidth="1.5" />
          <path d="M230 585 C430 415, 620 705, 805 525 S1180 385, 1420 545" stroke="rgba(167,139,250,0.035)" />
          <path d="M1050 160L1165 270L1105 395L1265 505L1190 650L1360 785" stroke="rgba(34,211,238,0.055)" strokeDasharray="3 11" />
          <path d="M1165 270L1320 245M1265 505L1400 455M1190 650L1035 740" stroke="rgba(52,211,153,0.045)" />
        </g>

        {[
          [1050, 160, "52,211,153"],
          [1165, 270, "34,211,238"],
          [1320, 245, "244,114,182"],
          [1105, 395, "167,139,250"],
          [1265, 505, "52,211,153"],
          [1400, 455, "34,211,238"],
          [1190, 650, "244,114,182"],
          [1035, 740, "167,139,250"],
          [1360, 785, "52,211,153"],
        ].map(([x, y, rgb], index) => (
          <g key={index}>
            <circle cx={x} cy={y} r="3.5" fill={`rgba(${rgb},0.30)`} />
            <circle cx={x} cy={y} r="12" fill="none" stroke={`rgba(${rgb},0.065)`} />
          </g>
        ))}

        <g fill="rgba(148,163,184,0.09)" fontFamily="monospace" fontSize="10" letterSpacing="1.7">
          <text x="94" y="96">BIOINFORMATICS / SEQUENCE → STRUCTURE → FUNCTION</text>
          <text x="1175" y="905">ALIGN · ANNOTATE · INFER</text>
        </g>
      </svg>

      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(52,211,153,0.020)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.018)_1px,transparent_1px)] [background-size:64px_64px]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(3,9,7,0.02),rgba(3,9,7,0.32)_56%,rgba(3,9,7,0.90))]" />
    </div>
  );
}
