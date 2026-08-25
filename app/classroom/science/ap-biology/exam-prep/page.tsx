import { Dna } from "lucide-react";
import ExamReviewLanding from "@/app/classroom/_components/exam-review/ExamReviewLanding";

export default function APBiologyExamPrepPage() {
  return <ExamReviewLanding
    breadcrumbs={[{ label: "Classroom", href: "/classroom" }, { label: "Science", href: "/classroom/science" }, { label: "AP Biology", href: "/classroom/science/ap-biology" }, { label: "Exam Review" }]}
    eyebrow="AP Biology · Exam Review"
    title="Reason for the point"
    subtitle="Practice the scientific decision behind each rubric point before writing the complete response."
    icon={Dna}
    accentRgb="74, 222, 128"
    tone="green"
    pilotTitle="2025 FRQ · Experimental design"
    pilotDescription="Use released Question 3 to identify a control, construct a null hypothesis, and connect ecological evidence to a causal explanation."
    pilotHref="/classroom/science/ap-biology/exam-prep/2025-frq"
    sourceLabel="College Board released FRQs"
    sourceUrl="https://apcentral.collegeboard.org/media/pdf/ap25-frq-biology.pdf"
    format={[{ label: "Section II", value: "6 free-response questions" }, { label: "Time", value: "90 minutes" }, { label: "Pilot focus", value: "Scientific investigation" }]}
  />;
}
