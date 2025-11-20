// app/social-science/anthropology/page.tsx
"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";
import {
  Handshake,
  Dna,
  BookText,
  Skull,
} from "@/components/icons";
import React from "react";

const anthropologySymbols = [
  "\\text{Culture}", "\\text{Ethos}", "\\text{Meme}", "\\text{Artifact}", "\\text{Society}", "\\text{Kinship}", "\\text{Evolution}", "\\text{Fieldwork}",
];

const branches = [
  {
    title: "Cultural Anthropology",
    desc: "The study of human society and culture, examining social structures, beliefs, and practices around the world through ethnography.",
    href: "/social-science/anthropology/cultural-anthropology",
    Icon: Handshake,
    className: "theme-social-science"
  },
  {
    title: "Biological Anthropology",
    desc: "The study of the evolution, variation, and adaptation of human beings and their living and fossil relatives.",
    href: "/social-science/anthropology/biological-anthropology",
    Icon: Dna,
    className: "theme-social-science"
  },
  {
    title: "Linguistic Anthropology",
    desc: "The study of the role of language in the social lives of individuals and communities.",
    href: "/social-science/anthropology/linguistic-anthropology",
    Icon: BookText,
    className: "theme-social-science"
  },
  {
    title: "Archaeology",
    desc: "The study of human history and prehistory through the excavation and analysis of physical remains (artifacts).",
    href: "/social-science/anthropology/archaeology",
    Icon: Skull,
    className: "theme-social-science"
  },
];

export default function AnthropologyPage() {
  return (
    <main className="topic-page theme-social-science lg:px-16">
      <FloatingSymbols symbols={anthropologySymbols} />
      <PageHeader
        eyebrow="Social Science"
        title="Anthropology"
        subtitle="The comprehensive study of humankind, exploring human biology, language, culture, and societies, both past and present, across the globe."
      />
      <section className="topic-grid">
        {branches.map((branch) => (
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