export interface Concept {
  id: string;
  name: string;
  question: string;
  desc: string;
  icon: any; // Lucide Icon
}

export const CONCEPTS: Concept[] = [
  {
    id: 'ontology',
    name: 'Ontology',
    question: 'What is "being"?',
    desc: "The study of existence itself. Categories of being and their relations. If a tree falls in a forest and no one is around to hear it, does it make a sound?",
    icon: 'Box'
  },
  {
    id: 'dualism',
    name: 'Mind-Body Dualism',
    question: 'Are you your brain?',
    desc: "Descartes' theory that the mental and the physical are two distinct substances. How does a non-physical thought cause a physical arm to move?",
    icon: 'Split'
  },
  {
    id: 'determinism',
    name: 'Determinism vs Free Will',
    question: 'Do you have a choice?',
    desc: "If the universe follows physical laws of cause and effect, was your reading of this sentence determined at the Big Bang?",
    icon: 'GitBranch'
  },
  {
    id: 'simulism',
    name: 'Simulation Theory',
    question: 'Is this real?',
    desc: "The modern update to Plato's Cave. The probability that we are living in a computer simulation run by a post-human civilization.",
    icon: 'Cpu'
  }
];