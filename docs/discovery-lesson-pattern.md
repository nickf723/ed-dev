# Discovery-first lesson pattern

Education Station 64 lessons should not default to textbook exposition. The default lesson sequence is progressive disclosure:

1. **The phenomenon** — two sentences at most. Present a contradiction, raw observation, scenario, or problem before naming the formal method.
2. **Interactive sandbox** — the learner manipulates the core relationship before receiving an explanation. The interaction should expose the academic object itself, not decorative telemetry.
3. **Conceptual bridge** — after the learner has acted, name what happened and introduce the minimum vocabulary needed to describe it.
4. **Formal structure** — compact laws, definitions, steps, timelines, equations, or tables. Formalism comes after intuition, not before it.
5. **Common pitfall** — surface the specific mistake that would produce a plausible but wrong mental model.
6. **Application** — a fresh interactive transfer task. Prefer transformation, construction, sorting, tracing, tuning, mapping, or simulation over multiple-choice recall.

## Progressive disclosure rules

- Progressive disclosure is about **sequence and emphasis, not locking the page**.
- Do not hide later lesson sections until an earlier interaction is completed. A learner who reloads, revisits, or jumps down the page should still have access to the full lesson.
- Progression is appropriate **inside an individual sandbox or application task** when the next state genuinely depends on the previous action.
- Do not explain the sandbox before the learner has a chance to manipulate it.
- Never gate navigation, definitions, accessibility, or essential reference material behind interaction.
- Hubs and reference atlases may remain navigation-first; this pattern is for lessons and concept pages.
- Reuse `DiscoveryLessonBlock` for the recognizable six-block visual grammar, but keep the sandbox itself subject-native.

## Interaction quality

A useful interaction changes the learner's model of the concept. Avoid fake runtime meters, arbitrary scores, decorative sliders, inert buttons, fabricated status indicators, and interactions whose result is already stated beside the control.

Match the interaction to the academic action. A slider is excellent when the concept is continuous variation, sensitivity, rate, or parameter change. It is usually a poor substitute for algebraic solving, proof, classification, construction, or symbolic transformation.

Prefer interactions where the learner can answer a question by manipulating the system: What remains invariant? What value balances the constraint? What changes when this parameter moves? Which representation preserves the same object? What fails when an assumption is removed?

## Layout and breathing room

- Lesson pages should usually use a narrower reading frame than hubs, dashboards, and atlases.
- Let explanatory blocks occupy only the width their content needs. Do not stretch a two-sentence idea across the entire viewport.
- Reserve wide layouts for interactions that genuinely benefit from width, such as maps, timelines, graphs, simulations, and comparison canvases.
- Prefer vertical rhythm between substantial lesson blocks. The page background is part of the visual identity and should have room to appear between ideas.
- Compact pages with little content. Do not manufacture cards or empty whitespace simply to make a short page feel larger.
- Dense lessons may scroll. Scrolling is preferable to compressing six different ideas into one overloaded dashboard view.

## Text budget

- Phenomenon: 2 sentences.
- Conceptual bridge: 2–3 short paragraphs.
- Formal structure: structured and scannable.
- Pitfall: one focused misconception.
- Application instructions: enough to act, not enough to reveal the answer.

The lesson should feel like discovering a mechanism and then receiving its name, not reading an encyclopedia entry with widgets attached.
