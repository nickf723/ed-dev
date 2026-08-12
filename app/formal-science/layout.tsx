import FormalScienceVocabulary from "@/app/formal-science/_components/FormalScienceVocabulary";
import { formalScienceVocabularyScopes } from "@/app/_data/vocab/scopes";

export default function FormalScienceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <FormalScienceVocabulary
        scopes={formalScienceVocabularyScopes}
        legacyHiddenTriggerPaths={["/formal-science"]}
      />
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
