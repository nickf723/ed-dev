const STAFF_NOTES = [
  { x: 122, y: 176, stem: "up" },
  { x: 214, y: 152, stem: "down" },
  { x: 306, y: 188, stem: "up" },
  { x: 398, y: 140, stem: "down" },
  { x: 490, y: 164, stem: "up" },
] as const;

const WAVE_POINTS = [
  [645, 164],
  [670, 164],
  [682, 130],
  [696, 206],
  [711, 116],
  [728, 190],
  [744, 146],
  [760, 176],
  [778, 154],
  [798, 164],
  [832, 164],
] as const;

const CHANNELS = [
  { label: "theory", x: 118, rgb: "244,114,182", level: 64 },
  { label: "acoustics", x: 246, rgb: "34,211,238", level: 42 },
  { label: "performance", x: 374, rgb: "251,146,60", level: 72 },
  { label: "history", x: 502, rgb: "167,139,250", level: 34 },
  { label: "recordings", x: 630, rgb: "250,204,21", level: 56 },
] as const;

export default function MusicListeningRoomBackground() {
  return (
    <div
      data-background="music-listening-room"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_12%,rgba(244,114,182,0.17),transparent_31%),radial-gradient(circle_at_84%_18%,rgba(34,211,238,0.11),transparent_28%),radial-gradient(circle_at_52%_82%,rgba(251,146,60,0.07),transparent_30%),linear-gradient(180deg,#0a030a_0%,#07040f_48%,#020207_100%)]" />

      <svg
        viewBox="0 0 1000 720"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full opacity-[0.78]"
      >
        <defs>
          <linearGradient id="music-room-line" x1="0" x2="1">
            <stop offset="0" stopColor="rgba(244,114,182,0)" />
            <stop offset="0.2" stopColor="rgba(244,114,182,0.22)" />
            <stop offset="0.72" stopColor="rgba(34,211,238,0.18)" />
            <stop offset="1" stopColor="rgba(34,211,238,0)" />
          </linearGradient>
          <radialGradient id="music-room-disc">
            <stop offset="0" stopColor="rgba(250,204,21,0.11)" />
            <stop offset="0.68" stopColor="rgba(167,139,250,0.035)" />
            <stop offset="1" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
        </defs>

        <g opacity="0.74">
          {[0, 1, 2, 3, 4].map((line) => (
            <line
              key={line}
              x1="72"
              x2="548"
              y1={128 + line * 18}
              y2={128 + line * 18}
              stroke="rgba(244,114,182,0.11)"
            />
          ))}
          {STAFF_NOTES.map((note, index) => (
            <g key={`${note.x}-${note.y}`}>
              <ellipse
                cx={note.x}
                cy={note.y}
                rx="10"
                ry="7"
                transform={`rotate(-18 ${note.x} ${note.y})`}
                fill={
                  index % 2 ? "rgba(167,139,250,0.28)" : "rgba(244,114,182,0.3)"
                }
              />
              <line
                x1={note.x + (note.stem === "up" ? 9 : -9)}
                x2={note.x + (note.stem === "up" ? 9 : -9)}
                y1={note.y}
                y2={note.y + (note.stem === "up" ? -42 : 42)}
                stroke="rgba(244,220,238,0.25)"
              />
            </g>
          ))}
          <text
            x="72"
            y="108"
            fill="rgba(244,180,216,0.32)"
            fontSize="11"
            letterSpacing="2.5"
          >
            SCORE · SYMBOLIC PLAN
          </text>
        </g>

        <g>
          <polyline
            points={WAVE_POINTS.map((point) => point.join(",")).join(" ")}
            fill="none"
            stroke="rgba(34,211,238,0.31)"
            strokeWidth="2"
          />
          <line
            x1="610"
            x2="876"
            y1="164"
            y2="164"
            stroke="rgba(34,211,238,0.07)"
          />
          <text
            x="644"
            y="108"
            fill="rgba(103,232,249,0.3)"
            fontSize="11"
            letterSpacing="2.5"
          >
            SIGNAL · MEASURED EVENT
          </text>
        </g>

        <g opacity="0.62">
          <circle cx="864" cy="348" r="132" fill="url(#music-room-disc)" />
          <circle
            cx="864"
            cy="348"
            r="104"
            fill="none"
            stroke="rgba(250,204,21,0.09)"
          />
          <circle
            cx="864"
            cy="348"
            r="72"
            fill="none"
            stroke="rgba(167,139,250,0.08)"
          />
          <circle
            cx="864"
            cy="348"
            r="18"
            fill="none"
            stroke="rgba(250,204,21,0.15)"
          />
          <circle cx="864" cy="348" r="4" fill="rgba(250,204,21,0.22)" />
          <text
            x="796"
            y="498"
            fill="rgba(250,204,21,0.28)"
            fontSize="11"
            letterSpacing="2.5"
          >
            RECORD · CATALOG
          </text>
        </g>

        <g transform="translate(76 442)" opacity="0.76">
          <rect
            width="680"
            height="176"
            rx="24"
            fill="rgba(2,2,7,0.17)"
            stroke="rgba(255,255,255,0.055)"
          />
          {CHANNELS.map((channel) => (
            <g key={channel.label} transform={`translate(${channel.x} 0)`}>
              <line y1="34" y2="118" stroke={`rgba(${channel.rgb},0.12)`} />
              <rect
                x="-13"
                y={118 - channel.level}
                width="26"
                height="8"
                rx="4"
                fill={`rgba(${channel.rgb},0.22)`}
                stroke={`rgba(${channel.rgb},0.28)`}
              />
              <text
                x="0"
                y="146"
                textAnchor="middle"
                fill={`rgba(${channel.rgb},0.34)`}
                fontSize="9"
                letterSpacing="1.3"
              >
                {channel.label.toUpperCase()}
              </text>
            </g>
          ))}
        </g>

        <path
          d="M46 390 C250 326 438 408 610 334 S820 244 980 282"
          fill="none"
          stroke="url(#music-room-line)"
        />
      </svg>

      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(rgba(244,114,182,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(34,211,238,0.025) 1px,transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(circle at center,black,transparent 82%)",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_42%,rgba(0,0,0,0.58)_100%)]" />
    </div>
  );
}
