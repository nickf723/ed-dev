import { appliedScienceVocabularyScopes } from "@/app/_data/vocab/scopes";
import AppliedScienceVocabulary from "@/app/applied-science/_components/AppliedScienceVocabulary";

export default function AppliedScienceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <AppliedScienceVocabulary scopes={appliedScienceVocabularyScopes} />
      <style>{`
        @media (min-width: 768px) {
          button[aria-controls="page-vocabulary-drawer"] {
            top: auto !important;
            bottom: 1.25rem !important;
          }
        }
      `}</style>
    </>
  );
}
