import { humanitiesVocabularyScopes } from "@/app/_data/vocab/scopes";
import HumanitiesVocabulary from "@/app/humanities/_components/HumanitiesVocabulary";

export default function HumanitiesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <HumanitiesVocabulary scopes={humanitiesVocabularyScopes} />
      <style>
        {
          "@media (min-width: 768px) { button[aria-controls='page-vocabulary-drawer'] { top: auto !important; bottom: 1.25rem !important; } }"
        }
      </style>
    </>
  );
}
