// app/natural-science/astronomy/page.tsx
"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";
import {
  Orbit,
  Telescope,
  Atom,
  Sigma,
} from "@/components/icons";
import React from "react";

const astronomySymbols = [
  "\\text{AU}", "\\text{ly}", "\\text{M}_{\odot}", "\\text{Gyr}", "\\text{kpc}", "\\text{pc}", "\\lambda", "\\nu",
];

const disciplines = [
    {
      title: "Solar System Dynamics",
      desc: "The mechanics of planets, moons, asteroids, and comets within our solar system.",
      href: "/natural-science/astronomy/solar-system",
      Icon: Orbit,
      className: "theme-astronomy"
    },
    {
      title: "Stellar Evolution",
      desc: "The life cycle of stars, from birth in nebulae to final states like white dwarfs, neutron stars, and black holes.",
      href: "/natural-science/astronomy/stellar-evolution",
      Icon: Atom,
      className: "theme-astronomy"
    },
    {
      title: "Galaxies and Cosmology",
      desc: "The study of large-scale structures like galaxies and the origin, evolution, and fate of the entire universe.",
      href: "/natural-science/astronomy/cosmology",
      Icon: Sigma,
      className: "theme-astronomy"
    },
    {
      title: "Observational Astronomy",
      desc: "Techniques and instruments used to gather data, covering various electromagnetic spectra (radio, optical, X-ray).",
      href: "/natural-science/astronomy/observational",
      Icon: Telescope,
      className: "theme-astronomy"
    },
  ];


export default function AstronomyPage() {
  return (
    <main className="topic-page theme-astronomy lg:px-16">
      <FloatingSymbols symbols={astronomySymbols} />
      <PageHeader
        eyebrow="Natural Science"
        title="Astronomy"
        subtitle="The study of celestial objects, space, and the physical universe as a whole. It seeks to understand the origin and evolution of everything outside Earth’s atmosphere."
      />
      <section className="topic-grid">
        {disciplines.map((branch) => (
          <TopicCard
            key={branch.href}
            href={branch.href}
            title={branch.title}
            desc={branch.desc}
            Icon={branch.Icon}
            className={branch.className}
          />
        ))}
      </section>
    </main>
  );
}