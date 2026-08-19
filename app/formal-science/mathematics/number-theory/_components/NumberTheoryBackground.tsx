"use client";

const VALUES = Array.from({ length: 180 }, (_, index) => index + 2);

function isPrime(value: number) {
  if (value < 2) return false;
  if (value % 2 === 0) return value === 2;
  for (let divisor = 3; divisor * divisor <= value; divisor += 2) {
    if (value % divisor === 0) return false;
  }
  return true;
}

export default function NumberTheoryBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#05050a] pointer-events-none">
      <div className="absolute -left-[12%] -top-[16%] h-[56vw] w-[56vw] rounded-full bg-violet-900/[0.10] blur-[150px]" />
      <div className="absolute -bottom-[18%] -right-[12%] h-[54vw] w-[54vw] rounded-full bg-emerald-900/[0.09] blur-[150px]" />

      <div className="absolute inset-0 grid auto-rows-[34px] grid-cols-[repeat(auto-fill,minmax(42px,1fr))] gap-x-1 overflow-hidden px-7 py-8 font-mono text-[9px] leading-[34px] opacity-35 [mask-image:linear-gradient(to_bottom,black,transparent_92%)]">
        {VALUES.map((value) => {
          const prime = isPrime(value);
          return (
            <span
              key={value}
              className={prime ? "text-amber-200/[0.44]" : "text-slate-400/[0.10]"}
            >
              {String(value).padStart(3, "0")}
            </span>
          );
        })}
      </div>

      <div className="absolute right-[6%] top-[16%] select-none font-serif text-[18vw] italic leading-none text-violet-200/[0.018]">
        ℤ
      </div>
      <div className="absolute bottom-[7%] left-[6%] select-none font-mono text-[9vw] font-semibold leading-none text-emerald-200/[0.016]">
        mod n
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,10,0.40)_56%,rgba(5,5,10,0.92)_100%)]" />
    </div>
  );
}
