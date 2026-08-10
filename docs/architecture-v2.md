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

`lib/curriculum/tree.ts` stores the broad navigable academic hierarchy. Dense migrated branches may live in focused modules and are composed into the validated registry.

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

## 4. Site-shaped data hierarchy

**Page-associated data should mirror the hierarchy of the website.**

If the user-facing route is conceptually:

```text
Natural Sciences
  -> Biology
     -> Cytology
```

then shared data for that branch should be predictably organized beneath the same hierarchy, for example:

```text
lib/curriculum/natural/biology/
app/_data/vocab/natural-science/biology/
app/natural-science/biology/cytology/cytology-data.ts
```

Use the site hierarchy for curriculum, vocabulary, assessments, content metadata, applet configuration, and other page-associated data as those systems are migrated.

Truly global infrastructure remains global. Examples include:

- shared type definitions
- registry/composition code
- storage adapters
- six-domain configuration
- generic applet contracts
- reusable UI primitives

Do not reorganize unrelated branches merely for symmetry. Apply this rule when a branch is actively migrated or rebuilt.

## 5. Navigation

`lib/navigation.ts` is a view adapter, not a second sitemap.

Academic navigation is derived from the curriculum registry. Meta tools such as the glossary and Stage may remain navigation-only because they are application utilities rather than curriculum nodes.

## 6. Canvas pages

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
- active/planned status

Server page modules should resolve registry data and pass small serializable contracts into interactive client Canvases rather than importing the full registry into client components.

## 7. Vocabulary

The existing `app/_data/vocab/` system already functions as a canonical vocabulary registry and should be evolved rather than replaced.

As vocabulary branches are touched, migrate page-associated vocabulary out of legacy alphabetical buckets into the site-shaped hierarchy. Biology is the first example at `app/_data/vocab/natural-science/biology/`.

Do not create a parallel vocabulary JSON store unless a future migration has a concrete advantage.

## 8. Mastery and progress

`lib/progress/mastery.ts` is the browser-local persistence boundary for MVP mastery state.

Pages and components should not read or write mastery `localStorage` keys directly.

`app/_components/MasteryToggle.tsx` is the reusable manual mastery control. Prerequisite locking is resolved through the curriculum registry.

No authentication or backend database is required for the MVP.

## 9. Migration and page-development strategy

Prefer evolutionary development over mass conversion:

1. Choose the next page or branch worth improving.
2. Audit what already exists and which linked routes are genuinely live.
3. Move reusable semantic information into hierarchy-aligned shared data.
4. Preserve page-local presentation and working interactive assets that still serve the page.
5. Redesign or rebuild the Canvas when the current page no longer meets the product standard.
6. Keep planned curriculum visible when useful, but do not expose broken routes as active navigation.
7. Verify the Vercel build and live behavior.
8. Repeat outward one branch at a time.

Do not remake a page simply because it predates the architecture. A rewrite should improve usability, visual quality, maintainability, or the underlying data boundary.

## 10. Future content authoring

MDX remains a strong candidate for lesson authoring once the Shell, curriculum contracts, and reusable educational blocks are stable. It should be introduced as an authoring layer inside the existing Next.js application, not as the reason for another project reboot.
