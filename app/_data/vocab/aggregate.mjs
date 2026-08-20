function termsMatch(left, right) {
  return (
    left.word === right.word &&
    left.definition === right.definition &&
    left.domain === right.domain &&
    left.isAdult === right.isAdult
  );
}

/**
 * Build route scopes from curriculum containment rather than handwritten parent
 * unions. Each scope owns one local group and one aggregate group per direct
 * child, so parent drawers stay useful without losing child provenance.
 */
export function buildCurriculumVocabularyScopes({
  roots,
  registrations,
  accent,
  accentByNodeId = {},
}) {
  const nodesById = new Map();

  const indexNode = (node) => {
    if (nodesById.has(node.id)) {
      throw new Error(`Duplicate vocabulary tree node: ${node.id}`);
    }
    nodesById.set(node.id, node);
    for (const child of node.children ?? []) indexNode(child);
  };

  for (const root of roots) indexNode(root);

  const registrationsByNodeId = new Map();
  const termOwners = new Map();

  for (const registration of registrations) {
    if (!nodesById.has(registration.nodeId)) {
      throw new Error(
        `Vocabulary registration references unknown curriculum node: ${registration.nodeId}`,
      );
    }
    if (registrationsByNodeId.has(registration.nodeId)) {
      throw new Error(
        `Duplicate vocabulary registration for curriculum node: ${registration.nodeId}`,
      );
    }

    for (const term of registration.terms) {
      const existing = termOwners.get(term.id);
      if (existing) {
        if (!termsMatch(existing.term, term)) {
          throw new Error(
            `Conflicting vocabulary term ${term.id} in ${existing.nodeId} and ${registration.nodeId}`,
          );
        }
        throw new Error(
          `Vocabulary term ${term.id} is owned by both ${existing.nodeId} and ${registration.nodeId}`,
        );
      }
      termOwners.set(term.id, { nodeId: registration.nodeId, term });
    }

    registrationsByNodeId.set(registration.nodeId, registration);
  }

  const subtreeTermsByNodeId = new Map();

  const subtreeTerms = (node) => {
    const cached = subtreeTermsByNodeId.get(node.id);
    if (cached) return cached;

    const localTerms = registrationsByNodeId.get(node.id)?.terms ?? [];
    const terms = [
      ...localTerms,
      ...(node.children ?? []).flatMap((child) => subtreeTerms(child)),
    ];
    subtreeTermsByNodeId.set(node.id, terms);
    return terms;
  };

  const groupsFor = (node) => {
    const groups = [];
    const registration = registrationsByNodeId.get(node.id);

    if (registration && registration.terms.length > 0) {
      groups.push({
        id: node.id,
        label: registration.label ?? node.label,
        terms: [...registration.terms],
        sourceNodeId: node.id,
        sourcePath: node.href,
      });
    }

    for (const child of node.children ?? []) {
      const terms = subtreeTerms(child);
      if (terms.length === 0) continue;
      groups.push({
        id: child.id,
        label: child.label,
        terms: [...terms],
        sourceNodeId: child.id,
        sourcePath: child.href,
      });
    }

    return groups;
  };

  const scopes = [];
  const addScopes = (node) => {
    const groups = groupsFor(node);
    if (groups.length > 0) {
      scopes.push({
        path: node.href,
        title: node.label,
        accent: accentByNodeId[node.id] ?? accent,
        groups,
      });
    }
    for (const child of node.children ?? []) addScopes(child);
  };

  for (const root of roots) addScopes(root);
  return scopes;
}
