export default function PerformingArtsBackground() {
  const lightPositions = [285, 430, 575, 720, 865, 1010, 1155];
  const seats = Array.from({ length: 7 }, (_, row) => Array.from({ length: 14 }, (_, col) => ({ row, col })));

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#070505]" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_58%_40%,rgba(251,191,36,0.06),transparent_30%),radial-gradient(circle_at_28%_60%,rgba(244,63,94,0.04),transparent_28%),linear-gradient(180deg,#080505_0%,#070505_46%,#030303_100%)]" />
      <svg className="absolute inset-[6%_1%_3%_1%] h-[91%] w-[98%] opacity-95" viewBox="0 0 1440 820" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="stage-floor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="rgba(120,53,15,0.10)" />
            <stop offset="1" stopColor="rgba(20,10,8,0.32)" />
          </linearGradient>
          <linearGradient id="followspot" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="rgba(254,240,138,0.00)" />
            <stop offset="0.42" stopColor="rgba(254,240,138,0.07)" />
            <stop offset="1" stopColor="rgba(254,240,138,0.00)" />
          </linearGradient>
        </defs>

        <rect x="108" y="92" width="1224" height="512" rx="3" fill="rgba(0,0,0,0.10)" stroke="rgba(251,191,36,0.075)" />
        <text x="132" y="75" fill="rgba(251,191,36,0.23)" fontSize="12" fontFamily="monospace">LIVE PERFORMANCE SPACE · STAGE / WINGS / LIGHT / CUES / AUDIENCE</text>

        <g opacity="0.9">
          <rect x="132" y="112" width="1176" height="420" fill="rgba(0,0,0,0.16)" stroke="rgba(244,63,94,0.08)" />
          <path d="M172 112v420M1268 112v420" stroke="rgba(244,63,94,0.13)" strokeWidth="26" />
          <path d="M204 112v420M1236 112v420" stroke="rgba(244,63,94,0.065)" strokeWidth="12" />
          <path d="M238 112v420M1202 112v420" stroke="rgba(244,63,94,0.045)" strokeWidth="7" />
          <text x="150" y="550" fill="rgba(244,63,94,0.20)" fontSize="10" fontFamily="monospace">STAGE LEFT WING</text>
          <text x="1178" y="550" fill="rgba(244,63,94,0.20)" fontSize="10" fontFamily="monospace">STAGE RIGHT WING</text>
        </g>

        <g>
          <path d="M240 516L1200 516L1290 606H150Z" fill="url(#stage-floor)" stroke="rgba(251,191,36,0.10)" />
          {[0, 1, 2, 3].map((row) => <path key={row} d={`M${218 - row * 18} ${532 + row * 18}H${1222 + row * 18}`} stroke="rgba(251,191,36,0.045)" />)}
          {[0, 1, 2, 3, 4].map((col) => <path key={col} d={`M${368 + col * 175} 516L${340 + col * 190} 606`} stroke="rgba(251,191,36,0.04)" />)}
          {[
            [430, 548, "SL"], [720, 548, "C"], [1010, 548, "SR"],
            [500, 582, "DS-L"], [720, 582, "DS-C"], [940, 582, "DS-R"],
          ].map(([x, y, label]) => <g key={String(label)} transform={`translate(${x} ${y})`}><circle r="8" fill="rgba(251,191,36,0.035)" stroke="rgba(251,191,36,0.12)" /><text x="0" y="23" textAnchor="middle" fill="rgba(251,191,36,0.18)" fontSize="9" fontFamily="monospace">{String(label)}</text></g>)}
        </g>

        <g>
          <line x1="248" y1="150" x2="1192" y2="150" stroke="rgba(125,211,252,0.12)" strokeWidth="3" />
          <line x1="248" y1="202" x2="1192" y2="202" stroke="rgba(125,211,252,0.075)" />
          {lightPositions.map((x, index) => <g key={x} transform={`translate(${x} 150)`}><path d="M0 0v34" stroke="rgba(125,211,252,0.12)" /><rect x="-14" y="33" width="28" height="17" rx="4" fill={index % 2 ? "rgba(244,63,94,0.06)" : "rgba(251,191,36,0.06)"} stroke="rgba(125,211,252,0.12)" /><path d="M-8 50l-38 168M8 50l38 168" fill="none" stroke={index % 2 ? "rgba(244,63,94,0.035)" : "rgba(251,191,36,0.035)"} /></g>)}
          <text x="250" y="133" fill="rgba(125,211,252,0.20)" fontSize="10" fontFamily="monospace">LIGHTING PIPE / CUE STATES</text>
        </g>

        <g opacity="0.86">
          {[0, 1, 2, 3, 4, 5].map((line) => <g key={line}><line x1={330 + line * 152} y1="94" x2={330 + line * 152} y2="244" stroke="rgba(167,139,250,0.07)" /><rect x={318 + line * 152} y="236" width="24" height="9" fill="rgba(167,139,250,0.05)" stroke="rgba(167,139,250,0.10)" /></g>)}
          <text x="1038" y="112" fill="rgba(167,139,250,0.18)" fontSize="9" fontFamily="monospace">FLY / RIGGING</text>
        </g>

        <g transform="translate(123 250)">
          <rect width="76" height="212" rx="6" fill="rgba(0,0,0,0.14)" stroke="rgba(52,211,153,0.08)" />
          <text x="38" y="-11" textAnchor="middle" fill="rgba(52,211,153,0.19)" fontSize="9" fontFamily="monospace">CUE RAIL</text>
          {["LX 12", "SND 4", "ENT B", "FLY 2", "LX 13"].map((cue, index) => <g key={cue} transform={`translate(11 ${20 + index * 35})`}><circle cx="4" cy="5" r="4" fill={index === 2 ? "rgba(52,211,153,0.20)" : "rgba(148,163,184,0.09)"} /><text x="17" y="9" fill={index === 2 ? "rgba(110,231,183,0.23)" : "rgba(148,163,184,0.13)"} fontSize="8" fontFamily="monospace">{cue}</text></g>)}
        </g>

        <g transform="translate(720 663)">
          {seats.map((row, rowIndex) => row.map(({ col }) => {
            const spread = 50 + rowIndex * 9;
            const x = (col - 6.5) * spread;
            const y = rowIndex * 23;
            return <g key={`${rowIndex}-${col}`} transform={`translate(${x} ${y})`}><circle r="5" fill="rgba(226,232,240,0.05)" /><path d="M-7 8h14" stroke="rgba(226,232,240,0.04)" /></g>;
          }))}
          <text x="0" y="183" textAnchor="middle" fill="rgba(226,232,240,0.14)" fontSize="10" fontFamily="monospace">AUDIENCE / SIGHTLINES / SHARED TIME</text>
        </g>

        <g className="animate-[followspot-sweep_36s_ease-in-out_infinite_alternate] motion-reduce:animate-none" transform="translate(370 160)">
          <path d="M0 0L-135 395H135Z" fill="url(#followspot)" />
          <ellipse cx="0" cy="400" rx="105" ry="30" fill="rgba(254,240,138,0.035)" stroke="rgba(254,240,138,0.08)" />
        </g>
      </svg>
      <style>{`@keyframes followspot-sweep { from { transform: translate(370px,160px); } to { transform: translate(1030px,160px); } }`}</style>
      <div className="absolute inset-x-0 top-0 h-[16%] bg-gradient-to-b from-[#070505] via-[#070505]/80 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[19%] bg-gradient-to-t from-[#030303] via-[#030303]/88 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_34%,rgba(2,2,2,0.72)_100%)]" />
    </div>
  );
}
