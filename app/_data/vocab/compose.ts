import type { VocabTerm, VocabularyScope } from "./types";

export function composeVocabulary(
  ...collections: ReadonlyArray<ReadonlyArray<VocabTerm>>
): VocabTerm[] {
  const termsById = new Map<string, VocabTerm>();

  for (const collection of collections) {
    for (const term of collection) {
      if (!termsById.has(term.id)) {
        termsById.set(term.id, term);
      }
    }
  }

  return Array.from(termsById.values());
}

export function findVocabularyScope(
  pathname: string,
  scopes: ReadonlyArray<VocabularyScope>,
): VocabularyScope | undefined {
  return [...scopes]
    .sort((left, right) => right.path.length - left.path.length)
    .find(
      (scope) =>
        pathname === scope.path || pathname.startsWith(`${scope.path}/`),
    );
}
