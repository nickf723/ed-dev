import { Network, Activity, RefreshCw, Zap, Globe, Cpu } from "lucide-react";

export const SYSTEMS_SECTORS = [
  {
    id: "cybernetics",
    label: "Cybernetics",
    sub: "Control & Feedback",
    desc: "The study of control and communication in the animal and the machine. Focuses on feedback loops (positive/negative) and homeostasis.",
    icon: Activity,
    color: "text-red-400",
    border: "group-hover:border-red-500/50",
    bg: "group-hover:bg-red-950/10",
    href: "/formal-science/systems-science/cybernetics"
  },
  {
    id: "complexity",
    label: "Complexity Theory",
    sub: "Emergence & Adaptation",
    desc: "How order emerges from chaos. The study of Complex Adaptive Systems (CAS) like ant colonies, economies, and the brain.",
    icon: Network,
    color: "text-orange-400",
    border: "group-hover:border-orange-500/50",
    bg: "group-hover:bg-orange-950/10",
    href: "/formal-science/systems-science/complexity-theory"
  },
  {
    id: "chaos",
    label: "Chaos Theory",
    sub: "Nonlinear Dynamics",
    desc: "The 'Butterfly Effect'. Systems where small changes in initial conditions result in vastly different outcomes.",
    icon: Zap,
    color: "text-yellow-400",
    border: "group-hover:border-yellow-500/50",
    bg: "group-hover:bg-yellow-950/10",
    href: "/formal-science/systems-science/chaos-theory"
  },
  {
    id: "networks",
    label: "Network Science",
    sub: "Graph Theory",
    desc: "The structure of connections. From social networks to the internet and biological food webs.",
    icon: Globe,
    color: "text-pink-400",
    border: "group-hover:border-pink-500/50",
    bg: "group-hover:bg-pink-950/10",
    href: "/formal-science/systems-science/network-science"
  },
  {
    id: "systems_eng",
    label: "Systems Engineering",
    sub: "Holistic Design",
    desc: "An interdisciplinary field focusing on how to design and manage complex systems over their life cycles.",
    icon: Cpu,
    color: "text-blue-400",
    border: "group-hover:border-blue-500/50",
    bg: "group-hover:bg-blue-950/10",
    href: "/formal-science/systems-science/systems-engineering"
  },
  {
    id: "dynamics",
    label: "System Dynamics",
    sub: "Simulation Modeling",
    desc: "Understanding the nonlinear behavior of complex systems over time using stocks, flows, and internal feedback loops.",
    icon: RefreshCw,
    color: "text-emerald-400",
    border: "group-hover:border-emerald-500/50",
    bg: "group-hover:bg-emerald-950/10",
    href: "/formal-science/systems-science/system-dynamics"
  }
];