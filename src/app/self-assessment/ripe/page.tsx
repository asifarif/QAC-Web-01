import { permanentRedirect } from "next/navigation";

// RIPE moved under /quality-assurance. Preserve the old path with a 308 redirect.
export default function RipeRedirect() {
  permanentRedirect("/quality-assurance/ripe");
}
