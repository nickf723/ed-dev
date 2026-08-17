# Academic world scene composition

Academic worlds are behavioral visual systems, not wallpapers. A page should expose enough of the world for its motion and relationships to explain the subject.

## Shared primitives

- `SceneFrame` owns the page-level background, sticky header, width, and world director.
- `WorldWindow` reserves an intentionally open stage and gives the learner direct control over the world’s important states.
- `Surface` provides four opacity roles: `solid`, `glass`, `ghost`, and `open`.
- `WorldDirector` coordinates hover, focus, and pinned scene state between navigation and a behavioral background.

## Composition rules

1. Keep roughly one third of the first desktop viewport visually open.
2. Use `solid` only for sustained reading or complex controls.
3. Use `glass` for primary content that can share space with the world.
4. Use `ghost` for labels, navigation, and short explanations inside a world window.
5. Use `open` for scenery corridors and transitions.
6. Do not solve contrast by making every panel opaque. Use local scrims behind text.
7. Meaningful text should normally be at least 12px; body copy should normally be 15–17px.
8. A world state should respond to page state whenever the relationship is academically meaningful.
9. Mobile layouts should include a dedicated world window instead of relying on narrow gutters.
10. Every new world engine should support ambient, showcase, and thumbnail presentations over time.

## Pilot mappings

### Astronomy

- `local`: nearby systems, orbital motion, stellar scale
- `galaxy`: differential rotation, dust, lensing, populations
- `web`: clusters, filaments, expansion, cosmological scale

### Zoology

- `habitat`: environmental flow, movement, resources
- `lineage`: branching inheritance and trait transmission
- `ecology`: energy flow, predation, mutualism, decomposition

## Review loop

Run:

```bash
npm run audit:readability
npm run build
```

Then inspect desktop, tablet, mobile, reduced-motion, and the longest-content state before calling a page visually complete.
