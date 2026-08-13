# Educational Page Planning Template

Use this before creating or substantially remastering a page. A small change does not need a formal document, but the questions should still guide the work.

For an **atomic lesson**, complete the fast brief below before any visual composition. Then use the fuller sections as needed. The binding lesson workflow lives in `docs/atomic-lesson-constitution.md`.

---

## 0. Atomic lesson fast brief

Skip this section for hubs, units, reference pages, and tools.

**Learner outcome**  
After this page, the learner can...

**Prerequisite**  
This assumes the learner already understands...

**Mental model**  
The learner should picture / understand...

**Core rule or relationship**  
In one sentence...

**Primary action**  
The learner will physically/intellectually do...

**Likely misconception**  
The tempting wrong idea is...

**Transfer check**  
A new case proves understanding if the learner can...

### Text storyboard

Write the lesson in plain vertical order before designing containers:

1. **Orient:**  
2. **Model / worked example:**  
3. **Distill the rule / why:**  
4. **Do / primary instrument:**  
5. **Stress-test / misconception / boundary:**  
6. **Check transfer:**  
7. **Connect forward:**  

The instructional jobs must exist, but they do not each need a separate card or section. If this storyboard does not teach the idea clearly without visual polish, fix the lesson before coding.

---

## 1. Identity

**Page:**  
**Route:**  
**Parent:**  
**Page type:** Domain hub / branch hub / unit / atomic lesson / reference / tool  

**Why does this page deserve to exist separately?**  

---

## 2. Learning contract

**Learner goal**  
What should the learner understand or be able to do after this page?

**Prior knowledge**  
What concepts must already be available?

**Primary mental model**  
What structure, relationship, process, or representation should the learner leave with?

**Evidence of understanding**  
What could the learner successfully predict, classify, construct, explain, or test?

**Likely misconception**  
What plausible wrong model should the page actively guard against?

---

## 3. Scope

**Belongs on this page**

- 
- 
- 

**Does not belong on this page**

- 
- 
- 

**Potential child lessons / deeper pages**

- 
- 
- 

If the page is starting to need multiple independent primary instruments, reconsider the scope before coding.

---

## 4. Knowledge structure

**Ontological organizing principle**  
Examples: representation, object type, transformation, scale, constraint, part-whole, chronology, prerequisite sequence.

**Relationship to parent**  
How does this page specialize the parent idea?

**Relationship to siblings**  
Why is this topic distinct from the neighboring topics?

**Prerequisites / dependencies**

- 
- 

---

## 5. Chunk plan

Write the learner question for each chunk, not merely a component name.

1. **Orient:**  
2. **Model:**  
3. **Explain:**  
4. **Manipulate / explore:**  
5. **Test / predict:**  
6. **Generalize:**  
7. **Boundary / misconception:**  
8. **Connect forward:**  

Remove or reorder steps when the subject warrants it. Avoid adding chunks that do not answer a distinct learner question.

For atomic lessons, make sure these chunks collectively satisfy **Explain → Do → Check**. The primary interaction may combine several jobs, but it may not replace the explanatory spine.

---

## 6. Representations

**Primary representation:**  
Why is it the clearest model?

**Secondary representations:**

- 
- 

**What stays invariant across representations?**  

If several views share a state, describe the shared object here.

---

## 7. Interaction contract

**Primary instrument:**  

**Learner question it answers:**  

**Meaningful default state:**  

**What learner action enacts the actual concept?**  

**What changes because of that action?**  

**What remains invariant?**  

**What should the learner notice afterward?**  

**Curated examples / presets:**

1. simplest case:  
2. contrasting case:  
3. boundary case:  
4. misconception case:  
5. transfer case:  

**Free exploration:**  
What controls become available after the guided model is clear?

**Cause and effect:**  
For each control, where does its consequence appear?

**Forbidden inversion check:**  
Does the instrument accidentally require the learner to know the untaught answer before it can teach the process? If yes, redesign it.

---

## 8. Reference material

What conventions or comparisons will the learner need repeatedly?

- legend / notation guide:  
- comparison chart:  
- rule table:  
- vocabulary:  
- formula reference:  

Place reference material close to the decisions it supports.

Do not add a separate quick-reference block by default when the lesson already states the needed rule at the point of use.

---

## 9. Test cases and feedback

**Valid case:**  

**Invalid case:**  

**Boundary case:**  

**Legal but unhelpful case, if relevant:**  

**What feedback explains the verdict?**  

If the lesson defines membership, validity, or satisfaction, explicitly show rule → case → substitution/application → verdict → interpretation.

Feedback should explain the conceptual difference, not merely mark the choice red or green.

---

## 10. Navigation

**Breadcrumb ancestry:**  

**Parent/up relationship:**  

**Previous sibling:**  

**Next sibling:**  

**Children:**  

**Specific conceptual cross-links:**  
Only link to pages that actually teach the referenced relationship.

**Planned destinations:**  
Show only if their place in the ontology is useful. They must be visibly disabled.

---

## 11. Visual identity

**Inherited shell elements:**  

**Subject-specific visual grammar:**  
What structure, motion, background, typography, or interaction belongs specifically to this subject?

**Accent palette:**  

**Background concept:**  

**What should remain visually quiet?**  

**Instructional center of gravity:**  
What should dominate the first viewport? What should dominate the next?

---

## 12. Geometry and responsive states

**Longest title / label:**  

**Longest explanation / example:**  

**Multiline equation or code state:**  

**Important selection states:**  

**Sticky utility clearance:**  
Which headings, controls, or feedback could sit beneath sticky UI, and how is clearance guaranteed?

**Smallest target desktop width:**  

**Mobile/tablet fallback:**  

Use minimum heights and natural growth. Do not solve content overflow by clipping instructional content.

Instructional content should remain in normal document flow unless intrinsic diagram geometry requires bounded positioning. Do not use absolute positioning or z-index patchwork to repair a lesson-sequence problem.

---

## 13. Accuracy check

- Are definitions canonical or clearly labeled as heuristics?
- Is notation correct and consistent?
- Are category boundaries accurate?
- Are important exceptions introduced at the right time?
- Does the visual model accidentally imply anything false?
- Have generated examples been checked mathematically/scientifically?

Notes:


---

## 14. Definition of done

A page is ready when:

- the learner goal is obvious
- the page is at the correct depth
- the knowledge graph is preserved
- the chunk sequence feels natural
- the primary model is accurate
- the primary interaction has a clear pedagogical purpose
- guided examples precede optional complexity
- valid, invalid, and boundary states work
- all legitimate content states fit without clipping or overlap
- navigation relationships are visually distinct
- required text meets readability floors
- the page has been checked against `docs/design-docket.md`
- the page has been checked against `docs/educational-content-playbook.md`
- available build/type checks pass

For an atomic lesson, additionally require:

- Explain → Do → Check is visibly present
- one worked/model example exists
- the reusable rule or relationship is stated explicitly
- the primary instrument enacts the concept instead of pre-testing it
- the main misconception or boundary is addressed
- the transfer check uses a fresh case
- the page passes the definition of done in `docs/atomic-lesson-constitution.md`

---

## 15. One-sentence postmortem

After implementation, finish this sentence:

> This page is better for learning because...

If the answer is primarily about appearance, the educational design probably needs another pass.

If two rounds of small fixes have not resolved the lesson, stop implementation and revisit the atomic lesson brief/storyboard instead of continuing cosmetic patchwork.
