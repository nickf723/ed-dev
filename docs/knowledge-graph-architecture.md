# Education Station Knowledge Graph Architecture

Education Station is organized as a map of knowledge rather than a catalog of courses. The graph is intended to become the common source for discovery, breadcrumbs, sidebar navigation, homepage mapping, related-topic links, and expansion planning.

## Core rule

The filesystem, curriculum registry, and knowledge graph describe different things.

- **Filesystem routes** describe which standalone pages currently exist.
- **Curriculum registries** may include planned lessons, pedagogical sequencing, or temporary navigation structures.
- **The knowledge graph** describes the site's current academic ontology and the concepts actually taught inside its live pages.

Never automatically copy one representation into another.

## Canonical tree

Every knowledge node has one canonical parent.

The parent-child tree answers:

> Where does this idea live in Education Station?

Examples:

- Formal Science → Mathematics → Algebra → Elementary Algebra → Fundamentals → Expressions & Variables → Coefficient
- Natural Science → Biology → Botany → Plant Physiology → Photosynthesis
- Humanities → Literature → Narrative Fiction → Story, Plot & Time → Story

The canonical tree is deliberately simple. It enables stable ancestry, breadcrumbs, focusable subtrees, deterministic layout, and sidebar expansion.

## Routed nodes and embedded nodes

A knowledge node does **not** need its own URL.

### Routed node

A node with `slug` points to a standalone page.

Examples:

- Set Theory
- Greek Mythology
- Newton's Second Law

### Embedded node

A node without `slug` describes knowledge taught inside the nearest routed ancestor.

Examples:

- Coefficient is taught in Expressions & Variables.
- Photosynthesis is currently taught in Botany.
- Hubris is currently taught in Greek Mythology.

Use `findKnowledgeHostPage(id)` to resolve that routed host.

An embedded concept should be promoted to a standalone page only when the content deserves an independent learning surface. URL count is not a measure of ontology quality.

## Node kind is not route status

`KnowledgeNode.kind` describes semantic scale:

- `root`
- `domain`
- `discipline`
- `branch`
- `topic`
- `concept`

Do not infer route behavior from `kind`.

A concept may have a standalone route, such as Newton's Second Law, while another concept such as Coefficient may be embedded. The renderer must check `slug` to determine whether a node is routed.

## Status

`status` describes graph/content status, not curriculum enrollment or standards coverage.

Current values:

- `live`
- `partial`
- `planned`

Do not add planned curriculum children to the live ontology merely because they exist in a registry. A live hub may teach several embedded concepts while its future child pages remain unbuilt.

## Cross-links

The tree gives every idea one canonical home, but knowledge is not actually a tree.

`knowledge-relations.ts` provides a sparse typed relation layer for meaningful non-hierarchical connections.

Current relation types:

- `part-of`
- `prerequisite-for`
- `related-to`
- `contrasts-with`
- `applied-in`

Examples:

- Coefficient → part of → Term
- Motion → prepares for → Forces
- Story ↔ contrasts with ↔ Plot
- Element ↔ contrasts with ↔ Subset

Relations should be evidence-driven. Prefer a small accurate graph over automatically generating hundreds of vague `related-to` edges.

## Expansion rules

When auditing a page:

1. Check whether child folders contain real routed pages.
2. Read the page's own intellectual structure.
3. Preserve explicit distinctions between navigation, reference concepts, lenses, and planned material.
4. Add routed children only for real standalone pages.
5. Add embedded concepts only when the current live page explicitly teaches or structures them.
6. Add cross-links only when the current content supports the relationship.
7. Do not create nodes merely to make the graph visually symmetrical.

Uneven depth is expected and desirable. A mature branch may be eight levels deep while another discipline remains a single rich hub.

## Projection model

Different UI surfaces can project the same ontology at different levels of detail.

### Routed overview

Used for the full atlas and decorative homepage background. Embedded leaves are hidden while routed descendants remain attached to their nearest routed ancestor.

Purpose: preserve legibility at site scale.

### Full knowledge detail

Used for focused subtrees, inspectors, reports, and concept exploration.

Purpose: reveal embedded concepts and local conceptual anatomy.

Views must never maintain their own independent taxonomies.

## Navigation contract

`KnowledgeNavigator` demonstrates the reusable navigation contract.

Given one node ID, a surface can derive:

- canonical breadcrumb
- parent
- siblings
- children
- descendant count
- routed host for embedded concepts
- typed cross-links

This should gradually replace hand-maintained ontology navigation where appropriate, without requiring a risky site-wide migration.

## Search

Search indexes node label, ID, route, and canonical ancestry.

Ancestry matters because duplicate human labels are legitimate. `Institutions` can exist in Sociology and Political Science without artificial renaming. Search results must disambiguate those nodes through their canonical path.

## Integrity requirements

The knowledge-map test suite should enforce at minimum:

- six canonical top-level domains
- unique node IDs
- unique routed slugs
- valid parent-child ancestry
- every embedded node resolves to a routed host page
- every relation source and target exists
- no self-relations
- no duplicate relation triples
- routed/full projection behavior remains distinct
- representative deep paths remain intact

## Studio surfaces

Development-only previews:

- `/studio/knowledge` — Knowledge Studio hub
- `/studio/knowledge-home` — homepage atlas composition
- `/studio/knowledge-map` — full graph explorer
- `/studio/knowledge-navigation` — reusable navigation primitive comparison

These routes are intentionally unavailable in production until a specific surface is ready to graduate.

## Long-term direction

Parent-child is the stable skeleton. Typed relations can expand gradually into prerequisites, applications, examples, historical relationships, conceptual contrasts, and other useful edges.

The target is not a maximally dense graph. The target is a map that helps someone answer two questions quickly:

1. **Where does this idea belong?**
2. **How does this idea connect to what I already know?**
