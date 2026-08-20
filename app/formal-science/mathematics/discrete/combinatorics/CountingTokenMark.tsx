import type { CountingToken } from "./combinatoricsModel";

const TOKEN_STYLE = {
  amber: { fill: "#b45309", stroke: "#fde68a", text: "#fffbeb" },
  cyan: { fill: "#0e7490", stroke: "#a5f3fc", text: "#ecfeff" },
  violet: { fill: "#6d28d9", stroke: "#ddd6fe", text: "#f5f3ff" },
  rose: { fill: "#be123c", stroke: "#fecdd3", text: "#fff1f2" },
  emerald: { fill: "#047857", stroke: "#a7f3d0", text: "#ecfdf5" },
  sky: { fill: "#0369a1", stroke: "#bae6fd", text: "#f0f9ff" },
  orange: { fill: "#c2410c", stroke: "#fed7aa", text: "#fff7ed" },
} as const;

export default function CountingTokenMark({
  token,
  size = "md",
  muted = false,
}: {
  token: CountingToken;
  size?: "sm" | "md" | "lg";
  muted?: boolean;
}) {
  const palette = TOKEN_STYLE[token.tone];
  const sizeClass = {
    sm: "h-7 w-7",
    md: "h-10 w-10",
    lg: "h-14 w-14",
  }[size];

  return (
    <svg
      viewBox="0 0 52 52"
      className={`${sizeClass} shrink-0 drop-shadow-[0_6px_10px_rgba(0,0,0,0.34)] ${muted ? "opacity-[0.42] grayscale-[0.35]" : ""}`}
      role="img"
      aria-label={`Token ${token.label}`}
    >
      <TokenShape
        shape={token.shape}
        fill={palette.fill}
        stroke={palette.stroke}
      />
      <text
        x="26"
        y="27"
        textAnchor="middle"
        dominantBaseline="central"
        fill={palette.text}
        fontSize="14"
        fontWeight="800"
        fontFamily="ui-monospace, monospace"
      >
        {token.label}
      </text>
    </svg>
  );
}

function TokenShape({
  shape,
  fill,
  stroke,
}: {
  shape: CountingToken["shape"];
  fill: string;
  stroke: string;
}) {
  const common = { fill, stroke, strokeWidth: 1.6 };

  if (shape === "circle") return <circle cx="26" cy="26" r="20" {...common} />;
  if (shape === "square")
    return <rect x="7" y="7" width="38" height="38" rx="5" {...common} />;
  if (shape === "hexagon")
    return <polygon points="26,4 45,15 45,37 26,48 7,37 7,15" {...common} />;
  if (shape === "triangle")
    return <polygon points="26,4 48,45 4,45" {...common} />;
  if (shape === "star")
    return (
      <polygon
        points="26,3 32,18 48,19 36,29 40,45 26,36 12,45 16,29 4,19 20,18"
        {...common}
      />
    );
  if (shape === "bar")
    return <rect x="5" y="14" width="42" height="24" rx="12" {...common} />;

  return <polygon points="26,3 49,26 26,49 3,26" {...common} />;
}
