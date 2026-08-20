"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { M } from "@/app/_components/Math";

export default function PowerRulePractice() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [d, setD] = useState("");
  const [e, setE] = useState("");
  const [checked, setChecked] = useState(false);

  const correct = Number(a) === 10 && Number(b) === 4 && Number(c) === 9 && Number(d) === 2 && Number(e) === 4;
  const originalSlopeAtOne = centralSlope(1, 0.0005);
  const enteredAtOne = Number(a || 0) - Number(c || 0) + Number(e || 0);

  return (
    <div className="overflow-hidden rounded-[26px] border border-orange-100/[0.10] bg-[#120803]/74 backdrop-blur-xl">
      <div className="border-b border-white/[0.07] p-5 sm:p-6">
        <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-orange-200/60">Application · fresh polynomial</div>
        <h3 className="mt-2 text-[clamp(1.6rem,2.7vw,2.4rem)] font-semibold tracking-[-0.04em] text-white">Differentiate the function.</h3>
        <div className="mt-4 rounded-[16px] border border-white/[0.06] bg-black/[0.09] px-4 py-4 text-[18px] text-orange-50"><M display>{`f(x)=2x^5-3x^3+4x-7`}</M></div>
      </div>

      <div className="grid gap-5 p-5 lg:grid-cols-[minmax(0,1fr)_330px] sm:p-6 lg:items-start">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.07em] text-slate-500">Your derivative</div>
          <div className="mt-3 flex flex-wrap items-center gap-2 rounded-[18px] border border-white/[0.07] bg-black/[0.08] p-4 font-mono text-[22px] text-white">
            <NumberBox label="first coefficient" value={a} setValue={setA} />
            <span>x</span><sup><NumberBox label="first exponent" value={b} setValue={setB} small /></sup>
            <span className="text-orange-200/70">−</span>
            <NumberBox label="second coefficient" value={c} setValue={setC} />
            <span>x</span><sup><NumberBox label="second exponent" value={d} setValue={setD} small /></sup>
            <span className="text-orange-200/70">+</span>
            <NumberBox label="constant derivative term" value={e} setValue={setE} />
          </div>

          <button type="button" onClick={() => setChecked(true)} className="mt-4 min-h-[44px] rounded-[14px] border border-orange-200/[0.20] bg-orange-300/[0.045] px-5 text-[12px] font-semibold text-orange-100 transition hover:bg-orange-300/[0.07]">Check work</button>

          {checked ? (
            <div className={`mt-4 rounded-[16px] border p-4 ${correct ? "border-emerald-300/[0.16] bg-emerald-300/[0.025]" : "border-amber-300/[0.14] bg-amber-300/[0.02]"}`}>
              <div className="flex items-center gap-2"><CheckCircle2 size={14} className={correct ? "text-emerald-300" : "text-amber-300/60"} /><strong className={`text-[12px] ${correct ? "text-emerald-200" : "text-amber-100/80"}`}>{correct ? "Derivative structure matches" : "One or more terms still need work"}</strong></div>
              <p className="mt-2 text-[12px] leading-5 text-slate-400/72">{correct ? "Each power term was differentiated independently, the linear term became a constant, and the original constant disappeared." : "Apply the power rule to each nonconstant term separately. Remember that d/dx(4x)=4 and d/dx(−7)=0."}</p>
            </div>
          ) : null}
        </div>

        <aside className="rounded-[18px] border border-white/[0.07] bg-black/[0.07] p-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.07em] text-pink-200/48">Slope check at x = 1</div>
          <p className="mt-3 text-[12px] leading-5 text-slate-400/72">A tiny symmetric secant on the original polynomial gives slope ≈ <strong className="font-mono text-pink-100">{originalSlopeAtOne.toFixed(3)}</strong>.</p>
          <p className="mt-3 text-[12px] leading-5 text-slate-400/72">Your entered derivative gives <strong className="font-mono text-orange-100">{enteredAtOne.toFixed(3)}</strong> at x = 1.</p>
          <p className="mt-4 border-l-2 border-orange-300/24 pl-3 text-[11px] leading-5 text-slate-500">Matching at one point is useful verification, not proof that two functions are identical. The coefficient/exponent structure still has to be correct.</p>
        </aside>
      </div>
    </div>
  );

  function centralSlope(x: number, h: number) {
    const f = (value: number) => 2 * Math.pow(value, 5) - 3 * Math.pow(value, 3) + 4 * value - 7;
    return (f(x + h) - f(x - h)) / (2 * h);
  }
}

function NumberBox({ label, value, setValue, small = false }: { label: string; value: string; setValue: (value: string) => void; small?: boolean }) {
  return <input aria-label={label} type="number" inputMode="numeric" value={value} onChange={(event) => setValue(event.target.value)} className={`${small ? "h-8 w-11 text-[15px]" : "h-10 w-14 text-[18px]"} rounded-[9px] border border-white/[0.10] bg-black/[0.20] text-center font-mono text-orange-100 outline-none transition focus:border-orange-200/[0.35]`} />;
}
