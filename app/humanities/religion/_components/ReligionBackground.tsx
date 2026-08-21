export default function ReligionBackground() {
  const archiveLines = [248, 288, 328, 368] as const;
  const lensRays = [
    [0, -214, "#fbbf24"],
    [167, -134, "#7dd3fc"],
    [208, 48, "#c084fc"],
    [92, 193, "#f472b6"],
    [-92, 193, "#5eead4"],
    [-208, 48, "#60a5fa"],
    [-167, -134, "#fb923c"],
  ] as const;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#130b09]"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1600 1000"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="religion-ground" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#130b09" />
            <stop offset="0.48" stopColor="#21120d" />
            <stop offset="1" stopColor="#0b0a13" />
          </linearGradient>
          <radialGradient id="religion-lamp" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#fbbf24" stopOpacity="0.13" />
            <stop offset="0.46" stopColor="#f472b6" stopOpacity="0.035" />
            <stop offset="1" stopColor="#0b0a13" stopOpacity="0" />
          </radialGradient>
          <pattern
            id="religion-paper"
            width="84"
            height="84"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M84 0H0V84"
              fill="none"
              stroke="#fde68a"
              strokeOpacity="0.025"
            />
          </pattern>
        </defs>

        <rect width="1600" height="1000" fill="url(#religion-ground)" />
        <rect width="1600" height="1000" fill="url(#religion-paper)" />

        <g opacity="0.68">
          <path
            d="M86 194H380V570H86Z"
            fill="#120b09"
            fillOpacity="0.26"
            stroke="#fbbf24"
            strokeOpacity="0.12"
          />
          {archiveLines.map((y, index) => (
            <g key={y}>
              <rect
                x="112"
                y={y}
                width="232"
                height="26"
                rx="7"
                fill={index % 2 === 0 ? "#fbbf24" : "#c084fc"}
                fillOpacity="0.025"
                stroke={index % 2 === 0 ? "#fbbf24" : "#c084fc"}
                strokeOpacity="0.12"
              />
              <path
                d={`M130 ${y + 13}H${index % 2 === 0 ? 270 : 312}`}
                stroke="#fafaf9"
                strokeOpacity="0.11"
                strokeWidth="6"
                strokeLinecap="round"
              />
            </g>
          ))}
          <rect
            x="112"
            y="438"
            width="102"
            height="92"
            rx="12"
            fill="#5eead4"
            fillOpacity="0.025"
            stroke="#5eead4"
            strokeOpacity="0.14"
          />
          <path
            d="M132 500L152 476L174 490L196 462"
            fill="none"
            stroke="#5eead4"
            strokeOpacity="0.2"
          />
          <rect
            x="230"
            y="438"
            width="114"
            height="92"
            rx="12"
            fill="#7dd3fc"
            fillOpacity="0.025"
            stroke="#7dd3fc"
            strokeOpacity="0.14"
          />
          <path
            d="M246 484C256 464 266 504 276 484S296 464 306 484S326 504 334 484"
            fill="none"
            stroke="#7dd3fc"
            strokeOpacity="0.2"
          />
          <path
            d="M380 268C482 268 488 384 578 384M380 340C478 340 500 424 578 424M380 482C478 482 506 466 578 466"
            fill="none"
            stroke="#fde68a"
            strokeOpacity="0.09"
            strokeDasharray="6 10"
          />
        </g>

        <g transform="translate(820 426)">
          <circle r="286" fill="url(#religion-lamp)" />
          <circle
            r="220"
            fill="#160d0b"
            fillOpacity="0.09"
            stroke="#fde68a"
            strokeOpacity="0.16"
          />
          <circle r="154" fill="none" stroke="#d8b4fe" strokeOpacity="0.12" />
          <circle
            r="88"
            fill="#1d120e"
            fillOpacity="0.32"
            stroke="#fbbf24"
            strokeOpacity="0.18"
          />
          {lensRays.map(([x, y, color], index) => (
            <g key={index}>
              <path
                d={`M${x * 0.42} ${y * 0.42}L${x} ${y}`}
                stroke={color}
                strokeOpacity="0.16"
              />
              <circle
                cx={x}
                cy={y}
                r="9"
                fill={color}
                fillOpacity="0.11"
                stroke={color}
                strokeOpacity="0.26"
              />
            </g>
          ))}
          <path
            d="M-45 -18H45M-32 7H32M-20 31H20"
            stroke="#fff7ed"
            strokeOpacity="0.18"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </g>

        <g opacity="0.62">
          <rect
            x="1180"
            y="206"
            width="328"
            height="398"
            rx="24"
            fill="#0f0a10"
            fillOpacity="0.25"
            stroke="#c084fc"
            strokeOpacity="0.12"
          />
          <path
            d="M1214 258H1456M1214 310H1396M1214 362H1440M1214 414H1364"
            stroke="#fafaf9"
            strokeOpacity="0.1"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <rect
            x="1214"
            y="468"
            width="242"
            height="96"
            rx="16"
            fill="#f472b6"
            fillOpacity="0.025"
            stroke="#f472b6"
            strokeOpacity="0.14"
          />
          <path d="M1240 518H1430" stroke="#f472b6" strokeOpacity="0.2" />
          <path
            d="M1064 366C1124 366 1128 258 1180 258M1060 426H1180M1064 486C1124 486 1128 518 1180 518"
            fill="none"
            stroke="#d8b4fe"
            strokeOpacity="0.09"
            strokeDasharray="6 10"
          />
        </g>

        <path
          d="M60 716H1540M140 758H1460M240 800H1360"
          stroke="#fde68a"
          strokeOpacity="0.035"
        />
      </svg>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(19,11,9,0.22),transparent_28%,transparent_76%,rgba(11,10,19,0.26))]" />
      <div className="from-[#120b09]/88 absolute inset-x-0 top-0 h-[18%] bg-gradient-to-b to-transparent" />
      <div className="from-[#120b09]/88 absolute inset-x-0 bottom-0 h-[20%] bg-gradient-to-t to-transparent" />
    </div>
  );
}
