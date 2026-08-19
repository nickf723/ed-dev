import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import {
  ArrowRight,
  Eye,
  Fingerprint,
  Hash,
  KeyRound,
  Lock,
  Network,
  ScanSearch,
  Shield,
  ShieldCheck,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";
import CipherBackground from "./CipherBackground";
import EnigmaWidget from "./EnigmaWidget";

const NODE_ID = "formal.computer-science.security";

type BranchMeta = { icon: LucideIcon; role: string; question: string; rgb: string };
const BRANCH_META: Record<string, BranchMeta> = {
  "formal.computer-science.security.threat-models": { icon: ScanSearch, role: "define the adversary", question: "What must be protected, from whom, under which capabilities and trust assumptions?", rgb: "248, 113, 113" },
  "formal.computer-science.security.symmetric": { icon: KeyRound, role: "shared-secret protection", question: "How can a secret key provide confidentiality and authenticated encryption efficiently?", rgb: "52, 211, 153" },
  "formal.computer-science.security.public-key": { icon: Lock, role: "asymmetric trust", question: "How can public information support encryption, signatures, and key establishment without a pre-shared secret?", rgb: "56, 189, 248" },
  "formal.computer-science.security.integrity-authentication": { icon: Fingerprint, role: "detect and authenticate", question: "How can systems detect modification and verify possession of a key, credential, or identity?", rgb: "192, 132, 252" },
  "formal.computer-science.security.protocols": { icon: Network, role: "compose a secure system", question: "How do primitives, keys, identities, permissions, software, networks, and people interact under attack?", rgb: "250, 204, 21" },
};

const THREAT_LOOP = [
  ["01", "Identify assets", "Decide what has value: data, availability, credentials, computation, money, safety, privacy, reputation, or control."],
  ["02", "Model the adversary", "State what attackers know, control, observe, steal, modify, replay, guess, corrupt, or physically access."],
  ["03", "State security goals", "Define the confidentiality, integrity, authenticity, availability, authorization, privacy, or accountability properties required."],
  ["04", "Map trust & attack surface", "Locate components, users, interfaces, dependencies, keys, networks, and boundaries whose failure could violate those goals."],
  ["05", "Choose controls", "Use cryptography, isolation, access control, validation, redundancy, monitoring, rate limits, patching, procedures, and other defenses appropriate to the model."],
  ["06", "Verify & monitor", "Test assumptions, review implementation, exercise failure cases, observe operation, rotate secrets, patch vulnerabilities, and revise the threat model as the system changes."],
] as const;

const GOALS = [
  ["Confidentiality", "Prevent unauthorized disclosure of protected information."],
  ["Integrity", "Prevent or reliably detect unauthorized modification of data or state."],
  ["Authenticity", "Establish that a message, identity, key, or action came from the claimed source or authorized principal."],
  ["Availability", "Keep required services and resources usable despite faults, overload, or deliberate disruption."],
] as const;

const PRIMITIVES = [
  { icon: KeyRound, name: "Symmetric encryption", note: "Protect content with a shared secret; modern designs often combine confidentiality and integrity as authenticated encryption." },
  { icon: Lock, name: "Public-key methods", note: "Use paired public/private keys for signatures, key establishment, and some encryption schemes." },
  { icon: Hash, name: "Hash functions", note: "Map arbitrary input to fixed-length digests used inside integrity, signature, password, commitment, and identification constructions." },
  { icon: ShieldCheck, name: "MACs & signatures", note: "Authenticate messages or statements using secret-key or public-key mechanisms with different trust and verification properties." },
] as const;

export default function SecurityPage() {
  const context = requireCurriculumPageContext(NODE_ID);
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#03100c] text-slate-100 selection:bg-emerald-300/25">
      <CipherBackground />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_78%_14%,rgba(16,185,129,0.10),transparent_29%),radial-gradient(circle_at_17%_84%,rgba(56,189,248,0.04),transparent_28%),linear-gradient(to_bottom,rgba(3,16,12,0.08),rgba(3,16,12,0.80)_78%,rgba(2,9,7,0.98))]" aria-hidden="true" />
      <div className="relative z-10 mx-auto w-full max-w-[1580px] px-4 pb-14 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.06] bg-[#03100c]/80 px-4 pb-3 pt-5 shadow-[0_18px_58px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader breadcrumbs={context.breadcrumbs} eyebrow="Threats · trust · confidentiality · integrity · authentication" eyebrowStyle="rule" icon={Shield} title={<span>Security & Cryptography</span>} subtitle="Computer security studies systems under adversarial pressure. Cryptography supplies powerful mathematical primitives, but security depends on the threat model, key handling, protocols, implementation, permissions, dependencies, operations, and people around those primitives." accentRgb="16, 185, 129" titleClassName="font-sans text-[clamp(2.7rem,5.2vw,5.9rem)] font-semibold leading-[0.84] tracking-[-0.066em] text-[#f3fff9]" headerClassName="border-emerald-100/[0.10]" />
        </div>

        <section className="mt-5 overflow-hidden rounded-[32px] border border-emerald-200/[0.10] bg-black/[0.14] backdrop-blur-xl">
          <div className="grid gap-4 border-b border-white/[0.07] px-5 py-5 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end sm:px-6">
            <div><div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-200/56"><ScanSearch size={13} /> Threat-model workflow</div><h2 className="mt-2 text-[clamp(1.9rem,3.6vw,3.3rem)] font-semibold leading-[0.94] tracking-[-0.05em] text-white">A defense is meaningful only relative to an attacker and a security goal.</h2></div>
            <p className="text-[12px] leading-6 text-slate-400">“Secure” is not a universal property. A system can resist one capability while failing another, or protect confidentiality while sacrificing availability. The assumptions must be explicit.</p>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-3">{THREAT_LOOP.map(([number,label,detail])=><article key={number} className="min-h-[180px] border-b border-white/[0.06] px-5 py-5 md:border-r md:[&:nth-child(2n)]:border-r-0 xl:[&:nth-child(2n)]:border-r xl:[&:nth-child(3n)]:border-r-0 xl:[&:nth-last-child(-n+3)]:border-b-0"><span className="font-mono text-[8px] text-emerald-200/30">{number}</span><h3 className="mt-3 text-[13px] font-semibold text-white/86">{label}</h3><p className="mt-2 text-[10px] leading-5 text-slate-600">{detail}</p></article>)}</div>
        </section>

        <section className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1fr)_390px]">
          <nav aria-label="Security and Cryptography branches" className="overflow-hidden rounded-[30px] border border-white/[0.08] bg-black/[0.13] backdrop-blur-xl">
            <div className="border-b border-white/[0.07] px-5 py-5 sm:px-6"><div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-cyan-200/46">Planned curriculum branches</div><h2 className="mt-2 text-[clamp(1.6rem,2.8vw,2.5rem)] font-semibold tracking-[-0.043em] text-white">Security grows outward from the threat model into primitives and systems.</h2></div>
            <div className="grid sm:grid-cols-2 xl:grid-cols-3">{context.children.map((branch,index)=><SecurityBranch key={branch.id} branch={branch} index={index} />)}</div>
          </nav>
          <aside className="rounded-[30px] border border-white/[0.08] bg-black/[0.13] p-5 backdrop-blur-xl sm:p-6">
            <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-rose-200/44"><TriangleAlert size={13} /> Cryptography ≠ security</div>
            <h2 className="mt-2 text-[23px] font-semibold tracking-[-0.04em] text-white">Correct mathematics can still be assembled into an insecure system.</h2>
            <p className="mt-3 text-[11px] leading-5 text-slate-500">Weak randomness, leaked keys, unsafe defaults, confused identities, protocol mistakes, side channels, vulnerable software, excessive permissions, insecure recovery, or social engineering can defeat a system without “breaking” the underlying cipher.</p>
            <div className="mt-5 rounded-[15px] border border-emerald-200/[0.09] bg-emerald-200/[0.018] p-4"><div className="font-mono text-[8px] uppercase tracking-[0.09em] text-emerald-200/42">Open-design principle</div><p className="mt-2 text-[9px] leading-4 text-slate-600">A cryptographic design should not depend on the algorithm remaining secret. Security should rest on protected keys and clearly stated assumptions that can survive public scrutiny.</p></div>
          </aside>
        </section>

        <section className="mt-6 overflow-hidden rounded-[28px] border border-white/[0.08] bg-black/[0.13] backdrop-blur-xl">
          <div className="grid gap-4 border-b border-white/[0.07] px-5 py-5 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end sm:px-6"><div><div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-violet-200/44">Security goals · reference</div><h2 className="mt-2 text-[clamp(1.7rem,3vw,2.7rem)] font-semibold tracking-[-0.045em] text-white">Different failures violate different properties.</h2></div><p className="text-[11px] leading-5 text-slate-500">Real systems often require several goals simultaneously, and defenses can create tradeoffs among usability, cost, privacy, recoverability, and availability.</p></div>
          <div className="grid md:grid-cols-2 xl:grid-cols-4">{GOALS.map(([name,detail],index)=><article key={name} className="min-h-[160px] border-b border-white/[0.06] px-5 py-4 md:border-r md:[&:nth-child(2n)]:border-r-0 xl:border-b-0 xl:[&:nth-child(2n)]:border-r xl:last:border-r-0"><span className="font-mono text-[8px] text-emerald-200/28">0{index+1}</span><h3 className="mt-3 text-[12px] font-semibold text-white/84">{name}</h3><p className="mt-2 text-[10px] leading-5 text-slate-600">{detail}</p></article>)}</div>
        </section>

        <section className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1fr)_420px] xl:items-start">
          <div className="overflow-hidden rounded-[28px] border border-white/[0.08] bg-black/[0.13] backdrop-blur-xl">
            <div className="border-b border-white/[0.07] px-5 py-5 sm:px-6"><div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-cyan-200/44">Cryptographic primitives · reference</div><h2 className="mt-2 text-[clamp(1.6rem,2.8vw,2.5rem)] font-semibold tracking-[-0.043em] text-white">Primitives solve narrow problems; protocols compose them into behavior.</h2></div>
            <div className="grid sm:grid-cols-2">{PRIMITIVES.map((item,index)=>{const Icon=item.icon;return <article key={item.name} className="min-h-[170px] border-b border-white/[0.06] px-5 py-4 sm:border-r sm:[&:nth-child(2n)]:border-r-0 sm:[&:nth-last-child(-n+2)]:border-b-0"><div className="flex items-center justify-between"><Icon size={14} className="text-emerald-200/46"/><span className="font-mono text-[8px] text-slate-700">0{index+1}</span></div><h3 className="mt-3 text-[12px] font-semibold text-white/84">{item.name}</h3><p className="mt-2 text-[10px] leading-5 text-slate-600">{item.note}</p></article>})}</div>
          </div>
          <div><div className="mb-3 flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-emerald-200/48"><Eye size={12}/> Historical instrument</div><EnigmaWidget /><p className="mt-3 text-[9px] leading-4 text-slate-600">Rotor machines are useful historically for seeing keyed, changing substitution. Modern cryptography is built around very different primitives, security definitions, computational assumptions, and protocol designs.</p></div>
        </section>

        <section className="mt-6 grid gap-3 sm:grid-cols-3"><Neighbor href="/formal-science/mathematics/applied" label="Applied Mathematics" note="Number theory, probability, algebra, optimization, and discrete mathematics supply tools used across cryptography." rgb="34, 211, 238"/><Neighbor href="/formal-science/computer-science/algorithms" label="Algorithms & Data" note="Security depends on implementation, complexity, data structures, parsing, protocols, and systems behavior as well as cryptography." rgb="167, 139, 250"/><Neighbor href="/applied-science/computer-technology" label="Technology" note="Devices, networks, firmware, infrastructure, and human interfaces create the practical attack surface around formal security mechanisms." rgb="52, 211, 153"/></section>
      </div>
    </main>
  );
}

function SecurityBranch({ branch, index }: { branch: CurriculumNode; index: number }) {
  const meta = BRANCH_META[branch.id] ?? BRANCH_META["formal.computer-science.security.threat-models"];
  const Icon = meta.icon;
  return <div aria-label={`${branch.label}, planned`} className="min-h-[215px] border-b border-white/[0.06] px-5 py-5 opacity-52 sm:border-r sm:[&:nth-child(2n)]:border-r-0 xl:[&:nth-child(2n)]:border-r xl:[&:nth-child(3n)]:border-r-0"><div className="flex items-center justify-between"><span className="flex h-9 w-9 items-center justify-center rounded-[13px] border" style={{color:`rgb(${meta.rgb})`,borderColor:`rgba(${meta.rgb},0.22)`,background:`rgba(${meta.rgb},0.035)`}}><Icon size={15}/></span><span className="font-mono text-[8px] text-slate-700">0{index+1}</span></div><div className="mt-4 font-mono text-[8px] uppercase tracking-[0.09em]" style={{color:`rgba(${meta.rgb},0.56)`}}>{meta.role}</div><h3 className="mt-1 text-[13px] font-semibold text-white/84">{branch.label}</h3><p className="mt-2 text-[10px] leading-5 text-slate-600">{meta.question}</p><div className="mt-4 font-mono text-[8px] uppercase text-slate-700">planned</div></div>;
}
function Neighbor({href,label,note,rgb}:{href:string;label:string;note:string;rgb:string}){return <Link href={href} className="group flex min-h-[88px] items-center gap-3 rounded-[18px] border border-white/[0.07] bg-black/[0.12] px-4 py-3 backdrop-blur-md transition hover:bg-white/[0.025]"><span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{background:`rgb(${rgb})`,boxShadow:`0 0 18px rgba(${rgb},0.22)`}}/><span className="min-w-0 flex-1"><strong className="block text-[12px] text-white/82">{label}</strong><span className="mt-1 block text-[10px] leading-4 text-slate-600">{note}</span></span><ArrowRight size={12} className="text-slate-600 transition group-hover:translate-x-1"/></Link>}
