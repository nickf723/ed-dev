export default function TvFilmBackground() {
  const perforations = Array.from({ length: 18 }, (_, index) => index);
  const frames = Array.from({ length: 6 }, (_, index) => index);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#050507]" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_24%,rgba(251,191,36,0.10),transparent_26%),radial-gradient(circle_at_24%_66%,rgba(34,211,238,0.075),transparent_32%),linear-gradient(180deg,#070709_0%,#050507_48%,#020203_100%)]" />

      <div className="absolute left-[8%] top-[7%] h-[78%] w-[84%] border border-white/[0.045] bg-black/[0.06] shadow-[0_0_120px_rgba(251,191,36,0.025)]">
        <div className="absolute inset-x-[5%] top-[8%] h-px bg-gradient-to-r from-transparent via-amber-100/[0.11] to-transparent" />
        <div className="absolute inset-x-[5%] bottom-[8%] h-px bg-gradient-to-r from-transparent via-cyan-100/[0.08] to-transparent" />
        <div className="absolute inset-y-[8%] left-[5%] w-px bg-gradient-to-b from-transparent via-white/[0.06] to-transparent" />
        <div className="absolute inset-y-[8%] right-[5%] w-px bg-gradient-to-b from-transparent via-white/[0.06] to-transparent" />

        <div className="absolute left-[5%] right-[5%] top-[16%] grid h-[54%] grid-cols-6 gap-[2px] opacity-60">
          {frames.map((frame) => (
            <div key={frame} className="relative border border-white/[0.045] bg-[linear-gradient(145deg,rgba(251,191,36,0.018),rgba(34,211,238,0.014),rgba(0,0,0,0.05))]">
              <span className="absolute left-2 top-2 font-mono text-[8px] text-white/10">{String(frame + 1).padStart(2, "0")}</span>
              <span className="absolute bottom-2 right-2 h-3 w-5 border border-white/[0.035]" />
            </div>
          ))}
        </div>

        <div className="absolute left-[5%] right-[5%] top-[74%] flex items-center gap-3">
          <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-amber-100/16">picture</span>
          <span className="h-px flex-1 bg-white/[0.035]" />
          <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-cyan-100/14">sound</span>
          <span className="h-px flex-1 bg-white/[0.035]" />
          <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-pink-100/14">time</span>
        </div>
      </div>

      <div className="absolute inset-y-0 left-0 w-12 border-r border-white/[0.035] bg-black/20">
        <div className="flex h-full flex-col items-center justify-around py-3">
          {perforations.map((index) => <span key={index} className="h-4 w-6 rounded-[2px] border border-amber-100/[0.055] bg-black/25" />)}
        </div>
      </div>
      <div className="absolute inset-y-0 right-0 w-12 border-l border-white/[0.035] bg-black/20">
        <div className="flex h-full flex-col items-center justify-around py-3">
          {perforations.map((index) => <span key={index} className="h-4 w-6 rounded-[2px] border border-cyan-100/[0.05] bg-black/25" />)}
        </div>
      </div>

      <div className="absolute -right-[10%] -top-[18%] h-[72%] w-[72%] rotate-[14deg] bg-[linear-gradient(135deg,rgba(254,240,138,0.055),transparent_56%)] blur-[2px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_28%,rgba(2,2,3,0.70)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-[18%] bg-gradient-to-b from-[#050507] via-[#050507]/82 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[24%] bg-gradient-to-t from-[#020203] via-[#020203]/88 to-transparent" />
    </div>
  );
}
