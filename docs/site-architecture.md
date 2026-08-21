# Education Station 64 Site Architecture

This document defines the product and repository architecture for Education Station 64 itself.

It is not about the academic subject of architecture. It describes how the site should organize knowledge, navigation, page roles, shared UI, page-local presentation, authoring, progress, verification, and future migration.

## Core principle

**One semantic system, many visual dialects.**

Education Station 64 should be able to explain, model, organize, practice, or inspect anything a person can learn. The number 64 remains a brand identity rather than a quota for fields or pages.

Formal, Natural, Social, Humanities, and Applied are the five canonical knowledge branches. Interdisciplines is a relational surface over those branches: it reveals shared methods and meaningful connections while linking back to canonical owners.

The site should behave like one coherent learning product without making every subject page look the same.

## Two learner entry modes

Education Station now has two coordinated entry modes over the same body of educational work.

### Classroom courses

`/classroom` is the school-year path. Its hierarchy is deliberately shallow and conventional:

`Subject -> Course -> Unit -> Lesson`

Classroom pages optimize for direct assignment, pacing, standards inspection, and lesson sequence. They use a compact standalone shell instead of the full knowledge-atlas sidebar. A classroom lesson may reuse an existing substantive atlas lesson experience, but it supplies classroom-owned breadcrumbs and previous/next routes so the student remains inside the course sequence.

### Knowledge atlas

The five canonical knowledge branches and Interdisciplines remain the exploratory path. They preserve the deeper ontology, collections, conceptual cross-links, vocabulary inheritance, and field-specific worlds.

The two systems are parallel views, not competing sources of truth:

- `lib/curriculum/` owns what knowledge is and how concepts relate;
- `lib/courses/` owns how selected knowledge is paced into a standards-aware school course;
- a course lesson references its canonical knowledge node by stable ID when it reuses atlas instruction;
- classroom course ordering must not be written back into the knowledge graph as if pacing were ontology;
- standards alignment means alignment, not state authorship, sponsorship, endorsement, or a claim that standards prescribe the local lesson order.

Consistency belongs primarily in:

- knowledge relationships
- page roles
- navigation semantics
- accessibility
- geometry rules
- shared shell behavior
- progress/mastery semantics
- content contracts
- validation

Subject identity belongs primarily in:

- backgrounds
- diagrams
- models
- page composition
- local accents
- interaction metaphors grounded in the subject
- examples and explanatory voice

## The four-layer page model

Every curriculum page should conceptually pass through four layers.

### 1. Knowledge graph

The curriculum registry owns facts about what exists and how it relates:

- stable node ID
- canonical route
- domain
- label
- description
- active/planned status
- page kind when classified
- containment through children
- prerequisite relationships

The registry does **not** own page composition, decorative imagery, local backgrounds, or interaction layout.

### 2. Page context

`lib/curriculum/page-context.ts` is the adapter between the graph and the UI.

It resolves facts pages should not repeatedly reconstruct by hand:

- domain
- status
- page kind
- depth
- parent
- ancestors
- breadcrumbs
- siblings
- previous/next active sibling
- children
- active children
- planned children

This layer should grow whenever multiple pages independently calculate the same semantic relationship.

It should remain presentation-agnostic.

### 3. Shared shell and page frame

The application shell owns persistent product behavior:

- sidebar
- global content offset
- domain theme variables
- global utilities
- mobile navigation
- global progress/mastery surfaces

### Sidebar hydration contract

- The active ancestry is derived from the route during the server render and must match the first client hydration frame.
- Do not collapse the curriculum tree on the server merely to open it again behind a client-only `hydrated` flag; that trades a mismatch risk for a guaranteed navigation shift.
- Manual expansion or collapse may override the active default for the current route, but the override must be route-scoped so navigation reveals the next route's ancestry.
- Collapsed subtrees must remain absent from keyboard navigation; render them conditionally or use native hidden semantics. Avoid animation wrappers that mount a different tree solely because hydration completed.
- Mobile route selection closes the drawer in the navigation event itself rather than relying on a pathname synchronization effect.

A future curriculum page-frame layer should consume page context and standardize **behavior**, not page art:

- semantic breadcrumbs
- parent/up navigation
- previous/next sibling navigation
- planned versus live destination behavior
- shared header anatomy
- safe width/padding contracts
- optional page-kind-specific navigation slots

Do not make the page frame responsible for subject-specific panel layouts.

### 4. Local page presentation

The route owns the actual learning experience:

- local background
- conceptual model
- examples
- primary instrument
- subject-specific composition
- local accent inside the domain family
- reference material
- supporting explanations

Local pages should consume semantic facts from page context rather than duplicate them.

## Semantic HTML ownership

Each route page owns the page-level `<main>` landmark.

The persistent shell and content-offset wrappers are layout containers, not nested `<main>` elements.

A page may use `<header>`, `<nav>`, `<section>`, `<article>`, `<aside>`, and other landmarks internally as appropriate, but should not create competing page-level main landmarks.

## Page kinds

`CurriculumNode.pageKind` may classify a route as:

- `hub`
- `unit`
- `lesson`
- `reference`
- `tool`

Classification is optional during migration. Do not infer a page kind from route depth alone.

### Hub

Primary job: orientation and ontology.

A hub should answer:

- what belongs in this field?
- how are the major branches different?
- where should I go next?

Navigation is usually the center of gravity.

### Unit

Primary job: sequence and throughline.

A unit should answer:

- what connected ideas are being learned here?
- in what conceptual order do they build?
- why are these lessons grouped together?

A unit may contain a lightweight model that explains the sequence, but should not duplicate each child lesson's full instrument.

### Lesson

Primary job: teach one coherent idea deeply.

A lesson should normally have one dominant model or instrument and enough explanation, examples, contrast, testing, and reference material to make the idea durable.

### Reference

Primary job: lookup and comparison.

Reference pages optimize scanning, filtering, indexing, and reuse rather than a single linear instructional sequence.

### Tool

Primary job: perform a task or exploration.

A tool may be more open-ended than a lesson, but still needs clear scope, assumptions, and interpretation boundaries.

## Source-of-truth boundaries

### `lib/domains.ts`

Owns the six top-level interface identities: five canonical knowledge branches plus the Interdisciplines relational surface.

It supplies:

- canonical domain route
- domain label/title
- icon
- broad theme
- high-level description

It must not become a registry of every subject's local design system.

### `lib/curriculum/`

Owns academic structure and shared semantic metadata.

Dense branches should migrate into focused modules rather than indefinitely expanding one monolithic tree.

### `lib/courses/`

Owns classroom-facing subjects, courses, units, lessons, pacing, standards frameworks, and teacher context.

It supplies:

- stable subject, course, unit, and lesson IDs;
- active/planned status and canonical classroom routes;
- official standards sources and independently authored alignment notes;
- lesson outcomes, duration, and references to canonical curriculum node IDs;
- teacher warm-ups, misconception notes, exit tickets, prerequisites, and evidence plans.

It must not duplicate the full curriculum ontology or imply that a state standards document supplies Education Station's curriculum sequence.

### `lib/navigation.ts`

Is a view adapter over curriculum, not a second curriculum database.

Meta/application utilities may remain navigation-only when they are not academic nodes.

### `app/_components/`

Owns genuinely shared product primitives and shell behavior.

A component should move here because several unrelated branches need the same semantic behavior, not merely because two pages happen to look similar.

### route-local components/data

Own subject-specific models and presentation.

If an abstraction only makes sense inside one branch, keep it with that branch until repetition proves it belongs globally.

## Page-associated data contract

An academic page is more than its TSX route. The page's semantic bundle may include:

- curriculum node and page context;
- vocabulary contribution;
- assessment generator/checker or other evidence action;
- collection records and facets;
- API adapters, provenance, caching, and fallback data;
- visual-world metadata and route-local presentation;
- verification fixtures and important states.

Keep page-associated data aligned with the curriculum hierarchy as branches are migrated. Shared registries and adapters may remain global; subject-specific content and interpretation remain local.

## Vocabulary architecture

Vocabulary is authored at the narrowest curriculum node that teaches it and aggregates upward through curriculum ancestry.

The target model is:

```text
page terms -> parent union -> branch union -> domain union -> global glossary
```

Aggregation deduplicates stable term IDs while preserving source groups. A local vocabulary drawer is a presentation option, not permission to create a disconnected data store. The current `app/_data/vocab/` registry and route scopes should evolve toward node-ID registration and descendant composition rather than be replaced wholesale.

## Assessment architecture

Assessment data belongs beside the curriculum it measures. Atomic lessons define:

- an insightful transfer/reasoning check;
- deterministic generated practice when the subject supports it;
- a solution/checking model;
- explanatory feedback and tested boundaries.

Shared assessment components own interaction grammar. Route-local or branch-local generators own the academic rules. Completion state is evidence, not automatic mastery.

## Collection and API architecture

`lib/collections/` owns reusable collection contracts: normalized records, facets, queries, source/provenance metadata, pagination, and failure states.

Provider-specific adapters should:

1. fetch or read source data;
2. validate and normalize it into an internal record;
3. preserve source attribution and freshness;
4. expose typed errors and partial results;
5. keep provider quirks out of presentation components.

Collection pages may specialize their filters and detail views around the subject. A zoology catalog, periodic table, art archive, map, and game repository should not be forced into identical cards merely because they share query plumbing.

Core instruction must remain understandable when an external provider is unavailable. Cached or curated fallback data must be labeled honestly; failures must never be disguised as successful live data.

## Registry composition strategy

The current registry evolves from several layers:

- broad `tree.ts`
- focused replacement modules
- metadata overlays
- root additions
- child additions

This evolutionary system has preserved live routes, but it should not become the permanent authoring model.

### Direction of travel

Move toward a **module manifest** where migrated branches export complete subtrees and the registry composes them through one predictable mechanism.

The broad tree can remain a migration fallback for untouched branches.

Avoid adding new one-off patch layers when a focused curriculum module is the clearer home.

### Do not mass-migrate

Refactor the registry branch-by-branch as those branches are actively rebuilt.

A cleaner data model is not worth breaking live navigation.

## Page-context rule

If a page manually hard-codes any of the following and the registry already knows the relationship, prefer page context:

- title
- shared description
- breadcrumbs
- parent route
- sibling order
- previous/next active sibling
- child route/status
- active/planned state

Local copy may elaborate on registry descriptions, but should not silently contradict canonical semantic metadata.

## Shared frame roadmap

The next shared UI layer should be built incrementally.

### Step 1: semantic primitives

Use page context from server page modules.

Add small primitives only when useful:

- `CurriculumBreadcrumbs`
- `ParentLink`
- `SiblingNavigation`
- `ChildDestination`
- live/planned status treatment

These should share semantics while allowing visual variants.

### Step 2: curriculum header adapter

Create a registry-aware header adapter that can derive:

- breadcrumbs
- canonical title
- description
- domain accent

The page should still provide:

- local icon or icon treatment when needed
- eyebrow or conceptual throughline
- local title typography overrides
- optional aside

Do not force all pages into one visual header theme.

### Step 3: page-kind frames

Only after enough migrated examples exist, consider light wrappers for hub/unit/lesson behavior.

A page-kind frame should standardize slots and navigation contracts, not the internal grid.

## Educational component architecture

Do not create a universal `EducationalWidget` mega-component.

Prefer a small grammar of reusable behaviors:

- selector/control row
- curated-case selector
- truth/status readout
- reference atlas/table
- semantic previous/next navigation
- disclosure for free-form sandbox
- synchronized representation container

Subject-specific visualizations remain local.

Extract a reusable component only when at least two genuinely different concepts use the same interaction grammar.

## Geometry ownership

Each component owns the geometry required by its own legitimate states.

Parents may provide:

- available width
- grid position
- minimum track behavior
- alignment
- spacing between siblings

Parents must not reach into descendant internals to patch one screenshot.

Instructional containers use minimum heights plus natural growth.

Hard clipping is reserved for decorative visual canvases and intentional masks.

## Client/server boundary

Prefer server route modules for:

- registry lookup
- semantic page context
- static content assembly
- metadata

Pass small serializable contracts into client components that need interaction.

Do not import the entire curriculum registry into a client component merely to obtain a title or sibling route.

This keeps the knowledge graph authoritative without unnecessarily shipping it to the browser.

## Developer tooling boundary

Developer-only tools should have an explicit visibility contract.

They must not accidentally become required learner UI.

Long term, use a clear development/debug gate for tools such as structure inspection rather than relying on their visual subtlety to keep them out of the product experience.

## Progress and mastery

Progress data should reference stable curriculum node IDs, never page labels or visual ordering.

Mastery UI should consume prerequisite relationships from the registry.

Do not make containment order secretly function as prerequisite order.

## Route and graph validation

The registry currently validates:

- duplicate IDs
- duplicate routes
- missing prerequisite references
- self-dependencies
- prerequisite cycles

Future structural validation should add checks for migrated branches such as:

- active curriculum route has a real page
- live page has a curriculum node unless intentionally meta/tool-only
- planned nodes do not render as active navigation
- classified lesson/unit/hub contracts are internally plausible
- orphaned curriculum nodes
- orphaned route pages
- duplicate semantic descriptions where accidental

Validation should report architecture debt, not force a full-site migration in one pass.

## Authoring direction

MDX or another authoring layer remains useful later, but only after these contracts are stable:

- page context
- page kinds
- shared semantic navigation
- educational block grammar
- curriculum module composition

Do not introduce a new authoring system to compensate for unclear architecture.

## Migration order

For each branch being renovated:

1. establish/verify curriculum ontology
2. classify page roles
3. migrate the branch into a focused curriculum module when worthwhile
4. replace manually duplicated semantic navigation with page context
5. preserve or rebuild local presentation based on learning needs
6. extract only proven shared interaction grammar
7. verify rendered states
8. move to the next branch

## Architecture anti-patterns

Avoid:

- a second sitemap beside the curriculum registry
- hard-coded sibling links repeated across lesson files when context can derive them
- breadcrumbs whose ancestry disagrees with curriculum containment
- inferring page role solely from URL depth
- global stylesheets reaching into child page internals
- subject-specific decoration leaking into the global shell
- giant shared components with dozens of subject-specific variants
- client components importing the entire curriculum graph for simple semantic facts
- placeholder routes presented as live destinations
- developer/debug interfaces masquerading as educational content
- mass rewrites solely to make folder structures symmetrical

## Definition of a cohesive site

The site is cohesive when a learner can predict **how to move through knowledge** even while each subject feels visually distinct.

A learner should consistently understand:

- where they are
- what contains the current page
- what sits beside it
- what comes before/after when a sequence exists
- what lies deeper
- whether a destination is live or planned
- what the page is trying to teach

The visual answer to those questions may vary by subject. The semantic answer must not.
