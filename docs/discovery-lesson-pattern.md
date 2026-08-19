# Discovery-first lesson pattern

Education Station 64 lessons should not default to textbook exposition. The default lesson sequence is progressive disclosure:

1. **The phenomenon** — two sentences at most. Present a contradiction, raw observation, scenario, or problem before naming the formal method.
2. **Interactive sandbox** — the learner manipulates the core relationship before receiving an explanation. The interaction should expose the academic object itself, not decorative telemetry.
3. **Conceptual bridge** — after the learner has acted, name what happened and introduce the minimum vocabulary needed to describe it.
4. **Formal structure** — compact laws, definitions, steps, timelines, equations, or tables. Formalism comes after intuition, not before it.
5. **Common pitfall** — surface the specific mistake that would produce a plausible but wrong mental model.
6. **Application** — a fresh interactive transfer task. Prefer transformation, construction, sorting, tracing, tuning, mapping, or simulation over multiple-choice recall.

## Progressive disclosure rules

- Do not explain the sandbox before the learner has a chance to manipulate it.
- Later blocks may reveal after meaningful interaction when the topic benefits from discovery.
- Never gate navigation or essential accessibility behind interaction.
- Hubs and reference atlases may remain navigation-first; this pattern is for lessons and concept pages.
- Reuse `DiscoveryLessonBlock` for the recognizable six-block visual grammar, but keep the sandbox itself subject-native.

## Interaction quality

A useful interaction changes the learner's model of the concept. Avoid fake runtime meters, arbitrary scores, decorative sliders, inert buttons, fabricated status indicators, and interactions whose result is already stated beside the control.

Prefer interactions where the learner can answer a question by manipulating the system: What remains invariant? What value balances the constraint? What changes when this parameter moves? Which representation preserves the same object? What fails when an assumption is removed?

## Text budget

- Phenomenon: 2 sentences.
- Conceptual bridge: 2–3 short paragraphs.
- Formal structure: structured and scannable.
- Pitfall: one focused misconception.
- Application instructions: enough to act, not enough to reveal the answer.

## Studio verification loop

`studio` is the inspectable development surface. Coherent working changes should be pushed there promptly so they can be reviewed in the deployed site instead of accumulating unseen on long-lived validation branches. Build or visual failures are fixed forward on `studio`; validation branches remain useful for risky or isolated experiments, not as a holding pen for finished pages.

The lesson should feel like discovering a mechanism and then receiving its name, not reading an encyclopedia entry with widgets attached.
