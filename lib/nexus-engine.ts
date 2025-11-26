// lib/nexus-engine.ts
import { glossaryTerms } from "./glossary-db";
import { AXIOM_LIBRARY } from "./axiom-db";
import { ASSET_LIBRARY } from "./asset-db";
import { PANTHEON } from "./people-db";
import { CHRONICLE_DATA } from "./chronicle-db";
import { SKILL_TREE } from "./skill-db";
import { UNIVERSAL_LIBRARY } from "./universal-db";

// --- 1. INTEGRITY CHECKER ---
// This runs on build/mount to ensure your data is clean.
export function runDiagnostics() {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check People -> Axioms
  PANTHEON.forEach(p => {
    p.axioms?.forEach(axId => {
      if (!AXIOM_LIBRARY.find(a => a.id === axId)) {
        errors.push(`CRITICAL: Person '${p.name}' links to missing Axiom '${axId}'`);
      }
    });
    p.events?.forEach(evId => {
        if (!CHRONICLE_DATA.find(e => e.id === evId)) {
            errors.push(`CRITICAL: Person '${p.name}' links to missing Event '${evId}'`);
        }
    });
  });

  // Check Assets -> Components (This is harder to check statically, but we can check IDs)
  // ...

  // Check Orphans (Items not linked to anything)
  // This is expensive, maybe skip for v1
  
  return { errors, warnings, totalNodes: getTotalNodeCount() };
}

// --- 2. UNIFIED ACCESSORS ---

export function getTotalNodeCount() {
    return Object.keys(glossaryTerms).length +
           AXIOM_LIBRARY.length +
           ASSET_LIBRARY.length +
           PANTHEON.length +
           CHRONICLE_DATA.length +
           SKILL_TREE.length + 
           UNIVERSAL_LIBRARY.length;
}

// The "Google Search" of your site
export function nexusSearch(query: string) {
    const q = query.toLowerCase();
    const results: Array<{ type: string; title: string; desc: string; href: string }> = [];

    // 1. Search Glossary
    Object.entries(glossaryTerms).forEach(([key, val]) => {
        if (key.toLowerCase().includes(q)) {
            results.push({ type: "Concept", title: key, desc: val.definition, href: `/glossary?term=${key}` });
        }
    });

    // 2. Search People
    PANTHEON.filter(p => p.name.toLowerCase().includes(q)).forEach(p => {
        results.push({ type: "Person", title: p.name, desc: p.role, href: `/library/pantheon?id=${p.id}` });
    });

    // 3. Search Axioms
    AXIOM_LIBRARY.filter(a => a.title.toLowerCase().includes(q)).forEach(a => {
        results.push({ type: "Law", title: a.title, desc: a.desc, href: `/library/axioms?id=${a.id}` });
    });

    // 4. Search Timeline
    CHRONICLE_DATA.filter(e => e.title.toLowerCase().includes(q)).forEach(e => {
        results.push({ type: "Event", title: e.title, desc: e.yearLabel, href: `/library/chronicle?id=${e.id}` });
    });

    return results;
}

// --- 3. HYDRATORS (The "Connection" Logic) ---

// Give me a Person ID, I give you the Person + The Actual Axiom Objects (not just IDs)
export function getPersonWithContext(id: string) {
    const person = PANTHEON.find(p => p.id === id);
    if (!person) return null;

    return {
        ...person,
        relatedAxioms: AXIOM_LIBRARY.filter(a => person.axioms?.includes(a.id)),
        relatedEvents: CHRONICLE_DATA.filter(e => person.events?.includes(e.id)),
        relatedAssets: ASSET_LIBRARY.filter(a => a.desc.toLowerCase().includes(person.name.toLowerCase())) // Fuzzy link!
    };
}