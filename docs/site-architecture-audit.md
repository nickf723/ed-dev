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

**Status on `site-architecture`:** initial resolver added and already used by Algebra, Pre-Algebra, and Algebra Fundamentals pilots.

### Page job is not encoded

**Observed:** the learning/design rules distinguish hub, unit, lesson, reference, and tool pages, but `CurriculumNode` historically had no explicit page-role field.

**Direction:** optional `pageKind` during migration. Do not infer role solely from route depth or child count.

**Status on `site-architecture`:** optional type added; verified Algebra roles are being classified incrementally.

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

**Pilot:** Algebra remains the first migration branch because it contains hubs, units, atomic lessons, child lessons, planned/live destinations, and cross-unit sequencing.

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

**Status on `site-architecture`:** implemented as stable node-ID policy plus domain-root policy. The root layout resolves policy server-side into a small serializable route snapshot for client utilities.

### Formal Science vocabulary blacklist

**Observed historically:** `app/formal-science/layout.tsx` contained a long literal `hiddenTriggerPaths` list covering hubs and lessons that own vocabulary locally, including duplicate trailing-slash variants.

**Status on `site-architecture`:** migrated. Formal Science vocabulary now consumes resolved page policy; the pathname blacklist has been removed.

### MasteryDock special case

**Observed historically:** `MasteryDock` directly queried the registry from a global client component and only rendered when the current node's parent equaled one hard-coded Foundations node ID.

**Status on `site-architecture`:** migrated. The existing seven Foundations child pages declare global mastery policy and `MasteryDock` consumes the resolved page-policy context rather than curriculum ancestry.

---

## Priority 1: developer-tool boundary

### Structure Scan / X-Ray

**Observed historically:** the normal sidebar included a control explicitly labeled `Developer view`. `XRayConsole` can inject global outline/background rules into nearly every DOM element.

**Value:** useful during development.

**Status on `site-architecture`:** gated. Local development exposes developer tools automatically. Deployed learner chrome hides the sidebar developer footer by default. Visiting a deployed route with `?devtools=1` enables the tools for the browser session; `?devtools=0` disables them again.

This is a visibility boundary, not yet a bundle split: the developer component still exists in the sidebar implementation. A later optimization may lazy-load or move the tool if bundle impact becomes meaningful.

---

## Priority 1: registry composition cleanup

The registry historically composed curriculum through several mechanisms:

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

**Status on `site-architecture`:** focused modules now register through `lib/curriculum/manifest.ts`; Algebra also owns its refined descendants directly instead of relying on Algebra-specific child additions in `registry.ts`.

### Migration rule

Do not mass-convert the whole registry. Convert a branch when that branch is actively being rebuilt and its ontology is understood.

---

## Priority 2: route / graph parity validation

The architecture audit now includes a source-level parity report in addition to registry runtime validation.

`npm run audit:architecture` reports:

- concrete academic page routes with no matching curriculum route literal
- curriculum routes with no concrete page and no matching dynamic page
- dynamic academic route pages requiring explicit human review

The parity report is informational, not a build failure. It deliberately does not pretend source scanning can distinguish every active node from every planned placeholder.

Dynamic routes are converted to matchers so routes such as `[lesson]` and catch-all placeholder pages are not compared as naive literal strings.

Future validation may become stricter once more branches are migrated and route/status ownership is less ambiguous.

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

The migration direction is now proven in several places:

- navigation data is resolved server-side and passed to the client sidebar as a serializable snapshot
- page policy is resolved server-side and passed to client utilities as a small route snapshot
- Algebra hub, Pre-Algebra, and Algebra Fundamentals resolve curriculum semantics server-side while interactive islands remain client-side

Continue applying this pattern when it simplifies ownership. Do not split healthy client components merely to maximize a server-component metric.

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

Migrate current Algebra pages semantically without visual homogenization:

- derive breadcrumbs from page context
- derive parent/up relationships
- derive sibling navigation where appropriate
- classify verified hub/unit/lesson roles
- preserve local visual models

Then use Inequalities / Systems of Inequalities to test parent-child plus cross-topic continuation.

### Phase C — global page policy

**Substantially complete on branch:**

- vocabulary global/local/none
- mastery eligibility
- server-resolved page-policy snapshot
- removal of Formal Science pathname blacklist
- removal of Foundations-only MasteryDock ancestry special case

### Phase D — curriculum composition

**In progress:**

- focused module manifest exists
- Algebra subtree has been made more self-contained
- broad tree and compatibility additions remain for untouched branches

### Phase E — validation and cleanup

**In progress:**

- route/graph parity audit added
- dev-tool visibility gate added
- verify-unused global components still pending
- vocabulary implementation consolidation still pending

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
