export type VocabTerm = {
  id: string;
  word: string;
  definition: string;
  domain: string;
  tags: string[];
  relatedTerms?: string[];
  isAdult: boolean;
};

export type VocabularyAccent =
  | "rose"
  | "cyan"
  | "violet"
  | "sky"
  | "emerald"
  | "amber";

export type VocabularyGroup = {
  id: string;
  label: string;
  terms: VocabTerm[];
  sourceNodeId?: string;
  sourcePath?: string;
};

export type VocabularyScope = {
  path: string;
  title: string;
  accent: VocabularyAccent;
  groups: VocabularyGroup[];
};
