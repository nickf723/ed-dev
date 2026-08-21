import { socialScienceVocabularyScopes } from "@/app/_data/vocab/scopes";
import SocialScienceVocabulary from "@/app/social-science/_components/SocialScienceVocabulary";

export default function SocialScienceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <SocialScienceVocabulary scopes={socialScienceVocabularyScopes} />
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
