import type { Metadata } from "next";

import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = {
  title: "Surveys & Stakeholder Feedback",
};

export default function SurveysPage() {
  return <ComingSoon title="Surveys & Stakeholder Feedback" />;
}
