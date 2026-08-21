const RAIN_MARKS = [
  [805, 210],
  [842, 232],
  [879, 202],
  [916, 228],
  [953, 198],
  [990, 222],
] as const;

const STATIONS = [
  { x: 360, y: 584, id: "G-01", tone: "#fb923c" },
  { x: 714, y: 562, id: "H-02", tone: "#38bdf8" },
  { x: 1058, y: 476, id: "M-03", tone: "#7dd3fc" },
  { x: 1284, y: 625, id: "C-04", tone: "#fca5a5" },
] as const;

export default function EarthSystemsBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#02090d]"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1600 1100"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="earth-system-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#061927" />
            <stop offset="0.55" stopColor="#06202a" />
            <stop offset="1" stopColor="#071314" />
          </linearGradient>
          <linearGradient id="earth-system-ocean" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0ea5e9" stopOpacity="0.16" />
            <stop offset="1" stopColor="#082f49" stopOpacity="0.42" />
          </linearGradient>
          <linearGradient id="earth-system-ground" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#29452e" stopOpacity="0.58" />
            <stop offset="0.18" stopColor="#3f2c1f" stopOpacity="0.66" />
            <stop offset="1" stopColor="#120e0d" stopOpacity="0.92" />
          </linearGradient>
          <radialGradient id="earth-system-sun" cx="0" cy="0" r="1">
            <stop offset="0" stopColor="#fde68a" stopOpacity="0.23" />
            <stop offset="1" stopColor="#fde68a" stopOpacity="0" />
          </radialGradient>
          <pattern id="earth-system-grid" width="64" height="64" patternUnits="userSpaceOnUse">
            <path d="M64 0H0V64" fill="none" stroke="#bae6fd" strokeOpacity="0.025" />
          </pattern>
        </defs>

        <rect width="1600" height="1100" fill="url(#earth-system-sky)" />
        <rect width="1600" height="1100" fill="url(#earth-system-grid)" />
        <circle cx="1320" cy="90" r="410" fill="url(#earth-system-sun)" />

        <g opacity="0.48">
          <path d="M0 574L140 536L252 460L354 520L474 388L598 506L714 474L846 552L954 468L1104 564L1242 534L1392 604L1600 578V1100H0Z" fill="url(#earth-system-ground)" />
          <path d="M0 574L140 536L252 460L354 520L474 388L598 506L714 474L846 552L954 468L1104 564L1242 534L1392 604L1600 578" fill="none" stroke="#a7f3d0" strokeOpacity="0.36" strokeWidth="2" />
          <path d="M0 680C250 620 370 720 610 646S1000 698 1220 636S1460 676 1600 642" fill="none" stroke="#fdba74" strokeOpacity="0.20" />
          <path d="M0 754C240 694 430 792 650 712S1000 766 1240 704S1470 740 1600 718" fill="none" stroke="#fda4af" strokeOpacity="0.15" />
          <path d="M0 832C230 770 440 858 676 788S1040 826 1270 772S1490 804 1600 786" fill="none" stroke="#c4b5fd" strokeOpacity="0.12" />
        </g>

        <g opacity="0.46">
          <path d="M474 388L430 478L514 478Z" fill="#e0f2fe" fillOpacity="0.30" />
          <path d="M954 468L918 526L995 526Z" fill="#e0f2fe" fillOpacity="0.20" />
          <path d="M476 430C548 470 588 520 626 584C666 650 740 642 802 612C894 568 978 590 1080 628" fill="none" stroke="#38bdf8" strokeOpacity="0.46" strokeWidth="9" />
          <path d="M476 430C548 470 588 520 626 584C666 650 740 642 802 612C894 568 978 590 1080 628" fill="none" stroke="#bae6fd" strokeOpacity="0.22" strokeWidth="2" />
          <path d="M1080 628C1220 646 1340 616 1600 636V786H1118C1138 718 1126 672 1080 628Z" fill="url(#earth-system-ocean)" />
          <path d="M1120 664C1240 650 1370 670 1580 654M1140 700C1270 686 1400 708 1580 690" fill="none" stroke="#7dd3fc" strokeOpacity="0.17" />
        </g>

        <g opacity="0.46">
          <path d="M720 202C754 162 810 170 836 202C872 166 940 180 948 226C998 218 1022 254 1002 286H732C696 268 694 228 720 202Z" fill="#e0f2fe" fillOpacity="0.10" stroke="#bae6fd" strokeOpacity="0.20" />
          {RAIN_MARKS.map(([x, y], index) => (
            <path key={`${x}-${y}`} d={`M${x} ${y + 86}l-${8 + (index % 2) * 3} 34`} stroke="#7dd3fc" strokeOpacity="0.38" strokeWidth="2" />
          ))}
          <path d="M1040 168C1120 120 1236 124 1320 164" fill="none" stroke="#fde68a" strokeOpacity="0.17" strokeDasharray="10 14" />
          <path d="M1288 152L1320 164L1294 184" fill="none" stroke="#fde68a" strokeOpacity="0.17" />
        </g>

        <g opacity="0.52">
          <path d="M528 610C600 672 722 720 850 706C970 694 1022 646 1084 624" fill="none" stroke="#60a5fa" strokeOpacity="0.24" strokeDasharray="8 10" />
          <text x="612" y="696" fill="#93c5fd" fillOpacity="0.42" fontSize="11" letterSpacing="2">GROUNDWATER PATH</text>
          <path d="M326 780L492 704L658 770L824 694L990 764" fill="none" stroke="#fb923c" strokeOpacity="0.20" />
          <path d="M492 704L476 780" stroke="#fb7185" strokeOpacity="0.26" strokeWidth="4" />
          <path d="M470 770L478 782L486 768" fill="none" stroke="#fb7185" strokeOpacity="0.34" />
        </g>

        {STATIONS.map((station) => (
          <g key={station.id} transform={`translate(${station.x} ${station.y})`} opacity="0.62">
            <circle r="12" fill="#02090d" stroke={station.tone} strokeOpacity="0.52" />
            <circle r="3" fill={station.tone} fillOpacity="0.72" />
            <path d="M0 12V38" stroke={station.tone} strokeOpacity="0.36" strokeDasharray="4 5" />
            <text x="18" y="4" fill={station.tone} fillOpacity="0.62" fontSize="10" letterSpacing="2">{station.id}</text>
          </g>
        ))}

        <g transform="translate(86 914)" opacity="0.40">
          <text fill="#bae6fd" fillOpacity="0.64" fontSize="11" letterSpacing="3">RIDGE → CHANNEL → COAST / FIELD TRANSECT</text>
          <path d="M0 24H640" stroke="#bae6fd" strokeOpacity="0.15" />
          <text y="52" fill="#94a3b8" fillOpacity="0.52" fontSize="10" letterSpacing="2">AIR · WATER · ROCK · ICE · LIFE · TIME</text>
        </g>
      </svg>

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,9,13,0.36),transparent_34%,transparent_72%,rgba(2,9,13,0.42))]" />
      <div className="absolute inset-x-0 top-0 h-[18%] bg-gradient-to-b from-[#02090d]/82 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[26%] bg-gradient-to-t from-[#02070a]/90 to-transparent" />
    </div>
  );
}
