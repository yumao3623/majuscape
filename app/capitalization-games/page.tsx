import { permanentRedirect } from "next/navigation";

// Legacy route retained for existing links and search history.
export default function CapitalizationGamesLegacyRoute() {
  permanentRedirect("/");
}
