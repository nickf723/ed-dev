import { Users, Scale, MessageCircle, Globe, Building2, BrainCircuit } from "lucide-react";

export const SOCIOLOGY_TOPICS = [
  {
    id: "functionalism",
    title: "Structural Functionalism",
    proponent: "Émile Durkheim",
    desc: "Society is a complex system whose parts work together to promote solidarity and stability. Just like organs in a body.",
    icon: Building2,
    imageQuery: "ant colony complex structure",
    color: "text-violet-400",
    diagramQuery: "structural functionalism society diagram"
  },
  {
    id: "conflict",
    title: "Conflict Theory",
    proponent: "Karl Marx",
    desc: "Society is in a state of perpetual conflict because of competition for limited resources. Order is maintained by domination, not consensus.",
    icon: Scale,
    imageQuery: "industrial revolution workers protest",
    color: "text-red-400",
    diagramQuery: "marxist class conflict pyramid"
  },
  {
    id: "interactionism",
    title: "Symbolic Interactionism",
    proponent: "Max Weber / G.H. Mead",
    desc: "A micro-level theory that focuses on the relationships among individuals within a society and how they create meaning through symbols.",
    icon: MessageCircle,
    imageQuery: "people talking cafe conversation",
    color: "text-cyan-400",
    diagramQuery: "symbolic interactionism communication model"
  },
  {
    id: "socialization",
    title: "Socialization",
    proponent: "Nature vs Nurture",
    desc: "The lifelong process of inheriting and disseminating norms, customs, and ideologies.",
    icon: BrainCircuit,
    imageQuery: "child learning classroom",
    color: "text-pink-400"
  },
  {
    id: "stratification",
    title: "Social Stratification",
    proponent: "Hierarchy",
    desc: "A society's categorization of its people into rankings based on socioeconomic tiers like wealth, income, race, education, and power.",
    icon: Globe,
    imageQuery: "skyscraper city slums contrast",
    color: "text-emerald-400",
    diagramQuery: "social stratification pyramid diagram"
  }
];