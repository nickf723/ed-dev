"use client";

import DomainPageHeader from "@/app/_components/DomainPageHeader";
import PigmentFieldBackground from "@/app/_page-system/backgrounds/PigmentFieldBackground";
import PracticeStudioTopology, { type PracticeStudioNode } from "@/app/_page-system/topologies/PracticeStudioTopology";
import MuseumCollection from "./MuseumCollection";
import GoldenRatioComposer from "./GoldenRatioComposer";
import ChromaEngine from "./ChromaEngine";
import {
  Aperture,
  Brush,
  History,
  ImageIcon,
  Layers3,
  MonitorPlay,
  Palette,
  Printer,
  ScanEye,
  Shapes,
  type LucideIcon,
} from "lucide-react";

type Branch = {
  id: string;
  label: string;
  href: string;
  description?: string;
  status: "active" | "placeholder";
};

type Props = { branches: Branch[] };

type Meta = {
  question: string;
  material: string;
  rgb: string;
  icon: LucideIcon;
  position: { x: number; y: number; w: number; h: number };
};

const META: Record<string, Meta> = {
  "humanities.visual-arts.painting": {
    question: "How can marks, color, line, and surface organize an image?",
    material: "surface · pigment · line",
    rgb: "244, 63, 94",
    icon: Brush,
    position: { x: 6, y: 8, w: 34, h: 36 },
  },
  "humanities.visual-arts.sculpture": {
    question: "How does a work occupy, shape, or interrupt physical space?",
    material: "mass · void · material",
    rgb: "251, 146, 60",
    icon: Shapes,
    position: { x: 43, y: 8, w: 25, h: 44 },
  },
  "humanities.visual-arts.photography": {
    question: "What changes when an image is made through a lens and exposure?",
    material: "light · lens · frame",
    rgb: "34, 211, 238",
    icon: Aperture,
    position: { x: 71, y: 8, w: 23, h: 30 },
  },
  "humanities.visual-arts.printmaking": {
    question: "How does a matrix create repeatable images and editions?",
    material: "matrix · impression · edition",
    rgb: "250, 204, 21",
    icon: Printer,
    position: { x: 6, y: 48, w: 27, h: 36 },
  },
  "humanities.visual-arts.digital-media": {
    question: "What happens when the artwork can change through time, code, or interaction?",
    material: "screen · time · interaction",
    rgb: "167, 139, 250",
    icon: MonitorPlay,
    position: { x: 36, y: 57, w: 32, h: 32 },
  },
  "humanities.visual-arts.art-history": {
    question: "How do objects acquire meaning through time, place, institutions, and interpretation?",
    material: "object · evidence · context",
    rgb: "96, 165, 250",
    icon: History,
    position: { x: 71, y: 43, w: 23, h: 41 },
  },
};

export default function VisualArtsHub({ branches }: Props) {
  const nodes: PracticeStudioNode[] = branches.map((branch) => {
    const meta = META[branch.id] ?? META["humanities.visual-arts.painting"];
    return {
      id: branch.id,
      label: branch.label,
      question: meta.question,
      summary: branch.description ?? "",
      material: meta.material,
      rgb: meta.rgb,
      href: branch.href,
      status: branch.status === "placeholder" ? "planned" : "active",
      icon: meta.icon,
      position: meta.position,
    };
  });

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#0b0706] text-stone-100 selection:bg-orange-400/25">
      <PigmentFieldBackground />

      <div className="relative z-10 mx-auto w-full max-w-[1580px] px-4 pb-14 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.06] bg-[#0b0706]/78 px-4 pb-3 pt-5 shadow-[0_18px_58px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={[
              { label: "Humanities", href: "/humanities" },
              { label: "Visual Arts" },
            ]}
            eyebrow="Material · composition · image · object · context"
            eyebrowStyle="rule"
            icon={Palette}
            title={<span>Visual Arts</span>}
            subtitle="Visual art is made from material choices and encountered as images, objects, spaces, and time-based experiences. Study what the work is made from, how it is organized, how it is seen, and what changes when context changes."
            accentRgb="251, 146, 60"
            titleClassName="font-sans text-[clamp(2.9rem,5.6vw,6.3rem)] font-semibold leading-[0.83] tracking-[-0.067em] text-[#fff9f2]"
            headerClassName="border-white/[0.08]"
          />
        </div>

        <section className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1.16fr)_minmax(360px,0.84fr)]">
          <div className="rounded-[28px] border border-orange-200/[0.11] bg-black/[0.11] p-5 shadow-[0_28px_95px_rgba(0,0,0,0.20)] backdrop-blur-xl sm:p-6">
            <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.10em] text-orange-200/70">The object before the label</div>
            <h2 className="mt-2 max-w-4xl text-[clamp(1.8rem,3.2vw,2.9rem)] font-semibold tracking-[-0.05em] text-white">A work can be organized formally, materially, historically, and culturally at the same time.</h2>
            <p className="mt-3 max-w-3xl text-[14px] leading-6 text-stone-300/82">A painting is not only an arrangement of colors, and a sculpture is not only an object with dimensions. Materials, production, viewing conditions, representation, patronage, institutions, identity, and interpretation can all become part of what the work does.</p>
          </div>
          <div className="grid grid-cols-3 gap-2 rounded-[28px] border border-white/[0.08] bg-black/[0.11] p-3 backdrop-blur-xl">
            <Lens icon={Layers3} label="Material" text="What is physically present and how was it made?" rgb="251, 146, 60" />
            <Lens icon={ScanEye} label="Form" text="How are color, line, space, scale, rhythm, and emphasis organized?" rgb="244, 63, 94" />
            <Lens icon={History} label="Context" text="What changes when maker, audience, place, institution, and history are known?" rgb="96, 165, 250" />
          </div>
        </section>

        <section className="mt-5">
          <PracticeStudioTopology nodes={nodes} />
        </section>

        <section className="mt-5">
          <MuseumCollection />
        </section>

        <section className="mt-5 overflow-hidden rounded-[30px] border border-white/[0.08] bg-black/[0.11] shadow-[0_30px_105px_rgba(0,0,0,0.22)] backdrop-blur-xl">
          <div className="grid gap-4 border-b border-white/[0.07] p-5 lg:grid-cols-[minmax(0,1fr)_450px] lg:items-end sm:p-6">
            <div>
              <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.10em] text-rose-200/65"><ImageIcon size={13} /> Formal tools</div>
              <h2 className="mt-2 text-[clamp(1.7rem,3vw,2.7rem)] font-semibold tracking-[-0.045em] text-white">Use guides to compare choices, not to discover a secret recipe for beauty.</h2>
            </div>
            <p className="text-[13px] leading-6 text-stone-400">Composition grids and color-wheel relationships are analytical and generative tools. Their visual effect depends on subject, context, value, saturation, scale, material, and how the viewer encounters the work.</p>
          </div>
          <div className="grid gap-4 p-4 xl:grid-cols-2 sm:p-5">
            <GoldenRatioComposer />
            <ChromaEngine />
          </div>
        </section>
      </div>
    </main>
  );
}

function Lens({ icon: Icon, label, text, rgb }: { icon: LucideIcon; label: string; text: string; rgb: string }) {
  return (
    <div className="flex min-h-[154px] flex-col justify-between rounded-[18px] border border-white/[0.06] bg-white/[0.012] p-3.5">
      <Icon size={17} style={{ color: `rgb(${rgb})` }} />
      <div><div className="font-mono text-[9px] uppercase tracking-[0.07em]" style={{ color: `rgba(${rgb},0.72)` }}>{label}</div><p className="mt-1.5 text-[11px] leading-5 text-stone-400">{text}</p></div>
    </div>
  );
}
