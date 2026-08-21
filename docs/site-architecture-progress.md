# Site Architecture Progress

This file records implementation progress for the Education Station 64 product/site architecture work.

It is intentionally separate from visual verification. Architecture changes can improve ownership and maintainability without implying that a page's rendered composition has been reviewed.

## Current branch

`site-architecture`

Base: `main` at the inequality separation work (`2bcd870`).

The branch contains product/repository architecture work plus narrow migration pilots. It does not contain the separate academic Architecture-subject experiment.

## Core architecture now implemented

### Knowledge graph

- the curriculum registry remains the academic structural source of truth
- containment and prerequisite relationships remain separate
- optional `pageKind` supports `hub`, `unit`, `lesson`, `reference`, and `tool`
- canonical route normalization is shared by registry indexing, duplicate-route validation, href lookup, page context, and page policy
- focused curriculum modules register through `lib/curriculum/manifest.ts`
- the broad curriculum tree and compatibility additions remain migration fallbacks for untouched branches

### Page context

`lib/curriculum/page-context.ts` resolves:

- canonical node and domain
- status and optional page kind
- parent and ancestors
- breadcrumbs
- sibling collection
- previous / next active sibling
- children
- active children
- planned children

Pages should consume this semantic context rather than manually maintaining parallel ancestry/order data when the registry already knows it.

### Page policy

Product behavior that is not academic ontology lives in `lib/page-policy.ts`.

Current policy supports:

- `vocabularyTrigger: global | local | none`
- `masterySurface: global | local | none`

Curriculum-backed policy is keyed by stable curriculum node ID. Domain landing pages use stable domain IDs because they are not curriculum nodes.

The root server layout resolves policy into a small serializable route snapshot. `PagePolicyProvider` exposes only current identity and resolved behavior to client utilities.

### Shared shell

- `MainContent` is a layout `<div>`; route pages own the page-level `<main>` landmark
- root layout builds academic sidebar navigation on the server
- the client sidebar receives plain serializable navigation data rather than importing curriculum composition machinery
- `MasteryDock` consumes resolved page policy instead of importing the curriculum registry or checking a special Foundations parent ID
- Formal Science vocabulary consumes resolved page policy instead of maintaining a pathname blacklist

## Developer tooling boundary

Structure Scan / X-Ray is now explicitly developer-only product chrome.

Behavior:

- local development enables developer tools automatically
- deployed learner mode omits the developer footer from the sidebar DOM
- `?devtools=1` enables developer tools for the browser session
- `?devtools=0` disables them again
- toggling the gate remounts the sidebar so an active X-Ray mode cannot survive after developer tools are disabled
- `XRayConsole` is dynamically imported, so the tool is a separate client chunk rather than a static learner-shell import

## Vocabulary architecture

### Global curriculum-scoped vocabulary

`VocabularyDrawer` remains the route/scope-aware product vocabulary system.

Formal Science no longer contains a vocabulary pathname blacklist. Policy now expresses whether the current route uses the global trigger, owns vocabulary locally, or intentionally has none.

### Lesson-local vocabulary

The older radiology glossary is intentionally distinct and has been renamed `LessonVocabularyDrawer`.

It represents a different interaction contract:

- small local term list
- local search
- pronunciation / browser speech synthesis

Do not merge it blindly with the curriculum-scoped drawer. Shared behavior may be extracted later if a rendered/content audit shows enough real overlap.

## Mastery architecture

The seven current Mathematics Foundations child pages explicitly declare `masterySurface: "global"`.

The global mastery dock receives:

- stable node ID
- canonical label
- resolved page policy

It no longer imports curriculum or derives feature eligibility from one hard-coded parent node.

## Route / graph architecture audit

`npm run audit:architecture` is informational and currently reports:

- pages manually declaring breadcrumbs
- pages containing hard-coded previous / next lesson language
- layouts containing pathname policy lists
- shared components rendering page-level `<main>` landmarks
- client components importing the curriculum registry
- shared components hard-coding curriculum IDs
- top-level shared components with no direct import reference
- concrete academic routes missing a curriculum route literal
- curriculum route literals without a concrete or matching dynamic page
- dynamic academic route pages requiring human parity review

The route audit converts dynamic route segments into matchers instead of comparing them as literal URL strings.

The audit is a discovery tool. Planned curriculum nodes, dynamic catch-alls, indirect imports, and meta/tool routes still require human interpretation.

## Global component inventory

Verified unused global components removed on this branch:

- `MemexDock`
- `RouteLogger`
- `GlobalVisualMedia`

Verified genuinely shared primitives include:

- `Assessment`
- `VocabApplet`
- `DomainPageHeader`
- `Math`
- shared media components that still have multiple consumers

`DashboardCard` remains a live legacy presentation primitive. It is not the future universal page container, but it is not dead code.

## Curriculum composition progress

### Focused module manifest

Focused curriculum modules now register through `lib/curriculum/manifest.ts`.

Current order is explicit because a more specific focused module may replace a node inside a broader migrated module.

### Algebra

The focused Algebra module owns its refined subtree directly instead of relying on later Algebra-specific child patches in `registry.ts`.

Verified classifications currently encoded include:

- Algebra → hub
- Pre-Algebra → unit
- Integrated Algebra → hub
- Algebra Fundamentals → unit
- four Fundamentals children → lessons
- Graphing Linear Equations → lesson
- Systems of Equations → lesson
- Systems of Inequalities → lesson

Algebraic Inequalities remains intentionally unclassified because its current parent-lesson-plus-child structure is an ontology decision rather than a type-system problem.

### Logic

Logic is now classified as a hub. Its local vocabulary ownership is expressed through page policy.

### Computer Science

Computer Science is now classified as a hub in its focused curriculum module.

## Server / client migration pattern

The guiding rule is:

> **Resolve semantic/product truth on the server. Keep stateful learning interactions in the smallest useful client island.**

Do not maximize server-component counts for their own sake. A healthy client component with real state should stay client-side.

### Algebra hub

Before:

- whole route was client-side
- client imported curriculum to build branches and breadcrumbs
- one small equivalence rail required state

Now:

- server page resolves page context and branches
- equivalence rail is the client island
- visual composition is intentionally preserved

### Pre-Algebra

Before:

- whole unit was client-side despite no page-level state
- client imported curriculum
- quiz callback only logged the final score

Now:

- server page resolves parent and eight children
- VocabApplet and Assessment remain client islands
- no-op quiz callback removed

### Algebra Fundamentals

Before:

- whole unit was client-side
- client imported curriculum to build lesson cards
- no-op assessment callback kept the page client-side

Now:

- server page resolves unit context and children
- Assessment remains the client island
- breadcrumbs are derived from page context with only the short final `Fundamentals` presentation alias kept local

### Mathematics Foundations

Before:

- whole route was client-side despite no page-level state
- client imported curriculum to build seven child destinations
- assessment callback only logged a score

Now:

- server page resolves parent and child topics
- VisualAdder, VocabApplet, and Assessment remain client islands
- local vocabulary ownership is explicit in page policy
- hub-vs-unit classification remains deliberately unresolved until the scope is audited

### Logic

Before:

- whole hub was client-side despite no page-level state
- four curriculum nodes were queried separately
- assessment callback only logged a score

Now:

- server page resolves one Logic page context and its children
- domain/up navigation comes from context
- TruthEngine, QuantifierEngine, VocabApplet, and Assessment remain client islands
- older presentation language remains untouched for the later cohesion/content pass

### Computer Science

Before:

- whole hub was client-side with no state
- six curriculum nodes were queried directly
- route rendered a layout `<div>` rather than its page-level `<main>`

Now:

- server page resolves Computer Science context and six children
- page owns its `<main>` landmark
- DashboardCard remains a server-safe presentation component
- terminal/dashboard styling is intentionally unchanged

### Software

Before:

- interactive terminal page imported curriculum directly in the client
- client joined semantic node data to local presentation metadata

Now:

- server route resolves Software children and sends a small serializable node snapshot
- `SoftwareHubClient` owns hover preview and typing animation
- client still joins the server-provided semantic snapshot to its icon/snippet presentation metadata
- no curriculum registry is shipped merely to label/link the cards

### Abstract Algebra

Before:

- static hub was client-side solely because it queried curriculum data

Now:

- whole route is server-rendered from page context
- local notation/icons/background composition remain route-owned
- planned destinations remain non-clickable

### Linear Algebra

Before:

- interactive matrix hub imported curriculum into the client

Now:

- server wrapper resolves the nine module nodes
- `LinearAlgebraClient` owns hover relationship state
- only plain serializable semantic module data crosses the boundary

### Mathematics hub

The Mathematics route already had a healthy split before this work:

- server route resolves curriculum children
- interactive MathematicsHub receives a plain semantic snapshot

Do not rewrite it merely for symmetry.

## Deferred until a reliable build / render

### Integrated Algebra

Integrated Algebra still contains a larger synchronized equation/table/graph instrument. Its correct migration is a server wrapper plus a focused client representation studio, but this should be done only when a reliable build/render can verify the component split.

### Fundamentals dynamic lesson route

The `[lesson]` route is intentionally interactive and currently combines four instruments in one client file. Its next architecture step should be a server route wrapper that resolves the current curriculum lesson and passes a small semantic contract into the client lesson implementation.

Because Next route-param behavior and sibling navigation both matter here, do not perform this split without a build-capable verification loop.

### Shared semantic navigation primitives

Do not introduce a universal page frame yet.

Once the migrated pages can be rendered, build only the smallest semantics proven by repetition, likely:

- curriculum breadcrumbs
- parent/up navigation
- sibling navigation
- child live/planned destination treatment

These primitives should standardize meaning while preserving local visual dialects.

## Next verification sequence

When Vercel/build capacity returns:

1. compile the full `site-architecture` branch before any additional migration
2. verify learner sidebar has no developer footer by default
3. verify `?devtools=1` exposes Structure Scan and `?devtools=0` removes it cleanly
4. compare Algebra, Pre-Algebra, Algebra Fundamentals, Foundations, Logic, and Computer Science against their prior rendered states
5. verify Software and Linear Algebra interactive behavior after their server/client splits
6. verify Abstract Algebra planned/live card behavior
7. run `npm run audit:architecture` locally and inspect route-parity and unused-component findings
8. only then migrate Integrated Algebra or the dynamic Fundamentals lesson route

## Success metric

A well-architected curriculum page increasingly needs to specify only:

- curriculum node ID
- page-local learning content/model
- local presentation
- deliberate product-policy exceptions

It should not normally need to retype:

- ancestry
- sibling URLs
- child status
- duplicate curriculum descriptions
- global utility pathname exceptions
- broad curriculum imports inside client components for static semantic facts

The site is succeeding when structural behavior becomes predictable while subject pages remain free to look and teach differently.

## 2026-08-21 Computer Science root checkpoint

The Computer Science root now resolves and asserts its exact six direct
branches from the curriculum registry. It remains a server route; only the
bounded four-case evidence review is client-owned. Its former canvas background
has been replaced by a deterministic server SVG, and its vocabulary drawer now
derives six root terms plus twelve branch-owned terms through curriculum
containment. The root and Formal Science ancestor preserve group provenance.

Focused model, aggregation, TypeScript, and touched-file lint checks passed,
along with the informational architecture/readability/remaster scans, all 413
static page generations, and generated-HTML route/source/vocabulary/no-canvas
checks. Rendered browser verification remains queued because the local server
cannot start in this workspace.

## 2026-08-21 Religion root checkpoint

The Religion root now resolves and asserts its exact eight direct branches from
the curriculum registry. It remains a server route; its preserved comparative
fieldnote instrument and new bounded four-case evidence review are the only
client-owned lesson regions. The former animated canvas background has been
replaced by a deterministic server SVG comparative reading table. Seven planned
fields remain visible but inert, while Mythology is the only live child route.

Religion vocabulary now consists of ten root concepts plus sixteen terms owned
by the eight direct fields. Curriculum containment aggregates all 26 terms into
Religion and Humanities while retaining source-node provenance. Focused model,
aggregation, TypeScript, and touched-file lint checks passed, along with the
informational architecture/readability/remaster scans, all 413 static page
generations, and generated-HTML route/source/vocabulary/no-canvas checks.
Rendered browser verification remains queued because the local server cannot
start in this workspace.

## 2026-08-21 Astronomy root checkpoint

The Astronomy root now resolves and asserts its exact six direct branches from
the focused curriculum module. Planetary Astronomy remains active; Stellar,
Galactic, Extragalactic, Cosmology, and Astronomical Methods remain visibly
planned and inert. This repairs the prior dead Cosmology link and treats Methods
as a cross-scale evidence branch rather than omitting it from primary
navigation.

The route remains server-owned around bounded scene, signal, lookback, and
evidence client islands. Its viewport canvas is replaced by a deterministic
server SVG that shares the canonical lookback examples with the lesson.
Vocabulary now aggregates six root terms, eight Planetary terms, and ten terms
owned by the remaining direct branches into Astronomy and Natural Science with
source provenance.

Focused model, aggregation, TypeScript, and touched-file lint checks passed,
along with the informational architecture/readability/remaster scans, all 413
static page generations, and generated-HTML route/source/vocabulary/no-canvas
checks. Rendered browser verification remains queued because the local server
cannot start in this workspace.

## 2026-08-21 Political Science root checkpoint

The Political Science root now resolves and asserts its exact eight direct
branches from the focused curriculum module. All eight remain visibly planned
and inert. Three responsive analytical bands organize the peers without
creating false curriculum parents or a fixed-height radial stage.

The route returns to server ownership around the preserved Parliament and new
evidence-review client islands. A deterministic server SVG replaces the random
partisan-territory canvas and consumes the same fictional party, seat, color,
hemicycle, total, and majority model as the coalition instrument. The unused
ideology quadrant has been removed.

Vocabulary now aggregates six root terms plus sixteen direct-branch terms into
Political Science and Social Science with source provenance. Focused model,
aggregation, TypeScript, touched-file lint, informational repository audits,
all 413 static page generations, and generated-HTML
route/source/vocabulary/no-canvas checks passed. Rendered browser verification
remains queued because the local server cannot start in this workspace.

## 2026-08-21 Medicine root checkpoint

The Medicine root now resolves and asserts its exact ten direct branches from
the focused curriculum module. Anatomy & Physiology remains active; the other
nine fields remain visibly planned and inert. Four responsive task bands
organize the peers without creating false curriculum parents or compressing
long clinical field descriptions into a narrow sidebar.

The route remains server-owned around the preserved clinical-reasoning and
body-system client islands plus a bounded four-case evidence review. One shared
model owns the Observe → Interpret → Test → Act → Monitor loop, fictional
evidence weights, exact diagnostic-table arithmetic, and every answer path. The
background consumes the same reasoning stages, and all simulations remain
explicitly synthetic educational abstractions.

Vocabulary now aggregates six root terms, twenty terms owned by nine planned
branches, seven Anatomy & Physiology terms, and six Skeletal terms into
Medicine and Applied Science with source provenance. Focused model,
aggregation, TypeScript, touched-file lint, informational repository audits,
all 413 static page generations, and generated-HTML
route/source/vocabulary/safety/no-canvas checks passed. Rendered browser
verification remains queued because the local server cannot start in this
workspace.
