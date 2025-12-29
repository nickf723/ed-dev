// app/natural-science/earth-science/page.tsx
"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";
import {
  Mountain,
  Waves,
  Cloud,
  Sprout,
} from "lucide-react";
import React from "react";

const earthScienceSymbols = [
  "\\text{SiO}_2", "71\\%", "4.54\\text{ Gyr}", "\\text{Ma}", "\\text{PPM}", "O_2", "CO_2", "H_2O",
];

const disciplines = [
    {
      title: "Geology",
      desc: "The study of the Earth's solid material, its history, composition, and structure, including rocks, soil, and landforms.",
      href: "/natural-science/earth-science/geology",
      Icon: Mountain,
      className: "theme-earth-science"
    },
    {
      title: "Hydrology",
      desc: "The study of the movement, distribution, and quality of water on Earth, including the water cycle and aquatic systems.",
      href: "/natural-science/earth-science/hydrology",
      Icon: Cloud,
      className: "theme-earth-science"
    },
    {
      title: "Oceanography",
      desc: "The study of the ocean, including its physical, chemical, biological, and geological characteristics.",
      href: "/natural-science/earth-science/oceanography",
      Icon: Waves,
      className: "theme-earth-science"
    },
    {
      title: "Meteorology",
      desc: "The study of the atmosphere, weather, and climate, focusing on atmospheric processes and forecasting.",
      href: "/natural-science/earth-science/meteorology",
      Icon: Cloud,
      className: "theme-earth-science"
    },
    {
      title: "Environmental Science",
      desc: "The study of interactions between humans and the natural environment, focusing on sustainability and conservation.",
      href: "/natural-science/earth-science/environmental-science",
      Icon: Sprout,
      className: "theme-earth-science"
    },
  ];


export default function EarthSciencePage() {
  return (
    <main className="topic-page theme-earth-science lg:px-16">
      <FloatingSymbols symbols={earthScienceSymbols} />
      <PageHeader
        eyebrow="Natural Science"
        title="Earth Science"
        subtitle="The comprehensive study of our home planet, encompassing all physical, chemical, and biological systems that make up the Earth and its surrounding space."
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