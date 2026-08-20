import { naturalScienceVocabularyScopes } from "@/app/_data/vocab/scopes";
import NaturalScienceVocabulary from "@/app/natural-science/_components/NaturalScienceVocabulary";

export default function NaturalScienceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <NaturalScienceVocabulary scopes={naturalScienceVocabularyScopes} />
      <style>
        {
          "@media (min-width: 768px) { button[aria-controls='page-vocabulary-drawer'] { top: auto !important; bottom: 1.25rem !important; } }"
        }
      </style>
    </>
  );
}
