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
          "/formal-science/mathematics/algebra/elementary-algebra/linear-equations",
          "/formal-science/mathematics/algebra/elementary-algebra/linear-equations/",
          "/formal-science/mathematics/algebra/elementary-algebra/systems-of-equations",
          "/formal-science/mathematics/algebra/elementary-algebra/systems-of-equations/",
          "/formal-science/mathematics/algebra/elementary-algebra/inequalities",
          "/formal-science/mathematics/algebra/elementary-algebra/inequalities/",
        ]}
      />
      <style>{`
        @media (min-width: 768px) {
          button[aria-controls="page-vocabulary-drawer"] {
            top: auto !important;
            bottom: 1.25rem !important;
          }
        }

        @media (min-width: 1280px) {
          section[class~="xl:h-[430px]"] {
            height: 505px !important;
          }

          section[class~="xl:h-[430px]"] div[class~="grid-rows-[116px_minmax(0,1fr)]"] {
            grid-template-rows: 150px minmax(0, 1fr) !important;
          }

          section[class~="xl:h-[430px]"] div[class~="grid-rows-[116px_minmax(0,1fr)]"] > div:first-child > button {
            height: 44px !important;
          }

          section[class~="xl:h-[430px]"] div[class~="grid-rows-[116px_minmax(0,1fr)]"] > div:first-child > button:last-child {
            grid-column: 1 / -1;
          }

          section[class~="xl:h-[430px]"] div[class~="grid-rows-[32px_78px_minmax(0,1fr)]"] {
            grid-template-rows: 32px 108px 112px !important;
            overflow: hidden;
          }

          section[class~="xl:h-[430px]"] div[class~="grid-rows-[32px_78px_minmax(0,1fr)]"] > div:last-child {
            min-height: 112px;
            overflow: hidden;
          }

          section[class~="xl:h-[540px]"] {
            height: 600px !important;
          }
        }
      `}</style>
    </>
  );
}
