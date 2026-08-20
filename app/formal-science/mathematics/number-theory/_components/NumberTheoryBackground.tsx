const PRIMES = new Set([
  2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61,
  67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139,
  149, 151, 157,
]);

const CELLS = Array.from({ length: 160 }, (_, index) => index + 1);

export default function NumberTheoryBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#05050a]" aria-hidden="true">
      <div className="absolute -left-[14vw] top-[8vh] h-[46vw] w-[46vw] rounded-full bg-violet-700/[0.075] blur-[130px]" />
      <div className="absolute -right-[10vw] bottom-[-12vh] h-[40vw] w-[40vw] rounded-full bg-emerald-600/[0.055] blur-[140px]" />

      <div className="absolute inset-[-4rem] rotate-[-4deg] opacity-[0.22] [mask-image:linear-gradient(to_bottom,black,transparent_92%)]">
        <div className="grid gap-x-4 gap-y-3 font-mono text-[11px]" style={{ gridTemplateColumns: "repeat(16,minmax(0,1fr))" }}>
          {CELLS.map((value) => {
            const prime = PRIMES.has(value);
            const struckBy = value > 5 && (value % 2 === 0 ? 2 : value % 3 === 0 ? 3 : value % 5 === 0 ? 5 : null);
            return (
              <span key={value} className={`relative text-center ${prime ? "font-semibold text-emerald-200/80 [text-shadow:0_0_14px_rgba(52,211,153,0.36)]" : "text-zinc-500/22"}`}>
                {value}
                {struckBy ? <span className="absolute left-1/2 top-1/2 h-px w-7 -translate-x-1/2 -translate-y-1/2 rotate-[-14deg] bg-violet-300/24" data-sieved-by={struckBy} /> : null}
              </span>
            );
          })}
        </div>
      </div>

      <div className="absolute left-[9%] top-0 h-full w-px bg-gradient-to-b from-transparent via-violet-300/[0.13] to-transparent" />
      <div className="absolute left-[31%] top-0 h-full w-px bg-gradient-to-b from-transparent via-emerald-300/[0.08] to-transparent" />
      <div className="absolute right-[16%] top-0 h-full w-px bg-gradient-to-b from-transparent via-amber-300/[0.07] to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_18%,rgba(5,5,10,0.34)_68%,rgba(5,5,10,0.86))]" />
    </div>
  );
}
