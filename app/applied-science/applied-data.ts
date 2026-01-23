import { Cpu, Code2, Dna, Bot, Zap, Globe, Shield, BrainCircuit, Hammer, Plane, Database, Pill } from "lucide-react";

export type Domain = "HARDWARE" | "SOFTWARE" | "WETWARE";

export const APPLIED_DOMAINS: Record<Domain, { title: string, desc: string, color: string, border: string, bg: string, icon: any }> = {
    HARDWARE: {
        title: "Hardware",
        desc: "Engineering the physical substrate. Thermodynamics, mechanics, and electronics.",
        color: "text-orange-500",
        border: "border-orange-500",
        bg: "from-orange-950 to-black",
        icon: Cpu
    },
    SOFTWARE: {
        title: "Software",
        desc: "Engineering the logic layer. Algorithms, data structures, and intelligence.",
        color: "text-cyan-500",
        border: "border-cyan-500",
        bg: "from-cyan-950 to-black",
        icon: Code2
    },
    WETWARE: {
        title: "Wetware",
        desc: "Engineering the biological machine. Genetics, neural interfaces, and synthetics.",
        color: "text-emerald-500",
        border: "border-emerald-500",
        bg: "from-emerald-950 to-black",
        icon: Dna
    }
};

export const APPLIED_FIELDS = [
    // HARDWARE
    {
        id: "robotics",
        domain: "HARDWARE",
        title: "Robotics",
        desc: "The intersection of sensing, actuation, and control. Machines that interact with the physical world.",
        icon: Bot,
        imageQuery: "Boston Dynamics robot parkour",
        diagramQuery: "robotic arm joint diagram"
    },
    {
        id: "aerospace",
        domain: "HARDWARE",
        title: "Aerospace",
        desc: "Overcoming gravity. The design of aircraft and spacecraft for atmospheric and extra-atmospheric flight.",
        icon: Plane,
        imageQuery: "SpaceX Starship launch",
        diagramQuery: "jet engine schematic cutaway"
    },
    {
        id: "civil",
        domain: "HARDWARE",
        title: "Civil Engineering",
        desc: "The infrastructure of civilization. Bridges, dams, roads, and the built environment.",
        icon: Hammer,
        imageQuery: "Golden Gate Bridge construction",
        diagramQuery: "suspension bridge forces diagram"
    },
    
    // SOFTWARE
    {
        id: "ai",
        domain: "SOFTWARE",
        title: "Artificial Intelligence",
        desc: "Machines that learn. Neural networks, LLMs, and computer vision systems.",
        icon: BrainCircuit,
        imageQuery: "neural network visualization glowing",
        diagramQuery: "transformer neural network architecture diagram"
    },
    {
        id: "cybersecurity",
        domain: "SOFTWARE",
        title: "Cybersecurity",
        desc: "Digital defense. Cryptography, network security, and the protection of information assets.",
        icon: Shield,
        imageQuery: "hacker matrix code digital lock",
        diagramQuery: "public key cryptography diagram"
    },
    {
        id: "datascience",
        domain: "SOFTWARE",
        title: "Data Science",
        desc: "Knowledge extraction. Mining insights from massive datasets using statistics and computation.",
        icon: Database,
        imageQuery: "big data visualization glowing graph",
        diagramQuery: "data science pipeline diagram"
    },

    // WETWARE
    {
        id: "genetics",
        domain: "WETWARE",
        title: "Genetic Engineering",
        desc: "Hacking the source code of life. CRISPR, gene therapy, and GMOs.",
        icon: Dna,
        imageQuery: "DNA double helix glowing",
        diagramQuery: "CRISPR Cas9 gene editing mechanism diagram"
    },
    {
        id: "neuraleng",
        domain: "WETWARE",
        title: "Neural Engineering",
        desc: "Bridging brain and machine. BCIs (Brain-Computer Interfaces) and prosthetics control.",
        icon: Zap,
        imageQuery: "brain computer interface chip",
        diagramQuery: "neuron synapse signaling diagram"
    },
    {
        id: "biotech",
        domain: "WETWARE",
        title: "Biotechnology",
        desc: "Technology based on biology. Brewing, pharmaceuticals, and synthetic materials.",
        icon: Pill,
        imageQuery: "biotech lab petri dish glowing",
        diagramQuery: "monoclonal antibody production diagram"
    }
];