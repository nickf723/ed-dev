"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import {
  ContentP,
  ContentSubhead,
  ProcedureList,
  DataGrid,
  Callout,
  TermDefinition,
  CollapsibleTopic
} from "@/components/LessonBlocks";
import { FlaskConical, AlertTriangle, ListCheck, Table } from "@/components/icons";

export default function TitrationLabPage() {
  return (
    <main className="topic-page theme-chemistry lg:px-16">
      <FloatingSymbols symbols={["HCl", "NaOH", "pH", "±0.1"]} />
      <PageHeader
        eyebrow="Virtual Lab"
        title="Acid-Base Titration"
        subtitle="Determining the concentration of an unknown acid solution using a standard base."
      />

      <div className="w-full max-w-4xl mx-auto text-left space-y-12 pb-24">
        
        <section>
            <Callout type="warning" title="Safety First">
                <p><strong>Wear safety goggles at all times.</strong> Hydrochloric acid (HCl) is corrosive. If you spill any on your skin, wash immediately with water.</p>
            </Callout>

            <ContentP>
                Titration is a technique where a solution of known concentration is used to determine the concentration of an unknown solution.
            </ContentP>

            <TermDefinition term="Equivalence Point">
                The point in a titration where the amount of titrant added is enough to completely neutralize the analyte solution.
            </TermDefinition>
        </section>

        <section>
            <ContentSubhead title="Experimental Procedure" />
            <ProcedureList 
                title="Standardization Steps"
                steps={[
                    "Rinse the burette with distilled water, then with the sodium hydroxide (NaOH) solution.",
                    "Fill the burette with NaOH solution. Record the initial volume (V_initial).",
                    "Pipette exactly 25.0 mL of the unknown HCl solution into a conical flask.",
                    "Add 2-3 drops of phenolphthalein indicator to the flask. The solution should remain colorless.",
                    "Place the flask under the burette and add NaOH slowly while swirling.",
                    "Stop when a faint pink color persists for at least 30 seconds (End Point).",
                    "Record the final burette reading (V_final)."
                ]}
            />
        </section>

        <section>
            <ContentSubhead title="Data Analysis" />
            <ContentP>
                Record your volume measurements in the table below. The difference between Final and Initial volume is the <strong>Titre</strong>.
            </ContentP>
            
            <DataGrid 
                headers={["Trial", "Initial Vol (mL)", "Final Vol (mL)", "Titre (mL)"]}
                data={[
                    ["1 (Rough)", "0.00", "24.50", "24.50"],
                    ["2", "24.50", "48.60", "24.10"],
                    ["3", "0.50", "24.65", "24.15"],
                ]}
            />
            
            <Callout type="info" title="Calculation Tip">
                <p>Discard the rough titre. Calculate the average of the concordant titres (Trials 2 and 3) to get the volume used for calculation.</p>
            </Callout>
        </section>

      </div>
    </main>
  );
}