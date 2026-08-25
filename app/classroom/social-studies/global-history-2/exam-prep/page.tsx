import { Landmark } from "lucide-react";
import ExamReviewLanding from "@/app/classroom/_components/exam-review/ExamReviewLanding";

export default function GlobalHistoryExamPrepPage() {
  return <ExamReviewLanding
    breadcrumbs={[{ label: "Classroom", href: "/classroom" }, { label: "Social Studies", href: "/classroom/social-studies" }, { label: "Global II", href: "/classroom/social-studies/global-history-2" }, { label: "Exam Review" }]}
    eyebrow="Global History II · Regents Review"
    title="Read evidence before choices"
    subtitle="Slow down the source, identify its strongest evidence, and make every answer choice defend itself."
    icon={Landmark}
    accentRgb="96, 165, 250"
    tone="blue"
    pilotTitle="June 2025 · Rights document set"
    pilotDescription="Work through Questions 3 and 4 by matching source details to social groups and historical claims before viewing the scoring key."
    pilotHref="/classroom/social-studies/global-history-2/exam-prep/june-2025"
    sourceLabel="NYSED released exam"
    sourceUrl="https://www.nysedregents.org/ghg2/625/glhg2-62025-exam.pdf"
    format={[{ label: "Part I", value: "28 multiple-choice" }, { label: "Part II", value: "2 CRQ sets" }, { label: "Part III", value: "Enduring Issues essay" }]}
  />;
}
