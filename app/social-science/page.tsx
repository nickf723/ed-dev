// app/social-science/page.tsx
"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";
import {
  Handshake,
  Users,
  BrainCog,
  Landmark,
  DollarSign,
} from "@/components/icons";

const socialScienceSymbols = [
  "H₂O", "GDP", "NPS", "P-Value", "t-test", "R", "C", "E", "S",
];

export default function SocialSciencePage() {
  const disciplines = [
    {
      title: "Sociology",
      desc: "The study of social behavior, society, patterns of social relationships, social interaction, and culture.",
      href: "/social-science/sociology",
      Icon: Users,
      className: "theme-social-science topic-card-wide"
    },
    {
      title: "Psychology",
      desc: "The scientific study of the mind and behavior.",
      href: "/social-science/psychology",
      Icon: BrainCog,
      className: "theme-social-science"
    },
    {
      title: "Economics",
      desc: "The study of how people interact with value, production, distribution, and consumption.",
      href: "/social-science/economics",
      Icon: DollarSign,
      className: "theme-social-science"
    },
    {
      title: "Political Science",
      desc: "The systematic study of political systems, governance, and political behavior.",
      href: "/social-science/political-science",
      Icon: Landmark,
      className: "theme-social-science"
    },
  ];

  return (
    <main className="topic-page theme-social-science lg:px-16">
      <FloatingSymbols symbols={socialScienceSymbols} />
      <PageHeader
        eyebrow="Discipline Overview"
        title="Social Sciences"
        subtitle="The systematic study of human society and social relationships, exploring collective behavior, institutions, and the foundations of human culture."
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