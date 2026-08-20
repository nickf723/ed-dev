import type {
  VocabTerm,
  VocabularyAccent,
  VocabularyScope,
} from "./types";

export type VocabularyTreeNode = {
  id: string;
  label: string;
  href: string;
  children?: readonly VocabularyTreeNode[];
};

export type NodeVocabularyRegistration = {
  nodeId: string;
  terms: readonly VocabTerm[];
  label?: string;
};

type BuildVocabularyScopesOptions = {
  roots: readonly VocabularyTreeNode[];
  registrations: readonly NodeVocabularyRegistration[];
  accent: VocabularyAccent;
  accentByNodeId?: Readonly<Record<string, VocabularyAccent>>;
};

export function buildCurriculumVocabularyScopes(
  options: BuildVocabularyScopesOptions,
): VocabularyScope[];
