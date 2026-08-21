type SectionRoom = {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  open?: boolean;
};

const ROOMS: readonly SectionRoom[] = [
  { x: 348, y: 360, width: 136, height: 88, label: "ENTRY" },
  { x: 484, y: 360, width: 136, height: 88, label: "COMMON" },
  { x: 620, y: 360, width: 136, height: 88, label: "COURT", open: true },
  { x: 756, y: 360, width: 136, height: 88, label: "WORK" },
  { x: 348, y: 272, width: 136, height: 88, label: "STUDIO" },
  { x: 484, y: 272, width: 136, height: 88, label: "STUDIO" },
  { x: 620, y: 272, width: 136, height: 88, label: "VOID", open: true },
  { x: 756, y: 272, width: 136, height: 88, label: "MEET" },
  { x: 348, y: 184, width: 136, height: 88, label: "READ" },
  { x: 484, y: 184, width: 136, height: 88, label: "GALLERY" },
  { x: 620, y: 184, width: 136, height: 88, label: "VOID", open: true },
  { x: 756, y: 184, width: 136, height: 88, label: "QUIET" },
];

export default function BlueprintBackground() {
  return (
    <div
      data-background="architecture-section-sheet"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_64%_42%,rgba(125,211,252,0.085),transparent_38%),radial-gradient(circle_at_22%_72%,rgba(94,234,212,0.045),transparent_30%),linear-gradient(150deg,#061725_0%,#082238_52%,#04101d_100%)]" />
      <svg
        viewBox="0 0 1200 720"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full opacity-[0.78]"
      >
        <defs>
          <pattern
            id="blueprint-minor"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <path d="M32 0H0V32" fill="none" stroke="rgba(186,230,253,0.025)" />
          </pattern>
          <pattern
            id="blueprint-major"
            width="160"
            height="160"
            patternUnits="userSpaceOnUse"
          >
            <rect width="160" height="160" fill="url(#blueprint-minor)" />
            <path
              d="M160 0H0V160"
              fill="none"
              stroke="rgba(186,230,253,0.055)"
            />
          </pattern>
          <linearGradient id="daylight-ray" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="rgba(253,230,138,0.23)" />
            <stop offset="1" stopColor="rgba(253,230,138,0.015)" />
          </linearGradient>
        </defs>

        <rect width="1200" height="720" fill="url(#blueprint-major)" />

        <g opacity="0.78">
          <path
            d="M326 448 V164 H648 L686 124 H914 V448"
            fill="rgba(2,11,20,0.06)"
            stroke="rgba(224,242,254,0.34)"
            strokeWidth="2"
          />
          {ROOMS.map((room, index) => (
            <g key={`${room.x}-${room.y}`}>
              <rect
                x={room.x}
                y={room.y}
                width={room.width}
                height={room.height}
                fill={
                  room.open
                    ? "rgba(56,189,248,0.018)"
                    : index % 3 === 0
                      ? "rgba(251,191,36,0.018)"
                      : "rgba(186,230,253,0.018)"
                }
                stroke={
                  room.open
                    ? "rgba(125,211,252,0.13)"
                    : "rgba(224,242,254,0.24)"
                }
                strokeDasharray={room.open ? "5 7" : undefined}
              />
              <text
                x={room.x + 10}
                y={room.y + 18}
                fill="rgba(224,242,254,0.25)"
                fontSize="9"
                letterSpacing="1.2"
              >
                {room.label}
              </text>
            </g>
          ))}

          <path
            d="M368 438 h18 v-9 h18 v-9 h18 v-9 h18 v-9 h18 v-9 h18 v-9 h18 v-9 h18 v-9 h18 v-9 h18 v-9 h18"
            fill="none"
            stroke="rgba(192,132,252,0.27)"
          />
          <path
            d="M368 350 h18 v-9 h18 v-9 h18 v-9 h18 v-9 h18 v-9 h18 v-9 h18 v-9 h18 v-9 h18 v-9 h18 v-9 h18 v-9 h18"
            fill="none"
            stroke="rgba(192,132,252,0.27)"
          />

          <path d="M688 443 V320" stroke="rgba(94,234,212,0.28)" />
          <circle
            cx="688"
            cy="300"
            r="31"
            fill="rgba(94,234,212,0.04)"
            stroke="rgba(94,234,212,0.19)"
          />
          <circle
            cx="702"
            cy="286"
            r="22"
            fill="rgba(94,234,212,0.025)"
            stroke="rgba(94,234,212,0.12)"
          />
        </g>

        <g opacity="0.66">
          <circle
            cx="1012"
            cy="92"
            r="9"
            fill="rgba(253,230,138,0.12)"
            stroke="rgba(253,230,138,0.36)"
          />
          <path d="M1004 104 L708 448" stroke="url(#daylight-ray)" />
          <path d="M1018 104 L756 448" stroke="url(#daylight-ray)" />
          <path d="M1030 106 L806 448" stroke="url(#daylight-ray)" />
          <path
            d="M646 184 L756 448 L826 448 L706 184 Z"
            fill="rgba(253,230,138,0.024)"
          />
          <text
            x="960"
            y="72"
            fill="rgba(253,230,138,0.32)"
            fontSize="9"
            letterSpacing="1.6"
          >
            DAYLIGHT SECTION
          </text>
        </g>

        <g opacity="0.72">
          {[0, 1, 2, 3, 4].map((index) => (
            <path
              key={index}
              d={`M210 ${472 + index * 15} C350 ${455 + index * 17} 530 ${490 + index * 13} 704 ${468 + index * 16} S984 ${458 + index * 19} 1110 ${488 + index * 12}`}
              fill="none"
              stroke="rgba(94,234,212,0.14)"
            />
          ))}
          <text
            x="346"
            y="470"
            fill="rgba(153,246,228,0.26)"
            fontSize="9"
            letterSpacing="1.2"
          >
            SITE DATUM +0.00
          </text>
        </g>

        <g opacity="0.65">
          <path
            d="M348 536 H892 M348 528 V544 M892 528 V544"
            stroke="rgba(186,230,253,0.2)"
          />
          <text
            x="620"
            y="524"
            fill="rgba(186,230,253,0.27)"
            fontSize="9"
            textAnchor="middle"
            letterSpacing="1.2"
          >
            BUILDING SECTION · 4 BAYS
          </text>
          <path
            d="M948 184 V448 M940 184 H956 M940 272 H956 M940 360 H956 M940 448 H956"
            stroke="rgba(186,230,253,0.18)"
          />
          <text
            x="970"
            y="316"
            fill="rgba(186,230,253,0.25)"
            fontSize="9"
            transform="rotate(90 970 316)"
            textAnchor="middle"
            letterSpacing="1.2"
          >
            3 OCCUPIED LEVELS
          </text>
        </g>

        <g transform="translate(70 282)" opacity="0.7">
          <rect
            width="220"
            height="164"
            fill="rgba(4,17,29,0.18)"
            stroke="rgba(186,230,253,0.16)"
          />
          <text
            x="12"
            y="22"
            fill="rgba(186,230,253,0.28)"
            fontSize="9"
            letterSpacing="1.3"
          >
            LEVEL 01 · PLAN INSET
          </text>
          <rect
            x="18"
            y="38"
            width="184"
            height="106"
            fill="none"
            stroke="rgba(186,230,253,0.16)"
          />
          <path
            d="M88 38V144 M146 38V144 M18 90H146"
            stroke="rgba(186,230,253,0.14)"
          />
          <rect
            x="146"
            y="38"
            width="56"
            height="106"
            fill="rgba(94,234,212,0.025)"
            stroke="rgba(94,234,212,0.22)"
            strokeDasharray="4 5"
          />
          <path
            d="M38 122 C62 104 86 94 112 90 S158 72 184 56"
            fill="none"
            stroke="rgba(251,191,36,0.26)"
            strokeDasharray="5 6"
          />
        </g>

        <g transform="translate(70 500)" opacity="0.64">
          <text fill="rgba(186,230,253,0.29)" fontSize="9" letterSpacing="1.4">
            <tspan x="0" y="0">
              SHEET A-201 · CONCEPT SECTION
            </tspan>
            <tspan x="0" y="18">
              MODEL: SPATIAL COORDINATION
            </tspan>
            <tspan x="0" y="36">
              VERIFY: SITE · ROUTE · LOAD · LIGHT
            </tspan>
          </text>
        </g>

        <g opacity="0.6">
          <path
            d="M416 150 V184 M552 150 V184 M824 150 V184"
            stroke="rgba(244,114,182,0.24)"
          />
          <text
            x="394"
            y="138"
            fill="rgba(244,114,182,0.27)"
            fontSize="9"
            letterSpacing="1.2"
          >
            LOAD
          </text>
          <text
            x="530"
            y="138"
            fill="rgba(244,114,182,0.27)"
            fontSize="9"
            letterSpacing="1.2"
          >
            LOAD
          </text>
          <text
            x="802"
            y="138"
            fill="rgba(244,114,182,0.27)"
            fontSize="9"
            letterSpacing="1.2"
          >
            LOAD
          </text>
        </g>
      </svg>

      <div className="from-[#04111d]/88 absolute inset-x-0 top-0 h-[18%] bg-gradient-to-b to-transparent" />
      <div className="from-[#04111d]/84 absolute inset-x-0 bottom-0 h-[18%] bg-gradient-to-t to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_48%,rgba(1,5,12,0.46)_100%)]" />
    </div>
  );
}
