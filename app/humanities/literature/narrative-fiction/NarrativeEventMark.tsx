import type { NarrativeEvent } from "./narrativeModel";

export const EVENT_PALETTE = {
  amber: {
    solid: "#d97706",
    light: "#fde68a",
    wash: "rgba(217,119,6,0.13)",
    border: "rgba(253,230,138,0.35)",
  },
  rose: {
    solid: "#be123c",
    light: "#fecdd3",
    wash: "rgba(190,18,60,0.13)",
    border: "rgba(254,205,211,0.34)",
  },
  cyan: {
    solid: "#0e7490",
    light: "#a5f3fc",
    wash: "rgba(14,116,144,0.13)",
    border: "rgba(165,243,252,0.34)",
  },
  violet: {
    solid: "#6d28d9",
    light: "#ddd6fe",
    wash: "rgba(109,40,217,0.13)",
    border: "rgba(221,214,254,0.34)",
  },
} as const;

export default function NarrativeEventMark({
  event,
  selected = false,
  compact = false,
}: {
  event: NarrativeEvent;
  selected?: boolean;
  compact?: boolean;
}) {
  const palette = EVENT_PALETTE[event.tone];

  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center border font-mono font-bold transition-[box-shadow,filter] ${
        compact ? "h-8 w-8 text-[11px]" : "h-11 w-11 text-[13px]"
      } ${shapeClass(event.shape)}`}
      style={{
        color: palette.light,
        borderColor: selected ? palette.light : palette.border,
        backgroundColor: selected ? palette.solid : palette.wash,
        boxShadow: selected ? `0 0 24px ${palette.wash}` : undefined,
        filter: selected ? "saturate(1.22) brightness(1.08)" : undefined,
      }}
      aria-hidden="true"
    >
      <span className={event.shape === "diamond" ? "-rotate-45" : ""}>
        {event.code}
      </span>
    </span>
  );
}

function shapeClass(shape: NarrativeEvent["shape"]): string {
  if (shape === "circle") return "rounded-full";
  if (shape === "diamond") return "rotate-45 rounded-[5px]";
  if (shape === "triangle") {
    return "rounded-[52%_52%_18%_18%/72%_72%_24%_24%]";
  }
  return "rounded-[5px]";
}
