import { permanentRedirect } from "next/navigation";

// Renamed to /collaboration/student-exchange.
// Preserve the old path with a permanent (308) redirect so links don't break.
export default function ExchangeProgramsRedirect() {
  permanentRedirect("/collaboration/student-exchange");
}
