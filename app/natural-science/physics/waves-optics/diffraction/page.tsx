"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { M } from "@/app/_components/Math";
import { SceneFrame, Surface } from "@/app/_page-system/scene";
import { Aperture, ArrowLeft, ArrowRight, ScanLine, TriangleAlert, Waves } from "lucide-react";
import DiffractionBackground from "./DiffractionBackground";

const MAX_ANGLE = 60;

export default function DiffractionPage() {
  const [wavelength, setWavelength] = useState(0.52);
  const [aperture, setAperture] = useState(1.45);
  const [transferAperture, setTransferAperture] = useState(1.15);
  const [checkedTransfer, setCheckedTransfer] = useState(false);

  const ratio = aperture / wavelength;
  const firstMinimum = firstMinimumAngle(wavelength, aperture);
  const screen = useMemo(() => buildScreen(wavelength, aperture), [aperture, wavelength]);
  const transferWavelength = 0.45;
  const transferAngle = firstMinimumAngle(transferWavelength, transferAperture);
  const targetAngle = 25;
  const transferError = transferAngle === null ? Infinity : Math.abs(transferAngle - targetAngle);
  const transferHit = transferError <= 1;

  return (
    <SceneFrame
      background={<DiffractionBackground />}
      className="bg-[#040515] text-slate-100 selection:bg-violet-300/25"
      maxWidthClassName="max-w-[1280px]"
      headerBackground="rgba(4,5,21,0.62)"
      header={
        <DomainPageHeader
          breadcrumbs={[
            { label: "Physics", href: "/natural-science/physics" },
            { label: "Waves & Optics", href: "/natural-science/physics/waves-optics" },
            { label: "Diffraction" },
          ]}
          eyebrow="Opening scale · wavelength · interference · angular pattern"
          eyebrowStyle="rule"
          icon={Aperture}
          title={<span>Diffraction</span>}
          subtitle="Send a wave through one opening and watch the transmitted field spread into a structured interference pattern. The amount of spreading depends on the opening size relative to the wavelength, not on a mysterious loss of direction at the slit."
          accentRgb="167, 139, 250"
          titleClassName="font-sans text-[clamp(2.65rem,5vw,5.5rem)] font-semibold leading-[0.85] tracking-[-0.061em] text-[#faf7ff]"
          headerClassName="border-violet-100/[0.10]"
        />
      }
    >
      <section className="mt-5 max-w-4xl">
        <div className="font-mono text-[12px] font-semibold uppercase tracking-[0.09em] text-violet-200/62">01 · Phenomenon</div>
        <h2 className="mt-2 text-[clamp(1.9rem,3.7vw,3.5rem)] font-semibold leading-[0.95] tracking-[-0.052em] text-white">The same wave can leave one opening as a narrow pattern and another as a broad fan.</h2>
        <p className="mt-4 max-w-3xl text-[15px] leading-7 text-slate-300/72">Which matters more: the absolute width of the slit, or its width compared with the wavelength passing through it?</p>
      </section>

      <section className="mt-8">
        <div className="mb-3 font-mono text-[12px] font-semibold uppercase tracking-[0.09em] text-violet-200/62">02 · Aperture sandbox</div>
        <Surface variant="glass" className="overflow-hidden rounded-[30px] border-violet-100/[0.11]" style={{ background: "rgba(7,7,29,0.30)" }}>
          <div className="grid border-b border-white/[0.07] lg:grid-cols-[minmax(0,1fr)_350px]">
            <div className="p-5 sm:p-6">
              <div className="flex items-center gap-2 font-mono text-[12px] font-semibold uppercase tracking-[0.08em] text-cyan-200/58"><Waves size={14} /> Single-opening model</div>
              <h3 className="mt-2 text-[clamp(1.65rem,2.8vw,2.55rem)] font-semibold tracking-[-0.043em] text-white">Change the two length scales and watch the far-field pattern respond.</h3>
              <p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400/74">The screen uses an idealized single-slit Fraunhofer intensity pattern. The model is normalized and dimensionless here so the ratio is easier to investigate.</p>
            </div>
            <div className="border-t border-white/[0.07] bg-black/[0.055] p-5 lg:border-l lg:border-t-0">
              <span className="font-mono text-[11px] uppercase tracking-[0.07em] text-slate-500">Current geometry</span>
              <strong className="mt-2 block text-[20px] text-violet-200">a / λ = {ratio.toFixed(2)}</strong>
              <p className="mt-2 text-[12px] leading-5 text-slate-400/72">{firstMinimum === null ? "Here λ/a exceeds 1, so this idealized first-zero relation has no solution before 90°. The pattern is extremely broad." : `The first modeled dark minimum appears at about ${firstMinimum.toFixed(1)}°.`}</p>
            </div>
          </div>

          <div className="grid gap-5 p-4 sm:p-5 xl:grid-cols-[230px_minmax(0,1fr)_300px] xl:items-start">
            <div>
              <Control label="Wavelength λ" value={wavelength} min={0.25} max={1.15} step={0.01} display={`${wavelength.toFixed(2)} units`} onChange={setWavelength} />
              <Control label="Aperture width a" value={aperture} min={0.30} max={3.50} step={0.02} display={`${aperture.toFixed(2)} units`} onChange={setAperture} />
              <div className="mt-4 rounded-[15px] border border-white/[0.06] bg-black/[0.06] p-3">
                <div className="font-mono text-[10px] uppercase tracking-[0.06em] text-slate-500">Investigation cue</div>
                <p className="mt-2 text-[11px] leading-5 text-slate-500">Try doubling both a and λ together. Then change only one of them. Which changes preserve the pattern shape, and which change the spread?</p>
              </div>
            </div>

            <div>
              <div className="relative min-h-[370px] overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#09091c]/72 p-4">
                <DiffractionDiagram aperture={aperture} wavelength={wavelength} screen={screen} />
              </div>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                <Readout label="a / λ" value={ratio.toFixed(2)} note="dimensionless scale ratio" rgb="167,139,250" />
                <Readout label="First minimum" value={firstMinimum === null ? "> 90° / none" : `${firstMinimum.toFixed(1)}°`} note="ideal single-slit first zero" rgb="34,211,238" />
                <Readout label="Central pattern" value={ratio < 1 ? "very broad" : ratio < 3 ? "broad" : "narrower"} note="qualitative comparison only" rgb="250,204,21" />
              </div>
            </div>

            <aside className="xl:sticky xl:top-[172px] xl:self-start">
              <div className="rounded-[20px] border border-white/[0.07] bg-black/[0.07] p-4">
                <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.07em] text-violet-200/52"><Aperture size={13} /> What to notice</div>
                <p className="mt-3 text-[13px] leading-6 text-slate-300/72">For the same wavelength, a narrower opening produces a broader angular pattern. For the same opening, a longer wavelength also produces broader spreading. Scaling both lengths by the same factor leaves the ratio unchanged.</p>
              </div>
              <div className="mt-3 rounded-[17px] border border-cyan-100/[0.08] bg-cyan-300/[0.02] p-4">
                <strong className="text-[11px] text-cyan-100/80">The side lobes matter</strong>
                <p className="mt-2 text-[12px] leading-5 text-slate-400/72">The opening is not a point that simply sprays energy outward. Contributions across the aperture interfere, producing a bright central maximum, zeros, and weaker side maxima.</p>
              </div>
            </aside>
          </div>
        </Surface>
      </section>

      <section className="mt-10 border-t border-violet-100/[0.09] pt-6">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_350px] lg:items-start">
          <div>
            <div className="font-mono text-[12px] font-semibold uppercase tracking-[0.09em] text-cyan-200/54">03 · Conceptual bridge</div>
            <h2 className="mt-2 text-[clamp(1.8rem,3.3vw,3rem)] font-semibold leading-[0.96] tracking-[-0.048em] text-white">Diffraction is a wave-scale effect: geometry measured in wavelengths controls the angular pattern.</h2>
            <p className="mt-4 max-w-3xl text-[14px] leading-7 text-slate-300/72">Ray optics becomes a useful approximation when wavelength is tiny compared with the apertures and features that redirect the wave. When those scales become comparable, interference across the opening is visible in the transmitted field.</p>
          </div>
          <Surface variant="glass" className="rounded-[24px] border-cyan-100/[0.09] p-5" style={{ background: "rgba(4,12,20,0.18)" }}>
            <div className="font-mono text-[10px] uppercase tracking-[0.07em] text-cyan-200/50">The ratio to keep</div>
            <div className="mt-3 text-center font-mono text-[26px] text-cyan-100">a / λ</div>
            <p className="mt-3 text-[11px] leading-5 text-slate-500">Aperture width and wavelength have the same unit, so their ratio has no unit. Similar ratios produce similar normalized patterns in this idealized model.</p>
          </Surface>
        </div>
      </section>

      <section className="mt-10">
        <div className="font-mono text-[12px] font-semibold uppercase tracking-[0.09em] text-amber-200/54">04 · Formal structure</div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <FormulaCard title="First dark minimum" formula={`a\\sin\\theta_1=\\lambda`} note="For an ideal single slit in the Fraunhofer regime, the first zero occurs where the path-difference geometry cancels the aperture contributions." />
          <FormulaCard title="Pattern envelope" formula={`I(\\theta)\\propto\\left(\\frac{\\sin\\beta}{\\beta}\\right)^2`} note={`with β proportional to (a/λ) sinθ. This captures the central maximum and weaker side lobes of the ideal slit.`} />
        </div>
        <p className="mt-4 max-w-4xl text-[13px] leading-6 text-slate-400/72">Real apertures have thickness, finite illumination, imperfect coherence, detector response, polarization effects, near-field/far-field differences, and other details. The formulas here describe an idealized scalar-wave single-slit model.</p>
      </section>

      <section className="mt-10">
        <div className="font-mono text-[12px] font-semibold uppercase tracking-[0.09em] text-rose-200/52">05 · Common pitfall</div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <Pitfall title="Diffraction is not random scattering" text="The single-slit pattern is coherent and structured. Changing aperture geometry changes the interference pattern predictably in the ideal model." />
          <Pitfall title="A wider beam is not 'more energy created'" text="The angular distribution changes. The normalized display rescales brightness for visibility and does not track total transmitted power through different slit widths." />
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-3 font-mono text-[12px] font-semibold uppercase tracking-[0.09em] text-emerald-200/52">06 · Application</div>
        <div className="overflow-hidden rounded-[26px] border border-emerald-100/[0.10] bg-[#04110d]/66 backdrop-blur-xl">
          <div className="border-b border-white/[0.07] p-5 sm:p-6">
            <div className="text-[12px] font-semibold text-white/82">Tune a fresh slit.</div>
            <h3 className="mt-2 text-[clamp(1.5rem,2.7vw,2.3rem)] font-semibold tracking-[-0.04em] text-white">With λ fixed at 0.45 units, place the first dark minimum near 25°.</h3>
            <p className="mt-3 text-[13px] leading-6 text-slate-400/72">Adjust aperture width, then check your setting. This is an inverse use of the same relationship: target pattern → required geometry.</p>
          </div>
          <div className="grid gap-5 p-5 lg:grid-cols-[minmax(0,1fr)_330px] sm:p-6 lg:items-start">
            <div>
              <Control label="Aperture width a" value={transferAperture} min={0.48} max={2.5} step={0.01} display={`${transferAperture.toFixed(2)} units`} onChange={(value) => { setTransferAperture(value); setCheckedTransfer(false); }} />
              <div className="mt-4 rounded-[18px] border border-white/[0.07] bg-black/[0.08] p-4">
                <div className="grid gap-3 sm:grid-cols-3"><Readout label="Fixed λ" value="0.45" note="arbitrary length units" rgb="34,211,238" /><Readout label="Current θ₁" value={transferAngle === null ? "none" : `${transferAngle.toFixed(1)}°`} note="ideal first minimum" rgb="167,139,250" /><Readout label="Target" value="25.0°" note="within ±1° counts" rgb="74,222,128" /></div>
              </div>
              <button type="button" onClick={() => setCheckedTransfer(true)} className="mt-4 min-h-[44px] rounded-[14px] border border-emerald-200/[0.18] bg-emerald-300/[0.04] px-5 text-[12px] font-semibold text-emerald-100">Check geometry</button>
              {checkedTransfer ? <div className={`mt-4 rounded-[16px] border p-4 ${transferHit ? "border-emerald-300/[0.18] bg-emerald-300/[0.025]" : "border-amber-300/[0.14] bg-amber-300/[0.02]"}`}><strong className={`text-[12px] ${transferHit ? "text-emerald-200" : "text-amber-100/82"}`}>{transferHit ? "Target pattern reached" : "Keep tuning the slit"}</strong><p className="mt-2 text-[12px] leading-5 text-slate-400/72">{transferHit ? `Your aperture gives θ₁ ≈ ${transferAngle?.toFixed(2)}°. The same wave-scale relation works in reverse.` : transferAngle === null ? "This slit is too narrow for the first-zero relation to produce an angle below 90° in the ideal model. Widen the slit." : `Your first minimum is ${transferAngle.toFixed(1)}°. ${transferAngle > targetAngle ? "Widen" : "Narrow"} the slit to move it toward 25°.`}</p></div> : null}
            </div>
            <aside className="rounded-[18px] border border-white/[0.07] bg-black/[0.07] p-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.07em] text-emerald-200/46">Reason before calculating</div>
              <p className="mt-3 text-[12px] leading-6 text-slate-400/72">At fixed wavelength, a smaller aperture produces a larger first-minimum angle. So if your current angle is too large, the correction direction is known before any algebra.</p>
            </aside>
          </div>
        </div>
      </section>

      <nav className="mt-10 grid gap-3 border-t border-white/[0.07] pt-5 sm:grid-cols-2" aria-label="Waves and optics sequence">
        <Link href="/natural-science/physics/waves-optics/reflection-refraction" className="group rounded-[18px] border border-white/[0.07] bg-black/[0.07] p-4 transition hover:bg-black/[0.13]"><span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.07em] text-slate-500"><ArrowLeft size={12} /> Previous</span><strong className="mt-2 block text-[14px] text-white/84">Reflection &amp; Refraction</strong></Link>
        <Link href="/natural-science/physics/waves-optics/lenses-imaging" className="group rounded-[18px] border border-violet-200/[0.10] bg-violet-300/[0.02] p-4 text-right transition hover:bg-violet-300/[0.04]"><span className="flex items-center justify-end gap-2 font-mono text-[10px] uppercase tracking-[0.07em] text-violet-200/56">Next <ArrowRight size={12} /></span><strong className="mt-2 block text-[14px] text-white/84">Lenses &amp; Imaging</strong></Link>
      </nav>
    </SceneFrame>
  );
}

function buildScreen(wavelength: number, aperture: number) {
  return Array.from({ length: 181 }, (_, index) => {
    const theta = ((index - 90) / 90) * MAX_ANGLE;
    const radians = theta * Math.PI / 180;
    const beta = Math.PI * (aperture / wavelength) * Math.sin(radians);
    const sinc = Math.abs(beta) < 1e-7 ? 1 : Math.sin(beta) / beta;
    return { theta, intensity: sinc * sinc };
  });
}

function firstMinimumAngle(wavelength: number, aperture: number) {
  const value = wavelength / aperture;
  if (value > 1) return null;
  return Math.asin(value) * 180 / Math.PI;
}

function DiffractionDiagram({ wavelength, aperture, screen }: { wavelength: number; aperture: number; screen: { theta: number; intensity: number }[] }) {
  const ratio = aperture / wavelength;
  const slitHeight = Math.max(26, Math.min(110, 46 + ratio * 10));
  return <svg viewBox="0 0 760 330" className="h-[330px] w-full" preserveAspectRatio="none" role="img" aria-label="Idealized single-slit diffraction pattern"><line x1="255" y1="22" x2="255" y2={165 - slitHeight / 2} stroke="rgba(255,255,255,0.18)" strokeWidth="5" /><line x1="255" y1={165 + slitHeight / 2} x2="255" y2="308" stroke="rgba(255,255,255,0.18)" strokeWidth="5" />{[70,110,150,190,230].map((x) => <line key={x} x1={x} y1="48" x2={x} y2="282" stroke="rgba(34,211,238,0.11)" strokeWidth="1.5" />)}<line x1="50" y1="165" x2="250" y2="165" stroke="rgba(34,211,238,0.42)" strokeWidth="2" /><path d="M260 165 Q 430 74 610 42" fill="none" stroke="rgba(167,139,250,0.28)" /><path d="M260 165 Q 430 256 610 288" fill="none" stroke="rgba(167,139,250,0.28)" /><line x1="650" y1="28" x2="650" y2="302" stroke="rgba(255,255,255,0.13)" />{screen.map((item, index) => { const y = 165 + (item.theta / MAX_ANGLE) * 125; const half = item.intensity * 48; return <line key={index} x1={650 - half} x2={650 + half} y1={y} y2={y} stroke={`rgba(250,204,21,${0.06 + item.intensity * 0.72})`} strokeWidth="2" />; })}<text x="64" y="35" fill="rgba(165,243,252,0.56)" fontSize="11">incoming wavefronts</text><text x="271" y="38" fill="rgba(216,180,254,0.56)" fontSize="11">spreading field</text><text x="667" y="44" fill="rgba(253,230,138,0.56)" fontSize="11">far-field screen</text><text x="232" y="318" fill="rgba(148,163,184,0.50)" fontSize="10">a / λ = {ratio.toFixed(2)}</text></svg>;
}

function Control({ label, value, min, max, step, display, onChange }: { label: string; value: number; min: number; max: number; step: number; display: string; onChange: (value: number) => void }) {
  return <label className="mb-3 block rounded-[15px] border border-white/[0.06] bg-black/[0.06] p-3.5"><span className="flex items-center justify-between gap-3"><span className="text-[12px] font-semibold text-white/80">{label}</span><strong className="font-mono text-[12px] text-violet-100/82">{display}</strong></span><input aria-label={label} type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-violet-400" /></label>;
}

function Readout({ label, value, note, rgb }: { label: string; value: string; note: string; rgb: string }) {
  return <div className="rounded-[15px] border border-white/[0.06] bg-black/[0.08] p-3"><div className="font-mono text-[10px] uppercase tracking-[0.06em] text-slate-500">{label}</div><div className="mt-1 text-[18px] font-semibold" style={{ color: `rgb(${rgb})` }}>{value}</div><p className="mt-1 text-[11px] leading-4 text-slate-500">{note}</p></div>;
}

function FormulaCard({ title, formula, note }: { title: string; formula: string; note: string }) {
  return <div className="rounded-[20px] border border-white/[0.07] bg-black/[0.07] p-4"><strong className="text-[14px] text-white/86">{title}</strong><div className="mt-3 overflow-x-auto rounded-[13px] border border-white/[0.055] bg-black/[0.08] px-3 py-3 text-[17px] text-violet-50"><M display>{formula}</M></div><p className="mt-3 text-[12px] leading-5 text-slate-400/72">{note}</p></div>;
}

function Pitfall({ title, text }: { title: string; text: string }) {
  return <div className="rounded-[20px] border border-rose-200/[0.10] bg-rose-300/[0.018] p-5"><div className="flex items-center gap-2"><TriangleAlert size={14} className="text-rose-200/68" /><strong className="text-[13px] text-white/84">{title}</strong></div><p className="mt-3 text-[12px] leading-5 text-slate-400/72">{text}</p></div>;
}
