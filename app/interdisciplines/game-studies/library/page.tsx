import { permanentRedirect } from "next/navigation";

export default function LegacyGameLibraryPage() {
  permanentRedirect("/humanities/gaming/repository");
}
