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
        hiddenTriggerPaths={["/formal-science"]}
      />
    </>
  );
}
