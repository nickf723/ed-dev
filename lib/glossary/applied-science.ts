import { GlossaryDatabase, termCategories } from "./types";

export const appliedTerms: GlossaryDatabase = {
  "Load Bearing": {
    definition: "A structural element that bears the weight of the elements above it.",
    category: termCategories.ENGINEERING,
    href: "/applied-science/engineering/civil"
  },
  "Cryptographic Hash": {
    definition: "A mathematical algorithm that maps data of arbitrary size to a bit string of a fixed size.",
    category: termCategories.TECHNOLOGY,
    href: "/formal-science/computer-science/security-cryptography"
  },
  "Nitrogen Cycle": {
    definition: "The biogeochemical cycle by which nitrogen is converted into multiple chemical forms.",
    category: termCategories.AGRICULTURE,
    href: "/applied-science/agriculture"
  },
  "Transistor": {
    definition: "A semiconductor device used to amplify or switch electrical signals and power.",
    category: termCategories.ENGINEERING,
    href: "/applied-science/engineering/electrical"
  },
  "Pathogen": {
    definition: "A bacterium, virus, or other microorganism that can cause disease.",
    category: termCategories.MEDICINE,
    href: "/applied-science/medicine/microbiology"
  }
};