import { EVENT_PALETTE } from "./NarrativeEventMark";
import {
  NARRATIVE_EVENTS,
  orderedNarrativeEvents,
  type NarrativeEvent,
} from "./narrativeModel";

const STORY_EVENTS = orderedNarrativeEvents("story");
const PLOT_EVENTS = orderedNarrativeEvents("plot");
const TRACK_X = [126, 420, 714, 1008] as const;

export default function NarrativeWorld() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#080708]"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_22%,rgba(190,24,93,0.12),transparent_31%),radial-gradient(circle_at_20%_76%,rgba(8,145,178,0.09),transparent_28%),linear-gradient(145deg,#080708_0%,#120b0e_52%,#070607_100%)]" />

      <svg
        viewBox="0 0 1200 900"
        className="absolute -right-[22rem] top-[4vh] h-[min(940px,106vh)] w-auto min-w-[900px] opacity-55 sm:-right-[13rem] 2xl:right-[-4rem]"
      >
        <defs>
          <filter
            id="narrative-thread-glow"
            x="-30%"
            y="-30%"
            width="160%"
            height="160%"
          >
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="narrative-table-wash" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="rgba(255,248,235,0.055)" />
            <stop offset="0.52" stopColor="rgba(77,38,47,0.025)" />
            <stop offset="1" stopColor="rgba(0,0,0,0)" />
          </linearGradient>
        </defs>

        <path
          d="M72 108H1116V744H72Z"
          fill="url(#narrative-table-wash)"
          stroke="rgba(255,241,220,0.09)"
          strokeWidth="1"
        />
        <path
          d="M96 132h54M96 132v54M1092 132h-54M1092 132v54M96 720h54M96 720v-54M1092 720h-54M1092 720v-54"
          fill="none"
          stroke="rgba(255,241,220,0.20)"
          strokeWidth="2"
        />

        <text
          x="96"
          y="214"
          fill="rgba(255,241,220,0.40)"
          fontFamily="monospace"
          fontSize="16"
          letterSpacing="2"
        >
          STORY / CHRONOLOGY
        </text>
        <line
          x1="126"
          y1="274"
          x2="1008"
          y2="274"
          stroke="rgba(255,241,220,0.13)"
          strokeWidth="2"
        />
        {STORY_EVENTS.map((event, index) => (
          <WorldEvent
            key={`story-${event.id}`}
            event={event}
            x={TRACK_X[index]}
            y={274}
          />
        ))}

        <g fill="none" strokeWidth="1.5" strokeDasharray="7 9" opacity="0.54">
          {NARRATIVE_EVENTS.map((event) => {
            const storyIndex = STORY_EVENTS.findIndex(
              (candidate) => candidate.id === event.id
            );
            const plotIndex = PLOT_EVENTS.findIndex(
              (candidate) => candidate.id === event.id
            );
            const palette = EVENT_PALETTE[event.tone];
            return (
              <path
                key={`thread-${event.id}`}
                d={`M${TRACK_X[storyIndex]} 304 C${TRACK_X[storyIndex]} 392 ${TRACK_X[plotIndex]} 406 ${TRACK_X[plotIndex]} 494`}
                stroke={palette.light}
              />
            );
          })}
        </g>

        <text
          x="96"
          y="480"
          fill="rgba(255,241,220,0.40)"
          fontFamily="monospace"
          fontSize="16"
          letterSpacing="2"
        >
          PLOT / PRESENTATION
        </text>
        <line
          x1="126"
          y1="524"
          x2="1008"
          y2="524"
          stroke="rgba(255,241,220,0.13)"
          strokeWidth="2"
        />
        {PLOT_EVENTS.map((event, index) => (
          <WorldEvent
            key={`plot-${event.id}`}
            event={event}
            x={TRACK_X[index]}
            y={524}
          />
        ))}

        <g className="narrative-reading-head" opacity="0.42">
          <rect
            x="100"
            y="458"
            width="3"
            height="134"
            rx="1.5"
            fill="rgba(254,243,199,0.64)"
            filter="url(#narrative-thread-glow)"
          />
          <path
            d="M92 456h19M92 594h19"
            stroke="rgba(254,243,199,0.76)"
            strokeWidth="2"
          />
        </g>

        <text
          x="96"
          y="676"
          fill="rgba(254,205,211,0.32)"
          fontFamily="Georgia, serif"
          fontSize="18"
          fontStyle="italic"
        >
          same events / different disclosure
        </text>
        <path
          d="M96 690c164 20 346-18 512 2s316 9 484-8"
          fill="none"
          stroke="rgba(251,113,133,0.18)"
          strokeWidth="2"
        />
      </svg>

      <div className="absolute inset-y-0 left-[8%] w-px bg-gradient-to-b from-transparent via-rose-100/[0.08] to-transparent" />
      <div className="absolute inset-y-0 left-[calc(8%+7px)] w-px bg-gradient-to-b from-transparent via-amber-100/[0.035] to-transparent" />
      <div className="absolute inset-x-0 bottom-[9%] h-px bg-gradient-to-r from-transparent via-cyan-100/[0.08] to-transparent" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(8,7,8,0.04),rgba(8,7,8,0.30)_62%,rgba(5,5,6,0.88))]" />

      <style>{`
        .narrative-reading-head {
          transform-box: view-box;
          transform-origin: 0 0;
          animation: narrative-read 26s ease-in-out infinite alternate;
        }

        @keyframes narrative-read {
          from { transform: translateX(0); }
          to { transform: translateX(906px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .narrative-reading-head { animation: none; transform: translateX(294px); }
        }
      `}</style>
    </div>
  );
}

function WorldEvent({
  event,
  x,
  y,
}: {
  event: NarrativeEvent;
  x: number;
  y: number;
}) {
  const palette = EVENT_PALETTE[event.tone];

  return (
    <g transform={`translate(${x} ${y})`}>
      <WorldShape event={event} fill={palette.solid} stroke={palette.light} />
      <text
        x="0"
        y="5"
        textAnchor="middle"
        fill="#fffaf0"
        fontFamily="monospace"
        fontSize="14"
        fontWeight="700"
      >
        {event.code}
      </text>
      <text
        x="0"
        y="53"
        textAnchor="middle"
        fill={palette.light}
        fontFamily="monospace"
        fontSize="11"
        letterSpacing="1"
      >
        {event.worldLabel}
      </text>
    </g>
  );
}

function WorldShape({
  event,
  fill,
  stroke,
}: {
  event: NarrativeEvent;
  fill: string;
  stroke: string;
}) {
  const common = { fill, stroke, strokeWidth: 2 };
  if (event.shape === "circle") return <circle r="23" {...common} />;
  if (event.shape === "diamond")
    return (
      <rect
        x="-18"
        y="-18"
        width="36"
        height="36"
        rx="4"
        transform="rotate(45)"
        {...common}
      />
    );
  if (event.shape === "triangle")
    return <polygon points="0,-25 24,20 -24,20" {...common} />;
  return <rect x="-21" y="-21" width="42" height="42" rx="5" {...common} />;
}
