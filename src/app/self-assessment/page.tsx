import { permanentRedirect } from "next/navigation";

// The Self-Assessment & Accreditation content moved under /quality-assurance.
// Preserve the old path with a permanent (308) redirect.
export default function SelfAssessmentRedirect() {
  permanentRedirect("/quality-assurance/assessment-accreditation");
}
