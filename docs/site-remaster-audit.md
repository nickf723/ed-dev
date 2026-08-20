# Education Station 64 Site Remaster Audit

This ledger keeps the whole site inside one deliberate remaster program. It complements the Development Constitution, Design Constitution, Cohesion Audit, and Visual Verification Queue.

The goal is not to apply a new skin to every route. It is to bring every page through the same semantic, educational, environmental, and verification gates while preserving the parts that already work.

## Inventory snapshot

Source audit recorded on 2026-08-20:

Refresh this snapshot with `npm run audit:remaster` whenever routes are added, moved, or remastered in bulk.

| Area                 | Route pages |
| -------------------- | ----------: |
| Formal Science       |         144 |
| Natural Science      |          84 |
| Social Science       |          13 |
| Humanities           |          94 |
| Applied Science      |          41 |
| Interdisciplines     |          15 |
| Other product routes |           4 |
| **Total**            |     **395** |

The audit covers every `app/**/page.tsx` route, including dynamic route families. A dynamic route counts as one route module even when it can render many records or lessons.

### Migration signals

These are prompts for review, not automatic defects:

- 181 route modules still declare the whole page as a Client Component.
- 173 route modules use the shared `DomainPageHeader` family.
- 125 route modules resolve curriculum page context directly.
- 62 route modules use the newer `SceneFrame` composition system.
- 241 route modules explicitly import a background or world component.
- 291 route modules contain at least one 6–10 px text token; every occurrence must be classified as decorative telemetry or raised to the readability floor.
- 194 pages still contain a page-local breadcrumb declaration or adapter call and should be reviewed when their branch is remastered.
- 20 route modules contain legacy implementation-themed chrome; the current concentration is in older Mathematics families.
- two route modules use randomness only inside explicit learner actions; static inspection found no page-level render-time randomness in the route modules.

These numbers show why the remaster must be incremental. The site contains several development eras, and global replacement would erase good local work while leaving semantic debt untouched.

## Remaster acceptance contract

Every route eventually passes the following gates.

### Preserve

- Inventory the existing background, navigation topology, useful content, live routes, interactions, and memorable moments.
- Keep successful systems unless the pass explicitly replaces them with something stronger in the same dimensions.

### Tree

- Filesystem route, curriculum node, sidebar ancestry, breadcrumbs, and live/planned states agree.
- Hubs foreground direct children; grandchildren and cross-links remain visibly different.
- Vocabulary is registered at the narrowest teaching node and inherited upward.

### Frame

- The page kind is honest: hub, unit, lesson, reference, or tool.
- Each viewport has one center of gravity.
- Lessons use a readable measure; hubs may use a wider field when navigation requires it.
- Required content grows naturally without clipping or screenshot-specific height patches.
- Major foreground groups are separated by deliberate scenery corridors.

### Field

- One dominant environmental idea is recognizable in a still screenshot.
- Backgrounds are composed scenes, mechanisms, maps, fields, archives, instruments, or other subject-specific worlds—not generic particles, grids, or neon ambience.
- Glass uses local frost and moderate opacity so the world remains visible.
- Dense manipulation creates a quiet pocket without erasing the surrounding environment.
- Reduced motion preserves identity and comprehension.

### Flow

- Navigation pages teach relationships and choice criteria.
- Atomic lessons visibly Explain → Do → Check and include an insightful transfer check plus deterministic practice when appropriate.
- Controls and consequences remain co-visible.
- Reference, repository, and tool pages support a truthful retrieval or performance loop.

### Verify and publish

- Run TypeScript, lint, vocabulary, architecture, readability, applicable data tests, and a production build.
- Inspect desktop, narrower desktop, mobile, interaction, long-copy, boundary, empty, error, and reduced-motion states when a trusted browser is available.
- Queue visual verification honestly when it is not.
- Commit and push one coherent pass to `studio`, verify the remote tree, and confirm Vercel created no development deployment.

## Breathing-room standard

The site should feel inhabited, not tiled.

1. Reserve visible subject scenery at outer margins and between major content groups.
2. Break uninterrupted dashboard walls into semantically related objects when continuity is not part of the subject model.
3. Use section rhythm to reset attention after dense atlases, instruments, tables, collections, and assessments.
4. Keep background landmarks or motion visible inside those openings so space feels intentional.
5. Do not create blank voids or use filler cards to manufacture occupancy.
6. On narrow screens, preserve the rhythm through vertical spacing, lighter local surfaces, and normal document flow.

## Audit waves

### Wave 0 · shared contract and known regressions

- Establish this complete inventory and the scenery-corridor standard.
- Replace the rejected Number Theory sieve wallpaper with a stronger integer environment.
- Keep the shared sidebar, vocabulary drawer, Interdisciplines matrix, and collection repositories in the Priority 0 visual queue.

### Wave 1 · Mathematics

- Discrete Mathematics parent, Set Theory, and Graph Theory are structurally refined; continue through Combinatorics and Recursion Theory.
- Then audit Foundations, Linear Algebra, Abstract Algebra, Calculus, Geometry, Statistics, Applied Mathematics, and their live child sequences.
- Preserve the strongest existing instruments; migrate ontology, context, vocabulary, lesson flow, readability, and environment together.

### Wave 2 · Formal Science outside Mathematics

- Logic
- Computer Science
- Information Science
- Data Science
- Systems Science

### Wave 3 · Natural Science

- Physics
- Chemistry
- Biology
- Earth Science
- Astronomy

Use each science's own experimental, spatial, temporal, taxonomic, or field-based grammar rather than importing Mathematics layouts.

### Wave 4 · Social Science

- Psychology
- Economics
- Sociology
- Political Science
- Anthropology
- Linguistics
- Communication Studies
- Geography
- Law

### Wave 5 · Humanities

- Philosophy
- History
- Visual Arts
- Music
- Literature
- Religion
- Languages
- Performing Arts
- Gaming and its repositories
- Culinary Arts
- Sports
- Culture
- Futurology

### Wave 6 · Applied Science

- Engineering
- Technology
- Materials Science
- Industrial Design
- Architecture
- Medicine
- Health Sciences
- Agriculture
- Business
- Education
- Library Science

### Wave 7 · Interdisciplines

Rebuild relationships after canonical pages are strong enough to support precise concept-level links. Interdisciplines remains an atlas over the five branches, not a duplicate curriculum.

## Current target

The Discrete Mathematics parent now derives four live children from a focused curriculum module, contributes node-owned vocabulary, presents direct-child navigation before its graph workshop, and uses a finite-structure drafting table instead of the random network wallpaper and remote server-room hero. Set Theory is now classified and built as a bounded root unit with six direct planned lessons: membership precedes notation in its overview workshop, the preserved Venn-operation idea has become a rule-driven scanner with curated and boundary cases, registry vocabulary replaces the parallel glossary, and transfer plus deterministic generated practice complete the instructional contract. The parent and both rebuilt root units remain queued for rendered verification.

Graph Theory is now a bounded six-lesson root unit. Its graph-building strength remains at the Discrete Mathematics parent, while the root preserves and clarifies pathfinding through a deterministic BFS/DFS traversal on the same seven-vertex graph used by the scenery, worked model, and degree ledger. The client-heavy random constellation, random maze, remote hero, local glossary, and implementation chrome are gone; curriculum context, inherited vocabulary, transfer reasoning, and generated fluency practice now travel as one bundle.

Combinatorics is the next family target. Preserve its counting vault and cipher-ring strengths while repairing page depth, context, explanation, assessment, terminology, and its relationship to the newly stabilized Discrete Mathematics parent.

The program advances one coherent page or family at a time. A route leaves the ledger only when its semantic structure, educational job, distinctive world, geometry, verification record, and published `studio` commit all agree.
