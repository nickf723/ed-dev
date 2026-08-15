"use client";

import { useState } from "react";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { M } from "@/app/_components/Math";
import RelativityField from "../../_components/RelativityField";
import { ArrowRight, Gauge, Hourglass, Orbit, Zap } from "lucide-react";

type Signal = "light" | "probe";

export default function FramesPostulatesPage() {
  const [frameSpeed, setFrameSpeed] = useState(0.6);
  const [signal, setSignal] = useState<Signal>("light");
  const [answer, setAnswer] = useState<string | null>(null);

  const uPrime = signal === "light" ? 1 : 0.5;
  const classical = uPrime + frameSpeed;
  const relativistic = (uPrime + frameSpeed) / (1 + uPrime * frameSpeed);
  const gamma = 1 / Math.sqrt(1 - frameSpeed * frameSpeed);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#030308] text-slate-100 selection:bg-amber-300/25">
      <RelativityField mode="special" />
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 pb-12 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.07] bg-[#030308]/68 px-4 pb-4 pt-5 backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader breadcrumbs={[{ label: "Physics", href: "/natural-science/physics" }, { label: "Relativity", href: "/natural-science/physics/relativity" }, { label: "Special Relativity", href: "/natural-science/physics/relativity/special" }, { label: "Frames & Postulates" }]} eyebrow="Special Relativity · 01 / 06" icon={Orbit} title={<span>Frames & Postulates</span>} subtitle="Special relativity begins with inertial frames and two commitments: the laws of physics take the same form in every inertial frame, and light in vacuum has the same speed c for every inertial observer." accentRgb="245, 158, 11" titleClassName="font-mono text-[clamp(1.9rem,4.1vw,4.3rem)] font-semibold uppercase leading-[0.9] tracking-[-0.052em] text-[#fffaf0]" headerClassName="border-transparent" />
        </div>

        <section className="mt-5 grid gap-4 rounded-[28px] border border-amber-200/[0.10] bg-black/[0.08] p-5 backdrop-blur-md lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.72fr)] sm:p-6">
          <div><div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-amber-300/70">The learner question</div><h2 className="mt-2 text-[clamp(1.6rem,3vw,2.35rem)] font-semibold tracking-[-0.04em] text-white">What breaks if light refuses to obey ordinary velocity addition?</h2><p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400">In Newtonian mechanics, speeds simply add between moving frames. That works well at ordinary speeds. But applying it to light would make different inertial observers measure different light speeds, contradicting the relativistic postulate.</p></div>
          <div className="rounded-[18px] border border-amber-200/[0.09] bg-amber-400/[0.025] p-4"><div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-amber-300/62">Relativistic velocity addition</div><div className="mt-3 text-[17px] text-white"><M>{"u=\\frac{u'+v}{1+u'v/c^2}"}</M></div><p className="mt-2 text-[11px] leading-5 text-slate-500">Below, all velocities are shown as fractions of <M>c</M>, so the formula uses <M>{"c=1"}</M>.</p></div>
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
          <div className="rounded-[30px] border border-white/[0.08] bg-black/[0.07] p-5 backdrop-blur-sm sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3"><div><div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-amber-300/70">Frame-comparison lab</div><h2 className="mt-1 text-[21px] font-semibold tracking-[-0.025em] text-white">Launch the same signal from a moving frame.</h2></div><div className="rounded-full border border-white/[0.07] bg-black/[0.16] px-3 py-1.5 font-mono text-[10px] text-slate-500">γ = {gamma.toFixed(3)}</div></div>

            <div className="relative mt-4 min-h-[380px] overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#09080e]/62 p-5">
              <FrameDiagram frameSpeed={frameSpeed} signal={signal} classical={classical} relativistic={relativistic} />
              <div className="absolute bottom-5 left-5 right-5 grid grid-cols-4 gap-2"><Readout label="frame speed v" value={`${frameSpeed.toFixed(2)} c`} rgb="245, 158, 11" /><Readout label="signal in ship u′" value={`${uPrime.toFixed(2)} c`} rgb="34, 211, 238" /><Readout label="classical prediction" value={`${classical.toFixed(2)} c`} rgb="248, 113, 113" /><Readout label="relativistic result" value={`${relativistic.toFixed(2)} c`} rgb="74, 222, 128" /></div>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_1fr]">
              <Control label="Frame speed v" value={frameSpeed} min={-0.9} max={0.9} step={0.01} unit="c" onChange={setFrameSpeed} />
              <div><div className="mb-2 text-[9px] uppercase tracking-[0.11em] text-slate-600">Signal in moving frame</div><div className="flex gap-2">{(["light","probe"] as Signal[]).map((item)=><button key={item} type="button" onClick={()=>setSignal(item)} className="flex-1 rounded-[13px] border px-3 py-2 text-[10px]" style={{borderColor:signal===item?"rgba(245,158,11,0.26)":"rgba(255,255,255,0.06)",background:signal===item?"rgba(245,158,11,0.05)":"rgba(0,0,0,0.10)",color:signal===item?"rgb(254,243,199)":"rgb(100,116,139)"}}>{item === "light" ? "light · 1.00c" : "probe · 0.50c"}</button>)}</div></div>
            </div>
          </div>

          <div className="space-y-4"><Insight icon={Gauge} title="An inertial frame moves without acceleration" text="Special relativity compares frames in uniform relative motion. No inertial frame is physically privileged as the universal frame at rest." rgb="245, 158, 11" /><Insight icon={Zap} title="Light speed is invariant" text="Set the signal to light and move the source frame. Relativistic velocity addition keeps the observed vacuum light speed at exactly c." rgb="34, 211, 238" /><Insight icon={Hourglass} title="Space and time must adjust instead" text="If c is invariant, observers cannot all share Newtonian simultaneity, lengths, and time intervals. Lorentz transformations replace Galilean ones." rgb="167, 139, 250" /></div>
        </section>

        <section className="mt-4 grid gap-3 md:grid-cols-2"><Principle title="Postulate 1" text="The laws of physics have the same form in all inertial frames. Uniform motion alone cannot reveal a preferred inertial frame." rgb="245, 158, 11" /><Principle title="Postulate 2" text="Every inertial observer measures the same vacuum light speed c, independent of the source or observer motion." rgb="34, 211, 238" /></section>

        <section className="mt-4 rounded-[26px] border border-white/[0.08] bg-black/[0.08] p-5 backdrop-blur-md sm:p-6"><div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-300/65">Transfer check</div><h2 className="mt-1 text-[20px] font-semibold text-white">A spacecraft moves at 0.8c and shines a flashlight forward. What speed does an inertial observer on Earth measure for the light?</h2><div className="mt-4 flex flex-wrap gap-2">{["1.8c", "1.0c", "0.2c"].map((option)=><button key={option} type="button" onClick={()=>setAnswer(option)} className="rounded-full border px-4 py-2 text-[11px]" style={{borderColor:answer===option?"rgba(45,212,191,0.34)":"rgba(255,255,255,0.07)",background:answer===option?"rgba(45,212,191,0.05)":"rgba(0,0,0,0.12)",color:answer===option?"rgb(209,250,229)":"rgb(148,163,184)"}}>{option}</button>)}</div>{answer?<div className={`mt-4 rounded-[16px] border p-4 ${answer==="1.0c"?"border-emerald-300/[0.16] bg-emerald-400/[0.03]":"border-amber-300/[0.16] bg-amber-400/[0.025]"}`}><strong className={`text-[11px] ${answer==="1.0c"?"text-emerald-200":"text-amber-200"}`}>{answer==="1.0c"?"Exactly":"Use the relativistic postulate"}</strong><p className="mt-1 text-[11px] leading-5 text-slate-500">Substituting <M>{"u'=c"}</M> into relativistic velocity addition gives <M>{"u=c"}</M> for any subluminal frame speed.</p></div>:null}<div className="mt-5 flex justify-between"><Link href="/natural-science/physics/relativity/special" className="text-[10px] text-slate-500 hover:text-slate-300">← Special Relativity map</Link><div className="inline-flex items-center gap-2 rounded-full border border-amber-200/[0.08] bg-amber-400/[0.02] px-4 py-2 text-[10px] text-slate-600">Next: Relativity of Simultaneity · planned <ArrowRight size={12}/></div></div></section>
      </div>
    </main>
  );
}

function FrameDiagram({ frameSpeed, signal, classical, relativistic }: { frameSpeed:number; signal:Signal; classical:number; relativistic:number }) { const shipX=50+frameSpeed*26; const classicalX=50+Math.max(-1.2,Math.min(1.8,classical))*26; const relativisticX=50+relativistic*26; return <div className="absolute inset-x-5 top-5 h-[285px]"><div className="absolute left-[8%] right-[8%] top-[30%] h-px bg-white/[0.12]"/><div className="absolute left-[8%] right-[8%] top-[68%] h-px bg-white/[0.12]"/><div className="absolute left-[8%] top-[18%] font-mono text-[9px] text-slate-600">Galilean prediction</div><div className="absolute left-[8%] top-[56%] font-mono text-[9px] text-slate-600">Relativistic measurement</div><div className="absolute top-[30%] -translate-x-1/2 -translate-y-1/2 rounded-[10px] border border-amber-200/[0.18] bg-amber-400/[0.05] px-3 py-2 font-mono text-[9px] text-amber-100/70" style={{left:`${shipX}%`}}>source</div><div className="absolute top-[68%] -translate-x-1/2 -translate-y-1/2 rounded-[10px] border border-amber-200/[0.18] bg-amber-400/[0.05] px-3 py-2 font-mono text-[9px] text-amber-100/70" style={{left:`${shipX}%`}}>source</div><div className="absolute top-[30%] h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-300 shadow-[0_0_20px_rgba(248,113,113,0.55)]" style={{left:`${classicalX}%`}}/><div className="absolute top-[68%] h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.55)]" style={{left:`${relativisticX}%`}}/><div className="absolute right-[7%] top-[22%] font-mono text-[9px] text-red-200/60">{signal === "light" ? "classical light can exceed c" : "ordinary sum"}</div><div className="absolute right-[7%] top-[60%] font-mono text-[9px] text-cyan-200/60">Lorentz velocity addition</div></div>; }
function Control({label,value,min,max,step,unit,onChange}:{label:string;value:number;min:number;max:number;step:number;unit:string;onChange:(value:number)=>void}) { return <div><div className="mb-2 flex justify-between text-[9px] uppercase tracking-[0.11em] text-slate-600"><span>{label}</span><span className="font-mono text-amber-100/60">{value.toFixed(2)} {unit}</span></div><input aria-label={label} type="range" min={min} max={max} step={step} value={value} onChange={(event)=>onChange(Number(event.target.value))} className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-amber-400"/></div>; }
function Readout({label,value,rgb}:{label:string;value:string;rgb:string}) { return <div className="rounded-[13px] border border-white/[0.06] bg-black/[0.20] px-3 py-2.5"><div className="text-[8px] uppercase tracking-[0.1em] text-slate-600">{label}</div><div className="mt-1 truncate font-mono text-[10px]" style={{color:`rgba(${rgb},0.78)`}}>{value}</div></div>; }
function Insight({icon:Icon,title,text,rgb}:{icon:typeof Orbit;title:string;text:string;rgb:string}) { return <div className="rounded-[22px] border border-white/[0.07] bg-black/[0.08] p-4 backdrop-blur-md"><div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.12em]" style={{color:`rgba(${rgb},0.68)`}}><Icon size={12}/> frame idea</div><strong className="mt-2 block text-[12px] text-white">{title}</strong><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>; }
function Principle({title,text,rgb}:{title:string;text:string;rgb:string}) { return <div className="rounded-[18px] border border-white/[0.06] bg-black/[0.08] p-4"><div className="h-1 w-10 rounded-full" style={{background:`rgba(${rgb},0.72)`}}/><strong className="mt-3 block text-[12px] text-white">{title}</strong><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>; }
