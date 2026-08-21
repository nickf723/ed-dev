export default function StandardBadges({
  codes,
}: {
  codes: readonly string[];
}) {
  return (
    <div className="flex flex-wrap gap-1.5" aria-label="Standards alignment">
      {codes.map((code) => (
        <span
          key={code}
          className="rounded-full border border-cyan-200/[0.10] bg-cyan-300/[0.05] px-2.5 py-1 font-mono text-[11px] font-semibold text-cyan-200/85"
        >
          {code}
        </span>
      ))}
    </div>
  );
}
