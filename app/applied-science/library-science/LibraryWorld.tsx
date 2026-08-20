export default function LibraryWorld() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#05090d]" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_42%,rgba(34,211,238,0.07),transparent_33%),radial-gradient(circle_at_18%_70%,rgba(167,139,250,0.035),transparent_29%),linear-gradient(145deg,#05090d_0%,#070910_52%,#08070d_100%)]" />
      <svg className="absolute inset-[9%_2%_11%_2%] h-[80%] w-[96%] opacity-90" viewBox="0 0 1440 740" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="library-grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M48 0H0V48" fill="none" stroke="rgba(34,211,238,0.035)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect x="18" y="18" width="1404" height="704" fill="url(#library-grid)" stroke="rgba(34,211,238,0.055)" />
        <text x="70" y="82" fill="rgba(103,232,249,0.27)" fontSize="13" fontFamily="monospace">COLLECTION STEWARDSHIP · ACQUIRE / DESCRIBE / ORGANIZE / PRESERVE / DISCOVER / ACCESS</text>

        <g transform="translate(70 145)">
          <text x="0" y="0" fill="rgba(103,232,249,0.25)" fontSize="11" fontFamily="monospace">CIRCULATING STACKS</text>
          {[0, 1, 2, 3].map((bay) => (
            <g key={bay} transform={`translate(${bay * 132} 30)`}>
              <rect width="112" height="395" rx="5" fill="rgba(255,255,255,0.012)" stroke="rgba(103,232,249,0.09)" />
              {[0, 1, 2, 3, 4].map((shelf) => <line key={shelf} x1="8" x2="104" y1={62 + shelf * 68} y2={62 + shelf * 68} stroke="rgba(103,232,249,0.085)" />)}
              {Array.from({ length: 26 }, (_, index) => {
                const row = Math.floor(index / 6);
                const col = index % 6;
                const height = 28 + ((index * 13 + bay * 7) % 20);
                return <rect key={index} x={12 + col * 15} y={58 + row * 68 - height} width="10" height={height} fill={index % 5 === 0 ? "rgba(167,139,250,0.10)" : "rgba(103,232,249,0.075)"} stroke="rgba(255,255,255,0.035)" />;
              })}
              <text x="56" y="382" textAnchor="middle" fill="rgba(148,163,184,0.14)" fontSize="9" fontFamily="monospace">RANGE {bay + 1}</text>
            </g>
          ))}
        </g>

        <g transform="translate(660 188)">
          <text x="0" y="0" fill="rgba(251,191,36,0.25)" fontSize="11" fontFamily="monospace">REFERENCE / SERVICE DESK</text>
          <path d="M0 235h280l-24-112H27Z" fill="rgba(251,191,36,0.018)" stroke="rgba(251,191,36,0.11)" />
          <rect x="46" y="46" width="190" height="72" rx="6" fill="rgba(0,0,0,0.12)" stroke="rgba(103,232,249,0.10)" />
          <rect x="66" y="62" width="150" height="8" rx="4" fill="rgba(103,232,249,0.07)" />
          <rect x="66" y="79" width="104" height="8" rx="4" fill="rgba(167,139,250,0.07)" />
          <rect x="66" y="96" width="133" height="8" rx="4" fill="rgba(103,232,249,0.06)" />
          <g transform="translate(73 150) rotate(-3)">
            <rect width="128" height="68" rx="4" fill="rgba(250,250,249,0.025)" stroke="rgba(250,250,249,0.10)" />
            <text x="10" y="18" fill="rgba(250,250,249,0.17)" fontSize="9" fontFamily="monospace">REQUEST</text>
            <line x1="10" y1="28" x2="112" y2="28" stroke="rgba(250,250,249,0.08)" />
            <line x1="10" y1="40" x2="92" y2="40" stroke="rgba(250,250,249,0.065)" />
            <line x1="10" y1="52" x2="104" y2="52" stroke="rgba(250,250,249,0.065)" />
          </g>
        </g>

        <g transform="translate(1000 145)">
          <text x="0" y="0" fill="rgba(167,139,250,0.25)" fontSize="11" fontFamily="monospace">ARCHIVE / SPECIAL COLLECTIONS</text>
          {[0, 1, 2].map((row) => [0, 1, 2].map((col) => <g key={`${row}-${col}`} transform={`translate(${col * 102} ${36 + row * 78})`}><rect width="88" height="62" rx="3" fill="rgba(167,139,250,0.022)" stroke="rgba(167,139,250,0.10)" /><rect x="18" y="19" width="52" height="17" fill="rgba(245,245,244,0.018)" stroke="rgba(245,245,244,0.07)" /><text x="44" y="31" textAnchor="middle" fill="rgba(214,211,209,0.13)" fontSize="8" fontFamily="monospace">BOX {row + 1}.{col + 1}</text></g>))}
          <text x="0" y="302" fill="rgba(52,211,153,0.22)" fontSize="11" fontFamily="monospace">PRESERVATION BENCH</text>
          <rect x="0" y="319" width="292" height="96" rx="5" fill="rgba(52,211,153,0.015)" stroke="rgba(52,211,153,0.08)" />
          <path d="M36 367h78M142 346h106M142 364h82M142 382h96" stroke="rgba(52,211,153,0.10)" />
        </g>

        <g transform="translate(645 520)">
          <text x="0" y="0" fill="rgba(96,165,250,0.25)" fontSize="11" fontFamily="monospace">DIGITAL REPOSITORY</text>
          <rect x="0" y="20" width="320" height="118" rx="8" fill="rgba(0,0,0,0.13)" stroke="rgba(96,165,250,0.10)" />
          {[0, 1, 2].map((row) => <g key={row} transform={`translate(18 ${39 + row * 28})`}><circle cx="5" cy="5" r="5" fill={row === 2 ? "rgba(52,211,153,0.14)" : "rgba(96,165,250,0.13)"} /><rect x="20" y="0" width={170 + row * 28} height="10" rx="5" fill="rgba(96,165,250,0.055)" /><text x="270" y="9" fill="rgba(148,163,184,0.13)" fontSize="8" fontFamily="monospace">FIXITY OK</text></g>)}
        </g>

        <path d="M790 350C660 430 540 438 430 403S230 394 168 431" fill="none" stroke="rgba(251,191,36,0.09)" strokeDasharray="6 9" />
        <path d="M800 438C865 501 912 531 1006 550" fill="none" stroke="rgba(96,165,250,0.08)" strokeDasharray="5 8" />
        <g className="animate-[request-slip_40s_ease-in-out_infinite_alternate] motion-reduce:animate-none" transform="translate(790 350)">
          <rect x="-12" y="-8" width="24" height="16" rx="2" fill="rgba(251,191,36,0.52)" />
          <line x1="-8" x2="7" y1="-2" y2="-2" stroke="rgba(5,9,13,0.50)" />
          <line x1="-8" x2="4" y1="3" y2="3" stroke="rgba(5,9,13,0.50)" />
        </g>
      </svg>
      <style>{`@keyframes request-slip { from { transform: translate(790px,350px); } to { transform: translate(168px,431px); } }`}</style>
      <div className="absolute inset-x-0 top-0 h-[20%] bg-gradient-to-b from-[#05090d] via-[#05090d]/82 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[22%] bg-gradient-to-t from-[#05090d] via-[#05090d]/84 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_34%,rgba(3,6,9,0.72)_100%)]" />
    </div>
  );
}
