const LATTICE_POINTS = Array.from({ length: 40 }, (_, index) => ({
  top: ((index * 7) % 20) * 5,
  left: ((index * 11 + 3) % 20) * 5,
  opacity: 0.12 + ((index * 13) % 6) * 0.06,
}));

export default function DiophantineBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#05050a]" aria-hidden="true">
      <div className="absolute left-[-10%] top-0 h-[60vw] w-[60vw] rounded-full bg-rose-900/10 blur-[150px] mix-blend-screen" />
      <div className="absolute bottom-[-20%] right-[-10%] h-[50vw] w-[50vw] rounded-full bg-amber-900/10 blur-[150px] mix-blend-screen" />

      <div className="absolute inset-0 opacity-[0.09] [background-image:linear-gradient(rgba(251,113,133,0.24)_1px,transparent_1px),linear-gradient(90deg,rgba(251,113,133,0.24)_1px,transparent_1px)] [background-size:5%_5%]" />

      <div className="absolute inset-0 opacity-30">
        {LATTICE_POINTS.map((point, index) => (
          <span
            key={`${point.top}-${point.left}-${index}`}
            className="absolute h-1.5 w-1.5 rounded-full bg-rose-400 shadow-[0_0_10px_rgba(244,63,94,0.72)]"
            style={{ top: `${point.top}%`, left: `${point.left}%`, opacity: point.opacity }}
          />
        ))}
      </div>

      <div className="absolute left-[20%] top-[30%] rotate-12 select-none font-serif text-[8vw] italic text-rose-500/[0.025]">ax + by = c</div>
      <div className="absolute bottom-[20%] right-[15%] -rotate-6 select-none font-serif text-[10vw] italic text-amber-500/[0.025]">x, y ∈ ℤ</div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_24%,rgba(5,5,10,0.76))]" />
    </div>
  );
}
