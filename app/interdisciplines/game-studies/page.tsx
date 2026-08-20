import { permanentRedirect } from "next/navigation";

export default function LegacyGameStudiesPage() {
  permanentRedirect("/humanities/gaming/ludology");
}
