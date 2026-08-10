# Education Station 64: Evolution Architecture

Education Station 64 is being renovated in place. The existing Next.js/React site, live pages, applets, and visual experiments are assets to preserve rather than rewrite wholesale.

## Core rule

**Universal structural grammar, local visual dialect.**

The shared architecture should make the site behave like one product. Individual domains and subjects remain free to look and feel distinct.

## 1. Shell

`app/_components/AppShell.tsx` owns persistent application structure:

- global sidebar state
- the main content canvas
- active-domain identification
- shared domain CSS variables (`--domain-rgb`, `--domain-accent`)

Pages should not duplicate global sidebar or canvas layout logic.

## 2. Domain registry

`lib/domains.ts` is the single source of truth for the six major academic fields:

- names and labels
- canonical routes
- homepage metadata
- icons
- shared domain colors

The homepage and sidebar both consume this registry.

Domain-specific visual systems remain local to their pages. The registry supplies identity, not page composition.

## 3. Curriculum registry

`lib/curriculum/tree.ts` stores the navigable academic hierarchy.

A curriculum node has a stable ID and may carry:

- label
- canonical route
- shared description
- domain ownership
- child nodes
- prerequisite node IDs
- active or placeholder status

Containment and prerequisite relationships are intentionally separate:

```text
children          -> where knowledge lives
prerequisiteIds   -> what knowledge depends on
```

This lets the familiar nested sitemap grow into a directed acyclic mastery graph without forcing the UI to become a tree.

`lib/curriculum/registry.ts` validates duplicate IDs, duplicate routes, missing prerequisite references, self-dependencies, and prerequisite cycles.

## 4. Navigation

`lib/navigation.ts` is a view adapter, not a second sitemap.

Academic navigation is derived from the curriculum registry. Meta tools such as the glossary and Stage may remain navigation-only because they are application utilities rather than curriculum nodes.

## 5. Canvas pages

Pages keep their own visual presentation data:

- icons
- local color accents
- diagrams
- backgrounds
- animation
- equations used decoratively
- page-specific interaction patterns

They should read semantic curriculum facts from the registry whenever possible:

- titles
- descriptions
- routes
- ordering
- prerequisites

The Mathematics and Mathematics Foundations hubs are the first migrated examples.

## 6. Vocabulary

The existing `app/_data/vocab/` system already functions as a canonical vocabulary registry and should be evolved rather than replaced.

Do not create a parallel vocabulary JSON store unless a future migration has a concrete advantage.

## 7. Mastery and progress

`lib/progress/mastery.ts` is the browser-local persistence boundary for MVP mastery state.

Pages and components should not read or write mastery `localStorage` keys directly.

`app/_components/MasteryToggle.tsx` is the reusable manual mastery control. Prerequisite locking is resolved through the curriculum registry.

No authentication or backend database is required for the MVP.

## 8. Migration strategy

Prefer extraction over replacement:

1. Identify a page-local semantic array or duplicated global behavior.
2. Move only the reusable semantic information into the appropriate registry.
3. Keep page-specific presentation beside the page.
4. Make the existing page consume the registry without redesigning it.
5. Verify the Vercel build and live behavior.
6. Repeat outward one branch at a time.

Do not mass-convert old content merely to satisfy a new architecture. A migrated page should become easier to maintain while still feeling like itself.

## 9. Future content authoring

MDX remains a strong candidate for lesson authoring once the Shell, curriculum contracts, and reusable educational blocks are stable. It should be introduced as an authoring layer inside the existing Next.js application, not as the reason for another project reboot.
