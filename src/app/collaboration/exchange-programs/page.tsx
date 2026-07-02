import type { Metadata } from "next";

import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = {
  title: "Exchange Programs",
};

export default function ExchangeProgramsPage() {
  return (
    <ComingSoon
      eyebrow="Collaboration"
      title="Exchange Programs"
      message="Content coming soon."
    />
  );
}
