# Site Architecture Audit

This audit tracks structural debt in Education Station 64 itself. It complements the visual Cohesion Audit by focusing on data ownership, semantic navigation, shared shell boundaries, global utilities, route/curriculum parity, and reusable product infrastructure.

Snapshot basis: `main` around commit `2bcd870`.

## Priority 0: semantic foundation

### Nested page-level main landmarks

**Observed:** `AppShell` renders `MainContent`, while `MainContent` historically rendered a `<main>` and route pages commonly render their own `<main>`.

**Direction:** the persistent shell owns layout only; each route owns the page-level `<main>` landmark.

**Status on `site-architecture`:** structurally fixed by changing `MainContent` to a layout `<div>`.

### Missing curriculum-to-page adapter

**Observed:** pages repeatedly hard-code facts the curriculum already knows, especially breadcrumbs, parents, children, sibling order, and live/planned state.

Repository search for `breadcrumbs` returns manual page implementations across multiple domains and depths, including domain hubs, Algebra pages, Applied Science pages, and Interdisciplines.

**Direction:** `lib/curriculum/page-context.ts` resolves semantic page relationships from the registry.

**Status on `site-architecture`:** initial resolver added.

### Page job is not encoded

**Observed:** the learning/design rules distinguish hub, unit, lesson, reference, and tool pages, but `CurriculumNode` historically had no explicit page-role field.

**Direction:** optional `pageKind` during migration. Do not infer role solely from route depth or child count.

**Status on `site-architecture`:** optional type added; branch data can be classified incrementally.

---

## Priority 1: semantic navigation migration

### Manual breadcrumbs

**Debt:** many pages construct breadcrumb arrays themselves even when ancestry is already represented by curriculum containment.

**Risk:** visual/header changes can drift from ontology; renaming or moving a branch requires edits in many route files.

**Migration:**

1. build a registry-aware breadcrumb/header adapter over page context
2. migrate one representative branch first
3. keep local typography/eyebrow/icon overrides page-owned
4. expand only after the abstraction proves flexible

**Pilot:** Algebra is the best first branch because it contains hubs, units, atomic lessons, child lessons, planned/live destinations, and cross-unit sequencing.

### Hard-coded previous/next lesson links

**Debt:** repository search for `Previous lesson` / `Next lesson` finds explicit sequence navigation in Algebra and legacy Calculus lessons.

**Risk:** ordering can disagree with registry order or point at routes that later become planned/moved.

**Migration:** sibling navigation should consume `previousActiveSibling` / `nextActiveSibling` from page context when the intended sequence matches containment order. Cross-unit continuation remains explicit and differently labeled.

Do not force all pedagogical sequencing to equal sibling order. When sequence differs from containment, model that difference deliberately rather than hiding it in page copy.

---

## Priority 1: page-policy layer

Some product behavior belongs to neither academic ontology nor local visual composition.

Examples:

- whether a page uses the global vocabulary trigger, owns vocabulary locally, or has no vocabulary UI
- whether a mastery control is relevant
- whether a global utility should be suppressed because the page owns an equivalent local surface

Create a small **page-policy** layer keyed by stable curriculum node ID rather than pathname strings.

Possible policy shape:

```ts
type PagePolicy = {
  vocabulary?: "global" | "local" | "none";
  mastery?: "manual" | "none";
};
```

Keep this separate from `CurriculumNode` unless a property is genuinely academic/semantic rather than product behavior.

### Formal Science vocabulary blacklist

**Observed:** `app/formal-science/layout.tsx` contains a long literal `hiddenTriggerPaths` list covering hubs and lessons that own vocabulary locally.

**Risk:** every newly refined route requires another pathname exception; trailing-slash variants are duplicated; UI policy is coupled to URL strings.

**Migration:** page policy by curriculum node ID. The Formal Science layout should ask for the current page policy instead of knowing individual Algebra routes.

Do not rewrite this blind until the global/local vocabulary behavior can be visually checked.

### MasteryDock special case

**Observed:** `MasteryDock` directly queries the registry from a global client component and only renders when the current node's parent equals one hard-coded Foundations node ID.

**Risk:** mastery semantics are encoded as a one-off implementation rather than reusable page policy/progress behavior.

**Migration:** decide mastery eligibility from page policy or a progress contract, using stable node IDs and prerequisite data. Avoid a growing collection of parent-ID checks.

---

## Priority 1: developer-tool boundary

### Structure Scan / X-Ray

**Observed:** the normal sidebar includes a control explicitly labeled `Developer view`. `XRayConsole` can inject global outline/background rules into nearly every DOM element.

**Value:** useful during development.

**Debt:** development tooling is mounted as normal product chrome.

**Direction:** add an explicit dev-tools gate, for example environment/config/query-state appropriate to the development workflow. Keep the tool available without asking ordinary learner UI to carry it permanently.

Do not remove it until the replacement access path is established.

---

## Priority 1: registry composition cleanup

The registry currently composes curriculum through several mechanisms:

- broad `tree.ts`
- focused subtree replacements
- semantic metadata overlay
- `domainRootAdditions`
- `nodeChildAdditions`

This is understandable migration scaffolding, but every new composition mechanism increases precedence complexity.

### Direction

Move toward one **focused-module manifest** for migrated branches:

- untouched branches may remain in the broad tree
- a migrated branch exports a complete subtree
- the registry replaces the broad node through one predictable manifest
- semantic metadata may remain a small overlay for branches not yet migrated
- avoid adding new root/child exception collections when a focused module is the clearer owner

### Migration rule

Do not mass-convert the whole registry. Convert a branch when that branch is actively being rebuilt and its ontology is understood.

---

## Priority 2: route / graph parity validation

Current registry validation catches duplicate IDs/routes and prerequisite errors. Add informational checks before making them hard failures.

Desired checks:

- active curriculum route has a corresponding `page` route
- a curriculum-like live route has a node unless explicitly exempted as meta/tool infrastructure
- placeholder nodes are never rendered as active destinations
- page ancestry and canonical route agree
- orphan curriculum nodes
- orphan route pages
- migrated nodes have page kind when the branch declares classification complete

Dynamic routes need explicit handling rather than naive path-string matching.

---

## Priority 2: global component inventory

### Likely fossils to verify

Code search currently finds `MemexDock` only in its own component file and `RouteLogger` only in its own component file.

Treat these as **verify-unused candidates**, not confirmed dead code. Check dynamic/indirect use before deletion.

### Parallel vocabulary systems

There is a global `app/_components/VocabularyDrawer.tsx` used by the Formal Science layout and a separate `app/_components/ui/VocabDrawer.tsx` used by at least a radiology page.

Determine whether these represent two genuinely different tools or a legacy fork. Prefer one vocabulary data/behavior system with local presentation variants rather than parallel semantic implementations.

### Dashboard-era primitives

`DashboardCard` is still used in Astronomy and several Computer Science pages, so it is not dead code.

Do not delete it as part of architecture cleanup. Instead classify it as a presentation primitive used by legacy pages and avoid treating it as the mandatory future page container.

---

## Priority 2: client/server boundary

Global client components currently perform curriculum lookup directly in some cases.

Long-term direction:

- resolve curriculum/page context in server route/layout modules where practical
- pass small serializable semantic contracts to client instruments
- avoid shipping broad curriculum structures to client components merely to obtain labels or navigation facts

The sidebar is a special case because global client navigation is intentional; optimize only when there is a concrete bundle/maintenance benefit.

---

## Priority 3: shared curriculum UI primitives

Build only after page context has a real migration pilot.

Candidate primitives:

- `CurriculumBreadcrumbs`
- `CurriculumPageHeader` adapter around the existing header family
- `ParentLink`
- `SiblingNavigation`
- `ChildDestination` with active/planned semantics

These primitives should expose semantic variants and class/style escape hatches. They must not force identical page composition.

Avoid a universal page component with dozens of subject flags.

---

## Priority 3: authoring layer

MDX remains a later optimization.

Do not introduce it until:

- page context is stable
- page kinds are useful in real branches
- shared semantic navigation is proven
- reusable educational block grammar is clearer
- curriculum module composition is simpler

Authoring technology should sit on top of the architecture, not compensate for missing contracts.

---

## Recommended migration sequence

### Phase A — foundation

- semantic `<main>` ownership
- page-context resolver
- optional page kinds
- architecture docs/audit
- informational audit command

### Phase B — Algebra pilot

Migrate a narrow current branch, preferably Algebra Fundamentals and its atomic lessons:

- derive breadcrumbs from page context
- derive parent/up relationship
- derive sibling navigation where appropriate
- classify unit/lesson roles
- do not change the page's visual model in the same pass

Then migrate Inequalities / Systems of Inequalities to test parent-child plus cross-topic continuation.

### Phase C — global page policy

- vocabulary global/local/none
- mastery eligibility
- remove pathname blacklists and parent-ID special cases gradually

### Phase D — curriculum composition

- move actively rebuilt branches into focused modules
- reduce root/child addition exception lists
- preserve the broad tree as migration fallback

### Phase E — validation and cleanup

- route/graph parity audit
- dev-tool gate
- verify-unused global components
- vocabulary implementation consolidation

### Phase F — broader branch migration

Proceed according to the Cohesion Audit waves. Architecture migration should travel with content renovation rather than racing ahead of it.

---

## Success condition

Site architecture is working when a new page normally needs to specify only:

- its curriculum node ID
- its page-local learning content/model
- its local visual presentation
- any deliberate policy exceptions

It should **not** normally need to retype its ancestry, sibling URLs, live/planned semantics, global utility exceptions, or a parallel description of where it lives in the knowledge graph.
