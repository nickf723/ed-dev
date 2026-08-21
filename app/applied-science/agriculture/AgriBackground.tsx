const FIELD_LABELS = [
  { x: 874, y: 263, label: "GRAIN" },
  { x: 1086, y: 180, label: "COVER" },
  { x: 1029, y: 341, label: "ORCHARD" },
  { x: 1247, y: 258, label: "PASTURE" },
  { x: 1191, y: 422, label: "RESIDUE" },
] as const;

export default function AgriBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#11170d]"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1600 1000"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="agri-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#101b11" />
            <stop offset="0.54" stopColor="#1a2616" />
            <stop offset="1" stopColor="#17130c" />
          </linearGradient>
          <radialGradient id="agri-light" cx="76%" cy="18%" r="64%">
            <stop offset="0" stopColor="#fde68a" stopOpacity="0.10" />
            <stop offset="0.46" stopColor="#86efac" stopOpacity="0.025" />
            <stop offset="1" stopColor="#000" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="agri-soil" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3b2a17" stopOpacity="0.82" />
            <stop offset="1" stopColor="#120d08" stopOpacity="0.96" />
          </linearGradient>
          <pattern
            id="grain-rows"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(28)"
          >
            <path d="M 3 0 V 20" stroke="#facc15" strokeOpacity="0.25" />
          </pattern>
          <pattern
            id="cover-rows"
            width="13"
            height="13"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(28)"
          >
            <path d="M 2 0 V 13" stroke="#4ade80" strokeOpacity="0.22" />
          </pattern>
          <pattern
            id="residue-lines"
            width="22"
            height="22"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(28)"
          >
            <path
              d="M 4 0 V 10"
              stroke="#fb923c"
              strokeOpacity="0.16"
              strokeDasharray="4 5"
            />
          </pattern>
          <filter id="agri-soft">
            <feGaussianBlur stdDeviation="28" />
          </filter>
        </defs>

        <rect width="1600" height="1000" fill="url(#agri-sky)" />
        <rect width="1600" height="1000" fill="url(#agri-light)" />
        <ellipse
          cx="1210"
          cy="230"
          rx="330"
          ry="130"
          fill="#bef264"
          opacity="0.025"
          filter="url(#agri-soft)"
        />

        <g opacity="0.76">
          <path
            d="M 650 254 L 1100 80 L 1585 300 L 1115 492 Z"
            fill="#392f18"
            stroke="#d9f99d"
            strokeOpacity="0.10"
          />

          <Field
            points="690,268 914,181 1061,247 832,338"
            fill="#665522"
            pattern="url(#grain-rows)"
          />
          <Field
            points="927,176 1101,109 1247,175 1068,243"
            fill="#234522"
            pattern="url(#cover-rows)"
          />
          <Field points="835,346 1069,255 1226,326 984,420" fill="#26381e" />
          <Field points="1078,251 1258,182 1418,255 1233,324" fill="#314421" />
          <Field
            points="991,428 1235,334 1394,406 1144,503"
            fill="#4a351d"
            pattern="url(#residue-lines)"
          />
          <Field
            points="1244,331 1428,260 1558,319 1370,392"
            fill="#23381e"
            pattern="url(#cover-rows)"
          />

          <path
            d="M 1228 176 L 1249 183 L 1110 492 L 1085 481 Z"
            fill="#a8a29e"
            opacity="0.12"
            stroke="#e7e5e4"
            strokeOpacity="0.12"
          />

          <Hedgerow x1={818} y1={341} x2={1228} y2={176} />
          <Hedgerow x1={984} y1={420} x2={1418} y2={255} />
          <Hedgerow x1={1144} y1={503} x2={1394} y2={406} />

          <g>
            {[0, 1, 2, 3].flatMap((row) =>
              [0, 1, 2, 3, 4].map((column) => {
                const x = 867 + column * 38 + row * 10;
                const y = 349 + row * 17 - column * 14;
                return (
                  <g key={`${row}-${column}`}>
                    <path
                      d={`M ${x} ${y + 11} V ${y - 6}`}
                      stroke="#78350f"
                      strokeOpacity="0.48"
                    />
                    <circle
                      cx={x}
                      cy={y - 10}
                      r="8"
                      fill="#4ade80"
                      opacity="0.21"
                    />
                  </g>
                );
              })
            )}
          </g>

          <g>
            <path
              d="M 1345 199 L 1450 158 L 1518 189 L 1411 231 Z"
              fill="#7dd3fc"
              fillOpacity="0.055"
              stroke="#bae6fd"
              strokeOpacity="0.28"
            />
            <path
              d="M 1345 199 V 145 L 1450 104 L 1518 135 V 189"
              fill="#7dd3fc"
              fillOpacity="0.035"
              stroke="#bae6fd"
              strokeOpacity="0.23"
            />
            <path
              d="M 1345 145 L 1397 91 L 1450 104 L 1484 82 L 1518 135"
              fill="none"
              stroke="#bae6fd"
              strokeOpacity="0.28"
            />
            <text
              x="1458"
              y="106"
              fill="#bae6fd"
              fillOpacity="0.40"
              fontSize="11"
              letterSpacing="2"
            >
              PROTECTED CULTURE
            </text>
          </g>

          <g>
            <path
              d="M 1450 375 L 1530 344 L 1583 368 L 1501 401 Z"
              fill="#0e7490"
              fillOpacity="0.35"
              stroke="#67e8f9"
              strokeOpacity="0.22"
            />
            <ellipse
              cx="1517"
              cy="371"
              rx="34"
              ry="10"
              fill="none"
              stroke="#a5f3fc"
              strokeOpacity="0.16"
            />
            <text
              x="1517"
              y="421"
              textAnchor="middle"
              fill="#67e8f9"
              fillOpacity="0.42"
              fontSize="11"
              letterSpacing="2"
            >
              POND
            </text>
          </g>

          <g>
            <rect
              x="1302"
              y="431"
              width="58"
              height="58"
              fill="#78350f"
              fillOpacity="0.42"
              stroke="#fed7aa"
              strokeOpacity="0.17"
            />
            <path
              d="M 1293 431 L 1331 391 L 1369 431 Z"
              fill="#7f1d1d"
              fillOpacity="0.46"
            />
            <path
              d="M 1323 489 V 457 H 1340 V 489"
              fill="#160b06"
              opacity="0.65"
            />
          </g>

          <path
            d="M 1512 374 L 1393 350 L 1285 297 L 1156 260 L 1027 243"
            fill="none"
            stroke="#22d3ee"
            strokeOpacity="0.18"
            strokeWidth="5"
          />
          <g fill="#e7e5e4" fillOpacity="0.28">
            <rect x="1157" y="355" width="17" height="9" />
            <rect x="1213" y="381" width="17" height="9" />
            <rect x="1266" y="348" width="17" height="9" />
          </g>

          {FIELD_LABELS.map((item) => (
            <text
              key={item.label}
              x={item.x}
              y={item.y}
              fill="#f7fee7"
              fillOpacity="0.34"
              fontSize="11"
              letterSpacing="2.5"
              textAnchor="middle"
            >
              {item.label}
            </text>
          ))}
        </g>

        <g opacity="0.64">
          <path
            d="M 0 720 C 305 671 550 754 792 708 C 1058 658 1285 703 1600 649 V 1000 H 0 Z"
            fill="url(#agri-soil)"
          />
          <path
            d="M 0 721 C 305 672 550 755 792 709 C 1058 659 1285 704 1600 650"
            fill="none"
            stroke="#bef264"
            strokeOpacity="0.14"
          />
          <g
            fill="none"
            stroke="#d9f99d"
            strokeOpacity="0.08"
            strokeWidth="1.5"
          >
            <path d="M 1000 687 C 982 749 1024 790 998 872 C 986 911 1003 950 993 1000" />
            <path d="M 1021 740 C 1062 775 1053 826 1097 866" />
            <path d="M 988 805 C 944 831 925 873 887 903" />
            <path d="M 1296 672 C 1270 743 1312 801 1279 886 C 1267 922 1289 965 1280 1000" />
            <path d="M 1282 785 C 1235 812 1218 851 1185 884" />
            <path d="M 1300 759 C 1344 790 1344 837 1382 864" />
          </g>
          <g fill="#facc15" fillOpacity="0.10">
            <circle cx="1005" cy="822" r="4" />
            <circle cx="956" cy="874" r="3" />
            <circle cx="1090" cy="858" r="3" />
            <circle cx="1283" cy="842" r="4" />
            <circle cx="1226" cy="897" r="3" />
          </g>
          <text
            x="90"
            y="790"
            fill="#d6d3d1"
            fillOpacity="0.22"
            fontSize="12"
            letterSpacing="3"
          >
            SOIL PROFILE · ROOT ZONE · WATER · ORGANIC MATTER · NUTRIENT
            PATHWAYS
          </text>
        </g>

        <g
          fill="none"
          stroke="#d9f99d"
          strokeOpacity="0.035"
          strokeDasharray="8 24"
        >
          <path d="M 0 160 H 540" />
          <path d="M 60 208 H 420" />
          <path d="M 118 576 H 570" />
        </g>
      </svg>
      <div className="from-[#10170d]/88 absolute inset-x-0 top-0 h-[16%] bg-gradient-to-b to-transparent" />
      <div className="from-[#12100a]/92 absolute inset-x-0 bottom-0 h-[18%] bg-gradient-to-t to-transparent" />
      <div className="from-[#11170d]/72 absolute inset-y-0 left-0 w-[24%] bg-gradient-to-r to-transparent" />
    </div>
  );
}

function Field({
  points,
  fill,
  pattern,
}: {
  points: string;
  fill: string;
  pattern?: string;
}) {
  return (
    <g>
      <polygon
        points={points}
        fill={fill}
        stroke="#fff"
        strokeOpacity="0.055"
      />
      {pattern ? <polygon points={points} fill={pattern} /> : null}
    </g>
  );
}

function Hedgerow({
  x1,
  y1,
  x2,
  y2,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}) {
  const count = 15;
  return (
    <g>
      {Array.from({ length: count }, (_, index) => {
        const t = index / (count - 1);
        return (
          <circle
            key={index}
            cx={x1 + (x2 - x1) * t}
            cy={y1 + (y2 - y1) * t - 3}
            r={index % 2 === 0 ? 7 : 5}
            fill={index % 2 === 0 ? "#4ade80" : "#22c55e"}
            opacity={index % 2 === 0 ? 0.18 : 0.13}
          />
        );
      })}
    </g>
  );
}
