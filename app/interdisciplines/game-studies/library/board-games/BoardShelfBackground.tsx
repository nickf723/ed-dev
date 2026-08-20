export default function BoardShelfBackground({
  accentRgb = "251,146,60",
}: {
  accentRgb?: string;
}) {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[#080604]" />
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage: `linear-gradient(rgba(${accentRgb},0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(${accentRgb},0.035) 1px,transparent 1px)`,
          backgroundSize: "72px 72px",
          transform: "perspective(900px) rotateX(58deg) scale(1.35) translateY(13%)",
          transformOrigin: "center bottom",
        }}
      />
      <div className="absolute left-[7%] top-[18%] h-28 w-28 rotate-12 rounded-full border border-amber-200/[0.08] shadow-[0_0_45px_rgba(251,191,36,0.05)]" />
      <div className="absolute right-[10%] top-[28%] grid grid-cols-4 gap-2 opacity-30">
        {Array.from({ length: 16 }, (_, index) => (
          <span
            key={index}
            className="h-7 w-7 rounded-md border"
            style={{
              borderColor: `rgba(${accentRgb},0.13)`,
              background: index % 3 === 0 ? `rgba(${accentRgb},0.055)` : "rgba(255,255,255,0.008)",
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_42%,transparent_0%,rgba(8,6,4,0.18)_42%,rgba(8,6,4,0.82)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(8,6,4,0.18),rgba(8,6,4,0.44)_72%,rgba(8,6,4,0.92))]" />
    </div>
  );
}
