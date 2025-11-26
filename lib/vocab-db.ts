// lib/vocab-db.ts

export const languages = {
  DE: "German",
  ES: "Spanish",
  FR: "French",
  JP: "Japanese",
  RU: "Russian",
  AR: "Arabic",
  CN: "Mandarin",
  LA: "Latin",
  GR: "Greek",
};

export type VocabEntry = {
  native: string;       // The word in its native script (e.g., "Apfel")
  translation: string;  // English meaning (e.g., "Apple")
  lang: string;         // Language Code (from above)
  ipa: string;          // Pronunciation (e.g., "/ˈap͡fl̩/")
  type: string;         // Part of speech / Gender (e.g., "Noun (m)")
  root?: string;        // Etymology or literal meaning (optional)
};

export const vocabDatabase: Record<string, VocabEntry> = {
  // --- German ---
  "apfel": { 
    native: "Apfel", 
    translation: "Apple", 
    lang: languages.DE, 
    ipa: "/ˈap͡fl̩/", 
    type: "Noun (m)" 
  },
  "zeitgeist": { 
    native: "Zeitgeist", 
    translation: "Spirit of the times", 
    lang: languages.DE, 
    ipa: "/ˈt͡saɪtˌɡaɪst/", 
    type: "Noun (m)",
    root: "Zeit (Time) + Geist (Spirit)"
  },
  "schadenfreude": {
    native: "Schadenfreude",
    translation: "Joy from others' misfortune",
    lang: languages.DE,
    ipa: "/ˈʃaːdn̩ˌfʁɔʏdə/",
    type: "Noun (f)",
    root: "Schaden (Harm) + Freude (Joy)"
  },

  // --- Spanish ---
  "biblioteca": { 
    native: "Biblioteca", 
    translation: "Library", 
    lang: languages.ES, 
    ipa: "/bi.bljoˈte.ka/", 
    type: "Noun (f)",
    root: "Greek: Bibliothēkē"
  },
  "corazon": { 
    native: "Corazón", 
    translation: "Heart", 
    lang: languages.ES, 
    ipa: "/ko.ɾaˈθon/", 
    type: "Noun (m)" 
  },

  // --- Japanese ---
  "tsundoku": {
    native: "積ん読",
    translation: "Buying books but not reading them",
    lang: languages.JP,
    ipa: "/tsɯndokɯ/",
    type: "Noun",
    root: "Tsumu (Pile up) + Doku (Read)"
  },
  "ikigai": {
    native: "生き甲斐",
    translation: "Reason for being",
    lang: languages.JP,
    ipa: "/ikiɡai/",
    type: "Noun",
    root: "Iki (Life) + Gai (Worth)"
  },

  // --- Latin (Science/Law) ---
  "a_priori": {
    native: "A priori",
    translation: "From the earlier",
    lang: languages.LA,
    ipa: "/aː priˈoː.riː/",
    type: "Adjective",
    root: "Knowledge independent of experience"
  },
  "ad_astra": {
    native: "Ad astra",
    translation: "To the stars",
    lang: languages.LA,
    ipa: "/ad ˈas.tra/",
    type: "Phrase"
  }
};

export type VocabKey = keyof typeof vocabDatabase;