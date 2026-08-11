import VocabularyDrawer from "@/app/_components/VocabularyDrawer";
import { formalScienceVocabularyScopes } from "@/app/_data/vocab/scopes";

export default function FormalScienceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <VocabularyDrawer
        scopes={formalScienceVocabularyScopes}
        hiddenTriggerPaths={[
          "/formal-science",
          "/formal-science/mathematics",
          "/formal-science/mathematics/algebra",
          "/formal-science/mathematics/algebra/elementary-algebra",
          "/formal-science/mathematics/algebra/elementary-algebra/",
          "/formal-science/mathematics/algebra/elementary-algebra/fundamentals",
          "/formal-science/mathematics/algebra/elementary-algebra/fundamentals/",
          "/formal-science/mathematics/algebra/elementary-algebra/fundamentals/expressions-variables",
          "/formal-science/mathematics/algebra/elementary-algebra/fundamentals/equality-equations",
          "/formal-science/mathematics/algebra/elementary-algebra/fundamentals/algebraic-properties",
          "/formal-science/mathematics/algebra/elementary-algebra/fundamentals/number-systems",
        ]}
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
