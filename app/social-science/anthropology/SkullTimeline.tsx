"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Brain, Footprints, Globe2, Skull, Wrench } from "lucide-react";

const HOMININS = [
  {
    id: "afarensis",
    name: "Australopithecus afarensis",
    time: "~3.9–2.9 million years ago",
    brain: "~400–500 cc",
    feat: "habitual bipedalism",
    icon: Footprints,
    desc: "A well-known australopith with a small brain and clear adaptations for upright walking. It is one branch among several early hominins, not a guaranteed direct ancestor of later Homo.",
  },
  {
    id: "habilis",
    name: "Early Homo / H. habilis",
    time: "~2.4–1.4 million years ago",
    brain: "~500–700 cc",
    feat: "tool association",
    icon: Wrench,
    desc: "Fossils grouped as Homo habilis show a mosaic of traits. Oldowan stone tools overlap this period, but stone-tool making began before the earliest fossils usually assigned to H. habilis.",
  },
  {
    id: "erectus",
    name: "Homo erectus",
    time: "~1.9 million–110,000 years ago",
    brain: "~600–1,100 cc",
    feat: "wide dispersal",
    icon: Globe2,
    desc: "A long-lived and geographically widespread lineage with human-like body proportions, major dispersals beyond Africa, and diverse stone-tool traditions across its range.",
  },
  {
    id: "neanderthal",
    name: "Homo neanderthalensis",
    time: "~400,000–40,000 years ago",
    brain: "often ~1,200–1,750 cc",
    feat: "Eurasian adaptation",
    icon: Skull,
    desc: "Neanderthals were a closely related Eurasian lineage with sophisticated technologies, care for injured group members, symbolic behavior in some contexts, and genetic exchange with Homo sapiens.",
  },
  {
    id: "sapiens",
    name: "Homo sapiens",
    time: "~300,000 years ago–present",
    brain: "commonly ~1,200–1,500 cc",
    feat: "global expansion",
    icon: Brain,
    desc: "Our species emerged within Africa and later expanded globally while interacting with other hominin populations. Cultural complexity accumulated unevenly across many communities and environments.",
  },
] as const;

export default function SkullTimeline() {
  const [index, setIndex] = useState(0);
  const current = HOMININS[index];
  const FeatureIcon = current.icon;

  return (
    <div className="overflow-hidden rounded-[24px] border border-amber-100/[0.12] bg-[#17100c]/46 shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-[16px] backdrop-saturate-[1.08]">
      <div className="flex items-center justify-between border-b border-amber-100/[0.08] px-5 py-4">
        <h3 className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.12em] text-stone-300">
          <Skull size={15} className="text-amber-400" /> Hominin deep time
        </h3>
        <span className="font-mono text-[11px] text-stone-500">branching record</span>
      </div>

      <div className="p-5 sm:p-6">
        <div className="w-full">
          <input
            type="range"
            min="0"
            max={HOMININS.length - 1}
            step="1"
            value={index}
            onChange={(event) => setIndex(Number(event.target.value))}
            className="w-full accent-amber-500"
            aria-label="Choose a hominin specimen in deep time"
          />
          <div className="mt-2 flex justify-between font-mono text-[11px] uppercase tracking-[0.08em] text-stone-600">
            <span>older</span>
            <span>recent</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.18 }}
            className="mt-5"
          >
            <h4 className="text-[20px] font-semibold tracking-[-0.03em] text-white">{current.name}</h4>
            <span className="mt-2 inline-block rounded-full border border-amber-400/25 bg-amber-400/[0.06] px-3 py-1 font-mono text-[11px] text-amber-200/80">
              {current.time}
            </span>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-[14px] border border-white/[0.07] bg-black/[0.12] p-3 backdrop-blur-[10px]">
                <Brain size={15} className="text-stone-500" />
                <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.08em] text-stone-600">Approx. cranial capacity</div>
                <strong className="mt-1 block text-[14px] text-stone-200">{current.brain}</strong>
              </div>
              <div className="rounded-[14px] border border-amber-100/[0.08] bg-amber-300/[0.025] p-3 backdrop-blur-[10px]">
                <FeatureIcon size={15} className="text-amber-400" />
                <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.08em] text-stone-600">Useful clue</div>
                <strong className="mt-1 block text-[14px] text-amber-100/88">{current.feat}</strong>
              </div>
            </div>

            <p className="mt-4 text-[13px] leading-6 text-stone-300/72">{current.desc}</p>
            <p className="mt-3 border-l border-amber-300/30 pl-3 text-[12px] leading-5 text-stone-500">
              This viewer samples a few well-known lineages. Human evolution contains overlapping branches, uncertain relationships, regional variation, and many additional hominin groups.
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
