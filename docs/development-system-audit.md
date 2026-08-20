# Development System Audit

This audit records where Education Station 64's development system is strong, where it remains partial, and which infrastructure improvements should come next. The binding rules live in `AGENTS.md` and `docs/development-constitution.md`.

## What is already working

- The curriculum registry provides stable IDs, canonical routes, hierarchy, status, and validation.
- Academic sidebar navigation is derived from the curriculum instead of maintained as a second sitemap.
- Page context can derive ancestry, breadcrumbs, children, siblings, and active/planned state.
- The Design and Atomic Lesson constitutions encode the recent shift toward cognitive maps, discovery-to-formalization, one coherent learner action, truthful boundaries, and transfer.
- The visual-verification queue prevents compile success from being mistaken for visual completion.
- The existing vocabulary registry can compose and deduplicate term collections.
- API-backed experiments already exist for art, music, zoology, games, and other media.
- A shared collection record/adapter contract exists in `lib/collections/schema.ts`.

## Problems corrected in this governance pass

- Publishing rules disagreed: some documents required `studio`, while the active workflow was direct-to-`main`.
- The site's five canonical knowledge branches and the Interdisciplines relational role were not stated consistently.
- The experimental 64-field target risked turning a brand name into an ontology quota.
- Route, curriculum, background, vocabulary, assessment, and repository work were described in separate documents rather than as one page bundle.
- Assessments were encouraged, but the required combination of insightful transfer and deterministic generated practice was not explicit.
- Collections and APIs lacked one binding contract for collection type, provenance, facets, fallback behavior, and failure states.
- “Unique backgrounds” did not explicitly guarantee local identity for the smallest pages.

## Remaining implementation gaps

### 1. Vocabulary aggregation is now partially automated

The first implementation slice now registers Mathematics vocabulary by curriculum node ID and derives Mathematics, Algebra, Pre-Algebra, and contributing descendant scopes from the curriculum tree. Parent groups follow direct-child containment, retain curriculum-node provenance, and are covered by a focused aggregation test. Legacy Formal Science branches still use handwritten scopes while they await bounded migration.

Remaining work:

- migrate Logic, Computer Science, Information Science, Data Science, and Systems Science into node-owned registrations;
- migrate the other four domains branch by branch rather than through one mass rewrite;
- move legacy broad-domain terms to the narrowest curriculum nodes that actually teach them;
- derive domain and global glossary scopes from the same registry once each branch has trustworthy ownership;
- replace remaining lesson-local glossary forks with adapters over node-owned terms when those pages are renovated.

### 2. Assessment infrastructure is uneven

Formal Science contains many assessment files, while other branches often rely on page-local interactions or no explicit check. The current generic assessment component favors quiz forms and does not express generated-task contracts.

Required future work:

- define shared `TaskGenerator`, `SolutionModel`, `AnswerChecker`, and explanatory-feedback contracts;
- provide deterministic seeds for reproducible generated tasks;
- add domain-authentic response types beyond multiple choice;
- validate generator bounds and representative edge cases;
- keep assessment UI adaptable to each subject's local visual grammar.

### 3. Collection infrastructure needs facets and provenance

`lib/collections/schema.ts` normalizes basic media records and source adapters, but it does not yet standardize typed facets, query state, pagination, freshness, partial results, or fallback status.

Required future work:

- add typed facet definitions and filter operators;
- add provenance and retrieved/updated timestamps at record and field level where needed;
- add pagination/cursor and result-count contracts;
- distinguish live, cached, curated fallback, partial, stale, rate-limited, and failed results;
- reuse the query engine across zoology, games, art, music, sports, media, geography, and future repositories.

### 4. Page-bundle completeness is not automatically validated

The architecture audit can find route and curriculum mismatches, but it does not yet know whether an active page has vocabulary, assessment, an academic world, or a collection contract appropriate to its page kind.

Required future work:

- create a page-development manifest keyed by curriculum node ID;
- record page kind, vocabulary policy, assessment/evidence policy, world/background ownership, and collection/API policy;
- audit active routes against the declared contract;
- allow explicit `not applicable` reasons rather than forcing meaningless widgets or quizzes.

### 5. Interdisciplines still contains legacy-owned pages

Game Studies now has a canonical Humanities home. Cognitive Science, Bioinformatics, Mechatronics, Astrobiology, and other legacy routes should be evaluated one at a time for canonical ownership, with Interdisciplines retaining the relationship and redirects preserving old links.

## Recommended implementation order

1. Build curriculum-node vocabulary registration and automatic ancestor aggregation.
2. Extend the collection schema with facets, provenance, freshness, and result-state contracts.
3. Define generated-practice and answer-checking primitives using one mathematics lesson as the first implementation.
4. Add the page-development manifest and architecture validations.
5. Apply the full bundle contract to one newly built page, then one legacy-page renovation.
6. Continue branch by branch, alternating expansion with bounded cleanup of nearby older pages.

## Additional principles worth preserving

- A canonical home can have many cross-links; knowledge should not be duplicated to express interdisciplinarity.
- A page should remain useful when motion is reduced and when an external API fails.
- Facts, media, maps, and model assumptions retain visible provenance.
- Simulations state their ruleset and boundaries instead of implying universal fidelity.
- Reuse data contracts, validators, and interaction grammar; do not reuse a page silhouette merely because it worked once.
- Completion is not mastery, activity is not learning, and visual novelty is not explanation.
- Build breadth without abandoning depth: every new branch becomes a reason to improve the parent and a nearby legacy page.
