// lib/universal-db.ts

export type ConceptEntry = {
  id: string;
  english: string;
  category: string;
  icon: string; // Emoji or Icon Name
  desc: string;
  translations: {
    lang: string;
    word: string;
    pronunciation: string; // IPA or Phonetic
    notes?: string; // "Lit: Forest Apple"
  }[];
};

export const UNIVERSAL_LIBRARY: ConceptEntry[] = [
  // --- FOOD ---
  {
    id: "apple",
    english: "Apple",
    category: "Food & Drink",
    icon: "🍎",
    desc: "The round fruit of a tree of the rose family.",
    translations: [
      { lang: "German", word: "Apfel", pronunciation: "/ˈap͡fl̩/" },
      { lang: "Spanish", word: "Manzana", pronunciation: "/manˈθana/" },
      { lang: "Japanese", word: "Ringo (林檎)", pronunciation: "rin-go" },
      { lang: "French", word: "Pomme", pronunciation: "/pɔm/" },
      { lang: "Russian", word: "Yabloko", pronunciation: "ˈjæbləkə" },
    ]
  },
  {
    id: "bread",
    english: "Bread",
    category: "Food & Drink",
    icon: "🍞",
    desc: "Staple food prepared from a dough of flour and water, usually by baking.",
    translations: [
      { lang: "German", word: "Brot", pronunciation: "/bʁoːt/" },
      { lang: "Spanish", word: "Pan", pronunciation: "/pan/" },
      { lang: "Japanese", word: "Pan (パン)", pronunciation: "pan", notes: "Loanword from Portuguese" },
      { lang: "French", word: "Pain", pronunciation: "/pɛ̃/" },
    ]
  },
  
  // --- NATURE ---
  {
    id: "water",
    english: "Water",
    category: "Nature",
    icon: "💧",
    desc: "A transparent, tasteless, odorless, and nearly colorless chemical substance.",
    translations: [
      { lang: "German", word: "Wasser", pronunciation: "/ˈvasɐ/" },
      { lang: "Spanish", word: "Agua", pronunciation: "/ˈa.ɡwa/" },
      { lang: "Japanese", word: "Mizu (水)", pronunciation: "mi-zu" },
      { lang: "Arabic", word: "Maa (ماء)", pronunciation: "/maːʔ/" },
    ]
  },
  {
    id: "tree",
    english: "Tree",
    category: "Nature",
    icon: "🌳",
    desc: "A woody perennial plant, typically having a single stem or trunk.",
    translations: [
      { lang: "German", word: "Baum", pronunciation: "/baʊ̯m/" },
      { lang: "Spanish", word: "Árbol", pronunciation: "/ˈaɾbol/" },
      { lang: "Japanese", word: "Ki (木)", pronunciation: "ki" },
      { lang: "Latin", word: "Arbor", pronunciation: "/ˈar.bor/" },
    ]
  },

  // --- TECH ---
  {
    id: "computer",
    english: "Computer",
    category: "Technology",
    icon: "💻",
    desc: "An electronic device for storing and processing data.",
    translations: [
      { lang: "German", word: "Computer / Rechner", pronunciation: "reck-ner", notes: "Lit: Calculator" },
      { lang: "Spanish", word: "Ordenador", pronunciation: "/oɾdenaˈdoɾ/", notes: "Used in Spain" },
      { lang: "French", word: "Ordinateur", pronunciation: "/ɔʁdinatœʁ/", notes: "Lit: One who brings order" },
      { lang: "Mandarin", word: "Diànnǎo (电脑)", pronunciation: "dian-nao", notes: "Lit: Electric Brain" },
    ]
  },
  
  // --- ABSTRACT ---
  {
    id: "freedom",
    english: "Freedom",
    category: "Abstract",
    icon: "🕊️",
    desc: "The power or right to act, speak, or think as one wants.",
    translations: [
      { lang: "German", word: "Freiheit", pronunciation: "/ˈfʁaɪhaɪt/" },
      { lang: "Spanish", word: "Libertad", pronunciation: "/liβeɾˈtað/" },
      { lang: "Japanese", word: "Jiyū (自由)", pronunciation: "ji-yuu" },
      { lang: "Russian", word: "Svoboda", pronunciation: "svɐˈbodə" },
    ]
  }
];

export const CATEGORIES = ["All", "Food & Drink", "Nature", "Technology", "Abstract"];