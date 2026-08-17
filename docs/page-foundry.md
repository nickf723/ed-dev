# Page Foundry

Page Foundry is the bounded production queue inside Knowledge Studio.

Run the local site and open:

```text
http://localhost:3000/studio/foundry
```

The regular Studio toolbar also links to it through the **Foundry** tab.

## Purpose

Foundry keeps unattended page production finite, hierarchical, and inspectable. Every brief records:

- hierarchy, parent node, route, page type, and curriculum depth;
- organizing principle and learner question;
- content boundaries and top-to-bottom hierarchy;
- primary navigation task, direct children, topology, first viewport, and secondary navigation;
- API or curated data contract;
- academic-world family and attention modes;
- environment and interaction metaphors;
- visual topology and primary interaction;
- recent patterns that must not be repeated;
- reusable Studio systems the page should extract;
- quality gates, blockers, notes, commit state, and build status.

## Parent-first scheduling

Foundry schedules the curriculum tree from parent to child.

- A queued child is not production-ready while its nearest unfinished parent remains structurally incomplete.
- Parent readiness means the parent has correct ontology, direct-child navigation, route registration, sidebar ancestry, breadcrumbs, page identity, responsive composition, and an academic-world family.
- Prepare commands sort by ascending curriculum depth unless a brief explicitly records an exception.
- Bug fixes and isolated repairs may bypass parent-first order when they do not invent missing branch structure.
- A batch should not contain a parent and several speculative children unless the parent is completed and validated first inside the batch.

This rule prevents polished islands from forming beneath placeholder or misleading hubs.

## Navigation-first academic worlds

Foundry prevents the shared neoglass shell from swallowing the identity of individual subjects.

Every page chooses an academic world such as:

```text
living exhibit
galactic expedition
archive
laboratory
observatory
debate chamber
creative studio
marketplace
field station
workshop
runtime stack
```

The registry lives at:

```text
lib/page-system/academic-worlds.ts
```

Each world defines a promise, environment metaphor, interaction metaphor, preferred topologies, visual taboos, and attention behavior. The complete production rules live in `docs/academic-world-design-contract.md`, `docs/scene-composition.md`, and `docs/design-constitution.md`.

The navigation contract remains separate from the visual brief. A page cannot compensate for weak hierarchy with a dramatic background.

## Component-role contract

A brief should identify which regions are:

- primary navigation;
- explanation;
- controls;
- visual response;
- result or interpretation;
- metric readouts;
- principles or criteria;
- cross-links.

The build should not render every role as the same rounded card. Non-clickable explanation and principles must not impersonate navigation.

## Widget contract

A signature widget is one coherent reasoning loop. If a page contains independent questions, Foundry should declare separate widgets rather than one mega-panel with unrelated modes.

Examples:

- graph traversal, sorting, and complexity belong in separate algorithm instruments;
- observation, modeling, and light-travel comparisons may coexist only when their controls and interpretations remain distinct;
- a background may acknowledge the active section without mirroring every internal control update.

## Background attention contract

Every world brief should describe:

- **ambient mode**, the slow identity state;
- **showcase mode**, when the world becomes the main explanatory object;
- **quiet mode**, when a control-rich widget needs reduced event density.

Direct widget-to-background synchronization is optional, not a default requirement. Use it only when the ambient response adds understanding.

## Workflow

A page moves through:

```text
queued → briefing → building → extracting → validating → committed → review → released
```

Use **Prepare next 1 / 3 / 5** to create a bounded run command. The command is copied to the clipboard and stored in the queue. It instructs the builder to:

1. verify parent readiness, ontology, and direct children;
2. put prominent primary navigation before supporting content on non-lesson pages;
3. define component roles and separate independent widgets;
4. build the declared academic world with ambient, showcase, and quiet behavior as appropriate;
5. preserve one first-viewport center of gravity;
6. use honest chart scales and explicit toy-model assumptions;
7. extract reusable systems;
8. validate, commit, and push before continuing.

Foundry never starts a model worker by itself. It prepares the exact work contract for an active ChatGPT or Codex run while preserving human control over scope and repository changes.

## Extraction rule

A page is not complete when its route renders. During `extracting`, decide whether each new topology, background, widget, adapter, card grammar, instrument, or design token should become:

- global;
- domain-wide;
- branch-wide;
- page-specific.

Registered patterns are recorded in the Foundry pattern library and should become Studio options over time.

## Validation gates

Before `committed`, verify:

- parent-first order was respected or the exception is recorded;
- route, curriculum node, sidebar ancestry, and breadcrumbs agree;
- primary navigation is prominent and recognizable;
- component roles do not share one undifferentiated card grammar;
- independent questions use independent widgets;
- controls, response, and result remain together;
- background motion is visible but calm enough for the active task;
- chart scales and notation are honest;
- readable desktop, narrow desktop, mobile, and reduced-motion states exist;
- build and available audits pass;
- the resulting commit is pushed.

## Storage and safety

The queue lives at:

```text
content/page-foundry/queue.json
```

Saving validates the normalized queue and creates a timestamped backup in:

```text
.next/studio-backups
```

The Foundry route and write API return 404 outside local development.
