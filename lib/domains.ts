import type { LucideIcon } from "lucide-react";
import { Atom, BookOpen, Hammer, Link as LinkIcon, Sigma, Users } from "lucide-react";

export type DomainId =
  | "formal"
  | "natural"
  | "social"
  | "humanities"
  | "applied"
  | "inter";

export type DomainDefinition = {
  id: DomainId;
  title: string;
  navLabel: string;
  subtitle: string;
  description: string;
  href: string;
  icon: LucideIcon;
  tags: string[];
  theme: {
    rgb: string;
    text: string;
    border: string;
    background: string;
    sidebar: string;
  };
};

export const DOMAINS: DomainDefinition[] = [
  {
    id: "formal",
    title: "Formal Sciences",
    navLabel: "Formal Science",
    subtitle: "Structure & Proof",
    description: "Abstract systems of mathematics, logic, computation, information, data, and systems.",
    href: "/formal-science",
    icon: Sigma,
    tags: ["Mathematics", "Logic", "Computation", "Information", "Data", "Systems"],
    theme: {
      rgb: "255, 65, 54",
      text: "text-[#ff6258]",
      border: "border-[#ff4136]/50",
      background: "bg-[#ff4136]/20",
      sidebar: "text-[#ff6258] border-[#ff4136]/30 bg-[#ff4136]/10 shadow-[0_0_15px_rgba(255,65,54,0.12)]",
    },
  },
  {
    id: "natural",
    title: "Natural Sciences",
    navLabel: "Natural Science",
    subtitle: "Physical Laws",
    description: "The observable systems and laws governing the natural universe.",
    href: "/natural-science",
    icon: Atom,
    tags: ["Physics", "Chemistry", "Biology", "Earth & Space"],
    theme: {
      rgb: "52, 211, 153",
      text: "text-emerald-400",
      border: "border-emerald-500/50",
      background: "bg-emerald-500/20",
      sidebar: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10 shadow-[0_0_15px_rgba(52,211,153,0.10)]",
    },
  },
  {
    id: "social",
    title: "Social Sciences",
    navLabel: "Social Science",
    subtitle: "Human Patterns",
    description: "People, behavior, institutions, societies, and collective systems.",
    href: "/social-science",
    icon: Users,
    tags: ["Psychology", "Sociology", "Economics", "Politics"],
    theme: {
      rgb: "96, 165, 250",
      text: "text-blue-400",
      border: "border-blue-500/50",
      background: "bg-blue-500/20",
      sidebar: "text-blue-400 border-blue-500/30 bg-blue-500/10 shadow-[0_0_15px_rgba(96,165,250,0.10)]",
    },
  },
  {
    id: "humanities",
    title: "Humanities",
    navLabel: "Humanities",
    subtitle: "Culture & Meaning",
    description: "Human history, meaning, expression, interpretation, and culture.",
    href: "/humanities",
    icon: BookOpen,
    tags: ["History", "Philosophy", "Literature", "Arts"],
    theme: {
      rgb: "251, 191, 36",
      text: "text-amber-400",
      border: "border-amber-500/50",
      background: "bg-amber-500/20",
      sidebar: "text-amber-400 border-amber-500/30 bg-amber-500/10 shadow-[0_0_15px_rgba(251,191,36,0.10)]",
    },
  },
  {
    id: "applied",
    title: "Applied Sciences",
    navLabel: "Applied Science",
    subtitle: "Knowledge in Action",
    description: "Knowledge turned into engineered systems, tools, treatments, and designs.",
    href: "/applied-science",
    icon: Hammer,
    tags: ["Engineering", "Medicine", "Technology", "Design"],
    theme: {
      rgb: "167, 139, 250",
      text: "text-violet-400",
      border: "border-violet-500/50",
      background: "bg-violet-500/20",
      sidebar: "text-violet-400 border-violet-500/30 bg-violet-500/10 shadow-[0_0_15px_rgba(167,139,250,0.10)]",
    },
  },
  {
    id: "inter",
    title: "Interdisciplines",
    navLabel: "Interdisciplines",
    subtitle: "Synthesis",
    description: "Fields formed where established disciplines overlap and exchange tools.",
    href: "/interdisciplines",
    icon: LinkIcon,
    tags: ["Cognitive Science", "Bioinformatics", "Mechatronics", "Complexity"],
    theme: {
      rgb: "251, 146, 60",
      text: "text-orange-400",
      border: "border-orange-500/50",
      background: "bg-orange-500/20",
      sidebar: "text-orange-400 border-orange-500/30 bg-orange-500/10 shadow-[0_0_15px_rgba(251,146,60,0.10)]",
    },
  },
];

export const DOMAIN_BY_ID = Object.fromEntries(
  DOMAINS.map((domain) => [domain.id, domain]),
) as Record<DomainId, DomainDefinition>;

export function getDomainForPath(pathname: string): DomainDefinition | undefined {
  return DOMAINS.find(
    (domain) => pathname === domain.href || pathname.startsWith(`${domain.href}/`),
  );
}
