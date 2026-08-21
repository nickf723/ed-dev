export const LANGUAGE_DIRECT_BRANCH_IDS = [
  "humanities.languages.modern",
  "humanities.languages.signed",
  "humanities.languages.classical-historical",
  "humanities.languages.constructed",
  "humanities.languages.writing-literacy",
  "humanities.languages.translation-interpreting",
  "humanities.languages.learning-proficiency",
  "humanities.languages.literature-culture",
] as const;

export type LanguageBranchId = (typeof LANGUAGE_DIRECT_BRANCH_IDS)[number];

export const LANGUAGE_PRACTICE_STAGES = [
  {
    key: "notice",
    label: "Notice",
    detail: "sound/sign · script · form · context",
    rgb: "125,211,252",
  },
  {
    key: "understand",
    label: "Understand",
    detail: "meaning · pattern · reference · intent",
    rgb: "192,132,252",
  },
  {
    key: "retrieve",
    label: "Retrieve",
    detail: "words · chunks · structures · conventions",
    rgb: "251,191,36",
  },
  {
    key: "use",
    label: "Use",
    detail: "speak/sign · listen/watch · read · write",
    rgb: "94,234,212",
  },
  {
    key: "adapt",
    label: "Adapt",
    detail: "register · audience · genre · feedback",
    rgb: "244,114,182",
  },
] as const;

export type PhraseKey = "thanks" | "morning" | "water";
export type PhraseEntry = {
  language: string;
  text: string;
  reading?: string;
  script: string;
  direction: "LTR" | "RTL";
  note?: string;
};

export const LANGUAGE_PHRASES: Record<
  PhraseKey,
  { label: string; prompt: string; entries: readonly PhraseEntry[] }
> = {
  thanks: {
    label: "Thank you",
    prompt: "Conventional expressions for thanking",
    entries: [
      {
        language: "English",
        text: "Thank you",
        script: "Latin",
        direction: "LTR",
      },
      {
        language: "Spanish",
        text: "Gracias",
        script: "Latin",
        direction: "LTR",
      },
      {
        language: "French",
        text: "Merci",
        script: "Latin",
        direction: "LTR",
      },
      {
        language: "Japanese",
        text: "ありがとうございます",
        reading: "arigatō gozaimasu",
        script: "Japanese mixed script",
        direction: "LTR",
        note: "polite expression",
      },
      {
        language: "Mandarin",
        text: "谢谢",
        reading: "xièxie",
        script: "Han characters",
        direction: "LTR",
      },
      {
        language: "Arabic",
        text: "شكرًا",
        reading: "shukran",
        script: "Arabic",
        direction: "RTL",
      },
      {
        language: "Russian",
        text: "Спасибо",
        reading: "spasibo",
        script: "Cyrillic",
        direction: "LTR",
      },
    ],
  },
  morning: {
    label: "Good morning",
    prompt: "Common morning greetings",
    entries: [
      {
        language: "English",
        text: "Good morning",
        script: "Latin",
        direction: "LTR",
      },
      {
        language: "Spanish",
        text: "Buenos días",
        script: "Latin",
        direction: "LTR",
      },
      {
        language: "French",
        text: "Bonjour",
        script: "Latin",
        direction: "LTR",
        note: "also used beyond the morning",
      },
      {
        language: "German",
        text: "Guten Morgen",
        script: "Latin",
        direction: "LTR",
      },
      {
        language: "Japanese",
        text: "おはようございます",
        reading: "ohayō gozaimasu",
        script: "Japanese mixed script",
        direction: "LTR",
        note: "polite expression",
      },
      {
        language: "Mandarin",
        text: "早上好",
        reading: "zǎoshang hǎo",
        script: "Han characters",
        direction: "LTR",
      },
      {
        language: "Arabic",
        text: "صباح الخير",
        reading: "ṣabāḥ al-khayr",
        script: "Arabic",
        direction: "RTL",
      },
      {
        language: "Russian",
        text: "Доброе утро",
        reading: "dobroye utro",
        script: "Cyrillic",
        direction: "LTR",
      },
    ],
  },
  water: {
    label: "Water",
    prompt: "A single concrete noun across languages",
    entries: [
      {
        language: "English",
        text: "water",
        script: "Latin",
        direction: "LTR",
      },
      {
        language: "Spanish",
        text: "agua",
        script: "Latin",
        direction: "LTR",
      },
      {
        language: "French",
        text: "eau",
        script: "Latin",
        direction: "LTR",
      },
      {
        language: "German",
        text: "Wasser",
        script: "Latin",
        direction: "LTR",
      },
      {
        language: "Italian",
        text: "acqua",
        script: "Latin",
        direction: "LTR",
      },
      {
        language: "Japanese",
        text: "水",
        reading: "mizu",
        script: "Kanji",
        direction: "LTR",
        note: "same character form can have different readings across languages",
      },
      {
        language: "Mandarin",
        text: "水",
        reading: "shuǐ",
        script: "Han character",
        direction: "LTR",
        note: "shared character does not imply shared pronunciation",
      },
      {
        language: "Arabic",
        text: "ماء",
        reading: "māʾ",
        script: "Arabic",
        direction: "RTL",
      },
      {
        language: "Russian",
        text: "вода",
        reading: "voda",
        script: "Cyrillic",
        direction: "LTR",
      },
    ],
  },
};

export type TranslationExampleKey = "hungry" | "age" | "coffee" | "weather";
export type TranslationExample = {
  key: TranslationExampleKey;
  source: string;
  target: string;
  structuralGloss: string;
  grammar: string;
  context: string;
};

export const LANGUAGE_TRANSLATION_EXAMPLES: readonly TranslationExample[] = [
  {
    key: "hungry",
    source: "I'm hungry.",
    target: "Tengo hambre.",
    structuralGloss: "I have hunger.",
    grammar:
      "Spanish commonly expresses this state with tener ('to have') + the noun hambre, rather than copying the English adjective construction.",
    context:
      "A natural translation preserves the ordinary meaning of the utterance, not the English part-of-speech pattern.",
  },
  {
    key: "age",
    source: "How old are you?",
    target: "¿Cuántos años tienes?",
    structuralGloss: "How many years do you have?",
    grammar:
      "This example uses informal singular tienes. Other relationships and regions can call for different forms of address.",
    context:
      "A useful translation must choose person and register even when the English source leaves some social distinctions less explicit.",
  },
  {
    key: "coffee",
    source: "I like coffee.",
    target: "Me gusta el café.",
    structuralGloss: "Coffee is pleasing to me.",
    grammar:
      "The explanatory gloss highlights the different argument pattern around gustar. It is a teaching aid, not a claim that Spanish speakers mentally translate the sentence this way.",
    context:
      "Word order and grammatical roles can reorganize even when the everyday message is simple.",
  },
  {
    key: "weather",
    source: "It's hot.",
    target: "Hace calor.",
    structuralGloss: "It makes/does heat.",
    grammar:
      "Weather expressions often use constructions that do not map neatly onto English dummy-it sentences.",
    context:
      "The target expression should sound ordinary in the target language, not merely preserve the source sentence's visible skeleton.",
  },
] as const;

export function countPhraseDirections(
  phraseKey: PhraseKey,
  direction: PhraseEntry["direction"]
): number {
  return LANGUAGE_PHRASES[phraseKey].entries.filter(
    (entry) => entry.direction === direction
  ).length;
}

export function calculatePhraseDirectionShare(
  phraseKey: PhraseKey,
  direction: PhraseEntry["direction"]
): number | null {
  const entries = LANGUAGE_PHRASES[phraseKey].entries;
  return entries.length === 0
    ? null
    : countPhraseDirections(phraseKey, direction) / entries.length;
}

export function formatLanguagePercent(value: number | null): string {
  return value === null || !Number.isFinite(value)
    ? "invalid inputs"
    : `${(value * 100).toFixed(1)}%`;
}

export const LANGUAGE_EVIDENCE_CASES = [
  {
    id: "direction-share",
    eyebrow: "Case 01 · exact practice",
    label: "Name the sample and denominator",
    prompt:
      "The ‘Thank you’ teaching table shows seven entries. One—the Arabic entry—is right-to-left. What share of the displayed entries is right-to-left?",
    options: [
      {
        id: "rtl-143",
        label: "14.3%, because 1 / 7 = 0.142857… in this displayed sample.",
      },
      {
        id: "rtl-50",
        label:
          "50.0%, because every writing system must be either left-to-right or right-to-left.",
      },
      {
        id: "rtl-global",
        label:
          "14.3% of all languages, because the table is a representative global census.",
      },
    ],
    correctOptionId: "rtl-143",
    success:
      "Correct. The exact statement is about one curated display: 1 of 7 entries, or 14.3%. It is not an estimate of languages, speakers, scripts, or writing practices worldwide.",
    correction:
      "Keep the denominator attached: seven displayed entries. A binary category does not imply an even split, and this small teaching set is not a population sample.",
  },
  {
    id: "translation",
    eyebrow: "Case 02 · communicative job",
    label: "Translate meaning, not visible skeleton",
    prompt:
      "Why can ‘Tengo hambre’ be a natural Spanish translation of ‘I'm hungry’ even though a structural gloss reads ‘I have hunger’?",
    options: [
      {
        id: "translation-purpose",
        label:
          "Languages can package the same ordinary communicative job with different constructions; a useful translation follows target-language usage, context, and register.",
      },
      {
        id: "translation-error",
        label:
          "The mismatch proves that one sentence is grammatically incorrect and should be repaired word for word.",
      },
      {
        id: "translation-code",
        label:
          "Every word has one context-free substitute, so syntax and speaker relationship can be ignored.",
      },
    ],
    correctOptionId: "translation-purpose",
    success:
      "Correct. Translation is constrained rewriting: meaning, communicative purpose, genre, audience, register, and ordinary target-language form can matter more than copying source grammar.",
    correction:
      "A structural gloss exposes a contrast; it is not the target translation. Preserve the communicative job while producing a form that belongs in the target language and context.",
  },
  {
    id: "signed-language",
    eyebrow: "Case 03 · modality",
    label: "Treat signed languages as languages",
    prompt:
      "Which description gives signed languages an accurate place in the Languages curriculum?",
    options: [
      {
        id: "signed-natural",
        label:
          "They are natural visual-spatial languages with their own grammars, variation, histories, literatures, and community contexts; they are not one universal code.",
      },
      {
        id: "signed-written",
        label:
          "Each signed language is simply the written or spoken language of the surrounding country performed with the hands.",
      },
      {
        id: "signed-universal",
        label:
          "Sign is a universal gesture inventory, so regional and community distinctions do not matter.",
      },
    ],
    correctOptionId: "signed-natural",
    success:
      "Correct. Modality changes the resources used for expression; it does not make signed languages derivative, universal, or culturally interchangeable.",
    correction:
      "Do not reduce signed languages to manual versions of spoken languages or a universal gesture code. Preserve distinct language and Deaf-community contexts.",
  },
  {
    id: "record-boundary",
    eyebrow: "Case 04 · repository objects",
    label: "Keep catalog, locale, and archive records distinct",
    prompt:
      "A future language shelf finds a Glottolog languoid, a Unicode CLDR locale record, and an OLAC resource record with related identifiers. What may the interface conclude?",
    options: [
      {
        id: "records-distinct",
        label:
          "The records can be linked with versioned identifiers, but classification, software locale data, archive metadata, content access, community naming, and rights remain distinct claims.",
      },
      {
        id: "records-merge",
        label:
          "Matching labels prove the records are interchangeable and together form one definitive description of every speaker and variety.",
      },
      {
        id: "records-rights",
        label:
          "An archive metadata record automatically grants permission to download, display, translate, or train on the described content.",
      },
    ],
    correctOptionId: "records-distinct",
    success:
      "Correct. Crosswalks help discovery, but each provider describes a different evidence object. Preserve versions, identifiers, names, scope, contributors, access, rights, and uncertainty.",
    correction:
      "Do not collapse identifiers across record types or treat metadata visibility as content permission. Link records while preserving each provider's scope and rights context.",
  },
] as const;

export function isLanguageEvidenceAnswerCorrect(
  caseId: string,
  optionId: string
): boolean {
  return LANGUAGE_EVIDENCE_CASES.some(
    (item) => item.id === caseId && item.correctOptionId === optionId
  );
}
