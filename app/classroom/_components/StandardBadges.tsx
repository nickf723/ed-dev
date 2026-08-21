export default function StandardBadges({
  codes,
  tone = "dark",
}: {
  codes: readonly string[];
  tone?: "dark" | "light";
}) {
  return (
    <div className="flex flex-wrap gap-1.5" aria-label="Standards alignment">
      {codes.map((code) => (
        <span
          key={code}
          className={`rounded-full border px-2.5 py-1 font-mono text-[11px] font-semibold ${
            tone === "dark"
              ? "border-white/10 bg-white/[0.04] text-emerald-200"
              : "border-emerald-900/10 bg-emerald-700/[0.06] text-emerald-800"
          }`}
        >
          {code}
        </span>
      ))}
    </div>
  );
}
